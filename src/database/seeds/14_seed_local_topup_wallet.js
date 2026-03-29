"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
/**
 * Local/dev helper seed: ensure a test user has enough wallet balance for testing.
 *
 * Defaults:
 * - email: user@local.test
 * - amount: 10,000,000 VND
 *x
 * Safe to re-run: will upsert wallet balance to the amount.
 */
function seed(knex) {
    return __awaiter(this, void 0, void 0, function () {
        var env, email, amount, user, hasDepositBalance, hasSaleBalance, hasLockedBalance, existingWallet, now, walletData, walletId, insertedWallet, hasTransactionNumber, hasUserId, hasMethod, tx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    env = process.env.APP_ENV || process.env.NODE_ENV || 'development';
                    if (env === 'production')
                        return [2 /*return*/];
                    email = process.env.LOCAL_TEST_TOPUP_EMAIL || 'user@local.test';
                    amount = Number(process.env.LOCAL_TEST_TOPUP_AMOUNT || 10000000);
                    return [4 /*yield*/, knex('users')
                            .select('id')
                            .where('email', email)
                            .first()];
                case 1:
                    user = _a.sent();
                    if (!(user === null || user === void 0 ? void 0 : user.id)) {
                        console.log("Topup seed skipped: user not found for email=".concat(email));
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, knex.schema.hasColumn('wallets', 'deposit_balance')];
                case 2:
                    hasDepositBalance = _a.sent();
                    return [4 /*yield*/, knex.schema.hasColumn('wallets', 'sale_balance')];
                case 3:
                    hasSaleBalance = _a.sent();
                    return [4 /*yield*/, knex.schema.hasColumn('wallets', 'locked_balance')];
                case 4:
                    hasLockedBalance = _a.sent();
                    return [4 /*yield*/, knex('wallets')
                            .select('id', 'balance')
                            .where('user_id', user.id)
                            .first()];
                case 5:
                    existingWallet = _a.sent();
                    now = new Date();
                    walletData = {
                        user_id: user.id,
                        balance: amount,
                        currency: 'VND',
                        updated_at: now,
                    };
                    if (hasDepositBalance)
                        walletData.deposit_balance = amount;
                    if (hasSaleBalance)
                        walletData.sale_balance = 0;
                    if (hasLockedBalance)
                        walletData.locked_balance = 0;
                    walletId = existingWallet === null || existingWallet === void 0 ? void 0 : existingWallet.id;
                    if (!!walletId) return [3 /*break*/, 8];
                    walletData.created_at = now;
                    // Avoid relying on dialect-specific `returning()` typing; re-select after insert.
                    return [4 /*yield*/, knex('wallets').insert(walletData)];
                case 6:
                    // Avoid relying on dialect-specific `returning()` typing; re-select after insert.
                    _a.sent();
                    return [4 /*yield*/, knex('wallets')
                            .select('id')
                            .where('user_id', user.id)
                            .first()];
                case 7:
                    insertedWallet = _a.sent();
                    walletId = insertedWallet === null || insertedWallet === void 0 ? void 0 : insertedWallet.id;
                    return [3 /*break*/, 10];
                case 8: return [4 /*yield*/, knex('wallets').where('id', walletId).update(walletData)];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10:
                    if (!walletId) return [3 /*break*/, 15];
                    return [4 /*yield*/, knex.schema.hasColumn('wallet_transactions', 'transaction_number')];
                case 11:
                    hasTransactionNumber = _a.sent();
                    return [4 /*yield*/, knex.schema.hasColumn('wallet_transactions', 'user_id')];
                case 12:
                    hasUserId = _a.sent();
                    return [4 /*yield*/, knex.schema.hasColumn('wallet_transactions', 'method')];
                case 13:
                    hasMethod = _a.sent();
                    tx = {
                        wallet_id: walletId,
                        type: 'topup',
                        amount: amount,
                        status: 'success',
                        reference_code: "LOCAL_TOPUP_".concat(email, "_").concat(now.getTime()),
                        note: "Local seed topup for ".concat(email),
                        created_at: now,
                        completed_at: now,
                    };
                    if (hasTransactionNumber)
                        tx.transaction_number = "LT".concat(now.getTime()).slice(0, 20);
                    if (hasUserId)
                        tx.user_id = user.id;
                    if (hasMethod)
                        tx.method = 'seed';
                    return [4 /*yield*/, knex('wallet_transactions').insert(tx)];
                case 14:
                    _a.sent();
                    _a.label = 15;
                case 15:
                    console.log("Local topup done: ".concat(email, " -> ").concat(amount, " VND"));
                    return [2 /*return*/];
            }
        });
    });
}
