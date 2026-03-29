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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebshareAdminService = void 0;
var common_1 = require("@nestjs/common");
var axios_1 = require("axios");
var webshare_config_types_1 = require("@/modules/webshare/webshare-config.types");
var WebshareAdminService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var WebshareAdminService = _classThis = /** @class */ (function () {
        function WebshareAdminService_1(knex, webshareConfigService, proxyMasterService, proxyService) {
            this.knex = knex;
            this.webshareConfigService = webshareConfigService;
            this.proxyMasterService = proxyMasterService;
            this.proxyService = proxyService;
            this.logger = new common_1.Logger(WebshareAdminService.name);
            this.dashboardLowThresholdRatio = 0.15;
            this.poolLabels = {
                proxy_server_shared: 'Proxy máy chủ - Shared',
                proxy_server_private: 'Proxy máy chủ - Private',
                proxy_server_dedicated: 'Proxy máy chủ - Dedicated',
                static_residential_shared: 'Proxy dân cư tĩnh - Shared ISP',
                static_residential_private: 'Proxy dân cư tĩnh - Private ISP',
                static_residential_dedicated: 'Proxy dân cư tĩnh - Dedicated ISP',
                rotating_residential: 'Proxy dân cư xoay',
            };
        }
        WebshareAdminService_1.prototype.normalizeProxyCountries = function (value) {
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
        WebshareAdminService_1.prototype.toProxyCountryList = function (countries) {
            return Object.entries(countries)
                .map(function (_a) {
                var country_code = _a[0], quantity = _a[1];
                return ({
                    country_code: country_code,
                    quantity: Math.max(1, Math.trunc(Number(quantity) || 0)),
                });
            })
                .filter(function (item) { return item.quantity > 0; })
                .sort(function (a, b) {
                if (a.country_code === 'ZZ')
                    return -1;
                if (b.country_code === 'ZZ')
                    return 1;
                if (b.quantity !== a.quantity)
                    return b.quantity - a.quantity;
                return a.country_code.localeCompare(b.country_code);
            });
        };
        WebshareAdminService_1.prototype.getProxyLowThreshold = function (total) {
            return Math.max(5, Math.ceil(Math.max(0, total) * this.dashboardLowThresholdRatio));
        };
        WebshareAdminService_1.prototype.getBandwidthLowThreshold = function (total) {
            if (total == null || total <= 0) {
                return null;
            }
            return Math.max(1, Math.ceil(total * this.dashboardLowThresholdRatio));
        };
        WebshareAdminService_1.prototype.bytesToGb = function (value) {
            return Number((value / 1024 / 1024 / 1024).toFixed(3));
        };
        WebshareAdminService_1.prototype.getPlanRenewalDate = function (plan) {
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
        WebshareAdminService_1.prototype.computeDashboardHealth = function (params) {
            var poolKey = params.poolKey, purchasedProxyCount = params.purchasedProxyCount, availableProxyCount = params.availableProxyCount, purchasedBandwidthGb = params.purchasedBandwidthGb, availableBandwidthGb = params.availableBandwidthGb, hasUnlimitedBandwidthPlan = params.hasUnlimitedBandwidthPlan;
            if (poolKey !== 'rotating_residential' && availableProxyCount < 0) {
                return 'over_allocated';
            }
            if (!hasUnlimitedBandwidthPlan &&
                availableBandwidthGb != null &&
                availableBandwidthGb < 0) {
                return 'over_allocated';
            }
            var proxyIsLow = poolKey !== 'rotating_residential' &&
                purchasedProxyCount > 0 &&
                availableProxyCount <= this.getProxyLowThreshold(purchasedProxyCount);
            var bandwidthThreshold = this.getBandwidthLowThreshold(purchasedBandwidthGb);
            var bandwidthIsLow = !hasUnlimitedBandwidthPlan &&
                bandwidthThreshold != null &&
                availableBandwidthGb != null &&
                availableBandwidthGb <= bandwidthThreshold;
            if (proxyIsLow || bandwidthIsLow) {
                return 'low';
            }
            return 'healthy';
        };
        WebshareAdminService_1.prototype.derivePoolKeyForOrder = function (order) {
            var _a, _b, _c, _d, _e, _f, _g;
            var meta = ((_a = order.webshare_meta) !== null && _a !== void 0 ? _a : {});
            var explicitPool = String((_c = (_b = meta.webshare_pool_key) !== null && _b !== void 0 ? _b : meta.requested_pool_key) !== null && _c !== void 0 ? _c : '').trim();
            if (explicitPool &&
                webshare_config_types_1.WEBSHARE_POOL_KEYS.includes(explicitPool)) {
                return explicitPool;
            }
            var requestedProxyType = String((_d = meta.requested_proxy_type) !== null && _d !== void 0 ? _d : '')
                .trim()
                .toLowerCase();
            var requestedProxySubtype = String((_e = meta.requested_proxy_subtype) !== null && _e !== void 0 ? _e : '')
                .trim()
                .toLowerCase();
            if (requestedProxyType && requestedProxySubtype) {
                var byQuery = this.webshareConfigService.derivePoolKeyFromQuery({
                    proxy_type: requestedProxyType,
                    proxy_subtype: requestedProxySubtype,
                });
                if (byQuery)
                    return byQuery;
            }
            var productCode = String((_f = order.product_code) !== null && _f !== void 0 ? _f : '')
                .trim()
                .toLowerCase();
            var exclusivity = String((_g = meta.requested_exclusivity_value) !== null && _g !== void 0 ? _g : '')
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
        WebshareAdminService_1.prototype.parseRequestedQuantity = function (order, proxyCountMap) {
            var _a, _b, _c, _d;
            var meta = ((_a = order.webshare_meta) !== null && _a !== void 0 ? _a : {});
            var requested = Number((_b = meta.requested_quantity_value) !== null && _b !== void 0 ? _b : 0);
            if (Number.isFinite(requested) && requested > 0) {
                return Math.trunc(requested);
            }
            var fallbackCount = Number((_c = proxyCountMap.get(order.id)) !== null && _c !== void 0 ? _c : 0);
            if (Number.isFinite(fallbackCount) && fallbackCount > 0) {
                return Math.trunc(fallbackCount);
            }
            if (String((_d = order.product_code) !== null && _d !== void 0 ? _d : '').trim().toLowerCase() === 'rotating_residential') {
                return 1;
            }
            return 0;
        };
        WebshareAdminService_1.prototype.parseRequestedBandwidth = function (order) {
            var _a, _b;
            var meta = ((_a = order.webshare_meta) !== null && _a !== void 0 ? _a : {});
            var value = Number((_b = meta.requested_bandwidth_value) !== null && _b !== void 0 ? _b : 0);
            if (!Number.isFinite(value)) {
                return { bandwidthGb: 0, unlimited: false };
            }
            if (value === 0) {
                return { bandwidthGb: 0, unlimited: true };
            }
            return { bandwidthGb: Math.max(0, Math.trunc(value)), unlimited: false };
        };
        WebshareAdminService_1.prototype.planToPoolKey = function (plan) {
            var _a, _b;
            return this.webshareConfigService.derivePoolKeyFromQuery({
                proxy_type: String((_a = plan.proxy_type) !== null && _a !== void 0 ? _a : ''),
                proxy_subtype: String((_b = plan.proxy_subtype) !== null && _b !== void 0 ? _b : ''),
            });
        };
        WebshareAdminService_1.prototype.parsePlanBandwidth = function (plan) {
            var _a;
            var value = Number((_a = plan.bandwidth_limit) !== null && _a !== void 0 ? _a : 0);
            if (!Number.isFinite(value))
                return { bandwidthGb: 0, unlimited: false };
            if (value === 0)
                return { bandwidthGb: 0, unlimited: true };
            return { bandwidthGb: Math.max(0, Math.trunc(value)), unlimited: false };
        };
        WebshareAdminService_1.prototype.mapManagedSubUserSyncStatus = function (orderStatus) {
            if (orderStatus === 'active') {
                return 'Đã đồng bộ';
            }
            if (orderStatus === 'pending' || orderStatus === 'processing') {
                return 'Đang chờ đồng bộ';
            }
            if (orderStatus === 'expired') {
                return 'Đã thu hồi';
            }
            return 'Chưa đồng bộ';
        };
        WebshareAdminService_1.prototype.applyManagedSubUserDateFilter = function (qb, days) {
            if (days == null || !Number.isFinite(days)) {
                return;
            }
            if (days === 0) {
                qb.andWhere('po.created_at', '>=', this.knex.raw("DATE_TRUNC('day', NOW())"));
                return;
            }
            if (days > 0) {
                qb.andWhere('po.created_at', '>=', this.knex.raw("NOW() - (? * INTERVAL '1 day')", [days]));
            }
        };
        WebshareAdminService_1.prototype.getConfig = function () {
            return __awaiter(this, void 0, void 0, function () {
                var config;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.webshareConfigService.getConfig()];
                        case 1:
                            config = _a.sent();
                            return [2 /*return*/, {
                                    updated_at: config.updated_at,
                                    pools: webshare_config_types_1.WEBSHARE_POOL_KEYS.map(function (key) { return ({
                                        key: key,
                                        label: _this.poolLabels[key],
                                    }); }),
                                    accounts: config.accounts.map(function (account) { return (__assign(__assign({}, account), { api_key_masked: _this.webshareConfigService.maskApiKey(account.api_key) })); }),
                                }];
                    }
                });
            });
        };
        WebshareAdminService_1.prototype.updateConfig = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var config;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.webshareConfigService.updateConfig({
                                accounts: dto.accounts,
                            })];
                        case 1:
                            config = _a.sent();
                            return [2 /*return*/, {
                                    updated_at: config.updated_at,
                                    pools: webshare_config_types_1.WEBSHARE_POOL_KEYS.map(function (key) { return ({
                                        key: key,
                                        label: _this.poolLabels[key],
                                    }); }),
                                    accounts: config.accounts.map(function (account) { return (__assign(__assign({}, account), { api_key_masked: _this.webshareConfigService.maskApiKey(account.api_key) })); }),
                                }];
                    }
                });
            });
        };
        WebshareAdminService_1.prototype.testConnection = function (dto) {
            return __awaiter(this, void 0, void 0, function () {
                var apiKey, response, planCount, error_1, error_2, detail;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            apiKey = String((_a = dto.api_key) !== null && _a !== void 0 ? _a : '').trim();
                            if (!apiKey) {
                                throw new Error('Thiếu API key để kiểm tra kết nối.');
                            }
                            _c.label = 1;
                        case 1:
                            _c.trys.push([1, 7, , 8]);
                            return [4 /*yield*/, axios_1.default.get('https://proxy.webshare.io/api/v2/subscription/plan/', {
                                    headers: {
                                        Authorization: "Token ".concat(apiKey),
                                    },
                                    timeout: 15000,
                                })];
                        case 2:
                            response = _c.sent();
                            planCount = Array.isArray((_b = response.data) === null || _b === void 0 ? void 0 : _b.results)
                                ? response.data.results.length
                                : 0;
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, this.proxyService.processPendingOrders()];
                        case 4:
                            _c.sent();
                            return [3 /*break*/, 6];
                        case 5:
                            error_1 = _c.sent();
                            this.logger.warn("Process pending proxy orders after manual sync failed: ".concat(error_1 instanceof Error ? error_1.message : String(error_1)));
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/, {
                                connected: true,
                                plan_count: planCount,
                                message: 'Kết nối Webshare thành công. Hệ thống đã chạy xử lý đơn chờ.',
                            }];
                        case 7:
                            error_2 = _c.sent();
                            detail = this.proxyMasterService.getWebshareErrorMessage(error_2);
                            return [2 /*return*/, {
                                    connected: false,
                                    plan_count: 0,
                                    message: detail ||
                                        (error_2 instanceof Error
                                            ? error_2.message
                                            : 'Không thể kết nối Webshare'),
                                }];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        WebshareAdminService_1.prototype.getManagedSubUsers = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.proxyService.getManagedSubUsersForAdmin()];
                });
            });
        };
        WebshareAdminService_1.prototype.getManagedSubUserOrdersByUser = function (userId, query) {
            return __awaiter(this, void 0, void 0, function () {
                var config, accountEmailById, page, pageRow, offset, keyword, rawDays, days, proxyCountSubquery, paymentEventsBase, eventsSubquery, ordersFromEventsSubquery, _a, items, eventStats, orderStats, totalRow, orderItems, eventSummary, orderSummary;
                var _this = this;
                var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
                return __generator(this, function (_y) {
                    switch (_y.label) {
                        case 0: return [4 /*yield*/, this.webshareConfigService.getConfig()];
                        case 1:
                            config = _y.sent();
                            accountEmailById = new Map(((_b = config.accounts) !== null && _b !== void 0 ? _b : [])
                                .filter(function (item) { return Boolean((item === null || item === void 0 ? void 0 : item.id) && (item === null || item === void 0 ? void 0 : item.email)); })
                                .map(function (item) { return [String(item.id), String(item.email)]; }));
                            page = Math.max(1, Math.trunc(Number((_c = query.page) !== null && _c !== void 0 ? _c : 1) || 1));
                            pageRow = Math.min(100, Math.max(1, Math.trunc(Number((_d = query.pageRow) !== null && _d !== void 0 ? _d : 10) || 10)));
                            offset = (page - 1) * pageRow;
                            keyword = String((_e = query.keyword) !== null && _e !== void 0 ? _e : '').trim();
                            rawDays = query.days == null ? null : String(query.days).trim();
                            days = rawDays == null || rawDays === ''
                                ? null
                                : Number(rawDays);
                            proxyCountSubquery = this.knex('proxies')
                                .select('proxy_order_id')
                                .count('id as proxy_count')
                                .groupBy('proxy_order_id')
                                .as('pxc');
                            paymentEventsBase = this.knex('proxy_transactions as pt')
                                .join('proxy_orders as po', 'po.id', 'pt.proxy_order_id')
                                .leftJoin('users as u', 'u.id', 'po.user_id')
                                .leftJoin('proxy_products as pp', 'pp.id', 'po.product_id')
                                .leftJoin(proxyCountSubquery, 'pxc.proxy_order_id', 'po.id')
                                .where('po.user_id', userId)
                                .where('pt.status', 'success')
                                .where('pt.type', 'payment')
                                .modify(function (qb) {
                                if (!keyword)
                                    return;
                                var term = "%".concat(keyword, "%");
                                qb.andWhere(function (builder) {
                                    builder
                                        .whereILike('po.id', term)
                                        .orWhereILike('po.webshare_account_id', term)
                                        .orWhereILike('po.webshare_pool_key', term)
                                        .orWhereILike('u.email', term)
                                        .orWhereRaw("CAST(po.webshare_subuser_id AS TEXT) ILIKE ?", [term])
                                        .orWhereRaw("CAST(pt.metadata AS TEXT) ILIKE ?", [term])
                                        .orWhereILike('pp.name_vi', term)
                                        .orWhereILike('pp.name_en', term)
                                        .orWhereILike('pp.code', term);
                                });
                            })
                                .modify(function (qb) {
                                if (days == null || !Number.isFinite(days))
                                    return;
                                if (days === 0) {
                                    qb.andWhere('pt.created_at', '>=', _this.knex.raw("DATE_TRUNC('day', NOW())"));
                                    return;
                                }
                                if (days > 0) {
                                    qb.andWhere('pt.created_at', '>=', _this.knex.raw("NOW() - (? * INTERVAL '1 day')", [days]));
                                }
                            })
                                .select('pt.id as transaction_id', 'pt.created_at as transaction_created_at', 'pt.amount as transaction_amount', 'pt.metadata as transaction_metadata', 'po.id as order_id', 'po.created_at as order_created_at', 'po.webshare_activated_at as webshare_activated_at', 'po.user_id', 'u.email as user_email', 'pp.code as product_code', this.knex.raw("COALESCE(pp.name_vi, pp.name_en, pp.code) as product_name"), 'po.status as order_status', 'po.webshare_subuser_id', 'po.webshare_account_id', 'po.webshare_pool_key', 'po.expires_at', 'po.webshare_meta', this.knex.raw("COALESCE(pxc.proxy_count, 0) as proxy_count"), this.knex.raw("ROW_NUMBER() OVER (PARTITION BY po.id ORDER BY pt.created_at ASC, pt.id ASC) as order_payment_index"));
                            eventsSubquery = paymentEventsBase.clone().as('events');
                            ordersFromEventsSubquery = this.knex
                                .from(eventsSubquery)
                                .groupBy('order_id')
                                .select([
                                'order_id',
                                this.knex.raw("MAX(order_status) as order_status"),
                                this.knex.raw("MAX(expires_at) as expires_at"),
                                this.knex.raw("MAX(webshare_subuser_id)::BIGINT as webshare_subuser_id"),
                                this.knex.raw("MAX(webshare_activated_at) as registered_at"),
                                this.knex.raw("MAX(proxy_count)::INTEGER as proxy_count"),
                            ])
                                .as('orders');
                            return [4 /*yield*/, Promise.all([
                                    paymentEventsBase
                                        .clone()
                                        .orderBy('pt.created_at', 'desc')
                                        .offset(offset)
                                        .limit(pageRow),
                                    this.knex
                                        .from(eventsSubquery)
                                        .select([
                                        this.knex.raw("COUNT(DISTINCT events.order_id)::INTEGER as total_orders"),
                                        this.knex.raw("COUNT(*)::INTEGER as total_events"),
                                        this.knex.raw("COUNT(\n              CASE\n                WHEN COALESCE(events.transaction_metadata->>'action_type', '') = 'upgrade'\n                  OR (\n                    COALESCE(events.transaction_metadata->>'action_type', '') = ''\n                    AND events.order_payment_index > 1\n                  )\n                THEN 1\n              END\n            )::INTEGER as total_upgrades"),
                                        this.knex.raw("COALESCE(SUM(CAST(events.transaction_amount AS DECIMAL)), 0)::BIGINT as total_amount"),
                                        this.knex.raw("MAX(events.transaction_created_at) as latest_order_at"),
                                        this.knex.raw("MAX(events.user_email) as user_email"),
                                    ])
                                        .first(),
                                    this.knex
                                        .from(ordersFromEventsSubquery)
                                        .select([
                                        this.knex.raw("COALESCE(SUM(CAST(orders.proxy_count AS INTEGER)), 0)::INTEGER as total_proxy_count"),
                                        this.knex.raw("COUNT(CASE WHEN orders.order_status = 'active' THEN 1 END)::INTEGER as synced_orders"),
                                        this.knex.raw("COUNT(CASE WHEN orders.order_status IN ('pending', 'processing') THEN 1 END)::INTEGER as pending_orders"),
                                        this.knex.raw("COUNT(CASE WHEN orders.order_status = 'expired' THEN 1 END)::INTEGER as revoked_orders"),
                                        this.knex.raw("COUNT(CASE WHEN orders.order_status NOT IN ('active', 'pending', 'processing', 'expired') THEN 1 END)::INTEGER as unsynced_orders"),
                                        this.knex.raw("MIN(CASE\n              WHEN orders.expires_at IS NOT NULL\n               AND orders.order_status IN ('active', 'pending', 'processing')\n              THEN orders.expires_at\n            END) as nearest_expiry_at"),
                                        this.knex.raw("MAX(CASE\n              WHEN orders.order_status IN ('active', 'pending', 'processing')\n              THEN orders.webshare_subuser_id\n            END)::BIGINT as current_subuser_id"),
                                        this.knex.raw("MAX(CASE\n              WHEN orders.order_status IN ('active', 'pending', 'processing')\n              THEN orders.registered_at\n            END) as current_registered_at"),
                                        this.knex.raw("MAX(CASE\n              WHEN orders.order_status IN ('active', 'pending', 'processing')\n              THEN orders.expires_at\n            END) as current_expires_at"),
                                    ])
                                        .first(),
                                    this.knex.from(eventsSubquery).count('* as c').first(),
                                ])];
                        case 2:
                            _a = _y.sent(), items = _a[0], eventStats = _a[1], orderStats = _a[2], totalRow = _a[3];
                            orderItems = Array.isArray(items)
                                ? items
                                : [];
                            eventSummary = (_f = eventStats) !== null && _f !== void 0 ? _f : {};
                            orderSummary = (_g = orderStats) !== null && _g !== void 0 ? _g : {};
                            return [2 /*return*/, {
                                    user: {
                                        user_id: userId,
                                        user_email: (eventSummary === null || eventSummary === void 0 ? void 0 : eventSummary.user_email) == null
                                            ? null
                                            : String(eventSummary.user_email),
                                        total_orders: Number((_h = eventSummary.total_orders) !== null && _h !== void 0 ? _h : 0),
                                        total_events: Number((_j = eventSummary.total_events) !== null && _j !== void 0 ? _j : 0),
                                        total_upgrades: Number((_k = eventSummary.total_upgrades) !== null && _k !== void 0 ? _k : 0),
                                        total_amount: Number((_l = eventSummary.total_amount) !== null && _l !== void 0 ? _l : 0),
                                        total_proxy_count: Number((_m = orderSummary.total_proxy_count) !== null && _m !== void 0 ? _m : 0),
                                        synced_orders: Number((_o = orderSummary.synced_orders) !== null && _o !== void 0 ? _o : 0),
                                        pending_orders: Number((_p = orderSummary.pending_orders) !== null && _p !== void 0 ? _p : 0),
                                        revoked_orders: Number((_q = orderSummary.revoked_orders) !== null && _q !== void 0 ? _q : 0),
                                        unsynced_orders: Number((_r = orderSummary.unsynced_orders) !== null && _r !== void 0 ? _r : 0),
                                        latest_order_at: (_s = eventSummary.latest_order_at) !== null && _s !== void 0 ? _s : null,
                                        nearest_expiry_at: (_t = orderSummary.nearest_expiry_at) !== null && _t !== void 0 ? _t : null,
                                        webshare_subuser_id: orderSummary.current_subuser_id == null
                                            ? null
                                            : Number(orderSummary.current_subuser_id),
                                        webshare_registered_at: (_u = orderSummary.current_registered_at) !== null && _u !== void 0 ? _u : null,
                                        webshare_expires_at: (_v = orderSummary.current_expires_at) !== null && _v !== void 0 ? _v : null,
                                        webshare_account_email: (_w = orderItems
                                            .map(function (item) { var _a; return String((_a = item.webshare_account_id) !== null && _a !== void 0 ? _a : ''); })
                                            .map(function (accountId) { var _a; return (_a = accountEmailById.get(accountId)) !== null && _a !== void 0 ? _a : null; })
                                            .find(function (email) { return Boolean(email); })) !== null && _w !== void 0 ? _w : null,
                                    },
                                    items: orderItems.map(function (item) {
                                        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
                                        var txMeta = item.transaction_metadata && typeof item.transaction_metadata === 'object'
                                            ? item.transaction_metadata
                                            : {};
                                        var meta = item.webshare_meta && typeof item.webshare_meta === 'object'
                                            ? item.webshare_meta
                                            : {};
                                        var txProxyCount = Number((_a = txMeta.proxy_count) !== null && _a !== void 0 ? _a : 0);
                                        var txBandwidth = Number((_b = txMeta.bandwidth_gb) !== null && _b !== void 0 ? _b : 0);
                                        var bandwidthRaw = txBandwidth > 0
                                            ? txBandwidth
                                            : ((_d = (_c = meta.synced_bandwidth_gb) !== null && _c !== void 0 ? _c : meta.target_bandwidth_gb) !== null && _d !== void 0 ? _d : meta.requested_bandwidth_value);
                                        var parsedBandwidth = Number(bandwidthRaw !== null && bandwidthRaw !== void 0 ? bandwidthRaw : 0);
                                        var bandwidthGb = Number.isFinite(parsedBandwidth) && parsedBandwidth > 0
                                            ? parsedBandwidth
                                            : 0;
                                        var actionTypeRaw = String((_e = txMeta.action_type) !== null && _e !== void 0 ? _e : '')
                                            .trim()
                                            .toLowerCase();
                                        var actionType = actionTypeRaw === 'upgrade'
                                            ? 'upgrade'
                                            : actionTypeRaw === 'add'
                                                ? 'add'
                                                : Number((_f = item.order_payment_index) !== null && _f !== void 0 ? _f : 0) > 1
                                                    ? 'upgrade'
                                                    : 'add';
                                        var proxyCount = Number.isFinite(txProxyCount) && txProxyCount > 0
                                            ? Math.trunc(txProxyCount)
                                            : Number((_g = item.proxy_count) !== null && _g !== void 0 ? _g : 0);
                                        var noteFromTx = String((_j = (_h = txMeta.note_vi) !== null && _h !== void 0 ? _h : txMeta.note) !== null && _j !== void 0 ? _j : '').trim();
                                        var note = noteFromTx ||
                                            (proxyCount > 0 && bandwidthGb > 0
                                                ? actionType === 'upgrade'
                                                    ? "N\u00E2ng c\u1EA5p g\u00F3i l\u00EAn ".concat(proxyCount, " Proxy m\u00E1y ch\u1EE7 v\u1EDBi ").concat(bandwidthGb, " GB")
                                                    : "Th\u00EAm m\u1EDBi g\u00F3i ".concat(proxyCount, " Proxy m\u00E1y ch\u1EE7 v\u1EDBi ").concat(bandwidthGb, " GB")
                                                : null);
                                        return {
                                            transaction_id: String((_k = item.transaction_id) !== null && _k !== void 0 ? _k : ''),
                                            order_id: String((_l = item.order_id) !== null && _l !== void 0 ? _l : ''),
                                            user_id: String(item.user_id),
                                            user_email: item.user_email == null ? null : String(item.user_email),
                                            product_code: String((_m = item.product_code) !== null && _m !== void 0 ? _m : ''),
                                            product_name: String((_p = (_o = item.product_name) !== null && _o !== void 0 ? _o : item.product_code) !== null && _p !== void 0 ? _p : ''),
                                            order_status: String((_q = item.order_status) !== null && _q !== void 0 ? _q : ''),
                                            webshare_subuser_id: item.webshare_subuser_id == null
                                                ? null
                                                : Number(item.webshare_subuser_id),
                                            webshare_account_id: item.webshare_account_id == null
                                                ? null
                                                : String(item.webshare_account_id),
                                            webshare_account_email: item.webshare_account_id == null
                                                ? null
                                                : ((_r = accountEmailById.get(String(item.webshare_account_id))) !== null && _r !== void 0 ? _r : null),
                                            webshare_pool_key: item.webshare_pool_key == null
                                                ? null
                                                : String(item.webshare_pool_key),
                                            expires_at: (_s = item.expires_at) !== null && _s !== void 0 ? _s : null,
                                            registered_at: (_u = (_t = item.webshare_activated_at) !== null && _t !== void 0 ? _t : item.order_created_at) !== null && _u !== void 0 ? _u : null,
                                            order_created_at: (_v = item.order_created_at) !== null && _v !== void 0 ? _v : null,
                                            created_at: item.transaction_created_at,
                                            amount_total: Number((_w = item.transaction_amount) !== null && _w !== void 0 ? _w : 0),
                                            amount_currency: 'VND',
                                            proxy_count: proxyCount,
                                            bandwidth_gb: bandwidthGb,
                                            payment_events_count: 1,
                                            action_type: actionType,
                                            note: note,
                                            sync_status: _this.mapManagedSubUserSyncStatus(String((_x = item.order_status) !== null && _x !== void 0 ? _x : '')),
                                        };
                                    }),
                                    pagination: {
                                        page: page,
                                        pageRow: pageRow,
                                        total: Number((_x = totalRow === null || totalRow === void 0 ? void 0 : totalRow.c) !== null && _x !== void 0 ? _x : 0),
                                    },
                                }];
                    }
                });
            });
        };
        WebshareAdminService_1.prototype.refreshManagedSubUser = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.proxyService.syncOrderFromWebshareForAdmin(orderId)];
                });
            });
        };
        WebshareAdminService_1.prototype.revokeManagedSubUser = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.proxyService.revokeManagedSubUserForAdmin(orderId)];
                });
            });
        };
        WebshareAdminService_1.prototype.getDashboard = function () {
            return __awaiter(this, void 0, void 0, function () {
                var config, activeStatuses, orders, orderIds, proxyCountRows, _a, proxyCountMap, usageByPool, _i, orders_1, order, poolKey, quantity, bandwidth, current, rows, _loop_1, this_1, _b, _c, account;
                var _this = this;
                var _d, _e, _f, _g, _h, _j, _k;
                return __generator(this, function (_l) {
                    switch (_l.label) {
                        case 0: return [4 /*yield*/, this.webshareConfigService.getConfig()];
                        case 1:
                            config = _l.sent();
                            activeStatuses = ['active', 'pending', 'processing', 'paid'];
                            return [4 /*yield*/, this.knex('proxy_orders as o')
                                    .join('proxy_products as p', 'p.id', 'o.product_id')
                                    .whereIn('o.status', activeStatuses)
                                    .select('o.id', 'o.status', 'o.webshare_plan_id', 'o.webshare_meta', 'p.code as product_code')];
                        case 2:
                            orders = (_l.sent());
                            orderIds = orders.map(function (item) { return item.id; });
                            if (!(orderIds.length > 0)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.knex('proxies')
                                    .select('proxy_order_id')
                                    .count('* as total')
                                    .whereIn('proxy_order_id', orderIds)
                                    .groupBy('proxy_order_id')];
                        case 3:
                            _a = _l.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            _a = [];
                            _l.label = 5;
                        case 5:
                            proxyCountRows = _a;
                            proxyCountMap = new Map(proxyCountRows.map(function (row) {
                                var _a, _b;
                                return [
                                    String((_a = row.proxy_order_id) !== null && _a !== void 0 ? _a : ''),
                                    Number((_b = row.total) !== null && _b !== void 0 ? _b : 0),
                                ];
                            }));
                            usageByPool = new Map();
                            for (_i = 0, orders_1 = orders; _i < orders_1.length; _i++) {
                                order = orders_1[_i];
                                poolKey = this.derivePoolKeyForOrder(order);
                                if (!poolKey)
                                    continue;
                                quantity = this.parseRequestedQuantity(order, proxyCountMap);
                                bandwidth = this.parseRequestedBandwidth(order);
                                current = (_d = usageByPool.get(poolKey)) !== null && _d !== void 0 ? _d : {
                                    allocated_proxy_count: 0,
                                    allocated_bandwidth_gb: 0,
                                    has_unlimited_bandwidth_order: false,
                                };
                                current.allocated_proxy_count += quantity;
                                current.allocated_bandwidth_gb += bandwidth.bandwidthGb;
                                current.has_unlimited_bandwidth_order =
                                    current.has_unlimited_bandwidth_order || bandwidth.unlimited;
                                usageByPool.set(poolKey, current);
                            }
                            rows = [];
                            _loop_1 = function (account) {
                                var autoRenewEnabled, autoRenewError, autoRenewCheckedAt, subscription, error_3, _loop_2, _m, _o, poolKey;
                                return __generator(this, function (_p) {
                                    switch (_p.label) {
                                        case 0:
                                            autoRenewEnabled = null;
                                            autoRenewError = null;
                                            autoRenewCheckedAt = new Date().toISOString();
                                            _p.label = 1;
                                        case 1:
                                            _p.trys.push([1, 3, , 4]);
                                            return [4 /*yield*/, this_1.proxyMasterService.getWebshareSubscription({
                                                    accountId: account.id,
                                                })];
                                        case 2:
                                            subscription = _p.sent();
                                            autoRenewEnabled =
                                                this_1.proxyMasterService.getSubscriptionAutoRenewEnabled(subscription);
                                            return [3 /*break*/, 4];
                                        case 3:
                                            error_3 = _p.sent();
                                            autoRenewError =
                                                (_e = this_1.proxyMasterService.getWebshareErrorMessage(error_3)) !== null && _e !== void 0 ? _e : (error_3 instanceof Error ? error_3.message : 'Không thể đọc renewal');
                                            return [3 /*break*/, 4];
                                        case 4:
                                            _loop_2 = function (poolKey) {
                                                var usage, plans, accountError, error_4, activePlans, purchasedProxyCount, bandwidthPieces, hasUnlimitedPlan, purchasedBandwidthGb, planStats, usedBandwidthBytes, usedBandwidthGb, registeredDates, expiryDates, availableProxyCount, allocatedBandwidthGb, availableBandwidthGb, healthStatus;
                                                return __generator(this, function (_q) {
                                                    switch (_q.label) {
                                                        case 0:
                                                            usage = (_f = usageByPool.get(poolKey)) !== null && _f !== void 0 ? _f : {
                                                                allocated_proxy_count: 0,
                                                                allocated_bandwidth_gb: 0,
                                                                has_unlimited_bandwidth_order: false,
                                                            };
                                                            plans = [];
                                                            accountError = null;
                                                            _q.label = 1;
                                                        case 1:
                                                            _q.trys.push([1, 3, , 4]);
                                                            return [4 /*yield*/, this_1.proxyMasterService.listWebsharePlans({
                                                                    accountId: account.id,
                                                                    poolKey: poolKey,
                                                                })];
                                                        case 2:
                                                            plans = _q.sent();
                                                            return [3 /*break*/, 4];
                                                        case 3:
                                                            error_4 = _q.sent();
                                                            accountError =
                                                                error_4 instanceof Error ? error_4.message : 'Không thể lấy plan';
                                                            return [3 /*break*/, 4];
                                                        case 4:
                                                            activePlans = plans.filter(function (plan) {
                                                                var _a;
                                                                var status = String((_a = plan.status) !== null && _a !== void 0 ? _a : '')
                                                                    .trim()
                                                                    .toLowerCase();
                                                                return status === 'active' && _this.planToPoolKey(plan) === poolKey;
                                                            });
                                                            purchasedProxyCount = activePlans.reduce(function (sum, plan) { var _a; return sum + Math.max(0, Math.trunc(Number((_a = plan.proxy_count) !== null && _a !== void 0 ? _a : 0))); }, 0);
                                                            bandwidthPieces = activePlans.map(function (plan) {
                                                                return _this.parsePlanBandwidth(plan);
                                                            });
                                                            hasUnlimitedPlan = bandwidthPieces.some(function (item) { return item.unlimited; });
                                                            purchasedBandwidthGb = hasUnlimitedPlan
                                                                ? null
                                                                : bandwidthPieces.reduce(function (sum, item) { return sum + item.bandwidthGb; }, 0);
                                                            return [4 /*yield*/, Promise.all(activePlans.map(function (plan) { return __awaiter(_this, void 0, void 0, function () {
                                                                    var planId, error_5;
                                                                    var _a;
                                                                    return __generator(this, function (_b) {
                                                                        switch (_b.label) {
                                                                            case 0:
                                                                                planId = Number((_a = plan.id) !== null && _a !== void 0 ? _a : 0);
                                                                                if (!Number.isFinite(planId) || planId <= 0)
                                                                                    return [2 /*return*/, []];
                                                                                _b.label = 1;
                                                                            case 1:
                                                                                _b.trys.push([1, 3, , 4]);
                                                                                return [4 /*yield*/, this.proxyMasterService.getWebshareStats({ planId: planId }, {
                                                                                        accountId: account.id,
                                                                                        poolKey: poolKey,
                                                                                    })];
                                                                            case 2: return [2 /*return*/, _b.sent()];
                                                                            case 3:
                                                                                error_5 = _b.sent();
                                                                                this.logger.warn("Unable to fetch Webshare stats for account ".concat(account.id, " / ").concat(poolKey, " / plan ").concat(planId, ": ").concat(error_5 instanceof Error ? error_5.message : String(error_5)));
                                                                                return [2 /*return*/, []];
                                                                            case 4: return [2 /*return*/];
                                                                        }
                                                                    });
                                                                }); }))];
                                                        case 5:
                                                            planStats = _q.sent();
                                                            usedBandwidthBytes = planStats.flat().reduce(function (sum, stat) {
                                                                var _a;
                                                                var bandwidth = Number((_a = stat === null || stat === void 0 ? void 0 : stat.bandwidth_total) !== null && _a !== void 0 ? _a : 0);
                                                                if (!Number.isFinite(bandwidth) || bandwidth < 0)
                                                                    return sum;
                                                                return sum + bandwidth;
                                                            }, 0);
                                                            usedBandwidthGb = hasUnlimitedPlan
                                                                ? null
                                                                : this_1.bytesToGb(usedBandwidthBytes);
                                                            registeredDates = activePlans
                                                                .map(function (plan) {
                                                                var _a, _b;
                                                                var value = (_b = (_a = plan.created_at) !== null && _a !== void 0 ? _a : plan.start_date) !== null && _b !== void 0 ? _b : null;
                                                                if (!value)
                                                                    return null;
                                                                var date = new Date(String(value));
                                                                return Number.isNaN(date.getTime()) ? null : date;
                                                            })
                                                                .filter(function (value) { return value != null; })
                                                                .sort(function (a, b) { return a.getTime() - b.getTime(); });
                                                            expiryDates = activePlans
                                                                .map(function (plan) { return _this.getPlanRenewalDate(plan); })
                                                                .filter(function (value) { return value != null; })
                                                                .sort(function (a, b) { return b.getTime() - a.getTime(); });
                                                            availableProxyCount = purchasedProxyCount - usage.allocated_proxy_count;
                                                            allocatedBandwidthGb = usage.has_unlimited_bandwidth_order
                                                                ? null
                                                                : usage.allocated_bandwidth_gb;
                                                            availableBandwidthGb = hasUnlimitedPlan || purchasedBandwidthGb == null || usedBandwidthGb == null
                                                                ? null
                                                                : purchasedBandwidthGb - usedBandwidthGb;
                                                            healthStatus = this_1.computeDashboardHealth({
                                                                poolKey: poolKey,
                                                                purchasedProxyCount: purchasedProxyCount,
                                                                availableProxyCount: availableProxyCount,
                                                                purchasedBandwidthGb: purchasedBandwidthGb,
                                                                availableBandwidthGb: availableBandwidthGb,
                                                                hasUnlimitedBandwidthPlan: hasUnlimitedPlan,
                                                            });
                                                            rows.push({
                                                                pool_key: poolKey,
                                                                pool_label: this_1.poolLabels[poolKey],
                                                                account_id: account.id,
                                                                account_label: account.email,
                                                                account_enabled: account.enabled,
                                                                purchased_proxy_count: purchasedProxyCount,
                                                                allocated_proxy_count: usage.allocated_proxy_count,
                                                                available_proxy_count: availableProxyCount,
                                                                purchased_bandwidth_gb: purchasedBandwidthGb,
                                                                allocated_bandwidth_gb: allocatedBandwidthGb,
                                                                available_bandwidth_gb: availableBandwidthGb,
                                                                has_unlimited_bandwidth_plan: hasUnlimitedPlan,
                                                                has_unlimited_bandwidth_order: usage.has_unlimited_bandwidth_order,
                                                                active_plan_count: activePlans.length,
                                                                active_plan_ids: activePlans
                                                                    .map(function (item) { var _a; return Number((_a = item.id) !== null && _a !== void 0 ? _a : 0); })
                                                                    .filter(function (id) { return Number.isFinite(id) && id > 0; }),
                                                                used_bandwidth_gb: usedBandwidthGb,
                                                                registered_at: (_h = (_g = registeredDates[0]) === null || _g === void 0 ? void 0 : _g.toISOString()) !== null && _h !== void 0 ? _h : null,
                                                                expires_at: (_k = (_j = expiryDates[0]) === null || _j === void 0 ? void 0 : _j.toISOString()) !== null && _k !== void 0 ? _k : null,
                                                                health_status: healthStatus,
                                                                error: accountError,
                                                                auto_renew_enabled: autoRenewEnabled,
                                                                auto_renew_checked_at: autoRenewCheckedAt,
                                                                auto_renew_error: autoRenewError,
                                                            });
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            };
                                            _m = 0, _o = account.pools;
                                            _p.label = 5;
                                        case 5:
                                            if (!(_m < _o.length)) return [3 /*break*/, 8];
                                            poolKey = _o[_m];
                                            return [5 /*yield**/, _loop_2(poolKey)];
                                        case 6:
                                            _p.sent();
                                            _p.label = 7;
                                        case 7:
                                            _m++;
                                            return [3 /*break*/, 5];
                                        case 8: return [2 /*return*/];
                                    }
                                });
                            };
                            this_1 = this;
                            _b = 0, _c = config.accounts;
                            _l.label = 6;
                        case 6:
                            if (!(_b < _c.length)) return [3 /*break*/, 9];
                            account = _c[_b];
                            return [5 /*yield**/, _loop_1(account)];
                        case 7:
                            _l.sent();
                            _l.label = 8;
                        case 8:
                            _b++;
                            return [3 /*break*/, 6];
                        case 9: return [2 /*return*/, {
                                updated_at: new Date().toISOString(),
                                rows: rows,
                            }];
                    }
                });
            });
        };
        return WebshareAdminService_1;
    }());
    __setFunctionName(_classThis, "WebshareAdminService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WebshareAdminService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WebshareAdminService = _classThis;
}();
exports.WebshareAdminService = WebshareAdminService;
