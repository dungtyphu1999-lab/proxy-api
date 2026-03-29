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
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // Create ENUMs first
                return [4 /*yield*/, knex.raw("\n    CREATE TYPE payment_status AS ENUM (\n      'pending',\n      'processing',\n      'paid',\n      'failed',\n      'refunded',\n      'cancelled'\n    );\n  ")];
                case 1:
                    // Create ENUMs first
                    _a.sent();
                    return [4 /*yield*/, knex.raw("\n    CREATE TYPE payment_method AS ENUM (\n      'wallet',\n      'bank_transfer',\n      'credit_card',\n      'paypal',\n      'momo',\n      'other'\n    );\n  ")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, knex.raw("\n    CREATE TYPE payment_reference_type AS ENUM (\n      'order',\n      'product_boost'\n    );\n  ")];
                case 3:
                    _a.sent();
                    // Create payments table
                    return [4 /*yield*/, knex.schema.createTable('payments', function (table) {
                            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
                            table.string('payment_code', 30).unique().notNullable();
                            table
                                .specificType('reference_type', 'payment_reference_type')
                                .notNullable();
                            table.uuid('reference_id').notNullable();
                            table.uuid('payer_id').references('id').inTable('users').notNullable();
                            table.uuid('payee_id').references('id').inTable('users');
                            table.uuid('system_wallet_id');
                            table.decimal('amount', 14, 2).notNullable().checkPositive();
                            table.string('currency', 10).defaultTo('VND');
                            table.specificType('method', 'payment_method').notNullable();
                            table.specificType('status', 'payment_status').defaultTo('pending');
                            table.jsonb('metadata');
                            table.text('note');
                            table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
                            table.timestamp('paid_at', { useTz: true });
                            table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
                        })];
                case 4:
                    // Create payments table
                    _a.sent();
                    // Create indexes
                    return [4 /*yield*/, knex.raw("\n    CREATE INDEX idx_payments_reference\n      ON payments(reference_type, reference_id);\n  ")];
                case 5:
                    // Create indexes
                    _a.sent();
                    return [4 /*yield*/, knex.raw("\n    CREATE INDEX idx_payments_payer\n      ON payments(payer_id, status);\n  ")];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, knex.schema.dropTableIfExists('payments')];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, knex.raw('DROP TYPE IF EXISTS payment_status')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, knex.raw('DROP TYPE IF EXISTS payment_method')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, knex.raw('DROP TYPE IF EXISTS payment_reference_type')];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
