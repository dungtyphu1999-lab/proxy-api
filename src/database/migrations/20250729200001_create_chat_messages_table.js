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
                // Install pg_trgm extension for trigram-based text search
                return [4 /*yield*/, knex.raw('CREATE EXTENSION IF NOT EXISTS pg_trgm')];
                case 1:
                    // Install pg_trgm extension for trigram-based text search
                    _a.sent();
                    return [4 /*yield*/, knex.schema.createTable('chat_messages', function (table) {
                            table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
                            // Message relationship
                            table
                                .uuid('conversation_id')
                                .notNullable()
                                .references('id')
                                .inTable('chat_conversations')
                                .onDelete('CASCADE');
                            table
                                .uuid('sender_id')
                                .notNullable()
                                .references('id')
                                .inTable('users')
                                .onDelete('CASCADE');
                            // Message content
                            table.text('content').notNullable();
                            table
                                .enum('message_type', ['text', 'image', 'file', 'system'])
                                .defaultTo('text');
                            // File attachments (optional)
                            table.string('file_url', 500).nullable();
                            table.string('file_name', 255).nullable();
                            table.integer('file_size').nullable();
                            table.string('file_type', 100).nullable();
                            // Message status
                            table.boolean('is_read').defaultTo(false);
                            table.timestamp('read_at').nullable();
                            table.boolean('is_deleted').defaultTo(false);
                            table.timestamp('deleted_at').nullable();
                            // Message metadata
                            table.jsonb('metadata').nullable(); // For additional data like reactions, mentions, etc.
                            // Timestamps
                            table.timestamp('created_at').defaultTo(knex.fn.now());
                            table.timestamp('updated_at').defaultTo(knex.fn.now());
                            // Indexes for performance
                            table.index(['conversation_id']);
                            table.index(['sender_id']);
                            table.index(['message_type']);
                            table.index(['is_read']);
                            table.index(['is_deleted']);
                            table.index(['created_at']);
                            // Composite indexes for common queries
                            table.index(['conversation_id', 'created_at']);
                            table.index(['conversation_id', 'is_read']);
                            table.index(['sender_id', 'created_at']);
                        })];
                case 2:
                    _a.sent();
                    // Full-text search index on content using gin_trgm_ops for text similarity
                    return [4 /*yield*/, knex.raw('CREATE INDEX idx_chat_messages_content_gin ON chat_messages USING gin (content gin_trgm_ops)')];
                case 3:
                    // Full-text search index on content using gin_trgm_ops for text similarity
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
                case 0: return [4 /*yield*/, knex.schema.dropTableIfExists('chat_messages')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
