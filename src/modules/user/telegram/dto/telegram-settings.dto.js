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
exports.TelegramSettingsResponseDto = exports.UpdateTelegramSettingsDto = exports.TelegramSettingsDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var response_dto_1 = require("@/shared/dto/response.dto");
var TelegramSettingsDto = function () {
    var _a;
    var _notify_new_message_decorators;
    var _notify_new_message_initializers = [];
    var _notify_new_message_extraInitializers = [];
    var _notify_new_order_decorators;
    var _notify_new_order_initializers = [];
    var _notify_new_order_extraInitializers = [];
    var _notify_new_preorder_decorators;
    var _notify_new_preorder_initializers = [];
    var _notify_new_preorder_extraInitializers = [];
    var _notify_warranty_request_decorators;
    var _notify_warranty_request_initializers = [];
    var _notify_warranty_request_extraInitializers = [];
    var _notify_new_complaint_decorators;
    var _notify_new_complaint_initializers = [];
    var _notify_new_complaint_extraInitializers = [];
    var _notify_admin_decorators;
    var _notify_admin_initializers = [];
    var _notify_admin_extraInitializers = [];
    return _a = /** @class */ (function () {
            function TelegramSettingsDto() {
                this.notify_new_message = __runInitializers(this, _notify_new_message_initializers, void 0);
                this.notify_new_order = (__runInitializers(this, _notify_new_message_extraInitializers), __runInitializers(this, _notify_new_order_initializers, void 0));
                this.notify_new_preorder = (__runInitializers(this, _notify_new_order_extraInitializers), __runInitializers(this, _notify_new_preorder_initializers, void 0));
                this.notify_warranty_request = (__runInitializers(this, _notify_new_preorder_extraInitializers), __runInitializers(this, _notify_warranty_request_initializers, void 0));
                this.notify_new_complaint = (__runInitializers(this, _notify_warranty_request_extraInitializers), __runInitializers(this, _notify_new_complaint_initializers, void 0));
                this.notify_admin = (__runInitializers(this, _notify_new_complaint_extraInitializers), __runInitializers(this, _notify_admin_initializers, void 0));
                __runInitializers(this, _notify_admin_extraInitializers);
            }
            return TelegramSettingsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _notify_new_message_decorators = [(0, swagger_1.ApiProperty)({ example: true }), (0, class_validator_1.IsBoolean)()];
            _notify_new_order_decorators = [(0, swagger_1.ApiProperty)({ example: true }), (0, class_validator_1.IsBoolean)()];
            _notify_new_preorder_decorators = [(0, swagger_1.ApiProperty)({ example: true }), (0, class_validator_1.IsBoolean)()];
            _notify_warranty_request_decorators = [(0, swagger_1.ApiProperty)({ example: true }), (0, class_validator_1.IsBoolean)()];
            _notify_new_complaint_decorators = [(0, swagger_1.ApiProperty)({ example: true }), (0, class_validator_1.IsBoolean)()];
            _notify_admin_decorators = [(0, swagger_1.ApiProperty)({ example: true }), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _notify_new_message_decorators, { kind: "field", name: "notify_new_message", static: false, private: false, access: { has: function (obj) { return "notify_new_message" in obj; }, get: function (obj) { return obj.notify_new_message; }, set: function (obj, value) { obj.notify_new_message = value; } }, metadata: _metadata }, _notify_new_message_initializers, _notify_new_message_extraInitializers);
            __esDecorate(null, null, _notify_new_order_decorators, { kind: "field", name: "notify_new_order", static: false, private: false, access: { has: function (obj) { return "notify_new_order" in obj; }, get: function (obj) { return obj.notify_new_order; }, set: function (obj, value) { obj.notify_new_order = value; } }, metadata: _metadata }, _notify_new_order_initializers, _notify_new_order_extraInitializers);
            __esDecorate(null, null, _notify_new_preorder_decorators, { kind: "field", name: "notify_new_preorder", static: false, private: false, access: { has: function (obj) { return "notify_new_preorder" in obj; }, get: function (obj) { return obj.notify_new_preorder; }, set: function (obj, value) { obj.notify_new_preorder = value; } }, metadata: _metadata }, _notify_new_preorder_initializers, _notify_new_preorder_extraInitializers);
            __esDecorate(null, null, _notify_warranty_request_decorators, { kind: "field", name: "notify_warranty_request", static: false, private: false, access: { has: function (obj) { return "notify_warranty_request" in obj; }, get: function (obj) { return obj.notify_warranty_request; }, set: function (obj, value) { obj.notify_warranty_request = value; } }, metadata: _metadata }, _notify_warranty_request_initializers, _notify_warranty_request_extraInitializers);
            __esDecorate(null, null, _notify_new_complaint_decorators, { kind: "field", name: "notify_new_complaint", static: false, private: false, access: { has: function (obj) { return "notify_new_complaint" in obj; }, get: function (obj) { return obj.notify_new_complaint; }, set: function (obj, value) { obj.notify_new_complaint = value; } }, metadata: _metadata }, _notify_new_complaint_initializers, _notify_new_complaint_extraInitializers);
            __esDecorate(null, null, _notify_admin_decorators, { kind: "field", name: "notify_admin", static: false, private: false, access: { has: function (obj) { return "notify_admin" in obj; }, get: function (obj) { return obj.notify_admin; }, set: function (obj, value) { obj.notify_admin = value; } }, metadata: _metadata }, _notify_admin_initializers, _notify_admin_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.TelegramSettingsDto = TelegramSettingsDto;
var UpdateTelegramSettingsDto = function () {
    var _a;
    var _notify_new_message_decorators;
    var _notify_new_message_initializers = [];
    var _notify_new_message_extraInitializers = [];
    var _notify_new_order_decorators;
    var _notify_new_order_initializers = [];
    var _notify_new_order_extraInitializers = [];
    var _notify_new_preorder_decorators;
    var _notify_new_preorder_initializers = [];
    var _notify_new_preorder_extraInitializers = [];
    var _notify_warranty_request_decorators;
    var _notify_warranty_request_initializers = [];
    var _notify_warranty_request_extraInitializers = [];
    var _notify_new_complaint_decorators;
    var _notify_new_complaint_initializers = [];
    var _notify_new_complaint_extraInitializers = [];
    var _notify_admin_decorators;
    var _notify_admin_initializers = [];
    var _notify_admin_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateTelegramSettingsDto() {
                this.notify_new_message = __runInitializers(this, _notify_new_message_initializers, void 0);
                this.notify_new_order = (__runInitializers(this, _notify_new_message_extraInitializers), __runInitializers(this, _notify_new_order_initializers, void 0));
                this.notify_new_preorder = (__runInitializers(this, _notify_new_order_extraInitializers), __runInitializers(this, _notify_new_preorder_initializers, void 0));
                this.notify_warranty_request = (__runInitializers(this, _notify_new_preorder_extraInitializers), __runInitializers(this, _notify_warranty_request_initializers, void 0));
                this.notify_new_complaint = (__runInitializers(this, _notify_warranty_request_extraInitializers), __runInitializers(this, _notify_new_complaint_initializers, void 0));
                this.notify_admin = (__runInitializers(this, _notify_new_complaint_extraInitializers), __runInitializers(this, _notify_admin_initializers, void 0));
                __runInitializers(this, _notify_admin_extraInitializers);
            }
            return UpdateTelegramSettingsDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _notify_new_message_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _notify_new_order_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _notify_new_preorder_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _notify_warranty_request_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _notify_new_complaint_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _notify_admin_decorators = [(0, swagger_1.ApiProperty)({ required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            __esDecorate(null, null, _notify_new_message_decorators, { kind: "field", name: "notify_new_message", static: false, private: false, access: { has: function (obj) { return "notify_new_message" in obj; }, get: function (obj) { return obj.notify_new_message; }, set: function (obj, value) { obj.notify_new_message = value; } }, metadata: _metadata }, _notify_new_message_initializers, _notify_new_message_extraInitializers);
            __esDecorate(null, null, _notify_new_order_decorators, { kind: "field", name: "notify_new_order", static: false, private: false, access: { has: function (obj) { return "notify_new_order" in obj; }, get: function (obj) { return obj.notify_new_order; }, set: function (obj, value) { obj.notify_new_order = value; } }, metadata: _metadata }, _notify_new_order_initializers, _notify_new_order_extraInitializers);
            __esDecorate(null, null, _notify_new_preorder_decorators, { kind: "field", name: "notify_new_preorder", static: false, private: false, access: { has: function (obj) { return "notify_new_preorder" in obj; }, get: function (obj) { return obj.notify_new_preorder; }, set: function (obj, value) { obj.notify_new_preorder = value; } }, metadata: _metadata }, _notify_new_preorder_initializers, _notify_new_preorder_extraInitializers);
            __esDecorate(null, null, _notify_warranty_request_decorators, { kind: "field", name: "notify_warranty_request", static: false, private: false, access: { has: function (obj) { return "notify_warranty_request" in obj; }, get: function (obj) { return obj.notify_warranty_request; }, set: function (obj, value) { obj.notify_warranty_request = value; } }, metadata: _metadata }, _notify_warranty_request_initializers, _notify_warranty_request_extraInitializers);
            __esDecorate(null, null, _notify_new_complaint_decorators, { kind: "field", name: "notify_new_complaint", static: false, private: false, access: { has: function (obj) { return "notify_new_complaint" in obj; }, get: function (obj) { return obj.notify_new_complaint; }, set: function (obj, value) { obj.notify_new_complaint = value; } }, metadata: _metadata }, _notify_new_complaint_initializers, _notify_new_complaint_extraInitializers);
            __esDecorate(null, null, _notify_admin_decorators, { kind: "field", name: "notify_admin", static: false, private: false, access: { has: function (obj) { return "notify_admin" in obj; }, get: function (obj) { return obj.notify_admin; }, set: function (obj, value) { obj.notify_admin = value; } }, metadata: _metadata }, _notify_admin_initializers, _notify_admin_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateTelegramSettingsDto = UpdateTelegramSettingsDto;
var TelegramSettingsResponseDto = /** @class */ (function (_super) {
    __extends(TelegramSettingsResponseDto, _super);
    function TelegramSettingsResponseDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TelegramSettingsResponseDto;
}(response_dto_1.SuccessResponseDto));
exports.TelegramSettingsResponseDto = TelegramSettingsResponseDto;
