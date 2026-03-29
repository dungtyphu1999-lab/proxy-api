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
exports.WebhookService = void 0;
var common_1 = require("@nestjs/common");
var crypto_1 = require("crypto");
var WebhookService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var WebhookService = _classThis = /** @class */ (function () {
        function WebhookService_1(configService, databaseService, walletTransactionRepository, walletRepository, notificationGateway) {
            this.configService = configService;
            this.databaseService = databaseService;
            this.walletTransactionRepository = walletTransactionRepository;
            this.walletRepository = walletRepository;
            this.notificationGateway = notificationGateway;
            this.logger = new common_1.Logger(WebhookService.name);
            this.webhookSecretKey =
                this.configService.get('PAY2S_WEBHOOK_SECRET_KEY') || '';
            this.strictChecksum =
                this.configService.get('PAY2S_STRICT_CHECKSUM') === 'true';
        }
        WebhookService_1.prototype.verifyBearerToken = function (authorizationHeader) {
            if (!authorizationHeader || !this.webhookSecretKey) {
                return false;
            }
            var token = authorizationHeader.replace('Bearer ', '');
            if (!token) {
                return false;
            }
            return this.safeCompare(token, this.webhookSecretKey);
        };
        WebhookService_1.prototype.processDepositWebhook = function (transactions) {
            return __awaiter(this, void 0, void 0, function () {
                var results, processed, failed, _i, transactions_1, transaction, result, wallet, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            results = [];
                            processed = 0;
                            failed = 0;
                            _i = 0, transactions_1 = transactions;
                            _a.label = 1;
                        case 1:
                            if (!(_i < transactions_1.length)) return [3 /*break*/, 8];
                            transaction = transactions_1[_i];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 6, , 7]);
                            if (!this.verifyTransactionChecksum(transaction)) {
                                if (this.strictChecksum) {
                                    throw new common_1.BadRequestException("Invalid checksum for transaction ".concat(transaction.id));
                                }
                                this.logger.warn("Checksum mismatch for transaction ".concat(transaction.id, "; continue processing because PAY2S_STRICT_CHECKSUM=false"));
                            }
                            if (transaction.transferType !== 'IN') {
                                this.logger.log("Skipping OUT transaction ".concat(transaction.id));
                                results.push({
                                    transactionId: transaction.id,
                                    status: 'success',
                                    message: 'Skipped OUT transaction',
                                });
                                processed++;
                                return [3 /*break*/, 7];
                            }
                            return [4 /*yield*/, this.processDepositTransaction(transaction)];
                        case 3:
                            result = _a.sent();
                            if (!result) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.walletRepository.findById(result.wallet_id)];
                        case 4:
                            wallet = _a.sent();
                            if (wallet) {
                                this.notificationGateway.emitWalletBalanceUpdated({
                                    user_id: result.user_id,
                                    wallet_id: result.wallet_id,
                                    transaction_id: result.transaction_id,
                                    reference_code: result.reference_code,
                                    amount: result.amount,
                                    balance: Number(wallet.balance),
                                    deposit_balance: Number(wallet.deposit_balance),
                                    sale_balance: Number(wallet.sale_balance),
                                    locked_balance: Number(wallet.locked_balance),
                                    status: 'success',
                                    timestamp: new Date().toISOString(),
                                });
                            }
                            _a.label = 5;
                        case 5:
                            results.push({
                                transactionId: transaction.id,
                                status: 'success',
                                message: 'Deposit processed successfully',
                            });
                            processed++;
                            return [3 /*break*/, 7];
                        case 6:
                            error_1 = _a.sent();
                            this.logger.error("Error processing transaction ".concat(transaction.id, ":"), error_1);
                            results.push({
                                transactionId: transaction.id,
                                status: 'failed',
                                message: error_1 instanceof Error ? error_1.message : 'Unknown error',
                            });
                            failed++;
                            return [3 /*break*/, 7];
                        case 7:
                            _i++;
                            return [3 /*break*/, 1];
                        case 8: return [2 /*return*/, { processed: processed, failed: failed, results: results }];
                    }
                });
            });
        };
        WebhookService_1.prototype.verifyTransactionChecksum = function (transaction) {
            var _this = this;
            var checksum = String(transaction.checksum || '')
                .trim()
                .toLowerCase();
            if (!checksum || !/^[a-f0-9]{32,64}$/i.test(checksum)) {
                return false;
            }
            if (!this.webhookSecretKey) {
                return false;
            }
            var fingerprint = [
                transaction.id,
                transaction.gateway,
                transaction.transactionDate,
                transaction.transactionNumber,
                transaction.accountNumber,
                transaction.content,
                String(transaction.transferAmount),
                transaction.transferType,
            ].join('|') + "|".concat(this.webhookSecretKey);
            // Accept common checksum variants to stay compatible with gateway formats.
            var candidates = [
                (0, crypto_1.createHash)('md5').update(fingerprint).digest('hex'),
                (0, crypto_1.createHash)('sha256').update(fingerprint).digest('hex'),
                (0, crypto_1.createHmac)('md5', this.webhookSecretKey)
                    .update(fingerprint)
                    .digest('hex'),
                (0, crypto_1.createHmac)('sha256', this.webhookSecretKey)
                    .update(fingerprint)
                    .digest('hex'),
            ];
            return candidates.some(function (candidate) {
                return _this.safeCompare(candidate, checksum);
            });
        };
        WebhookService_1.prototype.safeCompare = function (a, b) {
            var left = Buffer.from(a);
            var right = Buffer.from(b);
            if (left.length !== right.length) {
                return false;
            }
            return (0, crypto_1.timingSafeEqual)(left, right);
        };
        WebhookService_1.prototype.processDepositTransaction = function (transaction) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                var match, referenceCode, pendingTransaction, expectedAmount, receivedAmount, wallet, transferAmount;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            match = transaction.content.match(/\bNH[A-Z0-9]{4}[0-9]{5}\b/);
                                            if (!match) {
                                                throw new common_1.BadRequestException("Transaction referenceCode ".concat(transaction.content, " not found"));
                                            }
                                            referenceCode = match[0];
                                            return [4 /*yield*/, this.walletTransactionRepository.findByReferenceCode(referenceCode, 30)];
                                        case 1:
                                            pendingTransaction = _a.sent();
                                            if (!pendingTransaction) {
                                                throw new common_1.BadRequestException("Transaction ".concat(transaction.content, " not found"));
                                            }
                                            if (pendingTransaction.status !== 'pending') {
                                                throw new common_1.BadRequestException("Transaction ".concat(transaction.content, " is not in pending status"));
                                            }
                                            expectedAmount = Number(pendingTransaction.amount);
                                            receivedAmount = Number(transaction.transferAmount);
                                            if (expectedAmount !== receivedAmount) {
                                                throw new common_1.BadRequestException("Amount mismatch: expected ".concat(expectedAmount, ", got ").concat(receivedAmount));
                                            }
                                            // Update transaction status to success
                                            return [4 /*yield*/, this.walletTransactionRepository.updateStatus(pendingTransaction.id, 'success', new Date())];
                                        case 2:
                                            // Update transaction status to success
                                            _a.sent();
                                            return [4 /*yield*/, this.walletRepository.findById(pendingTransaction.wallet_id)];
                                        case 3:
                                            wallet = _a.sent();
                                            if (!wallet) return [3 /*break*/, 5];
                                            transferAmount = Number(transaction.transferAmount);
                                            return [4 /*yield*/, this.walletRepository.incrementBalance(trx, wallet.id, {
                                                    deposit_balance: transferAmount,
                                                })];
                                        case 4:
                                            _a.sent();
                                            this.logger.log("Updated wallet balance for transaction ".concat(pendingTransaction.id, ": +").concat(transferAmount, " VND"));
                                            _a.label = 5;
                                        case 5:
                                            this.logger.log("Successfully processed deposit for transaction ".concat(pendingTransaction.id));
                                            return [2 /*return*/, {
                                                    user_id: pendingTransaction.user_id,
                                                    wallet_id: pendingTransaction.wallet_id,
                                                    transaction_id: pendingTransaction.id,
                                                    reference_code: pendingTransaction.reference_code || referenceCode,
                                                    amount: Number(transaction.transferAmount),
                                                }];
                                    }
                                });
                            }); })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return WebhookService_1;
    }());
    __setFunctionName(_classThis, "WebhookService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WebhookService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WebhookService = _classThis;
}();
exports.WebhookService = WebhookService;
