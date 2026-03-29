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
exports.AdminWalletTransactionModule = void 0;
var common_1 = require("@nestjs/common");
var admin_wallet_transaction_controller_1 = require("./admin-wallet-transaction.controller");
var admin_wallet_transaction_service_1 = require("./admin-wallet-transaction.service");
var admin_wallet_transaction_repository_1 = require("./admin-wallet-transaction.repository");
var admin_auth_module_1 = require("../auth/admin-auth.module");
var database_module_1 = require("@/database/database.module");
var wallet_repository_1 = require("../../user/wallet/wallet.repository");
var file_upload_module_1 = require("@/modules/file-upload/file-upload.module");
var notification_module_1 = require("@/modules/user/notification/notification.module");
var wallet_settings_module_1 = require("./wallet-settings.module");
var wallet_module_1 = require("@/modules/user/wallet/wallet.module");
var AdminWalletTransactionModule = function () {
    var _classDecorators = [(0, common_1.Module)({
            imports: [
                admin_auth_module_1.AdminAuthModule,
                database_module_1.DatabaseModule,
                file_upload_module_1.FileUploadModule,
                notification_module_1.NotificationModule,
                wallet_settings_module_1.WalletSettingsModule,
                (0, common_1.forwardRef)(function () { return wallet_module_1.WalletModule; }),
            ],
            controllers: [admin_wallet_transaction_controller_1.AdminWalletTransactionController],
            providers: [
                admin_wallet_transaction_service_1.AdminWalletTransactionService,
                admin_wallet_transaction_repository_1.AdminWalletTransactionRepository,
                wallet_repository_1.WalletRepository,
            ],
            exports: [admin_wallet_transaction_service_1.AdminWalletTransactionService],
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminWalletTransactionModule = _classThis = /** @class */ (function () {
        function AdminWalletTransactionModule_1() {
        }
        return AdminWalletTransactionModule_1;
    }());
    __setFunctionName(_classThis, "AdminWalletTransactionModule");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminWalletTransactionModule = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminWalletTransactionModule = _classThis;
}();
exports.AdminWalletTransactionModule = AdminWalletTransactionModule;
