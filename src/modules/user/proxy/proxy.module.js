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
exports.ProxyModule = void 0;
var common_1 = require("@nestjs/common");
var proxy_controller_1 = require("./proxy.controller");
var proxy_service_1 = require("./proxy.service");
var proxy_repository_1 = require("./proxy.repository");
var wallet_module_1 = require("../wallet/wallet.module");
var database_module_1 = require("@/database/database.module");
var proxy_master_module_1 = require("@/modules/guest/proxy-master/proxy-master.module");
var webshare_config_module_1 = require("@/modules/webshare/webshare-config.module");
var admin_notification_module_1 = require("@/modules/admin/notifications/admin-notification.module");
var proxy_pending_orders_scheduler_1 = require("./proxy-pending-orders.scheduler");
var proxy_auto_renew_enforcer_scheduler_1 = require("./proxy-auto-renew-enforcer.scheduler");
var ProxyModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                wallet_module_1.WalletModule,
                database_module_1.DatabaseModule,
                proxy_master_module_1.ProxyMasterModule,
                webshare_config_module_1.WebshareConfigModule,
                admin_notification_module_1.AdminNotificationModule,
            ],
            controllers: [proxy_controller_1.ProxyController],
            providers: [
                proxy_service_1.ProxyService,
                proxy_repository_1.ProxyRepository,
                proxy_pending_orders_scheduler_1.ProxyPendingOrdersScheduler,
                proxy_auto_renew_enforcer_scheduler_1.ProxyAutoRenewEnforcerScheduler,
            ],
            exports: [proxy_service_1.ProxyService, proxy_repository_1.ProxyRepository],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProxyModule = _classThis = /** @class */ (function () {
        function ProxyModule_1() {
        }
        return ProxyModule_1;
    }());
    __setFunctionName(_classThis, "ProxyModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProxyModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProxyModule = _classThis;
}();
exports.ProxyModule = ProxyModule;
