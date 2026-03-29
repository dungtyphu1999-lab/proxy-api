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
exports.SocketEvents = exports.NotificationSocketDto = exports.MarkNotificationReadSocketDto = exports.GetNotificationsSocketDto = exports.SocketAuthDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var notification_constants_1 = require("../notification.constants");
// Socket authentication payload
var SocketAuthDto = function () {
    var _a;
    var _token_decorators;
    var _token_initializers = [];
    var _token_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SocketAuthDto() {
                this.token = __runInitializers(this, _token_initializers, void 0);
                __runInitializers(this, _token_extraInitializers);
            }
            return SocketAuthDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _token_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'JWT token for socket authentication',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: function (obj) { return "token" in obj; }, get: function (obj) { return obj.token; }, set: function (obj, value) { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SocketAuthDto = SocketAuthDto;
// Get notifications payload (Client → Server)
var GetNotificationsSocketDto = function () {
    var _a;
    var _page_decorators;
    var _page_initializers = [];
    var _page_extraInitializers = [];
    var _limit_decorators;
    var _limit_initializers = [];
    var _limit_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    return _a = /** @class */ (function () {
            function GetNotificationsSocketDto() {
                this.page = __runInitializers(this, _page_initializers, void 0);
                this.limit = (__runInitializers(this, _page_extraInitializers), __runInitializers(this, _limit_initializers, void 0));
                this.type = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                __runInitializers(this, _type_extraInitializers);
            }
            return GetNotificationsSocketDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _page_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Page number',
                    example: 1,
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)()];
            _limit_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Items per page',
                    example: 20,
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)()];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Filter by notification type',
                    enum: Object.values(notification_constants_1.NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
                    example: 'all',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(Object.values(notification_constants_1.NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES))];
            __esDecorate(null, null, _page_decorators, { kind: "field", name: "page", static: false, private: false, access: { has: function (obj) { return "page" in obj; }, get: function (obj) { return obj.page; }, set: function (obj, value) { obj.page = value; } }, metadata: _metadata }, _page_initializers, _page_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetNotificationsSocketDto = GetNotificationsSocketDto;
// Mark notification as read payload (Client → Server)
var MarkNotificationReadSocketDto = function () {
    var _a;
    var _notification_id_decorators;
    var _notification_id_initializers = [];
    var _notification_id_extraInitializers = [];
    return _a = /** @class */ (function () {
            function MarkNotificationReadSocketDto() {
                this.notification_id = __runInitializers(this, _notification_id_initializers, void 0);
                __runInitializers(this, _notification_id_extraInitializers);
            }
            return MarkNotificationReadSocketDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _notification_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification ID to mark as read',
                    example: 1,
                    required: true,
                }), (0, class_validator_1.IsInt)()];
            __esDecorate(null, null, _notification_id_decorators, { kind: "field", name: "notification_id", static: false, private: false, access: { has: function (obj) { return "notification_id" in obj; }, get: function (obj) { return obj.notification_id; }, set: function (obj, value) { obj.notification_id = value; } }, metadata: _metadata }, _notification_id_initializers, _notification_id_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.MarkNotificationReadSocketDto = MarkNotificationReadSocketDto;
// Notification data (Server → Client)
var NotificationSocketDto = function () {
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
    var _is_read_decorators;
    var _is_read_initializers = [];
    var _is_read_extraInitializers = [];
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
            function NotificationSocketDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.type = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.title = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                this.message = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _message_initializers, void 0));
                this.link_url = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _link_url_initializers, void 0));
                this.is_read = (__runInitializers(this, _link_url_extraInitializers), __runInitializers(this, _is_read_initializers, void 0));
                this.is_global = (__runInitializers(this, _is_read_extraInitializers), __runInitializers(this, _is_global_initializers, void 0));
                this.target_audience = (__runInitializers(this, _is_global_extraInitializers), __runInitializers(this, _target_audience_initializers, void 0));
                this.created_at = (__runInitializers(this, _target_audience_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
                __runInitializers(this, _created_at_extraInitializers);
            }
            return NotificationSocketDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification ID',
                    example: 1,
                }), (0, class_validator_1.IsInt)()];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification type',
                    enum: Object.values(notification_constants_1.NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
                    example: 'order',
                }), (0, class_validator_1.IsEnum)(Object.values(notification_constants_1.NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES))];
            _title_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification title',
                    example: 'Đơn hàng mới',
                }), (0, class_validator_1.IsString)()];
            _message_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification message',
                    example: 'Bạn có đơn hàng mới #12345',
                }), (0, class_validator_1.IsString)()];
            _link_url_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Link URL for navigation',
                    example: '/orders/12345',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUrl)()];
            _is_read_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether notification is read',
                    example: false,
                }), (0, class_validator_1.IsBoolean)()];
            _is_global_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether notification is global',
                    example: false,
                }), (0, class_validator_1.IsBoolean)()];
            _target_audience_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Target audience for the notification',
                    enum: ['admin', 'user', 'all'],
                    example: 'admin',
                }), (0, class_validator_1.IsEnum)(['admin', 'user', 'all'])];
            _created_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification creation timestamp',
                    example: '2024-01-01T12:00:00Z',
                }), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: function (obj) { return "message" in obj; }, get: function (obj) { return obj.message; }, set: function (obj, value) { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
            __esDecorate(null, null, _link_url_decorators, { kind: "field", name: "link_url", static: false, private: false, access: { has: function (obj) { return "link_url" in obj; }, get: function (obj) { return obj.link_url; }, set: function (obj, value) { obj.link_url = value; } }, metadata: _metadata }, _link_url_initializers, _link_url_extraInitializers);
            __esDecorate(null, null, _is_read_decorators, { kind: "field", name: "is_read", static: false, private: false, access: { has: function (obj) { return "is_read" in obj; }, get: function (obj) { return obj.is_read; }, set: function (obj, value) { obj.is_read = value; } }, metadata: _metadata }, _is_read_initializers, _is_read_extraInitializers);
            __esDecorate(null, null, _is_global_decorators, { kind: "field", name: "is_global", static: false, private: false, access: { has: function (obj) { return "is_global" in obj; }, get: function (obj) { return obj.is_global; }, set: function (obj, value) { obj.is_global = value; } }, metadata: _metadata }, _is_global_initializers, _is_global_extraInitializers);
            __esDecorate(null, null, _target_audience_decorators, { kind: "field", name: "target_audience", static: false, private: false, access: { has: function (obj) { return "target_audience" in obj; }, get: function (obj) { return obj.target_audience; }, set: function (obj, value) { obj.target_audience = value; } }, metadata: _metadata }, _target_audience_initializers, _target_audience_extraInitializers);
            __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.NotificationSocketDto = NotificationSocketDto;
// Socket event names
var SocketEvents;
(function (SocketEvents) {
    SocketEvents["AUTH"] = "auth";
    SocketEvents["GET_NOTIFICATIONS"] = "notification:get";
    SocketEvents["MARK_READ"] = "notification:read";
    SocketEvents["MARK_ALL_READ"] = "notification:read_all";
    SocketEvents["NEW_NOTIFICATION"] = "notification:new";
    SocketEvents["GLOBAL_NOTIFICATION"] = "notification:global";
    SocketEvents["UNREAD_COUNT"] = "notification:unread_count";
    SocketEvents["WALLET_BALANCE_UPDATED"] = "wallet:balance_updated";
    SocketEvents["CONNECT"] = "connect";
    SocketEvents["DISCONNECT"] = "disconnect";
})(SocketEvents || (exports.SocketEvents = SocketEvents = {}));
