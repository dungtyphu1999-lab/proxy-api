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
exports.ExtendedPaginationQueryDto = exports.PaginationQueryDto = void 0;
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var swagger_1 = require("@nestjs/swagger");
var pagination_constants_1 = require("../pagination.constants");
/**
 * Base pagination query DTO with validation and transformation
 */
var PaginationQueryDto = function () {
    var _a;
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _limit_decorators;
    var _limit_initializers = [];
    var _limit_extraInitializers = [];
    var _search_decorators;
    var _search_initializers = [];
    var _search_extraInitializers = [];
    var _orderBy_decorators;
    var _orderBy_initializers = [];
    var _orderBy_extraInitializers = [];
    var _orderDir_decorators;
    var _orderDir_initializers = [];
    var _orderDir_extraInitializers = [];
    return _a = /** @class */ (function () {
            function PaginationQueryDto() {
                this.page = __runInitializers(this, _page_initializers, pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_PAGE);
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_LIMIT));
                this.search = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _search_initializers, void 0));
                this.orderBy = (__runInitializers(this, _search_extraInitializers), __runInitializers(this, _orderBy_initializers, pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_ORDER_BY));
                this.orderDir = (__runInitializers(this, _orderBy_extraInitializers), __runInitializers(this, _orderDir_initializers, pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_ORDER_DIR));
                __runInitializers(this, _orderDir_extraInitializers);
            }
            Object.defineProperty(PaginationQueryDto.prototype, "offset", {
                /**
                 * Calculate the offset for database queries
                 */
                get: function () {
                    return (((this.page || pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_PAGE) - 1) *
                        (this.limit || pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_LIMIT));
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(PaginationQueryDto.prototype, "paginationOptions", {
                /**
                 * Get normalized pagination options
                 */
                get: function () {
                    var _b, _c;
                    return {
                        page: this.page || pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_PAGE,
                        limit: this.limit || pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_LIMIT,
                        search: ((_b = this.search) === null || _b === void 0 ? void 0 : _b.trim()) || undefined,
                        orderBy: ((_c = this.orderBy) === null || _c === void 0 ? void 0 : _c.trim()) || pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_ORDER_BY,
                        orderDir: this.orderDir || pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_ORDER_DIR,
                    };
                },
                enumerable: false,
                configurable: true
            });
            return PaginationQueryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _page_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Page number (1-based)',
                    example: 1,
                    minimum: 1,
                    default: pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_PAGE,
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsInt)({ message: 'Page must be an integer' }), (0, class_validator_1.Min)(1, { message: 'Page must be greater than 0' }), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return Math.max(1, parseInt(String(value)) || pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_PAGE);
                })];
            _limit_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Number of items per page',
                    example: 10,
                    minimum: pagination_constants_1.PAGINATION_CONSTANTS.MIN_LIMIT,
                    maximum: pagination_constants_1.PAGINATION_CONSTANTS.MAX_LIMIT,
                    default: pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_LIMIT,
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsInt)({ message: 'Limit must be an integer' }), (0, class_validator_1.Min)(pagination_constants_1.PAGINATION_CONSTANTS.MIN_LIMIT, {
                    message: "Limit must be at least ".concat(pagination_constants_1.PAGINATION_CONSTANTS.MIN_LIMIT),
                }), (0, class_validator_1.Max)(pagination_constants_1.PAGINATION_CONSTANTS.MAX_LIMIT, {
                    message: "Limit cannot exceed ".concat(pagination_constants_1.PAGINATION_CONSTANTS.MAX_LIMIT),
                }), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return Math.min(pagination_constants_1.PAGINATION_CONSTANTS.MAX_LIMIT, Math.max(pagination_constants_1.PAGINATION_CONSTANTS.MIN_LIMIT, parseInt(String(value)) || pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_LIMIT));
                })];
            _search_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Search term for filtering results',
                    example: 'search text',
                    maxLength: pagination_constants_1.PAGINATION_CONSTANTS.MAX_SEARCH_LENGTH,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'Search must be a string' }), (0, class_validator_1.MaxLength)(pagination_constants_1.PAGINATION_CONSTANTS.MAX_SEARCH_LENGTH, {
                    message: "Search term cannot exceed ".concat(pagination_constants_1.PAGINATION_CONSTANTS.MAX_SEARCH_LENGTH, " characters"),
                }), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return typeof value === 'string' ? value.trim() : undefined;
                })];
            _orderBy_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Field to order results by',
                    example: pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_ORDER_BY,
                    default: pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_ORDER_BY,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'OrderBy must be a string' }), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return typeof value === 'string' ? value.trim() : String(value);
                })];
            _orderDir_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Order direction',
                    enum: ['asc', 'desc'],
                    example: pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_ORDER_DIR,
                    default: pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_ORDER_DIR,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(['asc', 'desc'], {
                    message: 'Order direction must be either "asc" or "desc"',
                })];
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
            __esDecorate(null, null, _orderBy_decorators, { kind: "field", name: "orderBy", static: false, private: false, access: { has: function (obj) { return "orderBy" in obj; }, get: function (obj) { return obj.orderBy; }, set: function (obj, value) { obj.orderBy = value; } }, metadata: _metadata }, _orderBy_initializers, _orderBy_extraInitializers);
            __esDecorate(null, null, _orderDir_decorators, { kind: "field", name: "orderDir", static: false, private: false, access: { has: function (obj) { return "orderDir" in obj; }, get: function (obj) { return obj.orderDir; }, set: function (obj, value) { obj.orderDir = value; } }, metadata: _metadata }, _orderDir_initializers, _orderDir_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.PaginationQueryDto = PaginationQueryDto;
/**
 * Extended pagination query DTO with search fields support
 */
var ExtendedPaginationQueryDto = function () {
    var _a;
    var _classSuper = PaginationQueryDto;
    var _searchFields_decorators;
    var _searchFields_initializers = [];
    var _searchFields_extraInitializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(ExtendedPaginationQueryDto, _super);
            function ExtendedPaginationQueryDto() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.searchFields = __runInitializers(_this, _searchFields_initializers, void 0);
                __runInitializers(_this, _searchFields_extraInitializers);
                return _this;
            }
            Object.defineProperty(ExtendedPaginationQueryDto.prototype, "searchFieldsArray", {
                /**
                 * Get search fields as array
                 */
                get: function () {
                    if (Array.isArray(this.searchFields)) {
                        return this.searchFields;
                    }
                    return [];
                },
                enumerable: false,
                configurable: true
            });
            return ExtendedPaginationQueryDto;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _searchFields_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Comma-separated list of fields to search in',
                    example: 'name,email,description',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)({ message: 'Search fields must be a string' }), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return typeof value === 'string'
                        ? value
                            .split(',')
                            .map(function (field) { return field.trim(); })
                            .filter(function (field) { return field.length > 0; })
                        : [];
                })];
            __esDecorate(null, null, _searchFields_decorators, { kind: "field", name: "searchFields", static: false, private: false, access: { has: function (obj) { return "searchFields" in obj; }, get: function (obj) { return obj.searchFields; }, set: function (obj, value) { obj.searchFields = value; } }, metadata: _metadata }, _searchFields_initializers, _searchFields_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ExtendedPaginationQueryDto = ExtendedPaginationQueryDto;
