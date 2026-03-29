import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/exception/http-exception.filter';
import { TransformInterceptor } from './shared/interceptor/transform.interceptor';
import { AppConfigService } from './config/app-config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  BadRequestException,
  HttpStatus,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationError } from 'class-validator';
import { flattenValidationErrors } from './shared/helpers/flattenValidationErrors';
import { AppValidationErrors } from './shared/dto/app-validation-error.dto';
import { AddressInfo, createServer } from 'net';

function normalizeOrigin(origin: string): string {
  return String(origin || '')
    .trim()
    .replace(/\/$/, '')
    .toLowerCase();
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const appConfigService = app.get(AppConfigService);

  if (appConfigService.logger.verbose) {
    app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);
  } else {
    app.useLogger(['log', 'error', 'warn']);
  }

  app.set('trust proxy', 1);

  // Serve static files from uploads directory
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  const allowedOrigins = new Set(
    (appConfigService.app.corsOrigins || []).map(normalizeOrigin),
  );
  app.enableCors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      const normalized = normalizeOrigin(origin);
      if (allowedOrigins.has(normalized)) return cb(null, true);
      return cb(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Accept',
      'X-Frontend-Host',
    ],
  });

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapterHost));
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      disableErrorMessages: false,
      validationError: {
        target: false,
        value: false,
      },
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (validationErrors: ValidationError[]) => {
        const formattedErrors: AppValidationErrors =
          flattenValidationErrors(validationErrors);
        return new BadRequestException({
          status_code: HttpStatus.BAD_REQUEST,
          message: 'Validation failed',
          errors: formattedErrors,
        });
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Proxy API')
    .setDescription('Standalone Proxy Service API')
    .setVersion('1.0')
    .addTag('proxy')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const basePort = appConfigService.app.port;
  const maxRetryCount = Math.max(
    0,
    Number.parseInt(process.env.APP_PORT_MAX_RETRY ?? '20', 10) || 0,
  );

  const findAvailablePort = async (startPort: number, retries: number) => {
    for (let attempt = 0; attempt <= retries; attempt += 1) {
      const candidatePort = startPort + attempt;
      const isFree = await new Promise<boolean>((resolve) => {
        const probe = createServer();
        probe
          .once('error', () => { resolve(false); })
          .once('listening', () => { probe.close(() => resolve(true)); })
          .listen(candidatePort, '::');
      });
      if (isFree) return candidatePort;
      if (attempt < retries) {
        Logger.warn(
          `Port ${candidatePort} is busy, trying ${candidatePort + 1}...`,
          'Bootstrap',
        );
      }
    }
    throw new Error(
      `No available port found from ${startPort} to ${startPort + retries}`,
    );
  };

  let listeningPortCandidate = basePort;
  let attemptsLeft = maxRetryCount;
  while (true) {
    listeningPortCandidate = await findAvailablePort(
      listeningPortCandidate,
      attemptsLeft,
    );
    try {
      await app.listen(listeningPortCandidate);
      break;
    } catch (error) {
      const errorCode =
        typeof error === 'object' && error != null && 'code' in error
          ? String((error as { code?: unknown }).code ?? '')
          : '';
      if (errorCode !== 'EADDRINUSE' || attemptsLeft <= 0) {
        throw error;
      }
      Logger.warn(
        `Port ${listeningPortCandidate} was taken before bind, retrying...`,
        'Bootstrap',
      );
      listeningPortCandidate += 1;
      attemptsLeft -= 1;
    }
  }

  const address = app.getHttpServer().address() as AddressInfo | string | null;
  const listeningPort =
    typeof address === 'object' && address != null
      ? Number(address.port)
      : listeningPortCandidate;
  Logger.log(`Proxy API running on http://localhost:${listeningPort}`, 'Bootstrap');
  Logger.log(`Swagger docs: http://localhost:${listeningPort}/docs`, 'Bootstrap');
}
bootstrap().catch((error) => {
  Logger.error('Error during application bootstrap', error);
  process.exit(1);
});
