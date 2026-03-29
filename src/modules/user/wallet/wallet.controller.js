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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
exports.WalletController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var deposit_response_dto_1 = require("./dto/deposit-response.dto");
var withdraw_response_dto_1 = require("./dto/withdraw-response.dto");
var transaction_history_dto_1 = require("./dto/transaction-history.dto");
var transaction_status_response_dto_1 = require("./dto/transaction-status-response.dto");
var use_jwt_auth_guard_decorator_1 = require("../auth/decorators/use-jwt-auth-guard.decorator");
var common_2 = require("@nestjs/common");
var wallet_balance_response_dto_1 = require("./dto/wallet-balance-response.dto");
var WalletController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('[User] Wallet'), (0, common_1.Controller)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createDeposit_decorators;
    var _createWithdraw_decorators;
    var _handleDepositWebhook_decorators;
    var _getTransactionStatus_decorators;
    var _getWalletBalance_decorators;
    var _getTransactionHistory_decorators;
    var WalletController = _classThis = /** @class */ (function () {
        function WalletController_1(walletService, webhookService) {
            this.walletService = (__runInitializers(this, _instanceExtraInitializers), walletService);
            this.webhookService = webhookService;
            this.logger = new common_2.Logger(WalletController.name);
        }
        WalletController_1.prototype.createDeposit = function (req, createDepositDto) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.sub;
                            return [4 /*yield*/, this.walletService.createDeposit(userId, createDepositDto)];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        WalletController_1.prototype.createWithdraw = function (req, createWithdrawDto) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.sub;
                            return [4 /*yield*/, this.walletService.createWithdraw(userId, createWithdrawDto)];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        WalletController_1.prototype.handleDepositWebhook = function (webhookData, req) {
            return __awaiter(this, void 0, void 0, function () {
                var authorizationHeader, result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            authorizationHeader = req.headers.authorization || '';
                            if (!this.webhookService.verifyBearerToken(authorizationHeader)) {
                                throw new common_1.UnauthorizedException('Invalid webhook secret key');
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.webhookService.processDepositWebhook(webhookData.transactions)];
                        case 2:
                            result = _a.sent();
                            this.logger.log("Webhook processed: ".concat(result.processed, " successful, ").concat(result.failed, " failed"));
                            return [2 /*return*/, result.failed === 0];
                        case 3:
                            error_1 = _a.sent();
                            this.logger.error('Webhook processing error:', error_1);
                            return [2 /*return*/, false];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        WalletController_1.prototype.getTransactionStatus = function (transactionId, req) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.sub;
                            if (!userId) {
                                throw new common_1.UnauthorizedException('User not authenticated');
                            }
                            return [4 /*yield*/, this.walletService.checkTransactionStatus(userId, transactionId)];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        WalletController_1.prototype.getWalletBalance = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, wallet;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.sub;
                            if (!userId) {
                                throw new common_1.UnauthorizedException('User not authenticated');
                            }
                            return [4 /*yield*/, this.walletService.getOrCreateWallet(userId)];
                        case 1:
                            wallet = _b.sent();
                            return [2 /*return*/, {
                                    balance: wallet.balance,
                                    deposit_balance: wallet.deposit_balance,
                                    sale_balance: wallet.sale_balance,
                                    locked_balance: wallet.locked_balance,
                                    currency: wallet.currency,
                                    is_locked: wallet.is_locked,
                                }];
                    }
                });
            });
        };
        WalletController_1.prototype.getTransactionHistory = function (req, query) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, paginationOptions;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.sub;
                            if (!userId) {
                                throw new common_1.UnauthorizedException('User not authenticated');
                            }
                            paginationOptions = __assign(__assign({}, query.paginationOptions), { searchFields: query.searchFieldsArray.length > 0
                                    ? query.searchFieldsArray
                                    : ['transaction_number', 'note', 'method', 'type', 'status'], type: query.type, status: query.status, start_date: query.start_date, end_date: query.end_date });
                            return [4 /*yield*/, this.walletService.getTransactionHistory(userId, paginationOptions)];
                        case 1: return [2 /*return*/, _b.sent()];
                    }
                });
            });
        };
        return WalletController_1;
    }());
    __setFunctionName(_classThis, "WalletController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createDeposit_decorators = [(0, common_1.Post)('deposit'), (0, use_jwt_auth_guard_decorator_1.UseJwtAuthGuard)(), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Create deposit request' }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.CREATED,
                description: 'Deposit request created successfully',
                type: deposit_response_dto_1.DepositResponseDto,
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Bad request' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })];
        _createWithdraw_decorators = [(0, common_1.Post)('withdraw'), (0, use_jwt_auth_guard_decorator_1.UseJwtAuthGuard)(), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Create withdraw request' }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.CREATED,
                description: 'Withdraw request created successfully',
                type: withdraw_response_dto_1.WithdrawResponseDto,
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.BAD_REQUEST, description: 'Bad request' }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })];
        _handleDepositWebhook_decorators = [(0, common_1.Post)('deposit/webhook'), (0, swagger_1.ApiOperation)({ summary: 'Handle Pay2S webhook callback' }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Webhook processed successfully',
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.UNAUTHORIZED,
                description: 'Unauthorized',
            }), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getTransactionStatus_decorators = [(0, common_1.Get)('transaction/:transactionId/status'), (0, use_jwt_auth_guard_decorator_1.UseJwtAuthGuard)(), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Get transaction status by ID' }), (0, swagger_1.ApiParam)({ name: 'transactionId', type: String }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Transaction status retrieved successfully',
                type: transaction_status_response_dto_1.TransactionStatusResponseDto,
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.NOT_FOUND,
                description: 'Transaction not found',
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })];
        _getWalletBalance_decorators = [(0, common_1.Get)('balance'), (0, use_jwt_auth_guard_decorator_1.UseJwtAuthGuard)(), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Get wallet balance' }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Wallet balance retrieved successfully',
                type: wallet_balance_response_dto_1.WalletBalanceResponseDto,
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })];
        _getTransactionHistory_decorators = [(0, common_1.Get)('transactions'), (0, use_jwt_auth_guard_decorator_1.UseJwtAuthGuard)(), (0, swagger_1.ApiBearerAuth)(), (0, swagger_1.ApiOperation)({ summary: 'Get transaction history' }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Transaction history retrieved successfully',
                type: [transaction_history_dto_1.TransactionHistoryDto],
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })];
        __esDecorate(_classThis, null, _createDeposit_decorators, { kind: "method", name: "createDeposit", static: false, private: false, access: { has: function (obj) { return "createDeposit" in obj; }, get: function (obj) { return obj.createDeposit; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _createWithdraw_decorators, { kind: "method", name: "createWithdraw", static: false, private: false, access: { has: function (obj) { return "createWithdraw" in obj; }, get: function (obj) { return obj.createWithdraw; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleDepositWebhook_decorators, { kind: "method", name: "handleDepositWebhook", static: false, private: false, access: { has: function (obj) { return "handleDepositWebhook" in obj; }, get: function (obj) { return obj.handleDepositWebhook; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getTransactionStatus_decorators, { kind: "method", name: "getTransactionStatus", static: false, private: false, access: { has: function (obj) { return "getTransactionStatus" in obj; }, get: function (obj) { return obj.getTransactionStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getWalletBalance_decorators, { kind: "method", name: "getWalletBalance", static: false, private: false, access: { has: function (obj) { return "getWalletBalance" in obj; }, get: function (obj) { return obj.getWalletBalance; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getTransactionHistory_decorators, { kind: "method", name: "getTransactionHistory", static: false, private: false, access: { has: function (obj) { return "getTransactionHistory" in obj; }, get: function (obj) { return obj.getTransactionHistory; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WalletController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WalletController = _classThis;
}();
exports.WalletController = WalletController;
