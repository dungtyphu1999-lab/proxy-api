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
                // Ensure functions for UUID
                return [4 /*yield*/, knex.schema.raw("CREATE EXTENSION IF NOT EXISTS pgcrypto")];
                case 1:
                    // Ensure functions for UUID
                    _a.sent();
                    // Create enums idempotently (PostgreSQL)
                    return [4 /*yield*/, knex.schema.raw("\n    DO $$ BEGIN\n      CREATE TYPE product_state AS ENUM ('live','hidden','pending','suspended','draft','deleted');\n    EXCEPTION WHEN duplicate_object THEN NULL; END $$;\n\n    DO $$ BEGIN\n      CREATE TYPE product_version_type AS ENUM ('new','edit');\n    EXCEPTION WHEN duplicate_object THEN NULL; END $$;\n\n    DO $$ BEGIN\n      CREATE TYPE product_version_status AS ENUM ('pending','approved','rejected');\n    EXCEPTION WHEN duplicate_object THEN NULL; END $$;\n  ")];
                case 2:
                    // Create enums idempotently (PostgreSQL)
                    _a.sent();
                    // Drop legacy tables if they exist
                    return [4 /*yield*/, knex.schema.dropTableIfExists('product_images')];
                case 3:
                    // Drop legacy tables if they exist
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('products')];
                case 4:
                    _a.sent();
                    // PRODUCTS
                    return [4 /*yield*/, knex.schema.createTable('products', function (table) {
                            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
                            table.uuid('shop_id').notNullable().references('id').inTable('shops');
                            table.uuid('approved_version_id').nullable();
                            table.text('slug').notNullable().unique();
                            table
                                .enu('state', ['live', 'hidden', 'pending', 'suspended', 'draft', 'deleted'], { useNative: true, enumName: 'product_state', existingType: true })
                                .notNullable()
                                .defaultTo('pending');
                            table.boolean('is_free').notNullable().defaultTo(false);
                            table.integer('total_sales').notNullable().defaultTo(0);
                            table.decimal('total_revenue', 12, 2).notNullable().defaultTo(0);
                            table.decimal('rating_avg', 3, 2).notNullable().defaultTo(0);
                            table.integer('rating_count').notNullable().defaultTo(0);
                            table
                                .timestamp('created_at', { useTz: true })
                                .notNullable()
                                .defaultTo(knex.fn.now());
                            table
                                .timestamp('updated_at', { useTz: true })
                                .notNullable()
                                .defaultTo(knex.fn.now());
                        })];
                case 5:
                    // PRODUCTS
                    _a.sent();
                    return [4 /*yield*/, knex.schema.raw("\n    ALTER TABLE products\n    ADD CONSTRAINT chk_products_rating_avg CHECK (rating_avg >= 0 AND rating_avg <= 5)\n  ")];
                case 6:
                    _a.sent();
                    // PRODUCT_VERSIONS
                    return [4 /*yield*/, knex.schema.createTable('product_versions', function (table) {
                            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
                            table
                                .uuid('product_id')
                                .notNullable()
                                .references('id')
                                .inTable('products')
                                .onDelete('CASCADE');
                            table
                                .enu('version_type', ['new', 'edit'], {
                                useNative: true,
                                enumName: 'product_version_type',
                                existingType: true,
                            })
                                .notNullable()
                                .defaultTo('new');
                            table
                                .enu('status', ['pending', 'approved', 'rejected'], {
                                useNative: true,
                                enumName: 'product_version_status',
                                existingType: true,
                            })
                                .notNullable()
                                .defaultTo('pending');
                            table.text('name').notNullable();
                            table.text('slug').notNullable().unique();
                            table.boolean('is_free').notNullable().defaultTo(false);
                            table.decimal('price', 12, 2).notNullable();
                            table.decimal('discount_percent', 5, 2).notNullable().defaultTo(0);
                            table.uuid('category_id').references('id').inTable('categories');
                            table.uuid('subcategory_id').references('id').inTable('categories');
                            table.text('description');
                            table.text('instruction');
                            table.jsonb('meta').notNullable().defaultTo(knex.raw("'{}'::jsonb"));
                            table.uuid('submitted_by').notNullable().references('id').inTable('users');
                            table.uuid('reviewed_by').references('id').inTable('users');
                            table.text('rejection_reason');
                            table
                                .timestamp('submitted_at', { useTz: true })
                                .notNullable()
                                .defaultTo(knex.fn.now());
                            table.timestamp('reviewed_at', { useTz: true });
                            table
                                .timestamp('created_at', { useTz: true })
                                .notNullable()
                                .defaultTo(knex.fn.now());
                            table
                                .timestamp('updated_at', { useTz: true })
                                .notNullable()
                                .defaultTo(knex.fn.now());
                        })];
                case 7:
                    // PRODUCT_VERSIONS
                    _a.sent();
                    return [4 /*yield*/, knex.schema.raw("\n    ALTER TABLE product_versions\n    ADD CONSTRAINT chk_price_positive  CHECK (price >= 0),\n    ADD CONSTRAINT chk_discount_range  CHECK (discount_percent >= 0 AND discount_percent <= 100)\n  ")];
                case 8:
                    _a.sent();
                    // PRODUCT_VERSION_IMAGES
                    return [4 /*yield*/, knex.schema.createTable('product_version_images', function (table) {
                            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
                            table
                                .uuid('product_version_id')
                                .notNullable()
                                .references('id')
                                .inTable('product_versions')
                                .onDelete('CASCADE');
                            table.text('file_path').notNullable();
                            table.integer('sort_order').notNullable().defaultTo(0);
                            table.boolean('is_primary').notNullable().defaultTo(false);
                            table
                                .timestamp('created_at', { useTz: true })
                                .notNullable()
                                .defaultTo(knex.fn.now());
                        })];
                case 9:
                    // PRODUCT_VERSION_IMAGES
                    _a.sent();
                    return [4 /*yield*/, knex.schema.raw("\n    ALTER TABLE products\n    ADD CONSTRAINT fk_products_approved_version\n    FOREIGN KEY (approved_version_id) REFERENCES product_versions(id) ON DELETE SET NULL\n  ")];
                case 10:
                    _a.sent();
                    // Indexes
                    return [4 /*yield*/, knex.schema.raw("\n    CREATE INDEX idx_products_shop_id        ON products(shop_id);\n    CREATE INDEX idx_products_state          ON products(state);\n    CREATE INDEX idx_products_shop_state     ON products(shop_id, state, created_at DESC);\n    CREATE INDEX idx_products_approved_ver   ON products(approved_version_id);\n\n    CREATE INDEX idx_product_versions_product ON product_versions(product_id);\n    CREATE INDEX idx_product_versions_status  ON product_versions(status);\n\n    CREATE INDEX idx_pv_images_version        ON product_version_images(product_version_id, sort_order);\n\n    CREATE UNIQUE INDEX uq_pvimg_primary\n      ON product_version_images(product_version_id) WHERE is_primary = TRUE;\n  ")];
                case 11:
                    // Indexes
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
                // Drop foreign key constraint first
                return [4 /*yield*/, knex.schema.raw("\n    ALTER TABLE products DROP CONSTRAINT IF EXISTS fk_products_approved_version\n  ")];
                case 1:
                    // Drop foreign key constraint first
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('product_version_images')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('product_versions')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('products')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.raw("DROP TYPE IF EXISTS product_version_status")];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.raw("DROP TYPE IF EXISTS product_version_type")];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.raw("DROP TYPE IF EXISTS product_state")];
                case 7:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
