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
exports.ProxyController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var use_jwt_auth_guard_decorator_1 = require("../auth/decorators/use-jwt-auth-guard.decorator");
var ProxyController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('[User] Proxy'), (0, common_1.Controller)(), (0, use_jwt_auth_guard_decorator_1.UseJwtAuthGuard)(), (0, swagger_1.ApiBearerAuth)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getProxies_decorators;
    var _downloadProxies_decorators;
    var _getCountryFilters_decorators;
    var _getRotatingStatus_decorators;
    var _getProxyActivationStatus_decorators;
    var _putCountryFilters_decorators;
    var _createOrder_decorators;
    var _calculatePrice_decorators;
    var _getOrders_decorators;
    var _getOrderSummary_decorators;
    var _getOrderTransactions_decorators;
    var _renewOrder_decorators;
    var _getMyTransactions_decorators;
    var ProxyController = _classThis = /** @class */ (function () {
        function ProxyController_1(proxyService) {
            this.proxyService = (__runInitializers(this, _instanceExtraInitializers), proxyService);
        }
        ProxyController_1.prototype.getProxies = function (req, query) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                var _a;
                return __generator(this, function (_b) {
                    userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.sub;
                    if (!userId)
                        throw new common_1.UnauthorizedException('User not authenticated');
                    return [2 /*return*/, this.proxyService.getProxiesList(userId, query)];
                });
            });
        };
        ProxyController_1.prototype.downloadProxies = function (req_1) {
            return __awaiter(this, arguments, void 0, function (req, format, country_codes, proxy_type, order_id) {
                var userId, normalizedProxyType, codes, result;
                var _a;
                if (format === void 0) { format = 'json'; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.sub;
                            if (!userId)
                                throw new common_1.UnauthorizedException('User not authenticated');
                            normalizedProxyType = proxy_type === null || proxy_type === void 0 ? void 0 : proxy_type.trim();
                            if (normalizedProxyType &&
                                !['proxy_server', 'static_residential', 'rotating_residential'].includes(normalizedProxyType)) {
                                throw new common_1.BadRequestException('proxy_type không hợp lệ');
                            }
                            codes = country_codes
                                ? country_codes
                                    .split(',')
                                    .map(function (s) { return s.trim(); })
                                    .filter(Boolean)
                                : undefined;
                            return [4 /*yield*/, this.proxyService.getProxiesDownload(userId, format, codes, normalizedProxyType, order_id === null || order_id === void 0 ? void 0 : order_id.trim())];
                        case 1:
                            result = _b.sent();
                            if (format === 'txt' &&
                                typeof result.content === 'string') {
                                return [2 /*return*/, result.content];
                            }
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        ProxyController_1.prototype.getCountryFilters = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                var _a;
                return __generator(this, function (_b) {
                    userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.sub;
                    if (!userId)
                        throw new common_1.UnauthorizedException('User not authenticated');
                    return [2 /*return*/, this.proxyService.getCountryFilters(userId)];
                });
            });
        };
        ProxyController_1.prototype.getRotatingStatus = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                var _a;
                return __generator(this, function (_b) {
                    userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.sub;
                    if (!userId)
                        throw new common_1.UnauthorizedException('User not authenticated');
                    return [2 /*return*/, this.proxyService.getRotatingProxyStatus(userId)];
                });
            });
        };
        ProxyController_1.prototype.getProxyActivationStatus = function (req, productCode, exclusivityValue) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                var _a;
                return __generator(this, function (_b) {
                    userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.sub;
                    if (!userId)
                        throw new common_1.UnauthorizedException('User not authenticated');
                    return [2 /*return*/, this.proxyService.getProxyProductActivationStatus({
                            userId: userId,
                            productCode: productCode,
                            exclusivityValue: exclusivityValue,
                        })];
                });
            });
        };
        ProxyController_1.prototype.putCountryFilters = function (req, body) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                var _a;
                return __generator(this, function (_b) {
                    userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.sub;
                    if (!userId)
                        throw new common_1.UnauthorizedException('User not authenticated');
                    return [2 /*return*/, this.proxyService.putCountryFilters(userId, body.country_codes)];
                });
            });
        };
        ProxyController_1.prototype.createOrder = function (req, body) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                var _a;
                return __generator(this, function (_b) {
                    userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.sub;
                    if (!userId)
                        throw new common_1.UnauthorizedException('User not authenticated');
                    return [2 /*return*/, this.proxyService.createOrder(userId, body)];
                });
            });
        };
        ProxyController_1.prototype.calculatePrice = function (req, body) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                var _a;
                return __generator(this, function (_b) {
                    userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.sub;
                    if (!userId)
                        throw new common_1.UnauthorizedException('User not authenticated');
                    return [2 /*return*/, this.proxyService.calculatePrice(userId, body)];
                });
            });
        };
        ProxyController_1.prototype.getOrders = function (req, query) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                var _a;
                return __generator(this, function (_b) {
                    userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.sub;
                    if (!userId)
                        throw new common_1.UnauthorizedException('User not authenticated');
                    return [2 /*return*/, this.proxyService.getOrdersList(userId, query)];
                });
            });
        };
        ProxyController_1.prototype.getOrderSummary = function (req, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                var _a;
                return __generator(this, function (_b) {
                    userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.sub;
                    if (!userId)
                        throw new common_1.UnauthorizedException('User not authenticated');
                    return [2 /*return*/, this.proxyService.getOrderSummary(userId, orderId)];
                });
            });
        };
        ProxyController_1.prototype.getOrderTransactions = function (req, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                var _a;
                return __generator(this, function (_b) {
                    userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.sub;
                    if (!userId)
                        throw new common_1.UnauthorizedException('User not authenticated');
                    return [2 /*return*/, this.proxyService.getOrderTransactions(orderId, userId)];
                });
            });
        };
        ProxyController_1.prototype.renewOrder = function (req, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                var _a;
                return __generator(this, function (_b) {
                    userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.sub;
                    if (!userId)
                        throw new common_1.UnauthorizedException('User not authenticated');
                    return [2 /*return*/, this.proxyService.renewOrder(userId, orderId)];
                });
            });
        };
        ProxyController_1.prototype.getMyTransactions = function (req, page, limit) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, p, l;
                var _a;
                return __generator(this, function (_b) {
                    userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.sub;
                    if (!userId)
                        throw new common_1.UnauthorizedException('User not authenticated');
                    p = page ? Math.max(1, parseInt(page, 10) || 1) : 1;
                    l = limit
                        ? Math.min(100, Math.max(1, parseInt(limit, 10) || 20))
                        : 20;
                    return [2 /*return*/, this.proxyService.getMyTransactions(userId, p, l)];
                });
            });
        };
        return ProxyController_1;
    }());
    __setFunctionName(_classThis, "ProxyController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getProxies_decorators = [(0, common_1.Get)('proxies'), (0, swagger_1.ApiOperation)({ summary: 'Get list of user proxies with search and filters' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Paginated proxy list' })];
        _downloadProxies_decorators = [(0, common_1.Get)('proxies/download'), (0, swagger_1.ApiOperation)({ summary: 'Download proxy list as txt or json' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'File or JSON' })];
        _getCountryFilters_decorators = [(0, common_1.Get)('proxy/country-filters'), (0, swagger_1.ApiOperation)({ summary: 'Get saved country filter codes for proxy list' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'List of country codes' })];
        _getRotatingStatus_decorators = [(0, common_1.Get)('proxy/rotating-status'), (0, swagger_1.ApiOperation)({ summary: 'Get rotating proxy status from Webshare by plan' }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Rotating plan status with available countries',
            })];
        _getProxyActivationStatus_decorators = [(0, common_1.Get)('proxy/activation'), (0, swagger_1.ApiOperation)({
                summary: 'Get proxy product activation status by user Webshare key, fallback global if user not mapped',
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Activation status for current user proxy product',
            })];
        _putCountryFilters_decorators = [(0, common_1.Put)('proxy/country-filters'), (0, swagger_1.ApiOperation)({ summary: 'Save country filter codes for proxy list' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Updated country codes' })];
        _createOrder_decorators = [(0, common_1.Post)('proxy/orders'), (0, common_1.HttpCode)(common_1.HttpStatus.CREATED), (0, swagger_1.ApiOperation)({ summary: 'Create a proxy order' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'Created order' })];
        _calculatePrice_decorators = [(0, common_1.Post)('proxy/calculate-price'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({
                summary: 'Calculate proxy price using the mapped Webshare account of current user',
            })];
        _getOrders_decorators = [(0, common_1.Get)('proxy/orders'), (0, swagger_1.ApiOperation)({ summary: 'Get list of user proxy orders' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Paginated orders' })];
        _getOrderSummary_decorators = [(0, common_1.Get)('proxy/orders/:orderId/summary'), (0, swagger_1.ApiOperation)({ summary: 'Get summary for a specific proxy order' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Proxy order summary' })];
        _getOrderTransactions_decorators = [(0, common_1.Get)('proxy/orders/:orderId/transactions'), (0, swagger_1.ApiOperation)({ summary: 'Get transactions for a proxy order' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'List of transactions' })];
        _renewOrder_decorators = [(0, common_1.Post)('proxy/orders/:orderId/renew'), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({ summary: 'Renew a proxy order' })];
        _getMyTransactions_decorators = [(0, common_1.Get)('proxy/transactions'), (0, swagger_1.ApiOperation)({ summary: 'Get current user proxy payment/refund history' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Paginated transactions' })];
        __esDecorate(_classThis, null, _getProxies_decorators, { kind: "method", name: "getProxies", static: false, private: false, access: { has: function (obj) { return "getProxies" in obj; }, get: function (obj) { return obj.getProxies; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _downloadProxies_decorators, { kind: "method", name: "downloadProxies", static: false, private: false, access: { has: function (obj) { return "downloadProxies" in obj; }, get: function (obj) { return obj.downloadProxies; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getCountryFilters_decorators, { kind: "method", name: "getCountryFilters", static: false, private: false, access: { has: function (obj) { return "getCountryFilters" in obj; }, get: function (obj) { return obj.getCountryFilters; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getRotatingStatus_decorators, { kind: "method", name: "getRotatingStatus", static: false, private: false, access: { has: function (obj) { return "getRotatingStatus" in obj; }, get: function (obj) { return obj.getRotatingStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getProxyActivationStatus_decorators, { kind: "method", name: "getProxyActivationStatus", static: false, private: false, access: { has: function (obj) { return "getProxyActivationStatus" in obj; }, get: function (obj) { return obj.getProxyActivationStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _putCountryFilters_decorators, { kind: "method", name: "putCountryFilters", static: false, private: false, access: { has: function (obj) { return "putCountryFilters" in obj; }, get: function (obj) { return obj.putCountryFilters; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createOrder_decorators, { kind: "method", name: "createOrder", static: false, private: false, access: { has: function (obj) { return "createOrder" in obj; }, get: function (obj) { return obj.createOrder; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _calculatePrice_decorators, { kind: "method", name: "calculatePrice", static: false, private: false, access: { has: function (obj) { return "calculatePrice" in obj; }, get: function (obj) { return obj.calculatePrice; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getOrders_decorators, { kind: "method", name: "getOrders", static: false, private: false, access: { has: function (obj) { return "getOrders" in obj; }, get: function (obj) { return obj.getOrders; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getOrderSummary_decorators, { kind: "method", name: "getOrderSummary", static: false, private: false, access: { has: function (obj) { return "getOrderSummary" in obj; }, get: function (obj) { return obj.getOrderSummary; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getOrderTransactions_decorators, { kind: "method", name: "getOrderTransactions", static: false, private: false, access: { has: function (obj) { return "getOrderTransactions" in obj; }, get: function (obj) { return obj.getOrderTransactions; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _renewOrder_decorators, { kind: "method", name: "renewOrder", static: false, private: false, access: { has: function (obj) { return "renewOrder" in obj; }, get: function (obj) { return obj.renewOrder; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMyTransactions_decorators, { kind: "method", name: "getMyTransactions", static: false, private: false, access: { has: function (obj) { return "getMyTransactions" in obj; }, get: function (obj) { return obj.getMyTransactions; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProxyController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProxyController = _classThis;
}();
exports.ProxyController = ProxyController;
