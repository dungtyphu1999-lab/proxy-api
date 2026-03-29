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
var axios_1 = require("@nestjs/axios");
var rxjs_1 = require("rxjs");
function up(knex) {
    return __awaiter(this, void 0, void 0, function () {
        var httpService, apiBankList, response, bankList, bankMapping_1, transactions, _i, _a, transaction, oldBankInfo, bankKey, bankData, newBankInfo, error_1, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 11, , 12]);
                    httpService = new axios_1.HttpService();
                    apiBankList = process.env.EKYC_API_BANK_LIST || 'https://api.ekyc.vn/banks';
                    return [4 /*yield*/, (0, rxjs_1.firstValueFrom)(httpService.get(apiBankList, {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }))];
                case 1:
                    response = _b.sent();
                    bankList = response.data.data;
                    bankMapping_1 = new Map();
                    bankList.forEach(function (bank) {
                        bankMapping_1.set(bank.code.toUpperCase(), {
                            code: bank.code,
                            name: bank.short_name,
                        });
                    });
                    return [4 /*yield*/, knex('wallet_transactions')
                            .select('id', 'bank_info')
                            .whereNotNull('bank_info')];
                case 2:
                    transactions = _b.sent();
                    _i = 0, _a = transactions;
                    _b.label = 3;
                case 3:
                    if (!(_i < _a.length)) return [3 /*break*/, 10];
                    transaction = _a[_i];
                    _b.label = 4;
                case 4:
                    _b.trys.push([4, 8, , 9]);
                    oldBankInfo = void 0;
                    if (typeof transaction.bank_info === 'string') {
                        oldBankInfo = JSON.parse(transaction.bank_info);
                    }
                    else {
                        // If it's already an object, use it directly
                        oldBankInfo = transaction.bank_info;
                    }
                    if (!oldBankInfo.bank_name) return [3 /*break*/, 7];
                    bankKey = oldBankInfo.bank_name.toUpperCase();
                    bankData = bankMapping_1.get(bankKey);
                    if (!bankData) return [3 /*break*/, 6];
                    newBankInfo = {
                        bank_code: bankData.code,
                        bank_name: bankData.name,
                        account_number: oldBankInfo.account_number,
                        account_name: oldBankInfo.account_name,
                    };
                    // Update the transaction with new bank_info format
                    return [4 /*yield*/, knex('wallet_transactions')
                            .where('id', transaction.id)
                            .update({
                            bank_info: JSON.stringify(newBankInfo),
                        })];
                case 5:
                    // Update the transaction with new bank_info format
                    _b.sent();
                    return [3 /*break*/, 7];
                case 6:
                    console.warn("Bank not found for: ".concat(oldBankInfo.bank_name));
                    _b.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_1 = _b.sent();
                    console.error("Error processing transaction ".concat(transaction.id, ":"), error_1);
                    throw error_1;
                case 9:
                    _i++;
                    return [3 /*break*/, 3];
                case 10:
                    console.log('Successfully updated bank_info in wallet_transactions table');
                    return [3 /*break*/, 12];
                case 11:
                    error_2 = _b.sent();
                    console.error('Error in migration:', error_2);
                    throw error_2;
                case 12: return [2 /*return*/];
            }
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function () {
        var transactions, _i, _a, transaction, newBankInfo, oldBankInfo, error_3, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 9, , 10]);
                    return [4 /*yield*/, knex('wallet_transactions')
                            .select('id', 'bank_info')
                            .whereNotNull('bank_info')];
                case 1:
                    transactions = _b.sent();
                    _i = 0, _a = transactions;
                    _b.label = 2;
                case 2:
                    if (!(_i < _a.length)) return [3 /*break*/, 8];
                    transaction = _a[_i];
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 6, , 7]);
                    newBankInfo = void 0;
                    if (typeof transaction.bank_info === 'string') {
                        newBankInfo = JSON.parse(transaction.bank_info);
                    }
                    else {
                        // If it's already an object, use it directly
                        newBankInfo = transaction.bank_info;
                    }
                    if (!(newBankInfo.bank_code && newBankInfo.bank_name)) return [3 /*break*/, 5];
                    oldBankInfo = {
                        bank_name: newBankInfo.bank_name, // Keep full name for now
                        account_number: newBankInfo.account_number,
                        account_name: newBankInfo.account_name,
                    };
                    // Update the transaction with old bank_info format
                    return [4 /*yield*/, knex('wallet_transactions')
                            .where('id', transaction.id)
                            .update({
                            bank_info: JSON.stringify(oldBankInfo),
                        })];
                case 4:
                    // Update the transaction with old bank_info format
                    _b.sent();
                    _b.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    error_3 = _b.sent();
                    console.error("Error reverting transaction ".concat(transaction.id, ":"), error_3);
                    return [3 /*break*/, 7];
                case 7:
                    _i++;
                    return [3 /*break*/, 2];
                case 8:
                    console.log('Successfully reverted bank_info in wallet_transactions table');
                    return [3 /*break*/, 10];
                case 9:
                    error_4 = _b.sent();
                    console.error('Error in migration rollback:', error_4);
                    throw error_4;
                case 10: return [2 /*return*/];
            }
        });
    });
}
