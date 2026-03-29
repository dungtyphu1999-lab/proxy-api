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
exports.GetProxiesQueryDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var pagination_query_dto_1 = require("@/shared/pagination/dto/pagination-query.dto");
var GetProxiesQueryDto = function () {
    var _a;
    var _classSuper = pagination_query_dto_1.PaginationQueryDto;
    var _order_id_decorators;
    var _order_id_initializers = [];
    var _order_id_extraInitializers = [];
    var _country_codes_decorators;
    var _country_codes_initializers = [];
    var _country_codes_extraInitializers = [];
    var _login_method_decorators;
    var _login_method_initializers = [];
    var _login_method_extraInitializers = [];
    var _connection_method_decorators;
    var _connection_method_initializers = [];
    var _connection_method_extraInitializers = [];
    var _proxy_type_decorators;
    var _proxy_type_initializers = [];
    var _proxy_type_extraInitializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(GetProxiesQueryDto, _super);
            function GetProxiesQueryDto() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.order_id = __runInitializers(_this, _order_id_initializers, void 0);
                _this.country_codes = (__runInitializers(_this, _order_id_extraInitializers), __runInitializers(_this, _country_codes_initializers, void 0));
                _this.login_method = (__runInitializers(_this, _country_codes_extraInitializers), __runInitializers(_this, _login_method_initializers, void 0));
                _this.connection_method = (__runInitializers(_this, _login_method_extraInitializers), __runInitializers(_this, _connection_method_initializers, void 0));
                _this.proxy_type = (__runInitializers(_this, _connection_method_extraInitializers), __runInitializers(_this, _proxy_type_initializers, void 0));
                __runInitializers(_this, _proxy_type_extraInitializers);
                return _this;
            }
            return GetProxiesQueryDto;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _order_id_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by specific proxy order id',
                    example: '257e5d4f-c0da-45b8-8e63-3061244b74e6',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)('4')];
            _country_codes_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by country codes (comma-separated)',
                    example: 'US,GB',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true }), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    return typeof value === 'string'
                        ? value
                            .split(',')
                            .map(function (s) { return s.trim(); })
                            .filter(Boolean)
                        : value;
                })];
            _login_method_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by login method',
                    enum: ['username_password', 'ip_whitelist'],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsIn)(['username_password', 'ip_whitelist'])];
            _connection_method_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by connection method',
                    enum: ['direct', 'socks5', 'http'],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsIn)(['direct', 'socks5', 'http'])];
            _proxy_type_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Filter by proxy type',
                    enum: ['proxy_server', 'static_residential', 'rotating_residential'],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsIn)(['proxy_server', 'static_residential', 'rotating_residential'])];
            __esDecorate(null, null, _order_id_decorators, { kind: "field", name: "order_id", static: false, private: false, access: { has: function (obj) { return "order_id" in obj; }, get: function (obj) { return obj.order_id; }, set: function (obj, value) { obj.order_id = value; } }, metadata: _metadata }, _order_id_initializers, _order_id_extraInitializers);
            __esDecorate(null, null, _country_codes_decorators, { kind: "field", name: "country_codes", static: false, private: false, access: { has: function (obj) { return "country_codes" in obj; }, get: function (obj) { return obj.country_codes; }, set: function (obj, value) { obj.country_codes = value; } }, metadata: _metadata }, _country_codes_initializers, _country_codes_extraInitializers);
            __esDecorate(null, null, _login_method_decorators, { kind: "field", name: "login_method", static: false, private: false, access: { has: function (obj) { return "login_method" in obj; }, get: function (obj) { return obj.login_method; }, set: function (obj, value) { obj.login_method = value; } }, metadata: _metadata }, _login_method_initializers, _login_method_extraInitializers);
            __esDecorate(null, null, _connection_method_decorators, { kind: "field", name: "connection_method", static: false, private: false, access: { has: function (obj) { return "connection_method" in obj; }, get: function (obj) { return obj.connection_method; }, set: function (obj, value) { obj.connection_method = value; } }, metadata: _metadata }, _connection_method_initializers, _connection_method_extraInitializers);
            __esDecorate(null, null, _proxy_type_decorators, { kind: "field", name: "proxy_type", static: false, private: false, access: { has: function (obj) { return "proxy_type" in obj; }, get: function (obj) { return obj.proxy_type; }, set: function (obj, value) { obj.proxy_type = value; } }, metadata: _metadata }, _proxy_type_initializers, _proxy_type_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetProxiesQueryDto = GetProxiesQueryDto;
