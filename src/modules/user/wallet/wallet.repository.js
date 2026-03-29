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
exports.WalletRepository = void 0;
var common_1 = require("@nestjs/common");
var base_repository_1 = require("@/database/repositories/base.repository");
var error_codes_enum_1 = require("@/shared/constants/error-codes.enum");
var WalletRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_repository_1.BaseRepository;
    var WalletRepository = _classThis = /** @class */ (function (_super) {
        __extends(WalletRepository_1, _super);
        function WalletRepository_1(databaseService) {
            var _this = _super.call(this, 'wallets') || this;
            _this.databaseService = databaseService;
            return _this;
        }
        WalletRepository_1.prototype.findByUserId = function (userId, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var qb, wallet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            qb = trx ? trx('wallets') : this.qb;
                            return [4 /*yield*/, qb.where('user_id', userId).first()];
                        case 1:
                            wallet = _a.sent();
                            return [2 /*return*/, wallet || null];
                    }
                });
            });
        };
        WalletRepository_1.prototype.findById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var wallet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb.where('id', id).first()];
                        case 1:
                            wallet = _a.sent();
                            return [2 /*return*/, wallet || null];
                    }
                });
            });
        };
        WalletRepository_1.prototype.createWallet = function (userId, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var createdWallet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, (trx ? trx('wallets') : this.qb)
                                .insert({
                                user_id: userId,
                                balance: 0,
                                currency: 'VND',
                                is_locked: false,
                            })
                                .returning('*')];
                        case 1:
                            createdWallet = (_a.sent())[0];
                            return [2 /*return*/, createdWallet];
                    }
                });
            });
        };
        WalletRepository_1.prototype.updateBalance = function (walletId, newBalance, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var qb;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            qb = trx ? trx('wallets') : this.qb;
                            return [4 /*yield*/, qb.where('id', walletId).update({
                                    balance: newBalance,
                                    updated_at: new Date(),
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        WalletRepository_1.prototype.deductBalance = function (trx_1, walletId_1, amount_1) {
            return __awaiter(this, arguments, void 0, function (trx, walletId, amount, isWithdraw) {
                var qb, wallet, remaining, newDepositBalance, newSaleBalance, newLockedBalance;
                if (isWithdraw === void 0) { isWithdraw = false; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            qb = trx ? trx('wallets') : this.qb;
                            return [4 /*yield*/, qb.where('id', walletId).forUpdate().first()];
                        case 1:
                            wallet = _a.sent();
                            if (!wallet) {
                                throw new common_1.NotFoundException(error_codes_enum_1.ErrorCode.WALLET_NOT_FOUND);
                            }
                            remaining = amount;
                            newDepositBalance = Number(wallet.deposit_balance);
                            newSaleBalance = Number(wallet.sale_balance);
                            newLockedBalance = Number(wallet.locked_balance);
                            if (!isWithdraw) return [3 /*break*/, 3];
                            // Chỉ trừ ở sale_balance. balance và locked_balance không liên quan.
                            // Validate: sale_balance không được âm sau khi trừ
                            if (newSaleBalance < amount) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.WALLET_INSUFFICIENT_BALANCE);
                            }
                            newSaleBalance -= amount;
                            return [4 /*yield*/, qb.where('id', walletId).update({
                                    sale_balance: newSaleBalance,
                                    updated_at: new Date(),
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                        case 3:
                            // Deduct from deposit_balance first (non-withdraw path)
                            if (newDepositBalance >= remaining) {
                                newDepositBalance -= remaining;
                                remaining = 0;
                            }
                            else {
                                remaining -= newDepositBalance;
                                newDepositBalance = 0;
                                // Deduct the rest from sale_balance
                                if (newSaleBalance - Number(wallet.locked_balance) >= remaining) {
                                    newSaleBalance -= remaining;
                                    remaining = 0;
                                }
                                else {
                                    throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.WALLET_INSUFFICIENT_BALANCE);
                                }
                            }
                            // Validate sale_balance không được âm (non-withdraw path)
                            if (newSaleBalance < 0) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.WALLET_INSUFFICIENT_BALANCE);
                            }
                            return [4 /*yield*/, qb.where('id', walletId).update({
                                    deposit_balance: newDepositBalance,
                                    sale_balance: newSaleBalance,
                                    locked_balance: newLockedBalance,
                                    balance: Number(wallet.balance) - amount,
                                    updated_at: new Date(),
                                })];
                        case 4:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        WalletRepository_1.prototype.incrementBalance = function (trx, walletId, balanceData) {
            return __awaiter(this, void 0, void 0, function () {
                var qb, wallet, newData, balanceIncrement;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            qb = trx ? trx('wallets') : this.qb;
                            return [4 /*yield*/, qb.where('id', walletId).forUpdate().first()];
                        case 1:
                            wallet = _a.sent();
                            if (!wallet) {
                                throw new common_1.NotFoundException(error_codes_enum_1.ErrorCode.WALLET_NOT_FOUND);
                            }
                            newData = {};
                            balanceIncrement = 0;
                            if (balanceData.deposit_balance) {
                                newData.deposit_balance =
                                    Number(wallet.deposit_balance) + balanceData.deposit_balance;
                                balanceIncrement += balanceData.deposit_balance;
                            }
                            if (balanceData.sale_balance) {
                                newData.sale_balance =
                                    Number(wallet.sale_balance) + balanceData.sale_balance;
                                balanceIncrement += balanceData.sale_balance;
                            }
                            if (balanceData.locked_balance) {
                                newData.locked_balance =
                                    Number(wallet.locked_balance) + balanceData.locked_balance;
                                balanceIncrement += balanceData.locked_balance;
                            }
                            if (balanceIncrement > 0) {
                                newData.balance = Number(wallet.balance) + balanceIncrement;
                            }
                            return [4 /*yield*/, qb.where('id', walletId).update(__assign(__assign({}, newData), { updated_at: new Date() }))];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        WalletRepository_1.prototype.updateLockedBalance = function (walletId, newLockedBalance, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var qb;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            qb = trx ? trx('wallets') : this.qb;
                            return [4 /*yield*/, qb.where('id', walletId).update({
                                    locked_balance: newLockedBalance < 0 ? 0 : newLockedBalance,
                                    updated_at: new Date(),
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        WalletRepository_1.prototype.lockWallet = function (walletId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb.where('id', walletId).update({
                                is_locked: true,
                                updated_at: new Date(),
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        WalletRepository_1.prototype.unlockWallet = function (walletId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb.where('id', walletId).update({
                                is_locked: false,
                                updated_at: new Date(),
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        return WalletRepository_1;
    }(_classSuper));
    __setFunctionName(_classThis, "WalletRepository");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WalletRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WalletRepository = _classThis;
}();
exports.WalletRepository = WalletRepository;
