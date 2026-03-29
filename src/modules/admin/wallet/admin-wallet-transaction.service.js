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
exports.AdminWalletTransactionService = void 0;
var common_1 = require("@nestjs/common");
var notification_hashing_util_1 = require("@/shared/utils/notification-hashing.util");
var notification_templates_1 = require("@/shared/constants/notification-templates");
var error_codes_enum_1 = require("@/shared/constants/error-codes.enum");
var AdminWalletTransactionService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminWalletTransactionService = _classThis = /** @class */ (function () {
        function AdminWalletTransactionService_1(databaseService, fileUploadService, walletRepository, adminWalletTransactionRepository, notificationGateway, notificationService, walletSettingsService) {
            this.databaseService = databaseService;
            this.fileUploadService = fileUploadService;
            this.walletRepository = walletRepository;
            this.adminWalletTransactionRepository = adminWalletTransactionRepository;
            this.notificationGateway = notificationGateway;
            this.notificationService = notificationService;
            this.walletSettingsService = walletSettingsService;
            this.logger = new common_1.Logger(AdminWalletTransactionService.name);
        }
        AdminWalletTransactionService_1.prototype.getWithdrawalsWithPagination = function () {
            return __awaiter(this, arguments, void 0, function (options) {
                var result, walletSettings, moneyHoldingDays, records;
                if (options === void 0) { options = {}; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.adminWalletTransactionRepository.getWithdrawalsWithPagination(__assign({}, options))];
                        case 1:
                            result = _a.sent();
                            return [4 /*yield*/, this.walletSettingsService.getSettings()];
                        case 2:
                            walletSettings = _a.sent();
                            moneyHoldingDays = (walletSettings === null || walletSettings === void 0 ? void 0 : walletSettings.money_holding_days) || 7;
                            records = result.records.map(function (transaction) { return ({
                                transaction_id: transaction.id,
                                transaction_number: transaction.transaction_number,
                                user_id: transaction.user_id,
                                user: {
                                    id: transaction.user_id,
                                    username: transaction.user_username || '',
                                    email: transaction.user_email || '',
                                },
                                amount: transaction.amount,
                                fee_amount: transaction.fee_amount,
                                bank_info: transaction.bank_info || {
                                    bank_code: '',
                                    bank_name: '',
                                    account_number: '',
                                    account_name: '',
                                },
                                typeTransaction: transaction.type,
                                status: transaction.status,
                                note: transaction.note,
                                transfer_proof_path: transaction.transfer_proof_path,
                                created_at: transaction.created_at,
                                completed_at: transaction.completed_at,
                            }); });
                            return [2 /*return*/, {
                                    records: records,
                                    meta: result.meta,
                                    money_holding_days: moneyHoldingDays,
                                }];
                    }
                });
            });
        };
        AdminWalletTransactionService_1.prototype.approveWithdraw = function (transactionId, file, adminUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var updateData, uploadResult, error_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.fileUploadService.uploadImage(file, 'transfer_proof')];
                        case 1:
                            uploadResult = _a.sent();
                            updateData = {
                                status: 'success',
                                transfer_proof_path: "/".concat(uploadResult.url.replace(/\\/g, '/')),
                                completed_at: new Date(),
                            };
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            this.logger.error('Failed to upload image:', error_1);
                            throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.FAILED_TO_UPLOAD_IMAGE);
                        case 3: return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                var transaction, notificationTemplate, notificationResult, notificationHash, error_2, error_3;
                                var _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _c.trys.push([0, 8, , 9]);
                                            return [4 /*yield*/, this.adminWalletTransactionRepository.findById(transactionId)];
                                        case 1:
                                            transaction = _c.sent();
                                            if (!transaction) {
                                                throw new common_1.NotFoundException(error_codes_enum_1.ErrorCode.WALLET_TRANSACTION_NOT_FOUND);
                                            }
                                            if (transaction.status !== 'pending') {
                                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.WALLET_TRANSACTION_NOT_PENDING);
                                            }
                                            // Update transaction status
                                            return [4 /*yield*/, this.adminWalletTransactionRepository.update(transactionId, updateData, trx)];
                                        case 2:
                                            // Update transaction status
                                            _c.sent();
                                            // Update wallet balance
                                            return [4 /*yield*/, this.walletRepository.deductBalance(trx, transaction.wallet_id, Number(transaction.amount), true)];
                                        case 3:
                                            // Update wallet balance
                                            _c.sent();
                                            this.logger.log("Withdraw completed successfully: ".concat(transactionId));
                                            _c.label = 4;
                                        case 4:
                                            _c.trys.push([4, 6, , 7]);
                                            notificationTemplate = notification_templates_1.WALLET_NOTIFICATION_TEMPLATES.STATUS_CHANGED({
                                                amount: transaction.amount,
                                                status: 'success',
                                                bankName: (_a = transaction.bank_info) === null || _a === void 0 ? void 0 : _a.bank_name,
                                                bankNumber: (_b = transaction.bank_info) === null || _b === void 0 ? void 0 : _b.account_number,
                                            });
                                            return [4 /*yield*/, this.notificationService.createNotification({
                                                    type: 'wallet',
                                                    title: notificationTemplate.title,
                                                    message: notificationTemplate.message,
                                                    link_url: "/wallet/history",
                                                    is_global: false,
                                                    target_audience: 'user',
                                                    user_ids: [transaction.user_id],
                                                }, adminUserId)];
                                        case 5:
                                            notificationResult = _c.sent();
                                            notificationHash = (0, notification_hashing_util_1.createNotificationHash)(notificationResult.id, notificationResult.type, notificationResult.title, notificationResult.message);
                                            // Emit notification to user about withdraw approval
                                            this.notificationGateway.emitWithdrawStatusChanged({
                                                transaction_id: transaction.id,
                                                transaction_number: transaction.transaction_number,
                                                user_id: transaction.user_id,
                                                old_status: 'pending',
                                                new_status: 'success',
                                                amount: transaction.amount,
                                                bank_info: transaction.bank_info,
                                                note: 'Yêu cầu rút tiền đã được duyệt',
                                                admin_user_id: adminUserId,
                                                updated_at: new Date().toISOString(),
                                                hash: notificationHash,
                                                link_url: "/wallet/history",
                                                notification_title: notificationTemplate.title,
                                                notification_message: notificationTemplate.message,
                                                notification_id: notificationResult.id,
                                                notification_created_at: notificationResult.created_at.toISOString(),
                                            });
                                            return [3 /*break*/, 7];
                                        case 6:
                                            error_2 = _c.sent();
                                            // Log error but don't fail the approval
                                            this.logger.error('Failed to create or emit withdraw approval notification:', error_2 instanceof Error ? error_2.message : String(error_2));
                                            return [3 /*break*/, 7];
                                        case 7: return [3 /*break*/, 9];
                                        case 8:
                                            error_3 = _c.sent();
                                            if (error_3 instanceof common_1.NotFoundException ||
                                                error_3 instanceof common_1.BadRequestException) {
                                                throw error_3;
                                            }
                                            this.logger.error('Failed to approve withdraw:', error_3);
                                            throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.WALLET_WITHDRAW_APPROVE_FAILED);
                                        case 9: return [2 /*return*/];
                                    }
                                });
                            }); })];
                        case 4: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AdminWalletTransactionService_1.prototype.rejectWithdraw = function (transactionId, note, adminUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                var transaction, wallet, transactionAmount, currentLockedBalance, newLockedBalance, notificationTemplate, notificationResult, notificationHash, error_4;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.adminWalletTransactionRepository.findById(transactionId)];
                                        case 1:
                                            transaction = _a.sent();
                                            if (!transaction) {
                                                throw new common_1.NotFoundException(error_codes_enum_1.ErrorCode.WALLET_TRANSACTION_NOT_FOUND);
                                            }
                                            if (transaction.status !== 'pending') {
                                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.WALLET_TRANSACTION_NOT_PENDING);
                                            }
                                            // Update transaction status and note
                                            return [4 /*yield*/, this.adminWalletTransactionRepository.updateStatus(transactionId, 'failed', new Date(), note)];
                                        case 2:
                                            // Update transaction status and note
                                            _a.sent();
                                            return [4 /*yield*/, this.walletRepository.findByUserId(transaction.user_id)];
                                        case 3:
                                            wallet = _a.sent();
                                            if (!wallet) return [3 /*break*/, 5];
                                            transactionAmount = Number(transaction.amount) || 0;
                                            currentLockedBalance = Number(wallet.locked_balance) || 0;
                                            newLockedBalance = currentLockedBalance - transactionAmount;
                                            return [4 /*yield*/, this.walletRepository.updateLockedBalance(wallet.id, newLockedBalance, trx)];
                                        case 4:
                                            _a.sent();
                                            _a.label = 5;
                                        case 5:
                                            if (!adminUserId) return [3 /*break*/, 9];
                                            _a.label = 6;
                                        case 6:
                                            _a.trys.push([6, 8, , 9]);
                                            notificationTemplate = notification_templates_1.WALLET_NOTIFICATION_TEMPLATES.STATUS_CHANGED({
                                                amount: transaction.amount,
                                                status: 'failed',
                                                reason: note,
                                            });
                                            return [4 /*yield*/, this.notificationService.createNotification({
                                                    type: 'wallet',
                                                    title: notificationTemplate.title,
                                                    message: notificationTemplate.message,
                                                    link_url: notificationTemplate.link_url,
                                                    is_global: false,
                                                    target_audience: 'user',
                                                    user_ids: [transaction.user_id],
                                                }, adminUserId)];
                                        case 7:
                                            notificationResult = _a.sent();
                                            notificationHash = (0, notification_hashing_util_1.createNotificationHash)(notificationResult.id, notificationResult.type, notificationResult.title, notificationResult.message);
                                            // Emit notification to user about withdraw rejection
                                            this.notificationGateway.emitWithdrawStatusChanged({
                                                transaction_id: transaction.id,
                                                transaction_number: transaction.transaction_number,
                                                user_id: transaction.user_id,
                                                old_status: 'pending',
                                                new_status: 'failed',
                                                amount: transaction.amount,
                                                bank_info: transaction.bank_info,
                                                note: note || 'Yêu cầu rút tiền đã bị từ chối',
                                                admin_user_id: adminUserId,
                                                updated_at: new Date().toISOString(),
                                                hash: notificationHash,
                                                link_url: notificationTemplate.link_url,
                                                notification_title: notificationTemplate.title,
                                                notification_message: notificationTemplate.message,
                                                notification_id: notificationResult.id,
                                                notification_created_at: notificationResult.created_at.toISOString(),
                                            });
                                            return [3 /*break*/, 9];
                                        case 8:
                                            error_4 = _a.sent();
                                            // Log error but don't fail the rejection
                                            this.logger.error('Failed to create or emit withdraw rejection notification:', error_4 instanceof Error ? error_4.message : String(error_4));
                                            return [3 /*break*/, 9];
                                        case 9: return [2 /*return*/];
                                    }
                                });
                            }); })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return AdminWalletTransactionService_1;
    }());
    __setFunctionName(_classThis, "AdminWalletTransactionService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminWalletTransactionService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminWalletTransactionService = _classThis;
}();
exports.AdminWalletTransactionService = AdminWalletTransactionService;
