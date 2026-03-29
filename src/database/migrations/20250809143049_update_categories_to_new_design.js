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
                // Update categories table to match new design
                return [4 /*yield*/, knex.schema.alterTable('categories', function (table) {
                        // Add constraints that were missing
                        table.string('name').notNullable().alter();
                        table.string('slug').notNullable().alter();
                        table.boolean('is_active').notNullable().defaultTo(true).alter();
                        // Change timestamps to timestamptz
                        table.dropColumn('created_at');
                        table.dropColumn('updated_at');
                    })];
                case 1:
                    // Update categories table to match new design
                    _a.sent();
                    // Add timestamptz columns using raw SQL for proper timezone support
                    return [4 /*yield*/, knex.schema.raw("\n    ALTER TABLE categories \n    ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n    ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n  ")];
                case 2:
                    // Add timestamptz columns using raw SQL for proper timezone support
                    _a.sent();
                    // Drop and recreate parent_id with proper foreign key constraint
                    return [4 /*yield*/, knex.schema.alterTable('categories', function (table) {
                            table.dropForeign(['parent_id']);
                            table.dropColumn('parent_id');
                        })];
                case 3:
                    // Drop and recreate parent_id with proper foreign key constraint
                    _a.sent();
                    return [4 /*yield*/, knex.schema.alterTable('categories', function (table) {
                            table
                                .uuid('parent_id')
                                .nullable()
                                .references('id')
                                .inTable('categories')
                                .onDelete('SET NULL');
                        })];
                case 4:
                    _a.sent();
                    // Add constraints
                    return [4 /*yield*/, knex.schema.raw("\n    ALTER TABLE categories \n    ADD CONSTRAINT uq_categories_parent_slug UNIQUE (parent_id, slug)\n  ")];
                case 5:
                    // Add constraints
                    _a.sent();
                    return [4 /*yield*/, knex.schema.raw("\n    ALTER TABLE categories \n    ADD CONSTRAINT chk_categories_parent_self \n    CHECK (parent_id IS NULL OR parent_id <> id)\n  ")];
                case 6:
                    _a.sent();
                    // Create indexes
                    return [4 /*yield*/, knex.schema.raw('CREATE INDEX idx_categories_parent ON categories(parent_id)')];
                case 7:
                    // Create indexes
                    _a.sent();
                    return [4 /*yield*/, knex.schema.raw('CREATE INDEX idx_categories_is_active ON categories(is_active)')];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.raw('CREATE INDEX idx_categories_slug ON categories(slug)')];
                case 9:
                    _a.sent();
                    // Update category_commissions table
                    return [4 /*yield*/, knex.schema.alterTable('category_commissions', function (table) {
                            // Add check constraint for commission_rate
                            table.decimal('commission_rate', 5, 2).notNullable().alter();
                            // Change timestamps to timestamptz
                            table.dropColumn('created_at');
                            table.dropColumn('updated_at');
                        })];
                case 10:
                    // Update category_commissions table
                    _a.sent();
                    // Add timestamptz columns using raw SQL for proper timezone support
                    return [4 /*yield*/, knex.schema.raw("\n    ALTER TABLE category_commissions \n    ADD COLUMN effective_from TIMESTAMPTZ NOT NULL,\n    ADD COLUMN created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),\n    ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()\n  ")];
                case 11:
                    // Add timestamptz columns using raw SQL for proper timezone support
                    _a.sent();
                    // Drop and recreate category_id with proper cascade behavior
                    return [4 /*yield*/, knex.schema.alterTable('category_commissions', function (table) {
                            table.dropForeign(['category_id']);
                            table.dropColumn('category_id');
                        })];
                case 12:
                    // Drop and recreate category_id with proper cascade behavior
                    _a.sent();
                    return [4 /*yield*/, knex.schema.alterTable('category_commissions', function (table) {
                            table
                                .uuid('category_id')
                                .notNullable()
                                .references('id')
                                .inTable('categories')
                                .onDelete('CASCADE');
                        })];
                case 13:
                    _a.sent();
                    // Add constraints
                    return [4 /*yield*/, knex.schema.raw("\n    ALTER TABLE category_commissions \n    ADD CONSTRAINT chk_commission_rate_range \n    CHECK (commission_rate >= 0 AND commission_rate <= 100)\n  ")];
                case 14:
                    // Add constraints
                    _a.sent();
                    return [4 /*yield*/, knex.schema.raw("\n    ALTER TABLE category_commissions \n    ADD CONSTRAINT uq_cat_comm_moment UNIQUE (category_id, effective_from)\n  ")];
                case 15:
                    _a.sent();
                    // Create performance index
                    return [4 /*yield*/, knex.schema.raw('CREATE INDEX idx_cat_comm_current ON category_commissions(category_id, effective_from DESC)')];
                case 16:
                    // Create performance index
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
                // Drop indexes
                return [4 /*yield*/, knex.schema.raw('DROP INDEX IF EXISTS idx_categories_parent')];
                case 1:
                    // Drop indexes
                    _a.sent();
                    return [4 /*yield*/, knex.schema.raw('DROP INDEX IF EXISTS idx_categories_is_active')];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.raw('DROP INDEX IF EXISTS idx_categories_slug')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.raw('DROP INDEX IF EXISTS idx_cat_comm_current')];
                case 4:
                    _a.sent();
                    // Drop constraints
                    return [4 /*yield*/, knex.schema.raw('ALTER TABLE categories DROP CONSTRAINT IF EXISTS uq_categories_parent_slug')];
                case 5:
                    // Drop constraints
                    _a.sent();
                    return [4 /*yield*/, knex.schema.raw('ALTER TABLE categories DROP CONSTRAINT IF EXISTS chk_categories_parent_self')];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.raw('ALTER TABLE category_commissions DROP CONSTRAINT IF EXISTS chk_commission_rate_range')];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, knex.schema.raw('ALTER TABLE category_commissions DROP CONSTRAINT IF EXISTS uq_cat_comm_moment')];
                case 8:
                    _a.sent();
                    // Revert categories table
                    return [4 /*yield*/, knex.schema.alterTable('categories', function (table) {
                            table.dropColumn('created_at');
                            table.dropColumn('updated_at');
                        })];
                case 9:
                    // Revert categories table
                    _a.sent();
                    return [4 /*yield*/, knex.schema.alterTable('categories', function (table) {
                            table.timestamp('created_at').defaultTo(knex.fn.now());
                            table.timestamp('updated_at').defaultTo(knex.fn.now());
                        })];
                case 10:
                    _a.sent();
                    // Revert category_commissions table
                    return [4 /*yield*/, knex.schema.alterTable('category_commissions', function (table) {
                            table.dropColumn('effective_from');
                            table.dropColumn('created_at');
                            table.dropColumn('updated_at');
                        })];
                case 11:
                    // Revert category_commissions table
                    _a.sent();
                    return [4 /*yield*/, knex.schema.alterTable('category_commissions', function (table) {
                            table.timestamp('created_at').defaultTo(knex.fn.now());
                            table.timestamp('updated_at').defaultTo(knex.fn.now());
                        })];
                case 12:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
