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
                // Step 1: Drop foreign key constraint
                return [4 /*yield*/, knex.schema.alterTable('blog_post_type_relations', function (table) {
                        table.dropForeign(['type_id']);
                    })];
                case 1:
                    // Step 1: Drop foreign key constraint
                    _a.sent();
                    // Step 2: Drop related tables
                    return [4 /*yield*/, knex.schema.dropTableIfExists('blog_post_type_relations')];
                case 2:
                    // Step 2: Drop related tables
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('blog_post_types')];
                case 3:
                    _a.sent();
                    // Step 3: Recreate blog_post_types with integer ID and no slug
                    return [4 /*yield*/, knex.schema.createTable('blog_post_types', function (table) {
                            table.increments('id').primary();
                            table.string('name', 100).notNullable().unique();
                            table.text('description');
                            table.integer('sort_order').defaultTo(0);
                            table.boolean('is_active').defaultTo(true);
                            table.timestamp('created_at').defaultTo(knex.fn.now());
                            table.timestamp('updated_at').defaultTo(knex.fn.now());
                            // Indexes
                            table.index('is_active', 'idx_blog_post_types_is_active');
                        })];
                case 4:
                    // Step 3: Recreate blog_post_types with integer ID and no slug
                    _a.sent();
                    // Step 4: Recreate blog_post_type_relations with integer type_id
                    return [4 /*yield*/, knex.schema.createTable('blog_post_type_relations', function (table) {
                            table
                                .uuid('blog_post_id')
                                .notNullable()
                                .references('id')
                                .inTable('blog_posts')
                                .onDelete('CASCADE');
                            table
                                .integer('type_id')
                                .notNullable()
                                .references('id')
                                .inTable('blog_post_types')
                                .onDelete('CASCADE');
                            table.timestamp('created_at').defaultTo(knex.fn.now());
                            // Composite primary key
                            table.primary(['blog_post_id', 'type_id']);
                            // Indexes
                            table.index('blog_post_id', 'idx_blog_post_type_relations_blog_post_id');
                            table.index('type_id', 'idx_blog_post_type_relations_type_id');
                        })];
                case 5:
                    // Step 4: Recreate blog_post_type_relations with integer type_id
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
                // Step 1: Drop foreign key constraint
                return [4 /*yield*/, knex.schema.alterTable('blog_post_type_relations', function (table) {
                        table.dropForeign(['type_id']);
                    })];
                case 1:
                    // Step 1: Drop foreign key constraint
                    _a.sent();
                    // Step 2: Drop tables
                    return [4 /*yield*/, knex.schema.dropTableIfExists('blog_post_type_relations')];
                case 2:
                    // Step 2: Drop tables
                    _a.sent();
                    return [4 /*yield*/, knex.schema.dropTableIfExists('blog_post_types')];
                case 3:
                    _a.sent();
                    // Step 3: Recreate original blog_post_types with UUID and slug
                    return [4 /*yield*/, knex.schema.createTable('blog_post_types', function (table) {
                            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
                            table.string('name', 100).notNullable().unique();
                            table.string('slug', 100).notNullable().unique();
                            table.text('description');
                            table.integer('sort_order').defaultTo(0);
                            table.boolean('is_active').defaultTo(true);
                            table.timestamp('created_at').defaultTo(knex.fn.now());
                            table.timestamp('updated_at').defaultTo(knex.fn.now());
                            // Indexes
                            table.index('slug', 'idx_blog_post_types_slug');
                            table.index('is_active', 'idx_blog_post_types_is_active');
                        })];
                case 4:
                    // Step 3: Recreate original blog_post_types with UUID and slug
                    _a.sent();
                    // Step 4: Recreate original blog_post_type_relations with UUID type_id
                    return [4 /*yield*/, knex.schema.createTable('blog_post_type_relations', function (table) {
                            table
                                .uuid('blog_post_id')
                                .notNullable()
                                .references('id')
                                .inTable('blog_posts')
                                .onDelete('CASCADE');
                            table
                                .uuid('type_id')
                                .notNullable()
                                .references('id')
                                .inTable('blog_post_types')
                                .onDelete('CASCADE');
                            table.timestamp('created_at').defaultTo(knex.fn.now());
                            // Composite primary key
                            table.primary(['blog_post_id', 'type_id']);
                            // Indexes
                            table.index('blog_post_id', 'idx_blog_post_type_relations_blog_post_id');
                            table.index('type_id', 'idx_blog_post_type_relations_type_id');
                        })];
                case 5:
                    // Step 4: Recreate original blog_post_type_relations with UUID type_id
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
