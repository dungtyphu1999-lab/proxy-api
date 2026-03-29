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
exports.WebshareConfigService = void 0;
var common_1 = require("@nestjs/common");
var webshare_config_types_1 = require("./webshare-config.types");
var WebshareConfigService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var WebshareConfigService = _classThis = /** @class */ (function () {
        function WebshareConfigService_1(knex) {
            this.knex = knex;
        }
        WebshareConfigService_1.prototype.isPoolKey = function (value) {
            return (typeof value === 'string' &&
                webshare_config_types_1.WEBSHARE_POOL_KEYS.includes(value));
        };
        WebshareConfigService_1.prototype.sanitizeAccountId = function (value) {
            var base = String(value !== null && value !== void 0 ? value : '')
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
            return base || "acc-".concat(Date.now());
        };
        WebshareConfigService_1.prototype.normalizeAccount = function (account, index) {
            var _this = this;
            var _a, _b, _c;
            var email = String((_a = account === null || account === void 0 ? void 0 : account.email) !== null && _a !== void 0 ? _a : '').trim();
            var pools = Array.isArray(account === null || account === void 0 ? void 0 : account.pools)
                ? account.pools.filter(function (pool) {
                    return _this.isPoolKey(pool);
                })
                : [];
            return {
                id: this.sanitizeAccountId((_b = account === null || account === void 0 ? void 0 : account.id) !== null && _b !== void 0 ? _b : "".concat(email || 'account', "-").concat(index + 1)),
                email: email,
                api_key: String((_c = account === null || account === void 0 ? void 0 : account.api_key) !== null && _c !== void 0 ? _c : '').trim(),
                enabled: (account === null || account === void 0 ? void 0 : account.enabled) !== false,
                pools: Array.from(new Set(pools)),
                notes: (account === null || account === void 0 ? void 0 : account.notes) == null ? null : String(account.notes).trim() || null,
            };
        };
        WebshareConfigService_1.prototype.normalizeConfig = function (input) {
            var _this = this;
            var _a;
            var raw = input && typeof input === 'object' ? input : {};
            var rawAccounts = Array.isArray(raw.accounts)
                ? ((_a = raw.accounts) !== null && _a !== void 0 ? _a : [])
                : [];
            var accounts = rawAccounts
                .map(function (item, index) {
                return _this.normalizeAccount(item && typeof item === 'object'
                    ? item
                    : {}, index);
            })
                .filter(function (item) { return item.email; });
            var uniqueIds = new Set();
            var deduped = accounts.map(function (account, index) {
                var id = account.id;
                while (uniqueIds.has(id)) {
                    id = "".concat(account.id, "-").concat(index + 1);
                }
                uniqueIds.add(id);
                return __assign(__assign({}, account), { id: id });
            });
            return {
                updated_at: new Date().toISOString(),
                accounts: deduped,
            };
        };
        WebshareConfigService_1.prototype.readRawConfigValue = function () {
            return __awaiter(this, void 0, void 0, function () {
                var row;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.knex('settings')
                                .select('value')
                                .where('key', webshare_config_types_1.WEBSHARE_SETTINGS_KEY)
                                .first()];
                        case 1:
                            row = _a.sent();
                            if (!(row === null || row === void 0 ? void 0 : row.value))
                                return [2 /*return*/, null];
                            return [2 /*return*/, String(row.value)];
                    }
                });
            });
        };
        WebshareConfigService_1.prototype.buildDefaultConfig = function () {
            return {
                updated_at: new Date().toISOString(),
                accounts: [],
            };
        };
        WebshareConfigService_1.prototype.hasProxyPoolRows = function () {
            return __awaiter(this, void 0, void 0, function () {
                var row;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.knex('proxy_pools').count('* as c').first()];
                        case 1:
                            row = _b.sent();
                            return [2 /*return*/, Number((_a = row === null || row === void 0 ? void 0 : row.c) !== null && _a !== void 0 ? _a : 0) > 0];
                    }
                });
            });
        };
        WebshareConfigService_1.prototype.migrateLegacySettingsIfNeeded = function () {
            return __awaiter(this, void 0, void 0, function () {
                var hasRows, rawValue, normalized, rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.hasProxyPoolRows()];
                        case 1:
                            hasRows = _a.sent();
                            if (hasRows)
                                return [2 /*return*/];
                            return [4 /*yield*/, this.readRawConfigValue()];
                        case 2:
                            rawValue = _a.sent();
                            if (!rawValue)
                                return [2 /*return*/];
                            try {
                                normalized = this.normalizeConfig(JSON.parse(rawValue));
                            }
                            catch (_b) {
                                return [2 /*return*/];
                            }
                            if (!normalized.accounts.length)
                                return [2 /*return*/];
                            rows = normalized.accounts.flatMap(function (account) {
                                var poolKeys = account.pools.length ? account.pools : [null];
                                return poolKeys.map(function (poolKey) {
                                    var _a;
                                    return ({
                                        account_id: account.id,
                                        account_label: account.email,
                                        api_key: account.api_key,
                                        pool_key: poolKey,
                                        enabled: account.enabled,
                                        notes: (_a = account.notes) !== null && _a !== void 0 ? _a : null,
                                    });
                                });
                            });
                            return [4 /*yield*/, this.knex('proxy_pools').insert(rows)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        WebshareConfigService_1.prototype.getPoolRows = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.migrateLegacySettingsIfNeeded()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.knex('proxy_pools')
                                    .select('*')
                                    .orderBy([{ column: 'created_at', order: 'asc' }, { column: 'account_label', order: 'asc' }])];
                    }
                });
            });
        };
        WebshareConfigService_1.prototype.buildConfigFromRows = function (rows) {
            var _a, _b, _c;
            if (!rows.length) {
                return this.buildDefaultConfig();
            }
            var grouped = new Map();
            for (var _i = 0, rows_1 = rows; _i < rows_1.length; _i++) {
                var row = rows_1[_i];
                var existing = grouped.get(row.account_id);
                if (!existing) {
                    grouped.set(row.account_id, {
                        id: row.account_id,
                        email: row.account_label,
                        api_key: row.api_key,
                        enabled: row.enabled !== false,
                        pools: this.isPoolKey(row.pool_key) ? [row.pool_key] : [],
                        notes: (_a = row.notes) !== null && _a !== void 0 ? _a : null,
                    });
                    continue;
                }
                existing.email = row.account_label || existing.email;
                existing.api_key = row.api_key || existing.api_key;
                existing.enabled = row.enabled !== false;
                existing.notes = (_c = (_b = row.notes) !== null && _b !== void 0 ? _b : existing.notes) !== null && _c !== void 0 ? _c : null;
                if (this.isPoolKey(row.pool_key) && !existing.pools.includes(row.pool_key)) {
                    existing.pools.push(row.pool_key);
                }
            }
            return {
                updated_at: new Date().toISOString(),
                accounts: Array.from(grouped.values()),
            };
        };
        WebshareConfigService_1.prototype.derivePoolKeyFromQuery = function (query) {
            var _a, _b;
            var proxyType = String((_a = query === null || query === void 0 ? void 0 : query.proxy_type) !== null && _a !== void 0 ? _a : '')
                .trim()
                .toLowerCase();
            var proxySubtype = String((_b = query === null || query === void 0 ? void 0 : query.proxy_subtype) !== null && _b !== void 0 ? _b : '')
                .trim()
                .toLowerCase();
            if (proxyType === 'shared' && proxySubtype === 'default') {
                return 'proxy_server_shared';
            }
            if (proxyType === 'semidedicated' && proxySubtype === 'premium') {
                return 'proxy_server_private';
            }
            if (proxyType === 'dedicated' && proxySubtype === 'premium') {
                return 'proxy_server_dedicated';
            }
            if (proxyType === 'shared' && proxySubtype === 'isp') {
                return 'static_residential_shared';
            }
            if (proxyType === 'semidedicated' && proxySubtype === 'isp') {
                return 'static_residential_private';
            }
            if (proxyType === 'dedicated' && proxySubtype === 'isp') {
                return 'static_residential_dedicated';
            }
            if (proxyType === 'shared' && proxySubtype === 'residential') {
                return 'rotating_residential';
            }
            return null;
        };
        WebshareConfigService_1.prototype.getConfig = function () {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getPoolRows()];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, this.buildConfigFromRows(rows)];
                    }
                });
            });
        };
        WebshareConfigService_1.prototype.getPoolDefinitions = function () {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getPoolRows()];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, rows.map(function (row) { return (__assign(__assign({}, row), { pool_key: _this.isPoolKey(row.pool_key) ? row.pool_key : null })); })];
                    }
                });
            });
        };
        WebshareConfigService_1.prototype.updateConfig = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var normalized;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            normalized = this.normalizeConfig(input);
                            return [4 /*yield*/, this.knex.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                    var rows;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, trx('proxy_pools').del()];
                                            case 1:
                                                _a.sent();
                                                rows = normalized.accounts.flatMap(function (account) {
                                                    var poolKeys = account.pools.length ? account.pools : [null];
                                                    return poolKeys.map(function (poolKey) {
                                                        var _a;
                                                        return ({
                                                            account_id: account.id,
                                                            account_label: account.email,
                                                            api_key: account.api_key,
                                                            pool_key: poolKey,
                                                            enabled: account.enabled,
                                                            notes: (_a = account.notes) !== null && _a !== void 0 ? _a : null,
                                                        });
                                                    });
                                                });
                                                if (!(rows.length > 0)) return [3 /*break*/, 3];
                                                return [4 /*yield*/, trx('proxy_pools').insert(rows)];
                                            case 2:
                                                _a.sent();
                                                _a.label = 3;
                                            case 3: return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, this.getConfig()];
                    }
                });
            });
        };
        WebshareConfigService_1.prototype.resolveCredential = function () {
            return __awaiter(this, arguments, void 0, function (input) {
                var config, accountId, rawPoolKey, poolKey, matched, globalApiKey;
                var _a, _b, _c, _d, _e;
                if (input === void 0) { input = {}; }
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0: return [4 /*yield*/, this.getConfig()];
                        case 1:
                            config = _f.sent();
                            accountId = String((_a = input.accountId) !== null && _a !== void 0 ? _a : '').trim();
                            rawPoolKey = String((_b = input.poolKey) !== null && _b !== void 0 ? _b : '').trim();
                            poolKey = this.isPoolKey(rawPoolKey)
                                ? rawPoolKey
                                : this.derivePoolKeyFromQuery((_c = input.query) !== null && _c !== void 0 ? _c : null);
                            matched = null;
                            if (accountId) {
                                matched =
                                    (_d = config.accounts.find(function (item) {
                                        var _a;
                                        return item.id === accountId &&
                                            item.enabled &&
                                            Boolean((_a = item.api_key) === null || _a === void 0 ? void 0 : _a.trim());
                                    })) !== null && _d !== void 0 ? _d : null;
                                if (!matched) {
                                    throw new common_1.BadRequestException("T\u00E0i kho\u1EA3n Webshare \u0111\u00E3 g\u00E1n (".concat(accountId, ") kh\u00F4ng kh\u1EA3 d\u1EE5ng trong c\u1EA5u h\u00ECnh Admin."));
                                }
                            }
                            if (matched) {
                                return [2 /*return*/, {
                                        apiKey: matched.api_key,
                                        accountId: matched.id,
                                        accountLabel: matched.email,
                                        poolKey: poolKey,
                                        source: 'admin',
                                    }];
                            }
                            globalApiKey = String((_e = process.env.WEBSHARE_API_KEY) !== null && _e !== void 0 ? _e : '').trim();
                            if (globalApiKey) {
                                return [2 /*return*/, {
                                        apiKey: globalApiKey,
                                        accountId: null,
                                        accountLabel: null,
                                        poolKey: poolKey,
                                        source: 'env',
                                    }];
                            }
                            throw new common_1.BadRequestException('Thiếu Webshare API key. Vui lòng cấu hình trong Admin hoặc WEBSHARE_API_KEY.');
                    }
                });
            });
        };
        WebshareConfigService_1.prototype.reserveCredentialForUser = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var config, userId, rawPoolKey, poolKey, enabledAccounts, latestUserOrder, latestUserAccountId, existingAccount, reservedRows, reservedAccountIds, availableAccount;
                var _a, _b, _c, _d, _e, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0: return [4 /*yield*/, this.getConfig()];
                        case 1:
                            config = _g.sent();
                            userId = String((_a = input.userId) !== null && _a !== void 0 ? _a : '').trim();
                            if (!userId) {
                                throw new common_1.BadRequestException('Thiếu userId để gán tài khoản Webshare.');
                            }
                            rawPoolKey = String((_b = input.poolKey) !== null && _b !== void 0 ? _b : '').trim();
                            poolKey = this.isPoolKey(rawPoolKey)
                                ? rawPoolKey
                                : this.derivePoolKeyFromQuery((_c = input.query) !== null && _c !== void 0 ? _c : null);
                            enabledAccounts = config.accounts.filter(function (item) { var _a; return item.enabled && Boolean((_a = item.api_key) === null || _a === void 0 ? void 0 : _a.trim()); });
                            if (!enabledAccounts.length) {
                                throw new common_1.BadRequestException('Không có tài khoản Webshare khả dụng trong Admin.');
                            }
                            return [4 /*yield*/, this.knex('proxy_orders')
                                    .select('webshare_account_id')
                                    .where('user_id', userId)
                                    .whereNotNull('webshare_account_id')
                                    .orderBy('created_at', 'desc')
                                    .first()];
                        case 2:
                            latestUserOrder = _g.sent();
                            latestUserAccountId = String((_d = latestUserOrder === null || latestUserOrder === void 0 ? void 0 : latestUserOrder.webshare_account_id) !== null && _d !== void 0 ? _d : '').trim();
                            if (latestUserAccountId) {
                                existingAccount = (_e = enabledAccounts.find(function (item) { return item.id === latestUserAccountId; })) !== null && _e !== void 0 ? _e : null;
                                if (existingAccount) {
                                    return [2 /*return*/, {
                                            apiKey: existingAccount.api_key,
                                            accountId: existingAccount.id,
                                            accountLabel: existingAccount.email,
                                            poolKey: poolKey,
                                            source: 'admin',
                                        }];
                                }
                            }
                            return [4 /*yield*/, this.knex('proxy_orders')
                                    .distinct('webshare_account_id')
                                    .whereNotNull('webshare_account_id')];
                        case 3:
                            reservedRows = _g.sent();
                            reservedAccountIds = new Set(reservedRows
                                .map(function (row) { var _a; return String((_a = row.webshare_account_id) !== null && _a !== void 0 ? _a : '').trim(); })
                                .filter(Boolean));
                            availableAccount = (_f = enabledAccounts.find(function (item) { return !reservedAccountIds.has(item.id); })) !== null && _f !== void 0 ? _f : null;
                            if (!availableAccount) {
                                throw new common_1.BadRequestException('Không còn tài khoản Webshare trống để gán cho người dùng.');
                            }
                            return [2 /*return*/, {
                                    apiKey: availableAccount.api_key,
                                    accountId: availableAccount.id,
                                    accountLabel: availableAccount.email,
                                    poolKey: poolKey,
                                    source: 'admin',
                                }];
                    }
                });
            });
        };
        WebshareConfigService_1.prototype.maskApiKey = function (value) {
            var key = String(value !== null && value !== void 0 ? value : '').trim();
            if (!key)
                return '';
            if (key.length <= 8)
                return '*'.repeat(key.length);
            return "".concat(key.slice(0, 4)).concat('*'.repeat(Math.max(4, key.length - 8))).concat(key.slice(-4));
        };
        return WebshareConfigService_1;
    }());
    __setFunctionName(_classThis, "WebshareConfigService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WebshareConfigService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WebshareConfigService = _classThis;
}();
exports.WebshareConfigService = WebshareConfigService;
