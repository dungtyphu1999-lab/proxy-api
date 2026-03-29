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
exports.UserTelegramService = void 0;
var common_1 = require("@nestjs/common");
var axios_1 = require("axios");
var uuid_1 = require("uuid");
var UserTelegramService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UserTelegramService = _classThis = /** @class */ (function () {
        function UserTelegramService_1(telegramRepository, configService, databaseService) {
            this.telegramRepository = telegramRepository;
            this.configService = configService;
            this.databaseService = databaseService;
            this.logger = new common_1.Logger(UserTelegramService.name);
            this.linkTokenTtlMinutes = 10;
            this.botToken = this.configService.get('TELEGRAM_BOT_TOKEN') || '';
            var rawBaseUrl = this.configService.get('WEB_BASE_URL') ||
                'https://bachhoammo.net';
            this.webBaseUrl = rawBaseUrl.replace(/\/+$/, '');
        }
        UserTelegramService_1.prototype.getConnectionStatus = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var connection;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.telegramRepository.findActiveByUserId(userId)];
                        case 1:
                            connection = _b.sent();
                            if (!connection) {
                                return [2 /*return*/, {
                                        is_connected: false,
                                    }];
                            }
                            return [2 /*return*/, {
                                    is_connected: true,
                                    telegram_user_id: String(connection.telegram_user_id),
                                    telegram_username: (_a = connection.telegram_username) !== null && _a !== void 0 ? _a : null,
                                    connected_at: connection.connected_at,
                                }];
                    }
                });
            });
        };
        UserTelegramService_1.prototype.disconnect = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var connection, user, displayName;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.telegramRepository.deactivateByUserId(userId)];
                        case 1:
                            connection = _b.sent();
                            if (!connection) {
                                return [2 /*return*/, {
                                        is_connected: false,
                                    }];
                            }
                            return [4 /*yield*/, this.findUserSummary(userId)];
                        case 2:
                            user = _b.sent();
                            displayName = (user === null || user === void 0 ? void 0 : user.shop_name) ||
                                (user === null || user === void 0 ? void 0 : user.full_name) ||
                                (user === null || user === void 0 ? void 0 : user.username) ||
                                (user === null || user === void 0 ? void 0 : user.email) ||
                                'tài khoản';
                            return [4 /*yield*/, this.sendMessage(connection.chat_id, [
                                    '🔓 Đã hủy liên kết Telegram',
                                    "\u2022 T\u00E0i kho\u1EA3n: ".concat(displayName),
                                    '• Trạng thái: Ngừng nhận thông báo từ bachhoammo.',
                                ].join('\n'))];
                        case 3:
                            _b.sent();
                            return [2 /*return*/, {
                                    is_connected: false,
                                    telegram_user_id: String(connection.telegram_user_id),
                                    telegram_username: (_a = connection.telegram_username) !== null && _a !== void 0 ? _a : null,
                                }];
                    }
                });
            });
        };
        UserTelegramService_1.prototype.getSettings = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var knex, existing, defaults;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            knex = this.databaseService.getKnex();
                            return [4 /*yield*/, knex('telegram_notification_settings')
                                    .where('user_id', userId)
                                    .first()];
                        case 1:
                            existing = _a.sent();
                            if (existing) {
                                return [2 /*return*/, {
                                        notify_new_message: existing.notify_new_message,
                                        notify_new_order: existing.notify_new_order,
                                        notify_new_preorder: existing.notify_new_preorder,
                                        notify_warranty_request: existing.notify_warranty_request,
                                        notify_new_complaint: existing.notify_new_complaint,
                                        notify_admin: existing.notify_admin,
                                    }];
                            }
                            defaults = this.getDefaultSettings();
                            return [4 /*yield*/, knex('telegram_notification_settings').insert(__assign(__assign({ user_id: userId }, defaults), { created_at: new Date(), updated_at: new Date() }))];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, defaults];
                    }
                });
            });
        };
        UserTelegramService_1.prototype.updateSettings = function (userId, input) {
            return __awaiter(this, void 0, void 0, function () {
                var current, next, knex;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getSettings(userId)];
                        case 1:
                            current = _a.sent();
                            next = __assign(__assign({}, current), input);
                            knex = this.databaseService.getKnex();
                            return [4 /*yield*/, knex('telegram_notification_settings')
                                    .where('user_id', userId)
                                    .update(__assign(__assign({}, next), { updated_at: new Date() }))];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, next];
                    }
                });
            });
        };
        UserTelegramService_1.prototype.createLinkToken = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var token, expiresAt;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            token = (0, uuid_1.v4)();
                            expiresAt = new Date(Date.now() + this.linkTokenTtlMinutes * 60 * 1000);
                            return [4 /*yield*/, this.telegramRepository.createLinkToken(userId, token, expiresAt)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, {
                                    token: token,
                                    expires_at: expiresAt,
                                }];
                    }
                });
            });
        };
        UserTelegramService_1.prototype.notifyUser = function (userId, type, text, options) {
            return __awaiter(this, void 0, void 0, function () {
                var connection, settings;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.telegramRepository.findActiveByUserId(userId)];
                        case 1:
                            connection = _a.sent();
                            if (!connection) {
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, this.getSettings(userId)];
                        case 2:
                            settings = _a.sent();
                            if (!this.isNotificationEnabled(settings, type)) {
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, this.sendMessage(connection.chat_id, text, options)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        UserTelegramService_1.prototype.notifyUsers = function (userIds, type, text, options) {
            return __awaiter(this, void 0, void 0, function () {
                var connections, knex, settingsRows, settingsMap, _i, settingsRows_1, row, defaults, tasks, results;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (userIds.length === 0) {
                                return [2 /*return*/, 0];
                            }
                            return [4 /*yield*/, this.telegramRepository.findActiveByUserIds(userIds)];
                        case 1:
                            connections = _a.sent();
                            if (connections.length === 0) {
                                return [2 /*return*/, 0];
                            }
                            knex = this.databaseService.getKnex();
                            return [4 /*yield*/, knex('telegram_notification_settings')
                                    .whereIn('user_id', userIds)
                                    .select('user_id', 'notify_new_message', 'notify_new_order', 'notify_new_preorder', 'notify_warranty_request', 'notify_new_complaint', 'notify_admin')];
                        case 2:
                            settingsRows = _a.sent();
                            settingsMap = new Map();
                            for (_i = 0, settingsRows_1 = settingsRows; _i < settingsRows_1.length; _i++) {
                                row = settingsRows_1[_i];
                                settingsMap.set(row.user_id, {
                                    notify_new_message: row.notify_new_message,
                                    notify_new_order: row.notify_new_order,
                                    notify_new_preorder: row.notify_new_preorder,
                                    notify_warranty_request: row.notify_warranty_request,
                                    notify_new_complaint: row.notify_new_complaint,
                                    notify_admin: row.notify_admin,
                                });
                            }
                            defaults = this.getDefaultSettings();
                            tasks = connections.map(function (connection) { return __awaiter(_this, void 0, void 0, function () {
                                var settings;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            settings = (_a = settingsMap.get(connection.user_id)) !== null && _a !== void 0 ? _a : defaults;
                                            if (!this.isNotificationEnabled(settings, type)) {
                                                return [2 /*return*/, false];
                                            }
                                            return [4 /*yield*/, this.sendMessage(connection.chat_id, text, options)];
                                        case 1:
                                            _b.sent();
                                            return [2 /*return*/, true];
                                    }
                                });
                            }); });
                            return [4 /*yield*/, Promise.allSettled(tasks)];
                        case 3:
                            results = _a.sent();
                            return [2 /*return*/, results.filter(function (result) { return result.status === 'fulfilled' && result.value; }).length];
                    }
                });
            });
        };
        UserTelegramService_1.prototype.notifyChat = function (chatId, text, options) {
            return __awaiter(this, void 0, void 0, function () {
                var normalizedChatId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            normalizedChatId = typeof chatId === 'string' ? chatId.trim() : String(chatId);
                            if (!normalizedChatId) {
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, this.sendMessage(normalizedChatId, text, options)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        };
        UserTelegramService_1.prototype.buildWebLink = function (path) {
            if (!path) {
                return this.webBaseUrl;
            }
            var normalized = path.trim();
            if (!normalized) {
                return this.webBaseUrl;
            }
            if (/^https?:\/\//i.test(normalized)) {
                return normalized;
            }
            return "".concat(this.webBaseUrl).concat(normalized.startsWith('/') ? '' : '/').concat(normalized);
        };
        UserTelegramService_1.prototype.buildInlineButton = function (text, path) {
            var url = this.buildWebLink(path);
            if (!this.isValidInlineUrl(url)) {
                return null;
            }
            return { text: text, url: url };
        };
        UserTelegramService_1.prototype.escapeHtml = function (text) {
            return text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        };
        UserTelegramService_1.prototype.buildHtmlLink = function (text, path) {
            var url = this.buildWebLink(path);
            return "<a href=\"".concat(this.escapeHtml(url), "\">").concat(this.escapeHtml(text), "</a>");
        };
        UserTelegramService_1.prototype.isValidInlineUrl = function (url) {
            try {
                var parsed = new URL(url);
                if (!['http:', 'https:'].includes(parsed.protocol)) {
                    return false;
                }
                var host = parsed.hostname.toLowerCase();
                if (host === 'localhost' ||
                    host === '127.0.0.1' ||
                    host === '0.0.0.0' ||
                    host.endsWith('.local')) {
                    return false;
                }
                return true;
            }
            catch (_a) {
                return false;
            }
        };
        UserTelegramService_1.prototype.findUserSummary = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var knex, row;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            knex = this.databaseService.getKnex();
                            return [4 /*yield*/, knex('users as u')
                                    .leftJoin('user_profiles as up', 'u.id', 'up.user_id')
                                    .leftJoin('shops as s', 'u.id', 's.owner_id')
                                    .select('u.id', 'u.username', 'u.email', 'up.full_name', 's.name as shop_name')
                                    .where('u.id', userId)
                                    .first()];
                        case 1:
                            row = _a.sent();
                            return [2 /*return*/, row !== null && row !== void 0 ? row : null];
                    }
                });
            });
        };
        UserTelegramService_1.prototype.getDefaultSettings = function () {
            return {
                notify_new_message: true,
                notify_new_order: true,
                notify_new_preorder: true,
                notify_warranty_request: true,
                notify_new_complaint: true,
                notify_admin: true,
            };
        };
        UserTelegramService_1.prototype.isNotificationEnabled = function (settings, type) {
            switch (type) {
                case 'new_message':
                    return settings.notify_new_message;
                case 'new_order':
                    return settings.notify_new_order;
                case 'new_preorder':
                    return settings.notify_new_preorder;
                case 'warranty_request':
                    return settings.notify_warranty_request;
                case 'new_complaint':
                    return settings.notify_new_complaint;
                case 'admin_notification':
                    return settings.notify_admin;
                default:
                    return false;
            }
        };
        UserTelegramService_1.prototype.sendMessage = function (chatId, text, options) {
            return __awaiter(this, void 0, void 0, function () {
                var payload, error_1, fallbackPayload, fallbackError_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.botToken) {
                                this.logger.warn('TELEGRAM_BOT_TOKEN is not configured.');
                                return [2 /*return*/];
                            }
                            payload = {
                                chat_id: chatId,
                                text: text,
                                parse_mode: options === null || options === void 0 ? void 0 : options.parse_mode,
                                disable_web_page_preview: options === null || options === void 0 ? void 0 : options.disable_preview,
                                reply_markup: options === null || options === void 0 ? void 0 : options.reply_markup,
                                message_thread_id: options === null || options === void 0 ? void 0 : options.message_thread_id,
                            };
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 8]);
                            return [4 /*yield*/, axios_1.default.post("https://api.telegram.org/bot".concat(this.botToken, "/sendMessage"), payload)];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 8];
                        case 3:
                            error_1 = _a.sent();
                            if (!((options === null || options === void 0 ? void 0 : options.message_thread_id) && options.allow_topic_fallback !== false)) return [3 /*break*/, 7];
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 6, , 7]);
                            fallbackPayload = __assign({}, payload);
                            delete fallbackPayload.message_thread_id;
                            return [4 /*yield*/, axios_1.default.post("https://api.telegram.org/bot".concat(this.botToken, "/sendMessage"), fallbackPayload)];
                        case 5:
                            _a.sent();
                            this.logger.warn("Failed to send with topic (".concat(options.message_thread_id, "), resent without topic."));
                            return [2 /*return*/];
                        case 6:
                            fallbackError_1 = _a.sent();
                            this.logger.error('Failed to send Telegram message (topic + fallback)', fallbackError_1);
                            return [2 /*return*/];
                        case 7:
                            this.logger.error('Failed to send Telegram message', error_1);
                            return [3 /*break*/, 8];
                        case 8: return [2 /*return*/];
                    }
                });
            });
        };
        return UserTelegramService_1;
    }());
    __setFunctionName(_classThis, "UserTelegramService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserTelegramService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserTelegramService = _classThis;
}();
exports.UserTelegramService = UserTelegramService;
