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
exports.CheckLiveProxiesDto = exports.CustomProxyInputDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var CustomProxyInputDto = function () {
    var _a;
    var _client_id_decorators;
    var _client_id_initializers = [];
    var _client_id_extraInitializers = [];
    var _address_decorators;
    var _address_initializers = [];
    var _address_extraInitializers = [];
    var _port_decorators;
    var _port_initializers = [];
    var _port_extraInitializers = [];
    var _username_decorators;
    var _username_initializers = [];
    var _username_extraInitializers = [];
    var _password_decorators;
    var _password_initializers = [];
    var _password_extraInitializers = [];
    var _proxy_protocol_decorators;
    var _proxy_protocol_initializers = [];
    var _proxy_protocol_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CustomProxyInputDto() {
                this.client_id = __runInitializers(this, _client_id_initializers, void 0);
                this.address = (__runInitializers(this, _client_id_extraInitializers), __runInitializers(this, _address_initializers, void 0));
                this.port = (__runInitializers(this, _address_extraInitializers), __runInitializers(this, _port_initializers, void 0));
                this.username = (__runInitializers(this, _port_extraInitializers), __runInitializers(this, _username_initializers, void 0));
                this.password = (__runInitializers(this, _username_extraInitializers), __runInitializers(this, _password_initializers, void 0));
                this.proxy_protocol = (__runInitializers(this, _password_extraInitializers), __runInitializers(this, _proxy_protocol_initializers, void 0));
                __runInitializers(this, _proxy_protocol_extraInitializers);
            }
            return CustomProxyInputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _client_id_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Client ID để map kết quả theo từng dòng nhập',
                    example: 'line-1',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _address_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Địa chỉ host/IP của proxy',
                    example: '1.2.3.4',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _port_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Port của proxy',
                    example: 8080,
                }), (0, class_transformer_1.Type)(function () { return Number; }), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(65535)];
            _username_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Username proxy (nếu có)',
                    example: 'user123',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _password_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Password proxy (nếu có)',
                    example: 'pass123',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _proxy_protocol_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Giao thức proxy',
                    enum: ['auto', 'http', 'socks5'],
                    example: 'auto',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsIn)(['auto', 'http', 'socks5'])];
            __esDecorate(null, null, _client_id_decorators, { kind: "field", name: "client_id", static: false, private: false, access: { has: function (obj) { return "client_id" in obj; }, get: function (obj) { return obj.client_id; }, set: function (obj, value) { obj.client_id = value; } }, metadata: _metadata }, _client_id_initializers, _client_id_extraInitializers);
            __esDecorate(null, null, _address_decorators, { kind: "field", name: "address", static: false, private: false, access: { has: function (obj) { return "address" in obj; }, get: function (obj) { return obj.address; }, set: function (obj, value) { obj.address = value; } }, metadata: _metadata }, _address_initializers, _address_extraInitializers);
            __esDecorate(null, null, _port_decorators, { kind: "field", name: "port", static: false, private: false, access: { has: function (obj) { return "port" in obj; }, get: function (obj) { return obj.port; }, set: function (obj, value) { obj.port = value; } }, metadata: _metadata }, _port_initializers, _port_extraInitializers);
            __esDecorate(null, null, _username_decorators, { kind: "field", name: "username", static: false, private: false, access: { has: function (obj) { return "username" in obj; }, get: function (obj) { return obj.username; }, set: function (obj, value) { obj.username = value; } }, metadata: _metadata }, _username_initializers, _username_extraInitializers);
            __esDecorate(null, null, _password_decorators, { kind: "field", name: "password", static: false, private: false, access: { has: function (obj) { return "password" in obj; }, get: function (obj) { return obj.password; }, set: function (obj, value) { obj.password = value; } }, metadata: _metadata }, _password_initializers, _password_extraInitializers);
            __esDecorate(null, null, _proxy_protocol_decorators, { kind: "field", name: "proxy_protocol", static: false, private: false, access: { has: function (obj) { return "proxy_protocol" in obj; }, get: function (obj) { return obj.proxy_protocol; }, set: function (obj, value) { obj.proxy_protocol = value; } }, metadata: _metadata }, _proxy_protocol_initializers, _proxy_protocol_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CustomProxyInputDto = CustomProxyInputDto;
var CheckLiveProxiesDto = function () {
    var _a;
    var _proxy_ids_decorators;
    var _proxy_ids_initializers = [];
    var _proxy_ids_extraInitializers = [];
    var _custom_proxies_decorators;
    var _custom_proxies_initializers = [];
    var _custom_proxies_extraInitializers = [];
    var _proxy_type_decorators;
    var _proxy_type_initializers = [];
    var _proxy_type_extraInitializers = [];
    var _limit_decorators;
    var _limit_initializers = [];
    var _limit_extraInitializers = [];
    var _test_url_decorators;
    var _test_url_initializers = [];
    var _test_url_extraInitializers = [];
    var _timeout_ms_decorators;
    var _timeout_ms_initializers = [];
    var _timeout_ms_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CheckLiveProxiesDto() {
                this.proxy_ids = __runInitializers(this, _proxy_ids_initializers, void 0);
                this.custom_proxies = (__runInitializers(this, _proxy_ids_extraInitializers), __runInitializers(this, _custom_proxies_initializers, void 0));
                this.proxy_type = (__runInitializers(this, _custom_proxies_extraInitializers), __runInitializers(this, _proxy_type_initializers, void 0));
                this.limit = (__runInitializers(this, _proxy_type_extraInitializers), __runInitializers(this, _limit_initializers, void 0));
                this.test_url = (__runInitializers(this, _limit_extraInitializers), __runInitializers(this, _test_url_initializers, void 0));
                this.timeout_ms = (__runInitializers(this, _test_url_extraInitializers), __runInitializers(this, _timeout_ms_initializers, void 0));
                __runInitializers(this, _timeout_ms_extraInitializers);
            }
            return CheckLiveProxiesDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _proxy_ids_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Danh sách ID proxy cần kiểm tra',
                    type: [Number],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.IsInt)({ each: true })];
            _custom_proxies_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Danh sách proxy nhập tay để kiểm tra live',
                    type: [CustomProxyInputDto],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsArray)(), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_transformer_1.Type)(function () { return CustomProxyInputDto; })];
            _proxy_type_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Loại proxy cần kiểm tra',
                    enum: ['proxy_server', 'static_residential', 'rotating_residential'],
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsIn)(['proxy_server', 'static_residential', 'rotating_residential'])];
            _limit_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Giới hạn số proxy cần kiểm tra',
                    example: 20,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(1), (0, class_validator_1.Max)(50)];
            _test_url_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'URL kiểm tra',
                    example: 'https://api.ipify.org?format=json',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUrl)({ require_tld: true })];
            _timeout_ms_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Timeout request (ms)',
                    example: 8000,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsInt)(), (0, class_validator_1.Min)(2000), (0, class_validator_1.Max)(15000)];
            __esDecorate(null, null, _proxy_ids_decorators, { kind: "field", name: "proxy_ids", static: false, private: false, access: { has: function (obj) { return "proxy_ids" in obj; }, get: function (obj) { return obj.proxy_ids; }, set: function (obj, value) { obj.proxy_ids = value; } }, metadata: _metadata }, _proxy_ids_initializers, _proxy_ids_extraInitializers);
            __esDecorate(null, null, _custom_proxies_decorators, { kind: "field", name: "custom_proxies", static: false, private: false, access: { has: function (obj) { return "custom_proxies" in obj; }, get: function (obj) { return obj.custom_proxies; }, set: function (obj, value) { obj.custom_proxies = value; } }, metadata: _metadata }, _custom_proxies_initializers, _custom_proxies_extraInitializers);
            __esDecorate(null, null, _proxy_type_decorators, { kind: "field", name: "proxy_type", static: false, private: false, access: { has: function (obj) { return "proxy_type" in obj; }, get: function (obj) { return obj.proxy_type; }, set: function (obj, value) { obj.proxy_type = value; } }, metadata: _metadata }, _proxy_type_initializers, _proxy_type_extraInitializers);
            __esDecorate(null, null, _limit_decorators, { kind: "field", name: "limit", static: false, private: false, access: { has: function (obj) { return "limit" in obj; }, get: function (obj) { return obj.limit; }, set: function (obj, value) { obj.limit = value; } }, metadata: _metadata }, _limit_initializers, _limit_extraInitializers);
            __esDecorate(null, null, _test_url_decorators, { kind: "field", name: "test_url", static: false, private: false, access: { has: function (obj) { return "test_url" in obj; }, get: function (obj) { return obj.test_url; }, set: function (obj, value) { obj.test_url = value; } }, metadata: _metadata }, _test_url_initializers, _test_url_extraInitializers);
            __esDecorate(null, null, _timeout_ms_decorators, { kind: "field", name: "timeout_ms", static: false, private: false, access: { has: function (obj) { return "timeout_ms" in obj; }, get: function (obj) { return obj.timeout_ms; }, set: function (obj, value) { obj.timeout_ms = value; } }, metadata: _metadata }, _timeout_ms_initializers, _timeout_ms_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CheckLiveProxiesDto = CheckLiveProxiesDto;
