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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositResponseDto = exports.BankInfoDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var BankInfoDto = function () {
    var _a;
    var _bank_code_decorators;
    var _bank_code_initializers = [];
    var _bank_code_extraInitializers = [];
    var _bank_number_decorators;
    var _bank_number_initializers = [];
    var _bank_number_extraInitializers = [];
    var _bank_name_decorators;
    var _bank_name_initializers = [];
    var _bank_name_extraInitializers = [];
    return _a = /** @class */ (function () {
            function BankInfoDto() {
                this.bank_code = __runInitializers(this, _bank_code_initializers, void 0);
                this.bank_number = (__runInitializers(this, _bank_code_extraInitializers), __runInitializers(this, _bank_number_initializers, void 0));
                this.bank_name = (__runInitializers(this, _bank_number_extraInitializers), __runInitializers(this, _bank_name_initializers, void 0));
                __runInitializers(this, _bank_name_extraInitializers);
            }
            return BankInfoDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _bank_code_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Mã ngân hàng',
                    example: 'VCB',
                })];
            _bank_number_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Số tài khoản ngân hàng',
                    example: '1234567890',
                })];
            _bank_name_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Tên chủ tài khoản ngân hàng',
                    example: 'NGUYEN VAN A',
                })];
            __esDecorate(null, null, _bank_code_decorators, { kind: "field", name: "bank_code", static: false, private: false, access: { has: function (obj) { return "bank_code" in obj; }, get: function (obj) { return obj.bank_code; }, set: function (obj, value) { obj.bank_code = value; } }, metadata: _metadata }, _bank_code_initializers, _bank_code_extraInitializers);
            __esDecorate(null, null, _bank_number_decorators, { kind: "field", name: "bank_number", static: false, private: false, access: { has: function (obj) { return "bank_number" in obj; }, get: function (obj) { return obj.bank_number; }, set: function (obj, value) { obj.bank_number = value; } }, metadata: _metadata }, _bank_number_initializers, _bank_number_extraInitializers);
            __esDecorate(null, null, _bank_name_decorators, { kind: "field", name: "bank_name", static: false, private: false, access: { has: function (obj) { return "bank_name" in obj; }, get: function (obj) { return obj.bank_name; }, set: function (obj, value) { obj.bank_name = value; } }, metadata: _metadata }, _bank_name_initializers, _bank_name_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.BankInfoDto = BankInfoDto;
var DepositResponseDto = function () {
    var _a;
    var _transaction_id_decorators;
    var _transaction_id_initializers = [];
    var _transaction_id_extraInitializers = [];
    var _transaction_number_decorators;
    var _transaction_number_initializers = [];
    var _transaction_number_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _payment_qr_link_decorators;
    var _payment_qr_link_initializers = [];
    var _payment_qr_link_extraInitializers = [];
    var _bank_info_decorators;
    var _bank_info_initializers = [];
    var _bank_info_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    return _a = /** @class */ (function () {
            function DepositResponseDto() {
                this.transaction_id = __runInitializers(this, _transaction_id_initializers, void 0);
                this.transaction_number = (__runInitializers(this, _transaction_id_extraInitializers), __runInitializers(this, _transaction_number_initializers, void 0));
                this.amount = (__runInitializers(this, _transaction_number_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
                this.content = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _content_initializers, void 0));
                this.payment_qr_link = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _payment_qr_link_initializers, void 0));
                this.bank_info = (__runInitializers(this, _payment_qr_link_extraInitializers), __runInitializers(this, _bank_info_initializers, void 0));
                this.created_at = (__runInitializers(this, _bank_info_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
                __runInitializers(this, _created_at_extraInitializers);
            }
            return DepositResponseDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _transaction_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'ID giao dịch',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                })];
            _transaction_number_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Số giao dịch',
                    example: '#00000001',
                })];
            _amount_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Số tiền nạp',
                    example: 100000,
                })];
            _content_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Nội dung thanh toán',
                    example: 'NH1690941600000ABCDE1234',
                })];
            _payment_qr_link_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'URL thanh toán QR',
                    example: 'https://payment.pay2s.vn/quicklink/190200/0000000000?amount=100000&memo=Nezhub&is_mask=0',
                })];
            _bank_info_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Thông tin ngân hàng',
                    type: BankInfoDto,
                })];
            _created_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Thời gian tạo giao dịch',
                    example: '2025-08-03T12:00:00Z',
                })];
            __esDecorate(null, null, _transaction_id_decorators, { kind: "field", name: "transaction_id", static: false, private: false, access: { has: function (obj) { return "transaction_id" in obj; }, get: function (obj) { return obj.transaction_id; }, set: function (obj, value) { obj.transaction_id = value; } }, metadata: _metadata }, _transaction_id_initializers, _transaction_id_extraInitializers);
            __esDecorate(null, null, _transaction_number_decorators, { kind: "field", name: "transaction_number", static: false, private: false, access: { has: function (obj) { return "transaction_number" in obj; }, get: function (obj) { return obj.transaction_number; }, set: function (obj, value) { obj.transaction_number = value; } }, metadata: _metadata }, _transaction_number_initializers, _transaction_number_extraInitializers);
            __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _payment_qr_link_decorators, { kind: "field", name: "payment_qr_link", static: false, private: false, access: { has: function (obj) { return "payment_qr_link" in obj; }, get: function (obj) { return obj.payment_qr_link; }, set: function (obj, value) { obj.payment_qr_link = value; } }, metadata: _metadata }, _payment_qr_link_initializers, _payment_qr_link_extraInitializers);
            __esDecorate(null, null, _bank_info_decorators, { kind: "field", name: "bank_info", static: false, private: false, access: { has: function (obj) { return "bank_info" in obj; }, get: function (obj) { return obj.bank_info; }, set: function (obj, value) { obj.bank_info = value; } }, metadata: _metadata }, _bank_info_initializers, _bank_info_extraInitializers);
            __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.DepositResponseDto = DepositResponseDto;
