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
exports.PaginatedResponseDto = exports.PaginationMetaDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
/**
 * Comprehensive pagination metadata DTO for API responses
 */
var PaginationMetaDto = function () {
    var _a;
    var _total_decorators;
    var _total_initializers = [];
    var _total_extraInitializers = [];
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _limit_decorators;
    var _limit_initializers = [];
    var _limit_extraInitializers = [];
    var _totalPages_decorators;
    var _totalPages_initializers = [];
    var _totalPages_extraInitializers = [];
    var _hasPreviousPage_decorators;
    var _hasPreviousPage_initializers = [];
    var _hasPreviousPage_extraInitializers = [];
    var _hasNextPage_decorators;
    var _hasNextPage_initializers = [];
    var _hasNextPage_extraInitializers = [];
    var _previousPage_decorators;
    var _previousPage_initializers = [];
    var _previousPage_extraInitializers = [];
    var _nextPage_decorators;
    var _nextPage_initializers = [];
    var _nextPage_extraInitializers = [];
    return _a = /** @class */ (function () {
            function PaginationMetaDto() {
                this.total = __runInitializers(this, _total_initializers, void 0);
                this.page = (__runInitializers(this, _total_extraInitializers), __runInitializers(this, _page_initializers, void 0));
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, void 0));
                this.totalPages = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _totalPages_initializers, void 0));
                this.hasPreviousPage = (__runInitializers(this, _totalPages_extraInitializers), __runInitializers(this, _hasPreviousPage_initializers, void 0));
                this.hasNextPage = (__runInitializers(this, _hasPreviousPage_extraInitializers), __runInitializers(this, _hasNextPage_initializers, void 0));
                this.previousPage = (__runInitializers(this, _hasNextPage_extraInitializers), __runInitializers(this, _previousPage_initializers, void 0));
                this.nextPage = (__runInitializers(this, _previousPage_extraInitializers), __runInitializers(this, _nextPage_initializers, void 0));
                __runInitializers(this, _nextPage_extraInitializers);
            }
            return PaginationMetaDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _total_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Total number of items across all pages',
                    example: 100,
                    minimum: 0,
                }), (0, class_validator_1.IsInt)({ message: 'Total must be an integer' }), (0, class_validator_1.Min)(0, { message: 'Total cannot be negative' })];
            _page_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Current page number (1-based)',
                    example: 1,
                    minimum: 1,
                }), (0, class_validator_1.IsInt)({ message: 'Page must be an integer' }), (0, class_validator_1.Min)(1, { message: 'Page must be greater than 0' })];
            _limit_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of items per page',
                    example: 10,
                    minimum: 1,
                }), (0, class_validator_1.IsInt)({ message: 'Limit must be an integer' }), (0, class_validator_1.Min)(1, { message: 'Limit must be greater than 0' })];
            _totalPages_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Total number of pages',
                    example: 10,
                    minimum: 0,
                }), (0, class_validator_1.IsInt)({ message: 'Total pages must be an integer' }), (0, class_validator_1.Min)(0, { message: 'Total pages cannot be negative' })];
            _hasPreviousPage_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether there is a previous page',
                    example: false,
                }), (0, class_validator_1.IsBoolean)({ message: 'Has previous page must be a boolean' })];
            _hasNextPage_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether there is a next page',
                    example: true,
                }), (0, class_validator_1.IsBoolean)({ message: 'Has next page must be a boolean' })];
            _previousPage_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Previous page number (null if on first page)',
                    example: null,
                    nullable: true,
                })];
            _nextPage_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Next page number (null if on last page)',
                    example: 2,
                    nullable: true,
                })];
            __esDecorate(null, null, _total_decorators, { kind: "field", name: "total", static: false, private: false, access: { has: function (obj) { return "total" in obj; }, get: function (obj) { return obj.total; }, set: function (obj, value) { obj.total = value; } }, metadata: _metadata }, _total_initializers, _total_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            __esDecorate(null, null, _totalPages_decorators, { kind: "field", name: "totalPages", static: false, private: false, access: { has: function (obj) { return "totalPages" in obj; }, get: function (obj) { return obj.totalPages; }, set: function (obj, value) { obj.totalPages = value; } }, metadata: _metadata }, _totalPages_initializers, _totalPages_extraInitializers);
            __esDecorate(null, null, _hasPreviousPage_decorators, { kind: "field", name: "hasPreviousPage", static: false, private: false, access: { has: function (obj) { return "hasPreviousPage" in obj; }, get: function (obj) { return obj.hasPreviousPage; }, set: function (obj, value) { obj.hasPreviousPage = value; } }, metadata: _metadata }, _hasPreviousPage_initializers, _hasPreviousPage_extraInitializers);
            __esDecorate(null, null, _hasNextPage_decorators, { kind: "field", name: "hasNextPage", static: false, private: false, access: { has: function (obj) { return "hasNextPage" in obj; }, get: function (obj) { return obj.hasNextPage; }, set: function (obj, value) { obj.hasNextPage = value; } }, metadata: _metadata }, _hasNextPage_initializers, _hasNextPage_extraInitializers);
            __esDecorate(null, null, _previousPage_decorators, { kind: "field", name: "previousPage", static: false, private: false, access: { has: function (obj) { return "previousPage" in obj; }, get: function (obj) { return obj.previousPage; }, set: function (obj, value) { obj.previousPage = value; } }, metadata: _metadata }, _previousPage_initializers, _previousPage_extraInitializers);
            __esDecorate(null, null, _nextPage_decorators, { kind: "field", name: "nextPage", static: false, private: false, access: { has: function (obj) { return "nextPage" in obj; }, get: function (obj) { return obj.nextPage; }, set: function (obj, value) { obj.nextPage = value; } }, metadata: _metadata }, _nextPage_initializers, _nextPage_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.PaginationMetaDto = PaginationMetaDto;
/**
 * Standard paginated response DTO
 * @template T - Type of the data items being paginated
 */
var PaginatedResponseDto = function () {
    var _a;
    var _data_decorators;
    var _data_initializers = [];
    var _data_extraInitializers = [];
    var _meta_decorators;
    var _meta_initializers = [];
    var _meta_extraInitializers = [];
    return _a = /** @class */ (function () {
            function PaginatedResponseDto() {
                this.data = __runInitializers(this, _data_initializers, void 0);
                this.meta = (__runInitializers(this, _data_extraInitializers), __runInitializers(this, _meta_initializers, void 0));
                __runInitializers(this, _meta_extraInitializers);
            }
            return PaginatedResponseDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _data_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Array of data items for the current page',
                    isArray: true,
                })];
            _meta_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Comprehensive pagination metadata',
                    type: PaginationMetaDto,
                }), (0, class_transformer_1.Type)(function () { return PaginationMetaDto; })];
            __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: function (obj) { return "data" in obj; }, get: function (obj) { return obj.data; }, set: function (obj, value) { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
            __esDecorate(null, null, _meta_decorators, { kind: "field", name: "meta", static: false, private: false, access: { has: function (obj) { return "meta" in obj; }, get: function (obj) { return obj.meta; }, set: function (obj, value) { obj.meta = value; } }, metadata: _metadata }, _meta_initializers, _meta_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.PaginatedResponseDto = PaginatedResponseDto;
