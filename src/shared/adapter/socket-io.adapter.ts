import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { INestApplicationContext, Logger } from '@nestjs/common';
import { AppConfigService } from '../../config/app-config.service';

export class SocketIOAdapter extends IoAdapter {
  private readonly appConfigService: AppConfigService;
  private readonly logger = new Logger(SocketIOAdapter.name);

  constructor(app: INestApplicationContext) {
    super(app);
    this.appConfigService = app.get(AppConfigService);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const corsOrigins = this.appConfigService.app.corsOrigins;
    const hasCorsOrigins = corsOrigins.length > 0;
    if (!hasCorsOrigins) {
      this.logger.warn(
        'CORS_ORIGINS is empty. Socket.IO cross-origin connections are disabled.',
      );
    }

    const serverOptions = {
      ...options,
      cors: {
        origin: hasCorsOrigins ? corsOrigins : false,
        credentials: hasCorsOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: [
          'Content-Type',
          'Authorization',
          'Accept',
          'X-Frontend-Host',
        ],
      },
      transports: ['polling', 'websocket'],
      allowEIO3: true,
    };

    return super.createIOServer(port, serverOptions);
  }
}
