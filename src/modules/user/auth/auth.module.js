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
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var jwt_1 = require("@nestjs/jwt");
var passport_1 = require("@nestjs/passport");
var auth_controller_1 = require("./auth.controller");
var auth_service_1 = require("./auth.service");
var social_auth_service_1 = require("./social-auth.service");
var verification_service_1 = require("./verification.service");
var local_strategy_1 = require("./strategies/local.strategy");
var jwt_strategy_1 = require("./strategies/jwt.strategy");
var admin_jwt_strategy_1 = require("./strategies/admin-jwt.strategy");
var app_config_module_1 = require("@/config/app-config.module");
var app_config_service_1 = require("@/config/app-config.service");
var email_module_1 = require("@/modules/email/email.module");
var redis_module_1 = require("@/redis/redis.module");
var user_profile_module_1 = require("../user-profile/user-profile.module");
var user_module_1 = require("../user/user.module");
var auth_token_module_1 = require("../auth-token/auth-token.module");
var roles_module_1 = require("../roles/roles.module");
var rate_limit_module_1 = require("@/modules/rate-limit/rate-limit.module");
var shops_module_1 = require("../shops/shops.module");
var wallet_module_1 = require("../wallet/wallet.module");
var chat_module_1 = require("../chat/chat.module");
var AuthModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                passport_1.PassportModule,
                email_module_1.EmailModule,
                redis_module_1.RedisModule,
                user_module_1.UserModule,
                user_profile_module_1.UserProfileModule,
                auth_token_module_1.AuthTokenModule,
                roles_module_1.RolesModule,
                rate_limit_module_1.RateLimitModule,
                shops_module_1.ShopsModule,
                wallet_module_1.WalletModule,
                chat_module_1.ChatModule,
                jwt_1.JwtModule.registerAsync({
                    imports: [app_config_module_1.AppConfigModule],
                    useFactory: function (appConfigService) { return ({
                        secret: appConfigService.jwt.secret,
                        signOptions: {
                            expiresIn: (appConfigService.jwt.expiresIn || '1d'),
                        },
                    }); },
                    inject: [app_config_service_1.AppConfigService],
                }),
            ],
            controllers: [auth_controller_1.AuthController],
            providers: [
                auth_service_1.AuthService,
                social_auth_service_1.SocialAuthService,
                verification_service_1.VerificationService,
                local_strategy_1.LocalStrategy,
                jwt_strategy_1.JwtStrategy,
                admin_jwt_strategy_1.AdminJwtStrategy,
            ],
            exports: [auth_service_1.AuthService, social_auth_service_1.SocialAuthService],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthModule = _classThis = /** @class */ (function () {
        function AuthModule_1() {
        }
        return AuthModule_1;
    }());
    __setFunctionName(_classThis, "AuthModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthModule = _classThis;
}();
exports.AuthModule = AuthModule;
