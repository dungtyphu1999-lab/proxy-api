"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProxyMasterService = void 0;
var common_1 = require("@nestjs/common");
var axios_1 = require("axios");
var ProxyMasterService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProxyMasterService = _classThis = /** @class */ (function () {
        function ProxyMasterService_1(repo, webshareConfigService) {
            var _a, _b, _c, _d, _e;
            this.repo = repo;
            this.webshareConfigService = webshareConfigService;
            this.websharePricingUrl = 'https://proxy.webshare.io/api/v2/subscription/pricing/';
            this.webshareCustomizeUrl = 'https://proxy.webshare.io/api/v2/subscription/customize/';
            this.websharePurchaseUrl = 'https://proxy.webshare.io/api/v2/subscription/checkout/purchase/';
            this.webshareSubscriptionUrl = 'https://proxy.webshare.io/api/v2/subscription/';
            this.webshareSubscriptionPlanUrl = 'https://proxy.webshare.io/api/v2/subscription/plan/';
            this.webshareSubscriptionRenewalUrl = 'https://proxy.webshare.io/api/v2/subscription/renewal/';
            this.webshareStatsUrl = 'https://proxy.webshare.io/api/v2/stats/';
            this.webshareSubuserUrl = 'https://proxy.webshare.io/api/v2/subuser/';
            this.webshareProxyListUrl = 'https://proxy.webshare.io/api/v2/proxy/list/';
            this.webshareProxyListStatusUrl = process.env.WEBSHARE_PROXY_LIST_STATUS_URL ||
                'https://proxy.webshare.io/api/v3/proxy/list/status';
            this.websharePaymentMethodUrl = 'https://proxy.webshare.io/api/v2/payment/method/';
            this.websharePaymentTransactionUrl = 'https://proxy.webshare.io/api/v2/payment/transaction/';
            this.websharePaymentMethod = '';
            this.webshareAutoPurchase = this.parseBooleanEnv(process.env.WEBSHARE_AUTO_PURCHASE, true);
            this.webshareSubuserMaxThreads = 500;
            this.webshareRecaptcha2CaptchaApiKey = String((_c = (_b = (_a = process.env.WEBSHARE_2CAPTCHA_API_KEY) !== null && _a !== void 0 ? _a : process.env.TWO_CAPTCHA_API_KEY) !== null && _b !== void 0 ? _b : process.env.CAPTCHA_API_KEY) !== null && _c !== void 0 ? _c : '').trim();
            this.webshareRecaptchaSiteKey = String((_d = process.env.WEBSHARE_RECAPTCHA_SITE_KEY) !== null && _d !== void 0 ? _d : '6LeHZ6UUAAAAAKat_YS--O2tj_by3gv3r_l03j9d').trim();
            this.webshareRecaptchaPageUrl = String((_e = process.env.WEBSHARE_RECAPTCHA_PAGE_URL) !== null && _e !== void 0 ? _e : 'https://proxy.webshare.io/register/').trim();
            this.applyProxyMarkup = this.parseBooleanEnv(process.env.PROXY_PRICE_APPLY_MARKUP, true);
        }
        ProxyMasterService_1.prototype.parseBooleanEnv = function (value, fallback) {
            if (value == null)
                return fallback;
            var normalized = value.trim().toLowerCase();
            if (['1', 'true', 'yes', 'on'].includes(normalized))
                return true;
            if (['0', 'false', 'no', 'off'].includes(normalized))
                return false;
            return fallback;
        };
        ProxyMasterService_1.prototype.toNumber = function (value) {
            var n = Number(value);
            return Number.isFinite(n) ? n : 0;
        };
        ProxyMasterService_1.prototype.toFixed2 = function (value) {
            return Number((Number.isFinite(value) ? value : 0).toFixed(2));
        };
        ProxyMasterService_1.prototype.parseOptionNumber = function (value) {
            if (!value)
                return null;
            var raw = String(value).trim();
            var m = raw.match(/(\d[\d.,]*)/);
            if (!m)
                return null;
            var num = m[1];
            if (/^\d{1,3}(\.\d{3})+$/.test(num))
                num = num.replace(/\./g, '');
            if (/^\d{1,3}(,\d{3})+$/.test(num))
                num = num.replace(/,/g, '');
            num = num.replace(/,/g, '');
            var n = Number(num);
            return Number.isFinite(n) && n > 0 ? n : null;
        };
        ProxyMasterService_1.prototype.normalizeProxyCountriesInput = function (value) {
            if (!value || typeof value !== 'object' || Array.isArray(value)) {
                return null;
            }
            var normalized = {};
            for (var _i = 0, _a = Object.entries(value); _i < _a.length; _i++) {
                var _b = _a[_i], rawCode = _b[0], rawQty = _b[1];
                var code = String(rawCode !== null && rawCode !== void 0 ? rawCode : '')
                    .trim()
                    .toUpperCase();
                if (!/^[A-Z]{2}$/.test(code))
                    continue;
                var qty = Math.trunc(Number(rawQty));
                if (!Number.isFinite(qty) || qty < 1)
                    continue;
                normalized[code] = qty;
            }
            return Object.keys(normalized).length > 0 ? normalized : null;
        };
        ProxyMasterService_1.prototype.sumProxyCountries = function (countries) {
            return Object.values(countries).reduce(function (sum, qty) { return sum + Number(qty || 0); }, 0);
        };
        ProxyMasterService_1.prototype.mapProxyServerExclusivity = function (value) {
            var v = (value !== null && value !== void 0 ? value : '').trim().toLowerCase();
            if (v === 'shared') {
                return { proxy_type: 'shared', proxy_subtype: 'default' };
            }
            if (v === 'private' || v === 'semidedicated') {
                return { proxy_type: 'semidedicated', proxy_subtype: 'premium' };
            }
            if (v === 'dedicated') {
                return { proxy_type: 'dedicated', proxy_subtype: 'premium' };
            }
            return null;
        };
        ProxyMasterService_1.prototype.mapStaticResidentialExclusivity = function (value) {
            var v = (value !== null && value !== void 0 ? value : '').trim().toLowerCase();
            if (v === 'shared') {
                return { proxy_type: 'shared', proxy_subtype: 'isp' };
            }
            if (v === 'private' || v === 'semidedicated') {
                return { proxy_type: 'semidedicated', proxy_subtype: 'isp' };
            }
            if (v === 'dedicated') {
                return { proxy_type: 'dedicated', proxy_subtype: 'isp' };
            }
            return null;
        };
        ProxyMasterService_1.prototype.derivePoolKeyFromQuery = function (query) {
            return this.webshareConfigService.derivePoolKeyFromQuery(query);
        };
        ProxyMasterService_1.prototype.normalizeProductCode = function (value) {
            return String(value !== null && value !== void 0 ? value : '')
                .trim()
                .toLowerCase();
        };
        ProxyMasterService_1.prototype.normalizeExclusivityValue = function (value) {
            var normalized = String(value !== null && value !== void 0 ? value : '')
                .trim()
                .toLowerCase();
            return normalized || 'shared';
        };
        ProxyMasterService_1.prototype.buildActivationQuery = function (params) {
            var _a, _b;
            var productCode = this.normalizeProductCode(params.productCode);
            var exclusivityValue = this.normalizeExclusivityValue(params.exclusivityValue);
            if (productCode === 'proxy_server') {
                var mapped = (_a = this.mapProxyServerExclusivity(exclusivityValue)) !== null && _a !== void 0 ? _a : {
                    proxy_type: 'shared',
                    proxy_subtype: 'default',
                };
                return {
                    proxy_type: mapped.proxy_type,
                    proxy_subtype: mapped.proxy_subtype,
                };
            }
            if (productCode === 'static_residential') {
                var mapped = (_b = this.mapStaticResidentialExclusivity(exclusivityValue)) !== null && _b !== void 0 ? _b : {
                    proxy_type: 'shared',
                    proxy_subtype: 'isp',
                };
                return {
                    proxy_type: mapped.proxy_type,
                    proxy_subtype: mapped.proxy_subtype,
                };
            }
            if (productCode === 'rotating_residential') {
                return {
                    proxy_type: 'shared',
                    proxy_subtype: 'residential',
                };
            }
            throw new common_1.BadRequestException('productCode không hợp lệ');
        };
        ProxyMasterService_1.prototype.getProxyProductActivationStatus = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var productCode, exclusivityValue, query, planId, activated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            productCode = this.normalizeProductCode(params.productCode);
                            exclusivityValue = this.normalizeExclusivityValue(params.exclusivityValue);
                            query = this.buildActivationQuery({
                                productCode: productCode,
                                exclusivityValue: exclusivityValue,
                            });
                            return [4 /*yield*/, this.findActivePlanIdByQuery(query, params.context)];
                        case 1:
                            planId = _a.sent();
                            activated = Number.isFinite(planId) && Number(planId) > 0;
                            return [2 /*return*/, {
                                    product_code: productCode,
                                    exclusivity_value: exclusivityValue,
                                    activated: activated,
                                    webshare_plan_id: activated ? Number(planId) : null,
                                    badge_label: activated ? 'ĐÃ KÍCH HOẠT' : 'ĐĂNG KÝ CHƯA KÍCH HOẠT',
                                    cta_label: activated ? 'Update gói' : 'Mua ngay',
                                }];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.derivePoolKeyFromProductExclusivity = function (params) {
            var _a, _b;
            var productCode = String((_a = params.productCode) !== null && _a !== void 0 ? _a : '')
                .trim()
                .toLowerCase();
            var exclusivity = String((_b = params.exclusivityValue) !== null && _b !== void 0 ? _b : '')
                .trim()
                .toLowerCase();
            if (productCode === 'rotating_residential') {
                return 'rotating_residential';
            }
            if (productCode === 'proxy_server') {
                if (exclusivity === 'dedicated')
                    return 'proxy_server_dedicated';
                if (exclusivity === 'private' || exclusivity === 'semidedicated') {
                    return 'proxy_server_private';
                }
                return 'proxy_server_shared';
            }
            if (productCode === 'static_residential') {
                if (exclusivity === 'dedicated')
                    return 'static_residential_dedicated';
                if (exclusivity === 'private' || exclusivity === 'semidedicated') {
                    return 'static_residential_private';
                }
                return 'static_residential_shared';
            }
            return null;
        };
        ProxyMasterService_1.prototype.resolveWebshareCredential = function () {
            return __awaiter(this, arguments, void 0, function (context) {
                if (context === void 0) { context = {}; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.webshareConfigService.resolveCredential(context)];
                });
            });
        };
        ProxyMasterService_1.prototype.reserveWebshareCredentialForUserPurchase = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                return __generator(this, function (_k) {
                    return [2 /*return*/, this.webshareConfigService.reserveCredentialForUser({
                            userId: params.userId,
                            accountId: (_a = params.context) === null || _a === void 0 ? void 0 : _a.accountId,
                            poolKey: (_b = params.context) === null || _b === void 0 ? void 0 : _b.poolKey,
                            query: (_c = params.context) === null || _c === void 0 ? void 0 : _c.query,
                            requestedQuantity: (_e = (_d = params.context) === null || _d === void 0 ? void 0 : _d.requestedQuantity) !== null && _e !== void 0 ? _e : null,
                            requestedBandwidthGb: (_g = (_f = params.context) === null || _f === void 0 ? void 0 : _f.requestedBandwidthGb) !== null && _g !== void 0 ? _g : null,
                            requiresUnlimitedBandwidth: (_j = (_h = params.context) === null || _h === void 0 ? void 0 : _h.requiresUnlimitedBandwidth) !== null && _j !== void 0 ? _j : null,
                        })];
                });
            });
        };
        ProxyMasterService_1.prototype.getWebshareHeaders = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var credential, headers;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.resolveWebshareCredential(params === null || params === void 0 ? void 0 : params.context)];
                        case 1:
                            credential = _a.sent();
                            if (!credential.apiKey) {
                                throw new common_1.BadRequestException('Thiếu Webshare API key. Vui lòng cấu hình trong Admin.');
                            }
                            headers = {
                                Authorization: "Token ".concat(credential.apiKey),
                            };
                            return [2 /*return*/, { headers: headers, credential: credential }];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.buildRealtimePriceResponse = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var dto, additionalFeature, query, context, headers, requestPricing, res, error_1, shouldRetryWithAddBehavior, fallbackQuery, fallbackError_1, detail, detail, remote, billingCycleMultiplier, remotePrice, remotePaidToday, remotePaidInCredits, remoteOriginal, remoteDiscountPercent, additionalFeaturePricePerMonth, proxyMarkupPercent, _a, _b, markupFactor, subtotalWithBilling, total, subtotalPerMonth, discountAmount;
                var _this = this;
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            dto = params.dto, additionalFeature = params.additionalFeature, query = params.query, context = params.context;
                            return [4 /*yield*/, this.getWebshareHeaders({ context: context })];
                        case 1:
                            headers = (_d.sent()).headers;
                            requestPricing = function (queryPayload) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, axios_1.default.get(this.websharePricingUrl, {
                                            params: { query: JSON.stringify(queryPayload) },
                                            headers: headers,
                                            timeout: 30000,
                                        })];
                                });
                            }); };
                            _d.label = 2;
                        case 2:
                            _d.trys.push([2, 4, , 11]);
                            return [4 /*yield*/, requestPricing(query)];
                        case 3:
                            res = _d.sent();
                            return [3 /*break*/, 11];
                        case 4:
                            error_1 = _d.sent();
                            shouldRetryWithAddBehavior = String((_c = query.behavior) !== null && _c !== void 0 ? _c : '').toLowerCase() === 'replace' &&
                                this.extractWebshareErrorCodes(error_1).includes('cannot_replace_plan');
                            if (!shouldRetryWithAddBehavior) return [3 /*break*/, 9];
                            fallbackQuery = __assign(__assign({}, query), { behavior: 'add' });
                            _d.label = 5;
                        case 5:
                            _d.trys.push([5, 7, , 8]);
                            return [4 /*yield*/, requestPricing(fallbackQuery)];
                        case 6:
                            res = _d.sent();
                            return [3 /*break*/, 8];
                        case 7:
                            fallbackError_1 = _d.sent();
                            detail = this.formatWebshareError(fallbackError_1);
                            if (detail) {
                                throw new common_1.BadRequestException("Webshare pricing failed: ".concat(detail));
                            }
                            throw fallbackError_1;
                        case 8: return [3 /*break*/, 10];
                        case 9:
                            detail = this.formatWebshareError(error_1);
                            if (detail) {
                                throw new common_1.BadRequestException("Webshare pricing failed: ".concat(detail));
                            }
                            throw error_1;
                        case 10: return [3 /*break*/, 11];
                        case 11:
                            remote = res.data;
                            billingCycleMultiplier = dto.billing_cycle === 'yearly' ? 12 : 1;
                            remotePrice = this.toNumber(remote === null || remote === void 0 ? void 0 : remote.price);
                            remotePaidToday = this.toNumber(remote === null || remote === void 0 ? void 0 : remote.paid_today);
                            remotePaidInCredits = (function () {
                                var explicit = _this.toNumber(remote === null || remote === void 0 ? void 0 : remote.paid_in_credits);
                                if (explicit > 0)
                                    return explicit;
                                return Math.max(0, _this.toFixed2(remotePrice - remotePaidToday));
                            })();
                            remoteOriginal = this.toNumber(remote === null || remote === void 0 ? void 0 : remote.non_discounted_price) || remotePrice;
                            remoteDiscountPercent = this.toFixed2(this.toNumber(remote === null || remote === void 0 ? void 0 : remote.discount_percentage));
                            additionalFeaturePricePerMonth = this.toFixed2(additionalFeature.price);
                            if (!this.applyProxyMarkup) return [3 /*break*/, 13];
                            _b = this.toFixed2;
                            return [4 /*yield*/, this.repo.getProxyPricePercent()];
                        case 12:
                            _a = _b.apply(this, [_d.sent()]);
                            return [3 /*break*/, 14];
                        case 13:
                            _a = 0;
                            _d.label = 14;
                        case 14:
                            proxyMarkupPercent = _a;
                            markupFactor = this.applyProxyMarkup ? 1 + proxyMarkupPercent / 100 : 1;
                            subtotalWithBilling = this.toFixed2(remoteOriginal * markupFactor);
                            total = this.toFixed2((remotePaidToday || remotePrice) * markupFactor);
                            subtotalPerMonth = this.toFixed2(subtotalWithBilling / billingCycleMultiplier);
                            discountAmount = this.toFixed2(subtotalWithBilling - total);
                            return [2 /*return*/, {
                                    base_price_per_month: this.toFixed2((remoteOriginal / billingCycleMultiplier) * markupFactor),
                                    base_price_type: 'realtime',
                                    additional_feature_price_per_month: additionalFeaturePricePerMonth,
                                    additional_feature: additionalFeature.row
                                        ? {
                                            id: additionalFeature.row.id,
                                            code: additionalFeature.row.code,
                                            title_vi: additionalFeature.row.title_vi,
                                            title_en: additionalFeature.row.title_en,
                                        }
                                        : null,
                                    subtotal_per_month: subtotalPerMonth,
                                    billing_cycle: dto.billing_cycle,
                                    billing_cycle_multiplier: billingCycleMultiplier,
                                    subtotal_with_billing: subtotalWithBilling,
                                    discount_percent: remoteDiscountPercent,
                                    discount_amount: discountAmount,
                                    total: total,
                                    paid_today: this.toFixed2(remotePaidToday || remotePrice),
                                    paid_in_credits: this.toFixed2(remotePaidInCredits),
                                    webshare_price: this.toFixed2(remotePrice),
                                    webshare_non_discounted_price: this.toFixed2(remoteOriginal),
                                    applied_markup_percent: proxyMarkupPercent,
                                    currency: 'USD',
                                    source: 'webshare_realtime',
                                }];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.getCountries = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.repo.findAllCountries()];
                });
            });
        };
        ProxyMasterService_1.prototype.getProxyProducts = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.repo.findAllProxyProducts()];
                });
            });
        };
        ProxyMasterService_1.prototype.getProxyProductOptions = function (productId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (productId != null) {
                        return [2 /*return*/, this.repo.findOptionsByProductId(productId)];
                    }
                    return [2 /*return*/, this.repo.findAllProxyProductOptions()];
                });
            });
        };
        ProxyMasterService_1.prototype.getProxyProductByCode = function (code) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.repo.findProxyProductByCode(code)];
                });
            });
        };
        ProxyMasterService_1.prototype.getProxyProductById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.repo.findProxyProductById(id)];
                });
            });
        };
        ProxyMasterService_1.prototype.getProxyLocations = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.repo.findAllProxyLocations()];
                });
            });
        };
        ProxyMasterService_1.prototype.getProxyCountryOptions = function (productId, exclusivityValue) {
            return __awaiter(this, void 0, void 0, function () {
                var product, proxyType, proxySubtype, mapped, mapped, query, poolKey, headers, res, error_2, detail, customizePayload, availableCountriesRaw, availableCountries, countryRows, countryMap, codes;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.findProxyProductById(productId)];
                        case 1:
                            product = _a.sent();
                            if (!product) {
                                throw new common_1.NotFoundException("Product with ID ".concat(productId, " not found"));
                            }
                            proxyType = '';
                            proxySubtype = '';
                            if (product.code === 'proxy_server') {
                                mapped = this.mapProxyServerExclusivity(exclusivityValue);
                                if (!mapped) {
                                    throw new common_1.BadRequestException('Missing or invalid exclusivity for proxy_server');
                                }
                                proxyType = mapped.proxy_type;
                                proxySubtype = mapped.proxy_subtype;
                            }
                            else if (product.code === 'static_residential') {
                                mapped = this.mapStaticResidentialExclusivity(exclusivityValue);
                                if (!mapped) {
                                    throw new common_1.BadRequestException('Missing or invalid exclusivity for static_residential');
                                }
                                proxyType = mapped.proxy_type;
                                proxySubtype = mapped.proxy_subtype;
                            }
                            else if (product.code === 'rotating_residential') {
                                return [2 /*return*/, []];
                            }
                            else {
                                throw new common_1.BadRequestException("Unsupported product code for country options: ".concat(product.code));
                            }
                            query = {
                                proxy_type: proxyType,
                                proxy_subtype: proxySubtype,
                                proxy_countries: { ZZ: 1 },
                                required_site_checks: [],
                            };
                            poolKey = this.derivePoolKeyFromProductExclusivity({
                                productCode: product.code,
                                exclusivityValue: exclusivityValue,
                            });
                            return [4 /*yield*/, this.getWebshareHeaders({
                                    context: {
                                        query: query,
                                        poolKey: poolKey,
                                    },
                                })];
                        case 2:
                            headers = (_a.sent()).headers;
                            _a.label = 3;
                        case 3:
                            _a.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, axios_1.default.get(this.webshareCustomizeUrl, {
                                    params: { query: JSON.stringify(query) },
                                    headers: headers,
                                    timeout: 30000,
                                })];
                        case 4:
                            res = _a.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            error_2 = _a.sent();
                            detail = this.formatWebshareError(error_2);
                            if (detail) {
                                throw new common_1.BadRequestException("Webshare customize failed: ".concat(detail));
                            }
                            throw error_2;
                        case 6:
                            customizePayload = res.data;
                            availableCountriesRaw = customizePayload === null || customizePayload === void 0 ? void 0 : customizePayload.available_countries;
                            availableCountries = availableCountriesRaw &&
                                typeof availableCountriesRaw === 'object' &&
                                !Array.isArray(availableCountriesRaw)
                                ? availableCountriesRaw
                                : {};
                            return [4 /*yield*/, this.repo.findAllCountries()];
                        case 7:
                            countryRows = _a.sent();
                            countryMap = new Map(countryRows.map(function (c) { return [String(c.code).toUpperCase(), c]; }));
                            codes = Object.keys(availableCountries)
                                .map(function (c) { return c.toUpperCase(); })
                                .filter(function (c) { return c !== 'ZZ'; })
                                .sort(function (a, b) { return a.localeCompare(b); });
                            return [2 /*return*/, __spreadArray([
                                    {
                                        code: 'ZZ',
                                        name_vi: 'Pool',
                                        name_en: 'Pool',
                                        available_count: 0,
                                        is_pool: true,
                                    }
                                ], codes.map(function (code) {
                                    var _a, _b;
                                    var row = countryMap.get(code);
                                    return {
                                        code: code,
                                        name_vi: (_a = row === null || row === void 0 ? void 0 : row.name_vi) !== null && _a !== void 0 ? _a : null,
                                        name_en: (_b = row === null || row === void 0 ? void 0 : row.name_en) !== null && _b !== void 0 ? _b : null,
                                        available_count: _this.toNumber(availableCountries[code]),
                                        is_pool: false,
                                    };
                                }), true)];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.getProxyAdditionalFeatures = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.repo.findAllProxyAdditionalFeatures()];
                });
            });
        };
        ProxyMasterService_1.prototype.getPaymentMethods = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.repo.findAllPaymentMethods()];
                });
            });
        };
        ProxyMasterService_1.prototype.findAdditionalFeature = function (additionalFeatureId) {
            return __awaiter(this, void 0, void 0, function () {
                var id, row;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            id = additionalFeatureId ? Number(additionalFeatureId) : null;
                            if (!id)
                                return [2 /*return*/, { row: null, price: 0 }];
                            return [4 /*yield*/, this.repo.findAdditionalFeatureById(id)];
                        case 1:
                            row = _a.sent();
                            if (!row) {
                                throw new common_1.NotFoundException("Additional feature with ID ".concat(id, " not found"));
                            }
                            return [2 /*return*/, { row: row, price: this.toNumber(row.price_per_month) }];
                    }
                });
            });
        };
        /**
         * Tính giá proxy. Ưu tiên realtime Webshare cho các sản phẩm proxy chính.
         */
        ProxyMasterService_1.prototype.calculatePrice = function (dto, requestContext) {
            return __awaiter(this, void 0, void 0, function () {
                var productId, product, exclusivityOptionId, quantityOptionId, bandwidthOptionId, additionalFeature, options, exclusivityOption, quantityOption, bandwidthOption, proxyType, proxySubtype, behavior, proxyCountries, proxyReplacementsTotal, mapped, mapped, proxyCount, requestedProxyCountries, bandwidth, distributedCount, query;
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            productId = Number(dto.product_id);
                            if (isNaN(productId) || productId < 1) {
                                throw new common_1.BadRequestException("Invalid product_id: ".concat(dto.product_id));
                            }
                            return [4 /*yield*/, this.repo.findProxyProductById(productId)];
                        case 1:
                            product = _e.sent();
                            if (!product) {
                                throw new common_1.NotFoundException("Product with ID ".concat(productId, " not found"));
                            }
                            exclusivityOptionId = dto.exclusivity_option_id
                                ? Number(dto.exclusivity_option_id)
                                : null;
                            quantityOptionId = dto.quantity_option_id
                                ? Number(dto.quantity_option_id)
                                : null;
                            bandwidthOptionId = dto.bandwidth_option_id
                                ? Number(dto.bandwidth_option_id)
                                : null;
                            if (exclusivityOptionId !== null &&
                                (isNaN(exclusivityOptionId) || exclusivityOptionId < 1)) {
                                throw new common_1.BadRequestException("Invalid exclusivity_option_id: ".concat(dto.exclusivity_option_id));
                            }
                            if (quantityOptionId !== null &&
                                (isNaN(quantityOptionId) || quantityOptionId < 1)) {
                                throw new common_1.BadRequestException("Invalid quantity_option_id: ".concat(dto.quantity_option_id));
                            }
                            if (bandwidthOptionId !== null &&
                                (isNaN(bandwidthOptionId) || bandwidthOptionId < 1)) {
                                throw new common_1.BadRequestException("Invalid bandwidth_option_id: ".concat(dto.bandwidth_option_id));
                            }
                            return [4 /*yield*/, this.findAdditionalFeature(dto.additional_feature_id)];
                        case 2:
                            additionalFeature = _e.sent();
                            if (!['proxy_server', 'static_residential', 'rotating_residential'].includes(product.code)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.repo.findOptionsByProductId(productId)];
                        case 3:
                            options = _e.sent();
                            exclusivityOption = exclusivityOptionId != null
                                ? options.find(function (o) { return Number(o.id) === Number(exclusivityOptionId); })
                                : null;
                            quantityOption = quantityOptionId != null
                                ? options.find(function (o) { return Number(o.id) === Number(quantityOptionId); })
                                : null;
                            bandwidthOption = bandwidthOptionId != null
                                ? options.find(function (o) { return Number(o.id) === Number(bandwidthOptionId); })
                                : null;
                            proxyType = '';
                            proxySubtype = '';
                            behavior = 'replace';
                            proxyCountries = {
                                ZZ: 1,
                            };
                            proxyReplacementsTotal = 10;
                            if (product.code === 'proxy_server') {
                                mapped = this.mapProxyServerExclusivity(dto.exclusivity_value || (exclusivityOption === null || exclusivityOption === void 0 ? void 0 : exclusivityOption.option_value));
                                if (!mapped) {
                                    throw new common_1.BadRequestException('Missing or invalid exclusivity for proxy_server');
                                }
                                proxyType = mapped.proxy_type;
                                proxySubtype = mapped.proxy_subtype;
                                behavior = (_a = requestContext === null || requestContext === void 0 ? void 0 : requestContext.pricingBehavior) !== null && _a !== void 0 ? _a : 'add';
                            }
                            else if (product.code === 'static_residential') {
                                mapped = this.mapStaticResidentialExclusivity(dto.exclusivity_value || (exclusivityOption === null || exclusivityOption === void 0 ? void 0 : exclusivityOption.option_value));
                                if (!mapped) {
                                    throw new common_1.BadRequestException('Missing or invalid exclusivity for static_residential');
                                }
                                proxyType = mapped.proxy_type;
                                proxySubtype = mapped.proxy_subtype;
                                behavior = (_b = requestContext === null || requestContext === void 0 ? void 0 : requestContext.pricingBehavior) !== null && _b !== void 0 ? _b : 'add';
                            }
                            else {
                                proxyType = 'shared';
                                proxySubtype = 'residential';
                                behavior = (_c = requestContext === null || requestContext === void 0 ? void 0 : requestContext.pricingBehavior) !== null && _c !== void 0 ? _c : 'add';
                                proxyCountries = {};
                                proxyReplacementsTotal = 0;
                            }
                            proxyCount = dto.quantity_value && dto.quantity_value > 0
                                ? Number(dto.quantity_value)
                                : this.parseOptionNumber(quantityOption === null || quantityOption === void 0 ? void 0 : quantityOption.option_value);
                            requestedProxyCountries = this.normalizeProxyCountriesInput(dto.proxy_countries);
                            bandwidth = dto.bandwidth_value === 0
                                ? 0
                                : dto.bandwidth_value && dto.bandwidth_value > 0
                                    ? Number(dto.bandwidth_value)
                                    : this.parseOptionNumber(bandwidthOption === null || bandwidthOption === void 0 ? void 0 : bandwidthOption.option_value);
                            if (product.code !== 'rotating_residential') {
                                if (requestedProxyCountries) {
                                    distributedCount = this.sumProxyCountries(requestedProxyCountries);
                                    if (proxyCount != null &&
                                        Number.isFinite(proxyCount) &&
                                        proxyCount > 0 &&
                                        distributedCount !== proxyCount) {
                                        throw new common_1.BadRequestException("proxy_countries total (".concat(distributedCount, ") must equal selected quantity (").concat(proxyCount, ")"));
                                    }
                                    proxyCountries = requestedProxyCountries;
                                    proxyCount = distributedCount;
                                }
                                else {
                                    if (!proxyCount) {
                                        throw new common_1.BadRequestException('Missing proxy count for realtime pricing');
                                    }
                                    proxyCountries = { ZZ: proxyCount };
                                }
                            }
                            if (bandwidth == null || !Number.isFinite(bandwidth) || bandwidth < 0) {
                                throw new common_1.BadRequestException('Missing bandwidth for realtime pricing');
                            }
                            query = {
                                proxy_type: proxyType,
                                proxy_subtype: proxySubtype,
                                proxy_countries: proxyCountries,
                                bandwidth_limit: bandwidth,
                                on_demand_refreshes_total: 0,
                                automatic_refresh_frequency: 0,
                                proxy_replacements_total: proxyReplacementsTotal,
                                subusers_total: 3,
                                term: dto.billing_cycle,
                                is_unlimited_ip_authorizations: false,
                                is_high_concurrency: false,
                                is_high_priority_network: false,
                                required_site_checks: [],
                                with_tax: false,
                                behavior: behavior,
                            };
                            return [2 /*return*/, this.buildRealtimePriceResponse({
                                    dto: dto,
                                    additionalFeature: additionalFeature,
                                    query: query,
                                    context: __assign(__assign({}, (requestContext !== null && requestContext !== void 0 ? requestContext : {})), { query: query, poolKey: (_d = requestContext === null || requestContext === void 0 ? void 0 : requestContext.poolKey) !== null && _d !== void 0 ? _d : this.derivePoolKeyFromQuery(query) }),
                                })];
                        case 4: throw new common_1.BadRequestException("Unsupported proxy product for realtime pricing: ".concat(product.code));
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.formatWebshareError = function (error) {
            var _a, _b;
            if (!axios_1.default.isAxiosError(error))
                return null;
            var status = (_a = error.response) === null || _a === void 0 ? void 0 : _a.status;
            var data = (_b = error.response) === null || _b === void 0 ? void 0 : _b.data;
            var detail = '';
            if (!data) {
                detail = error.message;
            }
            else if (typeof data === 'string') {
                detail = data;
            }
            else if (Array.isArray(data)) {
                try {
                    detail = JSON.stringify(data);
                }
                catch (_c) {
                    detail = String(data);
                }
            }
            else if (typeof data.detail === 'string') {
                detail = data.detail;
            }
            else if (typeof data.message === 'string') {
                detail = data.message;
            }
            else if (Array.isArray(data.non_field_errors)) {
                detail = data.non_field_errors
                    .map(function (item) {
                    return typeof item === 'string' ? item : JSON.stringify(item);
                })
                    .join(', ');
            }
            else {
                var entry = Object.entries(data).find(function (_a) {
                    var value = _a[1];
                    return Array.isArray(value) && value.length > 0;
                });
                if (entry) {
                    var key = entry[0], value = entry[1];
                    detail = "".concat(key, ": ").concat(value
                        .map(function (item) {
                        return typeof item === 'string' ? item : JSON.stringify(item);
                    })
                        .join(', '));
                }
                else {
                    try {
                        detail = JSON.stringify(data);
                    }
                    catch (_d) {
                        detail = error.message;
                    }
                }
            }
            var trimmed = detail.trim();
            if (!trimmed)
                return status ? "HTTP ".concat(status) : null;
            return status ? "HTTP ".concat(status, ": ").concat(trimmed) : trimmed;
        };
        ProxyMasterService_1.prototype.extractWebshareErrorCodes = function (error) {
            var _a;
            if (!axios_1.default.isAxiosError(error))
                return [];
            var data = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data;
            var codes = [];
            var pushCode = function (value) {
                if (typeof value === 'string' && value.trim()) {
                    codes.push(value.trim());
                }
            };
            if (Array.isArray(data)) {
                data.forEach(function (item) {
                    if (typeof item === 'string') {
                        pushCode(item);
                        return;
                    }
                    if (item && typeof item === 'object') {
                        pushCode(item.code);
                    }
                });
                return codes;
            }
            if (data && typeof data === 'object') {
                pushCode(data.code);
                var errors = data.non_field_errors;
                if (Array.isArray(errors)) {
                    errors.forEach(function (item) {
                        if (typeof item === 'string') {
                            pushCode(item);
                            return;
                        }
                        if (item && typeof item === 'object') {
                            pushCode(item.code);
                        }
                    });
                }
            }
            return codes;
        };
        ProxyMasterService_1.prototype.getWebshareErrorStatus = function (error) {
            var _a, _b;
            if (!axios_1.default.isAxiosError(error))
                return null;
            return (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.status) !== null && _b !== void 0 ? _b : null;
        };
        ProxyMasterService_1.prototype.sleep = function (ms) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.getPlanIdFromResponse = function (data) {
            var _a, _b;
            var planId = Number((_b = (_a = data === null || data === void 0 ? void 0 : data.plan) !== null && _a !== void 0 ? _a : data === null || data === void 0 ? void 0 : data.plan_id) !== null && _b !== void 0 ? _b : data === null || data === void 0 ? void 0 : data.id);
            return Number.isFinite(planId) && planId > 0 ? Math.trunc(planId) : null;
        };
        ProxyMasterService_1.prototype.getDefaultPaymentMethodId = function (context) {
            return __awaiter(this, void 0, void 0, function () {
                var headers, res, rows, firstId;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.getWebshareHeaders({ context: context })];
                        case 1:
                            headers = (_d.sent()).headers;
                            return [4 /*yield*/, axios_1.default.get(this.websharePaymentMethodUrl, {
                                    headers: headers,
                                    timeout: 30000,
                                    params: {
                                        page_size: 100,
                                    },
                                })];
                        case 2:
                            res = _d.sent();
                            rows = Array.isArray((_a = res.data) === null || _a === void 0 ? void 0 : _a.results)
                                ? res.data.results
                                : [];
                            firstId = Number((_c = (_b = rows[0]) === null || _b === void 0 ? void 0 : _b.id) !== null && _c !== void 0 ? _c : 0);
                            return [2 /*return*/, Number.isFinite(firstId) && firstId > 0 ? Math.trunc(firstId) : null];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.solveWebshareRecaptchaToken = function () {
            return __awaiter(this, void 0, void 0, function () {
                var submit, captchaId, i, poll;
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                return __generator(this, function (_k) {
                    switch (_k.label) {
                        case 0:
                            if (!this.webshareRecaptcha2CaptchaApiKey) {
                                return [2 /*return*/, null];
                            }
                            return [4 /*yield*/, axios_1.default.post('https://2captcha.com/in.php', {
                                    key: this.webshareRecaptcha2CaptchaApiKey,
                                    method: 'userrecaptcha',
                                    googlekey: this.webshareRecaptchaSiteKey,
                                    pageurl: this.webshareRecaptchaPageUrl,
                                    invisible: 1,
                                    json: 1,
                                }, {
                                    timeout: 30000,
                                })];
                        case 1:
                            submit = _k.sent();
                            if (Number((_a = submit.data) === null || _a === void 0 ? void 0 : _a.status) !== 1) {
                                throw new common_1.BadRequestException("Kh\u00F4ng th\u1EC3 g\u1EEDi t\u00E1c v\u1EE5 reCAPTCHA t\u1EDBi 2Captcha: ".concat(JSON.stringify((_b = submit.data) !== null && _b !== void 0 ? _b : {})));
                            }
                            captchaId = String((_d = (_c = submit.data) === null || _c === void 0 ? void 0 : _c.request) !== null && _d !== void 0 ? _d : '').trim();
                            if (!captchaId) {
                                throw new common_1.BadRequestException('2Captcha không trả về captcha task id');
                            }
                            return [4 /*yield*/, this.sleep(12000)];
                        case 2:
                            _k.sent();
                            i = 0;
                            _k.label = 3;
                        case 3:
                            if (!(i < 30)) return [3 /*break*/, 7];
                            return [4 /*yield*/, axios_1.default.get('https://2captcha.com/res.php', {
                                    timeout: 30000,
                                    params: {
                                        key: this.webshareRecaptcha2CaptchaApiKey,
                                        action: 'get',
                                        id: captchaId,
                                        json: 1,
                                    },
                                })];
                        case 4:
                            poll = _k.sent();
                            if (Number((_e = poll.data) === null || _e === void 0 ? void 0 : _e.status) === 1 &&
                                typeof ((_f = poll.data) === null || _f === void 0 ? void 0 : _f.request) === 'string' &&
                                poll.data.request.trim()) {
                                return [2 /*return*/, poll.data.request.trim()];
                            }
                            if (String((_h = (_g = poll.data) === null || _g === void 0 ? void 0 : _g.request) !== null && _h !== void 0 ? _h : '') !== 'CAPCHA_NOT_READY') {
                                throw new common_1.BadRequestException("Gi\u1EA3i reCAPTCHA th\u1EA5t b\u1EA1i: ".concat(JSON.stringify((_j = poll.data) !== null && _j !== void 0 ? _j : {})));
                            }
                            return [4 /*yield*/, this.sleep(5000)];
                        case 5:
                            _k.sent();
                            _k.label = 6;
                        case 6:
                            i += 1;
                            return [3 /*break*/, 3];
                        case 7: throw new common_1.BadRequestException('Hết thời gian chờ 2Captcha trả kết quả reCAPTCHA');
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.getWebshareErrorMessage = function (error) {
            return this.formatWebshareError(error);
        };
        ProxyMasterService_1.prototype.isRecentSamePlanError = function (error) {
            return this.extractWebshareErrorCodes(error).includes('recent_same_plan');
        };
        ProxyMasterService_1.prototype.isPlanSameProxyTypeExistsError = function (error) {
            var codes = this.extractWebshareErrorCodes(error);
            return (codes.includes('plan_same_proxy_type_exists') ||
                codes.includes('cannot_replace_plan'));
        };
        ProxyMasterService_1.prototype.isRetryableWebshareError = function (error) {
            var status = this.getWebshareErrorStatus(error);
            if (status != null && (status >= 500 || status === 429))
                return true;
            return this.isRecentSamePlanError(error);
        };
        ProxyMasterService_1.prototype.isSubuserLimitError = function (error) {
            var _a;
            if (!axios_1.default.isAxiosError(error))
                return false;
            var data = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data;
            var errors = Array.isArray(data === null || data === void 0 ? void 0 : data.non_field_errors)
                ? data === null || data === void 0 ? void 0 : data.non_field_errors
                : [];
            return errors.some(function (item) {
                return item &&
                    typeof item === 'object' &&
                    item.code === 'subuser_limit_reached';
            });
        };
        ProxyMasterService_1.prototype.isPlanAccessDeniedError = function (error) {
            var _a, _b;
            if (!axios_1.default.isAxiosError(error))
                return false;
            var status = (_a = error.response) === null || _a === void 0 ? void 0 : _a.status;
            if (status !== 403)
                return false;
            var message = (_b = this.formatWebshareError(error)) !== null && _b !== void 0 ? _b : '';
            return message.toLowerCase().includes('target plan');
        };
        ProxyMasterService_1.prototype.isRecaptchaRequiredError = function (error) {
            var _a;
            if (!axios_1.default.isAxiosError(error))
                return false;
            var message = ((_a = this.formatWebshareError(error)) !== null && _a !== void 0 ? _a : '').toLowerCase();
            if (!message)
                return false;
            return message.includes('recaptcha') && message.includes('required');
        };
        ProxyMasterService_1.prototype.getQueryProxyProfile = function (query) {
            var _a, _b;
            return {
                proxyType: String((_a = query.proxy_type) !== null && _a !== void 0 ? _a : '')
                    .trim()
                    .toLowerCase(),
                proxySubtype: String((_b = query.proxy_subtype) !== null && _b !== void 0 ? _b : '')
                    .trim()
                    .toLowerCase(),
            };
        };
        ProxyMasterService_1.prototype.planMatchesQueryProfile = function (plan, query) {
            var _a, _b;
            var profile = this.getQueryProxyProfile(query);
            if (!profile.proxyType || !profile.proxySubtype)
                return false;
            var planType = String((_a = plan.proxy_type) !== null && _a !== void 0 ? _a : '')
                .trim()
                .toLowerCase();
            var planSubtype = String((_b = plan.proxy_subtype) !== null && _b !== void 0 ? _b : '')
                .trim()
                .toLowerCase();
            return (planType === profile.proxyType && planSubtype === profile.proxySubtype);
        };
        ProxyMasterService_1.prototype.listWebsharePlans = function (context) {
            return __awaiter(this, void 0, void 0, function () {
                var headers, results, page, pageSize, res, pageResults;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.getWebshareHeaders({ context: context })];
                        case 1:
                            headers = (_c.sent()).headers;
                            results = [];
                            page = 1;
                            pageSize = 100;
                            _c.label = 2;
                        case 2:
                            if (!true) return [3 /*break*/, 4];
                            return [4 /*yield*/, axios_1.default.get(this.webshareSubscriptionPlanUrl, {
                                    headers: headers,
                                    params: {
                                        page: page,
                                        page_size: pageSize,
                                    },
                                    timeout: 30000,
                                })];
                        case 3:
                            res = _c.sent();
                            pageResults = Array.isArray((_a = res.data) === null || _a === void 0 ? void 0 : _a.results)
                                ? res.data.results
                                : [];
                            results.push.apply(results, pageResults);
                            if (!((_b = res.data) === null || _b === void 0 ? void 0 : _b.next) || pageResults.length === 0)
                                return [3 /*break*/, 4];
                            page += 1;
                            return [3 /*break*/, 2];
                        case 4: return [2 /*return*/, results];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.isPlanCompatibleWithQuery = function (planId, query, context) {
            return __awaiter(this, void 0, void 0, function () {
                var plans, plan, status;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!Number.isFinite(planId) || planId <= 0)
                                return [2 /*return*/, false];
                            return [4 /*yield*/, this.listWebsharePlans(context !== null && context !== void 0 ? context : { query: query })];
                        case 1:
                            plans = _b.sent();
                            plan = plans.find(function (item) { var _a; return Number((_a = item.id) !== null && _a !== void 0 ? _a : 0) === planId; });
                            if (!plan)
                                return [2 /*return*/, false];
                            status = String((_a = plan.status) !== null && _a !== void 0 ? _a : '')
                                .trim()
                                .toLowerCase();
                            if (status && status !== 'active')
                                return [2 /*return*/, false];
                            return [2 /*return*/, this.planMatchesQueryProfile(plan, query)];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.findActivePlanIdByQuery = function (query, context) {
            return __awaiter(this, void 0, void 0, function () {
                var plans, matched, planId;
                var _this = this;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.listWebsharePlans(context !== null && context !== void 0 ? context : { query: query })];
                        case 1:
                            plans = _b.sent();
                            matched = plans
                                .filter(function (plan) {
                                var _a;
                                var status = String((_a = plan.status) !== null && _a !== void 0 ? _a : '')
                                    .trim()
                                    .toLowerCase();
                                if (status !== 'active')
                                    return false;
                                return _this.planMatchesQueryProfile(plan, query);
                            })
                                .sort(function (a, b) {
                                var _a, _b, _c, _d;
                                var aTime = Date.parse(String((_b = (_a = a.updated_at) !== null && _a !== void 0 ? _a : a.created_at) !== null && _b !== void 0 ? _b : 0)) || 0;
                                var bTime = Date.parse(String((_d = (_c = b.updated_at) !== null && _c !== void 0 ? _c : b.created_at) !== null && _d !== void 0 ? _d : 0)) || 0;
                                return bTime - aTime;
                            });
                            if (!matched.length)
                                return [2 /*return*/, null];
                            planId = Number((_a = matched[0].id) !== null && _a !== void 0 ? _a : 0);
                            return [2 /*return*/, Number.isFinite(planId) && planId > 0 ? planId : null];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.getCurrentSubscriptionPlanId = function (context) {
            return __awaiter(this, void 0, void 0, function () {
                var headers, res, data, planId;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.getWebshareHeaders({ context: context })];
                        case 1:
                            headers = (_c.sent()).headers;
                            return [4 /*yield*/, axios_1.default.get(this.webshareSubscriptionUrl, {
                                    headers: headers,
                                    timeout: 30000,
                                })];
                        case 2:
                            res = _c.sent();
                            data = res.data;
                            planId = Number((_b = (_a = data === null || data === void 0 ? void 0 : data.plan) !== null && _a !== void 0 ? _a : data === null || data === void 0 ? void 0 : data.plan_id) !== null && _b !== void 0 ? _b : data === null || data === void 0 ? void 0 : data.id) || null;
                            return [2 /*return*/, planId];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.getWebshareSubscription = function (context) {
            return __awaiter(this, void 0, void 0, function () {
                var headers, res;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.getWebshareHeaders({ context: context })];
                        case 1:
                            headers = (_b.sent()).headers;
                            return [4 /*yield*/, axios_1.default.get(this.webshareSubscriptionUrl, {
                                    headers: headers,
                                    timeout: 30000,
                                })];
                        case 2:
                            res = _b.sent();
                            return [2 /*return*/, ((_a = res.data) !== null && _a !== void 0 ? _a : {})];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.getSubscriptionAutoRenewEnabled = function (subscription) {
            if (!subscription || typeof subscription !== 'object') {
                return null;
            }
            var candidates = [
                subscription.renewals_enabled,
                subscription.auto_renew,
                subscription.auto_renew_enabled,
                subscription.renew,
                subscription.renewal_enabled,
            ];
            for (var _i = 0, candidates_1 = candidates; _i < candidates_1.length; _i++) {
                var value = candidates_1[_i];
                if (typeof value === 'boolean') {
                    return value;
                }
                if (typeof value === 'number') {
                    if (value === 1)
                        return true;
                    if (value === 0)
                        return false;
                }
                if (typeof value === 'string') {
                    var normalized = value.trim().toLowerCase();
                    if (['true', '1', 'yes', 'on', 'enabled'].includes(normalized)) {
                        return true;
                    }
                    if (['false', '0', 'no', 'off', 'disabled'].includes(normalized)) {
                        return false;
                    }
                }
            }
            return null;
        };
        ProxyMasterService_1.prototype.disableWebshareSubscriptionRenewal = function (context) {
            return __awaiter(this, void 0, void 0, function () {
                var headers, res;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.getWebshareHeaders({ context: context })];
                        case 1:
                            headers = (_b.sent()).headers;
                            return [4 /*yield*/, axios_1.default.delete(this.webshareSubscriptionRenewalUrl, {
                                    headers: headers,
                                    timeout: 30000,
                                })];
                        case 2:
                            res = _b.sent();
                            return [2 /*return*/, ((_a = res.data) !== null && _a !== void 0 ? _a : {})];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.getWebsharePlanById = function (planId, context) {
            return __awaiter(this, void 0, void 0, function () {
                var normalizedPlanId, headers, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            normalizedPlanId = Number(planId);
                            if (!Number.isFinite(normalizedPlanId) || normalizedPlanId <= 0) {
                                throw new common_1.BadRequestException('Invalid plan_id');
                            }
                            return [4 /*yield*/, this.getWebshareHeaders({ context: context })];
                        case 1:
                            headers = (_a.sent()).headers;
                            return [4 /*yield*/, axios_1.default.get("".concat(this.webshareSubscriptionPlanUrl).concat(Math.trunc(normalizedPlanId), "/"), {
                                    headers: headers,
                                    timeout: 30000,
                                })];
                        case 2:
                            res = _a.sent();
                            return [2 /*return*/, res.data];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.updateWebsharePlan = function (planId, payload, context) {
            return __awaiter(this, void 0, void 0, function () {
                var normalizedPlanId, headers, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            normalizedPlanId = Number(planId);
                            if (!Number.isFinite(normalizedPlanId) || normalizedPlanId <= 0) {
                                throw new common_1.BadRequestException('Invalid plan_id');
                            }
                            return [4 /*yield*/, this.getWebshareHeaders({ context: context })];
                        case 1:
                            headers = (_a.sent()).headers;
                            return [4 /*yield*/, axios_1.default.patch("".concat(this.webshareSubscriptionPlanUrl).concat(Math.trunc(normalizedPlanId), "/"), payload, {
                                    headers: headers,
                                    timeout: 30000,
                                })];
                        case 2:
                            res = _a.sent();
                            return [2 /*return*/, res.data];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.upgradeWebsharePlan = function (planId, payload, context, options) {
            return __awaiter(this, void 0, void 0, function () {
                var normalizedPlanId, headers, finalPayload, paymentMethod, _a, res, error_3, token, data, paymentRequired, nextPlanId;
                var _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            normalizedPlanId = Number(planId);
                            if (!Number.isFinite(normalizedPlanId) || normalizedPlanId <= 0) {
                                throw new common_1.BadRequestException('Invalid plan_id');
                            }
                            return [4 /*yield*/, this.getWebshareHeaders({ context: context })];
                        case 1:
                            headers = (_e.sent()).headers;
                            finalPayload = __assign({}, payload);
                            paymentMethod = (options === null || options === void 0 ? void 0 : options.paymentMethod) != null
                                ? Number(options.paymentMethod)
                                : Number(this.websharePaymentMethod);
                            if (!(((_b = options === null || options === void 0 ? void 0 : options.autoResolvePaymentMethod) !== null && _b !== void 0 ? _b : true) &&
                                (!Number.isFinite(paymentMethod) || paymentMethod <= 0))) return [3 /*break*/, 3];
                            _a = Number;
                            return [4 /*yield*/, this.getDefaultPaymentMethodId(context)];
                        case 2:
                            paymentMethod = _a.apply(void 0, [_e.sent()]);
                            _e.label = 3;
                        case 3:
                            finalPayload.payment_method =
                                Number.isFinite(paymentMethod) && paymentMethod > 0
                                    ? Math.trunc(paymentMethod)
                                    : null;
                            if (options === null || options === void 0 ? void 0 : options.recaptchaToken) {
                                finalPayload.recaptcha = options.recaptchaToken;
                            }
                            _e.label = 4;
                        case 4:
                            _e.trys.push([4, 6, , 13]);
                            return [4 /*yield*/, axios_1.default.post("".concat(this.webshareSubscriptionPlanUrl).concat(Math.trunc(normalizedPlanId), "/upgrade/"), finalPayload, {
                                    headers: headers,
                                    timeout: 120000,
                                })];
                        case 5:
                            res = _e.sent();
                            return [3 /*break*/, 13];
                        case 6:
                            error_3 = _e.sent();
                            if (!((options === null || options === void 0 ? void 0 : options.autoSolveRecaptcha) &&
                                this.isRecaptchaRequiredError(error_3) &&
                                !finalPayload.recaptcha)) return [3 /*break*/, 11];
                            return [4 /*yield*/, this.solveWebshareRecaptchaToken()];
                        case 7:
                            token = _e.sent();
                            if (!token) return [3 /*break*/, 9];
                            finalPayload.recaptcha = token;
                            return [4 /*yield*/, axios_1.default.post("".concat(this.webshareSubscriptionPlanUrl).concat(Math.trunc(normalizedPlanId), "/upgrade/"), finalPayload, {
                                    headers: headers,
                                    timeout: 120000,
                                })];
                        case 8:
                            res = _e.sent();
                            return [3 /*break*/, 10];
                        case 9: throw error_3;
                        case 10: return [3 /*break*/, 12];
                        case 11: throw error_3;
                        case 12: return [3 /*break*/, 13];
                        case 13:
                            if (!res) {
                                throw new common_1.BadRequestException('Không thể gọi upgrade plan Webshare');
                            }
                            data = ((_c = res.data) !== null && _c !== void 0 ? _c : {});
                            paymentRequired = Boolean(data === null || data === void 0 ? void 0 : data.payment_required);
                            nextPlanId = (_d = this.getPlanIdFromResponse(data)) !== null && _d !== void 0 ? _d : normalizedPlanId;
                            return [2 /*return*/, {
                                    paymentRequired: paymentRequired,
                                    planId: nextPlanId,
                                    raw: data,
                                }];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.getWebshareStats = function (params, context) {
            return __awaiter(this, void 0, void 0, function () {
                var query, planId, from, to, headers, res;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            query = {};
                            planId = Number((_a = params === null || params === void 0 ? void 0 : params.planId) !== null && _a !== void 0 ? _a : 0);
                            if (Number.isFinite(planId) && planId > 0) {
                                query.plan_id = Math.trunc(planId);
                            }
                            from = String((_b = params === null || params === void 0 ? void 0 : params.from) !== null && _b !== void 0 ? _b : '').trim();
                            if (from) {
                                query.from = from;
                            }
                            to = String((_c = params === null || params === void 0 ? void 0 : params.to) !== null && _c !== void 0 ? _c : '').trim();
                            if (to) {
                                query.to = to;
                            }
                            return [4 /*yield*/, this.getWebshareHeaders({ context: context })];
                        case 1:
                            headers = (_d.sent()).headers;
                            return [4 /*yield*/, axios_1.default.get(this.webshareStatsUrl, {
                                    headers: headers,
                                    params: query,
                                    timeout: 30000,
                                })];
                        case 2:
                            res = _d.sent();
                            if (!Array.isArray(res.data)) {
                                return [2 /*return*/, []];
                            }
                            return [2 /*return*/, res.data];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.listWebsharePaymentTransactions = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var headers, pageSizeRaw, pageSize, maxPagesRaw, maxPages, results, page, res, data, pageResults;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.getWebshareHeaders({
                                context: {
                                    accountId: params === null || params === void 0 ? void 0 : params.accountId,
                                    poolKey: params === null || params === void 0 ? void 0 : params.poolKey,
                                    query: params === null || params === void 0 ? void 0 : params.query,
                                },
                            })];
                        case 1:
                            headers = (_d.sent()).headers;
                            pageSizeRaw = Number((_a = params === null || params === void 0 ? void 0 : params.pageSize) !== null && _a !== void 0 ? _a : 100);
                            pageSize = Number.isFinite(pageSizeRaw) && pageSizeRaw > 0
                                ? Math.min(250, Math.trunc(pageSizeRaw))
                                : 100;
                            maxPagesRaw = Number((_b = params === null || params === void 0 ? void 0 : params.maxPages) !== null && _b !== void 0 ? _b : 10);
                            maxPages = Number.isFinite(maxPagesRaw) && maxPagesRaw > 0
                                ? Math.trunc(maxPagesRaw)
                                : 10;
                            results = [];
                            page = 1;
                            _d.label = 2;
                        case 2:
                            if (!(page <= maxPages)) return [3 /*break*/, 4];
                            return [4 /*yield*/, axios_1.default.get(this.websharePaymentTransactionUrl, {
                                    params: {
                                        page: page,
                                        page_size: pageSize,
                                    },
                                    headers: headers,
                                    timeout: 30000,
                                })];
                        case 3:
                            res = _d.sent();
                            data = ((_c = res.data) !== null && _c !== void 0 ? _c : {});
                            pageResults = Array.isArray(data.results)
                                ? data.results
                                : [];
                            results.push.apply(results, pageResults);
                            if (!data.next || pageResults.length === 0) {
                                return [3 /*break*/, 4];
                            }
                            page += 1;
                            return [3 /*break*/, 2];
                        case 4: return [2 /*return*/, results];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.buildWebshareOrderConfig = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var productId, product, options, exclusivityOption, quantityOption, bandwidthOption, proxyType, proxySubtype, behavior, proxyCountries, proxyReplacementsTotal, mapped, mapped, proxyCount, requestedProxyCountries, bandwidth, distributedCount, query, mode;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            productId = Number(dto.product_id);
                            if (!Number.isFinite(productId) || productId < 1) {
                                throw new common_1.BadRequestException("Invalid product_id: ".concat(dto.product_id));
                            }
                            return [4 /*yield*/, this.repo.findProxyProductById(productId)];
                        case 1:
                            product = _a.sent();
                            if (!product) {
                                throw new common_1.NotFoundException("Product with ID ".concat(productId, " not found"));
                            }
                            return [4 /*yield*/, this.repo.findOptionsByProductId(productId)];
                        case 2:
                            options = _a.sent();
                            exclusivityOption = dto.exclusivity_option_id != null
                                ? options.find(function (o) { return Number(o.id) === Number(dto.exclusivity_option_id); })
                                : null;
                            quantityOption = dto.quantity_option_id != null
                                ? options.find(function (o) { return Number(o.id) === Number(dto.quantity_option_id); })
                                : null;
                            bandwidthOption = dto.bandwidth_option_id != null
                                ? options.find(function (o) { return Number(o.id) === Number(dto.bandwidth_option_id); })
                                : null;
                            proxyType = '';
                            proxySubtype = '';
                            behavior = 'replace';
                            proxyCountries = {
                                ZZ: 1,
                            };
                            proxyReplacementsTotal = 10;
                            if (product.code === 'proxy_server') {
                                mapped = this.mapProxyServerExclusivity(dto.exclusivity_value || (exclusivityOption === null || exclusivityOption === void 0 ? void 0 : exclusivityOption.option_value));
                                if (!mapped) {
                                    throw new common_1.BadRequestException('Missing or invalid exclusivity for proxy_server');
                                }
                                proxyType = mapped.proxy_type;
                                proxySubtype = mapped.proxy_subtype;
                                behavior = 'add';
                            }
                            else if (product.code === 'static_residential') {
                                mapped = this.mapStaticResidentialExclusivity(dto.exclusivity_value || (exclusivityOption === null || exclusivityOption === void 0 ? void 0 : exclusivityOption.option_value));
                                if (!mapped) {
                                    throw new common_1.BadRequestException('Missing or invalid exclusivity for static_residential');
                                }
                                proxyType = mapped.proxy_type;
                                proxySubtype = mapped.proxy_subtype;
                                behavior = 'add';
                            }
                            else if (product.code === 'rotating_residential') {
                                proxyType = 'shared';
                                proxySubtype = 'residential';
                                behavior = 'add';
                                proxyCountries = {};
                                proxyReplacementsTotal = 0;
                            }
                            else {
                                throw new common_1.BadRequestException("Unsupported proxy product for realtime pricing: ".concat(product.code));
                            }
                            proxyCount = dto.quantity_value && dto.quantity_value > 0
                                ? Number(dto.quantity_value)
                                : this.parseOptionNumber(quantityOption === null || quantityOption === void 0 ? void 0 : quantityOption.option_value);
                            requestedProxyCountries = this.normalizeProxyCountriesInput(dto.proxy_countries);
                            bandwidth = dto.bandwidth_value === 0
                                ? 0
                                : dto.bandwidth_value && dto.bandwidth_value > 0
                                    ? Number(dto.bandwidth_value)
                                    : this.parseOptionNumber(bandwidthOption === null || bandwidthOption === void 0 ? void 0 : bandwidthOption.option_value);
                            if (product.code !== 'rotating_residential') {
                                if (requestedProxyCountries) {
                                    distributedCount = this.sumProxyCountries(requestedProxyCountries);
                                    if (proxyCount != null &&
                                        Number.isFinite(proxyCount) &&
                                        proxyCount > 0 &&
                                        distributedCount !== proxyCount) {
                                        throw new common_1.BadRequestException("proxy_countries total (".concat(distributedCount, ") must equal selected quantity (").concat(proxyCount, ")"));
                                    }
                                    proxyCountries = requestedProxyCountries;
                                    proxyCount = distributedCount;
                                }
                                else {
                                    if (!proxyCount) {
                                        throw new common_1.BadRequestException('Missing proxy count for realtime pricing');
                                    }
                                    proxyCountries = { ZZ: proxyCount };
                                }
                            }
                            if (bandwidth == null || !Number.isFinite(bandwidth) || bandwidth < 0) {
                                throw new common_1.BadRequestException('Missing bandwidth for realtime pricing');
                            }
                            query = {
                                proxy_type: proxyType,
                                proxy_subtype: proxySubtype,
                                proxy_countries: proxyCountries,
                                bandwidth_limit: bandwidth,
                                on_demand_refreshes_total: 0,
                                automatic_refresh_frequency: 0,
                                proxy_replacements_total: proxyReplacementsTotal,
                                subusers_total: 3,
                                term: dto.billing_cycle,
                                is_unlimited_ip_authorizations: false,
                                is_high_concurrency: false,
                                is_high_priority_network: false,
                                required_site_checks: [],
                                with_tax: false,
                                behavior: behavior,
                            };
                            mode = product.code === 'rotating_residential' ? 'backbone' : 'direct';
                            return [2 /*return*/, {
                                    product: product,
                                    options: options,
                                    query: query,
                                    proxyCount: proxyCount !== null && proxyCount !== void 0 ? proxyCount : 0,
                                    bandwidth: bandwidth,
                                    mode: mode,
                                    poolKey: this.derivePoolKeyFromQuery(query),
                                }];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.purchaseWebsharePlan = function (query, context, options) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, paymentMethod, _a, _b, headers, credential, res, error_4, token, data, paymentRequired, planId;
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (!this.webshareAutoPurchase) {
                                return [2 /*return*/, { planId: null, paymentRequired: false, raw: null }];
                            }
                            payload = __assign({}, query);
                            paymentMethod = (options === null || options === void 0 ? void 0 : options.paymentMethod) != null
                                ? Number(options.paymentMethod)
                                : Number(this.websharePaymentMethod);
                            if (!(((_c = options === null || options === void 0 ? void 0 : options.autoResolvePaymentMethod) !== null && _c !== void 0 ? _c : true) &&
                                (!Number.isFinite(paymentMethod) || paymentMethod <= 0))) return [3 /*break*/, 2];
                            _a = Number;
                            return [4 /*yield*/, this.getDefaultPaymentMethodId(context)];
                        case 1:
                            paymentMethod = _a.apply(void 0, [_d.sent()]);
                            _d.label = 2;
                        case 2:
                            payload.payment_method =
                                Number.isFinite(paymentMethod) && paymentMethod > 0
                                    ? Math.trunc(paymentMethod)
                                    : null;
                            if (options === null || options === void 0 ? void 0 : options.recaptchaToken) {
                                payload.recaptcha = options.recaptchaToken;
                            }
                            return [4 /*yield*/, this.getWebshareHeaders({
                                    context: __assign(__assign({}, (context !== null && context !== void 0 ? context : {})), { query: query }),
                                })];
                        case 3:
                            _b = _d.sent(), headers = _b.headers, credential = _b.credential;
                            _d.label = 4;
                        case 4:
                            _d.trys.push([4, 6, , 13]);
                            return [4 /*yield*/, axios_1.default.post(this.websharePurchaseUrl, payload, {
                                    headers: headers,
                                    timeout: 120000,
                                })];
                        case 5:
                            res = _d.sent();
                            return [3 /*break*/, 13];
                        case 6:
                            error_4 = _d.sent();
                            if (!((options === null || options === void 0 ? void 0 : options.autoSolveRecaptcha) &&
                                this.isRecaptchaRequiredError(error_4) &&
                                !payload.recaptcha)) return [3 /*break*/, 11];
                            return [4 /*yield*/, this.solveWebshareRecaptchaToken()];
                        case 7:
                            token = _d.sent();
                            if (!token) return [3 /*break*/, 9];
                            payload.recaptcha = token;
                            return [4 /*yield*/, axios_1.default.post(this.websharePurchaseUrl, payload, {
                                    headers: headers,
                                    timeout: 120000,
                                })];
                        case 8:
                            res = _d.sent();
                            return [3 /*break*/, 10];
                        case 9: throw error_4;
                        case 10: return [3 /*break*/, 12];
                        case 11: throw error_4;
                        case 12: return [3 /*break*/, 13];
                        case 13:
                            if (!res) {
                                throw new common_1.BadRequestException('Không thể gọi purchase plan Webshare');
                            }
                            data = res.data;
                            paymentRequired = Boolean(data === null || data === void 0 ? void 0 : data.payment_required);
                            planId = this.getPlanIdFromResponse(data);
                            return [2 /*return*/, {
                                    planId: planId,
                                    paymentRequired: paymentRequired,
                                    raw: data,
                                    account: {
                                        id: credential.accountId,
                                        label: credential.accountLabel,
                                        pool_key: credential.poolKey,
                                        source: credential.source,
                                    },
                                }];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.cancelWebsharePlan = function (planId, context) {
            return __awaiter(this, void 0, void 0, function () {
                var normalizedPlanId, headers, res;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            normalizedPlanId = Number(planId);
                            if (!Number.isFinite(normalizedPlanId) || normalizedPlanId <= 0) {
                                throw new common_1.BadRequestException('Invalid plan_id');
                            }
                            return [4 /*yield*/, this.getWebshareHeaders({ context: context })];
                        case 1:
                            headers = (_b.sent()).headers;
                            return [4 /*yield*/, axios_1.default.post("".concat(this.webshareSubscriptionPlanUrl).concat(Math.trunc(normalizedPlanId), "/cancel/"), {}, {
                                    headers: headers,
                                    timeout: 30000,
                                })];
                        case 2:
                            res = _b.sent();
                            return [2 /*return*/, ((_a = res.data) !== null && _a !== void 0 ? _a : {})];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.createWebshareSubUser = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, url, headers, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            payload = {
                                label: params.label,
                                max_thread_count: Number.isFinite(this.webshareSubuserMaxThreads) &&
                                    this.webshareSubuserMaxThreads > 0
                                    ? this.webshareSubuserMaxThreads
                                    : 500,
                            };
                            if (params.proxyLimit != null && params.proxyLimit >= 0) {
                                payload.proxy_limit = params.proxyLimit;
                            }
                            if (params.bandwidthLimit != null && params.bandwidthLimit >= 0) {
                                payload.bandwidth_limit = params.bandwidthLimit;
                            }
                            if (params.proxyCountries) {
                                payload.proxy_countries = params.proxyCountries;
                            }
                            url = params.planId
                                ? "".concat(this.webshareSubuserUrl, "?plan_id=").concat(params.planId)
                                : this.webshareSubuserUrl;
                            return [4 /*yield*/, this.getWebshareHeaders({
                                    context: {
                                        accountId: params.accountId,
                                        poolKey: params.poolKey,
                                        query: params.query,
                                    },
                                })];
                        case 1:
                            headers = (_a.sent()).headers;
                            return [4 /*yield*/, axios_1.default.post(url, payload, {
                                    headers: headers,
                                    timeout: 30000,
                                })];
                        case 2:
                            res = _a.sent();
                            return [2 /*return*/, res.data];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.deleteWebshareSubUser = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var subuserId, headers;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            subuserId = Number((_a = params.subuserId) !== null && _a !== void 0 ? _a : 0);
                            if (!Number.isFinite(subuserId) || subuserId <= 0) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.getWebshareHeaders({
                                    context: {
                                        accountId: params.accountId,
                                        poolKey: params.poolKey,
                                        query: params.query,
                                    },
                                })];
                        case 1:
                            headers = (_b.sent()).headers;
                            return [4 /*yield*/, axios_1.default.delete("".concat(this.webshareSubuserUrl).concat(subuserId, "/"), {
                                    headers: headers,
                                    timeout: 30000,
                                })];
                        case 2:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.listWebshareSubUsers = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var headers, res, data;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.getWebshareHeaders({
                                context: {
                                    accountId: params === null || params === void 0 ? void 0 : params.accountId,
                                    poolKey: params === null || params === void 0 ? void 0 : params.poolKey,
                                    query: params === null || params === void 0 ? void 0 : params.query,
                                },
                            })];
                        case 1:
                            headers = (_c.sent()).headers;
                            return [4 /*yield*/, axios_1.default.get(this.webshareSubuserUrl, {
                                    params: {
                                        page: (_a = params === null || params === void 0 ? void 0 : params.page) !== null && _a !== void 0 ? _a : 1,
                                        page_size: (_b = params === null || params === void 0 ? void 0 : params.pageSize) !== null && _b !== void 0 ? _b : 100,
                                    },
                                    headers: headers,
                                    timeout: 30000,
                                })];
                        case 2:
                            res = _c.sent();
                            data = res.data;
                            return [2 /*return*/, {
                                    count: this.toNumber(data === null || data === void 0 ? void 0 : data.count),
                                    next: typeof (data === null || data === void 0 ? void 0 : data.next) === 'string' ? data.next : null,
                                    previous: typeof (data === null || data === void 0 ? void 0 : data.previous) === 'string' ? data.previous : null,
                                    results: Array.isArray(data === null || data === void 0 ? void 0 : data.results)
                                        ? data.results
                                        : [],
                                }];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.getWebshareSubUser = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var subuserId, headers, res;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            subuserId = Number((_a = params.subuserId) !== null && _a !== void 0 ? _a : 0);
                            if (!Number.isFinite(subuserId) || subuserId <= 0) {
                                throw new common_1.BadRequestException('Invalid Webshare account identifier');
                            }
                            return [4 /*yield*/, this.getWebshareHeaders({
                                    context: {
                                        accountId: params.accountId,
                                        poolKey: params.poolKey,
                                        query: params.query,
                                    },
                                })];
                        case 1:
                            headers = (_c.sent()).headers;
                            return [4 /*yield*/, axios_1.default.get("".concat(this.webshareSubuserUrl).concat(subuserId, "/"), {
                                    headers: headers,
                                    timeout: 30000,
                                })];
                        case 2:
                            res = _c.sent();
                            return [2 /*return*/, ((_b = res.data) !== null && _b !== void 0 ? _b : {})];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.updateWebshareSubUser = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var subuserId, headers, res;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            subuserId = Number((_a = params.subuserId) !== null && _a !== void 0 ? _a : 0);
                            if (!Number.isFinite(subuserId) || subuserId <= 0) {
                                throw new common_1.BadRequestException('Invalid Webshare account identifier');
                            }
                            return [4 /*yield*/, this.getWebshareHeaders({
                                    context: {
                                        accountId: params.accountId,
                                        poolKey: params.poolKey,
                                        query: params.query,
                                    },
                                })];
                        case 1:
                            headers = (_b.sent()).headers;
                            return [4 /*yield*/, axios_1.default.patch("".concat(this.webshareSubuserUrl).concat(subuserId, "/"), params.payload, {
                                    headers: headers,
                                    timeout: 30000,
                                })];
                        case 2:
                            res = _b.sent();
                            return [2 /*return*/, res.data];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.listWebshareProxies = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var headers, pageSizeRaw, pageSize, maxPagesRaw, maxPages, maxResultsRaw, maxResults, page, results, searchParams, url, res, data, pageResults;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.getWebshareHeaders({
                                context: {
                                    accountId: params.accountId,
                                    poolKey: params.poolKey,
                                    query: params.query,
                                },
                            })];
                        case 1:
                            headers = (_d.sent()).headers;
                            pageSizeRaw = Number((_a = params.pageSize) !== null && _a !== void 0 ? _a : 250);
                            pageSize = Number.isFinite(pageSizeRaw) && pageSizeRaw > 0
                                ? Math.min(250, Math.trunc(pageSizeRaw))
                                : 250;
                            maxPagesRaw = Number((_b = params.maxPages) !== null && _b !== void 0 ? _b : 0);
                            maxPages = Number.isFinite(maxPagesRaw) && maxPagesRaw > 0
                                ? Math.trunc(maxPagesRaw)
                                : null;
                            maxResultsRaw = Number((_c = params.maxResults) !== null && _c !== void 0 ? _c : 0);
                            maxResults = Number.isFinite(maxResultsRaw) && maxResultsRaw > 0
                                ? Math.trunc(maxResultsRaw)
                                : null;
                            page = 1;
                            results = [];
                            _d.label = 2;
                        case 2:
                            if (!true) return [3 /*break*/, 4];
                            searchParams = new URLSearchParams();
                            searchParams.set('mode', params.mode);
                            searchParams.set('page', String(page));
                            searchParams.set('page_size', String(pageSize));
                            if (params.planId) {
                                searchParams.set('plan_id', String(params.planId));
                            }
                            url = "".concat(this.webshareProxyListUrl, "?").concat(searchParams.toString());
                            return [4 /*yield*/, axios_1.default.get(url, {
                                    headers: headers,
                                    timeout: 30000,
                                })];
                        case 3:
                            res = _d.sent();
                            data = res.data;
                            pageResults = Array.isArray(data === null || data === void 0 ? void 0 : data.results)
                                ? data.results
                                : [];
                            results = results.concat(pageResults);
                            if (maxResults && results.length >= maxResults) {
                                results = results.slice(0, maxResults);
                                return [3 /*break*/, 4];
                            }
                            if (!(data === null || data === void 0 ? void 0 : data.next) || pageResults.length === 0)
                                return [3 /*break*/, 4];
                            if (maxPages && page >= maxPages)
                                return [3 /*break*/, 4];
                            page += 1;
                            return [3 /*break*/, 2];
                        case 4: return [2 /*return*/, results];
                    }
                });
            });
        };
        ProxyMasterService_1.prototype.getWebshareProxyListStatus = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var planId, headers, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            planId = Number(params.planId || 0);
                            if (!Number.isFinite(planId) || planId <= 0) {
                                throw new common_1.BadRequestException('Invalid plan_id');
                            }
                            return [4 /*yield*/, this.getWebshareHeaders({
                                    context: {
                                        accountId: params.accountId,
                                        poolKey: params.poolKey,
                                        query: params.query,
                                    },
                                })];
                        case 1:
                            headers = (_a.sent()).headers;
                            return [4 /*yield*/, axios_1.default.get(this.webshareProxyListStatusUrl, {
                                    params: { plan_id: planId },
                                    headers: headers,
                                    timeout: 30000,
                                })];
                        case 2:
                            res = _a.sent();
                            return [2 /*return*/, res.data];
                    }
                });
            });
        };
        return ProxyMasterService_1;
    }());
    __setFunctionName(_classThis, "ProxyMasterService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProxyMasterService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProxyMasterService = _classThis;
}();
exports.ProxyMasterService = ProxyMasterService;
