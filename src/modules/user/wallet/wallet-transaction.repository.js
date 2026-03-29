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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletTransactionRepository = void 0;
var common_1 = require("@nestjs/common");
var base_repository_1 = require("@/database/repositories/base.repository");
var pagination_util_1 = require("@/shared/pagination/pagination.util");
var WalletTransactionRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_repository_1.BaseRepository;
    var WalletTransactionRepository = _classThis = /** @class */ (function (_super) {
        __extends(WalletTransactionRepository_1, _super);
        function WalletTransactionRepository_1(databaseService) {
            var _this = _super.call(this, 'wallet_transactions') || this;
            _this.databaseService = databaseService;
            return _this;
        }
        WalletTransactionRepository_1.prototype.createTransaction = function (data) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                var result;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, trx
                                                .table('wallet_transactions')
                                                .insert(data)
                                                .returning('*')];
                                        case 1:
                                            result = _a.sent();
                                            return [2 /*return*/, result[0]];
                                    }
                                });
                            }); })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        WalletTransactionRepository_1.prototype.findByWalletId = function (walletId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb
                                .where('wallet_id', walletId)
                                .orderBy('created_at', 'desc')];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        WalletTransactionRepository_1.prototype.findByWalletIdWithPagination = function (walletId_1) {
            return __awaiter(this, arguments, void 0, function (walletId, options) {
                var baseQuery, paginationOptions;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            baseQuery = this.qb.clone().where('wallet_id', walletId);
                            if (options.type) {
                                baseQuery.andWhere('type', options.type);
                            }
                            if (options.status) {
                                baseQuery.andWhere('status', options.status);
                            }
                            paginationOptions = {
                                page: options.page || 1,
                                limit: options.limit || 10,
                                search: options.search,
                                searchFields: options.searchFields || [
                                    'transaction_number',
                                    'note',
                                    'method',
                                    'type',
                                    'status',
                                ],
                                orderBy: options.orderBy || 'created_at',
                                orderDir: options.orderDir || 'desc',
                                filters: options.filters,
                            };
                            return [4 /*yield*/, (0, pagination_util_1.paginateQuery)(baseQuery, paginationOptions)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        WalletTransactionRepository_1.prototype.getByUserIdWithPagination = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, options) {
                var hasOrderType, walletTypes, baseQuery, queries, unionQuery, queries, unionQuery, sqlString, isUnionQuery, paginationOptions;
                var _a, _b;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            hasOrderType = (_a = options.types) === null || _a === void 0 ? void 0 : _a.includes('order');
                            walletTypes = options.types
                                ? options.types.filter(function (type) { return type !== 'order'; })
                                : [];
                            if (((_b = options.types) === null || _b === void 0 ? void 0 : _b.length) === 1 &&
                                hasOrderType &&
                                options.status &&
                                options.status !== 'success') {
                                return [2 /*return*/, {
                                        records: [],
                                        meta: {
                                            total: 0,
                                            page: options.page || 1,
                                            limit: options.limit || 10,
                                            totalPages: 0,
                                            hasPreviousPage: false,
                                            hasNextPage: false,
                                            previousPage: null,
                                            nextPage: null,
                                        },
                                    }];
                            }
                            // If no types specified, show both orders and wallet transactions
                            if (!options.types || options.types.length === 0) {
                                queries = [];
                                // Add orders query only if status allows it
                                if (!options.status || options.status === 'success') {
                                    queries.push(this.buildOrderQuery(userId, options));
                                }
                                // Always add wallet transactions query
                                queries.push(this.buildWalletTransactionQuery(userId, options));
                                if (queries.length === 1) {
                                    baseQuery = queries[0];
                                }
                                else {
                                    unionQuery = this.knexInstance.union(queries);
                                    baseQuery = this.knexInstance
                                        .select('*')
                                        .from(unionQuery.as('combined_results'));
                                }
                            }
                            else if (hasOrderType && walletTypes.length > 0) {
                                queries = [];
                                // Add orders query only if status allows it
                                if (!options.status || options.status === 'success') {
                                    queries.push(this.buildOrderQuery(userId, options));
                                }
                                // Add wallet transactions query
                                queries.push(this.buildWalletTransactionQuery(userId, __assign(__assign({}, options), { types: walletTypes })));
                                if (queries.length === 1) {
                                    baseQuery = queries[0];
                                }
                                else {
                                    unionQuery = this.knexInstance.union(queries);
                                    baseQuery = this.knexInstance
                                        .select('*')
                                        .from(unionQuery.as('combined_results'));
                                }
                            }
                            else if (hasOrderType) {
                                // Only orders
                                baseQuery = this.buildOrderQuery(userId, options);
                            }
                            else {
                                // Only wallet transactions
                                baseQuery = this.buildWalletTransactionQuery(userId, options);
                            }
                            sqlString = baseQuery.toSQL().sql;
                            isUnionQuery = sqlString.includes('UNION');
                            paginationOptions = {
                                page: options.page || 1,
                                limit: options.limit || 10,
                                search: options.search,
                                // searchFields:
                                //   options.searchFields ||
                                //   (isUnionQuery
                                //     ? ['transaction_number', 'note', 'method', 'type', 'order_number']
                                //     : [
                                //         'transaction_number',
                                //         'note',
                                //         'method',
                                //         'type',
                                //         'status',
                                //         'order_number',
                                //       ]),
                                searchFields: options.searchFields ||
                                    (isUnionQuery
                                        ? ['transaction_number', 'note', 'method', 'type', 'order_number']
                                        : hasOrderType
                                            ? ['orders.order_number', 'orders.status'] // map đúng cột thật
                                            : [
                                                'wallet_transactions.transaction_number',
                                                'wallet_transactions.note',
                                                'wallet_transactions.method',
                                                'wallet_transactions.type',
                                                'wallet_transactions.status',
                                            ]),
                                orderBy: options.orderBy || 'created_at',
                                orderDir: options.orderDir || 'desc',
                                filters: options.filters,
                            };
                            return [4 /*yield*/, (0, pagination_util_1.paginateUnionQuery)(this.knexInstance, baseQuery, paginationOptions)];
                        case 1: return [2 /*return*/, _c.sent()];
                    }
                });
            });
        };
        WalletTransactionRepository_1.prototype.buildOrderQuery = function (userId, options) {
            var query = this.knexInstance('orders')
                .select([
                this.knexInstance.raw('orders.order_number::text as id'),
                'orders.order_number as transaction_number',
                this.knexInstance.raw('NULL::uuid as wallet_id'),
                'orders.buyer_id as user_id',
                this.knexInstance.raw('?::text as method', ['order']),
                'orders.total_amount as amount',
                this.knexInstance.raw('0::numeric as fee_amount'),
                this.knexInstance.raw('orders.status::text as status'),
                this.knexInstance.raw('orders.order_number::text as reference_code'),
                this.knexInstance.raw('NULL::jsonb as bank_info'),
                this.knexInstance.raw('NULL::text as note'),
                this.knexInstance.raw('NULL::text as transfer_proof_path'),
                'orders.created_at',
                'orders.updated_at as completed_at',
                this.knexInstance.raw('?::text as type', ['order']),
                'orders.id as order_id',
                this.knexInstance.raw('orders.order_number::text as order_number'),
                'orders.total_amount as order_total_amount',
                this.knexInstance.raw('orders.status::text as order_status'),
                'orders.created_at as order_created_at',
                'orders.updated_at as order_updated_at',
            ])
                .where('orders.buyer_id', userId)
                .andWhere('orders.status', 'completed');
            // For orders, only filter by status if it's 'completed' or if no status filter is applied
            // The query already filters by 'completed' status above, so no additional filtering needed
            if (options.start_date) {
                query.andWhere('orders.created_at', '>=', options.start_date);
            }
            if (options.end_date) {
                query.andWhere('orders.created_at', '<=', options.end_date);
            }
            return query;
        };
        WalletTransactionRepository_1.prototype.buildWalletTransactionQuery = function (userId, options) {
            var query = this.knexInstance('wallet_transactions')
                .select([
                this.knexInstance.raw('wallet_transactions.id::text as id'),
                'wallet_transactions.transaction_number',
                'wallet_transactions.wallet_id',
                'wallet_transactions.user_id',
                this.knexInstance.raw('wallet_transactions.method::text as method'),
                'wallet_transactions.amount',
                'wallet_transactions.fee_amount',
                this.knexInstance.raw('wallet_transactions.status::text as status'),
                this.knexInstance.raw('wallet_transactions.reference_code::text as reference_code'),
                this.knexInstance.raw('wallet_transactions.bank_info::jsonb as bank_info'),
                this.knexInstance.raw('wallet_transactions.note::text as note'),
                this.knexInstance.raw('wallet_transactions.transfer_proof_path::text as transfer_proof_path'),
                'wallet_transactions.created_at',
                'wallet_transactions.completed_at',
                this.knexInstance.raw('wallet_transactions.type::text as type'),
                this.knexInstance.raw('NULL::uuid as order_id'),
                this.knexInstance.raw('NULL::text as order_number'),
                this.knexInstance.raw('NULL::numeric as order_total_amount'),
                this.knexInstance.raw('NULL::text as order_status'),
                this.knexInstance.raw('NULL::timestamp as order_created_at'),
                this.knexInstance.raw('NULL::timestamp as order_updated_at'),
            ])
                .where('wallet_transactions.user_id', userId);
            // Exclude deposit transactions with pending status if option is enabled
            if (options.exclude_pending_deposits) {
                query.andWhereNot(function () {
                    this.where('wallet_transactions.type', 'deposit').andWhere('wallet_transactions.status', 'pending');
                });
            }
            if (options.types && options.types.length > 0) {
                query.whereIn('wallet_transactions.type', options.types);
            }
            if (options.status) {
                query.andWhere('wallet_transactions.status', options.status);
            }
            if (options.start_date) {
                query.andWhere('wallet_transactions.created_at', '>=', options.start_date);
            }
            if (options.end_date) {
                query.andWhere('wallet_transactions.created_at', '<=', options.end_date);
            }
            return query;
        };
        WalletTransactionRepository_1.prototype.findById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var transaction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb.where('id', id).first()];
                        case 1:
                            transaction = _a.sent();
                            return [2 /*return*/, transaction || null];
                    }
                });
            });
        };
        WalletTransactionRepository_1.prototype.findStatusById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var transaction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb
                                .select('id', 'status', 'user_id')
                                .where('id', id)
                                .first()];
                        case 1:
                            transaction = _a.sent();
                            return [2 /*return*/, transaction || null];
                    }
                });
            });
        };
        WalletTransactionRepository_1.prototype.findByReferenceCode = function (referenceCode, minutes) {
            return __awaiter(this, void 0, void 0, function () {
                var query, transaction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = this.qb
                                .where('reference_code', referenceCode)
                                .andWhere('status', 'pending');
                            if (minutes) {
                                query = query.andWhere('created_at', '>=', new Date(Date.now() - minutes * 60 * 1000));
                            }
                            return [4 /*yield*/, query.first()];
                        case 1:
                            transaction = _a.sent();
                            return [2 /*return*/, transaction || null];
                    }
                });
            });
        };
        WalletTransactionRepository_1.prototype.updateStatus = function (id, status, completedAt) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, trx
                                                .table('wallet_transactions')
                                                .where('id', id)
                                                .update({ status: status, completed_at: completedAt })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
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
        WalletTransactionRepository_1.prototype.findPendingTransactions = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb
                                .where('status', 'pending')
                                .orderBy('created_at', 'desc')];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        WalletTransactionRepository_1.prototype.deletePendingDepositOlderThan = function (minutes) {
            return __awaiter(this, void 0, void 0, function () {
                var minutesAgo, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            minutesAgo = new Date(Date.now() - minutes * 60 * 1000);
                            return [4 /*yield*/, this.qb
                                    .where('status', 'pending')
                                    .andWhere('type', 'deposit')
                                    .andWhere('created_at', '<', minutesAgo)
                                    .del()];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        WalletTransactionRepository_1.prototype.createOrderReleaseTransaction = function (trx, userId, walletId, amount, transactionNumber, note) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Create wallet transaction for shop
                        return [4 /*yield*/, trx('wallet_transactions').insert({
                                wallet_id: walletId,
                                user_id: userId,
                                type: 'order_release',
                                amount: amount,
                                status: 'success',
                                note: note,
                                transaction_number: transactionNumber,
                                created_at: trx.fn.now(),
                                completed_at: trx.fn.now(),
                            })];
                        case 1:
                            // Create wallet transaction for shop
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return WalletTransactionRepository_1;
    }(_classSuper));
    __setFunctionName(_classThis, "WalletTransactionRepository");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WalletTransactionRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WalletTransactionRepository = _classThis;
}();
exports.WalletTransactionRepository = WalletTransactionRepository;
