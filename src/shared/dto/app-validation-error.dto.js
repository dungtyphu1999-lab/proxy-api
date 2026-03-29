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
exports.AppValidationErrors = exports.AppValidationError = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var AppValidationError = function () {
    var _a;
    var _property_decorators;
    var _property_initializers = [];
    var _property_extraInitializers = [];
    var _property_path_decorators;
    var _property_path_initializers = [];
    var _property_path_extraInitializers = [];
    var _value_decorators;
    var _value_initializers = [];
    var _value_extraInitializers = [];
    var _constraints_decorators;
    var _constraints_initializers = [];
    var _constraints_extraInitializers = [];
    return _a = /** @class */ (function () {
            function AppValidationError() {
                this.property = __runInitializers(this, _property_initializers, void 0);
                this.property_path = (__runInitializers(this, _property_extraInitializers), __runInitializers(this, _property_path_initializers, void 0));
                this.value = (__runInitializers(this, _property_path_extraInitializers), __runInitializers(this, _value_initializers, void 0));
                this.constraints = (__runInitializers(this, _value_extraInitializers), __runInitializers(this, _constraints_initializers, void 0));
                __runInitializers(this, _constraints_extraInitializers);
            }
            return AppValidationError;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _property_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Validation error property',
                    example: 'email',
                })];
            _property_path_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Path to the property that caused the validation error',
                    example: 'user.email',
                })];
            _value_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Value that caused the validation error',
                    example: 'invalid-email',
                })];
            _constraints_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Validation constraints if any',
                    type: Object,
                    required: false,
                }), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _property_decorators, { kind: "field", name: "property", static: false, private: false, access: { has: function (obj) { return "property" in obj; }, get: function (obj) { return obj.property; }, set: function (obj, value) { obj.property = value; } }, metadata: _metadata }, _property_initializers, _property_extraInitializers);
            __esDecorate(null, null, _property_path_decorators, { kind: "field", name: "property_path", static: false, private: false, access: { has: function (obj) { return "property_path" in obj; }, get: function (obj) { return obj.property_path; }, set: function (obj, value) { obj.property_path = value; } }, metadata: _metadata }, _property_path_initializers, _property_path_extraInitializers);
            __esDecorate(null, null, _value_decorators, { kind: "field", name: "value", static: false, private: false, access: { has: function (obj) { return "value" in obj; }, get: function (obj) { return obj.value; }, set: function (obj, value) { obj.value = value; } }, metadata: _metadata }, _value_initializers, _value_extraInitializers);
            __esDecorate(null, null, _constraints_decorators, { kind: "field", name: "constraints", static: false, private: false, access: { has: function (obj) { return "constraints" in obj; }, get: function (obj) { return obj.constraints; }, set: function (obj, value) { obj.constraints = value; } }, metadata: _metadata }, _constraints_initializers, _constraints_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.AppValidationError = AppValidationError;
var AppValidationErrors = /** @class */ (function (_super) {
    __extends(AppValidationErrors, _super);
    function AppValidationErrors(errors) {
        return _super.apply(this, errors) || this;
    }
    return AppValidationErrors;
}(Array));
exports.AppValidationErrors = AppValidationErrors;
