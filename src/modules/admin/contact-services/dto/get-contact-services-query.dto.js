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
exports.GetContactServicesQueryDto = exports.SortOrder = exports.ContactServiceSortBy = exports.ContactServiceStatus = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var pagination_dtos_1 = require("@/shared/dto/pagination.dtos");
var ContactServiceStatus;
(function (ContactServiceStatus) {
    ContactServiceStatus["ACTIVE"] = "active";
    ContactServiceStatus["INACTIVE"] = "inactive";
})(ContactServiceStatus || (exports.ContactServiceStatus = ContactServiceStatus = {}));
var ContactServiceSortBy;
(function (ContactServiceSortBy) {
    ContactServiceSortBy["CREATED_AT"] = "created_at";
    ContactServiceSortBy["UPDATED_AT"] = "updated_at";
})(ContactServiceSortBy || (exports.ContactServiceSortBy = ContactServiceSortBy = {}));
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "asc";
    SortOrder["DESC"] = "desc";
})(SortOrder || (exports.SortOrder = SortOrder = {}));
var GetContactServicesQueryDto = function () {
    var _a;
    var _classSuper = pagination_dtos_1.PaginationInputDto;
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _sortBy_decorators;
    var _sortBy_initializers = [];
    var _sortBy_extraInitializers = [];
    var _sortOrder_decorators;
    var _sortOrder_initializers = [];
    var _sortOrder_extraInitializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(GetContactServicesQueryDto, _super);
            function GetContactServicesQueryDto() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.status = __runInitializers(_this, _status_initializers, void 0);
                _this.sortBy = (__runInitializers(_this, _status_extraInitializers), __runInitializers(_this, _sortBy_initializers, ContactServiceSortBy.CREATED_AT));
                _this.sortOrder = (__runInitializers(_this, _sortBy_extraInitializers), __runInitializers(_this, _sortOrder_initializers, SortOrder.DESC));
                __runInitializers(_this, _sortOrder_extraInitializers);
                return _this;
            }
            return GetContactServicesQueryDto;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _status_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Filter by service status',
                    enum: ContactServiceStatus,
                    example: ContactServiceStatus.ACTIVE,
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(ContactServiceStatus, {
                    message: 'status must be either active or inactive',
                })];
            _sortBy_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Field to sort by',
                    enum: ContactServiceSortBy,
                    example: ContactServiceSortBy.UPDATED_AT,
                    default: ContactServiceSortBy.CREATED_AT,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(ContactServiceSortBy, {
                    message: 'sortBy must be one of: id, service_name, created_at, updated_at',
                })];
            _sortOrder_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Sort direction',
                    enum: SortOrder,
                    example: SortOrder.DESC,
                    default: SortOrder.DESC,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(SortOrder, {
                    message: 'sortOrder must be either asc or desc',
                })];
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _sortBy_decorators, { kind: "field", name: "sortBy", static: false, private: false, access: { has: function (obj) { return "sortBy" in obj; }, get: function (obj) { return obj.sortBy; }, set: function (obj, value) { obj.sortBy = value; } }, metadata: _metadata }, _sortBy_initializers, _sortBy_extraInitializers);
            __esDecorate(null, null, _sortOrder_decorators, { kind: "field", name: "sortOrder", static: false, private: false, access: { has: function (obj) { return "sortOrder" in obj; }, get: function (obj) { return obj.sortOrder; }, set: function (obj, value) { obj.sortOrder = value; } }, metadata: _metadata }, _sortOrder_initializers, _sortOrder_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetContactServicesQueryDto = GetContactServicesQueryDto;
