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
exports.TransactionHistoryDto = exports.BankInfoDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var BankInfoDto = function () {
    var _a;
    var _bank_name_decorators;
    var _bank_name_initializers = [];
    var _bank_name_extraInitializers = [];
    var _account_number_decorators;
    var _account_number_initializers = [];
    var _account_number_extraInitializers = [];
    var _account_name_decorators;
    var _account_name_initializers = [];
    var _account_name_extraInitializers = [];
    var _note_decorators;
    var _note_initializers = [];
    var _note_extraInitializers = [];
    return _a = /** @class */ (function () {
            function BankInfoDto() {
                this.bank_name = __runInitializers(this, _bank_name_initializers, void 0);
                this.account_number = (__runInitializers(this, _bank_name_extraInitializers), __runInitializers(this, _account_number_initializers, void 0));
                this.account_name = (__runInitializers(this, _account_number_extraInitializers), __runInitializers(this, _account_name_initializers, void 0));
                this.note = (__runInitializers(this, _account_name_extraInitializers), __runInitializers(this, _note_initializers, void 0));
                __runInitializers(this, _note_extraInitializers);
            }
            return BankInfoDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _bank_name_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Tên ngân hàng',
                    example: 'Vietcombank',
                })];
            _account_number_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Số tài khoản',
                    example: '1234567890',
                })];
            _account_name_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Tên chủ tài khoản',
                    example: 'Nguyễn Văn A',
                })];
            _note_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Ghi chú ngân hàng',
                    example: 'Tài khoản chính',
                    required: false,
                })];
            __esDecorate(null, null, _bank_name_decorators, { kind: "field", name: "bank_name", static: false, private: false, access: { has: function (obj) { return "bank_name" in obj; }, get: function (obj) { return obj.bank_name; }, set: function (obj, value) { obj.bank_name = value; } }, metadata: _metadata }, _bank_name_initializers, _bank_name_extraInitializers);
            __esDecorate(null, null, _account_number_decorators, { kind: "field", name: "account_number", static: false, private: false, access: { has: function (obj) { return "account_number" in obj; }, get: function (obj) { return obj.account_number; }, set: function (obj, value) { obj.account_number = value; } }, metadata: _metadata }, _account_number_initializers, _account_number_extraInitializers);
            __esDecorate(null, null, _account_name_decorators, { kind: "field", name: "account_name", static: false, private: false, access: { has: function (obj) { return "account_name" in obj; }, get: function (obj) { return obj.account_name; }, set: function (obj, value) { obj.account_name = value; } }, metadata: _metadata }, _account_name_initializers, _account_name_extraInitializers);
            __esDecorate(null, null, _note_decorators, { kind: "field", name: "note", static: false, private: false, access: { has: function (obj) { return "note" in obj; }, get: function (obj) { return obj.note; }, set: function (obj, value) { obj.note = value; } }, metadata: _metadata }, _note_initializers, _note_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.BankInfoDto = BankInfoDto;
var TransactionHistoryDto = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _transaction_number_decorators;
    var _transaction_number_initializers = [];
    var _transaction_number_extraInitializers = [];
    var _display_transaction_number_decorators;
    var _display_transaction_number_initializers = [];
    var _display_transaction_number_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _method_decorators;
    var _method_initializers = [];
    var _method_extraInitializers = [];
    var _bank_info_decorators;
    var _bank_info_initializers = [];
    var _bank_info_extraInitializers = [];
    var _note_decorators;
    var _note_initializers = [];
    var _note_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var _start_date_decorators;
    var _start_date_initializers = [];
    var _start_date_extraInitializers = [];
    var _end_date_decorators;
    var _end_date_initializers = [];
    var _end_date_extraInitializers = [];
    var _completed_at_decorators;
    var _completed_at_initializers = [];
    var _completed_at_extraInitializers = [];
    return _a = /** @class */ (function () {
            function TransactionHistoryDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.transaction_number = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _transaction_number_initializers, void 0));
                this.display_transaction_number = (__runInitializers(this, _transaction_number_extraInitializers), __runInitializers(this, _display_transaction_number_initializers, void 0));
                this.type = (__runInitializers(this, _display_transaction_number_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.amount = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
                this.status = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                this.method = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _method_initializers, void 0));
                this.bank_info = (__runInitializers(this, _method_extraInitializers), __runInitializers(this, _bank_info_initializers, void 0));
                this.note = (__runInitializers(this, _bank_info_extraInitializers), __runInitializers(this, _note_initializers, void 0));
                this.created_at = (__runInitializers(this, _note_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
                this.start_date = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _start_date_initializers, void 0));
                this.end_date = (__runInitializers(this, _start_date_extraInitializers), __runInitializers(this, _end_date_initializers, void 0));
                this.completed_at = (__runInitializers(this, _end_date_extraInitializers), __runInitializers(this, _completed_at_initializers, void 0));
                __runInitializers(this, _completed_at_extraInitializers);
            }
            return TransactionHistoryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'ID của giao dịch',
                    example: 'uuid-string',
                })];
            _transaction_number_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Mã giao dịch',
                    example: 'WD20241201123456',
                })];
            _display_transaction_number_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Mã giao dịch hiển thị (ví dụ SMM sẽ dùng provider order id hoặc mã đơn SMM)',
                    example: '78915888',
                    required: false,
                })];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Loại giao dịch',
                    example: 'deposit',
                    enum: [
                        'deposit',
                        'withdraw',
                        'transfer',
                        'refund',
                        'payment',
                        'order_release',
                        'order',
                        'PROXY',
                    ],
                })];
            _amount_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Số tiền',
                    example: 50000,
                })];
            _status_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Trạng thái giao dịch',
                    example: 'success',
                    enum: ['pending', 'success', 'failed', 'cancelled'],
                })];
            _method_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Phương thức thanh toán',
                    example: 'pay2s',
                    required: false,
                })];
            _bank_info_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Thông tin ngân hàng',
                    type: BankInfoDto,
                    required: false,
                })];
            _note_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Ghi chú',
                    example: 'Rút tiền về tài khoản chính',
                    required: false,
                })];
            _created_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Thời gian tạo giao dịch',
                    example: '2024-12-01T12:34:56.000Z',
                })];
            _start_date_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Thời gian bắt đầu',
                    example: '2024-12-01T12:34:56.000Z',
                })];
            _end_date_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Thời gian kết thúc',
                    example: '2024-12-01T12:34:56.000Z',
                })];
            _completed_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Thời gian hoàn thành giao dịch',
                    example: '2024-12-01T13:00:00.000Z',
                    required: false,
                })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _transaction_number_decorators, { kind: "field", name: "transaction_number", static: false, private: false, access: { has: function (obj) { return "transaction_number" in obj; }, get: function (obj) { return obj.transaction_number; }, set: function (obj, value) { obj.transaction_number = value; } }, metadata: _metadata }, _transaction_number_initializers, _transaction_number_extraInitializers);
            __esDecorate(null, null, _display_transaction_number_decorators, { kind: "field", name: "display_transaction_number", static: false, private: false, access: { has: function (obj) { return "display_transaction_number" in obj; }, get: function (obj) { return obj.display_transaction_number; }, set: function (obj, value) { obj.display_transaction_number = value; } }, metadata: _metadata }, _display_transaction_number_initializers, _display_transaction_number_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _method_decorators, { kind: "field", name: "method", static: false, private: false, access: { has: function (obj) { return "method" in obj; }, get: function (obj) { return obj.method; }, set: function (obj, value) { obj.method = value; } }, metadata: _metadata }, _method_initializers, _method_extraInitializers);
            __esDecorate(null, null, _bank_info_decorators, { kind: "field", name: "bank_info", static: false, private: false, access: { has: function (obj) { return "bank_info" in obj; }, get: function (obj) { return obj.bank_info; }, set: function (obj, value) { obj.bank_info = value; } }, metadata: _metadata }, _bank_info_initializers, _bank_info_extraInitializers);
            __esDecorate(null, null, _note_decorators, { kind: "field", name: "note", static: false, private: false, access: { has: function (obj) { return "note" in obj; }, get: function (obj) { return obj.note; }, set: function (obj, value) { obj.note = value; } }, metadata: _metadata }, _note_initializers, _note_extraInitializers);
            __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
            __esDecorate(null, null, _start_date_decorators, { kind: "field", name: "start_date", static: false, private: false, access: { has: function (obj) { return "start_date" in obj; }, get: function (obj) { return obj.start_date; }, set: function (obj, value) { obj.start_date = value; } }, metadata: _metadata }, _start_date_initializers, _start_date_extraInitializers);
            __esDecorate(null, null, _end_date_decorators, { kind: "field", name: "end_date", static: false, private: false, access: { has: function (obj) { return "end_date" in obj; }, get: function (obj) { return obj.end_date; }, set: function (obj, value) { obj.end_date = value; } }, metadata: _metadata }, _end_date_initializers, _end_date_extraInitializers);
            __esDecorate(null, null, _completed_at_decorators, { kind: "field", name: "completed_at", static: false, private: false, access: { has: function (obj) { return "completed_at" in obj; }, get: function (obj) { return obj.completed_at; }, set: function (obj, value) { obj.completed_at = value; } }, metadata: _metadata }, _completed_at_initializers, _completed_at_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.TransactionHistoryDto = TransactionHistoryDto;
