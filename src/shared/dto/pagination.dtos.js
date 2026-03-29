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
exports.PaginationInputDto = exports.PaginationDto = exports.PaginationMetadataDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var constructor_1 = require("@/shared/utils/constructor");
var transformers_1 = require("@/shared/validation/transformers");
var PaginationMetadataDto = function () {
    var _a;
    var _classSuper = constructor_1.ExactClass;
    var _total_decorators;
    var _total_initializers = [];
    var _total_extraInitializers = [];
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _pageSize_decorators;
    var _pageSize_initializers = [];
    var _pageSize_extraInitializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(PaginationMetadataDto, _super);
            function PaginationMetadataDto() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.total = __runInitializers(_this, _total_initializers, void 0);
                _this.page = (__runInitializers(_this, _total_extraInitializers), __runInitializers(_this, _page_initializers, void 0));
                _this.pageSize = (__runInitializers(_this, _page_extraInitializers), __runInitializers(_this, _pageSize_initializers, void 0));
                __runInitializers(_this, _pageSize_extraInitializers);
                return _this;
            }
            return PaginationMetadataDto;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _total_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Total number of items',
                    example: 100,
                }), (0, class_validator_1.Min)(0), (0, class_validator_1.IsInt)()];
            _page_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Current page number',
                    example: 1,
                }), (0, class_validator_1.Min)(1), (0, class_validator_1.IsInt)()];
            _pageSize_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of items per page',
                    example: 10,
                }), (0, class_validator_1.Min)(1), (0, class_validator_1.IsInt)()];
            __esDecorate(null, null, _total_decorators, { kind: "field", name: "total", static: false, private: false, access: { has: function (obj) { return "total" in obj; }, get: function (obj) { return obj.total; }, set: function (obj, value) { obj.total = value; } }, metadata: _metadata }, _total_initializers, _total_extraInitializers);
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _pageSize_decorators, { kind: "field", name: "pageSize", static: false, private: false, access: { has: function (obj) { return "pageSize" in obj; }, get: function (obj) { return obj.pageSize; }, set: function (obj, value) { obj.pageSize = value; } }, metadata: _metadata }, _pageSize_initializers, _pageSize_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.PaginationMetadataDto = PaginationMetadataDto;
var PaginationDto = function () {
    var _a;
    var _items_decorators;
    var _items_initializers = [];
    var _items_extraInitializers = [];
    var _pagination_decorators;
    var _pagination_initializers = [];
    var _pagination_extraInitializers = [];
    return _a = /** @class */ (function () {
            function PaginationDto() {
                this.items = __runInitializers(this, _items_initializers, void 0);
                this.pagination = (__runInitializers(this, _items_extraInitializers), __runInitializers(this, _pagination_initializers, void 0));
                __runInitializers(this, _pagination_extraInitializers);
            }
            return PaginationDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _items_decorators = [(0, class_validator_1.ValidateNested)({ each: true }), (0, class_validator_1.IsArray)()];
            _pagination_decorators = [(0, class_validator_1.ValidateNested)(), (0, class_validator_1.IsDefined)(), (0, class_transformer_1.Type)(function () { return PaginationMetadataDto; })];
            __esDecorate(null, null, _items_decorators, { kind: "field", name: "items", static: false, private: false, access: { has: function (obj) { return "items" in obj; }, get: function (obj) { return obj.items; }, set: function (obj, value) { obj.items = value; } }, metadata: _metadata }, _items_initializers, _items_extraInitializers);
            __esDecorate(null, null, _pagination_decorators, { kind: "field", name: "pagination", static: false, private: false, access: { has: function (obj) { return "pagination" in obj; }, get: function (obj) { return obj.pagination; }, set: function (obj, value) { obj.pagination = value; } }, metadata: _metadata }, _pagination_initializers, _pagination_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.PaginationDto = PaginationDto;
var PaginationInputDto = function () {
    var _a;
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _take_decorators;
    var _take_initializers = [];
    var _take_extraInitializers = [];
    return _a = /** @class */ (function () {
            function PaginationInputDto() {
                this.page = __runInitializers(this, _page_initializers, void 0);
                this.take = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _take_initializers, void 0));
                __runInitializers(this, _take_extraInitializers);
            }
            Object.defineProperty(PaginationInputDto.prototype, "skip", {
                get: function () {
                    return (this.page - 1) * this.take;
                },
                enumerable: false,
                configurable: true
            });
            return PaginationInputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _page_decorators = [(0, class_validator_1.Max)(Number.MAX_SAFE_INTEGER), (0, class_validator_1.Min)(1), (0, class_validator_1.IsInt)(), (0, transformers_1.Default)(1), (0, class_transformer_1.Type)(function () { return Number; })];
            _take_decorators = [(0, transformers_1.Expose)({ name: 'pageRow' }), (0, class_validator_1.Max)(100), (0, class_validator_1.Min)(5), (0, class_validator_1.IsInt)(), (0, transformers_1.Default)(10), (0, class_transformer_1.Type)(function () { return Number; })];
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _take_decorators, { kind: "field", name: "take", static: false, private: false, access: { has: function (obj) { return "take" in obj; }, get: function (obj) { return obj.take; }, set: function (obj, value) { obj.take = value; } }, metadata: _metadata }, _take_initializers, _take_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.PaginationInputDto = PaginationInputDto;
