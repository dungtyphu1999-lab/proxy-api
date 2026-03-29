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
exports.TelegramConnectTokenResponseDto = exports.TelegramConnectTokenDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var response_dto_1 = require("@/shared/dto/response.dto");
var TelegramConnectTokenDto = function () {
    var _a;
    var _token_decorators;
    var _token_initializers = [];
    var _token_extraInitializers = [];
    var _expires_at_decorators;
    var _expires_at_initializers = [];
    var _expires_at_extraInitializers = [];
    return _a = /** @class */ (function () {
            function TelegramConnectTokenDto() {
                this.token = __runInitializers(this, _token_initializers, void 0);
                this.expires_at = (__runInitializers(this, _token_extraInitializers), __runInitializers(this, _expires_at_initializers, void 0));
                __runInitializers(this, _expires_at_extraInitializers);
            }
            return TelegramConnectTokenDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _token_decorators = [(0, swagger_1.ApiProperty)({ description: 'Telegram link token', example: 'uuid-string' })];
            _expires_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Token expiration time',
                    example: '2026-02-27T10:30:00.000Z',
                })];
            __esDecorate(null, null, _token_decorators, { kind: "field", name: "token", static: false, private: false, access: { has: function (obj) { return "token" in obj; }, get: function (obj) { return obj.token; }, set: function (obj, value) { obj.token = value; } }, metadata: _metadata }, _token_initializers, _token_extraInitializers);
            __esDecorate(null, null, _expires_at_decorators, { kind: "field", name: "expires_at", static: false, private: false, access: { has: function (obj) { return "expires_at" in obj; }, get: function (obj) { return obj.expires_at; }, set: function (obj, value) { obj.expires_at = value; } }, metadata: _metadata }, _expires_at_initializers, _expires_at_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.TelegramConnectTokenDto = TelegramConnectTokenDto;
var TelegramConnectTokenResponseDto = /** @class */ (function (_super) {
    __extends(TelegramConnectTokenResponseDto, _super);
    function TelegramConnectTokenResponseDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TelegramConnectTokenResponseDto;
}(response_dto_1.SuccessResponseDto));
exports.TelegramConnectTokenResponseDto = TelegramConnectTokenResponseDto;
