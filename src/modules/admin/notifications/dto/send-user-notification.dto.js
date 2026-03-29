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
exports.SendUserNotificationOutputDto = exports.SendUserNotificationInputDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var admin_notification_constants_1 = require("../admin-notification.constants");
var SendUserNotificationInputDto = function () {
    var _a;
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
    var _user_ids_decorators;
    var _user_ids_initializers = [];
    var _user_ids_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SendUserNotificationInputDto() {
                this.type = __runInitializers(this, _type_initializers, void 0);
                this.title = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                this.message = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _message_initializers, void 0));
                this.link_url = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _link_url_initializers, void 0));
                this.user_ids = (__runInitializers(this, _link_url_extraInitializers), __runInitializers(this, _user_ids_initializers, void 0));
                __runInitializers(this, _user_ids_extraInitializers);
            }
            return SendUserNotificationInputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification type',
                    enum: Object.values(admin_notification_constants_1.ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
                    example: 'system',
                }), (0, class_validator_1.IsEnum)(Object.values(admin_notification_constants_1.ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES))];
            _title_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification title',
                    example: 'Thông báo hệ thống',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _message_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification message',
                    example: 'Hệ thống sẽ bảo trì từ 2h-4h sáng ngày mai',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _link_url_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Link URL for navigation',
                    example: '/announcements/maintenance',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUrl)()];
            _user_ids_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'List of user IDs to send notification to. If empty, send to all verified and unblocked users',
                    example: ['user-uuid-1', 'user-uuid-2'],
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsUUID)('4', { each: true })];
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: function (obj) { return "message" in obj; }, get: function (obj) { return obj.message; }, set: function (obj, value) { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
            __esDecorate(null, null, _link_url_decorators, { kind: "field", name: "link_url", static: false, private: false, access: { has: function (obj) { return "link_url" in obj; }, get: function (obj) { return obj.link_url; }, set: function (obj, value) { obj.link_url = value; } }, metadata: _metadata }, _link_url_initializers, _link_url_extraInitializers);
            __esDecorate(null, null, _user_ids_decorators, { kind: "field", name: "user_ids", static: false, private: false, access: { has: function (obj) { return "user_ids" in obj; }, get: function (obj) { return obj.user_ids; }, set: function (obj, value) { obj.user_ids = value; } }, metadata: _metadata }, _user_ids_initializers, _user_ids_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SendUserNotificationInputDto = SendUserNotificationInputDto;
var SendUserNotificationOutputDto = function () {
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
    var _target_audience_decorators;
    var _target_audience_initializers = [];
    var _target_audience_extraInitializers = [];
    var _users_notified_decorators;
    var _users_notified_initializers = [];
    var _users_notified_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SendUserNotificationOutputDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.type = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.title = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                this.message = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _message_initializers, void 0));
                this.link_url = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _link_url_initializers, void 0));
                this.target_audience = (__runInitializers(this, _link_url_extraInitializers), __runInitializers(this, _target_audience_initializers, void 0));
                this.users_notified = (__runInitializers(this, _target_audience_extraInitializers), __runInitializers(this, _users_notified_initializers, void 0));
                this.created_at = (__runInitializers(this, _users_notified_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
                __runInitializers(this, _created_at_extraInitializers);
            }
            return SendUserNotificationOutputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification ID',
                    example: 1,
                })];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification type',
                    enum: Object.values(admin_notification_constants_1.ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
                    example: 'system',
                })];
            _title_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification title',
                    example: 'Thông báo hệ thống',
                })];
            _message_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification message',
                    example: 'Hệ thống sẽ bảo trì từ 2h-4h sáng ngày mai',
                })];
            _link_url_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Link URL for navigation',
                    example: '/announcements/maintenance',
                    required: false,
                })];
            _target_audience_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Target audience (always user for user notifications)',
                    example: 'user',
                })];
            _users_notified_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of users notified',
                    example: 150,
                })];
            _created_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification creation timestamp',
                    example: '2024-01-01T12:00:00Z',
                })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: function (obj) { return "message" in obj; }, get: function (obj) { return obj.message; }, set: function (obj, value) { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
            __esDecorate(null, null, _link_url_decorators, { kind: "field", name: "link_url", static: false, private: false, access: { has: function (obj) { return "link_url" in obj; }, get: function (obj) { return obj.link_url; }, set: function (obj, value) { obj.link_url = value; } }, metadata: _metadata }, _link_url_initializers, _link_url_extraInitializers);
            __esDecorate(null, null, _target_audience_decorators, { kind: "field", name: "target_audience", static: false, private: false, access: { has: function (obj) { return "target_audience" in obj; }, get: function (obj) { return obj.target_audience; }, set: function (obj, value) { obj.target_audience = value; } }, metadata: _metadata }, _target_audience_initializers, _target_audience_extraInitializers);
            __esDecorate(null, null, _users_notified_decorators, { kind: "field", name: "users_notified", static: false, private: false, access: { has: function (obj) { return "users_notified" in obj; }, get: function (obj) { return obj.users_notified; }, set: function (obj, value) { obj.users_notified = value; } }, metadata: _metadata }, _users_notified_initializers, _users_notified_extraInitializers);
            __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SendUserNotificationOutputDto = SendUserNotificationOutputDto;
