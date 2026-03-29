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
                // Remove fields from orders table
                return [4 /*yield*/, knex.schema.alterTable('orders', function (table) {
                        table.dropColumn('subtotal');
                        table.dropColumn('commission_fee');
                        table.dropColumn('shipping_fee');
                        table.dropColumn('discount_amount');
                        table.dropColumn('currency');
                        table.dropColumn('payment_status');
                        table.dropColumn('payment_method');
                        table.dropColumn('shipping_address');
                        table.dropColumn('billing_address');
                        table.dropColumn('estimated_delivery');
                        table.dropColumn('delivered_at');
                        table.dropColumn('cancelled_at');
                        table.dropColumn('cancelled_by');
                        table.dropColumn('cancellation_reason');
                    })];
                case 1:
                    // Remove fields from orders table
                    _a.sent();
                    // Update status enum to only have 3 values
                    return [4 /*yield*/, knex.schema.alterTable('orders', function (table) {
                            table.dropColumn('status');
                        })];
                case 2:
                    // Update status enum to only have 3 values
                    _a.sent();
                    return [4 /*yield*/, knex.schema.alterTable('orders', function (table) {
                            table
                                .enum('status', ['pending', 'completed', 'refunded'])
                                .defaultTo('pending');
                        })];
                case 3:
                    _a.sent();
                    // Remove fields from order_items table
                    return [4 /*yield*/, knex.schema.alterTable('order_items', function (table) {
                            table.dropColumn('unit_price');
                            table.dropColumn('is_digital');
                            table.dropColumn('download_expires_at');
                            table.dropColumn('download_count');
                            table.dropColumn('max_downloads');
                        })];
                case 4:
                    // Remove fields from order_items table
                    _a.sent();
                    // Add category_commissions_id field to order_items table
                    return [4 /*yield*/, knex.schema.alterTable('order_items', function (table) {
                            table
                                .uuid('category_commissions_id')
                                .references('id')
                                .inTable('category_commissions')
                                .onDelete('SET NULL');
                        })];
                case 5:
                    // Add category_commissions_id field to order_items table
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
                case 0: 
                // Remove category_commissions_id field from order_items table
                return [4 /*yield*/, knex.schema.alterTable('order_items', function (table) {
                        table.dropColumn('category_commissions_id');
                    })];
                case 1:
                    // Remove category_commissions_id field from order_items table
                    _a.sent();
                    // Restore fields to orders table
                    return [4 /*yield*/, knex.schema.alterTable('orders', function (table) {
                            table.decimal('subtotal', 14, 2).notNullable();
                            table.decimal('commission_fee', 14, 2).defaultTo(0);
                            table.decimal('shipping_fee', 14, 2).defaultTo(0);
                            table.decimal('discount_amount', 14, 2).defaultTo(0);
                            table.string('currency', 10).defaultTo('VND');
                            table
                                .enum('payment_status', ['pending', 'paid', 'failed', 'refunded'])
                                .defaultTo('pending');
                            table.string('payment_method', 50);
                            table.jsonb('shipping_address');
                            table.jsonb('billing_address');
                            table.date('estimated_delivery');
                            table.timestamp('delivered_at');
                            table.timestamp('cancelled_at');
                            table.uuid('cancelled_by').references('id').inTable('users');
                            table.text('cancellation_reason');
                        })];
                case 2:
                    // Restore fields to orders table
                    _a.sent();
                    // Restore original status enum
                    return [4 /*yield*/, knex.schema.alterTable('orders', function (table) {
                            table.dropColumn('status');
                        })];
                case 3:
                    // Restore original status enum
                    _a.sent();
                    return [4 /*yield*/, knex.schema.alterTable('orders', function (table) {
                            table
                                .enum('status', [
                                'pending',
                                'confirmed',
                                'processing',
                                'shipped',
                                'delivered',
                                'completed',
                                'cancelled',
                                'refunded',
                            ])
                                .defaultTo('pending');
                        })];
                case 4:
                    _a.sent();
                    // Restore fields to order_items table
                    return [4 /*yield*/, knex.schema.alterTable('order_items', function (table) {
                            table.decimal('unit_price', 14, 2).notNullable();
                            table.boolean('is_digital').defaultTo(false);
                            table.timestamp('download_expires_at');
                            table.integer('download_count').defaultTo(0);
                            table.integer('max_downloads').defaultTo(1);
                        })];
                case 5:
                    // Restore fields to order_items table
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
