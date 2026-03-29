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
                case 0: return [4 /*yield*/, knex.schema.createTable('product_reviews', function (table) {
                        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
                        // Product reference
                        table
                            .uuid('product_id')
                            .references('id')
                            .inTable('products')
                            .onDelete('CASCADE')
                            .notNullable();
                        // User who wrote the review
                        table
                            .uuid('user_id')
                            .references('id')
                            .inTable('users')
                            .onDelete('CASCADE')
                            .notNullable();
                        // Shop owner who can reply (optional)
                        table
                            .uuid('shop_id')
                            .references('id')
                            .inTable('shops')
                            .onDelete('CASCADE')
                            .notNullable();
                        // Parent review for replies (self-referencing)
                        table
                            .uuid('parent_review_id')
                            .references('id')
                            .inTable('product_reviews')
                            .onDelete('CASCADE');
                        // Review content
                        table.text('content').notNullable();
                        // Star rating (1-5)
                        table.integer('rating').notNullable();
                        // Review status
                        table
                            .enum('status', ['pending', 'approved', 'rejected'], {
                            useNative: true,
                            enumName: 'product_review_status',
                        })
                            .notNullable()
                            .defaultTo('pending');
                        // Like count for the review
                        table.integer('like_count').defaultTo(0).notNullable();
                        // Timestamps
                        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
                        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
                        // Indexes for performance
                        table.index('product_id', 'idx_product_reviews_product_id');
                        table.index('user_id', 'idx_product_reviews_user_id');
                        table.index('shop_id', 'idx_product_reviews_shop_id');
                        table.index('parent_review_id', 'idx_product_reviews_parent_id');
                        table.index('status', 'idx_product_reviews_status');
                        table.index('rating', 'idx_product_reviews_rating');
                        table.index('created_at', 'idx_product_reviews_created_at');
                        table.index(['product_id', 'status'], 'idx_product_reviews_product_status');
                        table.index(['product_id', 'rating'], 'idx_product_reviews_product_rating');
                        // Unique constraint: one review per user per product (only for main reviews, not replies)
                        table.unique(['product_id', 'user_id', 'parent_review_id'], {
                            indexName: 'uq_product_reviews_user_product',
                            deferrable: 'deferred',
                        });
                    })];
                case 1:
                    _a.sent();
                    // Create trigger to update updated_at
                    return [4 /*yield*/, knex.raw("\n    CREATE OR REPLACE FUNCTION update_product_reviews_updated_at()\n    RETURNS TRIGGER AS $$\n    BEGIN\n      NEW.updated_at = NOW();\n      RETURN NEW;\n    END;\n    $$ language 'plpgsql';\n  ")];
                case 2:
                    // Create trigger to update updated_at
                    _a.sent();
                    return [4 /*yield*/, knex.raw("\n    CREATE TRIGGER update_product_reviews_updated_at\n      BEFORE UPDATE ON product_reviews\n      FOR EACH ROW\n      EXECUTE FUNCTION update_product_reviews_updated_at();\n  ")];
                case 3:
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
                // Drop trigger and function
                return [4 /*yield*/, knex.raw('DROP TRIGGER IF EXISTS update_product_reviews_updated_at ON product_reviews;')];
                case 1:
                    // Drop trigger and function
                    _a.sent();
                    return [4 /*yield*/, knex.raw('DROP FUNCTION IF EXISTS update_product_reviews_updated_at();')];
                case 2:
                    _a.sent();
                    // Drop table
                    return [4 /*yield*/, knex.schema.dropTableIfExists('product_reviews')];
                case 3:
                    // Drop table
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
