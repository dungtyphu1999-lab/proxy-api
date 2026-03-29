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
exports.WalletService = void 0;
/* eslint-disable
  @typescript-eslint/no-unsafe-argument,
  @typescript-eslint/no-unsafe-assignment,
  @typescript-eslint/no-unsafe-member-access
*/
var common_1 = require("@nestjs/common");
var payment_menthod_enum_1 = require("@/shared/enum/payment-menthod.enum");
var wallet_transaction_util_1 = require("@/shared/utils/wallet-transaction.util");
var notification_hashing_util_1 = require("@/shared/utils/notification-hashing.util");
var notification_templates_1 = require("@/shared/constants/notification-templates");
var error_codes_enum_1 = require("@/shared/constants/error-codes.enum");
var axios_1 = require("axios");
var mualikeconstant_1 = require("@/modules/mualikes/mualikeconstant");
var WalletService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var WalletService = _classThis = /** @class */ (function () {
        function WalletService_1(databaseService, walletRepository, walletTransactionRepository, pay2SService, shopRequestsRepository, adminNotificationService, notificationGateway, userService) {
            this.databaseService = databaseService;
            this.walletRepository = walletRepository;
            this.walletTransactionRepository = walletTransactionRepository;
            this.pay2SService = pay2SService;
            this.shopRequestsRepository = shopRequestsRepository;
            this.adminNotificationService = adminNotificationService;
            this.notificationGateway = notificationGateway;
            this.userService = userService;
            this.logger = new common_1.Logger(WalletService.name);
            this.mualikesServiceNameCache = null;
        }
        WalletService_1.prototype.getOrCreateWallet = function (userId, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var wallet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.walletRepository.findByUserId(userId, trx)];
                        case 1:
                            wallet = _a.sent();
                            if (!!wallet) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.walletRepository.createWallet(userId, trx)];
                        case 2:
                            wallet = _a.sent();
                            this.logger.log("Created new wallet for user ".concat(userId));
                            _a.label = 3;
                        case 3: return [2 /*return*/, wallet];
                    }
                });
            });
        };
        WalletService_1.prototype.findWallet = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.walletRepository.findByUserId(userId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        WalletService_1.prototype.createDeposit = function (userId, createDepositDto) {
            return __awaiter(this, void 0, void 0, function () {
                var wallet, content, paymentQrLink, bankInfo, transaction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrCreateWallet(userId)];
                        case 1:
                            wallet = _a.sent();
                            if (wallet.is_locked) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.WALLET_IS_LOCKED);
                            }
                            content = this.generateContentPayment();
                            paymentQrLink = this.pay2SService.generateQrCode({
                                amount: createDepositDto.amount,
                                content: content,
                            });
                            bankInfo = this.pay2SService.getBankInfo();
                            return [4 /*yield*/, this.walletTransactionRepository.createTransaction({
                                    transaction_number: (0, wallet_transaction_util_1.generateTransactionNumber)(),
                                    wallet_id: wallet.id,
                                    user_id: userId,
                                    type: 'deposit',
                                    method: payment_menthod_enum_1.PAYMENT_METHOD.PAY2S,
                                    amount: createDepositDto.amount,
                                    status: 'pending',
                                    reference_code: content,
                                })];
                        case 2:
                            transaction = _a.sent();
                            return [2 /*return*/, {
                                    transaction_id: transaction.id,
                                    transaction_number: transaction.transaction_number,
                                    amount: createDepositDto.amount,
                                    content: content,
                                    payment_qr_link: paymentQrLink,
                                    bank_info: {
                                        bank_code: bankInfo.bankCode,
                                        bank_number: bankInfo.bankNumber,
                                        bank_name: bankInfo.bankName,
                                    },
                                    created_at: transaction.created_at,
                                }];
                    }
                });
            });
        };
        WalletService_1.prototype.processDepositFailure = function (transactionId) {
            return __awaiter(this, void 0, void 0, function () {
                var transaction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.walletTransactionRepository.findById(transactionId)];
                        case 1:
                            transaction = _a.sent();
                            if (!transaction) {
                                throw new common_1.NotFoundException(error_codes_enum_1.ErrorCode.WALLET_TRANSACTION_NOT_FOUND);
                            }
                            return [4 /*yield*/, this.walletTransactionRepository.updateStatus(transactionId, 'failed', new Date())];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        WalletService_1.prototype.checkTransactionStatus = function (userId, transactionId) {
            return __awaiter(this, void 0, void 0, function () {
                var transaction;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.walletTransactionRepository.findStatusById(transactionId)];
                        case 1:
                            transaction = _a.sent();
                            if (!transaction || transaction.user_id !== userId) {
                                throw new common_1.NotFoundException(error_codes_enum_1.ErrorCode.WALLET_TRANSACTION_NOT_FOUND);
                            }
                            return [2 /*return*/, {
                                    transaction_id: transaction.id,
                                    status: transaction.status,
                                }];
                    }
                });
            });
        };
        WalletService_1.prototype.generateContentPayment = function () {
            var randomChars = Math.random()
                .toString(36)
                .substring(2, 6)
                .toUpperCase();
            var randomNumbers = Math.floor(Math.random() * 10000)
                .toString()
                .padStart(5, '0');
            return "NH".concat(randomChars).concat(randomNumbers);
        };
        WalletService_1.prototype.createWithdraw = function (userId, createWithdrawDto) {
            return __awaiter(this, void 0, void 0, function () {
                var wallet, shopRequest, bankInfo, transaction, newLockedBalance, user, userName, notificationTemplate, notificationResult, notificationHash, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getOrCreateWallet(userId)];
                        case 1:
                            wallet = _a.sent();
                            if (wallet.is_locked) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.WALLET_IS_LOCKED);
                            }
                            // Check if user has sufficient sale balance
                            if (Number(wallet.sale_balance) - Number(wallet.locked_balance) <
                                createWithdrawDto.amount) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.WALLET_INSUFFICIENT_BALANCE);
                            }
                            return [4 /*yield*/, this.shopRequestsRepository.findById(createWithdrawDto.shop_request_id)];
                        case 2:
                            shopRequest = _a.sent();
                            if (!shopRequest || shopRequest.user_id !== userId) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.SHOP_REQUEST_NOT_FOUND);
                            }
                            if (shopRequest.status !== 'approved') {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.SHOP_REQUEST_NOT_APPROVED);
                            }
                            bankInfo = {
                                bank_code: shopRequest.bank_code,
                                bank_name: shopRequest.bank_name,
                                account_number: shopRequest.bank_account_number,
                                account_name: shopRequest.bank_account_name,
                            };
                            return [4 /*yield*/, this.walletTransactionRepository.createTransaction({
                                    transaction_number: (0, wallet_transaction_util_1.generateTransactionNumber)(),
                                    wallet_id: wallet.id,
                                    user_id: userId,
                                    type: 'withdraw',
                                    method: payment_menthod_enum_1.PAYMENT_METHOD.BANK_TRANSFER,
                                    amount: createWithdrawDto.amount,
                                    status: 'pending',
                                    bank_info: bankInfo,
                                })];
                        case 3:
                            transaction = _a.sent();
                            newLockedBalance = Number(wallet.locked_balance) + createWithdrawDto.amount;
                            return [4 /*yield*/, this.walletRepository.updateLockedBalance(wallet.id, newLockedBalance)];
                        case 4:
                            _a.sent();
                            this.logger.log("Withdraw request created: ".concat(transaction.id, " for user ").concat(userId));
                            return [4 /*yield*/, this.userService.findById(userId)];
                        case 5:
                            user = _a.sent();
                            userName = (user === null || user === void 0 ? void 0 : user.username) || 'Người dùng';
                            _a.label = 6;
                        case 6:
                            _a.trys.push([6, 8, , 9]);
                            notificationTemplate = notification_templates_1.ADMIN_NOTIFICATION_TEMPLATES.WITHDRAW_REQUEST_CREATED(userName, createWithdrawDto.amount, bankInfo.bank_name, bankInfo.account_number);
                            return [4 /*yield*/, this.adminNotificationService.createNotification({
                                    type: 'wallet',
                                    title: notificationTemplate.title,
                                    message: notificationTemplate.message,
                                    link_url: notificationTemplate.link_url,
                                    related_entity_type: 'wallet',
                                    related_entity_id: transaction.id,
                                }, userId)];
                        case 7:
                            notificationResult = _a.sent();
                            notificationHash = (0, notification_hashing_util_1.createNotificationHash)(notificationResult.id, notificationResult.type, notificationResult.title, notificationResult.message);
                            // Emit notification to admin via WebSocket
                            this.notificationGateway.emitWithdrawRequestCreated({
                                transaction_id: transaction.id,
                                transaction_number: transaction.transaction_number,
                                user_id: userId,
                                amount: createWithdrawDto.amount,
                                bank_info: transaction.bank_info || {
                                    bank_name: shopRequest.bank_code,
                                    account_number: shopRequest.bank_account_number,
                                    account_name: shopRequest.bank_account_name,
                                },
                                created_at: transaction.created_at.toISOString(),
                                hash: notificationHash,
                                notification_title: notificationTemplate.title,
                                notification_message: notificationTemplate.message,
                                notification_id: notificationResult.id,
                                notification_created_at: notificationResult.created_at.toISOString(),
                            });
                            return [3 /*break*/, 9];
                        case 8:
                            error_1 = _a.sent();
                            // Log error but don't fail the withdraw request
                            this.logger.error('Failed to create or emit withdraw request notification:', error_1 instanceof Error ? error_1.message : String(error_1));
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/, {
                                transaction_id: transaction.id,
                                transaction_number: transaction.transaction_number,
                                amount: createWithdrawDto.amount,
                                bank_info: transaction.bank_info || {
                                    bank_name: shopRequest.bank_code,
                                    account_number: shopRequest.bank_account_number,
                                    account_name: shopRequest.bank_account_name,
                                },
                                status: transaction.status,
                                note: undefined,
                                created_at: transaction.created_at,
                            }];
                    }
                });
            });
        };
        WalletService_1.prototype.getTransactionHistory = function (userId_1) {
            return __awaiter(this, arguments, void 0, function (userId, options) {
                var rawSearch, found, _a, types, result, smmRefCodes, serviceNameByOrderNumber, displayTxnBySmmOrderNumber, rows, idsToResolve, providerNameById_1, _b, proxyOrderIds, proxyTxRows, _c, proxyNoteByWalletTxNumber, proxyNoteByOrderId, _i, _d, row, meta, note, walletTxNumber, orderId;
                var _e, _f, _g, _h;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_j) {
                    switch (_j.label) {
                        case 0:
                            rawSearch = String(options.search || '').trim();
                            if (!(rawSearch && /^\d{5,}$/.test(rawSearch))) return [3 /*break*/, 4];
                            _j.label = 1;
                        case 1:
                            _j.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.databaseService
                                    .getKnex()('smm_orders')
                                    .select('order_number')
                                    .where('provider_order_id', rawSearch)
                                    .first()];
                        case 2:
                            found = _j.sent();
                            if (found === null || found === void 0 ? void 0 : found.order_number) {
                                options = __assign(__assign({}, options), { search: String(found.order_number) });
                            }
                            return [3 /*break*/, 4];
                        case 3:
                            _a = _j.sent();
                            return [3 /*break*/, 4];
                        case 4:
                            types = options.type
                                ? [options.type]
                                : [
                                    'deposit',
                                    'withdraw',
                                    'payment',
                                    'PROXY',
                                    // Legacy/admin analytics type for service deductions (SMM orders)
                                    'SERVICE',
                                    'refund',
                                    // "order" is a synthetic type from orders table (see WalletTransactionRepository).
                                    'order',
                                ];
                            return [4 /*yield*/, this.walletTransactionRepository.getByUserIdWithPagination(userId, __assign(__assign({}, options), { types: types }))];
                        case 5:
                            result = _j.sent();
                            smmRefCodes = Array.from(new Set(result.records
                                .filter(function (t) {
                                return (t === null || t === void 0 ? void 0 : t.type) === 'payment' ||
                                    (t === null || t === void 0 ? void 0 : t.type) === 'refund' ||
                                    (t === null || t === void 0 ? void 0 : t.type) === 'SERVICE';
                            })
                                .map(function (t) { return String((t === null || t === void 0 ? void 0 : t.reference_code) || '').trim(); })
                                .filter(function (x) { return x.startsWith('SMM-'); })));
                            serviceNameByOrderNumber = {};
                            displayTxnBySmmOrderNumber = {};
                            if (!smmRefCodes.length) return [3 /*break*/, 10];
                            return [4 /*yield*/, this.databaseService
                                    .getKnex()('smm_orders')
                                    .select([
                                    'order_number',
                                    'service_name',
                                    'service_id',
                                    'provider_order_id',
                                ])
                                    .whereIn('order_number', smmRefCodes)];
                        case 6:
                            rows = _j.sent();
                            idsToResolve = Array.from(new Set((rows || [])
                                .map(function (r) { return Number(r.service_id); })
                                .filter(function (n) { return Number.isFinite(n) && n > 0; })));
                            if (!idsToResolve.length) return [3 /*break*/, 8];
                            return [4 /*yield*/, this.getMualikesServiceNamesByIds(idsToResolve)];
                        case 7:
                            _b = _j.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            _b = {};
                            _j.label = 9;
                        case 9:
                            providerNameById_1 = _b;
                            serviceNameByOrderNumber = Object.fromEntries((rows || [])
                                .map(function (r) {
                                var orderNumber = String(r.order_number);
                                var rawName = String(r.service_name || '').trim();
                                var sid = Number(r.service_id);
                                var resolved = (!rawName || /^Service\\s+#\\d+$/i.test(rawName)) &&
                                    Number.isFinite(sid) &&
                                    sid > 0
                                    ? providerNameById_1[sid] || rawName
                                    : rawName;
                                return [orderNumber, resolved];
                            })
                                .filter(function (_a) {
                                var name = _a[1];
                                return Boolean(name);
                            }));
                            // Prefer provider order id if present, else fall back to our SMM order number.
                            displayTxnBySmmOrderNumber = Object.fromEntries((rows || [])
                                .map(function (r) {
                                var orderNumber = String(r.order_number || '').trim();
                                if (!orderNumber)
                                    return null;
                                var providerOrderId = r.provider_order_id != null && String(r.provider_order_id).trim()
                                    ? String(r.provider_order_id).trim()
                                    : orderNumber;
                                return [orderNumber, providerOrderId];
                            })
                                .filter(Boolean));
                            _j.label = 10;
                        case 10:
                            proxyOrderIds = Array.from(new Set(result.records
                                .filter(function (t) { return (t === null || t === void 0 ? void 0 : t.type) === 'PROXY'; })
                                .map(function (t) { return String((t === null || t === void 0 ? void 0 : t.reference_code) || '').trim(); })
                                .filter(function (x) { return /^[0-9a-f-]{36}$/i.test(x); })));
                            if (!proxyOrderIds.length) return [3 /*break*/, 12];
                            return [4 /*yield*/, this.databaseService
                                    .getKnex()('proxy_transactions')
                                    .select(['proxy_order_id', 'metadata', 'created_at'])
                                    .whereIn('proxy_order_id', proxyOrderIds)
                                    .whereIn('type', ['payment', 'renewal'])
                                    .where('status', 'success')
                                    .orderBy('created_at', 'desc')];
                        case 11:
                            _c = _j.sent();
                            return [3 /*break*/, 13];
                        case 12:
                            _c = [];
                            _j.label = 13;
                        case 13:
                            proxyTxRows = _c;
                            proxyNoteByWalletTxNumber = new Map();
                            proxyNoteByOrderId = new Map();
                            for (_i = 0, _d = proxyTxRows; _i < _d.length; _i++) {
                                row = _d[_i];
                                meta = (row === null || row === void 0 ? void 0 : row.metadata) && typeof row.metadata === 'object'
                                    ? row.metadata
                                    : {};
                                note = String((_f = (_e = meta.note_vi) !== null && _e !== void 0 ? _e : meta.note) !== null && _f !== void 0 ? _f : '').trim();
                                if (!note)
                                    continue;
                                walletTxNumber = String((_g = meta.wallet_transaction_number) !== null && _g !== void 0 ? _g : '').trim();
                                if (walletTxNumber && !proxyNoteByWalletTxNumber.has(walletTxNumber)) {
                                    proxyNoteByWalletTxNumber.set(walletTxNumber, note);
                                }
                                orderId = String((_h = row.proxy_order_id) !== null && _h !== void 0 ? _h : '').trim();
                                if (orderId && !proxyNoteByOrderId.has(orderId)) {
                                    proxyNoteByOrderId.set(orderId, note);
                                }
                            }
                            return [2 /*return*/, {
                                    records: result.records.map(function (transaction) { return ({
                                        id: transaction.id,
                                        transaction_number: transaction.transaction_number,
                                        display_transaction_number: (transaction.type === 'payment' ||
                                            transaction.type === 'refund' ||
                                            transaction.type === 'SERVICE') &&
                                            displayTxnBySmmOrderNumber[String(transaction.reference_code || '').trim()]
                                            ? displayTxnBySmmOrderNumber[String(transaction.reference_code || '').trim()]
                                            : transaction.transaction_number,
                                        type: transaction.type,
                                        amount: transaction.amount,
                                        fee_amount: transaction.fee_amount,
                                        status: transaction.status === 'pending' &&
                                            (0, wallet_transaction_util_1.isAutoCancelledPendingTransaction)(transaction.created_at, 30)
                                            ? 'cancelled'
                                            : transaction.status,
                                        method: transaction.method,
                                        bank_info: transaction.bank_info,
                                        note: transaction.type === 'PROXY'
                                            ? proxyNoteByWalletTxNumber.get(String(transaction.transaction_number || '').trim()) ||
                                                proxyNoteByOrderId.get(String(transaction.reference_code || '').trim()) ||
                                                transaction.note
                                            : (transaction.type === 'payment' ||
                                                transaction.type === 'refund' ||
                                                transaction.type === 'SERVICE') &&
                                                serviceNameByOrderNumber[String(transaction.reference_code || '').trim()]
                                                ? serviceNameByOrderNumber[String(transaction.reference_code || '').trim()]
                                                : transaction.note,
                                        created_at: transaction.created_at,
                                        completed_at: transaction.completed_at,
                                    }); }),
                                    meta: result.meta,
                                }];
                    }
                });
            });
        };
        WalletService_1.prototype.getMualikesServiceNamesByIds = function (ids) {
            return __awaiter(this, void 0, void 0, function () {
                var now, out, _i, ids_1, id, name_1, formData, res, list, byId, _a, list_1, s, id, name_2, out, _b, ids_2, id, name_3, _c;
                var _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            now = Date.now();
                            if (this.mualikesServiceNameCache &&
                                this.mualikesServiceNameCache.expiresAtMs > now) {
                                out = {};
                                for (_i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
                                    id = ids_1[_i];
                                    name_1 = this.mualikesServiceNameCache.byId.get(id);
                                    if (name_1)
                                        out[id] = name_1;
                                }
                                return [2 /*return*/, out];
                            }
                            _f.label = 1;
                        case 1:
                            _f.trys.push([1, 3, , 4]);
                            formData = new URLSearchParams();
                            formData.append('token', mualikeconstant_1.TOKEN_MUALIKE);
                            return [4 /*yield*/, axios_1.default.post('https://mualikes.net/api/listService', formData, {
                                    maxRedirects: 0,
                                    validateStatus: function (s) { return s < 500; },
                                    timeout: 15000,
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36',
                                    },
                                })];
                        case 2:
                            res = _f.sent();
                            list = ((_d = res === null || res === void 0 ? void 0 : res.data) === null || _d === void 0 ? void 0 : _d.status) ? ((_e = res === null || res === void 0 ? void 0 : res.data) === null || _e === void 0 ? void 0 : _e.message) || [] : [];
                            byId = new Map();
                            for (_a = 0, list_1 = list; _a < list_1.length; _a++) {
                                s = list_1[_a];
                                id = Number(s === null || s === void 0 ? void 0 : s.id);
                                name_2 = String((s === null || s === void 0 ? void 0 : s.name) || '').trim();
                                if (Number.isFinite(id) && id > 0 && name_2)
                                    byId.set(id, name_2);
                            }
                            // cache 10 minutes
                            this.mualikesServiceNameCache = {
                                expiresAtMs: now + 10 * 60 * 1000,
                                byId: byId,
                            };
                            out = {};
                            for (_b = 0, ids_2 = ids; _b < ids_2.length; _b++) {
                                id = ids_2[_b];
                                name_3 = byId.get(id);
                                if (name_3)
                                    out[id] = name_3;
                            }
                            return [2 /*return*/, out];
                        case 3:
                            _c = _f.sent();
                            this.mualikesServiceNameCache = null;
                            return [2 /*return*/, {}];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        WalletService_1.prototype.processPaymentDeductionForPayment = function (trx, wallet, amount, userId, note, referenceCode) {
            return __awaiter(this, void 0, void 0, function () {
                var transactionNumber;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Deduct balance from wallet
                        return [4 /*yield*/, this.walletRepository.deductBalance(trx, wallet.id, Number(amount))];
                        case 1:
                            // Deduct balance from wallet
                            _a.sent();
                            transactionNumber = (0, wallet_transaction_util_1.generateTransactionNumber)();
                            return [4 /*yield*/, trx('wallet_transactions').insert({
                                    transaction_number: transactionNumber,
                                    wallet_id: wallet.id,
                                    user_id: userId,
                                    type: 'payment',
                                    amount: Number(amount),
                                    status: 'success',
                                    note: note,
                                    reference_code: referenceCode,
                                    created_at: trx.fn.now(),
                                    completed_at: trx.fn.now(),
                                })];
                        case 2:
                            _a.sent();
                            this.logger.log("Processed payment deduction: ".concat(amount, " for user ").concat(userId, ", reference: ").concat(referenceCode));
                            return [2 /*return*/];
                    }
                });
            });
        };
        return WalletService_1;
    }());
    __setFunctionName(_classThis, "WalletService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WalletService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WalletService = _classThis;
}();
exports.WalletService = WalletService;
