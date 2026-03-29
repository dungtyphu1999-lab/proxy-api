"use strict";
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
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var core_1 = require("@nestjs/core");
var path_1 = require("path");
// Infrastructure
var app_config_module_1 = require("./config/app-config.module");
var database_module_1 = require("./database/database.module");
var redis_module_1 = require("./redis/redis.module");
var file_upload_module_1 = require("./modules/file-upload/file-upload.module");
var redis_config_1 = require("./config/redis.config");
// Health
var health_module_1 = require("./modules/health/health.module");
// Auth (JWT)
var auth_module_1 = require("./modules/user/auth/auth.module");
// Proxy (user)
var proxy_module_1 = require("./modules/user/proxy/proxy.module");
// Proxy (public / guest)
var proxy_master_module_1 = require("./modules/guest/proxy-master/proxy-master.module");
// Webshare admin
var webshare_admin_module_1 = require("./modules/admin/webshare/webshare-admin.module");
// Wallet (cần để trừ tiền khi mua proxy)
var wallet_module_1 = require("./modules/user/wallet/wallet.module");
// Telegram (user liên kết Telegram)
var telegram_module_1 = require("./modules/user/telegram/telegram.module");
// Notifications (dùng bởi ProxyService để thông báo admin)
var admin_notification_module_1 = require("./modules/admin/notifications/admin-notification.module");
var notification_module_1 = require("./modules/user/notification/notification.module");
// Admin users (dùng bởi AdminNotificationModule)
var admin_users_module_1 = require("./modules/admin/users/admin-users.module");
var AppModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    load: [redis_config_1.default],
                    isGlobal: true,
                    envFilePath: [(0, path_1.resolve)(process.cwd(), '.env')],
                }),
                app_config_module_1.AppConfigModule,
                database_module_1.DatabaseModule,
                redis_module_1.RedisModule,
                file_upload_module_1.FileUploadModule,
                // Feature modules
                health_module_1.HealthModule,
                auth_module_1.AuthModule,
                wallet_module_1.WalletModule,
                proxy_module_1.ProxyModule,
                proxy_master_module_1.ProxyMasterModule,
                webshare_admin_module_1.WebshareAdminModule,
                telegram_module_1.UserTelegramModule,
                notification_module_1.NotificationModule,
                admin_notification_module_1.AdminNotificationModule,
                admin_users_module_1.AdminUserModule,
                core_1.RouterModule.register([
                    {
                        path: 'health',
                        module: health_module_1.HealthModule,
                    },
                    {
                        path: 'api/v1',
                        children: [
                            // ─── Admin routes ───────────────────────────────────────────────
                            {
                                path: 'admin',
                                children: [
                                    {
                                        path: 'webshare',
                                        module: webshare_admin_module_1.WebshareAdminModule,
                                    },
                                    {
                                        path: 'notifications',
                                        module: admin_notification_module_1.AdminNotificationModule,
                                    },
                                    {
                                        path: 'users',
                                        module: admin_users_module_1.AdminUserModule,
                                    },
                                    {
                                        path: 'wallet',
                                        module: wallet_module_1.WalletModule,
                                    },
                                ],
                            },
                            // ─── User (authenticated) routes ────────────────────────────────
                            {
                                path: 'user',
                                children: [
                                    {
                                        path: 'auth',
                                        module: auth_module_1.AuthModule,
                                    },
                                    {
                                        path: 'proxy',
                                        module: proxy_module_1.ProxyModule,
                                    },
                                    {
                                        path: 'wallet',
                                        module: wallet_module_1.WalletModule,
                                    },
                                    {
                                        path: 'telegram',
                                        module: telegram_module_1.UserTelegramModule,
                                    },
                                    {
                                        path: 'notifications',
                                        module: notification_module_1.NotificationModule,
                                    },
                                ],
                            },
                            // ─── Public (unauthenticated) routes ────────────────────────────
                            {
                                path: 'public',
                                children: [
                                    {
                                        path: 'proxy',
                                        module: proxy_master_module_1.ProxyMasterModule,
                                    },
                                ],
                            },
                        ],
                    },
                ]),
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AppModule = _classThis = /** @class */ (function () {
        function AppModule_1() {
        }
        return AppModule_1;
    }());
    __setFunctionName(_classThis, "AppModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AppModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AppModule = _classThis;
}();
exports.AppModule = AppModule;
