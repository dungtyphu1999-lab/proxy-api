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
exports.EditNotificationOutputDto = exports.EditNotificationInputDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var admin_notification_constants_1 = require("../admin-notification.constants");
var EditNotificationInputDto = function () {
    var _a;
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _message_decorators;
    var _message_initializers = [];
    var _message_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _link_url_decorators;
    var _link_url_initializers = [];
    var _link_url_extraInitializers = [];
    return _a = /** @class */ (function () {
            function EditNotificationInputDto() {
                this.title = __runInitializers(this, _title_initializers, void 0);
                this.message = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _message_initializers, void 0));
                this.type = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.link_url = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _link_url_initializers, void 0));
                __runInitializers(this, _link_url_extraInitializers);
            }
            return EditNotificationInputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _title_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification title',
                    example: 'Updated System Maintenance',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _message_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification message',
                    example: 'The system maintenance has been rescheduled to tomorrow.',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification type',
                    enum: Object.values(admin_notification_constants_1.ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
                    example: 'blog',
                }), (0, class_validator_1.IsEnum)(Object.values(admin_notification_constants_1.ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES))];
            _link_url_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Link URL for the notification',
                    example: '/admin/announcements/maintenance',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUrl)()];
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: function (obj) { return "message" in obj; }, get: function (obj) { return obj.message; }, set: function (obj, value) { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _link_url_decorators, { kind: "field", name: "link_url", static: false, private: false, access: { has: function (obj) { return "link_url" in obj; }, get: function (obj) { return obj.link_url; }, set: function (obj, value) { obj.link_url = value; } }, metadata: _metadata }, _link_url_initializers, _link_url_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.EditNotificationInputDto = EditNotificationInputDto;
var EditNotificationOutputDto = function () {
    var _a;
    var _success_decorators;
    var _success_initializers = [];
    var _success_extraInitializers = [];
    var _new_notification_id_decorators;
    var _new_notification_id_initializers = [];
    var _new_notification_id_extraInitializers = [];
    var _old_notification_id_decorators;
    var _old_notification_id_initializers = [];
    var _old_notification_id_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _message_decorators;
    var _message_initializers = [];
    var _message_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    return _a = /** @class */ (function () {
            function EditNotificationOutputDto() {
                this.success = __runInitializers(this, _success_initializers, void 0);
                this.new_notification_id = (__runInitializers(this, _success_extraInitializers), __runInitializers(this, _new_notification_id_initializers, void 0));
                this.old_notification_id = (__runInitializers(this, _new_notification_id_extraInitializers), __runInitializers(this, _old_notification_id_initializers, void 0));
                this.title = (__runInitializers(this, _old_notification_id_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                this.message = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _message_initializers, void 0));
                this.type = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.created_at = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
                __runInitializers(this, _created_at_extraInitializers);
            }
            return EditNotificationOutputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _success_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Success status',
                    example: true,
                })];
            _new_notification_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'New notification ID',
                    example: 123,
                })];
            _old_notification_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Old notification ID that was soft deleted',
                    example: 122,
                })];
            _title_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification title',
                    example: 'Updated System Maintenance',
                })];
            _message_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification message',
                    example: 'The system maintenance has been rescheduled to tomorrow.',
                })];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Notification type',
                    enum: Object.values(admin_notification_constants_1.ADMIN_NOTIFICATION_CONSTANTS.NOTIFICATION_TYPES),
                    example: 'blog',
                })];
            _created_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Created at timestamp',
                    example: '2024-01-15T10:30:00Z',
                })];
            __esDecorate(null, null, _success_decorators, { kind: "field", name: "success", static: false, private: false, access: { has: function (obj) { return "success" in obj; }, get: function (obj) { return obj.success; }, set: function (obj, value) { obj.success = value; } }, metadata: _metadata }, _success_initializers, _success_extraInitializers);
            __esDecorate(null, null, _new_notification_id_decorators, { kind: "field", name: "new_notification_id", static: false, private: false, access: { has: function (obj) { return "new_notification_id" in obj; }, get: function (obj) { return obj.new_notification_id; }, set: function (obj, value) { obj.new_notification_id = value; } }, metadata: _metadata }, _new_notification_id_initializers, _new_notification_id_extraInitializers);
            __esDecorate(null, null, _old_notification_id_decorators, { kind: "field", name: "old_notification_id", static: false, private: false, access: { has: function (obj) { return "old_notification_id" in obj; }, get: function (obj) { return obj.old_notification_id; }, set: function (obj, value) { obj.old_notification_id = value; } }, metadata: _metadata }, _old_notification_id_initializers, _old_notification_id_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: function (obj) { return "message" in obj; }, get: function (obj) { return obj.message; }, set: function (obj, value) { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.EditNotificationOutputDto = EditNotificationOutputDto;
