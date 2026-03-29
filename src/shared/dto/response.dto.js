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
exports.ErrorResponseDto = exports.SuccessResponseDto = exports.BaseResponseDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var BaseResponseDto = function () {
    var _a;
    var _status_code_decorators;
    var _status_code_initializers = [];
    var _status_code_extraInitializers = [];
    var _message_decorators;
    var _message_initializers = [];
    var _message_extraInitializers = [];
    var _timestamp_decorators;
    var _timestamp_initializers = [];
    var _timestamp_extraInitializers = [];
    var _path_decorators;
    var _path_initializers = [];
    var _path_extraInitializers = [];
    return _a = /** @class */ (function () {
            function BaseResponseDto() {
                this.status_code = __runInitializers(this, _status_code_initializers, void 0);
                this.message = (__runInitializers(this, _status_code_extraInitializers), __runInitializers(this, _message_initializers, void 0));
                this.timestamp = (__runInitializers(this, _message_extraInitializers), __runInitializers(this, _timestamp_initializers, void 0));
                this.path = (__runInitializers(this, _timestamp_extraInitializers), __runInitializers(this, _path_initializers, void 0));
                __runInitializers(this, _path_extraInitializers);
            }
            return BaseResponseDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _status_code_decorators = [(0, swagger_1.ApiProperty)({ description: 'HTTP status code', example: 200 }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.IsNotEmpty)()];
            _message_decorators = [(0, swagger_1.ApiProperty)({ description: 'Response message', example: 'Success' }), (0, class_validator_1.IsString)()];
            _timestamp_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Timestamp of the response',
                    example: new Date().toISOString(),
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _path_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Request path',
                    example: '/api/v1/resource',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _status_code_decorators, { kind: "field", name: "status_code", static: false, private: false, access: { has: function (obj) { return "status_code" in obj; }, get: function (obj) { return obj.status_code; }, set: function (obj, value) { obj.status_code = value; } }, metadata: _metadata }, _status_code_initializers, _status_code_extraInitializers);
            __esDecorate(null, null, _message_decorators, { kind: "field", name: "message", static: false, private: false, access: { has: function (obj) { return "message" in obj; }, get: function (obj) { return obj.message; }, set: function (obj, value) { obj.message = value; } }, metadata: _metadata }, _message_initializers, _message_extraInitializers);
            __esDecorate(null, null, _timestamp_decorators, { kind: "field", name: "timestamp", static: false, private: false, access: { has: function (obj) { return "timestamp" in obj; }, get: function (obj) { return obj.timestamp; }, set: function (obj, value) { obj.timestamp = value; } }, metadata: _metadata }, _timestamp_initializers, _timestamp_extraInitializers);
            __esDecorate(null, null, _path_decorators, { kind: "field", name: "path", static: false, private: false, access: { has: function (obj) { return "path" in obj; }, get: function (obj) { return obj.path; }, set: function (obj, value) { obj.path = value; } }, metadata: _metadata }, _path_initializers, _path_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.BaseResponseDto = BaseResponseDto;
var SuccessResponseDto = function () {
    var _a;
    var _classSuper = BaseResponseDto;
    var _success_decorators;
    var _success_initializers = [];
    var _success_extraInitializers = [];
    var _data_decorators;
    var _data_initializers = [];
    var _data_extraInitializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(SuccessResponseDto, _super);
            function SuccessResponseDto() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.success = __runInitializers(_this, _success_initializers, void 0);
                _this.data = (__runInitializers(_this, _success_extraInitializers), __runInitializers(_this, _data_initializers, void 0));
                __runInitializers(_this, _data_extraInitializers);
                return _this;
            }
            return SuccessResponseDto;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _success_decorators = [(0, swagger_1.ApiProperty)({ description: 'Indicates success', example: true }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsNotEmpty)()];
            _data_decorators = [(0, swagger_1.ApiProperty)({ description: 'Response data' })];
            __esDecorate(null, null, _success_decorators, { kind: "field", name: "success", static: false, private: false, access: { has: function (obj) { return "success" in obj; }, get: function (obj) { return obj.success; }, set: function (obj, value) { obj.success = value; } }, metadata: _metadata }, _success_initializers, _success_extraInitializers);
            __esDecorate(null, null, _data_decorators, { kind: "field", name: "data", static: false, private: false, access: { has: function (obj) { return "data" in obj; }, get: function (obj) { return obj.data; }, set: function (obj, value) { obj.data = value; } }, metadata: _metadata }, _data_initializers, _data_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SuccessResponseDto = SuccessResponseDto;
var ErrorResponseDto = function () {
    var _a;
    var _classSuper = BaseResponseDto;
    var _success_decorators;
    var _success_initializers = [];
    var _success_extraInitializers = [];
    var _error_code_decorators;
    var _error_code_initializers = [];
    var _error_code_extraInitializers = [];
    var _errors_decorators;
    var _errors_initializers = [];
    var _errors_extraInitializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(ErrorResponseDto, _super);
            function ErrorResponseDto() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.success = __runInitializers(_this, _success_initializers, void 0);
                _this.error_code = (__runInitializers(_this, _success_extraInitializers), __runInitializers(_this, _error_code_initializers, void 0));
                _this.errors = (__runInitializers(_this, _error_code_extraInitializers), __runInitializers(_this, _errors_initializers, void 0));
                __runInitializers(_this, _errors_extraInitializers);
                return _this;
            }
            return ErrorResponseDto;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _success_decorators = [(0, swagger_1.ApiProperty)({ description: 'Indicates failure', example: false }), (0, class_validator_1.IsBoolean)(), (0, class_validator_1.IsNotEmpty)()];
            _error_code_decorators = [(0, swagger_1.ApiProperty)({ description: 'Error code', required: false }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _errors_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Validation errors',
                    required: false,
                    type: 'array',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)()];
            __esDecorate(null, null, _success_decorators, { kind: "field", name: "success", static: false, private: false, access: { has: function (obj) { return "success" in obj; }, get: function (obj) { return obj.success; }, set: function (obj, value) { obj.success = value; } }, metadata: _metadata }, _success_initializers, _success_extraInitializers);
            __esDecorate(null, null, _error_code_decorators, { kind: "field", name: "error_code", static: false, private: false, access: { has: function (obj) { return "error_code" in obj; }, get: function (obj) { return obj.error_code; }, set: function (obj, value) { obj.error_code = value; } }, metadata: _metadata }, _error_code_initializers, _error_code_extraInitializers);
            __esDecorate(null, null, _errors_decorators, { kind: "field", name: "errors", static: false, private: false, access: { has: function (obj) { return "errors" in obj; }, get: function (obj) { return obj.errors; }, set: function (obj, value) { obj.errors = value; } }, metadata: _metadata }, _errors_initializers, _errors_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ErrorResponseDto = ErrorResponseDto;
