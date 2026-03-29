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
exports.GetWithdrawalsDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var pagination_query_dto_1 = require("@/shared/pagination/dto/pagination-query.dto");
var wallet_transaction_entity_1 = require("@/database/entities/wallet-transaction.entity");
var GetWithdrawalsDto = function () {
    var _a;
    var _classSuper = pagination_query_dto_1.ExtendedPaginationQueryDto;
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _typeTransaction_decorators;
    var _typeTransaction_initializers = [];
    var _typeTransaction_extraInitializers = [];
    var _authorId_decorators;
    var _authorId_initializers = [];
    var _authorId_extraInitializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(GetWithdrawalsDto, _super);
            function GetWithdrawalsDto() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.status = __runInitializers(_this, _status_initializers, void 0);
                _this.typeTransaction = (__runInitializers(_this, _status_extraInitializers), __runInitializers(_this, _typeTransaction_initializers, void 0));
                _this.authorId = (__runInitializers(_this, _typeTransaction_extraInitializers), __runInitializers(_this, _authorId_initializers, void 0));
                __runInitializers(_this, _authorId_extraInitializers);
                return _this;
            }
            return GetWithdrawalsDto;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _status_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by transaction status (array)',
                    enum: ['pending', 'success', 'failed', 'canceled'],
                    isArray: true,
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    if (!value)
                        return [];
                    if (Array.isArray(value))
                        return value;
                    return [String(value)];
                }), (0, class_validator_1.IsEnum)(['pending', 'success', 'failed', 'canceled'], { each: true })];
            _typeTransaction_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by transaction type (array)',
                    enum: wallet_transaction_entity_1.WALLET_TRANSACTION_TYPES,
                    isArray: true,
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    if (!value)
                        return [];
                    if (Array.isArray(value))
                        return value.map(String);
                    return String(value).split(',');
                }), (0, class_validator_1.IsEnum)(wallet_transaction_entity_1.WALLET_TRANSACTION_TYPES, { each: true })];
            _authorId_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by author ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _typeTransaction_decorators, { kind: "field", name: "typeTransaction", static: false, private: false, access: { has: function (obj) { return "typeTransaction" in obj; }, get: function (obj) { return obj.typeTransaction; }, set: function (obj, value) { obj.typeTransaction = value; } }, metadata: _metadata }, _typeTransaction_initializers, _typeTransaction_extraInitializers);
            __esDecorate(null, null, _authorId_decorators, { kind: "field", name: "authorId", static: false, private: false, access: { has: function (obj) { return "authorId" in obj; }, get: function (obj) { return obj.authorId; }, set: function (obj, value) { obj.authorId = value; } }, metadata: _metadata }, _authorId_initializers, _authorId_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetWithdrawalsDto = GetWithdrawalsDto;
