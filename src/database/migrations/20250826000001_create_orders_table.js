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
            return [2 /*return*/, knex.schema.createTable('orders', function (table) {
                    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
                    table.string('order_number', 50).unique().notNullable();
                    table
                        .uuid('buyer_id')
                        .notNullable()
                        .references('id')
                        .inTable('users')
                        .onDelete('CASCADE');
                    table
                        .uuid('shop_id')
                        .notNullable()
                        .references('id')
                        .inTable('shops')
                        .onDelete('CASCADE');
                    table.decimal('total_amount', 14, 2).notNullable();
                    table.decimal('subtotal', 14, 2).notNullable();
                    table.decimal('commission_fee', 14, 2).defaultTo(0);
                    table.decimal('shipping_fee', 14, 2).defaultTo(0);
                    table.decimal('discount_amount', 14, 2).defaultTo(0);
                    table.string('currency', 10).defaultTo('VND');
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
                    table
                        .enum('payment_status', ['pending', 'paid', 'failed', 'refunded'])
                        .defaultTo('pending');
                    table.string('payment_method', 50);
                    table.jsonb('shipping_address');
                    table.jsonb('billing_address');
                    table.text('notes');
                    table.date('estimated_delivery');
                    table.timestamp('delivered_at');
                    table.timestamp('cancelled_at');
                    table.uuid('cancelled_by').references('id').inTable('users');
                    table.text('cancellation_reason');
                    table.timestamp('created_at').defaultTo(knex.fn.now());
                    table.timestamp('updated_at').defaultTo(knex.fn.now());
                    // Indexes
                    table.index(['buyer_id']);
                    table.index(['shop_id']);
                    table.index(['status']);
                    table.index(['payment_status']);
                    table.index(['created_at']);
                    table.index(['order_number']);
                })];
        });
    });
}
function down(knex) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, knex.schema.dropTable('orders')];
        });
    });
}
