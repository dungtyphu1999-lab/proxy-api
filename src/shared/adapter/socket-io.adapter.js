"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketIOAdapter = void 0;
var platform_socket_io_1 = require("@nestjs/platform-socket.io");
var common_1 = require("@nestjs/common");
var app_config_service_1 = require("../../config/app-config.service");
var SocketIOAdapter = /** @class */ (function (_super) {
    __extends(SocketIOAdapter, _super);
    function SocketIOAdapter(app) {
        var _this = _super.call(this, app) || this;
        _this.logger = new common_1.Logger(SocketIOAdapter.name);
        _this.appConfigService = app.get(app_config_service_1.AppConfigService);
        return _this;
    }
    SocketIOAdapter.prototype.createIOServer = function (port, options) {
        var corsOrigins = this.appConfigService.app.corsOrigins;
        var hasCorsOrigins = corsOrigins.length > 0;
        if (!hasCorsOrigins) {
            this.logger.warn('CORS_ORIGINS is empty. Socket.IO cross-origin connections are disabled.');
        }
        var serverOptions = __assign(__assign({}, options), { cors: {
                origin: hasCorsOrigins ? corsOrigins : false,
                credentials: hasCorsOrigins,
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
                allowedHeaders: [
                    'Content-Type',
                    'Authorization',
                    'Accept',
                    'X-Frontend-Host',
                ],
            }, transports: ['polling', 'websocket'], allowEIO3: true });
        return _super.prototype.createIOServer.call(this, port, serverOptions);
    };
    return SocketIOAdapter;
}(platform_socket_io_1.IoAdapter));
exports.SocketIOAdapter = SocketIOAdapter;
