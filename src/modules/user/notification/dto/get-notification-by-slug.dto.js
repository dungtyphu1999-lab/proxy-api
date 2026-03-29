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
exports.GetNotificationBySlugOutputDto = exports.GetNotificationBySlugQueryDto = exports.GetNotificationBySlugInputDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var GetNotificationBySlugInputDto = function () {
    var _a;
    var _slug_decorators;
    var _slug_initializers = [];
    var _slug_extraInitializers = [];
    return _a = /** @class */ (function () {
            function GetNotificationBySlugInputDto() {
                this.slug = __runInitializers(this, _slug_initializers, void 0);
                __runInitializers(this, _slug_extraInitializers);
            }
            return GetNotificationBySlugInputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _slug_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification slug',
                    example: 'system-maintenance-notice',
                })];
            __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: function (obj) { return "slug" in obj; }, get: function (obj) { return obj.slug; }, set: function (obj, value) { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetNotificationBySlugInputDto = GetNotificationBySlugInputDto;
var GetNotificationBySlugQueryDto = function () {
    var _a;
    var _for_seo_decorators;
    var _for_seo_initializers = [];
    var _for_seo_extraInitializers = [];
    return _a = /** @class */ (function () {
            function GetNotificationBySlugQueryDto() {
                this.for_seo = __runInitializers(this, _for_seo_initializers, void 0);
                __runInitializers(this, _for_seo_extraInitializers);
            }
            return GetNotificationBySlugQueryDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _for_seo_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Flag to indicate if request is for SEO purposes',
                    required: false,
                    type: String,
                    example: 'false',
                })];
            __esDecorate(null, null, _for_seo_decorators, { kind: "field", name: "for_seo", static: false, private: false, access: { has: function (obj) { return "for_seo" in obj; }, get: function (obj) { return obj.for_seo; }, set: function (obj, value) { obj.for_seo = value; } }, metadata: _metadata }, _for_seo_initializers, _for_seo_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetNotificationBySlugQueryDto = GetNotificationBySlugQueryDto;
var GetNotificationBySlugOutputDto = function () {
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
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    return _a = /** @class */ (function () {
            function GetNotificationBySlugOutputDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.type = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.title = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                this.message = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _message_initializers, void 0));
                this.link_url = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _link_url_initializers, void 0));
                this.slug = (__runInitializers(this, _link_url_extraInitializers), __runInitializers(this, _slug_initializers, void 0));
                this.thumbnail_url = (__runInitializers(this, _slug_extraInitializers), __runInitializers(this, _thumbnail_url_initializers, void 0));
                this.is_global = (__runInitializers(this, _thumbnail_url_extraInitializers), __runInitializers(this, _is_global_initializers, void 0));
                this.target_audience = (__runInitializers(this, _is_global_extraInitializers), __runInitializers(this, _target_audience_initializers, void 0));
                this.created_at = (__runInitializers(this, _target_audience_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
                __runInitializers(this, _created_at_extraInitializers);
            }
            return GetNotificationBySlugOutputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification ID',
                    example: 1,
                })];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification type',
                    example: 'system_announcement',
                })];
            _title_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification title',
                    example: 'System Maintenance Notice',
                })];
            _message_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification message',
                    example: 'The system will be under maintenance from 2 AM to 4 AM.',
                })];
            _link_url_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Link URL (optional)',
                    example: 'https://example.com/maintenance',
                    required: false,
                })];
            _slug_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'URL-friendly identifier for the notification',
                    example: 'system-maintenance-notice',
                    required: false,
                })];
            _thumbnail_url_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'URL to the notification thumbnail image',
                    example: 'https://example.com/images/maintenance-thumb.jpg',
                    required: false,
                })];
            _is_global_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether notification is global',
                    example: true,
                })];
            _target_audience_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Target audience',
                    example: 'user',
                })];
            _created_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Creation timestamp',
                    example: '2024-01-15T10:30:00.000Z',
                })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: function (obj) { return "message" in obj; }, get: function (obj) { return obj.message; }, set: function (obj, value) { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
            __esDecorate(null, null, _link_url_decorators, { kind: "field", name: "link_url", static: false, private: false, access: { has: function (obj) { return "link_url" in obj; }, get: function (obj) { return obj.link_url; }, set: function (obj, value) { obj.link_url = value; } }, metadata: _metadata }, _link_url_initializers, _link_url_extraInitializers);
            __esDecorate(null, null, _slug_decorators, { kind: "field", name: "slug", static: false, private: false, access: { has: function (obj) { return "slug" in obj; }, get: function (obj) { return obj.slug; }, set: function (obj, value) { obj.slug = value; } }, metadata: _metadata }, _slug_initializers, _slug_extraInitializers);
            __esDecorate(null, null, _thumbnail_url_decorators, { kind: "field", name: "thumbnail_url", static: false, private: false, access: { has: function (obj) { return "thumbnail_url" in obj; }, get: function (obj) { return obj.thumbnail_url; }, set: function (obj, value) { obj.thumbnail_url = value; } }, metadata: _metadata }, _thumbnail_url_initializers, _thumbnail_url_extraInitializers);
            __esDecorate(null, null, _is_global_decorators, { kind: "field", name: "is_global", static: false, private: false, access: { has: function (obj) { return "is_global" in obj; }, get: function (obj) { return obj.is_global; }, set: function (obj, value) { obj.is_global = value; } }, metadata: _metadata }, _is_global_initializers, _is_global_extraInitializers);
            __esDecorate(null, null, _target_audience_decorators, { kind: "field", name: "target_audience", static: false, private: false, access: { has: function (obj) { return "target_audience" in obj; }, get: function (obj) { return obj.target_audience; }, set: function (obj, value) { obj.target_audience = value; } }, metadata: _metadata }, _target_audience_initializers, _target_audience_extraInitializers);
            __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetNotificationBySlugOutputDto = GetNotificationBySlugOutputDto;
