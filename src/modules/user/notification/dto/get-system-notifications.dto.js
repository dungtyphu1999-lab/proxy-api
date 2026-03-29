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
exports.GetSystemNotificationsOutputDto = exports.GetSystemNotificationsInputDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var get_notifications_dto_1 = require("./get-notifications.dto");
var pagination_dtos_1 = require("@/shared/dto/pagination.dtos");
var GetSystemNotificationsInputDto = function () {
    var _a;
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _pageRow_decorators;
    var _pageRow_initializers = [];
    var _pageRow_extraInitializers = [];
    return _a = /** @class */ (function () {
            function GetSystemNotificationsInputDto() {
                this.page = __runInitializers(this, _page_initializers, 1);
                this.pageRow = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _pageRow_initializers, 10));
                __runInitializers(this, _pageRow_extraInitializers);
            }
            return GetSystemNotificationsInputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _page_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Page number for pagination',
                    example: 1,
                    minimum: 1,
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1)];
            _pageRow_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of items per page',
                    example: 10,
                    minimum: 1,
                    maximum: 100,
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(100)];
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _pageRow_decorators, { kind: "field", name: "pageRow", static: false, private: false, access: { has: function (obj) { return "pageRow" in obj; }, get: function (obj) { return obj.pageRow; }, set: function (obj, value) { obj.pageRow = value; } }, metadata: _metadata }, _pageRow_initializers, _pageRow_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetSystemNotificationsInputDto = GetSystemNotificationsInputDto;
var GetSystemNotificationsOutputDto = function () {
    var _a;
    var _items_decorators;
    var _items_initializers = [];
    var _items_extraInitializers = [];
    var _pagination_decorators;
    var _pagination_initializers = [];
    var _pagination_extraInitializers = [];
    var _unread_count_decorators;
    var _unread_count_initializers = [];
    var _unread_count_extraInitializers = [];
    return _a = /** @class */ (function () {
            function GetSystemNotificationsOutputDto() {
                this.items = __runInitializers(this, _items_initializers, void 0);
                this.pagination = (__runInitializers(this, _items_extraInitializers), __runInitializers(this, _pagination_initializers, void 0));
                this.unread_count = (__runInitializers(this, _pagination_extraInitializers), __runInitializers(this, _unread_count_initializers, void 0));
                __runInitializers(this, _unread_count_extraInitializers);
            }
            return GetSystemNotificationsOutputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _items_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'List of system notifications',
                    type: [get_notifications_dto_1.NotificationDto],
                })];
            _pagination_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Pagination metadata',
                    type: pagination_dtos_1.PaginationMetadataDto,
                }), (0, class_validator_1.ValidateNested)(), (0, class_validator_1.IsDefined)(), (0, class_transformer_1.Type)(function () { return pagination_dtos_1.PaginationMetadataDto; })];
            _unread_count_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Total unread count',
                    example: 5,
                }), (0, class_validator_1.IsInt)()];
            __esDecorate(null, null, _items_decorators, { kind: "field", name: "items", static: false, private: false, access: { has: function (obj) { return "items" in obj; }, get: function (obj) { return obj.items; }, set: function (obj, value) { obj.items = value; } }, metadata: _metadata }, _items_initializers, _items_extraInitializers);
            __esDecorate(null, null, _pagination_decorators, { kind: "field", name: "pagination", static: false, private: false, access: { has: function (obj) { return "pagination" in obj; }, get: function (obj) { return obj.pagination; }, set: function (obj, value) { obj.pagination = value; } }, metadata: _metadata }, _pagination_initializers, _pagination_extraInitializers);
            __esDecorate(null, null, _unread_count_decorators, { kind: "field", name: "unread_count", static: false, private: false, access: { has: function (obj) { return "unread_count" in obj; }, get: function (obj) { return obj.unread_count; }, set: function (obj, value) { obj.unread_count = value; } }, metadata: _metadata }, _unread_count_initializers, _unread_count_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetSystemNotificationsOutputDto = GetSystemNotificationsOutputDto;
