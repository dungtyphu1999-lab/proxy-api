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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletBalanceResponseDto = exports.WalletBalanceDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var response_dto_1 = require("@/shared/dto/response.dto");
var WalletBalanceDto = function () {
    var _a;
    var _balance_decorators;
    var _balance_initializers = [];
    var _balance_extraInitializers = [];
    var _deposit_balance_decorators;
    var _deposit_balance_initializers = [];
    var _deposit_balance_extraInitializers = [];
    var _sale_balance_decorators;
    var _sale_balance_initializers = [];
    var _sale_balance_extraInitializers = [];
    var _locked_balance_decorators;
    var _locked_balance_initializers = [];
    var _locked_balance_extraInitializers = [];
    var _currency_decorators;
    var _currency_initializers = [];
    var _currency_extraInitializers = [];
    var _is_locked_decorators;
    var _is_locked_initializers = [];
    var _is_locked_extraInitializers = [];
    return _a = /** @class */ (function () {
            function WalletBalanceDto() {
                this.balance = __runInitializers(this, _balance_initializers, void 0);
                this.deposit_balance = (__runInitializers(this, _balance_extraInitializers), __runInitializers(this, _deposit_balance_initializers, void 0));
                this.sale_balance = (__runInitializers(this, _deposit_balance_extraInitializers), __runInitializers(this, _sale_balance_initializers, void 0));
                this.locked_balance = (__runInitializers(this, _sale_balance_extraInitializers), __runInitializers(this, _locked_balance_initializers, void 0));
                this.currency = (__runInitializers(this, _locked_balance_extraInitializers), __runInitializers(this, _currency_initializers, void 0));
                this.is_locked = (__runInitializers(this, _currency_extraInitializers), __runInitializers(this, _is_locked_initializers, void 0));
                __runInitializers(this, _is_locked_extraInitializers);
            }
            return WalletBalanceDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _balance_decorators = [(0, swagger_1.ApiProperty)({ description: 'Số dư ví', example: 1200000 })];
            _deposit_balance_decorators = [(0, swagger_1.ApiProperty)({ description: 'Số dư nạp', example: 500000 })];
            _sale_balance_decorators = [(0, swagger_1.ApiProperty)({ description: 'Số dư bán', example: 700000 })];
            _locked_balance_decorators = [(0, swagger_1.ApiProperty)({ description: 'Số dư bị khóa', example: 0 })];
            _currency_decorators = [(0, swagger_1.ApiProperty)({ description: 'Đơn vị tiền tệ', example: 'VND' })];
            _is_locked_decorators = [(0, swagger_1.ApiProperty)({ description: 'Trạng thái khóa ví', example: false })];
            __esDecorate(null, null, _balance_decorators, { kind: "field", name: "balance", static: false, private: false, access: { has: function (obj) { return "balance" in obj; }, get: function (obj) { return obj.balance; }, set: function (obj, value) { obj.balance = value; } }, metadata: _metadata }, _balance_initializers, _balance_extraInitializers);
            __esDecorate(null, null, _deposit_balance_decorators, { kind: "field", name: "deposit_balance", static: false, private: false, access: { has: function (obj) { return "deposit_balance" in obj; }, get: function (obj) { return obj.deposit_balance; }, set: function (obj, value) { obj.deposit_balance = value; } }, metadata: _metadata }, _deposit_balance_initializers, _deposit_balance_extraInitializers);
            __esDecorate(null, null, _sale_balance_decorators, { kind: "field", name: "sale_balance", static: false, private: false, access: { has: function (obj) { return "sale_balance" in obj; }, get: function (obj) { return obj.sale_balance; }, set: function (obj, value) { obj.sale_balance = value; } }, metadata: _metadata }, _sale_balance_initializers, _sale_balance_extraInitializers);
            __esDecorate(null, null, _locked_balance_decorators, { kind: "field", name: "locked_balance", static: false, private: false, access: { has: function (obj) { return "locked_balance" in obj; }, get: function (obj) { return obj.locked_balance; }, set: function (obj, value) { obj.locked_balance = value; } }, metadata: _metadata }, _locked_balance_initializers, _locked_balance_extraInitializers);
            __esDecorate(null, null, _currency_decorators, { kind: "field", name: "currency", static: false, private: false, access: { has: function (obj) { return "currency" in obj; }, get: function (obj) { return obj.currency; }, set: function (obj, value) { obj.currency = value; } }, metadata: _metadata }, _currency_initializers, _currency_extraInitializers);
            __esDecorate(null, null, _is_locked_decorators, { kind: "field", name: "is_locked", static: false, private: false, access: { has: function (obj) { return "is_locked" in obj; }, get: function (obj) { return obj.is_locked; }, set: function (obj, value) { obj.is_locked = value; } }, metadata: _metadata }, _is_locked_initializers, _is_locked_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.WalletBalanceDto = WalletBalanceDto;
var WalletBalanceResponseDto = /** @class */ (function (_super) {
    __extends(WalletBalanceResponseDto, _super);
    function WalletBalanceResponseDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WalletBalanceResponseDto;
}(response_dto_1.SuccessResponseDto));
exports.WalletBalanceResponseDto = WalletBalanceResponseDto;
