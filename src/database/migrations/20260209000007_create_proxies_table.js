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
                case 0: return [4 /*yield*/, knex.schema.createTable('proxies', function (table) {
                        table.bigIncrements('id').primary();
                        table
                            .uuid('user_id')
                            .notNullable()
                            .references('id')
                            .inTable('users')
                            .onDelete('CASCADE');
                        table.string('address', 45).notNullable();
                        table.integer('port').notNullable();
                        table.string('username', 255).notNullable();
                        table.string('password', 255).notNullable();
                        table.string('country_code', 2).notNullable();
                        table.string('city', 100);
                        table.string('status', 20).notNullable();
                        table.timestamp('last_checked_at', { useTz: true });
                        table.string('proxy_type', 30).notNullable();
                        table.timestamp('created_at', { useTz: true }).defaultTo(knex.fn.now());
                        table.timestamp('updated_at', { useTz: true }).defaultTo(knex.fn.now());
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, knex.raw("\n    CREATE UNIQUE INDEX idx_proxies_user_address_port\n      ON proxies(user_id, address, port);\n  ")];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, knex.raw('CREATE INDEX idx_proxies_user_id ON proxies(user_id)')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, knex.raw('CREATE INDEX idx_proxies_country_code ON proxies(country_code)')];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, knex.raw('CREATE INDEX idx_proxies_status ON proxies(status)')];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, knex.raw('CREATE INDEX idx_proxies_last_checked_at ON proxies(last_checked_at)')];
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
                case 0: return [4 /*yield*/, knex.schema.dropTableIfExists('proxies')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
