"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@nestjs/core");
var app_module_1 = require("./app.module");
var http_exception_filter_1 = require("./shared/exception/http-exception.filter");
var transform_interceptor_1 = require("./shared/interceptor/transform.interceptor");
var app_config_service_1 = require("./config/app-config.service");
var swagger_1 = require("@nestjs/swagger");
var common_1 = require("@nestjs/common");
var path_1 = require("path");
var flattenValidationErrors_1 = require("./shared/helpers/flattenValidationErrors");
var net_1 = require("net");
function normalizeOrigin(origin) {
    return String(origin || '')
        .trim()
        .replace(/\/$/, '')
        .toLowerCase();
}
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var app, appConfigService, allowedOrigins, httpAdapterHost, config, document, basePort, maxRetryCount, findAvailablePort, listeningPortCandidate, attemptsLeft, error_1, errorCode, address, listeningPort;
        var _this = this;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, core_1.NestFactory.create(app_module_1.AppModule)];
                case 1:
                    app = _c.sent();
                    appConfigService = app.get(app_config_service_1.AppConfigService);
                    if (appConfigService.logger.verbose) {
                        app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);
                    }
                    else {
                        app.useLogger(['log', 'error', 'warn']);
                    }
                    app.set('trust proxy', 1);
                    // Serve static files from uploads directory
                    app.useStaticAssets((0, path_1.join)(process.cwd(), 'uploads'), {
                        prefix: '/uploads/',
                    });
                    allowedOrigins = new Set((appConfigService.app.corsOrigins || []).map(normalizeOrigin));
                    app.enableCors({
                        origin: function (origin, cb) {
                            if (!origin)
                                return cb(null, true);
                            var normalized = normalizeOrigin(origin);
                            if (allowedOrigins.has(normalized))
                                return cb(null, true);
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
                    httpAdapterHost = app.get(core_1.HttpAdapterHost);
                    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter(httpAdapterHost));
                    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
                    app.useGlobalPipes(new common_1.ValidationPipe({
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
                        exceptionFactory: function (validationErrors) {
                            var formattedErrors = (0, flattenValidationErrors_1.flattenValidationErrors)(validationErrors);
                            return new common_1.BadRequestException({
                                status_code: common_1.HttpStatus.BAD_REQUEST,
                                message: 'Validation failed',
                                errors: formattedErrors,
                            });
                        },
                    }));
                    config = new swagger_1.DocumentBuilder()
                        .setTitle('Proxy API')
                        .setDescription('Standalone Proxy Service API')
                        .setVersion('1.0')
                        .addTag('proxy')
                        .addBearerAuth({
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                        name: 'Authorization',
                        in: 'header',
                    }, 'access-token')
                        .build();
                    document = swagger_1.SwaggerModule.createDocument(app, config);
                    swagger_1.SwaggerModule.setup('docs', app, document, {
                        swaggerOptions: {
                            persistAuthorization: true,
                        },
                    });
                    basePort = appConfigService.app.port;
                    maxRetryCount = Math.max(0, Number.parseInt((_a = process.env.APP_PORT_MAX_RETRY) !== null && _a !== void 0 ? _a : '20', 10) || 0);
                    findAvailablePort = function (startPort, retries) { return __awaiter(_this, void 0, void 0, function () {
                        var _loop_1, attempt, state_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _loop_1 = function (attempt) {
                                        var candidatePort, isFree;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    candidatePort = startPort + attempt;
                                                    return [4 /*yield*/, new Promise(function (resolve) {
                                                            var probe = (0, net_1.createServer)();
                                                            probe
                                                                .once('error', function () { resolve(false); })
                                                                .once('listening', function () { probe.close(function () { return resolve(true); }); })
                                                                .listen(candidatePort, '::');
                                                        })];
                                                case 1:
                                                    isFree = _b.sent();
                                                    if (isFree)
                                                        return [2 /*return*/, { value: candidatePort }];
                                                    if (attempt < retries) {
                                                        common_1.Logger.warn("Port ".concat(candidatePort, " is busy, trying ").concat(candidatePort + 1, "..."), 'Bootstrap');
                                                    }
                                                    return [2 /*return*/];
                                            }
                                        });
                                    };
                                    attempt = 0;
                                    _a.label = 1;
                                case 1:
                                    if (!(attempt <= retries)) return [3 /*break*/, 4];
                                    return [5 /*yield**/, _loop_1(attempt)];
                                case 2:
                                    state_1 = _a.sent();
                                    if (typeof state_1 === "object")
                                        return [2 /*return*/, state_1.value];
                                    _a.label = 3;
                                case 3:
                                    attempt += 1;
                                    return [3 /*break*/, 1];
                                case 4: throw new Error("No available port found from ".concat(startPort, " to ").concat(startPort + retries));
                            }
                        });
                    }); };
                    listeningPortCandidate = basePort;
                    attemptsLeft = maxRetryCount;
                    _c.label = 2;
                case 2:
                    if (!true) return [3 /*break*/, 8];
                    return [4 /*yield*/, findAvailablePort(listeningPortCandidate, attemptsLeft)];
                case 3:
                    listeningPortCandidate = _c.sent();
                    _c.label = 4;
                case 4:
                    _c.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, app.listen(listeningPortCandidate)];
                case 5:
                    _c.sent();
                    return [3 /*break*/, 8];
                case 6:
                    error_1 = _c.sent();
                    errorCode = typeof error_1 === 'object' && error_1 != null && 'code' in error_1
                        ? String((_b = error_1.code) !== null && _b !== void 0 ? _b : '')
                        : '';
                    if (errorCode !== 'EADDRINUSE' || attemptsLeft <= 0) {
                        throw error_1;
                    }
                    common_1.Logger.warn("Port ".concat(listeningPortCandidate, " was taken before bind, retrying..."), 'Bootstrap');
                    listeningPortCandidate += 1;
                    attemptsLeft -= 1;
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 2];
                case 8:
                    address = app.getHttpServer().address();
                    listeningPort = typeof address === 'object' && address != null
                        ? Number(address.port)
                        : listeningPortCandidate;
                    common_1.Logger.log("Proxy API running on http://localhost:".concat(listeningPort), 'Bootstrap');
                    common_1.Logger.log("Swagger docs: http://localhost:".concat(listeningPort, "/docs"), 'Bootstrap');
                    return [2 /*return*/];
            }
        });
    });
}
bootstrap().catch(function (error) {
    common_1.Logger.error('Error during application bootstrap', error);
    process.exit(1);
});
