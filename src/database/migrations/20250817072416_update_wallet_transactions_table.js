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
        var transactions, _i, transactions_1, transaction, noteParts, bankInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Add new bank_info column with JSON type
                return [4 /*yield*/, knex.schema.alterTable('wallet_transactions', function (table) {
                        table.json('bank_info').after('reference_code');
                    })];
                case 1:
                    // Add new bank_info column with JSON type
                    _a.sent();
                    return [4 /*yield*/, knex('wallet_transactions')
                            .whereNotNull('note')
                            .select('id', 'note')];
                case 2:
                    transactions = (_a.sent());
                    _i = 0, transactions_1 = transactions;
                    _a.label = 3;
                case 3:
                    if (!(_i < transactions_1.length)) return [3 /*break*/, 6];
                    transaction = transactions_1[_i];
                    if (!transaction.note) return [3 /*break*/, 5];
                    noteParts = transaction.note.split('|');
                    bankInfo = {
                        bank_name: noteParts[0] || '',
                        account_number: noteParts[1] || '',
                        account_name: noteParts[2] || '',
                        note: noteParts[3] || '',
                    };
                    return [4 /*yield*/, knex('wallet_transactions')
                            .where('id', transaction.id)
                            .update({ bank_info: JSON.stringify(bankInfo) })];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: 
                // Drop the old note column
                return [4 /*yield*/, knex.schema.alterTable('wallet_transactions', function (table) {
                        table.dropColumn('note');
                    })];
                case 7:
                    // Drop the old note column
                    _a.sent();
                    // Add new note column
                    return [4 /*yield*/, knex.schema.alterTable('wallet_transactions', function (table) {
                            table.text('note');
                        })];
                case 8:
                    // Add new note column
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function () {
        var transactions, _i, transactions_2, transaction, bankInfo, note;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Drop the new note column
                return [4 /*yield*/, knex.schema.alterTable('wallet_transactions', function (table) {
                        table.dropColumn('note');
                    })];
                case 1:
                    // Drop the new note column
                    _a.sent();
                    // Add back the old note column
                    return [4 /*yield*/, knex.schema.alterTable('wallet_transactions', function (table) {
                            table.text('note');
                        })];
                case 2:
                    // Add back the old note column
                    _a.sent();
                    return [4 /*yield*/, knex('wallet_transactions')
                            .whereNotNull('bank_info')
                            .select('id', 'bank_info')];
                case 3:
                    transactions = (_a.sent());
                    _i = 0, transactions_2 = transactions;
                    _a.label = 4;
                case 4:
                    if (!(_i < transactions_2.length)) return [3 /*break*/, 7];
                    transaction = transactions_2[_i];
                    if (!transaction.bank_info) return [3 /*break*/, 6];
                    bankInfo = typeof transaction.bank_info === 'string'
                        ? JSON.parse(transaction.bank_info)
                        : transaction.bank_info;
                    note = "".concat(bankInfo.bank_name, "|").concat(bankInfo.account_number, "|").concat(bankInfo.account_name, "|").concat(bankInfo.note || '');
                    return [4 /*yield*/, knex('wallet_transactions')
                            .where('id', transaction.id)
                            .update({ note: note })];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 4];
                case 7: 
                // Drop the bank_info column
                return [4 /*yield*/, knex.schema.alterTable('wallet_transactions', function (table) {
                        table.dropColumn('bank_info');
                    })];
                case 8:
                    // Drop the bank_info column
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
