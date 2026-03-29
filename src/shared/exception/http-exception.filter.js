"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var lodash_1 = require("lodash");
var app_validation_error_dto_1 = require("../dto/app-validation-error.dto");
var error_codes_enum_1 = require("../constants/error-codes.enum");
var HttpExceptionFilter = function () {
    var _classDecorators = [(0, common_1.Catch)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var HttpExceptionFilter = _classThis = /** @class */ (function () {
        function HttpExceptionFilter_1(httpAdapterHost) {
            this.httpAdapterHost = httpAdapterHost;
            this.logger = new common_1.Logger(HttpExceptionFilter.name);
        }
        HttpExceptionFilter_1.prototype.catch = function (exception, host) {
            var httpAdapter = this.httpAdapterHost.httpAdapter;
            var ctx = host.switchToHttp();
            var request = ctx.getRequest();
            var timestamp = new Date().toISOString();
            var path = request.url;
            var dto = this.toResponseDto(exception);
            this.logError(exception, request, dto);
            httpAdapter.reply(ctx.getResponse(), __assign(__assign({}, dto), { timestamp: timestamp, path: path }), dto.status_code);
        };
        HttpExceptionFilter_1.prototype.toResponseDto = function (exception) {
            if (exception instanceof common_1.BadRequestException) {
                return this.handleBadRequestException(exception);
            }
            if (exception instanceof common_1.HttpException) {
                return this.handleHttpException(exception);
            }
            return {
                status_code: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                success: false,
                message: 'Internal server error',
            };
        };
        HttpExceptionFilter_1.prototype.handleBadRequestException = function (exception) {
            var status = exception.getStatus();
            var response = exception.getResponse();
            var errors = undefined;
            var message = exception.message;
            if ((0, lodash_1.isObject)(response)) {
                var responseObj = response;
                // Handle validation errors from class-validator
                if (responseObj.errors instanceof app_validation_error_dto_1.AppValidationErrors) {
                    errors = responseObj.errors;
                }
                // Handle message from the custom exception factory
                if (typeof responseObj.message === 'string') {
                    message = responseObj.message;
                }
                else if (Array.isArray(responseObj.message)) {
                    message = responseObj.message.join(', ');
                }
            }
            // Check if message is an error code
            if (this.isErrorCode(message)) {
                return {
                    status_code: status,
                    success: false,
                    message: 'Bad Request',
                    error_code: message,
                    errors: errors,
                };
            }
            return {
                status_code: status,
                success: false,
                message: message,
                errors: errors,
            };
        };
        HttpExceptionFilter_1.prototype.handleHttpException = function (exception) {
            var status = exception.getStatus();
            var response = exception.getResponse();
            var message = 'Unknown error';
            if (typeof response === 'string') {
                message = response;
            }
            else if ((0, lodash_1.isObject)(response)) {
                var responseObj = response;
                if (typeof responseObj.message === 'string') {
                    message = responseObj.message;
                }
                else if (Array.isArray(responseObj.message)) {
                    message = responseObj.message.join(', ');
                }
                else if (responseObj.error && typeof responseObj.error === 'string') {
                    message = responseObj.error;
                }
            }
            // Check if message is an error code
            if (this.isErrorCode(message)) {
                return {
                    status_code: status,
                    success: false,
                    message: this.getHttpStatusText(status),
                    error_code: message,
                };
            }
            return {
                status_code: status,
                success: false,
                message: message,
            };
        };
        HttpExceptionFilter_1.prototype.isErrorCode = function (message) {
            return Object.values(error_codes_enum_1.ErrorCode).includes(message);
        };
        HttpExceptionFilter_1.prototype.getHttpStatusText = function (status) {
            switch (status) {
                case 400:
                    return 'Bad Request';
                case 401:
                    return 'Unauthorized';
                case 403:
                    return 'Forbidden';
                case 404:
                    return 'Not Found';
                case 409:
                    return 'Conflict';
                case 500:
                    return 'Internal Server Error';
                default:
                    return 'Unknown Error';
            }
        };
        HttpExceptionFilter_1.prototype.logError = function (exception, request, dto) {
            var context = {
                method: request.method,
                url: request.url,
                userAgent: request.get('User-Agent'),
                ip: request.ip,
                status_code: dto.status_code,
            };
            if (dto.status_code >= 500) {
                this.logger.error("Internal Server Error: ".concat(dto.message), exception instanceof Error ? exception.stack : String(exception), context);
            }
            else if (dto.status_code >= 400) {
                this.logger.warn("Client Error: ".concat(dto.message), context);
            }
            else {
                this.logger.log("Request completed: ".concat(dto.message), context);
            }
        };
        return HttpExceptionFilter_1;
    }());
    __setFunctionName(_classThis, "HttpExceptionFilter");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        HttpExceptionFilter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return HttpExceptionFilter = _classThis;
}();
exports.HttpExceptionFilter = HttpExceptionFilter;
