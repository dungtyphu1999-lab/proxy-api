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
exports.GetAdminNotificationsOutputDto = exports.AdminNotificationDto = exports.GetAdminNotificationsInputDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var pagination_dtos_1 = require("@/shared/dto/pagination.dtos");
var admin_notification_constants_1 = require("../admin-notification.constants");
var GetAdminNotificationsInputDto = function () {
    var _a;
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _pageRow_decorators;
    var _pageRow_initializers = [];
    var _pageRow_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _is_read_decorators;
    var _is_read_initializers = [];
    var _is_read_extraInitializers = [];
    var _is_global_decorators;
    var _is_global_initializers = [];
    var _is_global_extraInitializers = [];
    var _target_audience_decorators;
    var _target_audience_initializers = [];
    var _target_audience_extraInitializers = [];
    var _sortOrder_decorators;
    var _sortOrder_initializers = [];
    var _sortOrder_extraInitializers = [];
    return _a = /** @class */ (function () {
            function GetAdminNotificationsInputDto() {
                this.page = __runInitializers(this, _page_initializers, void 0);
                this.pageRow = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _pageRow_initializers, void 0));
                this.type = (__runInitializers(this, _pageRow_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.is_read = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _is_read_initializers, void 0));
                this.is_global = (__runInitializers(this, _is_read_extraInitializers), __runInitializers(this, _is_global_initializers, void 0));
                this.target_audience = (__runInitializers(this, _is_global_extraInitializers), __runInitializers(this, _target_audience_initializers, void 0));
                this.sortOrder = (__runInitializers(this, _target_audience_extraInitializers), __runInitializers(this, _sortOrder_initializers, void 0));
                __runInitializers(this, _sortOrder_extraInitializers);
            }
            return GetAdminNotificationsInputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _page_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Page number',
                    example: 1,
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_transformer_1.Type)(function () { return Number; })];
            _pageRow_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of items per page',
                    example: 20,
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_transformer_1.Type)(function () { return Number; })];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Filter by notification type',
                    enum: Object.values(admin_notification_constants_1.ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
                    example: 'blog',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(Object.values(admin_notification_constants_1.ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES)), (0, class_transformer_1.Type)(function () { return String; })];
            _is_read_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Filter by read status',
                    example: false,
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)(), (0, class_transformer_1.Type)(function () { return Boolean; })];
            _is_global_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Filter by global notifications only',
                    example: false,
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)(), (0, class_transformer_1.Type)(function () { return Boolean; })];
            _target_audience_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Filter by target audience',
                    enum: ['admin', 'user', 'all'],
                    example: 'admin',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(['admin', 'user'])];
            _sortOrder_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Sort order by created_at',
                    example: 'desc',
                    enum: ['asc', 'desc'],
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(['asc', 'desc']), (0, class_transformer_1.Type)(function () { return String; })];
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _pageRow_decorators, { kind: "field", name: "pageRow", static: false, private: false, access: { has: function (obj) { return "pageRow" in obj; }, get: function (obj) { return obj.pageRow; }, set: function (obj, value) { obj.pageRow = value; } }, metadata: _metadata }, _pageRow_initializers, _pageRow_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _is_read_decorators, { kind: "field", name: "is_read", static: false, private: false, access: { has: function (obj) { return "is_read" in obj; }, get: function (obj) { return obj.is_read; }, set: function (obj, value) { obj.is_read = value; } }, metadata: _metadata }, _is_read_initializers, _is_read_extraInitializers);
            __esDecorate(null, null, _is_global_decorators, { kind: "field", name: "is_global", static: false, private: false, access: { has: function (obj) { return "is_global" in obj; }, get: function (obj) { return obj.is_global; }, set: function (obj, value) { obj.is_global = value; } }, metadata: _metadata }, _is_global_initializers, _is_global_extraInitializers);
            __esDecorate(null, null, _target_audience_decorators, { kind: "field", name: "target_audience", static: false, private: false, access: { has: function (obj) { return "target_audience" in obj; }, get: function (obj) { return obj.target_audience; }, set: function (obj, value) { obj.target_audience = value; } }, metadata: _metadata }, _target_audience_initializers, _target_audience_extraInitializers);
            __esDecorate(null, null, _sortOrder_decorators, { kind: "field", name: "sortOrder", static: false, private: false, access: { has: function (obj) { return "sortOrder" in obj; }, get: function (obj) { return obj.sortOrder; }, set: function (obj, value) { obj.sortOrder = value; } }, metadata: _metadata }, _sortOrder_initializers, _sortOrder_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetAdminNotificationsInputDto = GetAdminNotificationsInputDto;
var AdminNotificationDto = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _message_decorators;
    var _message_initializers = [];
    var _message_extraInitializers = [];
    var _link_url_decorators;
    var _link_url_initializers = [];
    var _link_url_extraInitializers = [];
    var _slug_decorators;
    var _slug_initializers = [];
    var _slug_extraInitializers = [];
    var _thumbnail_url_decorators;
    var _thumbnail_url_initializers = [];
    var _thumbnail_url_extraInitializers = [];
    var _is_global_decorators;
    var _is_global_initializers = [];
    var _is_global_extraInitializers = [];
    var _target_audience_decorators;
    var _target_audience_initializers = [];
    var _target_audience_extraInitializers = [];
    var _is_read_decorators;
    var _is_read_initializers = [];
    var _is_read_extraInitializers = [];
    var _read_at_decorators;
    var _read_at_initializers = [];
    var _read_at_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    return _a = /** @class */ (function () {
            function AdminNotificationDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.type = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.title = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                this.message = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _message_initializers, void 0));
                this.link_url = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _link_url_initializers, void 0));
                this.slug = (__runInitializers(this, _link_url_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
                this.thumbnail_url = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _thumbnail_url_initializers, void 0));
                this.is_global = (__runInitializers(this, _thumbnail_url_extraInitializers), __runInitializers(this, _is_global_initializers, void 0));
                this.target_audience = (__runInitializers(this, _is_global_extraInitializers), __runInitializers(this, _target_audience_initializers, void 0));
                this.is_read = (__runInitializers(this, _target_audience_extraInitializers), __runInitializers(this, _is_read_initializers, void 0));
                this.read_at = (__runInitializers(this, _is_read_extraInitializers), __runInitializers(this, _read_at_initializers, void 0));
                this.created_at = (__runInitializers(this, _read_at_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
                __runInitializers(this, _created_at_extraInitializers);
            }
            return AdminNotificationDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification ID',
                    example: 1,
                }), (0, class_validator_1.IsInt)()];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification type',
                    enum: Object.values(admin_notification_constants_1.ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
                    example: 'blog',
                }), (0, class_validator_1.IsEnum)(Object.values(admin_notification_constants_1.ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES))];
            _title_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification title',
                    example: 'Bài viết mới',
                }), (0, class_validator_1.IsString)()];
            _message_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification message',
                    example: 'John Doe đã tạo bài viết: Hello World',
                }), (0, class_validator_1.IsString)()];
            _link_url_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Link URL for navigation',
                    example: '/admin/blogs/123',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _slug_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'URL-friendly identifier for the notification',
                    example: 'new-blog-post-notification',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _thumbnail_url_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'URL to the notification thumbnail image',
                    example: 'https://example.com/images/notification-thumb.jpg',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _is_global_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether notification is global',
                    example: false,
                }), (0, class_validator_1.IsBoolean)()];
            _target_audience_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Target audience (always admin for admin notifications)',
                    example: 'admin',
                }), (0, class_validator_1.IsString)()];
            _is_read_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether notification is read',
                    example: false,
                }), (0, class_validator_1.IsBoolean)()];
            _read_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'When notification was read',
                    example: '2024-01-01T12:00:00Z',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)(), (0, class_transformer_1.Type)(function () { return Date; })];
            _created_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification creation timestamp',
                    example: '2024-01-01T12:00:00Z',
                }), (0, class_validator_1.IsDate)(), (0, class_transformer_1.Type)(function () { return Date; })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: function (obj) { return "message" in obj; }, get: function (obj) { return obj.message; }, set: function (obj, value) { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
            __esDecorate(null, null, _link_url_decorators, { kind: "field", name: "link_url", static: false, private: false, access: { has: function (obj) { return "link_url" in obj; }, get: function (obj) { return obj.link_url; }, set: function (obj, value) { obj.link_url = value; } }, metadata: _metadata }, _link_url_initializers, _link_url_extraInitializers);
            __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: function (obj) { return "slug" in obj; }, get: function (obj) { return obj.slug; }, set: function (obj, value) { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
            __esDecorate(null, null, _thumbnail_url_decorators, { kind: "field", name: "thumbnail_url", static: false, private: false, access: { has: function (obj) { return "thumbnail_url" in obj; }, get: function (obj) { return obj.thumbnail_url; }, set: function (obj, value) { obj.thumbnail_url = value; } }, metadata: _metadata }, _thumbnail_url_initializers, _thumbnail_url_extraInitializers);
            __esDecorate(null, null, _is_global_decorators, { kind: "field", name: "is_global", static: false, private: false, access: { has: function (obj) { return "is_global" in obj; }, get: function (obj) { return obj.is_global; }, set: function (obj, value) { obj.is_global = value; } }, metadata: _metadata }, _is_global_initializers, _is_global_extraInitializers);
            __esDecorate(null, null, _target_audience_decorators, { kind: "field", name: "target_audience", static: false, private: false, access: { has: function (obj) { return "target_audience" in obj; }, get: function (obj) { return obj.target_audience; }, set: function (obj, value) { obj.target_audience = value; } }, metadata: _metadata }, _target_audience_initializers, _target_audience_extraInitializers);
            __esDecorate(null, null, _is_read_decorators, { kind: "field", name: "is_read", static: false, private: false, access: { has: function (obj) { return "is_read" in obj; }, get: function (obj) { return obj.is_read; }, set: function (obj, value) { obj.is_read = value; } }, metadata: _metadata }, _is_read_initializers, _is_read_extraInitializers);
            __esDecorate(null, null, _read_at_decorators, { kind: "field", name: "read_at", static: false, private: false, access: { has: function (obj) { return "read_at" in obj; }, get: function (obj) { return obj.read_at; }, set: function (obj, value) { obj.read_at = value; } }, metadata: _metadata }, _read_at_initializers, _read_at_extraInitializers);
            __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.AdminNotificationDto = AdminNotificationDto;
var GetAdminNotificationsOutputDto = function () {
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
            function GetAdminNotificationsOutputDto() {
                this.items = __runInitializers(this, _items_initializers, void 0);
                this.pagination = (__runInitializers(this, _items_extraInitializers), __runInitializers(this, _pagination_initializers, void 0));
                this.unread_count = (__runInitializers(this, _pagination_extraInitializers), __runInitializers(this, _unread_count_initializers, void 0));
                __runInitializers(this, _unread_count_extraInitializers);
            }
            return GetAdminNotificationsOutputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _items_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'List of admin notifications',
                    type: [AdminNotificationDto],
                }), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_validator_1.IsArray)(), (0, class_transformer_1.Type)(function () { return AdminNotificationDto; })];
            _pagination_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Pagination metadata',
                    type: pagination_dtos_1.PaginationMetadataDto,
                }), (0, class_validator_1.ValidateNested)(), (0, class_validator_1.IsDefined)(), (0, class_transformer_1.Type)(function () { return pagination_dtos_1.PaginationMetadataDto; })];
            _unread_count_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Total unread count for admin',
                    example: 5,
                }), (0, class_validator_1.IsInt)()];
            __esDecorate(null, null, _items_decorators, { kind: "field", name: "items", static: false, private: false, access: { has: function (obj) { return "items" in obj; }, get: function (obj) { return obj.items; }, set: function (obj, value) { obj.items = value; } }, metadata: _metadata }, _items_initializers, _items_extraInitializers);
            __esDecorate(null, null, _pagination_decorators, { kind: "field", name: "pagination", static: false, private: false, access: { has: function (obj) { return "pagination" in obj; }, get: function (obj) { return obj.pagination; }, set: function (obj, value) { obj.pagination = value; } }, metadata: _metadata }, _pagination_initializers, _pagination_extraInitializers);
            __esDecorate(null, null, _unread_count_decorators, { kind: "field", name: "unread_count", static: false, private: false, access: { has: function (obj) { return "unread_count" in obj; }, get: function (obj) { return obj.unread_count; }, set: function (obj, value) { obj.unread_count = value; } }, metadata: _metadata }, _unread_count_initializers, _unread_count_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetAdminNotificationsOutputDto = GetAdminNotificationsOutputDto;
