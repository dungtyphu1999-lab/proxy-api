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
exports.up = up;
exports.down = down;
function up(knex) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, knex.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: 
                                // Update from_wallet_id, to_wallet_id from system_wallet_transactions
                                return [4 /*yield*/, trx.raw("\n      UPDATE system_wallet_transactions swt\n      SET from_wallet_id = sub.wallet_id\n      FROM (\n        SELECT swt.id, w.id AS wallet_id\n        FROM system_wallet_transactions swt\n        JOIN system_wallets sw ON sw.id = swt.system_wallet_id\n        JOIN orders o ON o.id = sw.reference_id\n        JOIN wallets w ON w.user_id = o.buyer_id\n        WHERE swt.transaction_type IN ('deposit','release')\n      ) AS sub\n      WHERE swt.id = sub.id\n    ")];
                                case 1:
                                    // Update from_wallet_id, to_wallet_id from system_wallet_transactions
                                    _a.sent();
                                    return [4 /*yield*/, trx.raw("\n      UPDATE system_wallet_transactions swt\n      SET to_wallet_id = sub.wallet_id\n      FROM (\n        SELECT swt.id, w.id AS wallet_id\n        FROM system_wallet_transactions swt\n        JOIN system_wallets sw ON sw.id = swt.system_wallet_id\n        JOIN orders o ON o.id = sw.reference_id\n        JOIN shops s ON s.id = o.shop_id\n        JOIN wallets w ON w.user_id = s.owner_id\n        WHERE swt.transaction_type IN ('release')\n      ) AS sub\n      WHERE swt.id = sub.id\n    ")];
                                case 2:
                                    _a.sent();
                                    // Update wallet deposit_balance and sale_balance
                                    return [4 /*yield*/, knex.raw("\n      UPDATE wallets w\n      SET\n        sale_balance = COALESCE(s.total, 0),\n        deposit_balance = w.balance - COALESCE(s.total, 0)\n      FROM (\n        SELECT to_wallet_id, SUM(amount) AS total\n        FROM system_wallet_transactions\n        WHERE transaction_type = 'release' AND to_wallet_id IS NOT NULL\n        GROUP BY to_wallet_id\n      ) AS s\n      WHERE w.id = s.to_wallet_id\n    ")];
                                case 3:
                                    // Update wallet deposit_balance and sale_balance
                                    _a.sent();
                                    return [4 /*yield*/, knex.raw("\n      UPDATE wallets w\n      SET deposit_balance = balance\n      WHERE sale_balance = 0\n    ")];
                                case 4:
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
}
function down() {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/];
    }); });
}
