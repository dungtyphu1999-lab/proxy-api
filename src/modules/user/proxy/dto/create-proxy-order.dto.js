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
exports.CreateProxyOrderDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var class_transformer_1 = require("class-transformer");
var CreateProxyOrderDto = function () {
    var _a;
    var _idempotency_key_decorators;
    var _idempotency_key_initializers = [];
    var _idempotency_key_extraInitializers = [];
    var _product_id_decorators;
    var _product_id_initializers = [];
    var _product_id_extraInitializers = [];
    var _exclusivity_option_id_decorators;
    var _exclusivity_option_id_initializers = [];
    var _exclusivity_option_id_extraInitializers = [];
    var _exclusivity_value_decorators;
    var _exclusivity_value_initializers = [];
    var _exclusivity_value_extraInitializers = [];
    var _quantity_option_id_decorators;
    var _quantity_option_id_initializers = [];
    var _quantity_option_id_extraInitializers = [];
    var _quantity_value_decorators;
    var _quantity_value_initializers = [];
    var _quantity_value_extraInitializers = [];
    var _proxy_countries_decorators;
    var _proxy_countries_initializers = [];
    var _proxy_countries_extraInitializers = [];
    var _bandwidth_option_id_decorators;
    var _bandwidth_option_id_initializers = [];
    var _bandwidth_option_id_extraInitializers = [];
    var _bandwidth_value_decorators;
    var _bandwidth_value_initializers = [];
    var _bandwidth_value_extraInitializers = [];
    var _location_id_decorators;
    var _location_id_initializers = [];
    var _location_id_extraInitializers = [];
    var _additional_feature_id_decorators;
    var _additional_feature_id_initializers = [];
    var _additional_feature_id_extraInitializers = [];
    var _discount_percent_decorators;
    var _discount_percent_initializers = [];
    var _discount_percent_extraInitializers = [];
    var _amount_total_decorators;
    var _amount_total_initializers = [];
    var _amount_total_extraInitializers = [];
    var _billing_cycle_decorators;
    var _billing_cycle_initializers = [];
    var _billing_cycle_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateProxyOrderDto() {
                this.idempotency_key = __runInitializers(this, _idempotency_key_initializers, void 0);
                this.product_id = (__runInitializers(this, _idempotency_key_extraInitializers), __runInitializers(this, _product_id_initializers, void 0));
                this.exclusivity_option_id = (__runInitializers(this, _product_id_extraInitializers), __runInitializers(this, _exclusivity_option_id_initializers, void 0));
                this.exclusivity_value = (__runInitializers(this, _exclusivity_option_id_extraInitializers), __runInitializers(this, _exclusivity_value_initializers, void 0));
                this.quantity_option_id = (__runInitializers(this, _exclusivity_value_extraInitializers), __runInitializers(this, _quantity_option_id_initializers, void 0));
                this.quantity_value = (__runInitializers(this, _quantity_option_id_extraInitializers), __runInitializers(this, _quantity_value_initializers, void 0));
                this.proxy_countries = (__runInitializers(this, _quantity_value_extraInitializers), __runInitializers(this, _proxy_countries_initializers, void 0));
                this.bandwidth_option_id = (__runInitializers(this, _proxy_countries_extraInitializers), __runInitializers(this, _bandwidth_option_id_initializers, void 0));
                this.bandwidth_value = (__runInitializers(this, _bandwidth_option_id_extraInitializers), __runInitializers(this, _bandwidth_value_initializers, void 0));
                this.location_id = (__runInitializers(this, _bandwidth_value_extraInitializers), __runInitializers(this, _location_id_initializers, void 0));
                this.additional_feature_id = (__runInitializers(this, _location_id_extraInitializers), __runInitializers(this, _additional_feature_id_initializers, void 0));
                this.discount_percent = (__runInitializers(this, _additional_feature_id_extraInitializers), __runInitializers(this, _discount_percent_initializers, void 0));
                this.amount_total = (__runInitializers(this, _discount_percent_extraInitializers), __runInitializers(this, _amount_total_initializers, void 0));
                this.billing_cycle = (__runInitializers(this, _amount_total_extraInitializers), __runInitializers(this, _billing_cycle_initializers, void 0));
                __runInitializers(this, _billing_cycle_extraInitializers);
            }
            return CreateProxyOrderDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _idempotency_key_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Idempotency key để chống trừ tiền lặp khi request bị retry/replay',
                    example: 'a15d3c4f-9ce6-4a91-a5c5-1fd5f5036f8f',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.MinLength)(16), (0, class_validator_1.MaxLength)(128)];
            _product_id_decorators = [(0, swagger_1.ApiProperty)({ description: 'Proxy product ID', example: 1 }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_transformer_1.Type)(function () { return Number; })];
            _exclusivity_option_id_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Exclusivity option ID (static residential only)',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_transformer_1.Type)(function () { return Number; })];
            _exclusivity_value_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Proxy exclusivity raw value for realtime config (shared/private/dedicated)',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _quantity_option_id_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Quantity (IP count) option ID' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_transformer_1.Type)(function () { return Number; })];
            _quantity_value_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Custom quantity (IP count)' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_transformer_1.Type)(function () { return Number; })];
            _proxy_countries_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Phân bổ số lượng IP theo quốc gia, dạng map mã quốc gia -> số lượng. Ví dụ: {"US": 50, "GB": 50}',
                }), (0, class_validator_1.IsOptional)(), (0, class_transformer_1.Transform)(function (_b) {
                    var value = _b.value;
                    if (value === null || value === undefined)
                        return value;
                    if (typeof value === 'string') {
                        try {
                            return JSON.parse(value);
                        }
                        catch (_c) {
                            return value;
                        }
                    }
                    return value;
                }), (0, class_validator_1.IsObject)()];
            _bandwidth_option_id_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Bandwidth option ID' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_transformer_1.Type)(function () { return Number; })];
            _bandwidth_value_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Custom bandwidth in GB (0 = unlimited)',
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0), (0, class_transformer_1.Type)(function () { return Number; })];
            _location_id_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Location ID' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_transformer_1.Type)(function () { return Number; })];
            _additional_feature_id_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Additional feature ID' }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(1), (0, class_transformer_1.Type)(function () { return Number; })];
            _discount_percent_decorators = [(0, swagger_1.ApiPropertyOptional)({ description: 'Discount percent (0-100)', default: 0 }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(100), (0, class_transformer_1.Type)(function () { return Number; })];
            _amount_total_decorators = [(0, swagger_1.ApiProperty)({ description: 'Total amount', example: 270 }), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0), (0, class_transformer_1.Type)(function () { return Number; })];
            _billing_cycle_decorators = [(0, swagger_1.ApiProperty)({ description: 'Billing cycle', enum: ['monthly', 'yearly'] }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsIn)(['monthly', 'yearly'])];
            __esDecorate(null, null, _idempotency_key_decorators, { kind: "field", name: "idempotency_key", static: false, private: false, access: { has: function (obj) { return "idempotency_key" in obj; }, get: function (obj) { return obj.idempotency_key; }, set: function (obj, value) { obj.idempotency_key = value; } }, metadata: _metadata }, _idempotency_key_initializers, _idempotency_key_extraInitializers);
            __esDecorate(null, null, _product_id_decorators, { kind: "field", name: "product_id", static: false, private: false, access: { has: function (obj) { return "product_id" in obj; }, get: function (obj) { return obj.product_id; }, set: function (obj, value) { obj.product_id = value; } }, metadata: _metadata }, _product_id_initializers, _product_id_extraInitializers);
            __esDecorate(null, null, _exclusivity_option_id_decorators, { kind: "field", name: "exclusivity_option_id", static: false, private: false, access: { has: function (obj) { return "exclusivity_option_id" in obj; }, get: function (obj) { return obj.exclusivity_option_id; }, set: function (obj, value) { obj.exclusivity_option_id = value; } }, metadata: _metadata }, _exclusivity_option_id_initializers, _exclusivity_option_id_extraInitializers);
            __esDecorate(null, null, _exclusivity_value_decorators, { kind: "field", name: "exclusivity_value", static: false, private: false, access: { has: function (obj) { return "exclusivity_value" in obj; }, get: function (obj) { return obj.exclusivity_value; }, set: function (obj, value) { obj.exclusivity_value = value; } }, metadata: _metadata }, _exclusivity_value_initializers, _exclusivity_value_extraInitializers);
            __esDecorate(null, null, _quantity_option_id_decorators, { kind: "field", name: "quantity_option_id", static: false, private: false, access: { has: function (obj) { return "quantity_option_id" in obj; }, get: function (obj) { return obj.quantity_option_id; }, set: function (obj, value) { obj.quantity_option_id = value; } }, metadata: _metadata }, _quantity_option_id_initializers, _quantity_option_id_extraInitializers);
            __esDecorate(null, null, _quantity_value_decorators, { kind: "field", name: "quantity_value", static: false, private: false, access: { has: function (obj) { return "quantity_value" in obj; }, get: function (obj) { return obj.quantity_value; }, set: function (obj, value) { obj.quantity_value = value; } }, metadata: _metadata }, _quantity_value_initializers, _quantity_value_extraInitializers);
            __esDecorate(null, null, _proxy_countries_decorators, { kind: "field", name: "proxy_countries", static: false, private: false, access: { has: function (obj) { return "proxy_countries" in obj; }, get: function (obj) { return obj.proxy_countries; }, set: function (obj, value) { obj.proxy_countries = value; } }, metadata: _metadata }, _proxy_countries_initializers, _proxy_countries_extraInitializers);
            __esDecorate(null, null, _bandwidth_option_id_decorators, { kind: "field", name: "bandwidth_option_id", static: false, private: false, access: { has: function (obj) { return "bandwidth_option_id" in obj; }, get: function (obj) { return obj.bandwidth_option_id; }, set: function (obj, value) { obj.bandwidth_option_id = value; } }, metadata: _metadata }, _bandwidth_option_id_initializers, _bandwidth_option_id_extraInitializers);
            __esDecorate(null, null, _bandwidth_value_decorators, { kind: "field", name: "bandwidth_value", static: false, private: false, access: { has: function (obj) { return "bandwidth_value" in obj; }, get: function (obj) { return obj.bandwidth_value; }, set: function (obj, value) { obj.bandwidth_value = value; } }, metadata: _metadata }, _bandwidth_value_initializers, _bandwidth_value_extraInitializers);
            __esDecorate(null, null, _location_id_decorators, { kind: "field", name: "location_id", static: false, private: false, access: { has: function (obj) { return "location_id" in obj; }, get: function (obj) { return obj.location_id; }, set: function (obj, value) { obj.location_id = value; } }, metadata: _metadata }, _location_id_initializers, _location_id_extraInitializers);
            __esDecorate(null, null, _additional_feature_id_decorators, { kind: "field", name: "additional_feature_id", static: false, private: false, access: { has: function (obj) { return "additional_feature_id" in obj; }, get: function (obj) { return obj.additional_feature_id; }, set: function (obj, value) { obj.additional_feature_id = value; } }, metadata: _metadata }, _additional_feature_id_initializers, _additional_feature_id_extraInitializers);
            __esDecorate(null, null, _discount_percent_decorators, { kind: "field", name: "discount_percent", static: false, private: false, access: { has: function (obj) { return "discount_percent" in obj; }, get: function (obj) { return obj.discount_percent; }, set: function (obj, value) { obj.discount_percent = value; } }, metadata: _metadata }, _discount_percent_initializers, _discount_percent_extraInitializers);
            __esDecorate(null, null, _amount_total_decorators, { kind: "field", name: "amount_total", static: false, private: false, access: { has: function (obj) { return "amount_total" in obj; }, get: function (obj) { return obj.amount_total; }, set: function (obj, value) { obj.amount_total = value; } }, metadata: _metadata }, _amount_total_initializers, _amount_total_extraInitializers);
            __esDecorate(null, null, _billing_cycle_decorators, { kind: "field", name: "billing_cycle", static: false, private: false, access: { has: function (obj) { return "billing_cycle" in obj; }, get: function (obj) { return obj.billing_cycle; }, set: function (obj, value) { obj.billing_cycle = value; } }, metadata: _metadata }, _billing_cycle_initializers, _billing_cycle_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateProxyOrderDto = CreateProxyOrderDto;
