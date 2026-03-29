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
exports.AdminAuthModule = void 0;
var common_1 = require("@nestjs/common");
var admin_jwt_auth_guard_1 = require("./guards/admin-jwt-auth.guard");
var admin_jwt_strategy_1 = require("@/modules/user/auth/strategies/admin-jwt.strategy");
var admin_auth_controller_1 = require("./admin-auth.controller");
var admin_auth_service_1 = require("./admin-auth.service");
var user_module_1 = require("@/modules/user/user/user.module");
var auth_module_1 = require("@/modules/user/auth/auth.module");
var auth_token_module_1 = require("@/modules/user/auth-token/auth-token.module");
var roles_module_1 = require("@/modules/user/roles/roles.module");
var verification_service_1 = require("@/modules/user/auth/verification.service");
var email_module_1 = require("@/modules/email/email.module");
var redis_module_1 = require("@/redis/redis.module");
var AdminAuthModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                redis_module_1.RedisModule,
                email_module_1.EmailModule,
                user_module_1.UserModule,
                auth_module_1.AuthModule,
                auth_token_module_1.AuthTokenModule,
                roles_module_1.RolesModule,
            ],
            controllers: [admin_auth_controller_1.AdminAuthController],
            providers: [
                admin_jwt_auth_guard_1.AdminJwtAuthGuard,
                admin_jwt_strategy_1.AdminJwtStrategy,
                admin_auth_service_1.AdminAuthService,
                verification_service_1.VerificationService,
            ],
            exports: [admin_jwt_auth_guard_1.AdminJwtAuthGuard, admin_auth_service_1.AdminAuthService],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminAuthModule = _classThis = /** @class */ (function () {
        function AdminAuthModule_1() {
        }
        return AdminAuthModule_1;
    }());
    __setFunctionName(_classThis, "AdminAuthModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminAuthModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminAuthModule = _classThis;
}();
exports.AdminAuthModule = AdminAuthModule;
