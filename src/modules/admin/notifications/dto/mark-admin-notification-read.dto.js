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
exports.MarkAdminNotificationReadOutputDto = exports.MarkAdminNotificationReadInputDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var MarkAdminNotificationReadInputDto = function () {
    var _a;
    var _notification_id_decorators;
    var _notification_id_initializers = [];
    var _notification_id_extraInitializers = [];
    return _a = /** @class */ (function () {
            function MarkAdminNotificationReadInputDto() {
                this.notification_id = __runInitializers(this, _notification_id_initializers, void 0);
                __runInitializers(this, _notification_id_extraInitializers);
            }
            return MarkAdminNotificationReadInputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _notification_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Admin notification ID to mark as read',
                    example: 1,
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)()];
            __esDecorate(null, null, _notification_id_decorators, { kind: "field", name: "notification_id", static: false, private: false, access: { has: function (obj) { return "notification_id" in obj; }, get: function (obj) { return obj.notification_id; }, set: function (obj, value) { obj.notification_id = value; } }, metadata: _metadata }, _notification_id_initializers, _notification_id_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.MarkAdminNotificationReadInputDto = MarkAdminNotificationReadInputDto;
var MarkAdminNotificationReadOutputDto = function () {
    var _a;
    var _success_decorators;
    var _success_initializers = [];
    var _success_extraInitializers = [];
    var _unread_count_decorators;
    var _unread_count_initializers = [];
    var _unread_count_extraInitializers = [];
    var _marked_count_decorators;
    var _marked_count_initializers = [];
    var _marked_count_extraInitializers = [];
    return _a = /** @class */ (function () {
            function MarkAdminNotificationReadOutputDto() {
                this.success = __runInitializers(this, _success_initializers, void 0);
                this.unread_count = (__runInitializers(this, _success_extraInitializers), __runInitializers(this, _unread_count_initializers, void 0));
                this.marked_count = (__runInitializers(this, _unread_count_extraInitializers), __runInitializers(this, _marked_count_initializers, void 0));
                __runInitializers(this, _marked_count_extraInitializers);
            }
            return MarkAdminNotificationReadOutputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _success_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Success status',
                    example: true,
                })];
            _unread_count_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Updated unread count for admin',
                    example: 3,
                })];
            _marked_count_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of admin notifications marked as read',
                    example: 1,
                })];
            __esDecorate(null, null, _success_decorators, { kind: "field", name: "success", static: false, private: false, access: { has: function (obj) { return "success" in obj; }, get: function (obj) { return obj.success; }, set: function (obj, value) { obj.success = value; } }, metadata: _metadata }, _success_initializers, _success_extraInitializers);
            __esDecorate(null, null, _unread_count_decorators, { kind: "field", name: "unread_count", static: false, private: false, access: { has: function (obj) { return "unread_count" in obj; }, get: function (obj) { return obj.unread_count; }, set: function (obj, value) { obj.unread_count = value; } }, metadata: _metadata }, _unread_count_initializers, _unread_count_extraInitializers);
            __esDecorate(null, null, _marked_count_decorators, { kind: "field", name: "marked_count", static: false, private: false, access: { has: function (obj) { return "marked_count" in obj; }, get: function (obj) { return obj.marked_count; }, set: function (obj, value) { obj.marked_count = value; } }, metadata: _metadata }, _marked_count_initializers, _marked_count_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.MarkAdminNotificationReadOutputDto = MarkAdminNotificationReadOutputDto;
