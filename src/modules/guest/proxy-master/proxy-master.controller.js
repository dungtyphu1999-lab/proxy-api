"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyMasterController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var ProxyMasterController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('[Public] Proxy Master Data'), (0, common_1.Controller)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getCountries_decorators;
    var _getProxyProducts_decorators;
    var _getProxyProductOptions_decorators;
    var _getProxyLocations_decorators;
    var _getProxyCountryOptions_decorators;
    var _getProxyAdditionalFeatures_decorators;
    var _getProxyProductActivation_decorators;
    var _getPaymentMethods_decorators;
    var _calculatePrice_decorators;
    var ProxyMasterController = _classThis = /** @class */ (function () {
        function ProxyMasterController_1(proxyMasterService) {
            this.proxyMasterService = (__runInitializers(this, _instanceExtraInitializers), proxyMasterService);
        }
        ProxyMasterController_1.prototype.getCountries = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.proxyMasterService.getCountries()];
                });
            });
        };
        ProxyMasterController_1.prototype.getProxyProducts = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.proxyMasterService.getProxyProducts()];
                });
            });
        };
        ProxyMasterController_1.prototype.getProxyProductOptions = function (productId) {
            return __awaiter(this, void 0, void 0, function () {
                var id;
                return __generator(this, function (_a) {
                    id = productId != null && productId !== ''
                        ? parseInt(productId, 10)
                        : undefined;
                    if (id != null && (isNaN(id) || id < 1)) {
                        return [2 /*return*/, this.proxyMasterService.getProxyProductOptions(undefined)];
                    }
                    return [2 /*return*/, this.proxyMasterService.getProxyProductOptions(id)];
                });
            });
        };
        ProxyMasterController_1.prototype.getProxyLocations = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.proxyMasterService.getProxyLocations()];
                });
            });
        };
        ProxyMasterController_1.prototype.getProxyCountryOptions = function (productId, exclusivityValue) {
            return __awaiter(this, void 0, void 0, function () {
                var id;
                return __generator(this, function (_a) {
                    id = productId != null && productId !== ''
                        ? parseInt(productId, 10)
                        : undefined;
                    if (id == null || Number.isNaN(id) || id < 1) {
                        return [2 /*return*/, []];
                    }
                    return [2 /*return*/, this.proxyMasterService.getProxyCountryOptions(id, exclusivityValue)];
                });
            });
        };
        ProxyMasterController_1.prototype.getProxyAdditionalFeatures = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.proxyMasterService.getProxyAdditionalFeatures()];
                });
            });
        };
        ProxyMasterController_1.prototype.getProxyProductActivation = function (productCode, exclusivityValue) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.proxyMasterService.getProxyProductActivationStatus({
                            productCode: productCode !== null && productCode !== void 0 ? productCode : 'proxy_server',
                            exclusivityValue: exclusivityValue,
                        })];
                });
            });
        };
        ProxyMasterController_1.prototype.getPaymentMethods = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.proxyMasterService.getPaymentMethods()];
                });
            });
        };
        ProxyMasterController_1.prototype.calculatePrice = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.proxyMasterService.calculatePrice(dto)];
                });
            });
        };
        return ProxyMasterController_1;
    }());
    __setFunctionName(_classThis, "ProxyMasterController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getCountries_decorators = [(0, common_1.Get)('countries'), (0, swagger_1.ApiOperation)({
                summary: 'Get all countries (for proxy filters and locations)',
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'List of countries' })];
        _getProxyProducts_decorators = [(0, common_1.Get)('proxy-products'), (0, swagger_1.ApiOperation)({ summary: 'Get all proxy product types (static/rotating)' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'List of proxy products' })];
        _getProxyProductOptions_decorators = [(0, common_1.Get)('proxy-product-options'), (0, swagger_1.ApiOperation)({
                summary: 'Get proxy product options (exclusivity, quantity, bandwidth). Optional productId filter.',
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'List of options' })];
        _getProxyLocations_decorators = [(0, common_1.Get)('proxy-locations'), (0, swagger_1.ApiOperation)({ summary: 'Get proxy locations (countries / random)' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'List of locations' })];
        _getProxyCountryOptions_decorators = [(0, common_1.Get)('proxy-country-options'), (0, swagger_1.ApiOperation)({
                summary: 'Get available countries from Webshare customize API by product + exclusivity',
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'List available countries for selected proxy product',
            })];
        _getProxyAdditionalFeatures_decorators = [(0, common_1.Get)('proxy-additional-features'), (0, swagger_1.ApiOperation)({ summary: 'Get additional features (high concurrency, etc.)' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'List of features' })];
        _getProxyProductActivation_decorators = [(0, common_1.Get)('proxy-product-activation'), (0, swagger_1.ApiOperation)({
                summary: 'Get product activation status using global Webshare credential',
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Activation status for proxy product',
            })];
        _getPaymentMethods_decorators = [(0, common_1.Get)('payment-methods'), (0, swagger_1.ApiOperation)({ summary: 'Get payment methods for proxy purchase' }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'List of payment methods',
            })];
        _calculatePrice_decorators = [(0, common_1.Post)('calculate-price'), (0, swagger_1.ApiOperation)({
                summary: 'Calculate proxy price based on selected options',
                description: "\n      T\u00EDnh gi\u00E1 proxy d\u1EF1a tr\u00EAn c\u00E1c options \u0111\u01B0\u1EE3c ch\u1ECDn.\n      \n      **Input:**\n      - product_id (required): ID c\u1EE7a s\u1EA3n ph\u1EA9m proxy\n      - exclusivity_option_id (optional): ID c\u1EE7a option exclusivity (shared/private/dedicated)\n      - quantity_option_id (optional): ID c\u1EE7a option s\u1ED1 l\u01B0\u1EE3ng IP\n      - bandwidth_option_id (optional): ID c\u1EE7a option bandwidth\n      - location_id (optional): ID c\u1EE7a location (hi\u1EC7n t\u1EA1i ch\u01B0a \u1EA3nh h\u01B0\u1EDFng gi\u00E1)\n      - additional_feature_id (optional): ID c\u1EE7a t\u00EDnh n\u0103ng b\u1ED5 sung\n      - billing_cycle (required): 'monthly' ho\u1EB7c 'yearly'\n      - discount_percent (optional): Ph\u1EA7n tr\u0103m gi\u1EA3m gi\u00E1 (0-100)\n      \n      **Output:**\n      - base_price: Gi\u00E1 c\u01A1 b\u1EA3n realtime (USD)\n      - base_price_type: Lo\u1EA1i gi\u00E1 ('fixed' | 'per_unit' | 'per_month')\n      - additional_feature_price: Gi\u00E1 t\u00EDnh n\u0103ng b\u1ED5 sung (USD)\n      - subtotal: T\u1ED5ng gi\u00E1 tr\u01B0\u1EDBc billing cycle\n      - billing_cycle: Chu k\u1EF3 thanh to\u00E1n\n      - billing_cycle_multiplier: H\u1EC7 s\u1ED1 nh\u00E2n (yearly = 12)\n      - subtotal_with_billing: T\u1ED5ng gi\u00E1 sau khi nh\u00E2n billing cycle\n      - discount_percent: Ph\u1EA7n tr\u0103m gi\u1EA3m gi\u00E1\n      - discount_amount: S\u1ED1 ti\u1EC1n gi\u1EA3m (USD)\n      - total: T\u1ED5ng gi\u00E1 cu\u1ED1i c\u00F9ng (USD)\n      - currency: 'USD'\n      - breakdown: Chi ti\u1EBFt t\u1EEBng ph\u1EA7n\n    ",
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Calculated price with breakdown',
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.NOT_FOUND,
                description: 'Product not found',
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.BAD_REQUEST,
                description: 'Invalid input parameters',
            })];
        __esDecorate(_classThis, null, _getCountries_decorators, { kind: "method", name: "getCountries", static: false, private: false, access: { has: function (obj) { return "getCountries" in obj; }, get: function (obj) { return obj.getCountries; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProxyProducts_decorators, { kind: "method", name: "getProxyProducts", static: false, private: false, access: { has: function (obj) { return "getProxyProducts" in obj; }, get: function (obj) { return obj.getProxyProducts; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProxyProductOptions_decorators, { kind: "method", name: "getProxyProductOptions", static: false, private: false, access: { has: function (obj) { return "getProxyProductOptions" in obj; }, get: function (obj) { return obj.getProxyProductOptions; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProxyLocations_decorators, { kind: "method", name: "getProxyLocations", static: false, private: false, access: { has: function (obj) { return "getProxyLocations" in obj; }, get: function (obj) { return obj.getProxyLocations; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProxyCountryOptions_decorators, { kind: "method", name: "getProxyCountryOptions", static: false, private: false, access: { has: function (obj) { return "getProxyCountryOptions" in obj; }, get: function (obj) { return obj.getProxyCountryOptions; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProxyAdditionalFeatures_decorators, { kind: "method", name: "getProxyAdditionalFeatures", static: false, private: false, access: { has: function (obj) { return "getProxyAdditionalFeatures" in obj; }, get: function (obj) { return obj.getProxyAdditionalFeatures; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProxyProductActivation_decorators, { kind: "method", name: "getProxyProductActivation", static: false, private: false, access: { has: function (obj) { return "getProxyProductActivation" in obj; }, get: function (obj) { return obj.getProxyProductActivation; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getPaymentMethods_decorators, { kind: "method", name: "getPaymentMethods", static: false, private: false, access: { has: function (obj) { return "getPaymentMethods" in obj; }, get: function (obj) { return obj.getPaymentMethods; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _calculatePrice_decorators, { kind: "method", name: "calculatePrice", static: false, private: false, access: { has: function (obj) { return "calculatePrice" in obj; }, get: function (obj) { return obj.calculatePrice; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProxyMasterController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProxyMasterController = _classThis;
}();
exports.ProxyMasterController = ProxyMasterController;
