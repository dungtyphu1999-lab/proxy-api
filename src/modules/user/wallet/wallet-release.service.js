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
exports.WalletReleaseService = void 0;
var common_1 = require("@nestjs/common");
var order_complaint_entity_1 = require("@/database/entities/order-complaint.entity");
var WalletReleaseService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var WalletReleaseService = _classThis = /** @class */ (function () {
        function WalletReleaseService_1(databaseService, walletRepository, walletTransactionRepository, walletSettingsService, orderComplaintsRepository, knex) {
            this.databaseService = databaseService;
            this.walletRepository = walletRepository;
            this.walletTransactionRepository = walletTransactionRepository;
            this.walletSettingsService = walletSettingsService;
            this.orderComplaintsRepository = orderComplaintsRepository;
            this.knex = knex;
            this.logger = new common_1.Logger(WalletReleaseService.name);
        }
        /**
         * Release money from locked_balance to sale_balance for eligible orders
         * Runs daily at 12:00 AM (midnight)
         */
        WalletReleaseService_1.prototype.releaseLockedBalanceToSaleBalance = function () {
            return __awaiter(this, void 0, void 0, function () {
                var walletSettings, moneyHoldingDays, cutoffDate, eligibleTransactions, results, _i, eligibleTransactions_1, transaction, orderNumber, result_1, orderInfo, result_2, canReleaseResult, result_3, result, error_1, errorMessage, result, successCount, failedCount, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log('Starting daily release of locked balance to sale balance');
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 12, , 13]);
                            return [4 /*yield*/, this.walletSettingsService.getSettings()];
                        case 2:
                            walletSettings = _a.sent();
                            moneyHoldingDays = (walletSettings === null || walletSettings === void 0 ? void 0 : walletSettings.money_holding_days) || 7;
                            cutoffDate = new Date();
                            cutoffDate.setDate(cutoffDate.getDate() - moneyHoldingDays);
                            cutoffDate.setHours(0, 0, 0, 0); // Start of the day
                            this.logger.log("Processing orders completed before: ".concat(cutoffDate.toISOString(), " (").concat(moneyHoldingDays, " days ago)"));
                            return [4 /*yield*/, this.getEligibleOrderReleaseTransactions(cutoffDate)];
                        case 3:
                            eligibleTransactions = _a.sent();
                            this.logger.log("Found ".concat(eligibleTransactions.length, " eligible transactions to process"));
                            results = [];
                            _i = 0, eligibleTransactions_1 = eligibleTransactions;
                            _a.label = 4;
                        case 4:
                            if (!(_i < eligibleTransactions_1.length)) return [3 /*break*/, 11];
                            transaction = eligibleTransactions_1[_i];
                            _a.label = 5;
                        case 5:
                            _a.trys.push([5, 9, , 10]);
                            orderNumber = this.extractOrderNumberFromNote(transaction.note);
                            if (!orderNumber) {
                                result_1 = {
                                    order_id: 'unknown',
                                    order_number: 'unknown',
                                    shop_id: 'unknown',
                                    shop_name: 'unknown',
                                    amount: transaction.amount,
                                    success: false,
                                    reason: "Cannot extract order number from transaction note: ".concat(transaction.note),
                                };
                                results.push(result_1);
                                this.logger.warn("[RELEASE FAILED] Transaction: ".concat(transaction.id, " | Order: unknown | Shop: unknown | Amount: ").concat(transaction.amount, " VND | Reason: Cannot extract order number from note"));
                                return [3 /*break*/, 10];
                            }
                            return [4 /*yield*/, this.getOrderInfo(orderNumber)];
                        case 6:
                            orderInfo = _a.sent();
                            if (!orderInfo) {
                                result_2 = {
                                    order_id: 'unknown',
                                    order_number: orderNumber,
                                    shop_id: 'unknown',
                                    shop_name: 'unknown',
                                    amount: transaction.amount,
                                    success: false,
                                    reason: "Order not found: ".concat(orderNumber),
                                };
                                results.push(result_2);
                                this.logger.warn("[RELEASE FAILED] Transaction: ".concat(transaction.id, " | Order: ").concat(orderNumber, " | Shop: unknown | Amount: ").concat(transaction.amount, " VND | Reason: Order not found"));
                                return [3 /*break*/, 10];
                            }
                            return [4 /*yield*/, this.canReleaseOrderWithReason(orderNumber, orderInfo.order_id)];
                        case 7:
                            canReleaseResult = _a.sent();
                            if (!canReleaseResult.canRelease) {
                                result_3 = {
                                    order_id: orderInfo.order_id,
                                    order_number: orderNumber,
                                    shop_id: orderInfo.shop_id,
                                    shop_name: orderInfo.shop_name,
                                    amount: transaction.amount,
                                    success: false,
                                    reason: canReleaseResult.reason,
                                };
                                results.push(result_3);
                                this.logger.warn("[RELEASE SKIPPED] Transaction: ".concat(transaction.id, " | Order: ").concat(orderNumber, " (").concat(orderInfo.order_id, ") | Shop: ").concat(orderInfo.shop_name, " (").concat(orderInfo.shop_id, ") | Amount: ").concat(transaction.amount, " VND | Reason: ").concat(canReleaseResult.reason));
                                return [3 /*break*/, 10];
                            }
                            // Release money from locked_balance to sale_balance
                            return [4 /*yield*/, this.releaseMoney(transaction.wallet_id, transaction.amount, transaction.id)];
                        case 8:
                            // Release money from locked_balance to sale_balance
                            _a.sent();
                            result = {
                                order_id: orderInfo.order_id,
                                order_number: orderNumber,
                                shop_id: orderInfo.shop_id,
                                shop_name: orderInfo.shop_name,
                                amount: transaction.amount,
                                success: true,
                                reason: 'Successfully released from locked_balance to sale_balance',
                            };
                            results.push(result);
                            this.logger.log("[RELEASE SUCCESS] Transaction: ".concat(transaction.id, " | Order: ").concat(orderNumber, " (").concat(orderInfo.order_id, ") | Shop: ").concat(orderInfo.shop_name, " (").concat(orderInfo.shop_id, ") | Amount: ").concat(transaction.amount, " VND | Reason: Successfully released"));
                            return [3 /*break*/, 10];
                        case 9:
                            error_1 = _a.sent();
                            errorMessage = error_1 instanceof Error ? error_1.message : String(error_1);
                            result = {
                                order_id: 'unknown',
                                order_number: 'unknown',
                                shop_id: 'unknown',
                                shop_name: 'unknown',
                                amount: transaction.amount,
                                success: false,
                                reason: "Error: ".concat(errorMessage),
                            };
                            results.push(result);
                            this.logger.error("[RELEASE FAILED] Transaction: ".concat(transaction.id, " | Order: unknown | Shop: unknown | Amount: ").concat(transaction.amount, " VND | Reason: ").concat(errorMessage));
                            return [3 /*break*/, 10];
                        case 10:
                            _i++;
                            return [3 /*break*/, 4];
                        case 11:
                            successCount = results.filter(function (r) { return r.success; }).length;
                            failedCount = results.filter(function (r) { return !r.success; }).length;
                            this.logger.log("Release process completed. Success: ".concat(successCount, ", Failed/Skipped: ").concat(failedCount));
                            return [2 /*return*/, results];
                        case 12:
                            error_2 = _a.sent();
                            this.logger.error('Error in releaseLockedBalanceToSaleBalance:', error_2 instanceof Error ? error_2.message : String(error_2));
                            throw error_2;
                        case 13: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get all order_release transactions that are eligible for release
         */
        WalletReleaseService_1.prototype.getEligibleOrderReleaseTransactions = function (cutoffDate) {
            return __awaiter(this, void 0, void 0, function () {
                var transactions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.knex('wallet_transactions')
                                .select([
                                'wallet_transactions.id',
                                'wallet_transactions.wallet_id',
                                'wallet_transactions.user_id',
                                'wallet_transactions.amount',
                                'wallet_transactions.note',
                                'wallet_transactions.created_at',
                            ])
                                .where('wallet_transactions.type', 'order_release')
                                .where('wallet_transactions.status', 'success')
                                .where('wallet_transactions.created_at', '<=', cutoffDate)
                                .orderBy('wallet_transactions.created_at', 'asc')];
                        case 1:
                            transactions = _a.sent();
                            return [2 /*return*/, transactions];
                    }
                });
            });
        };
        /**
         * Extract order number from transaction note
         * Note format: "Order release for ORDER_NUMBER"
         */
        WalletReleaseService_1.prototype.extractOrderNumberFromNote = function (note) {
            if (!note)
                return null;
            var match = note.match(/Order release for (.+)/i);
            return match ? match[1].trim() : null;
        };
        /**
         * Get order info including shop name
         */
        WalletReleaseService_1.prototype.getOrderInfo = function (orderNumber) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.knex('orders')
                                .select('orders.id as order_id', 'orders.shop_id', 'shops.name as shop_name')
                                .leftJoin('shops', 'orders.shop_id', 'shops.id')
                                .where('orders.order_number', orderNumber)
                                .first()];
                        case 1:
                            order = (_a.sent());
                            if (!order) {
                                return [2 /*return*/, null];
                            }
                            return [2 /*return*/, {
                                    order_id: String(order.order_id),
                                    shop_id: String(order.shop_id),
                                    shop_name: order.shop_name || 'Unknown Shop',
                                }];
                    }
                });
            });
        };
        /**
         * Check if order can be released (no complaint or complaint has valid status)
         * Returns both boolean and reason
         */
        WalletReleaseService_1.prototype.canReleaseOrderWithReason = function (orderNumber, orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var complaints, unresolvedComplaints, complaintStatuses;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.knex('order_complaints')
                                .select('id', 'status', 'resolution_type')
                                .where('order_id', orderId)];
                        case 1:
                            complaints = (_a.sent());
                            // If no complaints, can release
                            if (complaints.length === 0) {
                                return [2 /*return*/, {
                                        canRelease: true,
                                        reason: 'No complaints found',
                                    }];
                            }
                            unresolvedComplaints = complaints.filter(function (complaint) {
                                // Check if status is resolved
                                if (order_complaint_entity_1.RESOLVED_STATUSES.includes(complaint.status)) {
                                    return false; // This complaint is resolved
                                }
                                // Check if resolution_type is replacement (shop updated product/link)
                                if (complaint.resolution_type === 'replacement') {
                                    return false; // This complaint is resolved via replacement
                                }
                                return true; // This complaint is still unresolved
                            });
                            if (unresolvedComplaints.length === 0) {
                                return [2 /*return*/, {
                                        canRelease: true,
                                        reason: 'All complaints are resolved',
                                    }];
                            }
                            complaintStatuses = unresolvedComplaints
                                .map(function (c) { return "status: ".concat(c.status); })
                                .join(', ');
                            return [2 /*return*/, {
                                    canRelease: false,
                                    reason: "Order has unresolved complaints (".concat(complaintStatuses, ")"),
                                }];
                    }
                });
            });
        };
        /**
         * Release money from locked_balance to sale_balance
         */
        WalletReleaseService_1.prototype.releaseMoney = function (walletId, amount, _transactionId) {
            return __awaiter(this, void 0, void 0, function () {
                var amountNumber;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            amountNumber = Number(amount);
                            if (!Number.isFinite(amountNumber)) {
                                throw new Error("Invalid amount: ".concat(amount));
                            }
                            return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                    var wallet, currentLockedBalance, currentSaleBalance, releaseAmount, newLockedBalance, newSaleBalance, newLockedBalance, newSaleBalance;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, trx('wallets')
                                                    .where('id', walletId)
                                                    .forUpdate()
                                                    .first()];
                                            case 1:
                                                wallet = _a.sent();
                                                if (!wallet) {
                                                    throw new Error("Wallet not found: ".concat(walletId));
                                                }
                                                currentLockedBalance = Number(wallet.locked_balance || 0);
                                                currentSaleBalance = Number(wallet.sale_balance || 0);
                                                if (!(currentLockedBalance < amountNumber)) return [3 /*break*/, 3];
                                                this.logger.warn("Insufficient locked_balance. Wallet: ".concat(walletId, ", Required: ").concat(amountNumber, ", Available: ").concat(currentLockedBalance));
                                                releaseAmount = currentLockedBalance;
                                                newLockedBalance = 0;
                                                newSaleBalance = currentSaleBalance + releaseAmount;
                                                return [4 /*yield*/, trx('wallets').where('id', walletId).update({
                                                        locked_balance: newLockedBalance,
                                                        sale_balance: newSaleBalance,
                                                        updated_at: trx.fn.now(),
                                                    })];
                                            case 2:
                                                _a.sent();
                                                this.logger.log("Released partial amount ".concat(releaseAmount, " VND (requested ").concat(amountNumber, " VND) for wallet ").concat(walletId, " transactionId: ").concat(_transactionId));
                                                return [3 /*break*/, 5];
                                            case 3:
                                                newLockedBalance = currentLockedBalance - amountNumber;
                                                newSaleBalance = currentSaleBalance + amountNumber;
                                                return [4 /*yield*/, trx('wallets').where('id', walletId).update({
                                                        locked_balance: newLockedBalance,
                                                        sale_balance: newSaleBalance,
                                                        updated_at: trx.fn.now(),
                                                    })];
                                            case 4:
                                                _a.sent();
                                                this.logger.log("Released ".concat(amountNumber, " VND from locked_balance to sale_balance for wallet ").concat(walletId, " transactionId: ").concat(_transactionId));
                                                _a.label = 5;
                                            case 5: return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return WalletReleaseService_1;
    }());
    __setFunctionName(_classThis, "WalletReleaseService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WalletReleaseService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WalletReleaseService = _classThis;
}();
exports.WalletReleaseService = WalletReleaseService;
