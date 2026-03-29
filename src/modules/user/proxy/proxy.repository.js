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
exports.ProxyRepository = void 0;
var common_1 = require("@nestjs/common");
var ProxyRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ProxyRepository = _classThis = /** @class */ (function () {
        function ProxyRepository_1(knex) {
            this.knex = knex;
        }
        ProxyRepository_1.prototype.applyMethodFilters = function (qb, options) {
            var col = function (name) {
                return options.tableAlias ? "".concat(options.tableAlias, ".").concat(name) : name;
            };
            if (options.login_method === 'username_password') {
                qb.whereNotNull(col('username'))
                    .whereNot(col('username'), '')
                    .whereNotNull(col('password'))
                    .whereNot(col('password'), '');
            }
            else if (options.login_method === 'ip_whitelist') {
                // Hệ thống hiện chỉ lưu proxy dạng user/pass; chưa hỗ trợ bộ dữ liệu IP whitelist.
                qb.whereRaw('1 = 0');
            }
            if (options.connection_method === 'socks5') {
                // SOCKS5 hiện chỉ bật cho luồng rotating residential.
                qb.where(col('proxy_type'), 'rotating_residential');
            }
            return qb;
        };
        ProxyRepository_1.prototype.findProxiesByUserId = function (userId, options) {
            return __awaiter(this, void 0, void 0, function () {
                var orderColumn, qb, term_1;
                var _a, _b;
                return __generator(this, function (_c) {
                    orderColumn = [
                        'id',
                        'address',
                        'port',
                        'country_code',
                        'city',
                        'status',
                        'last_checked_at',
                        'created_at',
                    ].includes(options.orderBy)
                        ? "p.".concat(options.orderBy)
                        : 'p.created_at';
                    qb = this.knex('proxies as p')
                        .leftJoin('countries as c', 'c.code', 'p.country_code')
                        .where('p.user_id', userId)
                        .select('p.id', 'p.user_id', 'p.proxy_order_id', 'p.address', 'p.port', 'p.username', 'p.password', 'p.country_code', 'p.city', 'p.status', 'p.last_checked_at', 'p.proxy_type', 'p.created_at', 'p.updated_at')
                        .select(this.knex.raw('COALESCE(c.name_vi, c.name_en, p.country_code) as country_name'))
                        .orderBy(orderColumn, options.orderDir)
                        .offset(options.offset)
                        .limit(options.limit);
                    if ((_a = options.search) === null || _a === void 0 ? void 0 : _a.trim()) {
                        term_1 = "%".concat(options.search.trim(), "%");
                        qb = qb.where(function (b) {
                            b.whereILike('p.address', term_1)
                                .orWhereILike('p.country_code', term_1)
                                .orWhereILike('c.name_vi', term_1)
                                .orWhereILike('c.name_en', term_1);
                        });
                    }
                    if ((_b = options.country_codes) === null || _b === void 0 ? void 0 : _b.length) {
                        qb = qb.whereIn('p.country_code', options.country_codes);
                    }
                    if (options.proxy_type) {
                        qb = qb.where('p.proxy_type', options.proxy_type);
                    }
                    if (options.order_id) {
                        qb = qb.where('p.proxy_order_id', options.order_id);
                    }
                    qb = this.applyMethodFilters(qb, {
                        login_method: options.login_method,
                        connection_method: options.connection_method,
                        tableAlias: 'p',
                    });
                    return [2 /*return*/, qb];
                });
            });
        };
        ProxyRepository_1.prototype.countProxiesByUserId = function (userId, options) {
            return __awaiter(this, void 0, void 0, function () {
                var qb, term_2, row, countRow;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            qb = this.knex('proxies as p')
                                .leftJoin('countries as c', 'c.code', 'p.country_code')
                                .where('p.user_id', userId);
                            if ((_a = options.search) === null || _a === void 0 ? void 0 : _a.trim()) {
                                term_2 = "%".concat(options.search.trim(), "%");
                                qb = qb.where(function (b) {
                                    b.whereILike('p.address', term_2)
                                        .orWhereILike('p.country_code', term_2)
                                        .orWhereILike('c.name_vi', term_2)
                                        .orWhereILike('c.name_en', term_2);
                                });
                            }
                            if ((_b = options.country_codes) === null || _b === void 0 ? void 0 : _b.length) {
                                qb = qb.whereIn('p.country_code', options.country_codes);
                            }
                            if (options.proxy_type) {
                                qb = qb.where('p.proxy_type', options.proxy_type);
                            }
                            if (options.order_id) {
                                qb = qb.where('p.proxy_order_id', options.order_id);
                            }
                            qb = this.applyMethodFilters(qb, {
                                login_method: options.login_method,
                                connection_method: options.connection_method,
                                tableAlias: 'p',
                            });
                            return [4 /*yield*/, qb.count('p.id as c').first()];
                        case 1:
                            row = _d.sent();
                            countRow = row;
                            return [2 /*return*/, Number((_c = countRow === null || countRow === void 0 ? void 0 : countRow.c) !== null && _c !== void 0 ? _c : 0)];
                    }
                });
            });
        };
        ProxyRepository_1.prototype.findAllProxiesForDownload = function (userId, country_codes, proxy_type, order_id) {
            return __awaiter(this, void 0, void 0, function () {
                var qb;
                return __generator(this, function (_a) {
                    qb = this.knex('proxies').where('user_id', userId);
                    if (country_codes === null || country_codes === void 0 ? void 0 : country_codes.length) {
                        qb = qb.whereIn('country_code', country_codes);
                    }
                    if (proxy_type) {
                        qb = qb.where('proxy_type', proxy_type);
                    }
                    if (order_id) {
                        qb = qb.where('proxy_order_id', order_id);
                    }
                    return [2 /*return*/, qb.orderBy('created_at', 'desc')];
                });
            });
        };
        ProxyRepository_1.prototype.findUserCountryFilters = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.knex('user_proxy_country_filters')
                            .where('user_id', userId)
                            .orderBy('country_code', 'asc')];
                });
            });
        };
        ProxyRepository_1.prototype.replaceUserCountryFilters = function (userId, countryCodes) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.knex.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                var unique;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, trx('user_proxy_country_filters').where('user_id', userId).del()];
                                        case 1:
                                            _a.sent();
                                            if (!(countryCodes.length > 0)) return [3 /*break*/, 3];
                                            unique = __spreadArray([], new Set(countryCodes), true);
                                            return [4 /*yield*/, trx('user_proxy_country_filters').insert(unique.map(function (country_code) { return ({
                                                    user_id: userId,
                                                    country_code: country_code,
                                                }); }))];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ProxyRepository_1.prototype.createProxyOrder = function (userId, data, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var qb, row;
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
                return __generator(this, function (_s) {
                    switch (_s.label) {
                        case 0:
                            qb = trx
                                ? trx('proxy_orders')
                                : this.knex('proxy_orders');
                            return [4 /*yield*/, qb
                                    .insert({
                                    user_id: userId,
                                    product_id: data.product_id,
                                    exclusivity_option_id: (_a = data.exclusivity_option_id) !== null && _a !== void 0 ? _a : null,
                                    quantity_option_id: (_b = data.quantity_option_id) !== null && _b !== void 0 ? _b : null,
                                    bandwidth_option_id: (_c = data.bandwidth_option_id) !== null && _c !== void 0 ? _c : null,
                                    location_id: (_d = data.location_id) !== null && _d !== void 0 ? _d : null,
                                    additional_feature_id: (_e = data.additional_feature_id) !== null && _e !== void 0 ? _e : null,
                                    discount_percent: String((_f = data.discount_percent) !== null && _f !== void 0 ? _f : 0),
                                    amount_total: String(data.amount_total),
                                    billing_cycle: data.billing_cycle,
                                    status: (_g = data.status) !== null && _g !== void 0 ? _g : 'draft',
                                    webshare_plan_id: (_h = data.webshare_plan_id) !== null && _h !== void 0 ? _h : null,
                                    webshare_subuser_id: (_j = data.webshare_subuser_id) !== null && _j !== void 0 ? _j : null,
                                    webshare_status: (_k = data.webshare_status) !== null && _k !== void 0 ? _k : null,
                                    webshare_error: (_l = data.webshare_error) !== null && _l !== void 0 ? _l : null,
                                    webshare_meta: (_m = data.webshare_meta) !== null && _m !== void 0 ? _m : null,
                                    webshare_activated_at: (_o = data.webshare_activated_at) !== null && _o !== void 0 ? _o : null,
                                    expires_at: (_p = data.expires_at) !== null && _p !== void 0 ? _p : null,
                                    webshare_account_id: (_q = data.webshare_account_id) !== null && _q !== void 0 ? _q : null,
                                    webshare_pool_key: (_r = data.webshare_pool_key) !== null && _r !== void 0 ? _r : null,
                                })
                                    .returning('*')];
                        case 1:
                            row = (_s.sent())[0];
                            return [2 /*return*/, row];
                    }
                });
            });
        };
        ProxyRepository_1.prototype.updateProxyOrder = function (orderId, data, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var qb, row;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            qb = trx
                                ? trx('proxy_orders')
                                : this.knex('proxy_orders');
                            return [4 /*yield*/, qb
                                    .where('id', orderId)
                                    .update(__assign(__assign({}, data), { updated_at: new Date() }))
                                    .returning('*')];
                        case 1:
                            row = (_a.sent())[0];
                            return [2 /*return*/, row];
                    }
                });
            });
        };
        ProxyRepository_1.prototype.upsertUserProxies = function (userId, proxies, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var qb, rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!proxies.length)
                                return [2 /*return*/];
                            qb = trx ? trx('proxies') : this.knex('proxies');
                            rows = proxies.map(function (proxy) {
                                var _a, _b, _c, _d, _e;
                                return ({
                                    user_id: userId,
                                    proxy_order_id: (_a = proxy.proxy_order_id) !== null && _a !== void 0 ? _a : null,
                                    address: proxy.address,
                                    port: proxy.port,
                                    username: proxy.username,
                                    password: proxy.password,
                                    country_code: proxy.country_code,
                                    city: (_b = proxy.city) !== null && _b !== void 0 ? _b : null,
                                    status: (_c = proxy.status) !== null && _c !== void 0 ? _c : 'active',
                                    proxy_type: (_d = proxy.proxy_type) !== null && _d !== void 0 ? _d : 'unknown',
                                    last_checked_at: (_e = proxy.last_checked_at) !== null && _e !== void 0 ? _e : null,
                                    created_at: new Date(),
                                    updated_at: new Date(),
                                });
                            });
                            return [4 /*yield*/, qb
                                    .insert(rows)
                                    .onConflict([
                                    'user_id',
                                    'proxy_type',
                                    'proxy_order_id',
                                    'address',
                                    'port',
                                    'username',
                                ])
                                    .merge({
                                    proxy_order_id: this.knex.raw('excluded.proxy_order_id'),
                                    username: this.knex.raw('excluded.username'),
                                    password: this.knex.raw('excluded.password'),
                                    country_code: this.knex.raw('excluded.country_code'),
                                    city: this.knex.raw('excluded.city'),
                                    status: this.knex.raw('excluded.status'),
                                    proxy_type: this.knex.raw('excluded.proxy_type'),
                                    last_checked_at: this.knex.raw('excluded.last_checked_at'),
                                    updated_at: new Date(),
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ProxyRepository_1.prototype.findProxiesByIds = function (userId, ids, proxyType) {
            return __awaiter(this, void 0, void 0, function () {
                var qb;
                return __generator(this, function (_a) {
                    if (!ids.length)
                        return [2 /*return*/, []];
                    qb = this.knex('proxies')
                        .where('user_id', userId)
                        .whereIn('id', ids);
                    if (proxyType) {
                        qb = qb.where('proxy_type', proxyType);
                    }
                    return [2 /*return*/, qb];
                });
            });
        };
        ProxyRepository_1.prototype.findProxiesForCheck = function (userId, options) {
            return __awaiter(this, void 0, void 0, function () {
                var qb;
                return __generator(this, function (_a) {
                    qb = this.knex('proxies').where('user_id', userId);
                    if (options.proxy_type) {
                        qb = qb.where('proxy_type', options.proxy_type);
                    }
                    return [2 /*return*/, qb.orderBy('updated_at', 'desc').limit(options.limit)];
                });
            });
        };
        ProxyRepository_1.prototype.updateProxyCheck = function (id, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.knex('proxies')
                                .where('id', id)
                                .update({
                                status: data.status,
                                last_checked_at: data.last_checked_at,
                                updated_at: new Date(),
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ProxyRepository_1.prototype.deleteProxiesByUserAndType = function (userId, proxyType, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var qb;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            qb = trx ? trx('proxies') : this.knex('proxies');
                            return [4 /*yield*/, qb.where('user_id', userId).where('proxy_type', proxyType).del()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ProxyRepository_1.prototype.deleteProxiesByOrderId = function (orderId, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var qb;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            qb = trx ? trx('proxies') : this.knex('proxies');
                            return [4 /*yield*/, qb.where('proxy_order_id', orderId).del()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ProxyRepository_1.prototype.deleteLegacyProxiesWithoutOrderByUserAndType = function (userId, proxyType, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var qb;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            qb = trx ? trx('proxies') : this.knex('proxies');
                            return [4 /*yield*/, qb
                                    .where('user_id', userId)
                                    .where('proxy_type', proxyType)
                                    .whereNull('proxy_order_id')
                                    .del()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ProxyRepository_1.prototype.createProxyTransaction = function (data, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var qb, row;
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            qb = trx
                                ? trx('proxy_transactions')
                                : this.knex('proxy_transactions');
                            return [4 /*yield*/, qb
                                    .insert({
                                    proxy_order_id: data.proxy_order_id,
                                    type: data.type,
                                    amount: String(data.amount),
                                    currency: (_a = data.currency) !== null && _a !== void 0 ? _a : 'VND',
                                    payment_method_id: (_b = data.payment_method_id) !== null && _b !== void 0 ? _b : null,
                                    external_id: (_c = data.external_id) !== null && _c !== void 0 ? _c : null,
                                    status: data.status,
                                    paid_at: (_d = data.paid_at) !== null && _d !== void 0 ? _d : null,
                                    metadata: (_e = data.metadata) !== null && _e !== void 0 ? _e : null,
                                })
                                    .returning('*')];
                        case 1:
                            row = (_f.sent())[0];
                            return [2 /*return*/, row];
                    }
                });
            });
        };
        ProxyRepository_1.prototype.findProxyOrdersByUserId = function (userId, options) {
            return __awaiter(this, void 0, void 0, function () {
                var qb;
                return __generator(this, function (_a) {
                    qb = this.knex('proxy_orders')
                        .where('user_id', userId)
                        .orderBy(options.orderBy, options.orderDir)
                        .offset(options.offset)
                        .limit(options.limit);
                    if (options.status) {
                        qb = qb.where('status', options.status);
                    }
                    return [2 /*return*/, qb];
                });
            });
        };
        ProxyRepository_1.prototype.countProxyOrdersByUserId = function (userId, status) {
            return __awaiter(this, void 0, void 0, function () {
                var qb, row, countRow;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            qb = this.knex('proxy_orders')
                                .where('user_id', userId)
                                .count('* as c')
                                .first();
                            if (status) {
                                qb = qb.where('status', status);
                            }
                            return [4 /*yield*/, qb];
                        case 1:
                            row = _b.sent();
                            countRow = row;
                            return [2 /*return*/, Number((_a = countRow === null || countRow === void 0 ? void 0 : countRow.c) !== null && _a !== void 0 ? _a : 0)];
                    }
                });
            });
        };
        ProxyRepository_1.prototype.findProxyOrderByIdAndUserId = function (orderId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.knex('proxy_orders')
                            .where('id', orderId)
                            .where('user_id', userId)
                            .first()];
                });
            });
        };
        ProxyRepository_1.prototype.findProxyOrderById = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.knex('proxy_orders')
                            .where('id', orderId)
                            .first()];
                });
            });
        };
        ProxyRepository_1.prototype.findActiveOrdersByUserAndProductCode = function (userId, productCode) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.knex('proxy_orders')
                            .join('proxy_products', 'proxy_products.id', 'proxy_orders.product_id')
                            .where('proxy_orders.user_id', userId)
                            .where('proxy_orders.status', 'active')
                            .where('proxy_products.code', productCode)
                            .select('proxy_orders.*')
                            .orderBy('proxy_orders.created_at', 'desc')];
                });
            });
        };
        ProxyRepository_1.prototype.findLatestOrderByUserAndProductCode = function (userId_1, productCode_1) {
            return __awaiter(this, arguments, void 0, function (userId, productCode, statuses) {
                if (statuses === void 0) { statuses = ['active', 'pending']; }
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.knex('proxy_orders')
                            .join('proxy_products', 'proxy_products.id', 'proxy_orders.product_id')
                            .where('proxy_orders.user_id', userId)
                            .whereIn('proxy_orders.status', statuses)
                            .where('proxy_products.code', productCode)
                            .select('proxy_orders.*')
                            .orderBy('proxy_orders.created_at', 'desc')
                            .first()];
                });
            });
        };
        ProxyRepository_1.prototype.findLatestMappedWebshareOrderByUser = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.knex('proxy_orders')
                            .where('user_id', userId)
                            .whereNotNull('webshare_account_id')
                            .orderBy('created_at', 'desc')
                            .first()];
                });
            });
        };
        ProxyRepository_1.prototype.findOrdersByUserAndProductCode = function (userId, productCode, statuses) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.knex('proxy_orders')
                            .join('proxy_products', 'proxy_products.id', 'proxy_orders.product_id')
                            .where('proxy_orders.user_id', userId)
                            .whereIn('proxy_orders.status', statuses)
                            .where('proxy_products.code', productCode)
                            .select('proxy_orders.*')
                            .orderBy('proxy_orders.created_at', 'asc')];
                });
            });
        };
        ProxyRepository_1.prototype.findOrdersByProductCode = function (productCode, statuses) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.knex('proxy_orders')
                            .join('proxy_products', 'proxy_products.id', 'proxy_orders.product_id')
                            .whereIn('proxy_orders.status', statuses)
                            .where('proxy_products.code', productCode)
                            .select('proxy_orders.*')
                            .orderBy('proxy_orders.created_at', 'asc')];
                });
            });
        };
        ProxyRepository_1.prototype.countProxiesByOrderId = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var row;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.knex('proxies')
                                .where('proxy_order_id', orderId)
                                .count('* as c')
                                .first()];
                        case 1:
                            row = _b.sent();
                            return [2 /*return*/, Number((_a = row === null || row === void 0 ? void 0 : row.c) !== null && _a !== void 0 ? _a : 0)];
                    }
                });
            });
        };
        ProxyRepository_1.prototype.updateProxyPasswordsByOrderId = function (orderId, password, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var db;
                return __generator(this, function (_a) {
                    db = trx !== null && trx !== void 0 ? trx : this.knex;
                    return [2 /*return*/, db('proxies')
                            .where('proxy_order_id', orderId)
                            .update({ password: password, updated_at: db.fn.now() })];
                });
            });
        };
        ProxyRepository_1.prototype.findLatestWebsharePlanIdByUserAndProduct = function (userId, productId) {
            return __awaiter(this, void 0, void 0, function () {
                var row, planId, meta, parsed;
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, this.knex('proxy_orders')
                                .select('webshare_plan_id', 'webshare_meta')
                                .where({ user_id: userId, product_id: productId })
                                .where('status', 'active')
                                .orderBy('created_at', 'desc')
                                .first()];
                        case 1:
                            row = _e.sent();
                            planId = row === null || row === void 0 ? void 0 : row.webshare_plan_id;
                            if (planId == null && (row === null || row === void 0 ? void 0 : row.webshare_meta)) {
                                meta = row.webshare_meta;
                                planId =
                                    (_d = (_b = (_a = meta.plan_id) !== null && _a !== void 0 ? _a : meta.plan) !== null && _b !== void 0 ? _b : (_c = meta.plan) === null || _c === void 0 ? void 0 : _c.id) !== null && _d !== void 0 ? _d : null;
                            }
                            if (planId == null)
                                return [2 /*return*/, null];
                            parsed = Number(planId);
                            return [2 /*return*/, Number.isFinite(parsed) && parsed > 0 ? parsed : null];
                    }
                });
            });
        };
        ProxyRepository_1.prototype.findTransactionsByProxyOrderId = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.knex('proxy_transactions')
                            .where('proxy_order_id', orderId)
                            .orderBy('created_at', 'desc')];
                });
            });
        };
        ProxyRepository_1.prototype.findPendingProxyOrders = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var qb;
                return __generator(this, function (_a) {
                    qb = this.knex('proxy_orders').where('status', 'pending');
                    if (options.olderThan) {
                        qb = qb.andWhere('updated_at', '<=', options.olderThan);
                    }
                    return [2 /*return*/, qb.orderBy('updated_at', 'asc').limit(options.limit)];
                });
            });
        };
        ProxyRepository_1.prototype.findExpiredActiveProxyOrders = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var qb;
                return __generator(this, function (_a) {
                    qb = this.knex('proxy_orders')
                        .where('status', 'active')
                        .whereNotNull('expires_at');
                    if (options.before) {
                        qb = qb.andWhere('expires_at', '<=', options.before);
                    }
                    return [2 /*return*/, qb.orderBy('expires_at', 'asc').limit(options.limit)];
                });
            });
        };
        ProxyRepository_1.prototype.findActiveWebshareOrders = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.knex('proxy_orders')
                            .whereIn('status', ['active', 'pending'])
                            .whereNotNull('webshare_subuser_id')
                            .orderBy('updated_at', 'desc')
                            .limit(options.limit)];
                });
            });
        };
        ProxyRepository_1.prototype.findManagedWebshareOrders = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.knex('proxy_orders as po')
                                .leftJoin('users as u', 'u.id', 'po.user_id')
                                .leftJoin('proxy_products as pp', 'pp.id', 'po.product_id')
                                .leftJoin('proxies as px', 'px.proxy_order_id', 'po.id')
                                .whereNotNull('po.webshare_account_id')
                                .groupBy('po.id', 'u.username', 'u.email', 'pp.code')
                                .select('po.id as order_id', 'po.user_id', 'u.username as user_username', 'u.email as user_email', 'pp.code as product_code', 'po.amount_total', 'po.status as order_status', 'po.webshare_subuser_id', 'po.webshare_account_id', 'po.webshare_pool_key', 'po.expires_at', 'po.created_at')
                                .count('px.id as proxy_count')
                                .orderBy('po.created_at', 'desc')
                                .modify(function (qb) {
                                if (options === null || options === void 0 ? void 0 : options.limit) {
                                    qb.limit(options.limit);
                                }
                            })];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, rows.map(function (row) {
                                    var _a, _b, _c, _d, _e;
                                    return ({
                                        order_id: String(row.order_id),
                                        user_id: String(row.user_id),
                                        user_username: row.user_username == null ? null : String(row.user_username),
                                        user_email: row.user_email == null ? null : String(row.user_email),
                                        product_code: String((_a = row.product_code) !== null && _a !== void 0 ? _a : ''),
                                        amount_total: Number((_b = row.amount_total) !== null && _b !== void 0 ? _b : 0),
                                        order_status: String((_c = row.order_status) !== null && _c !== void 0 ? _c : ''),
                                        webshare_subuser_id: row.webshare_subuser_id == null
                                            ? null
                                            : Number(row.webshare_subuser_id),
                                        webshare_account_id: row.webshare_account_id == null
                                            ? null
                                            : String(row.webshare_account_id),
                                        webshare_pool_key: row.webshare_pool_key == null
                                            ? null
                                            : String(row.webshare_pool_key),
                                        expires_at: (_d = row.expires_at) !== null && _d !== void 0 ? _d : null,
                                        created_at: row.created_at,
                                        proxy_count: Number((_e = row.proxy_count) !== null && _e !== void 0 ? _e : 0),
                                    });
                                })];
                    }
                });
            });
        };
        ProxyRepository_1.prototype.findTransactionsByUserId = function (userId, options) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.knex('proxy_transactions')
                            .join('proxy_orders', 'proxy_orders.id', 'proxy_transactions.proxy_order_id')
                            .where('proxy_orders.user_id', userId)
                            .select('proxy_transactions.*')
                            .orderBy('proxy_transactions.created_at', 'desc')
                            .offset(options.offset)
                            .limit(options.limit)];
                });
            });
        };
        ProxyRepository_1.prototype.countTransactionsByUserId = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var row;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.knex('proxy_transactions')
                                .join('proxy_orders', 'proxy_orders.id', 'proxy_transactions.proxy_order_id')
                                .where('proxy_orders.user_id', userId)
                                .count('* as c')
                                .first()];
                        case 1:
                            row = _b.sent();
                            return [2 /*return*/, Number((_a = row === null || row === void 0 ? void 0 : row.c) !== null && _a !== void 0 ? _a : 0)];
                    }
                });
            });
        };
        ProxyRepository_1.prototype.findSuccessfulPaymentByIdempotencyKey = function (userId, idempotencyKey, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var db, row, transaction, order;
                var _a, _b, _c, _d, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            db = trx !== null && trx !== void 0 ? trx : this.knex;
                            return [4 /*yield*/, db('proxy_transactions as pt')
                                    .join('proxy_orders as po', 'po.id', 'pt.proxy_order_id')
                                    .where('po.user_id', userId)
                                    .where('pt.type', 'payment')
                                    .where('pt.status', 'success')
                                    .whereRaw("COALESCE(pt.metadata->>'idempotency_key', '') = ?", [
                                    idempotencyKey,
                                ])
                                    .select('pt.id as pt_id', 'pt.proxy_order_id as pt_proxy_order_id', 'pt.type as pt_type', 'pt.amount as pt_amount', 'pt.currency as pt_currency', 'pt.payment_method_id as pt_payment_method_id', 'pt.external_id as pt_external_id', 'pt.status as pt_status', 'pt.paid_at as pt_paid_at', 'pt.metadata as pt_metadata', 'pt.created_at as pt_created_at', 'pt.updated_at as pt_updated_at', 'po.id as po_id', 'po.user_id as po_user_id', 'po.product_id as po_product_id', 'po.exclusivity_option_id as po_exclusivity_option_id', 'po.quantity_option_id as po_quantity_option_id', 'po.bandwidth_option_id as po_bandwidth_option_id', 'po.location_id as po_location_id', 'po.additional_feature_id as po_additional_feature_id', 'po.discount_percent as po_discount_percent', 'po.amount_total as po_amount_total', 'po.billing_cycle as po_billing_cycle', 'po.status as po_status', 'po.webshare_plan_id as po_webshare_plan_id', 'po.webshare_subuser_id as po_webshare_subuser_id', 'po.webshare_status as po_webshare_status', 'po.webshare_error as po_webshare_error', 'po.webshare_meta as po_webshare_meta', 'po.webshare_activated_at as po_webshare_activated_at', 'po.expires_at as po_expires_at', 'po.webshare_account_id as po_webshare_account_id', 'po.webshare_pool_key as po_webshare_pool_key', 'po.created_at as po_created_at', 'po.updated_at as po_updated_at')
                                    .orderBy('pt.created_at', 'desc')
                                    .first()];
                        case 1:
                            row = _g.sent();
                            if (!row)
                                return [2 /*return*/, null];
                            transaction = {
                                id: String(row.pt_id),
                                proxy_order_id: String(row.pt_proxy_order_id),
                                type: String(row.pt_type),
                                amount: String(row.pt_amount),
                                currency: String(row.pt_currency),
                                payment_method_id: row.pt_payment_method_id == null ? null : Number(row.pt_payment_method_id),
                                external_id: row.pt_external_id == null ? null : String(row.pt_external_id),
                                status: String(row.pt_status),
                                paid_at: (_a = row.pt_paid_at) !== null && _a !== void 0 ? _a : null,
                                metadata: row.pt_metadata && typeof row.pt_metadata === 'object'
                                    ? row.pt_metadata
                                    : null,
                                created_at: new Date(row.pt_created_at),
                                updated_at: new Date(row.pt_updated_at),
                            };
                            order = {
                                id: String(row.po_id),
                                user_id: String(row.po_user_id),
                                product_id: Number(row.po_product_id),
                                exclusivity_option_id: row.po_exclusivity_option_id == null
                                    ? null
                                    : Number(row.po_exclusivity_option_id),
                                quantity_option_id: row.po_quantity_option_id == null ? null : Number(row.po_quantity_option_id),
                                bandwidth_option_id: row.po_bandwidth_option_id == null
                                    ? null
                                    : Number(row.po_bandwidth_option_id),
                                location_id: row.po_location_id == null ? null : Number(row.po_location_id),
                                additional_feature_id: row.po_additional_feature_id == null
                                    ? null
                                    : Number(row.po_additional_feature_id),
                                discount_percent: String((_b = row.po_discount_percent) !== null && _b !== void 0 ? _b : '0'),
                                amount_total: String((_c = row.po_amount_total) !== null && _c !== void 0 ? _c : '0'),
                                billing_cycle: String((_d = row.po_billing_cycle) !== null && _d !== void 0 ? _d : 'monthly'),
                                status: String(row.po_status),
                                webshare_plan_id: row.po_webshare_plan_id == null ? null : Number(row.po_webshare_plan_id),
                                webshare_subuser_id: row.po_webshare_subuser_id == null
                                    ? null
                                    : Number(row.po_webshare_subuser_id),
                                webshare_status: row.po_webshare_status == null ? null : String(row.po_webshare_status),
                                webshare_error: row.po_webshare_error == null ? null : String(row.po_webshare_error),
                                webshare_meta: row.po_webshare_meta && typeof row.po_webshare_meta === 'object'
                                    ? row.po_webshare_meta
                                    : null,
                                webshare_activated_at: (_e = row.po_webshare_activated_at) !== null && _e !== void 0 ? _e : null,
                                expires_at: (_f = row.po_expires_at) !== null && _f !== void 0 ? _f : null,
                                webshare_account_id: row.po_webshare_account_id == null
                                    ? null
                                    : String(row.po_webshare_account_id),
                                webshare_pool_key: row.po_webshare_pool_key == null ? null : String(row.po_webshare_pool_key),
                                created_at: new Date(row.po_created_at),
                                updated_at: new Date(row.po_updated_at),
                            };
                            return [2 /*return*/, { order: order, transaction: transaction }];
                    }
                });
            });
        };
        ProxyRepository_1.prototype.findProxyProductCodeById = function (productId) {
            return __awaiter(this, void 0, void 0, function () {
                var row, code;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.knex('proxy_products')
                                .select('code')
                                .where('id', productId)
                                .first()];
                        case 1:
                            row = _b.sent();
                            code = String((_a = row === null || row === void 0 ? void 0 : row.code) !== null && _a !== void 0 ? _a : '')
                                .trim()
                                .toLowerCase();
                            return [2 /*return*/, code || null];
                    }
                });
            });
        };
        return ProxyRepository_1;
    }());
    __setFunctionName(_classThis, "ProxyRepository");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ProxyRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ProxyRepository = _classThis;
}();
exports.ProxyRepository = ProxyRepository;
