"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramRepository = void 0;
var common_1 = require("@nestjs/common");
var TelegramRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TelegramRepository = _classThis = /** @class */ (function () {
        function TelegramRepository_1(databaseService) {
            this.databaseService = databaseService;
        }
        TelegramRepository_1.prototype.qb = function () {
            return this.databaseService.getKnex();
        };
        TelegramRepository_1.prototype.findByUserId = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var row;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb()('telegram_connections')
                                .where('user_id', userId)
                                .first()];
                        case 1:
                            row = _a.sent();
                            return [2 /*return*/, row !== null && row !== void 0 ? row : null];
                    }
                });
            });
        };
        TelegramRepository_1.prototype.findActiveByUserId = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var row;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb()('telegram_connections')
                                .where('user_id', userId)
                                .andWhere('is_active', true)
                                .first()];
                        case 1:
                            row = _a.sent();
                            return [2 /*return*/, row !== null && row !== void 0 ? row : null];
                    }
                });
            });
        };
        TelegramRepository_1.prototype.findActiveByUserIds = function (userIds) {
            return __awaiter(this, void 0, void 0, function () {
                var rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (userIds.length === 0) {
                                return [2 /*return*/, []];
                            }
                            return [4 /*yield*/, this.qb()('telegram_connections')
                                    .whereIn('user_id', userIds)
                                    .andWhere('is_active', true)];
                        case 1:
                            rows = _a.sent();
                            return [2 /*return*/, rows];
                    }
                });
            });
        };
        TelegramRepository_1.prototype.findByTelegramUserId = function (telegramUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var row;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb()('telegram_connections')
                                .where('telegram_user_id', telegramUserId)
                                .first()];
                        case 1:
                            row = _a.sent();
                            return [2 /*return*/, row !== null && row !== void 0 ? row : null];
                    }
                });
            });
        };
        TelegramRepository_1.prototype.findActiveByTelegramUserId = function (telegramUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var row;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb()('telegram_connections')
                                .where('telegram_user_id', telegramUserId)
                                .andWhere('is_active', true)
                                .first()];
                        case 1:
                            row = _a.sent();
                            return [2 /*return*/, row !== null && row !== void 0 ? row : null];
                    }
                });
            });
        };
        TelegramRepository_1.prototype.deactivateByTelegramUserId = function (telegramUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var existing, now;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findActiveByTelegramUserId(telegramUserId)];
                        case 1:
                            existing = _a.sent();
                            if (!existing) {
                                return [2 /*return*/, null];
                            }
                            now = new Date();
                            return [4 /*yield*/, this.qb()
                                    .from('telegram_connections')
                                    .where('id', existing.id)
                                    .update({
                                    is_active: false,
                                    updated_at: now,
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, __assign(__assign({}, existing), { is_active: false, updated_at: now })];
                    }
                });
            });
        };
        TelegramRepository_1.prototype.deactivateByUserId = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var existing, now;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.findActiveByUserId(userId)];
                        case 1:
                            existing = _a.sent();
                            if (!existing) {
                                return [2 /*return*/, null];
                            }
                            now = new Date();
                            return [4 /*yield*/, this.qb()
                                    .from('telegram_connections')
                                    .where('id', existing.id)
                                    .update({
                                    is_active: false,
                                    updated_at: now,
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, __assign(__assign({}, existing), { is_active: false, updated_at: now })];
                    }
                });
            });
        };
        TelegramRepository_1.prototype.upsertConnection = function (input) {
            return __awaiter(this, void 0, void 0, function () {
                var now, existingByUser, existingByTelegram, rows;
                var _a, _b, _c, _d, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            now = new Date();
                            return [4 /*yield*/, this.findByUserId(input.user_id)];
                        case 1:
                            existingByUser = _f.sent();
                            if (!existingByUser) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.qb()
                                    .from('telegram_connections')
                                    .where('id', existingByUser.id)
                                    .update({
                                    telegram_user_id: input.telegram_user_id,
                                    chat_id: input.chat_id,
                                    telegram_username: (_a = input.telegram_username) !== null && _a !== void 0 ? _a : null,
                                    is_active: true,
                                    connected_at: now,
                                    updated_at: now,
                                })];
                        case 2:
                            _f.sent();
                            return [2 /*return*/, __assign(__assign({}, existingByUser), { telegram_user_id: input.telegram_user_id, chat_id: input.chat_id, telegram_username: (_b = input.telegram_username) !== null && _b !== void 0 ? _b : null, is_active: true, connected_at: now, updated_at: now })];
                        case 3: return [4 /*yield*/, this.findByTelegramUserId(input.telegram_user_id)];
                        case 4:
                            existingByTelegram = _f.sent();
                            if (!existingByTelegram) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.qb()
                                    .from('telegram_connections')
                                    .where('id', existingByTelegram.id)
                                    .update({
                                    user_id: input.user_id,
                                    chat_id: input.chat_id,
                                    telegram_username: (_c = input.telegram_username) !== null && _c !== void 0 ? _c : null,
                                    is_active: true,
                                    connected_at: now,
                                    updated_at: now,
                                })];
                        case 5:
                            _f.sent();
                            return [2 /*return*/, __assign(__assign({}, existingByTelegram), { user_id: input.user_id, chat_id: input.chat_id, telegram_username: (_d = input.telegram_username) !== null && _d !== void 0 ? _d : null, is_active: true, connected_at: now, updated_at: now })];
                        case 6: return [4 /*yield*/, this.qb()('telegram_connections')
                                .insert({
                                user_id: input.user_id,
                                telegram_user_id: input.telegram_user_id,
                                chat_id: input.chat_id,
                                telegram_username: (_e = input.telegram_username) !== null && _e !== void 0 ? _e : null,
                                is_active: true,
                                connected_at: now,
                                created_at: now,
                                updated_at: now,
                            })
                                .returning('*')];
                        case 7:
                            rows = _f.sent();
                            return [2 /*return*/, rows[0]];
                    }
                });
            });
        };
        TelegramRepository_1.prototype.createLinkToken = function (userId, token, expiresAt) {
            return __awaiter(this, void 0, void 0, function () {
                var now, rows;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            now = new Date();
                            return [4 /*yield*/, this.qb()('telegram_link_tokens')
                                    .where('user_id', userId)
                                    .whereNull('used_at')
                                    .del()];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.qb()('telegram_link_tokens')
                                    .insert({
                                    user_id: userId,
                                    token: token,
                                    expires_at: expiresAt,
                                    created_at: now,
                                })
                                    .returning('*')];
                        case 2:
                            rows = _a.sent();
                            return [2 /*return*/, rows[0]];
                    }
                });
            });
        };
        TelegramRepository_1.prototype.consumeLinkToken = function (token) {
            return __awaiter(this, void 0, void 0, function () {
                var now, row;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            now = new Date();
                            return [4 /*yield*/, this.qb()('telegram_link_tokens')
                                    .where('token', token)
                                    .andWhere('expires_at', '>', now)
                                    .whereNull('used_at')
                                    .first()];
                        case 1:
                            row = _a.sent();
                            if (!row) {
                                return [2 /*return*/, null];
                            }
                            return [4 /*yield*/, this.qb()('telegram_link_tokens')
                                    .where('id', row.id)
                                    .update({ used_at: now })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, row];
                    }
                });
            });
        };
        return TelegramRepository_1;
    }());
    __setFunctionName(_classThis, "TelegramRepository");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TelegramRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TelegramRepository = _classThis;
}();
exports.TelegramRepository = TelegramRepository;
