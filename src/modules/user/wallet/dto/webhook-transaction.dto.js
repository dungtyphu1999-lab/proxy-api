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
exports.WebhookDepositDto = exports.WebhookTransactionDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var WebhookTransactionDto = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _gateway_decorators;
    var _gateway_initializers = [];
    var _gateway_extraInitializers = [];
    var _transactionDate_decorators;
    var _transactionDate_initializers = [];
    var _transactionDate_extraInitializers = [];
    var _transactionNumber_decorators;
    var _transactionNumber_initializers = [];
    var _transactionNumber_extraInitializers = [];
    var _accountNumber_decorators;
    var _accountNumber_initializers = [];
    var _accountNumber_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _transferType_decorators;
    var _transferType_initializers = [];
    var _transferType_extraInitializers = [];
    var _transferAmount_decorators;
    var _transferAmount_initializers = [];
    var _transferAmount_extraInitializers = [];
    var _checksum_decorators;
    var _checksum_initializers = [];
    var _checksum_extraInitializers = [];
    return _a = /** @class */ (function () {
            function WebhookTransactionDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.gateway = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _gateway_initializers, void 0));
                this.transactionDate = (__runInitializers(this, _gateway_extraInitializers), __runInitializers(this, _transactionDate_initializers, void 0));
                this.transactionNumber = (__runInitializers(this, _transactionDate_extraInitializers), __runInitializers(this, _transactionNumber_initializers, void 0));
                this.accountNumber = (__runInitializers(this, _transactionNumber_extraInitializers), __runInitializers(this, _accountNumber_initializers, void 0));
                this.content = (__runInitializers(this, _accountNumber_extraInitializers), __runInitializers(this, _content_initializers, void 0));
                this.transferType = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _transferType_initializers, void 0));
                this.transferAmount = (__runInitializers(this, _transferType_extraInitializers), __runInitializers(this, _transferAmount_initializers, void 0));
                this.checksum = (__runInitializers(this, _transferAmount_extraInitializers), __runInitializers(this, _checksum_initializers, void 0));
                __runInitializers(this, _checksum_extraInitializers);
            }
            return WebhookTransactionDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'ID giao dịch',
                    example: '1788052',
                }), (0, class_validator_1.IsString)()];
            _gateway_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Cổng thanh toán',
                    example: 'ACB',
                }), (0, class_validator_1.IsString)()];
            _transactionDate_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Ngày giao dịch',
                    example: '2025-04-01 00:02:18',
                }), (0, class_validator_1.IsDateString)()];
            _transactionNumber_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Số giao dịch',
                    example: '10418',
                }), (0, class_validator_1.IsString)()];
            _accountNumber_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Số tài khoản',
                    example: '12805521',
                }), (0, class_validator_1.IsString)()];
            _content_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Nội dung giao dịch',
                    example: 'SHOPVPS12537 GD 789604-040125 00:05:38',
                }), (0, class_validator_1.IsString)()];
            _transferType_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Loại giao dịch',
                    example: 'IN',
                    enum: ['IN', 'OUT'],
                }), (0, class_validator_1.IsIn)(['IN', 'OUT'])];
            _transferAmount_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Số tiền chuyển',
                    example: 50000,
                }), (0, class_validator_1.IsNumber)()];
            _checksum_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Checksum để verify',
                    example: '7e2b3bbc03d1083017e3d2a96d3b8e01',
                }), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _gateway_decorators, { kind: "field", name: "gateway", static: false, private: false, access: { has: function (obj) { return "gateway" in obj; }, get: function (obj) { return obj.gateway; }, set: function (obj, value) { obj.gateway = value; } }, metadata: _metadata }, _gateway_initializers, _gateway_extraInitializers);
            __esDecorate(null, null, _transactionDate_decorators, { kind: "field", name: "transactionDate", static: false, private: false, access: { has: function (obj) { return "transactionDate" in obj; }, get: function (obj) { return obj.transactionDate; }, set: function (obj, value) { obj.transactionDate = value; } }, metadata: _metadata }, _transactionDate_initializers, _transactionDate_extraInitializers);
            __esDecorate(null, null, _transactionNumber_decorators, { kind: "field", name: "transactionNumber", static: false, private: false, access: { has: function (obj) { return "transactionNumber" in obj; }, get: function (obj) { return obj.transactionNumber; }, set: function (obj, value) { obj.transactionNumber = value; } }, metadata: _metadata }, _transactionNumber_initializers, _transactionNumber_extraInitializers);
            __esDecorate(null, null, _accountNumber_decorators, { kind: "field", name: "accountNumber", static: false, private: false, access: { has: function (obj) { return "accountNumber" in obj; }, get: function (obj) { return obj.accountNumber; }, set: function (obj, value) { obj.accountNumber = value; } }, metadata: _metadata }, _accountNumber_initializers, _accountNumber_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _transferType_decorators, { kind: "field", name: "transferType", static: false, private: false, access: { has: function (obj) { return "transferType" in obj; }, get: function (obj) { return obj.transferType; }, set: function (obj, value) { obj.transferType = value; } }, metadata: _metadata }, _transferType_initializers, _transferType_extraInitializers);
            __esDecorate(null, null, _transferAmount_decorators, { kind: "field", name: "transferAmount", static: false, private: false, access: { has: function (obj) { return "transferAmount" in obj; }, get: function (obj) { return obj.transferAmount; }, set: function (obj, value) { obj.transferAmount = value; } }, metadata: _metadata }, _transferAmount_initializers, _transferAmount_extraInitializers);
            __esDecorate(null, null, _checksum_decorators, { kind: "field", name: "checksum", static: false, private: false, access: { has: function (obj) { return "checksum" in obj; }, get: function (obj) { return obj.checksum; }, set: function (obj, value) { obj.checksum = value; } }, metadata: _metadata }, _checksum_initializers, _checksum_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.WebhookTransactionDto = WebhookTransactionDto;
var WebhookDepositDto = function () {
    var _a;
    var _transactions_decorators;
    var _transactions_initializers = [];
    var _transactions_extraInitializers = [];
    return _a = /** @class */ (function () {
            function WebhookDepositDto() {
                this.transactions = __runInitializers(this, _transactions_initializers, void 0);
                __runInitializers(this, _transactions_extraInitializers);
            }
            return WebhookDepositDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _transactions_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Danh sách giao dịch',
                    type: [WebhookTransactionDto],
                }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return WebhookTransactionDto; })];
            __esDecorate(null, null, _transactions_decorators, { kind: "field", name: "transactions", static: false, private: false, access: { has: function (obj) { return "transactions" in obj; }, get: function (obj) { return obj.transactions; }, set: function (obj, value) { obj.transactions = value; } }, metadata: _metadata }, _transactions_initializers, _transactions_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.WebhookDepositDto = WebhookDepositDto;
