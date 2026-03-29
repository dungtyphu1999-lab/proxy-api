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
exports.AdminWithdrawResponseDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var AdminWithdrawResponseDto = function () {
    var _a;
    var _transaction_id_decorators;
    var _transaction_id_initializers = [];
    var _transaction_id_extraInitializers = [];
    var _transaction_number_decorators;
    var _transaction_number_initializers = [];
    var _transaction_number_extraInitializers = [];
    var _user_id_decorators;
    var _user_id_initializers = [];
    var _user_id_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _amount_decorators;
    var _amount_initializers = [];
    var _amount_extraInitializers = [];
    var _bank_info_decorators;
    var _bank_info_initializers = [];
    var _bank_info_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _note_decorators;
    var _note_initializers = [];
    var _note_extraInitializers = [];
    var _transfer_proof_path_decorators;
    var _transfer_proof_path_initializers = [];
    var _transfer_proof_path_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var _completed_at_decorators;
    var _completed_at_initializers = [];
    var _completed_at_extraInitializers = [];
    return _a = /** @class */ (function () {
            function AdminWithdrawResponseDto() {
                this.transaction_id = __runInitializers(this, _transaction_id_initializers, void 0);
                this.transaction_number = (__runInitializers(this, _transaction_id_extraInitializers), __runInitializers(this, _transaction_number_initializers, void 0));
                this.user_id = (__runInitializers(this, _transaction_number_extraInitializers), __runInitializers(this, _user_id_initializers, void 0));
                this.user = (__runInitializers(this, _user_id_extraInitializers), __runInitializers(this, _user_initializers, void 0));
                this.amount = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _amount_initializers, void 0));
                this.bank_info = (__runInitializers(this, _amount_extraInitializers), __runInitializers(this, _bank_info_initializers, void 0));
                this.status = (__runInitializers(this, _bank_info_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                this.note = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _note_initializers, void 0));
                this.transfer_proof_path = (__runInitializers(this, _note_extraInitializers), __runInitializers(this, _transfer_proof_path_initializers, void 0));
                this.created_at = (__runInitializers(this, _transfer_proof_path_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
                this.completed_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _completed_at_initializers, void 0));
                __runInitializers(this, _completed_at_extraInitializers);
            }
            return AdminWithdrawResponseDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _transaction_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'ID của giao dịch rút tiền',
                    example: 'uuid-string',
                })];
            _transaction_number_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Mã giao dịch',
                    example: 'WD20241201123456',
                })];
            _user_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'ID người dùng',
                    example: 'user-uuid',
                })];
            _user_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Thông tin người dùng',
                    example: {
                        id: 'user-uuid',
                        username: 'john_doe',
                        email: 'john@example.com',
                    },
                })];
            _amount_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Số tiền rút',
                    example: 50000,
                })];
            _bank_info_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Thông tin ngân hàng',
                    example: {
                        bank_name: 'Vietcombank',
                        account_number: '1234567890',
                        account_name: 'Nguyễn Văn A',
                    },
                })];
            _status_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Trạng thái giao dịch',
                    example: 'pending',
                })];
            _note_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Ghi chú',
                    example: 'Rút tiền về tài khoản chính',
                    required: false,
                })];
            _transfer_proof_path_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Bằng chứng bill chuyển khoản',
                    required: false,
                })];
            _created_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Thời gian tạo giao dịch',
                    example: '2024-12-01T12:34:56.000Z',
                })];
            _completed_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Thời gian hoàn thành giao dịch',
                    example: '2024-12-01T13:00:00.000Z',
                    required: false,
                })];
            __esDecorate(null, null, _transaction_id_decorators, { kind: "field", name: "transaction_id", static: false, private: false, access: { has: function (obj) { return "transaction_id" in obj; }, get: function (obj) { return obj.transaction_id; }, set: function (obj, value) { obj.transaction_id = value; } }, metadata: _metadata }, _transaction_id_initializers, _transaction_id_extraInitializers);
            __esDecorate(null, null, _transaction_number_decorators, { kind: "field", name: "transaction_number", static: false, private: false, access: { has: function (obj) { return "transaction_number" in obj; }, get: function (obj) { return obj.transaction_number; }, set: function (obj, value) { obj.transaction_number = value; } }, metadata: _metadata }, _transaction_number_initializers, _transaction_number_extraInitializers);
            __esDecorate(null, null, _user_id_decorators, { kind: "field", name: "user_id", static: false, private: false, access: { has: function (obj) { return "user_id" in obj; }, get: function (obj) { return obj.user_id; }, set: function (obj, value) { obj.user_id = value; } }, metadata: _metadata }, _user_id_initializers, _user_id_extraInitializers);
            __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
            __esDecorate(null, null, _amount_decorators, { kind: "field", name: "amount", static: false, private: false, access: { has: function (obj) { return "amount" in obj; }, get: function (obj) { return obj.amount; }, set: function (obj, value) { obj.amount = value; } }, metadata: _metadata }, _amount_initializers, _amount_extraInitializers);
            __esDecorate(null, null, _bank_info_decorators, { kind: "field", name: "bank_info", static: false, private: false, access: { has: function (obj) { return "bank_info" in obj; }, get: function (obj) { return obj.bank_info; }, set: function (obj, value) { obj.bank_info = value; } }, metadata: _metadata }, _bank_info_initializers, _bank_info_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _note_decorators, { kind: "field", name: "note", static: false, private: false, access: { has: function (obj) { return "note" in obj; }, get: function (obj) { return obj.note; }, set: function (obj, value) { obj.note = value; } }, metadata: _metadata }, _note_initializers, _note_extraInitializers);
            __esDecorate(null, null, _transfer_proof_path_decorators, { kind: "field", name: "transfer_proof_path", static: false, private: false, access: { has: function (obj) { return "transfer_proof_path" in obj; }, get: function (obj) { return obj.transfer_proof_path; }, set: function (obj, value) { obj.transfer_proof_path = value; } }, metadata: _metadata }, _transfer_proof_path_initializers, _transfer_proof_path_extraInitializers);
            __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
            __esDecorate(null, null, _completed_at_decorators, { kind: "field", name: "completed_at", static: false, private: false, access: { has: function (obj) { return "completed_at" in obj; }, get: function (obj) { return obj.completed_at; }, set: function (obj, value) { obj.completed_at = value; } }, metadata: _metadata }, _completed_at_initializers, _completed_at_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.AdminWithdrawResponseDto = AdminWithdrawResponseDto;
