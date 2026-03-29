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
exports.GetProductsOutputDto = exports.ProductListItemDto = exports.ProductShopDto = exports.GetProductsInputDto = exports.BinaryFlag = exports.ProductSortDirection = exports.ProductSortBy = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var pagination_dtos_1 = require("@/shared/dto/pagination.dtos");
var ProductSortBy;
(function (ProductSortBy) {
    ProductSortBy["CREATED_AT"] = "created_at";
    ProductSortBy["UPDATED_AT"] = "updated_at";
    ProductSortBy["NAME"] = "name";
    ProductSortBy["PRICE"] = "price";
    ProductSortBy["RATING"] = "rating_avg";
    ProductSortBy["TOTAL_SALES"] = "total_sales";
    ProductSortBy["POPULARITY"] = "popularity";
})(ProductSortBy || (exports.ProductSortBy = ProductSortBy = {}));
var ProductSortDirection;
(function (ProductSortDirection) {
    ProductSortDirection["ASC"] = "asc";
    ProductSortDirection["DESC"] = "desc";
})(ProductSortDirection || (exports.ProductSortDirection = ProductSortDirection = {}));
var BinaryFlag;
(function (BinaryFlag) {
    BinaryFlag[BinaryFlag["FALSE"] = 0] = "FALSE";
    BinaryFlag[BinaryFlag["TRUE"] = 1] = "TRUE";
})(BinaryFlag || (exports.BinaryFlag = BinaryFlag = {}));
var GetProductsInputDto = function () {
    var _a;
    var _classSuper = pagination_dtos_1.PaginationInputDto;
    var _search_decorators;
    var _search_initializers = [];
    var _search_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _slug_decorators;
    var _slug_initializers = [];
    var _slug_extraInitializers = [];
    var _category_id_decorators;
    var _category_id_initializers = [];
    var _category_id_extraInitializers = [];
    var _subcategory_id_decorators;
    var _subcategory_id_initializers = [];
    var _subcategory_id_extraInitializers = [];
    var _min_price_decorators;
    var _min_price_initializers = [];
    var _min_price_extraInitializers = [];
    var _max_price_decorators;
    var _max_price_initializers = [];
    var _max_price_extraInitializers = [];
    var _min_rating_decorators;
    var _min_rating_initializers = [];
    var _min_rating_extraInitializers = [];
    var _min_sales_decorators;
    var _min_sales_initializers = [];
    var _min_sales_extraInitializers = [];
    var _max_sales_decorators;
    var _max_sales_initializers = [];
    var _max_sales_extraInitializers = [];
    var _is_free_decorators;
    var _is_free_initializers = [];
    var _is_free_extraInitializers = [];
    var _top_rated_seller_decorators;
    var _top_rated_seller_initializers = [];
    var _top_rated_seller_extraInitializers = [];
    var _sort_by_decorators;
    var _sort_by_initializers = [];
    var _sort_by_extraInitializers = [];
    var _sort_direction_decorators;
    var _sort_direction_initializers = [];
    var _sort_direction_extraInitializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(GetProductsInputDto, _super);
            function GetProductsInputDto() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.search = __runInitializers(_this, _search_initializers, void 0);
                _this.name = (__runInitializers(_this, _search_extraInitializers), __runInitializers(_this, _name_initializers, void 0));
                _this.slug = (__runInitializers(_this, _name_extraInitializers), __runInitializers(_this, _slug_initializers, void 0));
                _this.category_id = (__runInitializers(_this, _slug_extraInitializers), __runInitializers(_this, _category_id_initializers, void 0));
                _this.subcategory_id = (__runInitializers(_this, _category_id_extraInitializers), __runInitializers(_this, _subcategory_id_initializers, void 0));
                _this.min_price = (__runInitializers(_this, _subcategory_id_extraInitializers), __runInitializers(_this, _min_price_initializers, void 0));
                _this.max_price = (__runInitializers(_this, _min_price_extraInitializers), __runInitializers(_this, _max_price_initializers, void 0));
                _this.min_rating = (__runInitializers(_this, _max_price_extraInitializers), __runInitializers(_this, _min_rating_initializers, void 0));
                _this.min_sales = (__runInitializers(_this, _min_rating_extraInitializers), __runInitializers(_this, _min_sales_initializers, void 0));
                _this.max_sales = (__runInitializers(_this, _min_sales_extraInitializers), __runInitializers(_this, _max_sales_initializers, void 0));
                _this.is_free = (__runInitializers(_this, _max_sales_extraInitializers), __runInitializers(_this, _is_free_initializers, void 0));
                _this.top_rated_seller = (__runInitializers(_this, _is_free_extraInitializers), __runInitializers(_this, _top_rated_seller_initializers, void 0));
                _this.sort_by = (__runInitializers(_this, _top_rated_seller_extraInitializers), __runInitializers(_this, _sort_by_initializers, ProductSortBy.POPULARITY));
                _this.sort_direction = (__runInitializers(_this, _sort_by_extraInitializers), __runInitializers(_this, _sort_direction_initializers, ProductSortDirection.DESC));
                __runInitializers(_this, _sort_direction_extraInitializers);
                return _this;
            }
            return GetProductsInputDto;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _search_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Search keyword for products',
                    example: 'app mobile',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _name_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Search by product name only',
                    example: 'mobile app',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _slug_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by category slug (exact match)',
                    example: 'mobile-app-development',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _category_id_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Product category ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            _subcategory_id_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Product subcategory IDs (comma-separated for multiple)',
                    example: '123e4567-e89b-12d3-a456-426614174001,123e4567-e89b-12d3-a456-426614174002',
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    if (typeof value === 'string') {
                        return value.split(',').map(function (id) { return id.trim(); });
                    }
                    return value;
                }), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsUUID)('4', { each: true })];
            _min_price_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Minimum price',
                    example: 100000,
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            _max_price_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Maximum price',
                    example: 1000000,
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            _min_rating_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Minimum rating (0-5)',
                    example: 4.0,
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(5)];
            _min_sales_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Minimum sales count',
                    example: 100,
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            _max_sales_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Maximum sales count',
                    example: 1000,
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            _is_free_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter free products only (0: false, 1: true)',
                    enum: BinaryFlag,
                    example: BinaryFlag.TRUE,
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsEnum)(BinaryFlag)];
            _top_rated_seller_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter products from top-rated sellers only (0: false, 1: true)',
                    enum: BinaryFlag,
                    example: BinaryFlag.TRUE,
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsEnum)(BinaryFlag)];
            _sort_by_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Sort by field',
                    enum: ProductSortBy,
                    example: ProductSortBy.POPULARITY,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(ProductSortBy)];
            _sort_direction_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Sort direction',
                    enum: ProductSortDirection,
                    example: ProductSortDirection.DESC,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(ProductSortDirection)];
            __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: function (obj) { return "slug" in obj; }, get: function (obj) { return obj.slug; }, set: function (obj, value) { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
            __esDecorate(null, null, _category_id_decorators, { kind: "field", name: "category_id", static: false, private: false, access: { has: function (obj) { return "category_id" in obj; }, get: function (obj) { return obj.category_id; }, set: function (obj, value) { obj.category_id = value; } }, metadata: _metadata }, _category_id_initializers, _category_id_extraInitializers);
            __esDecorate(null, null, _subcategory_id_decorators, { kind: "field", name: "subcategory_id", static: false, private: false, access: { has: function (obj) { return "subcategory_id" in obj; }, get: function (obj) { return obj.subcategory_id; }, set: function (obj, value) { obj.subcategory_id = value; } }, metadata: _metadata }, _subcategory_id_initializers, _subcategory_id_extraInitializers);
            __esDecorate(null, null, _min_price_decorators, { kind: "field", name: "min_price", static: false, private: false, access: { has: function (obj) { return "min_price" in obj; }, get: function (obj) { return obj.min_price; }, set: function (obj, value) { obj.min_price = value; } }, metadata: _metadata }, _min_price_initializers, _min_price_extraInitializers);
            __esDecorate(null, null, _max_price_decorators, { kind: "field", name: "max_price", static: false, private: false, access: { has: function (obj) { return "max_price" in obj; }, get: function (obj) { return obj.max_price; }, set: function (obj, value) { obj.max_price = value; } }, metadata: _metadata }, _max_price_initializers, _max_price_extraInitializers);
            __esDecorate(null, null, _min_rating_decorators, { kind: "field", name: "min_rating", static: false, private: false, access: { has: function (obj) { return "min_rating" in obj; }, get: function (obj) { return obj.min_rating; }, set: function (obj, value) { obj.min_rating = value; } }, metadata: _metadata }, _min_rating_initializers, _min_rating_extraInitializers);
            __esDecorate(null, null, _min_sales_decorators, { kind: "field", name: "min_sales", static: false, private: false, access: { has: function (obj) { return "min_sales" in obj; }, get: function (obj) { return obj.min_sales; }, set: function (obj, value) { obj.min_sales = value; } }, metadata: _metadata }, _min_sales_initializers, _min_sales_extraInitializers);
            __esDecorate(null, null, _max_sales_decorators, { kind: "field", name: "max_sales", static: false, private: false, access: { has: function (obj) { return "max_sales" in obj; }, get: function (obj) { return obj.max_sales; }, set: function (obj, value) { obj.max_sales = value; } }, metadata: _metadata }, _max_sales_initializers, _max_sales_extraInitializers);
            __esDecorate(null, null, _is_free_decorators, { kind: "field", name: "is_free", static: false, private: false, access: { has: function (obj) { return "is_free" in obj; }, get: function (obj) { return obj.is_free; }, set: function (obj, value) { obj.is_free = value; } }, metadata: _metadata }, _is_free_initializers, _is_free_extraInitializers);
            __esDecorate(null, null, _top_rated_seller_decorators, { kind: "field", name: "top_rated_seller", static: false, private: false, access: { has: function (obj) { return "top_rated_seller" in obj; }, get: function (obj) { return obj.top_rated_seller; }, set: function (obj, value) { obj.top_rated_seller = value; } }, metadata: _metadata }, _top_rated_seller_initializers, _top_rated_seller_extraInitializers);
            __esDecorate(null, null, _sort_by_decorators, { kind: "field", name: "sort_by", static: false, private: false, access: { has: function (obj) { return "sort_by" in obj; }, get: function (obj) { return obj.sort_by; }, set: function (obj, value) { obj.sort_by = value; } }, metadata: _metadata }, _sort_by_initializers, _sort_by_extraInitializers);
            __esDecorate(null, null, _sort_direction_decorators, { kind: "field", name: "sort_direction", static: false, private: false, access: { has: function (obj) { return "sort_direction" in obj; }, get: function (obj) { return obj.sort_direction; }, set: function (obj, value) { obj.sort_direction = value; } }, metadata: _metadata }, _sort_direction_initializers, _sort_direction_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetProductsInputDto = GetProductsInputDto;
var ProductShopDto = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _slug_decorators;
    var _slug_initializers = [];
    var _slug_extraInitializers = [];
    var _avatar_url_decorators;
    var _avatar_url_initializers = [];
    var _avatar_url_extraInitializers = [];
    var _verified_decorators;
    var _verified_initializers = [];
    var _verified_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ProductShopDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
                this.slug = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
                this.avatar_url = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _avatar_url_initializers, void 0));
                this.verified = (__runInitializers(this, _avatar_url_extraInitializers), __runInitializers(this, _verified_initializers, void 0));
                __runInitializers(this, _verified_extraInitializers);
            }
            return ProductShopDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Shop ID',
                })];
            _name_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Shop name',
                })];
            _slug_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Shop slug',
                })];
            _avatar_url_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Shop avatar URL',
                })];
            _verified_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether the shop owner is verified',
                })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: function (obj) { return "slug" in obj; }, get: function (obj) { return obj.slug; }, set: function (obj, value) { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
            __esDecorate(null, null, _avatar_url_decorators, { kind: "field", name: "avatar_url", static: false, private: false, access: { has: function (obj) { return "avatar_url" in obj; }, get: function (obj) { return obj.avatar_url; }, set: function (obj, value) { obj.avatar_url = value; } }, metadata: _metadata }, _avatar_url_initializers, _avatar_url_extraInitializers);
            __esDecorate(null, null, _verified_decorators, { kind: "field", name: "verified", static: false, private: false, access: { has: function (obj) { return "verified" in obj; }, get: function (obj) { return obj.verified; }, set: function (obj, value) { obj.verified = value; } }, metadata: _metadata }, _verified_initializers, _verified_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ProductShopDto = ProductShopDto;
var ProductListItemDto = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _slug_decorators;
    var _slug_initializers = [];
    var _slug_extraInitializers = [];
    var _description_decorators;
    var _description_initializers = [];
    var _description_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _discount_percent_decorators;
    var _discount_percent_initializers = [];
    var _discount_percent_extraInitializers = [];
    var _is_free_decorators;
    var _is_free_initializers = [];
    var _is_free_extraInitializers = [];
    var _rating_avg_decorators;
    var _rating_avg_initializers = [];
    var _rating_avg_extraInitializers = [];
    var _total_sales_decorators;
    var _total_sales_initializers = [];
    var _total_sales_extraInitializers = [];
    var _total_review_decorators;
    var _total_review_initializers = [];
    var _total_review_extraInitializers = [];
    var _total_like_decorators;
    var _total_like_initializers = [];
    var _total_like_extraInitializers = [];
    var _total_view_decorators;
    var _total_view_initializers = [];
    var _total_view_extraInitializers = [];
    var _thumbnail_decorators;
    var _thumbnail_initializers = [];
    var _thumbnail_extraInitializers = [];
    var _category_name_decorators;
    var _category_name_initializers = [];
    var _category_name_extraInitializers = [];
    var _category_slug_decorators;
    var _category_slug_initializers = [];
    var _category_slug_extraInitializers = [];
    var _subcategory_name_decorators;
    var _subcategory_name_initializers = [];
    var _subcategory_name_extraInitializers = [];
    var _subcategory_slug_decorators;
    var _subcategory_slug_initializers = [];
    var _subcategory_slug_extraInitializers = [];
    var _is_sponsored_decorators;
    var _is_sponsored_initializers = [];
    var _is_sponsored_extraInitializers = [];
    var _shop_decorators;
    var _shop_initializers = [];
    var _shop_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var _updated_at_decorators;
    var _updated_at_initializers = [];
    var _updated_at_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ProductListItemDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
                this.slug = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
                this.description = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _description_initializers, void 0));
                this.price = (__runInitializers(this, _description_extraInitializers), __runInitializers(this, _price_initializers, void 0));
                this.discount_percent = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _discount_percent_initializers, void 0));
                this.is_free = (__runInitializers(this, _discount_percent_extraInitializers), __runInitializers(this, _is_free_initializers, void 0));
                this.rating_avg = (__runInitializers(this, _is_free_extraInitializers), __runInitializers(this, _rating_avg_initializers, void 0));
                this.total_sales = (__runInitializers(this, _rating_avg_extraInitializers), __runInitializers(this, _total_sales_initializers, void 0));
                this.total_review = (__runInitializers(this, _total_sales_extraInitializers), __runInitializers(this, _total_review_initializers, void 0));
                this.total_like = (__runInitializers(this, _total_review_extraInitializers), __runInitializers(this, _total_like_initializers, void 0));
                this.total_view = (__runInitializers(this, _total_like_extraInitializers), __runInitializers(this, _total_view_initializers, void 0));
                this.thumbnail = (__runInitializers(this, _total_view_extraInitializers), __runInitializers(this, _thumbnail_initializers, void 0));
                this.category_name = (__runInitializers(this, _thumbnail_extraInitializers), __runInitializers(this, _category_name_initializers, void 0));
                this.category_slug = (__runInitializers(this, _category_name_extraInitializers), __runInitializers(this, _category_slug_initializers, void 0));
                this.subcategory_name = (__runInitializers(this, _category_slug_extraInitializers), __runInitializers(this, _subcategory_name_initializers, void 0));
                this.subcategory_slug = (__runInitializers(this, _subcategory_name_extraInitializers), __runInitializers(this, _subcategory_slug_initializers, void 0));
                this.is_sponsored = (__runInitializers(this, _subcategory_slug_extraInitializers), __runInitializers(this, _is_sponsored_initializers, void 0));
                this.shop = (__runInitializers(this, _is_sponsored_extraInitializers), __runInitializers(this, _shop_initializers, void 0));
                this.created_at = (__runInitializers(this, _shop_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
                this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
                this.price_min_max = __runInitializers(this, _updated_at_extraInitializers);
            }
            return ProductListItemDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Product ID',
                })];
            _name_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Product name',
                })];
            _slug_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Product slug',
                })];
            _description_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Product description',
                })];
            _price_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Product price',
                })];
            _discount_percent_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Discount percentage (0-100)',
                })];
            _is_free_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether the product is free',
                })];
            _rating_avg_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Average rating',
                })];
            _total_sales_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Total sales count',
                })];
            _total_review_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Total review count',
                })];
            _total_like_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Total likes count',
                })];
            _total_view_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Total views count',
                })];
            _thumbnail_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Product thumbnail image',
                })];
            _category_name_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Category name',
                })];
            _category_slug_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Category slug',
                })];
            _subcategory_name_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Subcategory name',
                })];
            _subcategory_slug_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Subcategory slug',
                })];
            _is_sponsored_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Whether the product is sponsored',
                })];
            _shop_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Shop information',
                    type: ProductShopDto,
                })];
            _created_at_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Creation timestamp',
                })];
            _updated_at_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Last update timestamp',
                })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: function (obj) { return "slug" in obj; }, get: function (obj) { return obj.slug; }, set: function (obj, value) { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
            __esDecorate(null, null, _description_decorators, { kind: "field", name: "description", static: false, private: false, access: { has: function (obj) { return "description" in obj; }, get: function (obj) { return obj.description; }, set: function (obj, value) { obj.description = value; } }, metadata: _metadata }, _description_initializers, _description_extraInitializers);
            __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
            __esDecorate(null, null, _discount_percent_decorators, { kind: "field", name: "discount_percent", static: false, private: false, access: { has: function (obj) { return "discount_percent" in obj; }, get: function (obj) { return obj.discount_percent; }, set: function (obj, value) { obj.discount_percent = value; } }, metadata: _metadata }, _discount_percent_initializers, _discount_percent_extraInitializers);
            __esDecorate(null, null, _is_free_decorators, { kind: "field", name: "is_free", static: false, private: false, access: { has: function (obj) { return "is_free" in obj; }, get: function (obj) { return obj.is_free; }, set: function (obj, value) { obj.is_free = value; } }, metadata: _metadata }, _is_free_initializers, _is_free_extraInitializers);
            __esDecorate(null, null, _rating_avg_decorators, { kind: "field", name: "rating_avg", static: false, private: false, access: { has: function (obj) { return "rating_avg" in obj; }, get: function (obj) { return obj.rating_avg; }, set: function (obj, value) { obj.rating_avg = value; } }, metadata: _metadata }, _rating_avg_initializers, _rating_avg_extraInitializers);
            __esDecorate(null, null, _total_sales_decorators, { kind: "field", name: "total_sales", static: false, private: false, access: { has: function (obj) { return "total_sales" in obj; }, get: function (obj) { return obj.total_sales; }, set: function (obj, value) { obj.total_sales = value; } }, metadata: _metadata }, _total_sales_initializers, _total_sales_extraInitializers);
            __esDecorate(null, null, _total_review_decorators, { kind: "field", name: "total_review", static: false, private: false, access: { has: function (obj) { return "total_review" in obj; }, get: function (obj) { return obj.total_review; }, set: function (obj, value) { obj.total_review = value; } }, metadata: _metadata }, _total_review_initializers, _total_review_extraInitializers);
            __esDecorate(null, null, _total_like_decorators, { kind: "field", name: "total_like", static: false, private: false, access: { has: function (obj) { return "total_like" in obj; }, get: function (obj) { return obj.total_like; }, set: function (obj, value) { obj.total_like = value; } }, metadata: _metadata }, _total_like_initializers, _total_like_extraInitializers);
            __esDecorate(null, null, _total_view_decorators, { kind: "field", name: "total_view", static: false, private: false, access: { has: function (obj) { return "total_view" in obj; }, get: function (obj) { return obj.total_view; }, set: function (obj, value) { obj.total_view = value; } }, metadata: _metadata }, _total_view_initializers, _total_view_extraInitializers);
            __esDecorate(null, null, _thumbnail_decorators, { kind: "field", name: "thumbnail", static: false, private: false, access: { has: function (obj) { return "thumbnail" in obj; }, get: function (obj) { return obj.thumbnail; }, set: function (obj, value) { obj.thumbnail = value; } }, metadata: _metadata }, _thumbnail_initializers, _thumbnail_extraInitializers);
            __esDecorate(null, null, _category_name_decorators, { kind: "field", name: "category_name", static: false, private: false, access: { has: function (obj) { return "category_name" in obj; }, get: function (obj) { return obj.category_name; }, set: function (obj, value) { obj.category_name = value; } }, metadata: _metadata }, _category_name_initializers, _category_name_extraInitializers);
            __esDecorate(null, null, _category_slug_decorators, { kind: "field", name: "category_slug", static: false, private: false, access: { has: function (obj) { return "category_slug" in obj; }, get: function (obj) { return obj.category_slug; }, set: function (obj, value) { obj.category_slug = value; } }, metadata: _metadata }, _category_slug_initializers, _category_slug_extraInitializers);
            __esDecorate(null, null, _subcategory_name_decorators, { kind: "field", name: "subcategory_name", static: false, private: false, access: { has: function (obj) { return "subcategory_name" in obj; }, get: function (obj) { return obj.subcategory_name; }, set: function (obj, value) { obj.subcategory_name = value; } }, metadata: _metadata }, _subcategory_name_initializers, _subcategory_name_extraInitializers);
            __esDecorate(null, null, _subcategory_slug_decorators, { kind: "field", name: "subcategory_slug", static: false, private: false, access: { has: function (obj) { return "subcategory_slug" in obj; }, get: function (obj) { return obj.subcategory_slug; }, set: function (obj, value) { obj.subcategory_slug = value; } }, metadata: _metadata }, _subcategory_slug_initializers, _subcategory_slug_extraInitializers);
            __esDecorate(null, null, _is_sponsored_decorators, { kind: "field", name: "is_sponsored", static: false, private: false, access: { has: function (obj) { return "is_sponsored" in obj; }, get: function (obj) { return obj.is_sponsored; }, set: function (obj, value) { obj.is_sponsored = value; } }, metadata: _metadata }, _is_sponsored_initializers, _is_sponsored_extraInitializers);
            __esDecorate(null, null, _shop_decorators, { kind: "field", name: "shop", static: false, private: false, access: { has: function (obj) { return "shop" in obj; }, get: function (obj) { return obj.shop; }, set: function (obj, value) { obj.shop = value; } }, metadata: _metadata }, _shop_initializers, _shop_extraInitializers);
            __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
            __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: function (obj) { return "updated_at" in obj; }, get: function (obj) { return obj.updated_at; }, set: function (obj, value) { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ProductListItemDto = ProductListItemDto;
var GetProductsOutputDto = /** @class */ (function (_super) {
    __extends(GetProductsOutputDto, _super);
    function GetProductsOutputDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GetProductsOutputDto;
}(pagination_dtos_1.PaginationDto));
exports.GetProductsOutputDto = GetProductsOutputDto;
