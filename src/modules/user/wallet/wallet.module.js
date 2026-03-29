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
exports.WalletModule = void 0;
var common_1 = require("@nestjs/common");
var wallet_controller_1 = require("./wallet.controller");
var wallet_service_1 = require("./wallet.service");
var wallet_repository_1 = require("./wallet.repository");
var wallet_transaction_repository_1 = require("./wallet-transaction.repository");
var pay2s_service_1 = require("./pay2s.service");
var webhook_service_1 = require("./webhook.service");
var wallet_release_service_1 = require("./wallet-release.service");
var wallet_release_scheduler_1 = require("./wallet-release.scheduler");
var database_module_1 = require("@/database/database.module");
var shop_requests_repository_1 = require("../shop-requests/shop-requests.repository");
var admin_notification_module_1 = require("@/modules/admin/notifications/admin-notification.module");
var notification_module_1 = require("@/modules/user/notification/notification.module");
var user_module_1 = require("../user/user.module");
var order_complaints_repository_1 = require("../order-complaints/order-complaints.repository");
var wallet_settings_module_1 = require("@/modules/admin/wallet/wallet-settings.module");
var WalletModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                database_module_1.DatabaseModule,
                admin_notification_module_1.AdminNotificationModule,
                notification_module_1.NotificationModule,
                user_module_1.UserModule,
                wallet_settings_module_1.WalletSettingsModule,
            ],
            controllers: [wallet_controller_1.WalletController],
            providers: [
                wallet_service_1.WalletService,
                wallet_repository_1.WalletRepository,
                wallet_transaction_repository_1.WalletTransactionRepository,
                pay2s_service_1.Pay2SService,
                webhook_service_1.WebhookService,
                shop_requests_repository_1.ShopRequestsRepository,
                wallet_release_service_1.WalletReleaseService,
                wallet_release_scheduler_1.WalletReleaseScheduler,
                order_complaints_repository_1.OrderComplaintsRepository,
            ],
            exports: [
                wallet_service_1.WalletService,
                wallet_repository_1.WalletRepository,
                wallet_transaction_repository_1.WalletTransactionRepository,
                wallet_release_service_1.WalletReleaseService,
            ],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var WalletModule = _classThis = /** @class */ (function () {
        function WalletModule_1() {
        }
        return WalletModule_1;
    }());
    __setFunctionName(_classThis, "WalletModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WalletModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WalletModule = _classThis;
}();
exports.WalletModule = WalletModule;
