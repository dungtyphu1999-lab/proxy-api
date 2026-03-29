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
exports.ProxyService = void 0;
var common_1 = require("@nestjs/common");
var crypto_1 = require("crypto");
var axios_1 = require("axios");
var pagination_helpers_1 = require("@/shared/pagination/pagination.helpers");
var error_codes_enum_1 = require("@/shared/constants/error-codes.enum");
var wallet_transaction_util_1 = require("@/shared/utils/wallet-transaction.util");
var RetryableProxyActivationError = /** @class */ (function (_super) {
    __extends(RetryableProxyActivationError, _super);
    function RetryableProxyActivationError(message, details) {
        if (details === void 0) { details = {}; }
        var _this = _super.call(this, message) || this;
        _this.details = details;
        _this.name = 'RetryableProxyActivationError';
        return _this;
    }
    return RetryableProxyActivationError;
}(Error));
var ProxyService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProxyService = _classThis = /** @class */ (function () {
        function ProxyService_1(repo, walletRepository, databaseService, proxyMasterService, webshareConfigService, adminNotificationService) {
            var _a, _b, _c, _d, _e;
            this.repo = repo;
            this.walletRepository = walletRepository;
            this.databaseService = databaseService;
            this.proxyMasterService = proxyMasterService;
            this.webshareConfigService = webshareConfigService;
            this.adminNotificationService = adminNotificationService;
            this.logger = new common_1.Logger(ProxyService.name);
            this.retryDelayMs = (function () {
                var value = Number(process.env.PROXY_PENDING_RETRY_DELAY_MS);
                return Number.isFinite(value) && value > 0 ? Math.trunc(value) : 60 * 1000;
            })();
            this.retryMaxAttempts = (function () {
                var value = Number(process.env.PROXY_PENDING_RETRY_MAX_ATTEMPTS);
                return Number.isFinite(value) && value > 0 ? Math.trunc(value) : 3;
            })();
            this.retryBatchSize = (function () {
                var value = Number(process.env.PROXY_PENDING_RETRY_BATCH_SIZE);
                return Number.isFinite(value) && value > 0 ? Math.trunc(value) : 10;
            })();
            this.liveCheckTimeoutMs = 8000;
            this.liveCheckConcurrency = 5;
            this.liveCheckDefaultLimit = 20;
            this.liveCheckMaxLimit = 50;
            this.liveCheckIpProbeUrl = ((_a = process.env.PROXY_LIVE_CHECK_IP_PROBE_URL) === null || _a === void 0 ? void 0 : _a.trim()) ||
                'http://api.ipify.org?format=json';
            this.liveCheckGeoLookupUrlTemplate = ((_b = process.env.PROXY_LIVE_CHECK_GEO_LOOKUP_URL_TEMPLATE) === null || _b === void 0 ? void 0 : _b.trim()) ||
                'https://ipwho.is/{ip}?fields=success,country_code';
            this.liveCheckUrl = ((_c = process.env.PROXY_LIVE_CHECK_URL) === null || _c === void 0 ? void 0 : _c.trim()) ||
                'https://ipv4.bachhoammo.net/';
            this.rotatingFetchPageSize = (function () {
                var value = Number(process.env.PROXY_ROTATING_FETCH_PAGE_SIZE);
                return Number.isFinite(value) && value > 0 ? Math.trunc(value) : 50;
            })();
            this.rotatingFetchMaxPages = (function () {
                var value = Number(process.env.PROXY_ROTATING_FETCH_MAX_PAGES);
                return Number.isFinite(value) && value > 0 ? Math.trunc(value) : 1;
            })();
            this.rotatingFetchMaxResults = (function () {
                var value = Number(process.env.PROXY_ROTATING_FETCH_MAX_RESULTS);
                return Number.isFinite(value) && value > 0 ? Math.trunc(value) : 50;
            })();
            this.rotatingBackboneHost = ((_d = process.env.PROXY_ROTATING_BACKBONE_HOST) === null || _d === void 0 ? void 0 : _d.trim()) ||
                ((_e = process.env.PROXY_ROTATING_ENDPOINT_HOST) === null || _e === void 0 ? void 0 : _e.trim()) ||
                'p.webshare.io';
            this.autoDowngradeWindowHours = (function () {
                var value = Number(process.env.PROXY_AUTO_DOWNGRADE_WINDOW_HOURS);
                return Number.isFinite(value) && value > 0 ? Math.trunc(value) : 48;
            })();
            this.supportedProxyTypes = [
                'proxy_server',
                'static_residential',
                'rotating_residential',
            ];
        }
        ProxyService_1.prototype.isSupportedProxyType = function (value) {
            return Boolean(value &&
                this.supportedProxyTypes.includes(value));
        };
        ProxyService_1.prototype.toNumber = function (value) {
            var n = Number(value);
            return Number.isFinite(n) ? n : 0;
        };
        ProxyService_1.prototype.ceil = function (value) {
            return Math.ceil(this.toNumber(value));
        };
        ProxyService_1.prototype.normalizeProxyCountriesForFingerprint = function (input) {
            if (!input)
                return null;
            var entries = Object.entries(input)
                .map(function (_a) {
                var rawCode = _a[0], rawQty = _a[1];
                var code = String(rawCode !== null && rawCode !== void 0 ? rawCode : '')
                    .trim()
                    .toUpperCase();
                var qty = Math.trunc(Number(rawQty));
                if (!/^[A-Z]{2}$/.test(code))
                    return null;
                if (!Number.isFinite(qty) || qty <= 0)
                    return null;
                return [code, qty];
            })
                .filter(function (item) { return item != null; })
                .sort(function (_a, _b) {
                var a = _a[0];
                var b = _b[0];
                return a.localeCompare(b);
            });
            if (!entries.length)
                return null;
            return Object.fromEntries(entries);
        };
        ProxyService_1.prototype.buildCreateOrderRequestFingerprint = function (params) {
            var _a, _b;
            var payload = {
                user_id: params.userId,
                amount_total: Math.trunc(Number(params.amount)),
                product_id: Number((_a = params.dto.product_id) !== null && _a !== void 0 ? _a : 0),
                exclusivity_option_id: params.dto.exclusivity_option_id != null
                    ? Number(params.dto.exclusivity_option_id)
                    : null,
                exclusivity_value: params.dto.exclusivity_value != null
                    ? String(params.dto.exclusivity_value)
                        .trim()
                        .toLowerCase()
                    : null,
                quantity_option_id: params.dto.quantity_option_id != null
                    ? Number(params.dto.quantity_option_id)
                    : null,
                quantity_value: params.dto.quantity_value != null ? Number(params.dto.quantity_value) : null,
                proxy_countries: this.normalizeProxyCountriesForFingerprint(params.dto.proxy_countries),
                bandwidth_option_id: params.dto.bandwidth_option_id != null
                    ? Number(params.dto.bandwidth_option_id)
                    : null,
                bandwidth_value: params.dto.bandwidth_value != null
                    ? Number(params.dto.bandwidth_value)
                    : null,
                location_id: params.dto.location_id != null ? Number(params.dto.location_id) : null,
                additional_feature_id: params.dto.additional_feature_id != null
                    ? Number(params.dto.additional_feature_id)
                    : null,
                billing_cycle: String((_b = params.dto.billing_cycle) !== null && _b !== void 0 ? _b : 'monthly'),
                discount_percent: params.dto.discount_percent != null
                    ? Number(params.dto.discount_percent)
                    : null,
            };
            return (0, crypto_1.createHash)('sha256').update(JSON.stringify(payload)).digest('hex');
        };
        ProxyService_1.prototype.getPoolBufferFactor = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    void params;
                    return [2 /*return*/, 1];
                });
            });
        };
        ProxyService_1.prototype.getUserSummary = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var row;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.databaseService
                                .getKnex()('users')
                                .select('email', 'username')
                                .where('id', userId)
                                .first()];
                        case 1:
                            row = _a.sent();
                            return [2 /*return*/, {
                                    email: (row === null || row === void 0 ? void 0 : row.email) == null ? null : String(row.email),
                                    username: (row === null || row === void 0 ? void 0 : row.username) == null ? null : String(row.username),
                                }];
                    }
                });
            });
        };
        ProxyService_1.prototype.getProxyProductLabel = function (value) {
            var normalized = String(value !== null && value !== void 0 ? value : '')
                .trim()
                .toLowerCase();
            if (normalized === 'proxy_server') {
                return 'Proxy máy chủ';
            }
            if (normalized === 'static_residential') {
                return 'Proxy dân cư tĩnh';
            }
            if (normalized === 'rotating_residential') {
                return 'Proxy dân cư xoay';
            }
            return (value === null || value === void 0 ? void 0 : value.trim()) || 'Proxy';
        };
        ProxyService_1.prototype.getProxyOptionLabel = function (params) {
            var _a, _b, _c, _d;
            var poolKey = String((_a = params.poolKey) !== null && _a !== void 0 ? _a : '')
                .trim()
                .toLowerCase();
            switch (poolKey) {
                case 'proxy_server_shared':
                    return 'Shared';
                case 'proxy_server_private':
                    return 'Private';
                case 'proxy_server_dedicated':
                    return 'Dedicated';
                case 'static_residential_shared':
                    return 'Shared ISP';
                case 'static_residential_private':
                    return 'Private ISP';
                case 'static_residential_dedicated':
                    return 'Dedicated ISP';
                case 'rotating_residential':
                    return 'Residential';
                default:
                    break;
            }
            var exclusivity = String((_b = params.exclusivityValue) !== null && _b !== void 0 ? _b : '')
                .trim()
                .toLowerCase();
            if (exclusivity === 'shared')
                return 'Shared';
            if (exclusivity === 'private' || exclusivity === 'semidedicated') {
                return 'Private';
            }
            if (exclusivity === 'dedicated')
                return 'Dedicated';
            var proxyType = String((_c = params.proxyType) !== null && _c !== void 0 ? _c : '')
                .trim()
                .toLowerCase();
            var proxySubtype = String((_d = params.proxySubtype) !== null && _d !== void 0 ? _d : '')
                .trim()
                .toLowerCase();
            if (proxyType === 'shared' && proxySubtype === 'isp')
                return 'Shared ISP';
            if (proxyType === 'semidedicated' && proxySubtype === 'isp') {
                return 'Private ISP';
            }
            if (proxyType === 'dedicated' && proxySubtype === 'isp') {
                return 'Dedicated ISP';
            }
            if (proxyType === 'shared' && proxySubtype === 'residential') {
                return 'Residential';
            }
            if (proxyType === 'shared')
                return 'Shared';
            if (proxyType === 'semidedicated')
                return 'Private';
            if (proxyType === 'dedicated')
                return 'Dedicated';
            return null;
        };
        ProxyService_1.prototype.isWaitingForWebshareAccount = function (message) {
            var normalized = String(message !== null && message !== void 0 ? message : '').trim().toLowerCase();
            return (normalized.includes('thiếu webshare api key') ||
                normalized.includes('không có tài khoản webshare') ||
                normalized.includes('không còn tài khoản webshare') ||
                normalized.includes('chờ gán email webshare'));
        };
        ProxyService_1.prototype.tryReserveCredentialForUserPurchase = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.proxyMasterService.reserveWebshareCredentialForUserPurchase(params)];
                        case 1: return [2 /*return*/, _a.sent()];
                        case 2:
                            error_1 = _a.sent();
                            if (error_1 instanceof common_1.BadRequestException) {
                                this.logger.warn("Reserve Webshare credential skipped for user ".concat(params.userId, ": ").concat(error_1.message));
                                return [2 /*return*/, null];
                            }
                            throw error_1;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ProxyService_1.prototype.ensurePendingOrderCredential = function (order, priceInput) {
            return __awaiter(this, void 0, void 0, function () {
                var orderConfigPreview, requestedPoolKey, resolvedCredential, nextMeta;
                var _a, _b, _c, _d, _e, _f, _g;
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            if (String((_a = order.webshare_account_id) !== null && _a !== void 0 ? _a : '').trim()) {
                                return [2 /*return*/, order];
                            }
                            return [4 /*yield*/, this.proxyMasterService.buildWebshareOrderConfig(priceInput)];
                        case 1:
                            orderConfigPreview = _h.sent();
                            requestedPoolKey = this.proxyMasterService.derivePoolKeyFromQuery(orderConfigPreview.query);
                            return [4 /*yield*/, this.tryReserveCredentialForUserPurchase({
                                    userId: order.user_id,
                                    context: {
                                        poolKey: requestedPoolKey !== null && requestedPoolKey !== void 0 ? requestedPoolKey : undefined,
                                        query: orderConfigPreview.query,
                                        requestedQuantity: Number.isFinite(orderConfigPreview.proxyCount) &&
                                            orderConfigPreview.proxyCount > 0
                                            ? orderConfigPreview.proxyCount
                                            : null,
                                        requestedBandwidthGb: Number.isFinite(orderConfigPreview.bandwidth) &&
                                            orderConfigPreview.bandwidth >= 0
                                            ? orderConfigPreview.bandwidth
                                            : null,
                                        requiresUnlimitedBandwidth: Number((_b = orderConfigPreview.bandwidth) !== null && _b !== void 0 ? _b : 0) === 0,
                                    },
                                })];
                        case 2:
                            resolvedCredential = _h.sent();
                            if (!(resolvedCredential === null || resolvedCredential === void 0 ? void 0 : resolvedCredential.accountId)) {
                                return [2 /*return*/, null];
                            }
                            nextMeta = __assign(__assign({}, ((_c = order.webshare_meta) !== null && _c !== void 0 ? _c : {})), { webshare_account_id: resolvedCredential.accountId, webshare_pool_key: (_e = (_d = resolvedCredential.poolKey) !== null && _d !== void 0 ? _d : requestedPoolKey) !== null && _e !== void 0 ? _e : null, webshare_account_source: resolvedCredential.source });
                            return [2 /*return*/, this.repo.updateProxyOrder(order.id, {
                                    webshare_account_id: resolvedCredential.accountId,
                                    webshare_pool_key: (_g = (_f = resolvedCredential.poolKey) !== null && _f !== void 0 ? _f : requestedPoolKey) !== null && _g !== void 0 ? _g : null,
                                    webshare_meta: nextMeta,
                                    webshare_error: null,
                                })];
                    }
                });
            });
        };
        ProxyService_1.prototype.notifyProxyOrderPurchased = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var user;
                var _a, _b, _c, _d, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0: return [4 /*yield*/, this.getUserSummary(params.order.user_id)];
                        case 1:
                            user = _g.sent();
                            return [4 /*yield*/, this.adminNotificationService.sendProxyOrderPurchasedAlert({
                                    orderId: params.order.id,
                                    userId: params.order.user_id,
                                    userName: user.username,
                                    userEmail: user.email,
                                    mappedWebshareEmail: (_a = params.mappedWebshareEmail) !== null && _a !== void 0 ? _a : null,
                                    productName: this.getProxyProductLabel(params.productCode),
                                    optionName: (_b = params.optionName) !== null && _b !== void 0 ? _b : null,
                                    billingCycle: params.billingCycle,
                                    amountTotalVnd: params.amountTotal,
                                    quantity: (_c = params.requestedQuantity) !== null && _c !== void 0 ? _c : null,
                                    bandwidthGb: (_d = params.requestedBandwidthGb) !== null && _d !== void 0 ? _d : null,
                                    proxyCountries: (_e = params.requestedProxyCountries) !== null && _e !== void 0 ? _e : null,
                                    provisioningAction: (_f = params.provisioningAction) !== null && _f !== void 0 ? _f : 'new_purchase',
                                })];
                        case 2:
                            _g.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ProxyService_1.prototype.notifyProxyOrderActivated = function (order, productCode) {
            return __awaiter(this, void 0, void 0, function () {
                var claimed, user, config, mappedWebshareEmail;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.claimActivationNotification(order.id)];
                        case 1:
                            claimed = _d.sent();
                            if (!claimed) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.getUserSummary(order.user_id)];
                        case 2:
                            user = _d.sent();
                            return [4 /*yield*/, this.webshareConfigService.getConfig()];
                        case 3:
                            config = _d.sent();
                            mappedWebshareEmail = (_b = (_a = config.accounts.find(function (account) { var _a; return account.id === String((_a = order.webshare_account_id) !== null && _a !== void 0 ? _a : '').trim(); })) === null || _a === void 0 ? void 0 : _a.email) !== null && _b !== void 0 ? _b : null;
                            return [4 /*yield*/, this.adminNotificationService.sendProxyOrderActivatedAlert({
                                    orderId: order.id,
                                    userId: order.user_id,
                                    userName: user.username,
                                    userEmail: user.email,
                                    mappedWebshareEmail: mappedWebshareEmail,
                                    productName: this.getProxyProductLabel(productCode),
                                    expiresAt: (_c = order.expires_at) !== null && _c !== void 0 ? _c : null,
                                })];
                        case 4:
                            _d.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ProxyService_1.prototype.getSupersededOrderId = function (order) {
            var _a;
            var meta = ((_a = order.webshare_meta) !== null && _a !== void 0 ? _a : {});
            var candidates = [
                meta.replaced_order_id,
                meta.superseded_order_id,
                meta.upgrade_from_order_id,
            ];
            for (var _i = 0, candidates_1 = candidates; _i < candidates_1.length; _i++) {
                var value = candidates_1[_i];
                var id = String(value !== null && value !== void 0 ? value : '').trim();
                if (id)
                    return id;
            }
            return null;
        };
        ProxyService_1.prototype.finalizeSupersededOrderAfterActivation = function (activeOrder, productCode) {
            return __awaiter(this, void 0, void 0, function () {
                var supersededOrderId, superseded;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            supersededOrderId = this.getSupersededOrderId(activeOrder);
                            if (!supersededOrderId || supersededOrderId === activeOrder.id) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.repo.findProxyOrderByIdAndUserId(supersededOrderId, activeOrder.user_id)];
                        case 1:
                            superseded = _a.sent();
                            if (!superseded)
                                return [2 /*return*/];
                            return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0: return [4 /*yield*/, this.repo.deleteProxiesByOrderId(superseded.id, trx)];
                                            case 1:
                                                _b.sent();
                                                return [4 /*yield*/, this.repo.updateProxyOrder(superseded.id, {
                                                        status: 'expired',
                                                        webshare_status: 'replaced',
                                                        webshare_error: null,
                                                    }, trx)];
                                            case 2:
                                                _b.sent();
                                                return [4 /*yield*/, this.repo.updateProxyOrder(activeOrder.id, {
                                                        webshare_meta: __assign(__assign({}, ((_a = activeOrder.webshare_meta) !== null && _a !== void 0 ? _a : {})), { replaced_order_closed_at: new Date().toISOString(), replaced_order_closed_id: superseded.id }),
                                                    }, trx)];
                                            case 3:
                                                _b.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 2:
                            _a.sent();
                            this.logger.log("Closed superseded ".concat(productCode, " order ").concat(superseded.id, " after activating ").concat(activeOrder.id));
                            return [2 /*return*/];
                    }
                });
            });
        };
        ProxyService_1.prototype.markOrderAutoRenewStatus = function (orderId, currentMeta, nextFields) {
            return __awaiter(this, void 0, void 0, function () {
                var nextMeta;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            nextMeta = __assign(__assign({}, (currentMeta !== null && currentMeta !== void 0 ? currentMeta : {})), nextFields);
                            return [4 /*yield*/, this.repo.updateProxyOrder(orderId, {
                                    webshare_meta: nextMeta,
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ProxyService_1.prototype.disableWebshareAutoRenewForOrder = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var webshareContext, actionAt, error_2, detail;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            webshareContext = this.getWebshareContext({
                                order: params.order,
                                productCode: params.productCode,
                            });
                            if (!webshareContext.accountId) {
                                return [2 /*return*/];
                            }
                            actionAt = new Date().toISOString();
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 4, , 6]);
                            return [4 /*yield*/, this.proxyMasterService.disableWebshareSubscriptionRenewal({
                                    accountId: webshareContext.accountId,
                                    poolKey: webshareContext.poolKey,
                                    query: webshareContext.query,
                                })];
                        case 2:
                            _d.sent();
                            return [4 /*yield*/, this.markOrderAutoRenewStatus(params.order.id, ((_a = params.order.webshare_meta) !== null && _a !== void 0 ? _a : null), {
                                    auto_renew_enabled: false,
                                    auto_renew_disabled_at: actionAt,
                                    auto_renew_disable_error: null,
                                })];
                        case 3:
                            _d.sent();
                            return [3 /*break*/, 6];
                        case 4:
                            error_2 = _d.sent();
                            detail = (_b = this.proxyMasterService.getWebshareErrorMessage(error_2)) !== null && _b !== void 0 ? _b : (error_2 instanceof Error ? error_2.message : 'Không thể tắt auto-renew');
                            this.logger.warn("Disable Webshare auto-renew failed for order ".concat(params.order.id, " / account ").concat(webshareContext.accountId, ": ").concat(detail));
                            return [4 /*yield*/, this.markOrderAutoRenewStatus(params.order.id, ((_c = params.order.webshare_meta) !== null && _c !== void 0 ? _c : null), {
                                    auto_renew_disable_error: detail,
                                    auto_renew_disable_failed_at: actionAt,
                                })];
                        case 5:
                            _d.sent();
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        ProxyService_1.prototype.enforceWebshareAutoRenewOffForAllAccounts = function () {
            return __awaiter(this, void 0, void 0, function () {
                var config, accounts, disabled, failed, _i, accounts_1, account, error_3, detail;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.webshareConfigService.getConfig()];
                        case 1:
                            config = _b.sent();
                            accounts = config.accounts.filter(function (item) {
                                var _a, _b;
                                return item.enabled !== false &&
                                    String((_a = item.id) !== null && _a !== void 0 ? _a : '').trim() &&
                                    String((_b = item.api_key) !== null && _b !== void 0 ? _b : '').trim();
                            });
                            disabled = 0;
                            failed = 0;
                            _i = 0, accounts_1 = accounts;
                            _b.label = 2;
                        case 2:
                            if (!(_i < accounts_1.length)) return [3 /*break*/, 7];
                            account = accounts_1[_i];
                            _b.label = 3;
                        case 3:
                            _b.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.proxyMasterService.disableWebshareSubscriptionRenewal({
                                    accountId: account.id,
                                })];
                        case 4:
                            _b.sent();
                            disabled += 1;
                            return [3 /*break*/, 6];
                        case 5:
                            error_3 = _b.sent();
                            failed += 1;
                            detail = (_a = this.proxyMasterService.getWebshareErrorMessage(error_3)) !== null && _a !== void 0 ? _a : (error_3 instanceof Error ? error_3.message : 'Không thể tắt auto-renew');
                            this.logger.warn("Daily auto-renew enforcement failed for account ".concat(account.id, " (").concat(account.email, "): ").concat(detail));
                            return [3 /*break*/, 6];
                        case 6:
                            _i++;
                            return [3 /*break*/, 2];
                        case 7: return [2 /*return*/, {
                                total: accounts.length,
                                disabled: disabled,
                                failed: failed,
                            }];
                    }
                });
            });
        };
        ProxyService_1.prototype.claimActivationNotification = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var markerAt, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            markerAt = new Date().toISOString();
                            return [4 /*yield*/, this.databaseService
                                    .getKnex()('proxy_orders')
                                    .where('id', orderId)
                                    .whereRaw("(webshare_meta->>'activated_notice_sent_at') IS NULL")
                                    .update({
                                    webshare_meta: this.databaseService
                                        .getKnex()
                                        .raw("jsonb_set(COALESCE(webshare_meta, '{}'::jsonb), '{activated_notice_sent_at}', to_jsonb(?::text), true)", [markerAt]),
                                    updated_at: this.databaseService.getKnex().fn.now(),
                                })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, Number(result) > 0];
                    }
                });
            });
        };
        ProxyService_1.prototype.applyBufferedDemand = function (demand, bufferFactor, mode) {
            void bufferFactor;
            void mode;
            return __assign({}, demand);
        };
        ProxyService_1.prototype.normalizeProxyCountriesInput = function (value) {
            if (!value || typeof value !== 'object' || Array.isArray(value)) {
                return undefined;
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
            return Object.keys(normalized).length > 0 ? normalized : undefined;
        };
        ProxyService_1.prototype.buildPriceInputFromOrder = function (order) {
            var _a, _b, _c, _d, _e, _f, _g;
            var meta = ((_a = order.webshare_meta) !== null && _a !== void 0 ? _a : null);
            var requestedProxyCountries = this.normalizeProxyCountriesInput(meta === null || meta === void 0 ? void 0 : meta.requested_proxy_countries);
            var requestedQuantityValue = Number(meta === null || meta === void 0 ? void 0 : meta.requested_quantity_value);
            var requestedBandwidthValue = Number(meta === null || meta === void 0 ? void 0 : meta.requested_bandwidth_value);
            var requestedExclusivityValueRaw = meta === null || meta === void 0 ? void 0 : meta.requested_exclusivity_value;
            var requestedExclusivityValue = typeof requestedExclusivityValueRaw === 'string'
                ? requestedExclusivityValueRaw.trim()
                : '';
            return {
                product_id: order.product_id,
                exclusivity_option_id: (_b = order.exclusivity_option_id) !== null && _b !== void 0 ? _b : undefined,
                quantity_option_id: (_c = order.quantity_option_id) !== null && _c !== void 0 ? _c : undefined,
                quantity_value: Number.isFinite(requestedQuantityValue) && requestedQuantityValue > 0
                    ? requestedQuantityValue
                    : undefined,
                proxy_countries: requestedProxyCountries,
                bandwidth_option_id: (_d = order.bandwidth_option_id) !== null && _d !== void 0 ? _d : undefined,
                bandwidth_value: Number.isFinite(requestedBandwidthValue) && requestedBandwidthValue >= 0
                    ? requestedBandwidthValue
                    : undefined,
                exclusivity_value: requestedExclusivityValue || undefined,
                location_id: (_e = order.location_id) !== null && _e !== void 0 ? _e : undefined,
                additional_feature_id: (_f = order.additional_feature_id) !== null && _f !== void 0 ? _f : undefined,
                billing_cycle: order.billing_cycle,
                discount_percent: this.toNumber((_g = order.discount_percent) !== null && _g !== void 0 ? _g : 0),
            };
        };
        ProxyService_1.prototype.getOrderPlanId = function (order) {
            var _a, _b, _c;
            var planIdRaw = (_a = order.webshare_plan_id) !== null && _a !== void 0 ? _a : ((_c = (_b = order.webshare_meta) === null || _b === void 0 ? void 0 : _b.plan_id) !== null && _c !== void 0 ? _c : null);
            var planId = Number(planIdRaw);
            return Number.isFinite(planId) && planId > 0 ? planId : null;
        };
        ProxyService_1.prototype.bytesToGb = function (bytes) {
            if (!Number.isFinite(bytes) || bytes <= 0)
                return 0;
            return Number((bytes / (1024 * 1024 * 1024)).toFixed(4));
        };
        ProxyService_1.prototype.derivePoolKeyFromProductCode = function (params) {
            var _a, _b, _c;
            var fromQuery = this.proxyMasterService.derivePoolKeyFromQuery((_a = params.query) !== null && _a !== void 0 ? _a : undefined);
            if (fromQuery)
                return fromQuery;
            var productCode = String((_b = params.productCode) !== null && _b !== void 0 ? _b : '')
                .trim()
                .toLowerCase();
            var exclusivity = String((_c = params.exclusivityValue) !== null && _c !== void 0 ? _c : '')
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
        ProxyService_1.prototype.getPoolProfile = function (poolKey) {
            switch (poolKey) {
                case 'proxy_server_shared':
                    return {
                        productCode: 'proxy_server',
                        query: { proxy_type: 'shared', proxy_subtype: 'default' },
                    };
                case 'proxy_server_private':
                    return {
                        productCode: 'proxy_server',
                        query: { proxy_type: 'semidedicated', proxy_subtype: 'premium' },
                    };
                case 'proxy_server_dedicated':
                    return {
                        productCode: 'proxy_server',
                        query: { proxy_type: 'dedicated', proxy_subtype: 'premium' },
                    };
                case 'static_residential_shared':
                    return {
                        productCode: 'static_residential',
                        query: { proxy_type: 'shared', proxy_subtype: 'isp' },
                    };
                case 'static_residential_private':
                    return {
                        productCode: 'static_residential',
                        query: { proxy_type: 'semidedicated', proxy_subtype: 'isp' },
                    };
                case 'static_residential_dedicated':
                    return {
                        productCode: 'static_residential',
                        query: { proxy_type: 'dedicated', proxy_subtype: 'isp' },
                    };
                case 'rotating_residential':
                    return {
                        productCode: 'rotating_residential',
                        query: { proxy_type: 'shared', proxy_subtype: 'residential' },
                    };
            }
        };
        ProxyService_1.prototype.buildDummyOrderForDemand = function () {
            var now = new Date();
            return {
                id: '__auto_downgrade__',
                user_id: '',
                product_id: 0,
                exclusivity_option_id: null,
                quantity_option_id: null,
                bandwidth_option_id: null,
                location_id: null,
                additional_feature_id: null,
                discount_percent: '0',
                amount_total: '0',
                billing_cycle: 'monthly',
                status: 'pending',
                webshare_plan_id: null,
                webshare_subuser_id: null,
                webshare_status: null,
                webshare_error: null,
                webshare_meta: null,
                webshare_activated_at: null,
                expires_at: null,
                webshare_account_id: null,
                webshare_pool_key: null,
                created_at: now,
                updated_at: now,
            };
        };
        ProxyService_1.prototype.getPlanRenewalDate = function (plan) {
            var _a, _b, _c, _d, _e, _f, _g;
            var explicitRaw = (_d = (_c = (_b = (_a = plan.end_date) !== null && _a !== void 0 ? _a : plan.renewal_date) !== null && _b !== void 0 ? _b : plan.next_renewal_date) !== null && _c !== void 0 ? _c : plan.next_billing_date) !== null && _d !== void 0 ? _d : null;
            if (explicitRaw) {
                var explicitDate = new Date(String(explicitRaw));
                if (!Number.isNaN(explicitDate.getTime())) {
                    return explicitDate;
                }
            }
            var createdAtRaw = (_f = (_e = plan.created_at) !== null && _e !== void 0 ? _e : plan.start_date) !== null && _f !== void 0 ? _f : null;
            if (!createdAtRaw)
                return null;
            var createdAt = new Date(String(createdAtRaw));
            if (Number.isNaN(createdAt.getTime()))
                return null;
            var term = String((_g = plan.term) !== null && _g !== void 0 ? _g : 'monthly')
                .trim()
                .toLowerCase();
            var renewalDate = new Date(createdAt);
            if (term === 'yearly' || term === 'annual') {
                renewalDate.setFullYear(renewalDate.getFullYear() + 1);
            }
            else {
                renewalDate.setMonth(renewalDate.getMonth() + 1);
            }
            return renewalDate;
        };
        ProxyService_1.prototype.isWithinRenewalWindow = function (renewalDate) {
            if (!renewalDate)
                return false;
            var now = Date.now();
            var renewalTime = renewalDate.getTime();
            if (!Number.isFinite(renewalTime) || renewalTime <= now) {
                return false;
            }
            var windowMs = this.autoDowngradeWindowHours * 60 * 60 * 1000;
            return renewalTime - now <= windowMs;
        };
        ProxyService_1.prototype.normalizePlanProxyCountries = function (plan, fallbackProxyCount) {
            var countries = this.normalizeProxyCountriesInput(plan.proxy_countries);
            if (countries)
                return countries;
            if (fallbackProxyCount > 0) {
                return { ZZ: fallbackProxyCount };
            }
            return { ZZ: 1 };
        };
        ProxyService_1.prototype.buildAutoDowngradePayload = function (params) {
            var _a, _b, _c, _d, _e;
            var currentPlan = params.currentPlan;
            var currentProxyCount = Number((_a = currentPlan.proxy_count) !== null && _a !== void 0 ? _a : 0);
            var normalizedCurrentProxyCount = Number.isFinite(currentProxyCount) && currentProxyCount > 0
                ? Math.trunc(currentProxyCount)
                : 1;
            var currentBandwidth = this.parsePlanBandwidthLimit(currentPlan);
            var normalizedTargetBandwidth = params.requiresUnlimitedBandwidth || currentBandwidth.isUnlimited
                ? 0
                : Math.max(1, Math.min(Math.trunc(params.targetBandwidthGb), Math.max(1, Math.trunc(currentBandwidth.valueGb))));
            var currentSubusersTotal = Number((_b = currentPlan.subusers_total) !== null && _b !== void 0 ? _b : 0);
            var targetProxyCount = params.poolKey === 'rotating_residential'
                ? normalizedCurrentProxyCount
                : Math.max(1, Math.min(Math.trunc(params.targetQuantity), normalizedCurrentProxyCount));
            return {
                proxy_count: targetProxyCount,
                proxy_countries: params.poolKey === 'rotating_residential'
                    ? this.normalizePlanProxyCountries(currentPlan, normalizedCurrentProxyCount)
                    : params.proxyCountries,
                bandwidth_limit: normalizedTargetBandwidth,
                on_demand_refreshes_total: Number((_c = currentPlan.on_demand_refreshes_total) !== null && _c !== void 0 ? _c : 0),
                automatic_refresh_frequency: Number((_d = currentPlan.automatic_refresh_frequency) !== null && _d !== void 0 ? _d : 0),
                proxy_replacements_total: Number((_e = currentPlan.proxy_replacements_total) !== null && _e !== void 0 ? _e : 0),
                subusers_total: Math.max(3, params.activeSubusers + 1, Number.isFinite(currentSubusersTotal) && currentSubusersTotal > 0
                    ? Math.min(Math.max(3, params.activeSubusers + 1), Math.trunc(currentSubusersTotal))
                    : 0),
                term: typeof currentPlan.term === 'string' ? currentPlan.term : 'monthly',
                is_unlimited_ip_authorizations: Boolean(currentPlan.is_unlimited_ip_authorizations),
                is_high_concurrency: Boolean(currentPlan.is_high_concurrency),
                is_high_priority_network: Boolean(currentPlan.is_high_priority_network),
                required_site_checks: Array.isArray(currentPlan.required_site_checks)
                    ? currentPlan.required_site_checks
                    : [],
            };
        };
        ProxyService_1.prototype.doesAutoDowngradePayloadReducePlan = function (currentPlan, payload, poolKey) {
            var _a, _b, _c, _d;
            var currentProxyCount = Number((_a = currentPlan.proxy_count) !== null && _a !== void 0 ? _a : 0);
            var nextProxyCount = Number((_b = payload.proxy_count) !== null && _b !== void 0 ? _b : 0);
            if (poolKey !== 'rotating_residential' &&
                Number.isFinite(currentProxyCount) &&
                Number.isFinite(nextProxyCount) &&
                nextProxyCount > 0 &&
                nextProxyCount < currentProxyCount) {
                return true;
            }
            var currentBandwidth = this.parsePlanBandwidthLimit(currentPlan);
            var nextBandwidth = this.parsePlanBandwidthLimit({
                bandwidth_limit: payload.bandwidth_limit,
            });
            if (currentBandwidth.isUnlimited && !nextBandwidth.isUnlimited) {
                return true;
            }
            if (!currentBandwidth.isUnlimited &&
                !nextBandwidth.isUnlimited &&
                nextBandwidth.valueGb > 0 &&
                nextBandwidth.valueGb < currentBandwidth.valueGb) {
                return true;
            }
            var currentSubusers = Number((_c = currentPlan.subusers_total) !== null && _c !== void 0 ? _c : 0);
            var nextSubusers = Number((_d = payload.subusers_total) !== null && _d !== void 0 ? _d : 0);
            if (Number.isFinite(currentSubusers) &&
                Number.isFinite(nextSubusers) &&
                nextSubusers > 0 &&
                nextSubusers < currentSubusers) {
                return true;
            }
            return false;
        };
        ProxyService_1.prototype.getWebshareContext = function (params) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            var meta = ((_b = (_a = params.order) === null || _a === void 0 ? void 0 : _a.webshare_meta) !== null && _b !== void 0 ? _b : null);
            var accountId = String((_e = (_d = (_c = params.order) === null || _c === void 0 ? void 0 : _c.webshare_account_id) !== null && _d !== void 0 ? _d : meta === null || meta === void 0 ? void 0 : meta.webshare_account_id) !== null && _e !== void 0 ? _e : '')
                .trim();
            var requestedExclusivityValue = String((_f = meta === null || meta === void 0 ? void 0 : meta.requested_exclusivity_value) !== null && _f !== void 0 ? _f : '').trim();
            var requestedProxyType = String((_g = meta === null || meta === void 0 ? void 0 : meta.requested_proxy_type) !== null && _g !== void 0 ? _g : '')
                .trim()
                .toLowerCase();
            var requestedProxySubtype = String((_h = meta === null || meta === void 0 ? void 0 : meta.requested_proxy_subtype) !== null && _h !== void 0 ? _h : '')
                .trim()
                .toLowerCase();
            var fallbackQuery = requestedProxyType && requestedProxySubtype
                ? {
                    proxy_type: requestedProxyType,
                    proxy_subtype: requestedProxySubtype,
                }
                : undefined;
            var query = (_j = params.query) !== null && _j !== void 0 ? _j : fallbackQuery;
            var poolKeyFromMeta = this.proxyMasterService.derivePoolKeyFromQuery({
                proxy_type: String((_k = meta === null || meta === void 0 ? void 0 : meta.requested_proxy_type) !== null && _k !== void 0 ? _k : '').trim().toLowerCase(),
                proxy_subtype: String((_l = meta === null || meta === void 0 ? void 0 : meta.requested_proxy_subtype) !== null && _l !== void 0 ? _l : '')
                    .trim()
                    .toLowerCase(),
            });
            var poolKeyFromStoredString = this.proxyMasterService.derivePoolKeyFromQuery((function () {
                var _a, _b, _c, _d;
                var storedPool = String((_c = (_b = (_a = params.order) === null || _a === void 0 ? void 0 : _a.webshare_pool_key) !== null && _b !== void 0 ? _b : meta === null || meta === void 0 ? void 0 : meta.webshare_pool_key) !== null && _c !== void 0 ? _c : '').trim() ||
                    String((_d = meta === null || meta === void 0 ? void 0 : meta.requested_pool_key) !== null && _d !== void 0 ? _d : '').trim();
                if (!storedPool)
                    return undefined;
                switch (storedPool) {
                    case 'proxy_server_shared':
                        return { proxy_type: 'shared', proxy_subtype: 'default' };
                    case 'proxy_server_private':
                        return { proxy_type: 'semidedicated', proxy_subtype: 'premium' };
                    case 'proxy_server_dedicated':
                        return { proxy_type: 'dedicated', proxy_subtype: 'premium' };
                    case 'static_residential_shared':
                        return { proxy_type: 'shared', proxy_subtype: 'isp' };
                    case 'static_residential_private':
                        return { proxy_type: 'semidedicated', proxy_subtype: 'isp' };
                    case 'static_residential_dedicated':
                        return { proxy_type: 'dedicated', proxy_subtype: 'isp' };
                    case 'rotating_residential':
                        return { proxy_type: 'shared', proxy_subtype: 'residential' };
                    default:
                        return undefined;
                }
            })());
            var poolKeyRaw = poolKeyFromStoredString ||
                poolKeyFromMeta ||
                this.derivePoolKeyFromProductCode({
                    productCode: params.productCode,
                    exclusivityValue: requestedExclusivityValue,
                    query: query,
                }) ||
                null;
            return {
                accountId: accountId || undefined,
                poolKey: poolKeyRaw || undefined,
                query: query !== null && query !== void 0 ? query : undefined,
            };
        };
        ProxyService_1.prototype.mapWebshareProxyListToRows = function (proxyList, proxyType, proxyOrderId, fallbackAddress) {
            var pickString = function (value) {
                return typeof value === 'string' ? value : '';
            };
            var pickNumber = function (value) {
                return typeof value === 'number' ? value : Number(value || 0);
            };
            var pickDate = function (value) {
                if (!value)
                    return null;
                var dt = new Date(String(value));
                return Number.isNaN(dt.getTime()) ? null : dt;
            };
            return proxyList
                .map(function (p) {
                var _a, _b, _c;
                return ({
                    proxy_order_id: proxyOrderId !== null && proxyOrderId !== void 0 ? proxyOrderId : null,
                    address: pickString(p.proxy_address) ||
                        pickString(p.address) ||
                        (fallbackAddress !== null && fallbackAddress !== void 0 ? fallbackAddress : ''),
                    port: pickNumber(p.port),
                    username: pickString(p.username),
                    password: pickString(p.password),
                    country_code: pickString(p.country_code).toUpperCase(),
                    city: pickString(p.city_name) || pickString(p.city) || null,
                    status: p.valid === false ? 'inactive' : 'active',
                    proxy_type: proxyType,
                    last_checked_at: (_c = (_b = (_a = pickDate(p.last_checked_at)) !== null && _a !== void 0 ? _a : pickDate(p.last_checked)) !== null && _b !== void 0 ? _b : pickDate(p.last_verification)) !== null && _c !== void 0 ? _c : pickDate(p.checked_at),
                });
            })
                .filter(function (p) { return p.address && p.port && p.username && p.password; });
        };
        ProxyService_1.prototype.buildProxyCountryDistribution = function (proxies) {
            var _a, _b;
            var distribution = {};
            for (var _i = 0, proxies_1 = proxies; _i < proxies_1.length; _i++) {
                var proxy = proxies_1[_i];
                var code = String((_a = proxy.country_code) !== null && _a !== void 0 ? _a : '')
                    .trim()
                    .toUpperCase();
                if (!/^[A-Z]{2}$/.test(code))
                    continue;
                distribution[code] = ((_b = distribution[code]) !== null && _b !== void 0 ? _b : 0) + 1;
            }
            return distribution;
        };
        ProxyService_1.prototype.syncWebshareProxiesByType = function (userId, proxyType) {
            return __awaiter(this, void 0, void 0, function () {
                var activeOrders, hasClearedLegacyRows, _loop_1, this_1, _i, activeOrders_1, order;
                var _this = this;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.isSupportedProxyType(proxyType)) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.repo.findActiveOrdersByUserAndProductCode(userId, proxyType)];
                        case 1:
                            activeOrders = _b.sent();
                            if (!activeOrders.length) {
                                return [2 /*return*/];
                            }
                            hasClearedLegacyRows = false;
                            _loop_1 = function (order) {
                                var planId, mode, webshareContext, rotatingFetchOptions, proxyList, mapped_1, syncedProxyCountries, nextMeta_1, error_4;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            planId = this_1.getOrderPlanId(order);
                                            mode = proxyType === 'rotating_residential' ? 'backbone' : 'direct';
                                            _c.label = 1;
                                        case 1:
                                            _c.trys.push([1, 4, , 5]);
                                            webshareContext = this_1.getWebshareContext({
                                                order: order,
                                                productCode: proxyType,
                                            });
                                            rotatingFetchOptions = proxyType === 'rotating_residential'
                                                ? {
                                                    pageSize: this_1.rotatingFetchPageSize,
                                                    maxPages: this_1.rotatingFetchMaxPages,
                                                    maxResults: this_1.rotatingFetchMaxResults,
                                                }
                                                : {};
                                            return [4 /*yield*/, this_1.proxyMasterService.listWebshareProxies(__assign({ mode: mode, planId: planId, accountId: webshareContext.accountId, poolKey: webshareContext.poolKey, query: webshareContext.query }, rotatingFetchOptions))];
                                        case 2:
                                            proxyList = _c.sent();
                                            mapped_1 = this_1.mapWebshareProxyListToRows(proxyList, proxyType, order.id, mode === 'backbone' ? this_1.rotatingBackboneHost : undefined);
                                            if (!mapped_1.length) {
                                                return [2 /*return*/, "continue"];
                                            }
                                            syncedProxyCountries = this_1.buildProxyCountryDistribution(mapped_1);
                                            nextMeta_1 = __assign(__assign({}, ((_a = order.webshare_meta) !== null && _a !== void 0 ? _a : {})), { synced_proxy_count: mapped_1.length, synced_proxy_countries: syncedProxyCountries });
                                            return [4 /*yield*/, this_1.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        switch (_a.label) {
                                                            case 0:
                                                                if (!!hasClearedLegacyRows) return [3 /*break*/, 2];
                                                                return [4 /*yield*/, this.repo.deleteLegacyProxiesWithoutOrderByUserAndType(userId, proxyType, trx)];
                                                            case 1:
                                                                _a.sent();
                                                                _a.label = 2;
                                                            case 2: return [4 /*yield*/, this.repo.deleteProxiesByOrderId(order.id, trx)];
                                                            case 3:
                                                                _a.sent();
                                                                return [4 /*yield*/, this.repo.upsertUserProxies(userId, mapped_1, trx)];
                                                            case 4:
                                                                _a.sent();
                                                                return [4 /*yield*/, this.repo.updateProxyOrder(order.id, {
                                                                        webshare_meta: nextMeta_1,
                                                                        webshare_error: null,
                                                                    }, trx)];
                                                            case 5:
                                                                _a.sent();
                                                                return [2 /*return*/];
                                                        }
                                                    });
                                                }); })];
                                        case 3:
                                            _c.sent();
                                            hasClearedLegacyRows = true;
                                            return [3 /*break*/, 5];
                                        case 4:
                                            error_4 = _c.sent();
                                            this_1.logger.warn("Sync ".concat(proxyType, " failed for order ").concat(order.id, ": ").concat(error_4 instanceof Error ? error_4.message : String(error_4)));
                                            return [3 /*break*/, 5];
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            };
                            this_1 = this;
                            _i = 0, activeOrders_1 = activeOrders;
                            _b.label = 2;
                        case 2:
                            if (!(_i < activeOrders_1.length)) return [3 /*break*/, 5];
                            order = activeOrders_1[_i];
                            return [5 /*yield**/, _loop_1(order)];
                        case 3:
                            _b.sent();
                            _b.label = 4;
                        case 4:
                            _i++;
                            return [3 /*break*/, 2];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        ProxyService_1.prototype.syncWebshareProxies = function (userId, proxyType) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, type;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.isSupportedProxyType(proxyType)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.syncWebshareProxiesByType(userId, proxyType)];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                        case 2:
                            _i = 0, _a = this.supportedProxyTypes;
                            _b.label = 3;
                        case 3:
                            if (!(_i < _a.length)) return [3 /*break*/, 6];
                            type = _a[_i];
                            return [4 /*yield*/, this.syncWebshareProxiesByType(userId, type)];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5:
                            _i++;
                            return [3 /*break*/, 3];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        ProxyService_1.prototype.resolveOrderFilter = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var rawOrderId, order, orderProductCode;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            rawOrderId = String((_a = params.orderId) !== null && _a !== void 0 ? _a : '').trim();
                            if (!rawOrderId) {
                                return [2 /*return*/, { order: null, proxyType: params.proxyType }];
                            }
                            return [4 /*yield*/, this.repo.findProxyOrderByIdAndUserId(rawOrderId, params.userId)];
                        case 1:
                            order = _c.sent();
                            if (!order) {
                                throw new common_1.NotFoundException('Không tìm thấy đơn proxy');
                            }
                            return [4 /*yield*/, this.repo.findProxyProductCodeById(Number(order.product_id))];
                        case 2:
                            orderProductCode = _c.sent();
                            if (!orderProductCode || !this.isSupportedProxyType(orderProductCode)) {
                                throw new common_1.BadRequestException('Đơn proxy không hợp lệ');
                            }
                            if (params.proxyType && params.proxyType !== orderProductCode) {
                                throw new common_1.BadRequestException('order_id không khớp với loại proxy đang truy cập');
                            }
                            return [2 /*return*/, { order: order, proxyType: (_b = params.proxyType) !== null && _b !== void 0 ? _b : orderProductCode }];
                    }
                });
            });
        };
        ProxyService_1.prototype.runWithConcurrency = function (items, concurrency, worker) {
            return __awaiter(this, void 0, void 0, function () {
                var results, idx, limit, runners;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (items.length === 0)
                                return [2 /*return*/, []];
                            results = new Array(items.length);
                            idx = 0;
                            limit = Math.max(1, concurrency);
                            runners = Array.from({ length: Math.min(limit, items.length) }).map(function () { return __awaiter(_this, void 0, void 0, function () {
                                var current, _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            if (!(idx < items.length)) return [3 /*break*/, 2];
                                            current = idx;
                                            idx += 1;
                                            _a = results;
                                            _b = current;
                                            return [4 /*yield*/, worker(items[current], current)];
                                        case 1:
                                            _a[_b] = _c.sent();
                                            return [3 /*break*/, 0];
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [4 /*yield*/, Promise.all(runners)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, results];
                    }
                });
            });
        };
        ProxyService_1.prototype.getProxyCheckError = function (error) {
            if (this.isTlsProtocolError(error)) {
                return 'TLS handshake failed (EPROTO). Proxy có thể chỉ hỗ trợ HTTP hoặc không hỗ trợ CONNECT cho HTTPS.';
            }
            if (error instanceof Error && error.message)
                return error.message;
            return 'Unknown error';
        };
        ProxyService_1.prototype.isTlsProtocolError = function (error) {
            if (!(error instanceof Error))
                return false;
            var message = "".concat(error.name, " ").concat(error.message).toLowerCase();
            return (message.includes('eproto') ||
                message.includes('tls_get_more_records') ||
                message.includes('packet length too long') ||
                message.includes('ssl routines'));
        };
        ProxyService_1.prototype.isLikelyHttpProxyFailure = function (error) {
            if (!(error instanceof Error))
                return false;
            var message = "".concat(error.name, " ").concat(error.message).toLowerCase();
            return (this.isTlsProtocolError(error) ||
                message.includes('socket hang up') ||
                message.includes('read econnreset') ||
                message.includes('proxy connection ended') ||
                message.includes('tunneling socket could not be established'));
        };
        ProxyService_1.prototype.normalizeProxyProtocol = function (value) {
            var raw = String(value !== null && value !== void 0 ? value : '')
                .trim()
                .toLowerCase();
            if (raw === 'http' || raw === 'socks5' || raw === 'auto')
                return raw;
            return 'auto';
        };
        ProxyService_1.prototype.buildAxiosProxyConfig = function (params) {
            var _a, _b, _c, _d;
            var baseConfig = {
                timeout: params.timeout,
                validateStatus: function () { return true; },
            };
            if (params.protocol === 'socks5') {
                var SocksProxyAgentCtor = this.getSocksProxyAgentCtor();
                if (!SocksProxyAgentCtor) {
                    throw new common_1.BadRequestException('SOCKS5 proxy check requires socks-proxy-agent package');
                }
                var userInfo = params.username || params.password
                    ? "".concat(encodeURIComponent((_a = params.username) !== null && _a !== void 0 ? _a : ''), ":").concat(encodeURIComponent((_b = params.password) !== null && _b !== void 0 ? _b : ''), "@")
                    : '';
                var proxyUrl = "socks5://".concat(userInfo).concat(params.address, ":").concat(params.port);
                var agent = new SocksProxyAgentCtor(proxyUrl);
                return __assign(__assign({}, baseConfig), { proxy: false, httpAgent: agent, httpsAgent: agent });
            }
            return __assign(__assign({}, baseConfig), { proxy: params.username || params.password
                    ? {
                        host: params.address,
                        port: params.port,
                        auth: {
                            username: (_c = params.username) !== null && _c !== void 0 ? _c : '',
                            password: (_d = params.password) !== null && _d !== void 0 ? _d : '',
                        },
                    }
                    : {
                        host: params.address,
                        port: params.port,
                    } });
        };
        ProxyService_1.prototype.getSocksProxyAgentCtor = function () {
            if (this.socksProxyAgentCtor !== undefined) {
                return this.socksProxyAgentCtor;
            }
            try {
                var socksModule = require('socks-proxy-agent');
                if (typeof socksModule.SocksProxyAgent === 'function') {
                    this.socksProxyAgentCtor = socksModule.SocksProxyAgent;
                    return this.socksProxyAgentCtor;
                }
            }
            catch (_a) {
                this.socksProxyAgentCtor = null;
                return this.socksProxyAgentCtor;
            }
            this.socksProxyAgentCtor = null;
            return this.socksProxyAgentCtor;
        };
        ProxyService_1.prototype.isProxyAuthFailureStatus = function (status) {
            return status === 401 || status === 407;
        };
        ProxyService_1.prototype.runSingleProxyCheck = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var requestConfig, tryRequest, extractPublicIpFromData, lookupCountryCodeByIp, detectPublicInfo, error, publicInfo, err_1, fallbackUrl, fallbackError, publicInfo, fallbackErr_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            requestConfig = this.buildAxiosProxyConfig({
                                protocol: params.protocol,
                                timeout: params.timeout,
                                address: params.address,
                                port: params.port,
                                username: params.username,
                                password: params.password,
                            });
                            tryRequest = function (url) { return __awaiter(_this, void 0, void 0, function () {
                                var res, statusCode;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, axios_1.default.get(url, requestConfig)];
                                        case 1:
                                            res = _a.sent();
                                            statusCode = Number(res.status);
                                            if (!Number.isFinite(statusCode) || statusCode < 100 || statusCode > 599) {
                                                return [2 /*return*/, 'Invalid HTTP status'];
                                            }
                                            // Check-live focuses on proxy reachability.
                                            // Any HTTP response from target is treated as live,
                                            // except explicit proxy auth failures.
                                            if (this.isProxyAuthFailureStatus(statusCode)) {
                                                return [2 /*return*/, "HTTP ".concat(statusCode, " (proxy authentication failed)")];
                                            }
                                            return [2 /*return*/, null];
                                    }
                                });
                            }); };
                            extractPublicIpFromData = function (payload) {
                                var ipRegex = /\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/;
                                if (typeof payload === 'string') {
                                    var matched = payload.match(ipRegex);
                                    return matched ? matched[0] : null;
                                }
                                if (payload && typeof payload === 'object') {
                                    var obj = payload;
                                    var candidates = ['ip', 'query', 'origin', 'address'];
                                    for (var _i = 0, candidates_2 = candidates; _i < candidates_2.length; _i++) {
                                        var key = candidates_2[_i];
                                        var value = obj[key];
                                        if (typeof value !== 'string')
                                            continue;
                                        var matched = value.match(ipRegex);
                                        if (matched)
                                            return matched[0];
                                    }
                                }
                                return null;
                            };
                            lookupCountryCodeByIp = function (ip) { return __awaiter(_this, void 0, void 0, function () {
                                var geoUrl, geoRes, data, candidate, normalized, _a;
                                var _b, _c, _d;
                                return __generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            _e.trys.push([0, 2, , 3]);
                                            geoUrl = this.liveCheckGeoLookupUrlTemplate.replace('{ip}', ip);
                                            return [4 /*yield*/, axios_1.default.get(geoUrl, {
                                                    timeout: Math.min(params.timeout, 6000),
                                                    validateStatus: function () { return true; },
                                                })];
                                        case 1:
                                            geoRes = _e.sent();
                                            if (geoRes.status < 200 || geoRes.status >= 300)
                                                return [2 /*return*/, null];
                                            data = geoRes.data;
                                            candidate = (_d = ((_c = (_b = data === null || data === void 0 ? void 0 : data.country_code) !== null && _b !== void 0 ? _b : data === null || data === void 0 ? void 0 : data.countryCode) !== null && _c !== void 0 ? _c : null)) === null || _d === void 0 ? void 0 : _d.toString();
                                            if (!candidate)
                                                return [2 /*return*/, null];
                                            normalized = candidate.trim().toUpperCase();
                                            return [2 /*return*/, /^[A-Z]{2}$/.test(normalized) ? normalized : null];
                                        case 2:
                                            _a = _e.sent();
                                            return [2 /*return*/, null];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); };
                            detectPublicInfo = function () { return __awaiter(_this, void 0, void 0, function () {
                                var ipRes, publicIp, countryCode, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            _b.trys.push([0, 3, , 4]);
                                            return [4 /*yield*/, axios_1.default.get(this.liveCheckIpProbeUrl, __assign(__assign({}, requestConfig), { validateStatus: function () { return true; } }))];
                                        case 1:
                                            ipRes = _b.sent();
                                            if (ipRes.status < 200 || ipRes.status >= 300) {
                                                return [2 /*return*/, { public_ip: null, country_code: null }];
                                            }
                                            publicIp = extractPublicIpFromData(ipRes.data);
                                            if (!publicIp)
                                                return [2 /*return*/, { public_ip: null, country_code: null }];
                                            return [4 /*yield*/, lookupCountryCodeByIp(publicIp)];
                                        case 2:
                                            countryCode = _b.sent();
                                            return [2 /*return*/, { public_ip: publicIp, country_code: countryCode }];
                                        case 3:
                                            _a = _b.sent();
                                            return [2 /*return*/, { public_ip: null, country_code: null }];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 5, , 12]);
                            return [4 /*yield*/, tryRequest(params.testUrl)];
                        case 2:
                            error = _a.sent();
                            if (!!error) return [3 /*break*/, 4];
                            return [4 /*yield*/, detectPublicInfo()];
                        case 3:
                            publicInfo = _a.sent();
                            return [2 /*return*/, __assign({ status: 'active', error: null }, publicInfo)];
                        case 4: return [2 /*return*/, { status: 'dead', error: error, public_ip: null, country_code: null }];
                        case 5:
                            err_1 = _a.sent();
                            if (!(params.protocol === 'http' &&
                                params.testUrl.startsWith('https://') &&
                                this.isTlsProtocolError(err_1))) return [3 /*break*/, 11];
                            fallbackUrl = "http://".concat(params.testUrl.slice('https://'.length));
                            _a.label = 6;
                        case 6:
                            _a.trys.push([6, 10, , 11]);
                            return [4 /*yield*/, tryRequest(fallbackUrl)];
                        case 7:
                            fallbackError = _a.sent();
                            if (!!fallbackError) return [3 /*break*/, 9];
                            return [4 /*yield*/, detectPublicInfo()];
                        case 8:
                            publicInfo = _a.sent();
                            return [2 /*return*/, __assign({ status: 'active', error: null }, publicInfo)];
                        case 9: return [2 /*return*/, {
                                status: 'dead',
                                error: fallbackError,
                                public_ip: null,
                                country_code: null,
                            }];
                        case 10:
                            fallbackErr_1 = _a.sent();
                            return [2 /*return*/, {
                                    status: 'dead',
                                    error: this.getProxyCheckError(fallbackErr_1),
                                    public_ip: null,
                                    country_code: null,
                                }];
                        case 11: return [2 /*return*/, {
                                status: 'dead',
                                error: this.getProxyCheckError(err_1),
                                public_ip: null,
                                country_code: null,
                            }];
                        case 12: return [2 /*return*/];
                    }
                });
            });
        };
        ProxyService_1.prototype.getRetryCount = function (order) {
            var _a;
            var meta = ((_a = order.webshare_meta) !== null && _a !== void 0 ? _a : {});
            var retry = meta.retry;
            var count = retry === null || retry === void 0 ? void 0 : retry.count;
            return typeof count === 'number' && Number.isFinite(count) && count >= 0
                ? count
                : 0;
        };
        ProxyService_1.prototype.getRetryCode = function (order) {
            var _a, _b;
            var meta = ((_a = order.webshare_meta) !== null && _a !== void 0 ? _a : {});
            var retry = meta.retry;
            var code = String((_b = retry === null || retry === void 0 ? void 0 : retry.code) !== null && _b !== void 0 ? _b : '')
                .trim()
                .toLowerCase();
            return code || null;
        };
        ProxyService_1.prototype.getOrderProvisioningAction = function (order) {
            var _a, _b;
            var meta = ((_a = order.webshare_meta) !== null && _a !== void 0 ? _a : {});
            var action = String((_b = meta.provisioning_action) !== null && _b !== void 0 ? _b : '')
                .trim()
                .toLowerCase();
            return action === 'update' ? 'update' : 'new_purchase';
        };
        ProxyService_1.prototype.shouldPauseRetry = function (order) {
            var code = this.getRetryCode(order);
            // `proxy_not_ready` có thể tự hồi phục sau vài phút, không nên pause vĩnh viễn.
            if (code === 'proxy_not_ready')
                return false;
            return true;
        };
        ProxyService_1.prototype.buildRetryMeta = function (order, message, code) {
            var _a;
            var meta = ((_a = order.webshare_meta) !== null && _a !== void 0 ? _a : {});
            var retry = meta.retry;
            var count = typeof (retry === null || retry === void 0 ? void 0 : retry.count) === 'number' && Number.isFinite(retry.count)
                ? retry.count
                : 0;
            return __assign(__assign({}, meta), { retry: {
                    count: count + 1,
                    last_attempt_at: new Date().toISOString(),
                    reason: message,
                    code: code,
                    paused: (retry === null || retry === void 0 ? void 0 : retry.paused) === true,
                } });
        };
        ProxyService_1.prototype.isRetryPaused = function (order) {
            var _a;
            var meta = ((_a = order.webshare_meta) !== null && _a !== void 0 ? _a : {});
            var retry = meta.retry;
            return (retry === null || retry === void 0 ? void 0 : retry.paused) === true;
        };
        ProxyService_1.prototype.clearRetryMeta = function (order) {
            var _a;
            var meta = ((_a = order.webshare_meta) !== null && _a !== void 0 ? _a : {});
            var retryRaw = meta.retry;
            var nextMeta = __assign({}, meta);
            nextMeta.retry = __assign(__assign({}, (retryRaw !== null && retryRaw !== void 0 ? retryRaw : {})), { count: 0, paused: false, recovered_at: new Date().toISOString() });
            return nextMeta;
        };
        ProxyService_1.prototype.calculateOrderExpiry = function (order) {
            var _a;
            var now = new Date();
            var base = order.expires_at && new Date(order.expires_at).getTime() > now.getTime()
                ? new Date(order.expires_at)
                : now;
            var next = new Date(base);
            var cycle = String((_a = order.billing_cycle) !== null && _a !== void 0 ? _a : 'monthly')
                .trim()
                .toLowerCase();
            if (cycle === 'yearly' || cycle === 'annual') {
                next.setFullYear(next.getFullYear() + 1);
                return next;
            }
            next.setMonth(next.getMonth() + 1);
            return next;
        };
        ProxyService_1.prototype.markOrderPending = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var meta, updatedMeta;
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                return __generator(this, function (_k) {
                    meta = (_b = (_a = params.webshareMeta) !== null && _a !== void 0 ? _a : params.order.webshare_meta) !== null && _b !== void 0 ? _b : null;
                    updatedMeta = this.buildRetryMeta(__assign(__assign({}, params.order), { webshare_meta: meta }), params.message, params.code);
                    return [2 /*return*/, this.repo.updateProxyOrder(params.order.id, {
                            status: 'pending',
                            webshare_plan_id: (_d = (_c = params.planId) !== null && _c !== void 0 ? _c : params.order.webshare_plan_id) !== null && _d !== void 0 ? _d : null,
                            webshare_subuser_id: null,
                            webshare_account_id: String((_f = (_e = updatedMeta === null || updatedMeta === void 0 ? void 0 : updatedMeta.webshare_account_id) !== null && _e !== void 0 ? _e : params.order.webshare_account_id) !== null && _f !== void 0 ? _f : '').trim() || null,
                            webshare_pool_key: String((_h = (_g = updatedMeta === null || updatedMeta === void 0 ? void 0 : updatedMeta.webshare_pool_key) !== null && _g !== void 0 ? _g : params.order.webshare_pool_key) !== null && _h !== void 0 ? _h : '').trim() || null,
                            webshare_status: 'pending',
                            webshare_error: params.message,
                            webshare_meta: updatedMeta,
                            expires_at: (_j = params.order.expires_at) !== null && _j !== void 0 ? _j : this.calculateOrderExpiry(params.order),
                        })];
                });
            });
        };
        ProxyService_1.prototype.refundProxyOrder = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var amount;
                var _this = this;
                var _a;
                return __generator(this, function (_b) {
                    if (params.order.status === 'refunded') {
                        return [2 /*return*/, params.order];
                    }
                    amount = this.toNumber((_a = params.order.amount_total) !== null && _a !== void 0 ? _a : 0);
                    return [2 /*return*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                            var wallet, _a, refundTransactionNumber;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!(params.walletId != null)) return [3 /*break*/, 1];
                                        _a = { id: params.walletId };
                                        return [3 /*break*/, 3];
                                    case 1: return [4 /*yield*/, this.walletRepository.findByUserId(params.order.user_id, trx)];
                                    case 2:
                                        _a = _b.sent();
                                        _b.label = 3;
                                    case 3:
                                        wallet = _a;
                                        if (!(wallet === null || wallet === void 0 ? void 0 : wallet.id)) return [3 /*break*/, 6];
                                        return [4 /*yield*/, this.walletRepository.incrementBalance(trx, wallet.id, {
                                                deposit_balance: amount,
                                            })];
                                    case 4:
                                        _b.sent();
                                        refundTransactionNumber = (0, wallet_transaction_util_1.generateTransactionNumber)();
                                        return [4 /*yield*/, trx('wallet_transactions').insert({
                                                transaction_number: refundTransactionNumber,
                                                wallet_id: wallet.id,
                                                user_id: params.order.user_id,
                                                type: 'refund',
                                                method: 'wallet',
                                                amount: amount,
                                                fee_amount: 0,
                                                status: 'success',
                                                reference_code: params.order.id,
                                                note: "Ho\u00E0n ti\u1EC1n proxy: ".concat(params.reason),
                                                created_at: new Date(),
                                                completed_at: new Date(),
                                            })];
                                    case 5:
                                        _b.sent();
                                        _b.label = 6;
                                    case 6: return [4 /*yield*/, this.repo.createProxyTransaction({
                                            proxy_order_id: params.order.id,
                                            type: 'refund',
                                            amount: amount,
                                            currency: 'VND',
                                            status: 'success',
                                            paid_at: new Date(),
                                            metadata: {
                                                reason: params.reason,
                                            },
                                        }, trx)];
                                    case 7:
                                        _b.sent();
                                        return [2 /*return*/, this.repo.updateProxyOrder(params.order.id, {
                                                status: 'refunded',
                                                webshare_status: 'failed',
                                                webshare_error: params.reason,
                                            }, trx)];
                                }
                            });
                        }); })];
                });
            });
        };
        ProxyService_1.prototype.isPlanMatchingProfile = function (plan, query) {
            var _a, _b, _c, _d;
            var planType = String((_a = plan.proxy_type) !== null && _a !== void 0 ? _a : '')
                .trim()
                .toLowerCase();
            var planSubtype = String((_b = plan.proxy_subtype) !== null && _b !== void 0 ? _b : '')
                .trim()
                .toLowerCase();
            var queryType = String((_c = query.proxy_type) !== null && _c !== void 0 ? _c : '')
                .trim()
                .toLowerCase();
            var querySubtype = String((_d = query.proxy_subtype) !== null && _d !== void 0 ? _d : '')
                .trim()
                .toLowerCase();
            return Boolean(planType && planSubtype && queryType && querySubtype &&
                planType === queryType &&
                planSubtype === querySubtype);
        };
        ProxyService_1.prototype.parsePlanBandwidthLimit = function (plan) {
            var raw = plan.bandwidth_limit;
            var text = String(raw !== null && raw !== void 0 ? raw : '')
                .trim()
                .toLowerCase();
            if (text === 'unlimited' ||
                text === 'infinite' ||
                text === 'infinity' ||
                text === 'inf') {
                return { isUnlimited: true, valueGb: 0 };
            }
            var value = Number(raw);
            if (Number.isFinite(value) && value === 0) {
                return { isUnlimited: true, valueGb: 0 };
            }
            return {
                isUnlimited: false,
                valueGb: Number.isFinite(value) && value > 0 ? value : 0,
            };
        };
        ProxyService_1.prototype.isPlanSufficient = function (plan, required) {
            var _a;
            var proxyCount = Number((_a = plan.proxy_count) !== null && _a !== void 0 ? _a : 0);
            if (!Number.isFinite(proxyCount) || proxyCount < required.totalQuantity) {
                return false;
            }
            var bandwidth = this.parsePlanBandwidthLimit(plan);
            if (required.requiresUnlimitedBandwidth) {
                return bandwidth.isUnlimited;
            }
            return bandwidth.isUnlimited || bandwidth.valueGb >= required.totalBandwidthGb;
        };
        ProxyService_1.prototype.resolveOrderDemand = function (order, productCode, prebuiltConfig) {
            return __awaiter(this, void 0, void 0, function () {
                var meta, quantity, bandwidthGb, orderConfig, _a, error_5, isUnlimitedBandwidth;
                var _b, _c, _d, _e, _f, _g, _h;
                return __generator(this, function (_j) {
                    switch (_j.label) {
                        case 0:
                            meta = ((_b = order.webshare_meta) !== null && _b !== void 0 ? _b : {});
                            quantity = prebuiltConfig
                                ? Number((_c = prebuiltConfig.proxyCount) !== null && _c !== void 0 ? _c : 0)
                                : Number((_d = meta.requested_quantity_value) !== null && _d !== void 0 ? _d : 0);
                            bandwidthGb = prebuiltConfig
                                ? Number((_e = prebuiltConfig.bandwidth) !== null && _e !== void 0 ? _e : -1)
                                : Number((_f = meta.requested_bandwidth_value) !== null && _f !== void 0 ? _f : -1);
                            _j.label = 1;
                        case 1:
                            _j.trys.push([1, 5, , 6]);
                            if (!(prebuiltConfig !== null && prebuiltConfig !== void 0)) return [3 /*break*/, 2];
                            _a = prebuiltConfig;
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.proxyMasterService.buildWebshareOrderConfig(this.buildPriceInputFromOrder(order))];
                        case 3:
                            _a = (_j.sent());
                            _j.label = 4;
                        case 4:
                            orderConfig = _a;
                            if (!Number.isFinite(quantity) || quantity <= 0) {
                                quantity = Number((_g = orderConfig.proxyCount) !== null && _g !== void 0 ? _g : 0);
                            }
                            if (!Number.isFinite(bandwidthGb) || bandwidthGb < 0) {
                                bandwidthGb = Number((_h = orderConfig.bandwidth) !== null && _h !== void 0 ? _h : -1);
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            error_5 = _j.sent();
                            this.logger.warn("Resolve demand from config failed for order ".concat(order.id, ": ").concat(error_5 instanceof Error ? error_5.message : String(error_5)));
                            return [3 /*break*/, 6];
                        case 6:
                            if (!(!Number.isFinite(quantity) || quantity <= 0)) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.repo.countProxiesByOrderId(order.id)];
                        case 7:
                            quantity = _j.sent();
                            _j.label = 8;
                        case 8:
                            if (!Number.isFinite(quantity) || quantity <= 0) {
                                quantity = productCode === 'rotating_residential' ? 1 : 0;
                            }
                            if (!Number.isFinite(bandwidthGb) || bandwidthGb < 0) {
                                bandwidthGb = 0;
                            }
                            isUnlimitedBandwidth = bandwidthGb === 0;
                            return [2 /*return*/, {
                                    quantity: Math.max(0, Math.trunc(quantity)),
                                    bandwidthGb: Math.max(0, Math.trunc(bandwidthGb)),
                                    isUnlimitedBandwidth: isUnlimitedBandwidth,
                                }];
                    }
                });
            });
        };
        ProxyService_1.prototype.getQueryProfile = function (query) {
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
        ProxyService_1.prototype.isQueryProfileMatching = function (lhsQuery, rhsQuery) {
            var lhs = this.getQueryProfile(lhsQuery);
            var rhs = this.getQueryProfile(rhsQuery);
            return Boolean(lhs.proxyType &&
                lhs.proxySubtype &&
                rhs.proxyType &&
                rhs.proxySubtype &&
                lhs.proxyType === rhs.proxyType &&
                lhs.proxySubtype === rhs.proxySubtype);
        };
        ProxyService_1.prototype.computeTargetPlanDemand = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var currentMeta, replacedOrderId, orders, totalQuantity, totalBandwidthGb, requiresUnlimitedBandwidth, activeSubusers, countryDemand, _i, orders_1, order, orderAccountId, targetAccountId, orderPoolKey, targetPoolKey, orderConfig, error_6, demand, legacySlotId, proxyCountries, _a, _b, _c, countryCode, qty, countryDemandSum, targetQuantity;
                var _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
                return __generator(this, function (_s) {
                    switch (_s.label) {
                        case 0:
                            currentMeta = ((_d = params.order.webshare_meta) !== null && _d !== void 0 ? _d : {});
                            replacedOrderId = String((_g = (_f = (_e = currentMeta.replaced_order_id) !== null && _e !== void 0 ? _e : currentMeta.superseded_order_id) !== null && _f !== void 0 ? _f : currentMeta.upgrade_from_order_id) !== null && _g !== void 0 ? _g : '').trim();
                            return [4 /*yield*/, this.repo.findOrdersByProductCode(params.config.product.code, ['active', 'pending', 'paid', 'processing'])];
                        case 1:
                            orders = _s.sent();
                            totalQuantity = 0;
                            totalBandwidthGb = 0;
                            requiresUnlimitedBandwidth = false;
                            activeSubusers = new Set();
                            countryDemand = {};
                            _i = 0, orders_1 = orders;
                            _s.label = 2;
                        case 2:
                            if (!(_i < orders_1.length)) return [3 /*break*/, 9];
                            order = orders_1[_i];
                            if (replacedOrderId &&
                                order.id !== params.order.id &&
                                order.id === replacedOrderId) {
                                return [3 /*break*/, 8];
                            }
                            orderAccountId = String((_h = order.webshare_account_id) !== null && _h !== void 0 ? _h : '').trim();
                            targetAccountId = String((_j = params.targetAccountId) !== null && _j !== void 0 ? _j : '').trim();
                            if (targetAccountId && order.id !== params.order.id) {
                                if (orderAccountId !== targetAccountId) {
                                    return [3 /*break*/, 8];
                                }
                            }
                            orderPoolKey = String((_k = order.webshare_pool_key) !== null && _k !== void 0 ? _k : '').trim();
                            targetPoolKey = String((_l = params.targetPoolKey) !== null && _l !== void 0 ? _l : '').trim();
                            if (!targetAccountId &&
                                targetPoolKey &&
                                order.id !== params.order.id &&
                                orderPoolKey &&
                                orderPoolKey !== targetPoolKey) {
                                return [3 /*break*/, 8];
                            }
                            orderConfig = null;
                            if (!(order.id === params.order.id)) return [3 /*break*/, 3];
                            orderConfig = params.config;
                            return [3 /*break*/, 6];
                        case 3:
                            _s.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.proxyMasterService.buildWebshareOrderConfig(this.buildPriceInputFromOrder(order))];
                        case 4:
                            orderConfig = _s.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            error_6 = _s.sent();
                            this.logger.warn("Resolve profile from config failed for order ".concat(order.id, ": ").concat(error_6 instanceof Error ? error_6.message : String(error_6)));
                            return [3 /*break*/, 6];
                        case 6:
                            if (orderConfig &&
                                !this.isQueryProfileMatching(orderConfig.query, params.config.query)) {
                                return [3 /*break*/, 8];
                            }
                            return [4 /*yield*/, this.resolveOrderDemand(order, params.config.product.code, orderConfig !== null && orderConfig !== void 0 ? orderConfig : undefined)];
                        case 7:
                            demand = _s.sent();
                            if (demand.quantity <= 0) {
                                return [3 /*break*/, 8];
                            }
                            totalQuantity += demand.quantity;
                            if (demand.isUnlimitedBandwidth) {
                                requiresUnlimitedBandwidth = true;
                            }
                            else {
                                totalBandwidthGb += demand.bandwidthGb;
                            }
                            legacySlotId = Number((_m = order.webshare_subuser_id) !== null && _m !== void 0 ? _m : 0);
                            if (Number.isFinite(legacySlotId) && legacySlotId > 0) {
                                activeSubusers.add(legacySlotId);
                            }
                            proxyCountries = this.normalizeProxyCountriesInput((_o = orderConfig === null || orderConfig === void 0 ? void 0 : orderConfig.query) === null || _o === void 0 ? void 0 : _o.proxy_countries);
                            if (proxyCountries) {
                                for (_a = 0, _b = Object.entries(proxyCountries); _a < _b.length; _a++) {
                                    _c = _b[_a], countryCode = _c[0], qty = _c[1];
                                    countryDemand[countryCode] = ((_p = countryDemand[countryCode]) !== null && _p !== void 0 ? _p : 0) + qty;
                                }
                            }
                            else {
                                countryDemand.ZZ = ((_q = countryDemand.ZZ) !== null && _q !== void 0 ? _q : 0) + demand.quantity;
                            }
                            _s.label = 8;
                        case 8:
                            _i++;
                            return [3 /*break*/, 2];
                        case 9:
                            countryDemandSum = Object.values(countryDemand).reduce(function (sum, value) { return sum + Number(value || 0); }, 0);
                            targetQuantity = Math.max(totalQuantity, countryDemandSum);
                            if (targetQuantity > countryDemandSum) {
                                countryDemand.ZZ = ((_r = countryDemand.ZZ) !== null && _r !== void 0 ? _r : 0) + (targetQuantity - countryDemandSum);
                            }
                            else if (targetQuantity > 0 && countryDemandSum <= 0) {
                                countryDemand.ZZ = targetQuantity;
                            }
                            return [2 /*return*/, {
                                    totalQuantity: Math.max(0, targetQuantity),
                                    totalBandwidthGb: Math.max(0, totalBandwidthGb),
                                    requiresUnlimitedBandwidth: requiresUnlimitedBandwidth,
                                    activeSubusers: Math.max(0, activeSubusers.size),
                                    proxyCountries: countryDemand,
                                }];
                    }
                });
            });
        };
        ProxyService_1.prototype.ensurePlanCapacityForNonRotating = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var baseContext, resolvedCredential, webshareContext, demand, bufferFactor, bufferedDemand, plans, matchedActivePlans, sufficientPlan, targetQuery, candidatePlanId, ensuredPlanId, ensuredRaw, ensuredPaymentRequired, ensuredAction, upgraded, purchased, error_7, detail, message, purchased, fallbackError_1, fallbackDetail, cancelErrorMessage, cancelError_1, purchased, fallbackError_2, fallbackDetail;
                var _this = this;
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8;
                return __generator(this, function (_9) {
                    switch (_9.label) {
                        case 0:
                            baseContext = this.getWebshareContext({
                                order: params.order,
                                productCode: params.config.product.code,
                                query: params.config.query,
                            });
                            return [4 /*yield*/, this.proxyMasterService.resolveWebshareCredential({
                                    accountId: baseContext.accountId,
                                    poolKey: baseContext.poolKey,
                                    query: params.config.query,
                                    requestedQuantity: Number.isFinite(params.config.proxyCount) && params.config.proxyCount > 0
                                        ? params.config.proxyCount
                                        : null,
                                    requestedBandwidthGb: Number.isFinite(params.config.bandwidth) && params.config.bandwidth >= 0
                                        ? params.config.bandwidth
                                        : null,
                                    requiresUnlimitedBandwidth: Number((_a = params.config.bandwidth) !== null && _a !== void 0 ? _a : 0) === 0,
                                })];
                        case 1:
                            resolvedCredential = _9.sent();
                            webshareContext = {
                                accountId: (_b = resolvedCredential.accountId) !== null && _b !== void 0 ? _b : undefined,
                                poolKey: (_c = resolvedCredential.poolKey) !== null && _c !== void 0 ? _c : baseContext.poolKey,
                                query: params.config.query,
                            };
                            return [4 /*yield*/, this.computeTargetPlanDemand({
                                    order: params.order,
                                    config: params.config,
                                    targetAccountId: webshareContext.accountId,
                                    targetPoolKey: webshareContext.poolKey,
                                })];
                        case 2:
                            demand = _9.sent();
                            if (demand.totalQuantity <= 0) {
                                throw new common_1.BadRequestException('Không xác định được tổng số lượng proxy cần cấp');
                            }
                            return [4 /*yield*/, this.getPoolBufferFactor({
                                    accountId: webshareContext.accountId,
                                    poolKey: webshareContext.poolKey,
                                })];
                        case 3:
                            bufferFactor = _9.sent();
                            bufferedDemand = this.applyBufferedDemand(demand, bufferFactor, params.config.mode);
                            return [4 /*yield*/, this.proxyMasterService.listWebsharePlans(webshareContext)];
                        case 4:
                            plans = _9.sent();
                            matchedActivePlans = plans
                                .filter(function (plan) {
                                var _a;
                                var status = String((_a = plan.status) !== null && _a !== void 0 ? _a : '')
                                    .trim()
                                    .toLowerCase();
                                return status === 'active' && _this.isPlanMatchingProfile(plan, params.config.query);
                            })
                                .sort(function (a, b) {
                                var _a, _b, _c, _d;
                                var aTime = Date.parse(String((_b = (_a = a.updated_at) !== null && _a !== void 0 ? _a : a.created_at) !== null && _b !== void 0 ? _b : 0)) || 0;
                                var bTime = Date.parse(String((_d = (_c = b.updated_at) !== null && _c !== void 0 ? _c : b.created_at) !== null && _d !== void 0 ? _d : 0)) || 0;
                                return bTime - aTime;
                            });
                            sufficientPlan = matchedActivePlans.find(function (plan) {
                                return _this.isPlanSufficient(plan, bufferedDemand);
                            });
                            if (sufficientPlan) {
                                return [2 /*return*/, {
                                        planId: Number(sufficientPlan.id),
                                        meta: __assign(__assign({}, ((_d = params.currentMeta) !== null && _d !== void 0 ? _d : {})), { webshare_account_id: (_e = webshareContext.accountId) !== null && _e !== void 0 ? _e : null, webshare_pool_key: (_f = webshareContext.poolKey) !== null && _f !== void 0 ? _f : null, reused_plan_id: Number(sufficientPlan.id), reused_plan_source: 'capacity_match', target_proxy_count: bufferedDemand.totalQuantity, target_proxy_countries: demand.proxyCountries, target_bandwidth_gb: bufferedDemand.requiresUnlimitedBandwidth
                                                ? 'unlimited'
                                                : bufferedDemand.totalBandwidthGb }),
                                    }];
                            }
                            targetQuery = __assign(__assign({}, params.config.query), { proxy_countries: demand.proxyCountries, bandwidth_limit: bufferedDemand.requiresUnlimitedBandwidth
                                    ? 0
                                    : bufferedDemand.totalBandwidthGb, subusers_total: Math.max(3, demand.activeSubusers + 1), behavior: 'upgrade' });
                            candidatePlanId = Number((_h = (_g = matchedActivePlans[0]) === null || _g === void 0 ? void 0 : _g.id) !== null && _h !== void 0 ? _h : 0) || null;
                            _9.label = 5;
                        case 5:
                            _9.trys.push([5, 10, , 24]);
                            ensuredPlanId = null;
                            ensuredRaw = null;
                            ensuredPaymentRequired = false;
                            ensuredAction = 'upgrade';
                            if (!candidatePlanId) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.proxyMasterService.upgradeWebsharePlan(candidatePlanId, targetQuery, webshareContext, {
                                    autoResolvePaymentMethod: true,
                                    autoSolveRecaptcha: true,
                                })];
                        case 6:
                            upgraded = _9.sent();
                            ensuredPlanId = (_j = upgraded.planId) !== null && _j !== void 0 ? _j : candidatePlanId;
                            ensuredRaw = upgraded.raw;
                            ensuredPaymentRequired = Boolean(upgraded.paymentRequired);
                            return [3 /*break*/, 9];
                        case 7: return [4 /*yield*/, this.proxyMasterService.purchaseWebsharePlan(__assign(__assign({}, targetQuery), { behavior: 'add' }), webshareContext, {
                                autoResolvePaymentMethod: true,
                                autoSolveRecaptcha: true,
                            })];
                        case 8:
                            purchased = _9.sent();
                            ensuredPlanId = purchased.planId;
                            ensuredRaw = purchased.raw;
                            ensuredPaymentRequired = Boolean(purchased.paymentRequired);
                            ensuredAction = 'purchase';
                            _9.label = 9;
                        case 9:
                            if (!ensuredPlanId) {
                                throw new common_1.BadRequestException('Webshare không trả về plan id sau khi nâng/mua gói');
                            }
                            return [2 /*return*/, {
                                    planId: ensuredPlanId,
                                    meta: __assign(__assign({}, ((_k = params.currentMeta) !== null && _k !== void 0 ? _k : {})), { webshare_account_id: (_l = webshareContext.accountId) !== null && _l !== void 0 ? _l : null, webshare_pool_key: (_m = webshareContext.poolKey) !== null && _m !== void 0 ? _m : null, target_proxy_count: bufferedDemand.totalQuantity, target_proxy_countries: demand.proxyCountries, target_bandwidth_gb: bufferedDemand.requiresUnlimitedBandwidth
                                            ? 'unlimited'
                                            : bufferedDemand.totalBandwidthGb, ensured_plan_action: ensuredAction, ensured_plan_payment_required: ensuredPaymentRequired, ensured_plan_raw: ensuredRaw }),
                                }];
                        case 10:
                            error_7 = _9.sent();
                            detail = this.proxyMasterService.getWebshareErrorMessage(error_7);
                            message = detail !== null && detail !== void 0 ? detail : (error_7 instanceof Error ? error_7.message : 'Không thể nâng/mua gói Webshare');
                            if (!(candidatePlanId &&
                                this.proxyMasterService.isPlanSameProxyTypeExistsError(error_7))) return [3 /*break*/, 15];
                            _9.label = 11;
                        case 11:
                            _9.trys.push([11, 14, , 15]);
                            return [4 /*yield*/, this.proxyMasterService.cancelWebsharePlan(candidatePlanId, webshareContext)];
                        case 12:
                            _9.sent();
                            return [4 /*yield*/, this.proxyMasterService.purchaseWebsharePlan(__assign(__assign({}, targetQuery), { behavior: 'add' }), webshareContext, {
                                    autoResolvePaymentMethod: true,
                                    autoSolveRecaptcha: true,
                                })];
                        case 13:
                            purchased = _9.sent();
                            if (!purchased.planId) {
                                throw new common_1.BadRequestException('Đã hủy plan cũ nhưng Webshare không trả về plan mới');
                            }
                            return [2 /*return*/, {
                                    planId: purchased.planId,
                                    meta: __assign(__assign({}, ((_o = params.currentMeta) !== null && _o !== void 0 ? _o : {})), { webshare_account_id: (_p = webshareContext.accountId) !== null && _p !== void 0 ? _p : null, webshare_pool_key: (_q = webshareContext.poolKey) !== null && _q !== void 0 ? _q : null, target_proxy_count: bufferedDemand.totalQuantity, target_proxy_countries: demand.proxyCountries, target_bandwidth_gb: bufferedDemand.requiresUnlimitedBandwidth
                                            ? 'unlimited'
                                            : bufferedDemand.totalBandwidthGb, ensured_plan_action: 'cancel_and_rebuy', ensured_plan_payment_required: Boolean(purchased.paymentRequired), ensured_plan_raw: purchased.raw, cancelled_plan_id: candidatePlanId }),
                                }];
                        case 14:
                            fallbackError_1 = _9.sent();
                            fallbackDetail = (_r = this.proxyMasterService.getWebshareErrorMessage(fallbackError_1)) !== null && _r !== void 0 ? _r : (fallbackError_1 instanceof Error
                                ? fallbackError_1.message
                                : 'Hủy/mua lại plan thất bại');
                            throw new RetryableProxyActivationError(fallbackDetail, {
                                planId: candidatePlanId,
                                webshareMeta: __assign(__assign({}, ((_s = params.currentMeta) !== null && _s !== void 0 ? _s : {})), { webshare_account_id: (_t = webshareContext.accountId) !== null && _t !== void 0 ? _t : null, webshare_pool_key: (_u = webshareContext.poolKey) !== null && _u !== void 0 ? _u : null, target_proxy_count: bufferedDemand.totalQuantity, target_proxy_countries: demand.proxyCountries, target_bandwidth_gb: bufferedDemand.requiresUnlimitedBandwidth
                                        ? 'unlimited'
                                        : bufferedDemand.totalBandwidthGb, purchase_error: fallbackDetail, purchase_error_code: 'cancel_rebuy_failed' }),
                                code: 'manual_purchase_required',
                            });
                        case 15:
                            if (!(candidatePlanId &&
                                this.proxyMasterService.isPlanAccessDeniedError(error_7))) return [3 /*break*/, 23];
                            _9.label = 16;
                        case 16:
                            _9.trys.push([16, 22, , 23]);
                            cancelErrorMessage = null;
                            _9.label = 17;
                        case 17:
                            _9.trys.push([17, 19, , 20]);
                            return [4 /*yield*/, this.proxyMasterService.cancelWebsharePlan(candidatePlanId, webshareContext)];
                        case 18:
                            _9.sent();
                            return [3 /*break*/, 20];
                        case 19:
                            cancelError_1 = _9.sent();
                            cancelErrorMessage =
                                (_v = this.proxyMasterService.getWebshareErrorMessage(cancelError_1)) !== null && _v !== void 0 ? _v : (cancelError_1 instanceof Error
                                    ? cancelError_1.message
                                    : 'Không thể hủy plan cũ');
                            return [3 /*break*/, 20];
                        case 20: return [4 /*yield*/, this.proxyMasterService.purchaseWebsharePlan(__assign(__assign({}, targetQuery), { behavior: 'add' }), webshareContext, {
                                autoResolvePaymentMethod: true,
                                autoSolveRecaptcha: true,
                            })];
                        case 21:
                            purchased = _9.sent();
                            if (!purchased.planId) {
                                throw new common_1.BadRequestException('Webshare không trả về plan mới sau khi fallback mua thêm');
                            }
                            return [2 /*return*/, {
                                    planId: purchased.planId,
                                    meta: __assign(__assign(__assign({}, ((_w = params.currentMeta) !== null && _w !== void 0 ? _w : {})), { webshare_account_id: (_x = webshareContext.accountId) !== null && _x !== void 0 ? _x : null, webshare_pool_key: (_y = webshareContext.poolKey) !== null && _y !== void 0 ? _y : null, target_proxy_count: bufferedDemand.totalQuantity, target_proxy_countries: demand.proxyCountries, target_bandwidth_gb: bufferedDemand.requiresUnlimitedBandwidth
                                            ? 'unlimited'
                                            : bufferedDemand.totalBandwidthGb, ensured_plan_action: 'access_denied_cancel_and_rebuy', ensured_plan_payment_required: Boolean(purchased.paymentRequired), ensured_plan_raw: purchased.raw, denied_plan_id: candidatePlanId }), (cancelErrorMessage
                                        ? { cancel_plan_error: cancelErrorMessage }
                                        : {})),
                                }];
                        case 22:
                            fallbackError_2 = _9.sent();
                            fallbackDetail = (_z = this.proxyMasterService.getWebshareErrorMessage(fallbackError_2)) !== null && _z !== void 0 ? _z : (fallbackError_2 instanceof Error
                                ? fallbackError_2.message
                                : 'Fallback mua plan mới thất bại');
                            throw new RetryableProxyActivationError(fallbackDetail, {
                                planId: candidatePlanId,
                                webshareMeta: __assign(__assign({}, ((_0 = params.currentMeta) !== null && _0 !== void 0 ? _0 : {})), { webshare_account_id: (_1 = webshareContext.accountId) !== null && _1 !== void 0 ? _1 : null, webshare_pool_key: (_2 = webshareContext.poolKey) !== null && _2 !== void 0 ? _2 : null, target_proxy_count: bufferedDemand.totalQuantity, target_proxy_countries: demand.proxyCountries, target_bandwidth_gb: bufferedDemand.requiresUnlimitedBandwidth
                                        ? 'unlimited'
                                        : bufferedDemand.totalBandwidthGb, purchase_error: fallbackDetail, purchase_error_code: 'access_denied_rebuy_failed' }),
                                code: 'manual_purchase_required',
                            });
                        case 23:
                            if (this.proxyMasterService.isRetryableWebshareError(error_7)) {
                                throw new RetryableProxyActivationError(message, {
                                    planId: candidatePlanId,
                                    webshareMeta: __assign(__assign({}, ((_3 = params.currentMeta) !== null && _3 !== void 0 ? _3 : {})), { webshare_account_id: (_4 = webshareContext.accountId) !== null && _4 !== void 0 ? _4 : null, webshare_pool_key: (_5 = webshareContext.poolKey) !== null && _5 !== void 0 ? _5 : null, target_proxy_count: bufferedDemand.totalQuantity, target_proxy_countries: demand.proxyCountries, target_bandwidth_gb: bufferedDemand.requiresUnlimitedBandwidth
                                            ? 'unlimited'
                                            : bufferedDemand.totalBandwidthGb, purchase_error: message, purchase_error_code: 'retryable_webshare_error' }),
                                    code: 'purchase_retry',
                                });
                            }
                            throw new RetryableProxyActivationError(message, {
                                planId: candidatePlanId,
                                webshareMeta: __assign(__assign({}, ((_6 = params.currentMeta) !== null && _6 !== void 0 ? _6 : {})), { webshare_account_id: (_7 = webshareContext.accountId) !== null && _7 !== void 0 ? _7 : null, webshare_pool_key: (_8 = webshareContext.poolKey) !== null && _8 !== void 0 ? _8 : null, target_proxy_count: bufferedDemand.totalQuantity, target_proxy_countries: demand.proxyCountries, target_bandwidth_gb: bufferedDemand.requiresUnlimitedBandwidth
                                        ? 'unlimited'
                                        : bufferedDemand.totalBandwidthGb, purchase_error: message, purchase_error_code: 'manual_purchase_required' }),
                                code: 'manual_purchase_required',
                            });
                        case 24: return [2 /*return*/];
                    }
                });
            });
        };
        ProxyService_1.prototype.activateNonRotatingOrder = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var planId, provisioningAction, webshareMeta, nextMeta, ensuredPlan, webshareContext, proxyList, proxies, syncedProxyCountries, nextWebshareMeta, updatedOrder;
                var _this = this;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            planId = Number(params.order.webshare_plan_id || 0) || null;
                            provisioningAction = this.getOrderProvisioningAction(params.order);
                            webshareMeta = (_a = params.order.webshare_meta) !== null && _a !== void 0 ? _a : null;
                            if ((webshareMeta === null || webshareMeta === void 0 ? void 0 : webshareMeta.force_reconfigure) != null) {
                                nextMeta = __assign({}, webshareMeta);
                                delete nextMeta.force_reconfigure;
                                webshareMeta = nextMeta;
                            }
                            return [4 /*yield*/, this.ensurePlanCapacityForNonRotating({
                                    order: params.order,
                                    config: params.config,
                                    currentPlanId: planId,
                                    currentMeta: webshareMeta,
                                })];
                        case 1:
                            ensuredPlan = _c.sent();
                            planId = ensuredPlan.planId;
                            webshareMeta = (_b = ensuredPlan.meta) !== null && _b !== void 0 ? _b : webshareMeta;
                            webshareContext = this.getWebshareContext({
                                order: __assign(__assign({}, params.order), { webshare_meta: webshareMeta }),
                                productCode: params.config.product.code,
                                query: params.config.query,
                            });
                            if (!(provisioningAction === 'update')) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.computeTargetPlanDemand({
                                    order: params.order,
                                    config: params.config,
                                    targetAccountId: webshareContext.accountId,
                                    targetPoolKey: webshareContext.poolKey,
                                })];
                        case 2:
                            _c.sent();
                            _c.label = 3;
                        case 3: return [4 /*yield*/, this.proxyMasterService.listWebshareProxies({
                                mode: 'direct',
                                planId: planId,
                                accountId: webshareContext.accountId,
                                poolKey: webshareContext.poolKey,
                                query: webshareContext.query,
                            })];
                        case 4:
                            proxyList = _c.sent();
                            proxies = this.mapWebshareProxyListToRows(proxyList, params.config.product.code, params.order.id);
                            syncedProxyCountries = this.buildProxyCountryDistribution(proxies);
                            nextWebshareMeta = __assign(__assign({}, (webshareMeta !== null && webshareMeta !== void 0 ? webshareMeta : {})), { synced_proxy_count: proxies.length, synced_proxy_countries: syncedProxyCountries });
                            if (!proxies.length) {
                                throw new RetryableProxyActivationError('Webshare chưa trả về proxy khả dụng. Hệ thống sẽ tự thử lại sau ít phút.', {
                                    planId: planId,
                                    webshareMeta: __assign(__assign({}, (webshareMeta !== null && webshareMeta !== void 0 ? webshareMeta : {})), { proxy_list_count: proxyList.length, mapped_proxy_count: proxies.length }),
                                    code: 'proxy_not_ready',
                                });
                            }
                            return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a, _b, _c;
                                    return __generator(this, function (_d) {
                                        switch (_d.label) {
                                            case 0: return [4 /*yield*/, this.repo.upsertUserProxies(params.userId, proxies, trx)];
                                            case 1:
                                                _d.sent();
                                                return [2 /*return*/, this.repo.updateProxyOrder(params.order.id, {
                                                        status: 'active',
                                                        webshare_plan_id: planId,
                                                        webshare_subuser_id: null,
                                                        webshare_account_id: (_a = webshareContext.accountId) !== null && _a !== void 0 ? _a : null,
                                                        webshare_pool_key: (_b = webshareContext.poolKey) !== null && _b !== void 0 ? _b : null,
                                                        webshare_status: 'active',
                                                        webshare_error: null,
                                                        webshare_meta: nextWebshareMeta,
                                                        webshare_activated_at: new Date(),
                                                        expires_at: (_c = params.order.expires_at) !== null && _c !== void 0 ? _c : this.calculateOrderExpiry(params.order),
                                                    }, trx)];
                                        }
                                    });
                                }); })];
                        case 5:
                            updatedOrder = _c.sent();
                            return [4 /*yield*/, this.notifyProxyOrderActivated(updatedOrder, params.config.product.code)];
                        case 6:
                            _c.sent();
                            return [4 /*yield*/, this.finalizeSupersededOrderAfterActivation(updatedOrder, params.config.product.code)];
                        case 7:
                            _c.sent();
                            return [4 /*yield*/, this.disableWebshareAutoRenewForOrder({
                                    order: updatedOrder,
                                    productCode: params.config.product.code,
                                })];
                        case 8:
                            _c.sent();
                            return [2 /*return*/, updatedOrder];
                    }
                });
            });
        };
        ProxyService_1.prototype.activateProxyOrder = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var config, planId, _a, provisioningAction, webshareMeta, nextMeta, baseWebshareContext, resolvedCredential, webshareContext, bufferFactor, isCompatible, error_8, matchedPlanId, error_9, allowHistoryPlan, ensurePlanId, proxyList, retriedListWithoutPlan, rotatingFetchOptions, error_10, detail, message, proxies, syncedProxyCountries, nextWebshareMeta, updatedOrder;
                var _this = this;
                var _b, _c, _d, _e, _f, _g;
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0: return [4 /*yield*/, this.proxyMasterService.buildWebshareOrderConfig(params.priceInput)];
                        case 1:
                            config = _h.sent();
                            if (config.product.code !== 'rotating_residential') {
                                return [2 /*return*/, this.activateNonRotatingOrder({
                                        userId: params.userId,
                                        order: params.order,
                                        label: params.label,
                                        config: config,
                                    })];
                            }
                            if (!((_b = params.order.webshare_plan_id) !== null && _b !== void 0)) return [3 /*break*/, 2];
                            _a = _b;
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.repo.findLatestWebsharePlanIdByUserAndProduct(params.userId, Number(params.priceInput.product_id))];
                        case 3:
                            _a = (_h.sent());
                            _h.label = 4;
                        case 4:
                            planId = _a;
                            provisioningAction = this.getOrderProvisioningAction(params.order);
                            webshareMeta = (_c = params.order.webshare_meta) !== null && _c !== void 0 ? _c : null;
                            if ((webshareMeta === null || webshareMeta === void 0 ? void 0 : webshareMeta.force_reconfigure) != null) {
                                nextMeta = __assign({}, webshareMeta);
                                delete nextMeta.force_reconfigure;
                                webshareMeta = nextMeta;
                            }
                            baseWebshareContext = this.getWebshareContext({
                                order: params.order,
                                productCode: config.product.code,
                                query: config.query,
                            });
                            return [4 /*yield*/, this.proxyMasterService.resolveWebshareCredential({
                                    accountId: baseWebshareContext.accountId,
                                    poolKey: baseWebshareContext.poolKey,
                                    query: config.query,
                                })];
                        case 5:
                            resolvedCredential = _h.sent();
                            webshareContext = {
                                accountId: (_d = resolvedCredential.accountId) !== null && _d !== void 0 ? _d : undefined,
                                poolKey: (_e = resolvedCredential.poolKey) !== null && _e !== void 0 ? _e : baseWebshareContext.poolKey,
                                query: config.query,
                            };
                            return [4 /*yield*/, this.getPoolBufferFactor({
                                    accountId: webshareContext.accountId,
                                    poolKey: webshareContext.poolKey,
                                })];
                        case 6:
                            bufferFactor = _h.sent();
                            if (!(provisioningAction === 'update')) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.computeTargetPlanDemand({
                                    order: params.order,
                                    config: config,
                                    targetAccountId: webshareContext.accountId,
                                    targetPoolKey: webshareContext.poolKey,
                                })];
                        case 7:
                            _h.sent();
                            _h.label = 8;
                        case 8:
                            webshareMeta = __assign(__assign({}, (webshareMeta !== null && webshareMeta !== void 0 ? webshareMeta : {})), { webshare_account_id: (_f = webshareContext.accountId) !== null && _f !== void 0 ? _f : null, webshare_pool_key: (_g = webshareContext.poolKey) !== null && _g !== void 0 ? _g : null });
                            if (!planId) return [3 /*break*/, 12];
                            _h.label = 9;
                        case 9:
                            _h.trys.push([9, 11, , 12]);
                            return [4 /*yield*/, this.proxyMasterService.isPlanCompatibleWithQuery(planId, config.query, webshareContext)];
                        case 10:
                            isCompatible = _h.sent();
                            if (!isCompatible) {
                                webshareMeta = __assign(__assign({}, (webshareMeta !== null && webshareMeta !== void 0 ? webshareMeta : {})), { ignored_plan_id: planId, ignored_plan_reason: 'mismatch_proxy_profile' });
                                planId = null;
                            }
                            return [3 /*break*/, 12];
                        case 11:
                            error_8 = _h.sent();
                            this.logger.warn("Plan compatibility check failed for order ".concat(params.order.id, ": ").concat(error_8 instanceof Error ? error_8.message : String(error_8)));
                            return [3 /*break*/, 12];
                        case 12:
                            if (!!planId) return [3 /*break*/, 16];
                            _h.label = 13;
                        case 13:
                            _h.trys.push([13, 15, , 16]);
                            return [4 /*yield*/, this.proxyMasterService.findActivePlanIdByQuery(config.query, webshareContext)];
                        case 14:
                            matchedPlanId = _h.sent();
                            if (matchedPlanId) {
                                planId = matchedPlanId;
                                webshareMeta = __assign(__assign({}, (webshareMeta !== null && webshareMeta !== void 0 ? webshareMeta : {})), { reused_plan_id: matchedPlanId, reused_plan_source: 'webshare_plan_lookup' });
                            }
                            return [3 /*break*/, 16];
                        case 15:
                            error_9 = _h.sent();
                            this.logger.warn("Active plan lookup failed for order ".concat(params.order.id, ": ").concat(error_9 instanceof Error ? error_9.message : String(error_9)));
                            return [3 /*break*/, 16];
                        case 16:
                            allowHistoryPlan = true;
                            ensurePlanId = function () { return __awaiter(_this, void 0, void 0, function () {
                                var demand, bufferedDemand, rotatingPurchaseQuery, purchaseResult, error_11, detail, message, historyPlanIdCandidate, _a, historyPlanId, isHistoryCompatible, matchedPlanId_1, fallbackPlanId, source, matchedPlanId;
                                var _b, _c, _d, _e, _f, _g, _h;
                                return __generator(this, function (_j) {
                                    switch (_j.label) {
                                        case 0:
                                            if (planId)
                                                return [2 /*return*/];
                                            _j.label = 1;
                                        case 1:
                                            _j.trys.push([1, 4, , 13]);
                                            return [4 /*yield*/, this.computeTargetPlanDemand({
                                                    order: params.order,
                                                    config: config,
                                                    targetAccountId: webshareContext.accountId,
                                                    targetPoolKey: webshareContext.poolKey,
                                                })];
                                        case 2:
                                            demand = _j.sent();
                                            bufferedDemand = this.applyBufferedDemand(demand, bufferFactor, config.mode);
                                            rotatingPurchaseQuery = __assign(__assign({}, config.query), { bandwidth_limit: bufferedDemand.requiresUnlimitedBandwidth
                                                    ? 0
                                                    : bufferedDemand.totalBandwidthGb, subusers_total: Math.max(3, demand.activeSubusers + 1) });
                                            return [4 /*yield*/, this.proxyMasterService.purchaseWebsharePlan(rotatingPurchaseQuery, webshareContext)];
                                        case 3:
                                            purchaseResult = _j.sent();
                                            webshareMeta = __assign(__assign(__assign({}, ((_b = purchaseResult.raw) !== null && _b !== void 0 ? _b : {})), (webshareMeta !== null && webshareMeta !== void 0 ? webshareMeta : {})), { webshare_account_id: (_e = (_d = (_c = purchaseResult.account) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : webshareContext.accountId) !== null && _e !== void 0 ? _e : null, webshare_pool_key: (_h = (_g = (_f = purchaseResult.account) === null || _f === void 0 ? void 0 : _f.pool_key) !== null && _g !== void 0 ? _g : webshareContext.poolKey) !== null && _h !== void 0 ? _h : null, target_bandwidth_gb: bufferedDemand.requiresUnlimitedBandwidth
                                                    ? 'unlimited'
                                                    : bufferedDemand.totalBandwidthGb, upgrade_query: rotatingPurchaseQuery });
                                            if (purchaseResult.paymentRequired) {
                                                throw new common_1.BadRequestException('Webshare yêu cầu thanh toán. Vui lòng nạp credits vào tài khoản Webshare.');
                                            }
                                            planId = purchaseResult.planId;
                                            return [3 /*break*/, 13];
                                        case 4:
                                            error_11 = _j.sent();
                                            detail = this.proxyMasterService.getWebshareErrorMessage(error_11);
                                            message = detail !== null && detail !== void 0 ? detail : (error_11 instanceof Error ? error_11.message : 'Webshare tạm lỗi');
                                            if (!this.proxyMasterService.isPlanSameProxyTypeExistsError(error_11)) return [3 /*break*/, 11];
                                            if (!allowHistoryPlan) return [3 /*break*/, 6];
                                            return [4 /*yield*/, this.repo.findLatestWebsharePlanIdByUserAndProduct(params.userId, Number(params.priceInput.product_id))];
                                        case 5:
                                            _a = _j.sent();
                                            return [3 /*break*/, 7];
                                        case 6:
                                            _a = null;
                                            _j.label = 7;
                                        case 7:
                                            historyPlanIdCandidate = _a;
                                            historyPlanId = null;
                                            if (!historyPlanIdCandidate) return [3 /*break*/, 9];
                                            return [4 /*yield*/, this.proxyMasterService.isPlanCompatibleWithQuery(historyPlanIdCandidate, config.query, webshareContext)];
                                        case 8:
                                            isHistoryCompatible = _j.sent();
                                            if (isHistoryCompatible) {
                                                historyPlanId = historyPlanIdCandidate;
                                            }
                                            else {
                                                webshareMeta = __assign(__assign({}, (webshareMeta !== null && webshareMeta !== void 0 ? webshareMeta : {})), { ignored_plan_id: historyPlanIdCandidate, ignored_plan_reason: 'mismatch_proxy_profile' });
                                            }
                                            _j.label = 9;
                                        case 9: return [4 /*yield*/, this.proxyMasterService.findActivePlanIdByQuery(config.query, webshareContext)];
                                        case 10:
                                            matchedPlanId_1 = _j.sent();
                                            fallbackPlanId = historyPlanId !== null && historyPlanId !== void 0 ? historyPlanId : matchedPlanId_1;
                                            if (fallbackPlanId) {
                                                source = historyPlanId
                                                    ? 'user_history'
                                                    : 'webshare_plan_lookup';
                                                webshareMeta = __assign(__assign({}, (webshareMeta !== null && webshareMeta !== void 0 ? webshareMeta : {})), { reused_plan_id: fallbackPlanId, reused_plan_source: source });
                                                planId = fallbackPlanId;
                                                return [2 /*return*/];
                                            }
                                            throw new common_1.BadRequestException("".concat(message, ". Kh\u00F4ng t\u00ECm th\u1EA5y plan c\u00F9ng lo\u1EA1i \u0111\u1EC3 t\u00E1i s\u1EED d\u1EE5ng."));
                                        case 11: return [4 /*yield*/, this.proxyMasterService.findActivePlanIdByQuery(config.query, webshareContext)];
                                        case 12:
                                            matchedPlanId = _j.sent();
                                            if (matchedPlanId) {
                                                webshareMeta = __assign(__assign({}, (webshareMeta !== null && webshareMeta !== void 0 ? webshareMeta : {})), { reused_plan_id: matchedPlanId, reused_plan_source: 'webshare_plan_lookup_after_error' });
                                                planId = matchedPlanId;
                                                return [2 /*return*/];
                                            }
                                            if (this.proxyMasterService.isRecaptchaRequiredError(error_11)) {
                                                throw new common_1.BadRequestException('Webshare yêu cầu reCAPTCHA khi tạo plan mới. Vui lòng tạo sẵn plan rotating trên Webshare hoặc dùng plan active để hệ thống tái sử dụng.');
                                            }
                                            if (this.proxyMasterService.isRetryableWebshareError(error_11)) {
                                                throw new RetryableProxyActivationError(message, {
                                                    planId: planId,
                                                    webshareMeta: webshareMeta,
                                                });
                                            }
                                            if (detail) {
                                                throw new common_1.BadRequestException(message);
                                            }
                                            throw error_11;
                                        case 13: return [2 /*return*/];
                                    }
                                });
                            }); };
                            if (!planId) return [3 /*break*/, 17];
                            webshareMeta = __assign(__assign({}, (webshareMeta !== null && webshareMeta !== void 0 ? webshareMeta : {})), { reused_plan_id: planId, reused_plan_source: 'user_history' });
                            return [3 /*break*/, 19];
                        case 17: return [4 /*yield*/, ensurePlanId()];
                        case 18:
                            _h.sent();
                            _h.label = 19;
                        case 19:
                            if (!planId) {
                                throw new common_1.BadRequestException('Không thể xác định plan Webshare');
                            }
                            if (!!planId) return [3 /*break*/, 21];
                            return [4 /*yield*/, ensurePlanId()];
                        case 20:
                            _h.sent();
                            _h.label = 21;
                        case 21:
                            proxyList = [];
                            retriedListWithoutPlan = false;
                            _h.label = 22;
                        case 22:
                            if (!true) return [3 /*break*/, 27];
                            _h.label = 23;
                        case 23:
                            _h.trys.push([23, 25, , 26]);
                            rotatingFetchOptions = config.product.code === 'rotating_residential'
                                ? {
                                    pageSize: this.rotatingFetchPageSize,
                                    maxPages: this.rotatingFetchMaxPages,
                                    maxResults: this.rotatingFetchMaxResults,
                                }
                                : {};
                            return [4 /*yield*/, this.proxyMasterService.listWebshareProxies(__assign({ mode: config.mode, planId: planId, accountId: webshareContext.accountId, poolKey: webshareContext.poolKey, query: webshareContext.query }, rotatingFetchOptions))];
                        case 24:
                            proxyList = _h.sent();
                            return [3 /*break*/, 27];
                        case 25:
                            error_10 = _h.sent();
                            if (planId &&
                                !retriedListWithoutPlan &&
                                this.proxyMasterService.isPlanAccessDeniedError(error_10)) {
                                planId = null;
                                allowHistoryPlan = false;
                                retriedListWithoutPlan = true;
                                return [3 /*break*/, 22];
                            }
                            detail = this.proxyMasterService.getWebshareErrorMessage(error_10);
                            message = detail !== null && detail !== void 0 ? detail : (error_10 instanceof Error ? error_10.message : 'Webshare tạm lỗi');
                            if (this.proxyMasterService.isRetryableWebshareError(error_10)) {
                                throw new RetryableProxyActivationError(message, {
                                    planId: planId,
                                    webshareMeta: webshareMeta,
                                });
                            }
                            if (detail) {
                                throw new common_1.BadRequestException(message);
                            }
                            throw error_10;
                        case 26: return [3 /*break*/, 22];
                        case 27:
                            proxies = this.mapWebshareProxyListToRows(proxyList, config.product.code, params.order.id, config.mode === 'backbone' ? this.rotatingBackboneHost : undefined);
                            syncedProxyCountries = this.buildProxyCountryDistribution(proxies);
                            nextWebshareMeta = __assign(__assign({}, (webshareMeta !== null && webshareMeta !== void 0 ? webshareMeta : {})), { synced_proxy_count: proxies.length, synced_proxy_countries: syncedProxyCountries });
                            if (proxies.length === 0) {
                                throw new RetryableProxyActivationError('Webshare chưa trả về proxy khả dụng. Hệ thống sẽ tự thử lại sau ít phút.', {
                                    planId: planId,
                                    webshareMeta: __assign(__assign({}, (webshareMeta !== null && webshareMeta !== void 0 ? webshareMeta : {})), { proxy_list_count: proxyList.length, mapped_proxy_count: proxies.length }),
                                    code: 'proxy_not_ready',
                                });
                            }
                            return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a, _b, _c;
                                    return __generator(this, function (_d) {
                                        switch (_d.label) {
                                            case 0: return [4 /*yield*/, this.repo.upsertUserProxies(params.userId, proxies, trx)];
                                            case 1:
                                                _d.sent();
                                                return [2 /*return*/, this.repo.updateProxyOrder(params.order.id, {
                                                        status: 'active',
                                                        webshare_plan_id: planId,
                                                        webshare_subuser_id: null,
                                                        webshare_account_id: (_a = webshareContext.accountId) !== null && _a !== void 0 ? _a : null,
                                                        webshare_pool_key: (_b = webshareContext.poolKey) !== null && _b !== void 0 ? _b : null,
                                                        webshare_status: 'active',
                                                        webshare_error: null,
                                                        webshare_meta: nextWebshareMeta,
                                                        webshare_activated_at: new Date(),
                                                        expires_at: (_c = params.order.expires_at) !== null && _c !== void 0 ? _c : this.calculateOrderExpiry(params.order),
                                                    }, trx)];
                                        }
                                    });
                                }); })];
                        case 28:
                            updatedOrder = _h.sent();
                            return [4 /*yield*/, this.notifyProxyOrderActivated(updatedOrder, config.product.code)];
                        case 29:
                            _h.sent();
                            return [4 /*yield*/, this.finalizeSupersededOrderAfterActivation(updatedOrder, config.product.code)];
                        case 30:
                            _h.sent();
                            return [4 /*yield*/, this.disableWebshareAutoRenewForOrder({
                                    order: updatedOrder,
                                    productCode: config.product.code,
                                })];
                        case 31:
                            _h.sent();
                            return [2 /*return*/, updatedOrder];
                    }
                });
            });
        };
        ProxyService_1.prototype.recoverOrderFromExistingWebshare = function (order) {
            return __awaiter(this, void 0, void 0, function () {
                var productCode, planId, mode, rotatingFetchOptions, webshareContext, proxyList, error_12, mapped, matchedPlanId, error_13, syncedProxyCountries, nextWebshareMeta, refreshedOrder;
                var _this = this;
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, this.repo.findProxyProductCodeById(Number(order.product_id))];
                        case 1:
                            productCode = _e.sent();
                            if (!productCode || !this.isSupportedProxyType(productCode)) {
                                return [2 /*return*/, false];
                            }
                            planId = this.getOrderPlanId(order);
                            mode = productCode === 'rotating_residential' ? 'backbone' : 'direct';
                            rotatingFetchOptions = productCode === 'rotating_residential'
                                ? {
                                    pageSize: this.rotatingFetchPageSize,
                                    maxPages: this.rotatingFetchMaxPages,
                                    maxResults: this.rotatingFetchMaxResults,
                                }
                                : {};
                            webshareContext = this.getWebshareContext({
                                order: order,
                                productCode: productCode,
                            });
                            proxyList = [];
                            _e.label = 2;
                        case 2:
                            _e.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.proxyMasterService.listWebshareProxies(__assign({ mode: mode, planId: planId, accountId: webshareContext.accountId, poolKey: webshareContext.poolKey, query: webshareContext.query }, rotatingFetchOptions))];
                        case 3:
                            proxyList = _e.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            error_12 = _e.sent();
                            this.logger.warn("List proxies by current plan failed for order ".concat(order.id, ": ").concat(error_12 instanceof Error ? error_12.message : String(error_12)));
                            return [3 /*break*/, 5];
                        case 5:
                            mapped = this.mapWebshareProxyListToRows(proxyList, productCode, order.id, mode === 'backbone' ? this.rotatingBackboneHost : undefined);
                            if (!!mapped.length) return [3 /*break*/, 11];
                            _e.label = 6;
                        case 6:
                            _e.trys.push([6, 10, , 11]);
                            return [4 /*yield*/, this.proxyMasterService.findActivePlanIdByQuery((_a = webshareContext.query) !== null && _a !== void 0 ? _a : {}, webshareContext)];
                        case 7:
                            matchedPlanId = _e.sent();
                            if (!(Number.isFinite(Number(matchedPlanId !== null && matchedPlanId !== void 0 ? matchedPlanId : 0)) &&
                                Number(matchedPlanId) > 0 &&
                                Number(matchedPlanId) !== Number(planId !== null && planId !== void 0 ? planId : 0))) return [3 /*break*/, 9];
                            planId = Math.trunc(Number(matchedPlanId));
                            return [4 /*yield*/, this.proxyMasterService.listWebshareProxies(__assign({ mode: mode, planId: planId, accountId: webshareContext.accountId, poolKey: webshareContext.poolKey, query: webshareContext.query }, rotatingFetchOptions))];
                        case 8:
                            proxyList = _e.sent();
                            mapped = this.mapWebshareProxyListToRows(proxyList, productCode, order.id, mode === 'backbone' ? this.rotatingBackboneHost : undefined);
                            _e.label = 9;
                        case 9: return [3 /*break*/, 11];
                        case 10:
                            error_13 = _e.sent();
                            this.logger.warn("Fallback recover by account for order ".concat(order.id, " failed: ").concat(error_13 instanceof Error ? error_13.message : String(error_13)));
                            return [3 /*break*/, 11];
                        case 11:
                            if (!mapped.length)
                                return [2 /*return*/, false];
                            syncedProxyCountries = this.buildProxyCountryDistribution(mapped);
                            nextWebshareMeta = __assign(__assign({}, ((_b = this.clearRetryMeta(order)) !== null && _b !== void 0 ? _b : {})), { synced_proxy_count: mapped.length, synced_proxy_countries: syncedProxyCountries });
                            return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a, _b, _c, _d;
                                    return __generator(this, function (_e) {
                                        switch (_e.label) {
                                            case 0: return [4 /*yield*/, this.repo.deleteProxiesByOrderId(order.id, trx)];
                                            case 1:
                                                _e.sent();
                                                return [4 /*yield*/, this.repo.upsertUserProxies(order.user_id, mapped, trx)];
                                            case 2:
                                                _e.sent();
                                                return [4 /*yield*/, this.repo.updateProxyOrder(order.id, {
                                                        status: 'active',
                                                        webshare_plan_id: (_a = planId !== null && planId !== void 0 ? planId : order.webshare_plan_id) !== null && _a !== void 0 ? _a : null,
                                                        webshare_subuser_id: null,
                                                        webshare_account_id: (_b = webshareContext.accountId) !== null && _b !== void 0 ? _b : null,
                                                        webshare_pool_key: (_c = webshareContext.poolKey) !== null && _c !== void 0 ? _c : null,
                                                        webshare_status: 'active',
                                                        webshare_error: null,
                                                        webshare_meta: nextWebshareMeta,
                                                        webshare_activated_at: new Date(),
                                                        expires_at: (_d = order.expires_at) !== null && _d !== void 0 ? _d : this.calculateOrderExpiry(order),
                                                    }, trx)];
                                            case 3:
                                                _e.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 12:
                            _e.sent();
                            if (!(String((_c = order.status) !== null && _c !== void 0 ? _c : '').trim().toLowerCase() !== 'active' ||
                                String((_d = order.webshare_status) !== null && _d !== void 0 ? _d : '').trim().toLowerCase() !== 'active')) return [3 /*break*/, 17];
                            return [4 /*yield*/, this.repo.findProxyOrderByIdAndUserId(order.id, order.user_id)];
                        case 13:
                            refreshedOrder = _e.sent();
                            if (!refreshedOrder) return [3 /*break*/, 17];
                            return [4 /*yield*/, this.notifyProxyOrderActivated(refreshedOrder, productCode)];
                        case 14:
                            _e.sent();
                            return [4 /*yield*/, this.finalizeSupersededOrderAfterActivation(refreshedOrder, productCode)];
                        case 15:
                            _e.sent();
                            return [4 /*yield*/, this.disableWebshareAutoRenewForOrder({
                                    order: refreshedOrder,
                                    productCode: productCode,
                                })];
                        case 16:
                            _e.sent();
                            _e.label = 17;
                        case 17: return [2 /*return*/, true];
                    }
                });
            });
        };
        ProxyService_1.prototype.getProxiesList = function (userId, query) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, page, limit, orderBy, orderDir, offset, loginMethod, connectionMethod, _b, filteredOrder, resolvedProxyType, orderStatus, error_14, safeOrderBy, items, total;
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = query.paginationOptions, page = _a.page, limit = _a.limit, orderBy = _a.orderBy, orderDir = _a.orderDir;
                            offset = query.offset;
                            loginMethod = query.login_method;
                            connectionMethod = query.connection_method;
                            return [4 /*yield*/, this.resolveOrderFilter({
                                    userId: userId,
                                    orderId: query.order_id,
                                    proxyType: query.proxy_type,
                                })];
                        case 1:
                            _b = _d.sent(), filteredOrder = _b.order, resolvedProxyType = _b.proxyType;
                            if (!(offset === 0 && loginMethod !== 'ip_whitelist')) return [3 /*break*/, 7];
                            orderStatus = String((_c = filteredOrder === null || filteredOrder === void 0 ? void 0 : filteredOrder.status) !== null && _c !== void 0 ? _c : '').toLowerCase();
                            if (!(!filteredOrder || orderStatus === 'active')) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.syncWebshareProxies(userId, resolvedProxyType)];
                        case 2:
                            _d.sent();
                            return [3 /*break*/, 7];
                        case 3:
                            if (!(orderStatus === 'pending')) return [3 /*break*/, 7];
                            _d.label = 4;
                        case 4:
                            _d.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, this.recoverOrderFromExistingWebshare(filteredOrder)];
                        case 5:
                            _d.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            error_14 = _d.sent();
                            this.logger.warn("Recover pending order ".concat(filteredOrder.id, " on list failed: ").concat(error_14 instanceof Error ? error_14.message : String(error_14)));
                            return [3 /*break*/, 7];
                        case 7:
                            safeOrderBy = [
                                'address',
                                'port',
                                'country_code',
                                'city',
                                'status',
                                'last_checked_at',
                                'created_at',
                            ].includes(orderBy) || orderBy === 'id'
                                ? orderBy === 'id'
                                    ? 'id'
                                    : orderBy
                                : 'created_at';
                            return [4 /*yield*/, this.repo.findProxiesByUserId(userId, {
                                    offset: offset,
                                    limit: limit,
                                    search: query.search,
                                    country_codes: query.country_codes,
                                    proxy_type: resolvedProxyType,
                                    order_id: filteredOrder === null || filteredOrder === void 0 ? void 0 : filteredOrder.id,
                                    login_method: loginMethod,
                                    connection_method: connectionMethod,
                                    orderBy: safeOrderBy,
                                    orderDir: orderDir !== null && orderDir !== void 0 ? orderDir : 'desc',
                                })];
                        case 8:
                            items = _d.sent();
                            return [4 /*yield*/, this.repo.countProxiesByUserId(userId, {
                                    search: query.search,
                                    country_codes: query.country_codes,
                                    proxy_type: resolvedProxyType,
                                    order_id: filteredOrder === null || filteredOrder === void 0 ? void 0 : filteredOrder.id,
                                    login_method: loginMethod,
                                    connection_method: connectionMethod,
                                })];
                        case 9:
                            total = _d.sent();
                            return [2 /*return*/, {
                                    data: items,
                                    meta: (0, pagination_helpers_1.createPaginationMeta)({ total: total, page: page, limit: limit }),
                                }];
                    }
                });
            });
        };
        ProxyService_1.prototype.getProxiesDownload = function (userId, format, country_codes, proxy_type, order_id) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, filteredOrder, resolvedProxyType, orderStatus, error_15, items, lines;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, this.resolveOrderFilter({
                                userId: userId,
                                orderId: order_id,
                                proxyType: proxy_type,
                            })];
                        case 1:
                            _a = _c.sent(), filteredOrder = _a.order, resolvedProxyType = _a.proxyType;
                            orderStatus = String((_b = filteredOrder === null || filteredOrder === void 0 ? void 0 : filteredOrder.status) !== null && _b !== void 0 ? _b : '').toLowerCase();
                            if (!(!filteredOrder || orderStatus === 'active')) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.syncWebshareProxies(userId, resolvedProxyType)];
                        case 2:
                            _c.sent();
                            return [3 /*break*/, 7];
                        case 3:
                            if (!(orderStatus === 'pending')) return [3 /*break*/, 7];
                            _c.label = 4;
                        case 4:
                            _c.trys.push([4, 6, , 7]);
                            return [4 /*yield*/, this.recoverOrderFromExistingWebshare(filteredOrder)];
                        case 5:
                            _c.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            error_15 = _c.sent();
                            this.logger.warn("Recover pending order ".concat(filteredOrder.id, " on download failed: ").concat(error_15 instanceof Error ? error_15.message : String(error_15)));
                            return [3 /*break*/, 7];
                        case 7: return [4 /*yield*/, this.repo.findAllProxiesForDownload(userId, country_codes, resolvedProxyType, filteredOrder === null || filteredOrder === void 0 ? void 0 : filteredOrder.id)];
                        case 8:
                            items = _c.sent();
                            if (format === 'txt') {
                                lines = items.map(function (p) { return "".concat(p.address, ":").concat(p.port, ":").concat(p.username, ":").concat(p.password); });
                                return [2 /*return*/, { format: 'txt', content: lines.join('\n') }];
                            }
                            return [2 /*return*/, { format: 'json', data: items }];
                    }
                });
            });
        };
        ProxyService_1.prototype.getRotatingProxyStatus = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var rotatingOrder, planId, webshareContext, status, countriesRaw, countries;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.repo.findLatestOrderByUserAndProductCode(userId, 'rotating_residential', ['active', 'pending'])];
                        case 1:
                            rotatingOrder = _b.sent();
                            if (!rotatingOrder) {
                                return [2 /*return*/, null];
                            }
                            planId = this.getOrderPlanId(rotatingOrder);
                            if (!planId) {
                                return [2 /*return*/, {
                                        plan_id: null,
                                        state: null,
                                        countries: [],
                                        username: null,
                                        password: null,
                                        is_proxy_used: null,
                                    }];
                            }
                            webshareContext = this.getWebshareContext({
                                order: rotatingOrder,
                                productCode: 'rotating_residential',
                            });
                            return [4 /*yield*/, this.proxyMasterService.getWebshareProxyListStatus({
                                    planId: planId,
                                    accountId: webshareContext.accountId,
                                    poolKey: webshareContext.poolKey,
                                    query: webshareContext.query,
                                })];
                        case 2:
                            status = _b.sent();
                            countriesRaw = status.countries;
                            countries = Object.entries(countriesRaw !== null && countriesRaw !== void 0 ? countriesRaw : {})
                                .map(function (_a) {
                                var code = _a[0], availableCount = _a[1];
                                return ({
                                    code: String(code || '')
                                        .trim()
                                        .toUpperCase(),
                                    available_count: Math.max(0, Math.trunc(Number(availableCount || 0))),
                                });
                            })
                                .filter(function (item) { return /^[A-Z]{2}$/.test(item.code); })
                                .sort(function (a, b) { return b.available_count - a.available_count; });
                            return [2 /*return*/, {
                                    plan_id: planId,
                                    state: String((_a = status.state) !== null && _a !== void 0 ? _a : ''),
                                    countries: countries,
                                    username: typeof status.username === 'string' ? String(status.username) : null,
                                    password: typeof status.password === 'string' ? String(status.password) : null,
                                    is_proxy_used: typeof status.is_proxy_used === 'boolean'
                                        ? status.is_proxy_used
                                        : null,
                                }];
                    }
                });
            });
        };
        ProxyService_1.prototype.getCountryFilters = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.findUserCountryFilters(userId)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, { country_codes: rows.map(function (r) { return r.country_code; }) }];
                    }
                });
            });
        };
        ProxyService_1.prototype.putCountryFilters = function (userId, country_codes) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.replaceUserCountryFilters(userId, country_codes)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { country_codes: __spreadArray([], new Set(country_codes), true) }];
                    }
                });
            });
        };
        ProxyService_1.prototype.checkLiveProxies = function (userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var hasProxyIds, hasCustomProxies, proxyType, limit, timeout, testUrl, requested, targets, customProxies, proxies, _a, checkedAt, results, success;
                var _this = this;
                var _b, _c, _d, _e, _f, _g, _h;
                return __generator(this, function (_j) {
                    switch (_j.label) {
                        case 0:
                            hasProxyIds = Array.isArray(dto.proxy_ids) && dto.proxy_ids.length > 0;
                            hasCustomProxies = Array.isArray(dto.custom_proxies) && dto.custom_proxies.length > 0;
                            if (hasProxyIds && hasCustomProxies) {
                                throw new common_1.BadRequestException('Vui lòng chỉ gửi proxy_ids hoặc custom_proxies trong một lần kiểm tra');
                            }
                            proxyType = (_b = dto.proxy_type) !== null && _b !== void 0 ? _b : 'rotating_residential';
                            limit = Math.min(Math.max((_c = dto.limit) !== null && _c !== void 0 ? _c : this.liveCheckDefaultLimit, 1), this.liveCheckMaxLimit);
                            timeout = Math.min(Math.max((_d = dto.timeout_ms) !== null && _d !== void 0 ? _d : this.liveCheckTimeoutMs, 2000), 15000);
                            testUrl = ((_e = dto.test_url) === null || _e === void 0 ? void 0 : _e.trim()) || this.liveCheckUrl;
                            requested = 0;
                            targets = [];
                            if (!hasCustomProxies) return [3 /*break*/, 1];
                            customProxies = (_f = dto.custom_proxies) !== null && _f !== void 0 ? _f : [];
                            requested = customProxies.length;
                            targets = [];
                            customProxies.forEach(function (item, idx) {
                                var _a, _b, _c, _d;
                                var address = (_a = item.address) === null || _a === void 0 ? void 0 : _a.trim();
                                var port = Number(item.port);
                                if (!address || !Number.isFinite(port) || port <= 0) {
                                    return;
                                }
                                var username = (_b = item.username) === null || _b === void 0 ? void 0 : _b.trim();
                                var password = (_c = item.password) === null || _c === void 0 ? void 0 : _c.trim();
                                targets.push({
                                    result_id: idx + 1,
                                    client_id: ((_d = item.client_id) === null || _d === void 0 ? void 0 : _d.trim()) || undefined,
                                    address: address,
                                    port: port,
                                    username: username || undefined,
                                    password: password || undefined,
                                    proxy_protocol: _this.normalizeProxyProtocol(item.proxy_protocol),
                                });
                            });
                            return [3 /*break*/, 6];
                        case 1:
                            if (!userId) {
                                throw new common_1.UnauthorizedException('Bạn cần đăng nhập để kiểm tra proxy từ danh sách đã mua');
                            }
                            if (!hasProxyIds) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.repo.findProxiesByIds(userId, dto.proxy_ids, proxyType)];
                        case 2:
                            _a = _j.sent();
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, this.repo.findProxiesForCheck(userId, {
                                proxy_type: proxyType,
                                limit: limit,
                            })];
                        case 4:
                            _a = _j.sent();
                            _j.label = 5;
                        case 5:
                            proxies = _a;
                            requested = hasProxyIds ? ((_h = (_g = dto.proxy_ids) === null || _g === void 0 ? void 0 : _g.length) !== null && _h !== void 0 ? _h : 0) : proxies.length;
                            targets = proxies.map(function (proxy) { return ({
                                result_id: proxy.id,
                                persist_id: proxy.id,
                                address: proxy.address,
                                port: proxy.port,
                                username: proxy.username,
                                password: proxy.password,
                                proxy_protocol: 'http',
                            }); });
                            _j.label = 6;
                        case 6:
                            if (!targets.length) {
                                return [2 /*return*/, {
                                        data: [],
                                        meta: {
                                            requested: requested,
                                            checked: 0,
                                            success: 0,
                                        },
                                    }];
                            }
                            checkedAt = new Date();
                            return [4 /*yield*/, this.runWithConcurrency(targets, this.liveCheckConcurrency, function (proxy) { return __awaiter(_this, void 0, void 0, function () {
                                    var startedAt, status, error, usedProtocol, publicIp, countryCode, protocolsToTry, _i, protocolsToTry_1, protocol, result, shouldTrySocksFallback;
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                startedAt = Date.now();
                                                status = 'dead';
                                                error = null;
                                                usedProtocol = null;
                                                publicIp = null;
                                                countryCode = null;
                                                protocolsToTry = proxy.proxy_protocol === 'auto'
                                                    ? ['http', 'socks5']
                                                    : [proxy.proxy_protocol];
                                                _i = 0, protocolsToTry_1 = protocolsToTry;
                                                _b.label = 1;
                                            case 1:
                                                if (!(_i < protocolsToTry_1.length)) return [3 /*break*/, 4];
                                                protocol = protocolsToTry_1[_i];
                                                usedProtocol = protocol;
                                                return [4 /*yield*/, this.runSingleProxyCheck({
                                                        protocol: protocol,
                                                        testUrl: testUrl,
                                                        timeout: timeout,
                                                        address: proxy.address,
                                                        port: proxy.port,
                                                        username: proxy.username,
                                                        password: proxy.password,
                                                    })];
                                            case 2:
                                                result = _b.sent();
                                                status = result.status;
                                                error = result.error;
                                                publicIp = result.public_ip;
                                                countryCode = result.country_code;
                                                if (status === 'active')
                                                    return [3 /*break*/, 4];
                                                shouldTrySocksFallback = proxy.proxy_protocol === 'auto' &&
                                                    protocol === 'http' &&
                                                    !String(error !== null && error !== void 0 ? error : '').startsWith('HTTP ') &&
                                                    this.isLikelyHttpProxyFailure(new Error(error !== null && error !== void 0 ? error : ''));
                                                if (!shouldTrySocksFallback)
                                                    return [3 /*break*/, 4];
                                                _b.label = 3;
                                            case 3:
                                                _i++;
                                                return [3 /*break*/, 1];
                                            case 4:
                                                if (!proxy.persist_id) return [3 /*break*/, 6];
                                                return [4 /*yield*/, this.repo.updateProxyCheck(proxy.persist_id, {
                                                        status: status,
                                                        last_checked_at: checkedAt,
                                                    })];
                                            case 5:
                                                _b.sent();
                                                _b.label = 6;
                                            case 6: return [2 /*return*/, {
                                                    id: proxy.result_id,
                                                    client_id: (_a = proxy.client_id) !== null && _a !== void 0 ? _a : null,
                                                    address: proxy.address,
                                                    port: proxy.port,
                                                    proxy_protocol: usedProtocol !== null && usedProtocol !== void 0 ? usedProtocol : (proxy.proxy_protocol === 'auto' ? 'http' : proxy.proxy_protocol),
                                                    status: status,
                                                    response_time_ms: Date.now() - startedAt,
                                                    checked_at: checkedAt,
                                                    error: error,
                                                    public_ip: publicIp,
                                                    country_code: countryCode,
                                                }];
                                        }
                                    });
                                }); })];
                        case 7:
                            results = _j.sent();
                            success = results.filter(function (r) { return r.status === 'active'; }).length;
                            return [2 /*return*/, {
                                    data: results,
                                    meta: {
                                        requested: requested,
                                        checked: results.length,
                                        success: success,
                                    },
                                }];
                    }
                });
            });
        };
        ProxyService_1.prototype.createOrder = function (userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var amount, idempotencyKey, priceInput, requestFingerprint, existingByIdempotency, existingFingerprint, priceResult, orderConfigPreview, requestedPoolKey, resolvedCredential, usdTotal, usdToVndRate, subtotalVnd, vatVnd, minimumPayableVnd, order, finalOrder, shouldNotifyPendingPurchase, label, error_16, detail, message, latestMeta, purchaseAction;
                var _this = this;
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
                return __generator(this, function (_v) {
                    switch (_v.label) {
                        case 0:
                            amount = Number((_a = dto.amount_total) !== null && _a !== void 0 ? _a : 0);
                            if (!Number.isFinite(amount) || amount <= 0) {
                                throw new common_1.BadRequestException('Số tiền thanh toán không hợp lệ');
                            }
                            idempotencyKey = String((_b = dto.idempotency_key) !== null && _b !== void 0 ? _b : '').trim();
                            if (idempotencyKey.length < 16 || idempotencyKey.length > 128) {
                                throw new common_1.BadRequestException('idempotency_key không hợp lệ');
                            }
                            priceInput = {
                                product_id: dto.product_id,
                                exclusivity_option_id: dto.exclusivity_option_id,
                                exclusivity_value: dto.exclusivity_value,
                                quantity_option_id: dto.quantity_option_id,
                                quantity_value: dto.quantity_value,
                                proxy_countries: this.normalizeProxyCountriesInput(dto.proxy_countries),
                                bandwidth_option_id: dto.bandwidth_option_id,
                                bandwidth_value: dto.bandwidth_value,
                                location_id: dto.location_id,
                                additional_feature_id: dto.additional_feature_id,
                                billing_cycle: dto.billing_cycle,
                                discount_percent: dto.discount_percent,
                            };
                            requestFingerprint = this.buildCreateOrderRequestFingerprint({
                                userId: userId,
                                amount: amount,
                                dto: priceInput,
                            });
                            return [4 /*yield*/, this.repo.findSuccessfulPaymentByIdempotencyKey(userId, idempotencyKey)];
                        case 1:
                            existingByIdempotency = _v.sent();
                            if (existingByIdempotency) {
                                existingFingerprint = String((_d = ((_c = existingByIdempotency.transaction.metadata) !== null && _c !== void 0 ? _c : {}).request_fingerprint) !== null && _d !== void 0 ? _d : '').trim();
                                if (existingFingerprint && existingFingerprint !== requestFingerprint) {
                                    throw new common_1.BadRequestException('idempotency_key đã được sử dụng cho payload khác');
                                }
                                return [2 /*return*/, existingByIdempotency.order];
                            }
                            return [4 /*yield*/, this.calculatePrice(userId, priceInput)];
                        case 2:
                            priceResult = _v.sent();
                            return [4 /*yield*/, this.proxyMasterService.buildWebshareOrderConfig(priceInput)];
                        case 3:
                            orderConfigPreview = _v.sent();
                            requestedPoolKey = this.proxyMasterService.derivePoolKeyFromQuery(orderConfigPreview.query);
                            return [4 /*yield*/, this.tryReserveCredentialForUserPurchase({
                                    userId: userId,
                                    context: {
                                        poolKey: requestedPoolKey !== null && requestedPoolKey !== void 0 ? requestedPoolKey : undefined,
                                        query: orderConfigPreview.query,
                                        requestedQuantity: Number.isFinite(orderConfigPreview.proxyCount) &&
                                            orderConfigPreview.proxyCount > 0
                                            ? orderConfigPreview.proxyCount
                                            : null,
                                        requestedBandwidthGb: Number.isFinite(orderConfigPreview.bandwidth) &&
                                            orderConfigPreview.bandwidth >= 0
                                            ? orderConfigPreview.bandwidth
                                            : null,
                                        requiresUnlimitedBandwidth: Number((_e = orderConfigPreview.bandwidth) !== null && _e !== void 0 ? _e : 0) === 0,
                                    },
                                })];
                        case 4:
                            resolvedCredential = _v.sent();
                            usdTotal = this.toNumber(priceResult.total);
                            if (usdTotal <= 0) {
                                throw new common_1.BadRequestException('Không thể tính giá thanh toán cho cấu hình đã chọn');
                            }
                            usdToVndRate = 26000;
                            subtotalVnd = this.ceil(usdTotal * usdToVndRate);
                            vatVnd = this.ceil(subtotalVnd * 0.1);
                            minimumPayableVnd = subtotalVnd + vatVnd;
                            if (Math.abs(amount - minimumPayableVnd) > 0) {
                                throw new common_1.BadRequestException("S\u1ED1 ti\u1EC1n thanh to\u00E1n kh\u00F4ng h\u1EE3p l\u1EC7. C\u1EA7n thanh to\u00E1n ch\u00EDnh x\u00E1c: ".concat(minimumPayableVnd));
                            }
                            return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                    var existingInTxn, existingFingerprint, wallet, requestedProxyCountries, requestedQuantityValue, requestedBandwidthValue, requestedLocationId, normalizedLocationId, _a, queryProxyType, queryProxySubtype, latestSameProductOrder, nextMeta, provisioningAction, existingAccountId, existingPoolKey, mappedAccountId, mappedPoolKey, nextOrderStatus, nextWebshareStatus, activationAt, order, transactionNumber, actionType, productLabelVi, noteProxyCount, noteBandwidthGb, noteVi;
                                    var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
                                    return __generator(this, function (_v) {
                                        switch (_v.label) {
                                            case 0: return [4 /*yield*/, trx.raw('SELECT pg_advisory_xact_lock(hashtext(?))', [
                                                    "proxy-order:".concat(userId, ":").concat(idempotencyKey),
                                                ])];
                                            case 1:
                                                _v.sent();
                                                return [4 /*yield*/, this.repo.findSuccessfulPaymentByIdempotencyKey(userId, idempotencyKey, trx)];
                                            case 2:
                                                existingInTxn = _v.sent();
                                                if (existingInTxn) {
                                                    existingFingerprint = String((_c = ((_b = existingInTxn.transaction.metadata) !== null && _b !== void 0 ? _b : {}).request_fingerprint) !== null && _c !== void 0 ? _c : '').trim();
                                                    if (existingFingerprint && existingFingerprint !== requestFingerprint) {
                                                        throw new common_1.BadRequestException('idempotency_key đã được sử dụng cho payload khác');
                                                    }
                                                    return [2 /*return*/, { order: existingInTxn.order }];
                                                }
                                                return [4 /*yield*/, this.walletRepository.findByUserId(userId, trx)];
                                            case 3:
                                                wallet = _v.sent();
                                                if (!!wallet) return [3 /*break*/, 5];
                                                return [4 /*yield*/, this.walletRepository.createWallet(userId, trx)];
                                            case 4:
                                                wallet = _v.sent();
                                                _v.label = 5;
                                            case 5:
                                                if (wallet.is_locked) {
                                                    throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.WALLET_IS_LOCKED);
                                                }
                                                if (Number(wallet.balance) < amount) {
                                                    throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.WALLET_INSUFFICIENT_BALANCE);
                                                }
                                                requestedProxyCountries = this.normalizeProxyCountriesInput(dto.proxy_countries);
                                                requestedQuantityValue = Number(dto.quantity_value);
                                                requestedBandwidthValue = Number(dto.bandwidth_value);
                                                requestedLocationId = Number(dto.location_id);
                                                if (!(Number.isFinite(requestedLocationId) && requestedLocationId > 0)) return [3 /*break*/, 7];
                                                return [4 /*yield*/, trx('proxy_locations')
                                                        .where('id', requestedLocationId)
                                                        .first('id')
                                                        .then(function (row) { return ((row === null || row === void 0 ? void 0 : row.id) ? requestedLocationId : null); })];
                                            case 6:
                                                _a = _v.sent();
                                                return [3 /*break*/, 8];
                                            case 7:
                                                _a = null;
                                                _v.label = 8;
                                            case 8:
                                                normalizedLocationId = _a;
                                                queryProxyType = String((_e = (_d = orderConfigPreview.query) === null || _d === void 0 ? void 0 : _d.proxy_type) !== null && _e !== void 0 ? _e : '')
                                                    .trim()
                                                    .toLowerCase();
                                                queryProxySubtype = String((_g = (_f = orderConfigPreview.query) === null || _f === void 0 ? void 0 : _f.proxy_subtype) !== null && _g !== void 0 ? _g : '')
                                                    .trim()
                                                    .toLowerCase();
                                                return [4 /*yield*/, trx('proxy_orders as po')
                                                        .join('proxy_products as pp', 'pp.id', 'po.product_id')
                                                        .where('po.user_id', userId)
                                                        .whereIn('po.status', ['active', 'paid', 'pending', 'processing'])
                                                        .where('pp.code', orderConfigPreview.product.code)
                                                        .select('po.*')
                                                        .orderBy('po.created_at', 'desc')
                                                        .first()];
                                            case 9:
                                                latestSameProductOrder = _v.sent();
                                                nextMeta = { force_reconfigure: true };
                                                provisioningAction = latestSameProductOrder
                                                    ? 'update'
                                                    : 'new_purchase';
                                                nextMeta.provisioning_action = provisioningAction;
                                                if (latestSameProductOrder === null || latestSameProductOrder === void 0 ? void 0 : latestSameProductOrder.id) {
                                                    nextMeta.replaced_order_id = String(latestSameProductOrder.id);
                                                }
                                                if (requestedProxyCountries) {
                                                    nextMeta.requested_proxy_countries = requestedProxyCountries;
                                                }
                                                if (Number.isFinite(requestedQuantityValue) &&
                                                    requestedQuantityValue > 0) {
                                                    nextMeta.requested_quantity_value = requestedQuantityValue;
                                                }
                                                if (dto.exclusivity_value) {
                                                    nextMeta.requested_exclusivity_value = String(dto.exclusivity_value);
                                                }
                                                if (Number.isFinite(requestedBandwidthValue) &&
                                                    requestedBandwidthValue >= 0) {
                                                    nextMeta.requested_bandwidth_value = requestedBandwidthValue;
                                                }
                                                if (requestedPoolKey) {
                                                    nextMeta.requested_pool_key = requestedPoolKey;
                                                }
                                                existingAccountId = String((_h = latestSameProductOrder === null || latestSameProductOrder === void 0 ? void 0 : latestSameProductOrder.webshare_account_id) !== null && _h !== void 0 ? _h : '').trim();
                                                existingPoolKey = String((_j = latestSameProductOrder === null || latestSameProductOrder === void 0 ? void 0 : latestSameProductOrder.webshare_pool_key) !== null && _j !== void 0 ? _j : '').trim();
                                                mappedAccountId = (_k = resolvedCredential === null || resolvedCredential === void 0 ? void 0 : resolvedCredential.accountId) !== null && _k !== void 0 ? _k : (existingAccountId.length > 0 ? existingAccountId : null);
                                                mappedPoolKey = (_m = (_l = resolvedCredential === null || resolvedCredential === void 0 ? void 0 : resolvedCredential.poolKey) !== null && _l !== void 0 ? _l : requestedPoolKey) !== null && _m !== void 0 ? _m : (existingPoolKey.length > 0 ? existingPoolKey : null);
                                                if (mappedAccountId) {
                                                    nextMeta.webshare_account_id = mappedAccountId;
                                                }
                                                if (mappedPoolKey) {
                                                    nextMeta.webshare_pool_key = mappedPoolKey;
                                                }
                                                if (resolvedCredential === null || resolvedCredential === void 0 ? void 0 : resolvedCredential.source) {
                                                    nextMeta.webshare_account_source = resolvedCredential.source;
                                                }
                                                if (queryProxyType) {
                                                    nextMeta.requested_proxy_type = queryProxyType;
                                                }
                                                if (queryProxySubtype) {
                                                    nextMeta.requested_proxy_subtype = queryProxySubtype;
                                                }
                                                nextOrderStatus = 'pending';
                                                nextWebshareStatus = 'pending';
                                                activationAt = null;
                                                return [4 /*yield*/, this.repo.createProxyOrder(userId, {
                                                        product_id: dto.product_id,
                                                        exclusivity_option_id: (_o = dto.exclusivity_option_id) !== null && _o !== void 0 ? _o : null,
                                                        quantity_option_id: (_p = dto.quantity_option_id) !== null && _p !== void 0 ? _p : null,
                                                        bandwidth_option_id: (_q = dto.bandwidth_option_id) !== null && _q !== void 0 ? _q : null,
                                                        location_id: normalizedLocationId,
                                                        additional_feature_id: (_r = dto.additional_feature_id) !== null && _r !== void 0 ? _r : null,
                                                        discount_percent: (_s = dto.discount_percent) !== null && _s !== void 0 ? _s : 0,
                                                        amount_total: amount,
                                                        billing_cycle: dto.billing_cycle,
                                                        status: nextOrderStatus,
                                                        webshare_status: nextWebshareStatus,
                                                        webshare_error: null,
                                                        webshare_activated_at: activationAt,
                                                        expires_at: this.calculateOrderExpiry({
                                                            billing_cycle: dto.billing_cycle,
                                                        }),
                                                        webshare_account_id: mappedAccountId,
                                                        webshare_pool_key: mappedPoolKey,
                                                        webshare_meta: nextMeta,
                                                    }, trx)];
                                            case 10:
                                                order = _v.sent();
                                                return [4 /*yield*/, this.walletRepository.deductBalance(trx, wallet.id, amount, false)];
                                            case 11:
                                                _v.sent();
                                                transactionNumber = (0, wallet_transaction_util_1.generateTransactionNumber)();
                                                actionType = provisioningAction === 'update' ? 'upgrade' : 'add';
                                                productLabelVi = orderConfigPreview.product.code === 'proxy_server'
                                                    ? 'Proxy máy chủ'
                                                    : orderConfigPreview.product.code === 'static_residential'
                                                        ? 'Proxy dân cư tĩnh'
                                                        : orderConfigPreview.product.code === 'rotating_residential'
                                                            ? 'Proxy dân cư xoay'
                                                            : 'Proxy';
                                                noteProxyCount = Number.isFinite(requestedQuantityValue) && requestedQuantityValue > 0
                                                    ? Math.trunc(requestedQuantityValue)
                                                    : Math.max(0, Math.trunc(Number((_t = orderConfigPreview.proxyCount) !== null && _t !== void 0 ? _t : 0)));
                                                noteBandwidthGb = Number.isFinite(requestedBandwidthValue) && requestedBandwidthValue >= 0
                                                    ? Math.trunc(requestedBandwidthValue)
                                                    : Math.max(0, Math.trunc(Number((_u = orderConfigPreview.bandwidth) !== null && _u !== void 0 ? _u : 0)));
                                                noteVi = actionType === 'upgrade'
                                                    ? "N\u00E2ng c\u1EA5p g\u00F3i l\u00EAn ".concat(noteProxyCount, " ").concat(productLabelVi, " v\u1EDBi ").concat(noteBandwidthGb, " GB")
                                                    : "Th\u00EAm m\u1EDBi g\u00F3i ".concat(noteProxyCount, " ").concat(productLabelVi, " v\u1EDBi ").concat(noteBandwidthGb, " GB");
                                                return [4 /*yield*/, trx('wallet_transactions').insert({
                                                        transaction_number: transactionNumber,
                                                        wallet_id: wallet.id,
                                                        user_id: userId,
                                                        type: 'PROXY',
                                                        method: 'wallet',
                                                        amount: amount,
                                                        fee_amount: 0,
                                                        status: 'success',
                                                        reference_code: order.id,
                                                        note: noteVi,
                                                        created_at: new Date(),
                                                        completed_at: new Date(),
                                                    })];
                                            case 12:
                                                _v.sent();
                                                return [4 /*yield*/, this.repo.createProxyTransaction({
                                                        proxy_order_id: order.id,
                                                        type: 'payment',
                                                        amount: amount,
                                                        currency: 'VND',
                                                        status: 'success',
                                                        paid_at: new Date(),
                                                        metadata: {
                                                            source: 'wallet',
                                                            wallet_transaction_number: transactionNumber,
                                                            idempotency_key: idempotencyKey,
                                                            request_fingerprint: requestFingerprint,
                                                            action_type: actionType,
                                                            proxy_count: noteProxyCount,
                                                            bandwidth_gb: noteBandwidthGb,
                                                            note_vi: noteVi,
                                                        },
                                                    }, trx)];
                                            case 13:
                                                _v.sent();
                                                return [2 /*return*/, { order: order }];
                                        }
                                    });
                                }); })];
                        case 5:
                            order = (_v.sent()).order;
                            finalOrder = order;
                            shouldNotifyPendingPurchase = false;
                            if (!!String((_f = finalOrder.webshare_account_id) !== null && _f !== void 0 ? _f : '').trim()) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.markOrderPending({
                                    order: finalOrder,
                                    message: 'Đang chờ gán email Webshare từ admin.',
                                    webshareMeta: (_g = finalOrder.webshare_meta) !== null && _g !== void 0 ? _g : null,
                                    code: 'waiting_webshare_account',
                                })];
                        case 6:
                            finalOrder = _v.sent();
                            shouldNotifyPendingPurchase = true;
                            return [3 /*break*/, 17];
                        case 7:
                            label = "bhm-order-".concat(finalOrder.id.slice(0, 8));
                            _v.label = 8;
                        case 8:
                            _v.trys.push([8, 10, , 17]);
                            return [4 /*yield*/, this.activateProxyOrder({
                                    userId: userId,
                                    order: finalOrder,
                                    priceInput: priceInput,
                                    label: label,
                                })];
                        case 9:
                            finalOrder = _v.sent();
                            return [3 /*break*/, 17];
                        case 10:
                            error_16 = _v.sent();
                            detail = this.proxyMasterService.getWebshareErrorMessage(error_16);
                            message = detail !== null && detail !== void 0 ? detail : (error_16 instanceof Error ? error_16.message : 'Không thể kích hoạt proxy');
                            if (!(error_16 instanceof RetryableProxyActivationError)) return [3 /*break*/, 12];
                            return [4 /*yield*/, this.markOrderPending({
                                    order: finalOrder,
                                    message: message,
                                    planId: (_h = error_16.details.planId) !== null && _h !== void 0 ? _h : undefined,
                                    webshareMeta: (_j = error_16.details.webshareMeta) !== null && _j !== void 0 ? _j : undefined,
                                    code: error_16.details.code,
                                })];
                        case 11:
                            finalOrder = _v.sent();
                            shouldNotifyPendingPurchase = true;
                            return [3 /*break*/, 16];
                        case 12:
                            if (!this.isWaitingForWebshareAccount(message)) return [3 /*break*/, 14];
                            return [4 /*yield*/, this.markOrderPending({
                                    order: finalOrder,
                                    message: message,
                                    webshareMeta: (_k = finalOrder.webshare_meta) !== null && _k !== void 0 ? _k : null,
                                    code: 'waiting_webshare_account',
                                })];
                        case 13:
                            finalOrder = _v.sent();
                            shouldNotifyPendingPurchase = true;
                            return [3 /*break*/, 16];
                        case 14: return [4 /*yield*/, this.markOrderPending({
                                order: finalOrder,
                                message: message,
                                webshareMeta: (_l = finalOrder.webshare_meta) !== null && _l !== void 0 ? _l : null,
                                code: 'manual_processing_required',
                            })];
                        case 15:
                            finalOrder = _v.sent();
                            shouldNotifyPendingPurchase = true;
                            _v.label = 16;
                        case 16: return [3 /*break*/, 17];
                        case 17:
                            if (!shouldNotifyPendingPurchase) return [3 /*break*/, 19];
                            latestMeta = ((_m = finalOrder.webshare_meta) !== null && _m !== void 0 ? _m : {});
                            purchaseAction = String((_o = latestMeta.provisioning_action) !== null && _o !== void 0 ? _o : '').trim();
                            return [4 /*yield*/, this.notifyProxyOrderPurchased({
                                    order: finalOrder,
                                    productCode: orderConfigPreview.product.code,
                                    optionName: this.getProxyOptionLabel({
                                        poolKey: requestedPoolKey !== null && requestedPoolKey !== void 0 ? requestedPoolKey : null,
                                        exclusivityValue: (_p = dto.exclusivity_value) !== null && _p !== void 0 ? _p : null,
                                        proxyType: String((_r = (_q = orderConfigPreview.query) === null || _q === void 0 ? void 0 : _q.proxy_type) !== null && _r !== void 0 ? _r : ''),
                                        proxySubtype: String((_t = (_s = orderConfigPreview.query) === null || _s === void 0 ? void 0 : _s.proxy_subtype) !== null && _t !== void 0 ? _t : ''),
                                    }),
                                    billingCycle: dto.billing_cycle,
                                    amountTotal: amount,
                                    requestedQuantity: Number.isFinite(orderConfigPreview.proxyCount) &&
                                        orderConfigPreview.proxyCount > 0
                                        ? orderConfigPreview.proxyCount
                                        : null,
                                    requestedBandwidthGb: Number.isFinite(orderConfigPreview.bandwidth) &&
                                        orderConfigPreview.bandwidth >= 0
                                        ? orderConfigPreview.bandwidth
                                        : null,
                                    requestedProxyCountries: this.normalizeProxyCountriesInput(dto.proxy_countries),
                                    mappedWebshareEmail: (_u = resolvedCredential === null || resolvedCredential === void 0 ? void 0 : resolvedCredential.accountLabel) !== null && _u !== void 0 ? _u : null,
                                    provisioningAction: purchaseAction === 'update' ? 'update' : 'new_purchase',
                                })];
                        case 18:
                            _v.sent();
                            _v.label = 19;
                        case 19: return [2 /*return*/, finalOrder];
                    }
                });
            });
        };
        ProxyService_1.prototype.calculatePrice = function (userId, dto) {
            return __awaiter(this, void 0, void 0, function () {
                var configPreview, productCode, reserveContext, reservedCredential, latestOrderForProduct, hasMappedAccountOnProductOrder, latestMappedOrder, _a, context, resolvedCredential, pricingBehavior;
                var _b, _c, _d, _e, _f, _g, _h, _j, _k;
                return __generator(this, function (_l) {
                    switch (_l.label) {
                        case 0: return [4 /*yield*/, this.proxyMasterService.buildWebshareOrderConfig(dto)];
                        case 1:
                            configPreview = _l.sent();
                            productCode = configPreview.product.code;
                            reserveContext = {
                                poolKey: this.proxyMasterService.derivePoolKeyFromQuery(configPreview.query),
                                query: configPreview.query,
                                requestedQuantity: Number.isFinite(configPreview.proxyCount) && configPreview.proxyCount > 0
                                    ? configPreview.proxyCount
                                    : null,
                                requestedBandwidthGb: Number.isFinite(configPreview.bandwidth) && configPreview.bandwidth >= 0
                                    ? configPreview.bandwidth
                                    : null,
                                requiresUnlimitedBandwidth: Number((_b = configPreview.bandwidth) !== null && _b !== void 0 ? _b : 0) === 0,
                            };
                            return [4 /*yield*/, this.tryReserveCredentialForUserPurchase({
                                    userId: userId,
                                    context: reserveContext,
                                })];
                        case 2:
                            reservedCredential = _l.sent();
                            return [4 /*yield*/, this.repo.findLatestOrderByUserAndProductCode(userId, productCode, ['active', 'pending', 'paid', 'processing'])];
                        case 3:
                            latestOrderForProduct = _l.sent();
                            hasMappedAccountOnProductOrder = Boolean(String((_c = latestOrderForProduct === null || latestOrderForProduct === void 0 ? void 0 : latestOrderForProduct.webshare_account_id) !== null && _c !== void 0 ? _c : '').trim());
                            if (!hasMappedAccountOnProductOrder) return [3 /*break*/, 4];
                            _a = latestOrderForProduct;
                            return [3 /*break*/, 6];
                        case 4: return [4 /*yield*/, this.repo.findLatestMappedWebshareOrderByUser(userId)];
                        case 5:
                            _a = _l.sent();
                            _l.label = 6;
                        case 6:
                            latestMappedOrder = _a;
                            context = this.getWebshareContext({
                                order: latestMappedOrder !== null && latestMappedOrder !== void 0 ? latestMappedOrder : latestOrderForProduct,
                                productCode: productCode,
                                query: configPreview.query,
                            });
                            return [4 /*yield*/, this.proxyMasterService.resolveWebshareCredential({
                                    accountId: (_d = reservedCredential === null || reservedCredential === void 0 ? void 0 : reservedCredential.accountId) !== null && _d !== void 0 ? _d : context.accountId,
                                    poolKey: (_e = reservedCredential === null || reservedCredential === void 0 ? void 0 : reservedCredential.poolKey) !== null && _e !== void 0 ? _e : context.poolKey,
                                    query: configPreview.query,
                                    requestedQuantity: reserveContext.requestedQuantity,
                                    requestedBandwidthGb: reserveContext.requestedBandwidthGb,
                                    requiresUnlimitedBandwidth: reserveContext.requiresUnlimitedBandwidth,
                                })];
                        case 7:
                            resolvedCredential = _l.sent();
                            pricingBehavior = Boolean(String((_g = (_f = resolvedCredential === null || resolvedCredential === void 0 ? void 0 : resolvedCredential.accountId) !== null && _f !== void 0 ? _f : context.accountId) !== null && _g !== void 0 ? _g : '').trim())
                                ? 'replace'
                                : 'add';
                            return [2 /*return*/, this.proxyMasterService.calculatePrice(dto, {
                                    accountId: (_h = resolvedCredential.accountId) !== null && _h !== void 0 ? _h : context.accountId,
                                    poolKey: (_j = resolvedCredential.poolKey) !== null && _j !== void 0 ? _j : context.poolKey,
                                    query: configPreview.query,
                                    pricingBehavior: pricingBehavior,
                                    requestedQuantity: Number.isFinite(configPreview.proxyCount) && configPreview.proxyCount > 0
                                        ? configPreview.proxyCount
                                        : null,
                                    requestedBandwidthGb: Number.isFinite(configPreview.bandwidth) && configPreview.bandwidth >= 0
                                        ? configPreview.bandwidth
                                        : null,
                                    requiresUnlimitedBandwidth: Number((_k = configPreview.bandwidth) !== null && _k !== void 0 ? _k : 0) === 0,
                                })];
                    }
                });
            });
        };
        ProxyService_1.prototype.getProxyProductActivationStatus = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var productCode, exclusivityValue, activeOrders, latestActiveOrder, context, mappedAccountId, localWebshareStatus, rawPlanId, localPlanId, activated;
                var _a, _b, _c, _d, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            productCode = String((_a = params.productCode) !== null && _a !== void 0 ? _a : 'proxy_server')
                                .trim()
                                .toLowerCase();
                            exclusivityValue = String((_b = params.exclusivityValue) !== null && _b !== void 0 ? _b : 'shared')
                                .trim()
                                .toLowerCase();
                            return [4 /*yield*/, this.repo.findActiveOrdersByUserAndProductCode(params.userId, productCode)];
                        case 1:
                            activeOrders = _g.sent();
                            latestActiveOrder = (_c = activeOrders[0]) !== null && _c !== void 0 ? _c : null;
                            // Rule: chỉ kích hoạt khi user có order active local cho đúng loại proxy.
                            if (!latestActiveOrder) {
                                return [2 /*return*/, {
                                        product_code: productCode,
                                        exclusivity_value: exclusivityValue,
                                        activated: false,
                                        webshare_plan_id: null,
                                        badge_label: 'ĐĂNG KÝ CHƯA KÍCH HOẠT',
                                        cta_label: 'Mua ngay',
                                        source: 'local_inactive',
                                        webshare_account_id: null,
                                    }];
                            }
                            context = this.getWebshareContext({
                                order: latestActiveOrder,
                                productCode: productCode,
                            });
                            mappedAccountId = String((_d = context.accountId) !== null && _d !== void 0 ? _d : '').trim();
                            // Rule: phải có mapping tài khoản WS cho order active thì mới xét đã kích hoạt.
                            if (!mappedAccountId) {
                                return [2 /*return*/, {
                                        product_code: productCode,
                                        exclusivity_value: exclusivityValue,
                                        activated: false,
                                        webshare_plan_id: null,
                                        badge_label: 'ĐĂNG KÝ CHƯA KÍCH HOẠT',
                                        cta_label: 'Mua ngay',
                                        source: 'no_mapping',
                                        webshare_account_id: null,
                                    }];
                            }
                            localWebshareStatus = String((_e = latestActiveOrder.webshare_status) !== null && _e !== void 0 ? _e : '')
                                .trim()
                                .toLowerCase();
                            rawPlanId = Number((_f = latestActiveOrder.webshare_plan_id) !== null && _f !== void 0 ? _f : 0);
                            localPlanId = Number.isFinite(rawPlanId) && rawPlanId > 0 ? rawPlanId : null;
                            activated = localWebshareStatus === 'active' && localPlanId !== null;
                            return [2 /*return*/, {
                                    product_code: productCode,
                                    exclusivity_value: exclusivityValue,
                                    activated: activated,
                                    webshare_plan_id: localPlanId,
                                    badge_label: activated ? 'ĐÃ KÍCH HOẠT' : 'ĐĂNG KÝ CHƯA KÍCH HOẠT',
                                    cta_label: activated ? 'Update gói' : 'Mua ngay',
                                    source: activated ? 'local_db_active' : 'local_db_pending',
                                    webshare_account_id: mappedAccountId,
                                }];
                    }
                });
            });
        };
        ProxyService_1.prototype.getOrdersList = function (userId, query) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, page, limit, orderBy, orderDir, offset, items, total;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = query.paginationOptions, page = _a.page, limit = _a.limit, orderBy = _a.orderBy, orderDir = _a.orderDir;
                            offset = query.offset;
                            return [4 /*yield*/, this.repo.findProxyOrdersByUserId(userId, {
                                    offset: offset,
                                    limit: limit,
                                    status: query.status,
                                    orderBy: orderBy && orderBy !== 'id' ? orderBy : 'created_at',
                                    orderDir: orderDir !== null && orderDir !== void 0 ? orderDir : 'desc',
                                })];
                        case 1:
                            items = _b.sent();
                            return [4 /*yield*/, this.repo.countProxyOrdersByUserId(userId, query.status)];
                        case 2:
                            total = _b.sent();
                            return [2 /*return*/, {
                                    data: items,
                                    meta: (0, pagination_helpers_1.createPaginationMeta)({ total: total, page: page, limit: limit }),
                                }];
                    }
                });
            });
        };
        ProxyService_1.prototype.getOrderSummary = function (userId, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var initialOrder, order, initialStatus, isPendingLike, recovered, refreshedOrder, error_17, proxyCount, meta, fallbackUsedBytes, fallbackUsedGb, fallbackLimitGb, proxyType, proxySubtype, registeredAt, expiresAt, bandwidthLimitGb, bandwidthIsUnlimited, bandwidthUsedBytes, bandwidthUsedGb, planId, productCode, webshareContext, _a, plan, stats, planRegisteredRaw, parsedRegistered, planRenewalDate, limitRaw, summedBytes, error_18;
                var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
                return __generator(this, function (_p) {
                    switch (_p.label) {
                        case 0: return [4 /*yield*/, this.repo.findProxyOrderByIdAndUserId(orderId, userId)];
                        case 1:
                            initialOrder = _p.sent();
                            if (!initialOrder) {
                                throw new common_1.NotFoundException('Proxy order not found');
                            }
                            order = initialOrder;
                            initialStatus = String((_b = order.status) !== null && _b !== void 0 ? _b : '')
                                .trim()
                                .toLowerCase();
                            isPendingLike = ['pending', 'paid', 'processing', 'pending_payment'].includes(initialStatus);
                            if (!isPendingLike) return [3 /*break*/, 7];
                            _p.label = 2;
                        case 2:
                            _p.trys.push([2, 6, , 7]);
                            return [4 /*yield*/, this.recoverOrderFromExistingWebshare(order)];
                        case 3:
                            recovered = _p.sent();
                            if (!recovered) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.repo.findProxyOrderByIdAndUserId(orderId, userId)];
                        case 4:
                            refreshedOrder = _p.sent();
                            if (refreshedOrder) {
                                order = refreshedOrder;
                            }
                            _p.label = 5;
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            error_17 = _p.sent();
                            this.logger.warn("Recover pending order ".concat(order.id, " on summary failed: ").concat(error_17 instanceof Error ? error_17.message : String(error_17)));
                            return [3 /*break*/, 7];
                        case 7: return [4 /*yield*/, this.repo.countProxiesByUserId(userId, {
                                order_id: order.id,
                            })];
                        case 8:
                            proxyCount = _p.sent();
                            meta = ((_c = order.webshare_meta) !== null && _c !== void 0 ? _c : {});
                            fallbackUsedBytes = Number((_f = (_e = (_d = meta.bandwidth_used_bytes) !== null && _d !== void 0 ? _d : meta.used_bandwidth_bytes) !== null && _e !== void 0 ? _e : meta.total_bandwidth_used) !== null && _f !== void 0 ? _f : 0);
                            fallbackUsedGb = Number((_h = (_g = meta.bandwidth_used_gb) !== null && _g !== void 0 ? _g : meta.used_bandwidth_gb) !== null && _h !== void 0 ? _h : 0);
                            fallbackLimitGb = Number((_k = (_j = meta.bandwidth_limit_gb) !== null && _j !== void 0 ? _j : meta.requested_bandwidth_value) !== null && _k !== void 0 ? _k : 0);
                            proxyType = null;
                            proxySubtype = null;
                            registeredAt = order.created_at ? new Date(order.created_at) : null;
                            expiresAt = order.expires_at ? new Date(order.expires_at) : null;
                            bandwidthLimitGb = Number.isFinite(fallbackLimitGb) && fallbackLimitGb > 0
                                ? fallbackLimitGb
                                : null;
                            bandwidthIsUnlimited = false;
                            bandwidthUsedBytes = Number.isFinite(fallbackUsedBytes) && fallbackUsedBytes >= 0
                                ? fallbackUsedBytes
                                : null;
                            bandwidthUsedGb = Number.isFinite(fallbackUsedGb) && fallbackUsedGb >= 0
                                ? fallbackUsedGb
                                : null;
                            planId = this.getOrderPlanId(order);
                            if (!planId) return [3 /*break*/, 13];
                            _p.label = 9;
                        case 9:
                            _p.trys.push([9, 12, , 13]);
                            return [4 /*yield*/, this.repo.findProxyProductCodeById(Number(order.product_id))];
                        case 10:
                            productCode = _p.sent();
                            webshareContext = this.getWebshareContext({
                                order: order,
                                productCode: productCode,
                            });
                            return [4 /*yield*/, Promise.all([
                                    this.proxyMasterService.getWebsharePlanById(planId, {
                                        accountId: webshareContext.accountId,
                                        poolKey: webshareContext.poolKey,
                                        query: webshareContext.query,
                                    }),
                                    this.proxyMasterService.getWebshareStats({ planId: planId }, {
                                        accountId: webshareContext.accountId,
                                        poolKey: webshareContext.poolKey,
                                        query: webshareContext.query,
                                    }),
                                ])];
                        case 11:
                            _a = _p.sent(), plan = _a[0], stats = _a[1];
                            proxyType =
                                typeof plan.proxy_type === 'string' ? String(plan.proxy_type) : null;
                            proxySubtype =
                                typeof plan.proxy_subtype === 'string'
                                    ? String(plan.proxy_subtype)
                                    : null;
                            planRegisteredRaw = (_o = (_m = (_l = plan.created_at) !== null && _l !== void 0 ? _l : plan.start_date) !== null && _m !== void 0 ? _m : plan.started_at) !== null && _o !== void 0 ? _o : null;
                            if (planRegisteredRaw) {
                                parsedRegistered = new Date(String(planRegisteredRaw));
                                if (!Number.isNaN(parsedRegistered.getTime())) {
                                    registeredAt = parsedRegistered;
                                }
                            }
                            planRenewalDate = this.getPlanRenewalDate(plan);
                            if (planRenewalDate) {
                                expiresAt = planRenewalDate;
                            }
                            limitRaw = Number(plan.bandwidth_limit);
                            if (Number.isFinite(limitRaw) && limitRaw >= 0) {
                                if (limitRaw === 0) {
                                    bandwidthIsUnlimited = true;
                                    bandwidthLimitGb = null;
                                }
                                else {
                                    bandwidthLimitGb = limitRaw;
                                }
                            }
                            summedBytes = stats.reduce(function (sum, row) {
                                var _a;
                                var bandwidth = Number((_a = row === null || row === void 0 ? void 0 : row.bandwidth_total) !== null && _a !== void 0 ? _a : 0);
                                if (!Number.isFinite(bandwidth) || bandwidth < 0)
                                    return sum;
                                return sum + bandwidth;
                            }, 0);
                            if (Number.isFinite(summedBytes) && summedBytes >= 0) {
                                bandwidthUsedBytes = summedBytes;
                                bandwidthUsedGb = this.bytesToGb(summedBytes);
                            }
                            return [3 /*break*/, 13];
                        case 12:
                            error_18 = _p.sent();
                            this.logger.warn("Unable to fetch Webshare summary for order ".concat(order.id, ": ").concat(error_18 instanceof Error ? error_18.message : String(error_18)));
                            return [3 /*break*/, 13];
                        case 13:
                            if (bandwidthUsedGb == null && bandwidthUsedBytes != null) {
                                bandwidthUsedGb = this.bytesToGb(bandwidthUsedBytes);
                            }
                            if (bandwidthUsedGb == null) {
                                bandwidthUsedGb = 0;
                            }
                            return [2 /*return*/, {
                                    order_id: order.id,
                                    status: order.status,
                                    quantity: proxyCount,
                                    webshare_plan_id: planId,
                                    webshare_profile: {
                                        proxy_type: proxyType,
                                        proxy_subtype: proxySubtype,
                                    },
                                    bandwidth: {
                                        used_bytes: bandwidthUsedBytes,
                                        used_gb: bandwidthUsedGb,
                                        limit_gb: bandwidthLimitGb,
                                        is_unlimited: bandwidthIsUnlimited,
                                    },
                                    registered_at: registeredAt && !Number.isNaN(registeredAt.getTime())
                                        ? registeredAt.toISOString()
                                        : null,
                                    expires_at: expiresAt && !Number.isNaN(expiresAt.getTime())
                                        ? expiresAt.toISOString()
                                        : null,
                                }];
                    }
                });
            });
        };
        ProxyService_1.prototype.getOrderTransactions = function (orderId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var order, transactions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.findProxyOrderByIdAndUserId(orderId, userId)];
                        case 1:
                            order = _a.sent();
                            if (!order) {
                                throw new common_1.NotFoundException('Proxy order not found');
                            }
                            return [4 /*yield*/, this.repo.findTransactionsByProxyOrderId(orderId)];
                        case 2:
                            transactions = _a.sent();
                            return [2 /*return*/, { data: transactions }];
                    }
                });
            });
        };
        ProxyService_1.prototype.getMyTransactions = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, page, limit) {
                var offset, _a, items, total;
                if (page === void 0) { page = 1; }
                if (limit === void 0) { limit = 20; }
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            offset = (page - 1) * limit;
                            return [4 /*yield*/, Promise.all([
                                    this.repo.findTransactionsByUserId(userId, { offset: offset, limit: limit }),
                                    this.repo.countTransactionsByUserId(userId),
                                ])];
                        case 1:
                            _a = _b.sent(), items = _a[0], total = _a[1];
                            return [2 /*return*/, {
                                    data: items,
                                    meta: (0, pagination_helpers_1.createPaginationMeta)({ total: total, page: page, limit: limit }),
                                }];
                    }
                });
            });
        };
        ProxyService_1.prototype.getManagedSubUsersForAdmin = function () {
            return __awaiter(this, void 0, void 0, function () {
                var items;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.findManagedWebshareOrders()];
                        case 1:
                            items = _a.sent();
                            return [2 /*return*/, {
                                    data: items.map(function (item) { return (__assign(__assign({}, item), { sync_status: item.order_status === 'active'
                                            ? 'Đã đồng bộ'
                                            : item.order_status === 'paid' ||
                                                item.order_status === 'pending' ||
                                                item.order_status === 'processing'
                                                ? 'Đang kết nối'
                                                : 'Chưa đồng bộ' })); }),
                                }];
                    }
                });
            });
        };
        ProxyService_1.prototype.syncOrderFromWebshareForAdmin = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order, isPendingLike, priceInput, hydratedOrder, label, activated, proxyCount_1, error_19, detail, message, recovered, refreshedOrder, proxyCount;
                var _a, _b, _c, _d, _e, _f, _g, _h;
                return __generator(this, function (_j) {
                    switch (_j.label) {
                        case 0: return [4 /*yield*/, this.repo.findProxyOrderById(orderId)];
                        case 1:
                            order = _j.sent();
                            if (!order) {
                                throw new common_1.NotFoundException('Proxy order not found');
                            }
                            isPendingLike = order.status === 'paid' ||
                                order.status === 'pending' ||
                                order.status === 'processing';
                            if (!isPendingLike) return [3 /*break*/, 14];
                            priceInput = this.buildPriceInputFromOrder(order);
                            return [4 /*yield*/, this.ensurePendingOrderCredential(order, priceInput)];
                        case 2:
                            hydratedOrder = (_a = (_j.sent())) !== null && _a !== void 0 ? _a : order;
                            if (!!String((_b = hydratedOrder.webshare_account_id) !== null && _b !== void 0 ? _b : '').trim()) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.markOrderPending({
                                    order: hydratedOrder,
                                    message: 'Đang chờ gán email Webshare từ admin.',
                                    webshareMeta: (_c = hydratedOrder.webshare_meta) !== null && _c !== void 0 ? _c : null,
                                    code: 'waiting_webshare_account',
                                })];
                        case 3:
                            _j.sent();
                            return [2 /*return*/, {
                                    success: false,
                                    order_id: hydratedOrder.id,
                                    status: hydratedOrder.status,
                                    proxy_count: 0,
                                    message: 'Đơn đang chờ gán tài khoản Webshare',
                                }];
                        case 4:
                            label = "bhm-order-".concat(hydratedOrder.id.slice(0, 8));
                            _j.label = 5;
                        case 5:
                            _j.trys.push([5, 8, , 14]);
                            return [4 /*yield*/, this.activateProxyOrder({
                                    userId: hydratedOrder.user_id,
                                    order: hydratedOrder,
                                    priceInput: priceInput,
                                    label: label,
                                })];
                        case 6:
                            activated = _j.sent();
                            return [4 /*yield*/, this.repo.countProxiesByOrderId(activated.id)];
                        case 7:
                            proxyCount_1 = _j.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    order_id: activated.id,
                                    status: activated.status,
                                    proxy_count: proxyCount_1,
                                    message: 'Đồng bộ và kích hoạt đơn thành công',
                                }];
                        case 8:
                            error_19 = _j.sent();
                            detail = this.proxyMasterService.getWebshareErrorMessage(error_19);
                            message = detail !== null && detail !== void 0 ? detail : (error_19 instanceof Error ? error_19.message : 'Không thể kích hoạt proxy');
                            if (!(error_19 instanceof RetryableProxyActivationError)) return [3 /*break*/, 10];
                            return [4 /*yield*/, this.markOrderPending({
                                    order: hydratedOrder,
                                    message: message,
                                    planId: (_d = error_19.details.planId) !== null && _d !== void 0 ? _d : undefined,
                                    webshareMeta: (_e = error_19.details.webshareMeta) !== null && _e !== void 0 ? _e : undefined,
                                    code: error_19.details.code,
                                })];
                        case 9:
                            _j.sent();
                            return [2 /*return*/, {
                                    success: false,
                                    order_id: hydratedOrder.id,
                                    status: 'pending',
                                    proxy_count: 0,
                                    message: message,
                                }];
                        case 10:
                            if (!this.isWaitingForWebshareAccount(message)) return [3 /*break*/, 12];
                            return [4 /*yield*/, this.markOrderPending({
                                    order: hydratedOrder,
                                    message: message,
                                    webshareMeta: (_f = hydratedOrder.webshare_meta) !== null && _f !== void 0 ? _f : null,
                                    code: 'waiting_webshare_account',
                                })];
                        case 11:
                            _j.sent();
                            return [2 /*return*/, {
                                    success: false,
                                    order_id: hydratedOrder.id,
                                    status: 'pending',
                                    proxy_count: 0,
                                    message: message,
                                }];
                        case 12: return [4 /*yield*/, this.markOrderPending({
                                order: hydratedOrder,
                                message: message,
                                webshareMeta: (_g = hydratedOrder.webshare_meta) !== null && _g !== void 0 ? _g : null,
                                code: 'manual_processing_required',
                            })];
                        case 13:
                            _j.sent();
                            return [2 /*return*/, {
                                    success: false,
                                    order_id: hydratedOrder.id,
                                    status: 'pending',
                                    proxy_count: 0,
                                    message: message,
                                }];
                        case 14: return [4 /*yield*/, this.recoverOrderFromExistingWebshare(order)];
                        case 15:
                            recovered = _j.sent();
                            if (!recovered) {
                                throw new common_1.BadRequestException('Không tìm thấy dữ liệu proxy từ Webshare cho đơn hàng này');
                            }
                            return [4 /*yield*/, this.repo.findProxyOrderById(order.id)];
                        case 16:
                            refreshedOrder = _j.sent();
                            return [4 /*yield*/, this.repo.countProxiesByOrderId(order.id)];
                        case 17:
                            proxyCount = _j.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    order_id: order.id,
                                    status: (_h = refreshedOrder === null || refreshedOrder === void 0 ? void 0 : refreshedOrder.status) !== null && _h !== void 0 ? _h : order.status,
                                    proxy_count: proxyCount,
                                    message: 'Đồng bộ lại đơn từ Webshare thành công',
                                }];
                    }
                });
            });
        };
        ProxyService_1.prototype.revokeManagedSubUserForAdmin = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.repo.findProxyOrderById(orderId)];
                        case 1:
                            order = _a.sent();
                            if (!order) {
                                throw new common_1.NotFoundException('Proxy order not found');
                            }
                            return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.repo.deleteProxiesByOrderId(order.id, trx)];
                                            case 1:
                                                _a.sent();
                                                return [4 /*yield*/, this.repo.updateProxyOrder(order.id, {
                                                        status: 'expired',
                                                        webshare_status: 'revoked',
                                                        webshare_error: null,
                                                    }, trx)];
                                            case 2:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    order_id: order.id,
                                    message: 'Đã thu hồi đơn và xoá proxy local',
                                }];
                    }
                });
            });
        };
        ProxyService_1.prototype.renewOrder = function (userId, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order, priceInput, pricing, usdTotal, usdToVndRate, subtotalVnd, vatVnd, amount, result;
                var _this = this;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.repo.findProxyOrderByIdAndUserId(orderId, userId)];
                        case 1:
                            order = _b.sent();
                            if (!order) {
                                throw new common_1.NotFoundException('Proxy order not found');
                            }
                            priceInput = this.buildPriceInputFromOrder(order);
                            return [4 /*yield*/, this.proxyMasterService.calculatePrice(priceInput)];
                        case 2:
                            pricing = _b.sent();
                            usdTotal = Number((_a = pricing === null || pricing === void 0 ? void 0 : pricing.total) !== null && _a !== void 0 ? _a : 0);
                            if (!Number.isFinite(usdTotal) || usdTotal <= 0) {
                                throw new common_1.BadRequestException('Không thể tính giá gia hạn cho đơn proxy');
                            }
                            usdToVndRate = 26000;
                            subtotalVnd = this.ceil(usdTotal * usdToVndRate);
                            vatVnd = this.ceil(subtotalVnd * 0.1);
                            amount = subtotalVnd + vatVnd;
                            return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                    var wallet, transactionNumber, expiresAt;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.walletRepository.findByUserId(userId, trx)];
                                            case 1:
                                                wallet = _a.sent();
                                                if (!!wallet) return [3 /*break*/, 3];
                                                return [4 /*yield*/, this.walletRepository.createWallet(userId, trx)];
                                            case 2:
                                                wallet = _a.sent();
                                                _a.label = 3;
                                            case 3:
                                                if (wallet.is_locked) {
                                                    throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.WALLET_IS_LOCKED);
                                                }
                                                if (Number(wallet.balance) < amount) {
                                                    throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.WALLET_INSUFFICIENT_BALANCE);
                                                }
                                                return [4 /*yield*/, this.walletRepository.deductBalance(trx, wallet.id, amount, false)];
                                            case 4:
                                                _a.sent();
                                                transactionNumber = (0, wallet_transaction_util_1.generateTransactionNumber)();
                                                return [4 /*yield*/, trx('wallet_transactions').insert({
                                                        transaction_number: transactionNumber,
                                                        wallet_id: wallet.id,
                                                        user_id: userId,
                                                        type: 'PROXY',
                                                        method: 'wallet',
                                                        amount: amount,
                                                        fee_amount: 0,
                                                        status: 'success',
                                                        reference_code: order.id,
                                                        note: 'Gia hạn proxy',
                                                        created_at: new Date(),
                                                        completed_at: new Date(),
                                                    })];
                                            case 5:
                                                _a.sent();
                                                return [4 /*yield*/, this.repo.createProxyTransaction({
                                                        proxy_order_id: order.id,
                                                        type: 'renewal',
                                                        amount: amount,
                                                        currency: 'VND',
                                                        status: 'success',
                                                        paid_at: new Date(),
                                                        metadata: {
                                                            source: 'wallet',
                                                            wallet_transaction_number: transactionNumber,
                                                        },
                                                    }, trx)];
                                            case 6:
                                                _a.sent();
                                                expiresAt = this.calculateOrderExpiry(order);
                                                return [4 /*yield*/, this.repo.updateProxyOrder(order.id, {
                                                        status: 'active',
                                                        expires_at: expiresAt,
                                                        webshare_error: null,
                                                    }, trx)];
                                            case 7:
                                                _a.sent();
                                                return [2 /*return*/, { amount: amount, expiresAt: expiresAt }];
                                        }
                                    });
                                }); })];
                        case 3:
                            result = _b.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    order_id: order.id,
                                    amount: result.amount,
                                    expires_at: result.expiresAt,
                                    message: 'Gia hạn proxy thành công',
                                }];
                    }
                });
            });
        };
        ProxyService_1.prototype.changeOrderPassword = function (userId, orderId, newPassword) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    void userId;
                    void orderId;
                    void newPassword;
                    throw new common_1.BadRequestException('Chức năng đổi mật khẩu riêng đã tắt ở chế độ tài khoản global.');
                });
            });
        };
        ProxyService_1.prototype.processPendingOrders = function () {
            return __awaiter(this, void 0, void 0, function () {
                var cutoff, pendingOrders, _i, pendingOrders_1, order, recovered, error_20, retryCount, priceInput, hydratedOrder, label, error_21, detail, message;
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                return __generator(this, function (_l) {
                    switch (_l.label) {
                        case 0:
                            cutoff = new Date(Date.now() - this.retryDelayMs);
                            return [4 /*yield*/, this.repo.findPendingProxyOrders({
                                    limit: this.retryBatchSize,
                                    olderThan: cutoff,
                                })];
                        case 1:
                            pendingOrders = _l.sent();
                            _i = 0, pendingOrders_1 = pendingOrders;
                            _l.label = 2;
                        case 2:
                            if (!(_i < pendingOrders_1.length)) return [3 /*break*/, 21];
                            order = pendingOrders_1[_i];
                            _l.label = 3;
                        case 3:
                            _l.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.recoverOrderFromExistingWebshare(order)];
                        case 4:
                            recovered = _l.sent();
                            if (recovered) {
                                return [3 /*break*/, 20];
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            error_20 = _l.sent();
                            this.logger.warn("Recover pending order ".concat(order.id, " failed: ").concat(error_20 instanceof Error ? error_20.message : String(error_20)));
                            return [3 /*break*/, 6];
                        case 6:
                            if (this.isRetryPaused(order)) {
                                return [3 /*break*/, 20];
                            }
                            retryCount = this.getRetryCount(order);
                            if (!(retryCount >= this.retryMaxAttempts && this.shouldPauseRetry(order))) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.repo.updateProxyOrder(order.id, {
                                    status: 'pending',
                                    webshare_status: 'pending',
                                    webshare_error: 'Tạm dừng tự xử lý sau nhiều lần thử. Vui lòng liên hệ hỗ trợ.',
                                    webshare_meta: __assign(__assign({}, ((_a = order.webshare_meta) !== null && _a !== void 0 ? _a : {})), { retry: __assign(__assign({}, ((_c = (_b = order.webshare_meta) === null || _b === void 0 ? void 0 : _b.retry) !== null && _c !== void 0 ? _c : {})), { paused: true }) }),
                                })];
                        case 7:
                            _l.sent();
                            return [3 /*break*/, 20];
                        case 8:
                            priceInput = this.buildPriceInputFromOrder(order);
                            return [4 /*yield*/, this.ensurePendingOrderCredential(order, priceInput)];
                        case 9:
                            hydratedOrder = (_d = (_l.sent())) !== null && _d !== void 0 ? _d : order;
                            if (!!String((_e = hydratedOrder.webshare_account_id) !== null && _e !== void 0 ? _e : '').trim()) return [3 /*break*/, 11];
                            return [4 /*yield*/, this.markOrderPending({
                                    order: hydratedOrder,
                                    message: 'Đang chờ gán email Webshare từ admin.',
                                    webshareMeta: (_f = hydratedOrder.webshare_meta) !== null && _f !== void 0 ? _f : null,
                                    code: 'waiting_webshare_account',
                                })];
                        case 10:
                            _l.sent();
                            return [3 /*break*/, 20];
                        case 11:
                            label = "bhm-order-".concat(order.id.slice(0, 8));
                            _l.label = 12;
                        case 12:
                            _l.trys.push([12, 14, , 20]);
                            return [4 /*yield*/, this.activateProxyOrder({
                                    userId: hydratedOrder.user_id,
                                    order: hydratedOrder,
                                    priceInput: priceInput,
                                    label: label,
                                })];
                        case 13:
                            _l.sent();
                            return [3 /*break*/, 20];
                        case 14:
                            error_21 = _l.sent();
                            detail = this.proxyMasterService.getWebshareErrorMessage(error_21);
                            message = detail !== null && detail !== void 0 ? detail : (error_21 instanceof Error ? error_21.message : 'Không thể kích hoạt proxy');
                            if (!(error_21 instanceof RetryableProxyActivationError)) return [3 /*break*/, 16];
                            return [4 /*yield*/, this.markOrderPending({
                                    order: hydratedOrder,
                                    message: message,
                                    planId: (_g = error_21.details.planId) !== null && _g !== void 0 ? _g : undefined,
                                    webshareMeta: (_h = error_21.details.webshareMeta) !== null && _h !== void 0 ? _h : undefined,
                                    code: error_21.details.code,
                                })];
                        case 15:
                            _l.sent();
                            return [3 /*break*/, 20];
                        case 16:
                            if (!this.isWaitingForWebshareAccount(message)) return [3 /*break*/, 18];
                            return [4 /*yield*/, this.markOrderPending({
                                    order: hydratedOrder,
                                    message: message,
                                    webshareMeta: (_j = hydratedOrder.webshare_meta) !== null && _j !== void 0 ? _j : null,
                                    code: 'waiting_webshare_account',
                                })];
                        case 17:
                            _l.sent();
                            return [3 /*break*/, 20];
                        case 18: return [4 /*yield*/, this.markOrderPending({
                                order: hydratedOrder,
                                message: message,
                                webshareMeta: (_k = hydratedOrder.webshare_meta) !== null && _k !== void 0 ? _k : null,
                                code: 'manual_processing_required',
                            })];
                        case 19:
                            _l.sent();
                            return [3 /*break*/, 20];
                        case 20:
                            _i++;
                            return [3 /*break*/, 2];
                        case 21: return [2 /*return*/];
                    }
                });
            });
        };
        return ProxyService_1;
    }());
    __setFunctionName(_classThis, "ProxyService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProxyService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProxyService = _classThis;
}();
exports.ProxyService = ProxyService;
