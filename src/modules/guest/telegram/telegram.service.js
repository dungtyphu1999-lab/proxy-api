"use strict";
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
exports.TelegramService = void 0;
var common_1 = require("@nestjs/common");
var axios_1 = require("axios");
var TelegramService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var TelegramService = _classThis = /** @class */ (function () {
        function TelegramService_1(configService, telegramRepository, databaseService) {
            this.configService = configService;
            this.telegramRepository = telegramRepository;
            this.databaseService = databaseService;
            this.logger = new common_1.Logger(TelegramService.name);
            this.botToken = this.configService.get('TELEGRAM_BOT_TOKEN') || '';
        }
        TelegramService_1.prototype.handleWebhook = function (update) {
            return __awaiter(this, void 0, void 0, function () {
                var message, chatId, chatType, from, text, startPayload, linkToken, tokenRecord, userId, existingTelegramConnection, linkedUser, linkedName, user, displayName;
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            message = this.extractMessage(update);
                            if (!message) {
                                return [2 /*return*/];
                            }
                            chatId = (_a = message.chat) === null || _a === void 0 ? void 0 : _a.id;
                            chatType = (_b = message.chat) === null || _b === void 0 ? void 0 : _b.type;
                            from = message.from;
                            if (!chatId || !from) {
                                return [2 /*return*/];
                            }
                            // Link/unlink flow is only supported in private chat with bot.
                            // Ignore group/topic messages to avoid noisy "Chưa liên kết tài khoản" replies.
                            if (chatType !== 'private') {
                                return [2 /*return*/];
                            }
                            text = typeof message.text === 'string' ? message.text.trim() : undefined;
                            if (!text) {
                                return [2 /*return*/];
                            }
                            if (!this.isDisconnectCommand(text)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.handleDisconnect(chatId, String(from.id))];
                        case 1:
                            _d.sent();
                            return [2 /*return*/];
                        case 2:
                            startPayload = this.extractStartPayload(text);
                            if (startPayload === undefined) {
                                return [2 /*return*/];
                            }
                            if (!!startPayload) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.sendMessage(chatId, this.buildMissingPayloadMessage(), {
                                    parse_mode: 'HTML',
                                    disable_preview: true,
                                })];
                        case 3:
                            _d.sent();
                            return [2 /*return*/];
                        case 4:
                            linkToken = this.parseLinkToken(startPayload);
                            if (!!linkToken) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.sendMessage(chatId, this.buildInvalidPayloadMessage(), {
                                    parse_mode: 'HTML',
                                    disable_preview: true,
                                })];
                        case 5:
                            _d.sent();
                            return [2 /*return*/];
                        case 6: return [4 /*yield*/, this.telegramRepository.consumeLinkToken(linkToken)];
                        case 7:
                            tokenRecord = _d.sent();
                            if (!!tokenRecord) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.sendMessage(chatId, this.buildInvalidPayloadMessage(), {
                                    parse_mode: 'HTML',
                                    disable_preview: true,
                                })];
                        case 8:
                            _d.sent();
                            return [2 /*return*/];
                        case 9:
                            userId = tokenRecord.user_id;
                            return [4 /*yield*/, this.telegramRepository.findActiveByTelegramUserId(String(from.id))];
                        case 10:
                            existingTelegramConnection = _d.sent();
                            if (!existingTelegramConnection) return [3 /*break*/, 13];
                            return [4 /*yield*/, this.findUserSummary(existingTelegramConnection.user_id)];
                        case 11:
                            linkedUser = _d.sent();
                            linkedName = (linkedUser === null || linkedUser === void 0 ? void 0 : linkedUser.shop_name) ||
                                (linkedUser === null || linkedUser === void 0 ? void 0 : linkedUser.full_name) ||
                                (linkedUser === null || linkedUser === void 0 ? void 0 : linkedUser.username) ||
                                (linkedUser === null || linkedUser === void 0 ? void 0 : linkedUser.email) ||
                                'tài khoản khác';
                            return [4 /*yield*/, this.sendMessage(chatId, this.buildAlreadyLinkedMessage(linkedName), { parse_mode: 'HTML', disable_preview: true })];
                        case 12:
                            _d.sent();
                            return [2 /*return*/];
                        case 13: return [4 /*yield*/, this.findUserSummary(userId)];
                        case 14:
                            user = _d.sent();
                            if (!!user) return [3 /*break*/, 16];
                            return [4 /*yield*/, this.sendMessage(chatId, this.buildInvalidPayloadMessage(), {
                                    parse_mode: 'HTML',
                                    disable_preview: true,
                                })];
                        case 15:
                            _d.sent();
                            return [2 /*return*/];
                        case 16: return [4 /*yield*/, this.telegramRepository.upsertConnection({
                                user_id: userId,
                                telegram_user_id: String(from.id),
                                chat_id: String(chatId),
                                telegram_username: (_c = from.username) !== null && _c !== void 0 ? _c : null,
                            })];
                        case 17:
                            _d.sent();
                            displayName = user.shop_name || user.full_name || user.username || user.email || 'bạn';
                            return [4 /*yield*/, this.sendMessage(chatId, this.buildWelcomeMessage(displayName), {
                                    parse_mode: 'HTML',
                                    disable_preview: true,
                                })];
                        case 18:
                            _d.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        TelegramService_1.prototype.extractMessage = function (update) {
            var _a;
            return (update.message ||
                update.edited_message ||
                update.channel_post ||
                update.edited_channel_post ||
                ((_a = update.callback_query) === null || _a === void 0 ? void 0 : _a.message) ||
                null);
        };
        TelegramService_1.prototype.extractStartPayload = function (text) {
            var _a;
            var match = text.match(/^\/start(?:@\w+)?(?:\s+(.+))?$/i);
            if (!match) {
                return undefined;
            }
            var payload = (_a = match[1]) === null || _a === void 0 ? void 0 : _a.trim();
            return payload && payload.length > 0 ? payload : null;
        };
        TelegramService_1.prototype.isDisconnectCommand = function (text) {
            return /^\/disconnect(?:@\w+)?$/i.test(text);
        };
        TelegramService_1.prototype.parseLinkToken = function (payload) {
            var trimmed = payload.trim();
            if (!trimmed) {
                return null;
            }
            var raw = trimmed.startsWith('link_') ? trimmed.slice(5) : trimmed;
            if (!raw) {
                return null;
            }
            if (/^[0-9a-fA-F-]{16,64}$/.test(raw) &&
                !raw.toLowerCase().startsWith('web_connect')) {
                return raw;
            }
            return null;
        };
        TelegramService_1.prototype.findUserSummary = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var row;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.databaseService
                                .getKnex()('users as u')
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
        TelegramService_1.prototype.buildWelcomeMessage = function (displayName) {
            return [
                '✅ <b>Liên kết Telegram thành công</b>',
                '----------------------',
                '',
                "\uD83D\uDC4B <b>Xin ch\u00E0o:</b> ".concat(this.escapeHtml(displayName)),
                '🔗 <b>Tài khoản:</b> bachhoammo',
                '',
                '<b>Thông báo bạn sẽ nhận:</b>',
                '• 📩 Tin nhắn mới',
                '• 🛒 Đơn hàng mới',
                '• ✅ Đơn hàng hoàn thành',
                '• ⚠️ Khiếu nại',
                '',
                '👉 Cài đặt thông báo trên website bachhoammo.',
            ].join('\n');
        };
        TelegramService_1.prototype.buildAlreadyLinkedMessage = function (displayName) {
            return [
                '⚠️ <b>Telegram đã được liên kết</b>',
                '----------------------',
                "\uD83D\uDC64 <b>T\u00E0i kho\u1EA3n hi\u1EC7n t\u1EA1i:</b> ".concat(this.escapeHtml(displayName)),
                '',
                '👉 Nếu muốn liên kết tài khoản khác, hãy /disconnect trước.',
            ].join('\n');
        };
        TelegramService_1.prototype.buildMissingPayloadMessage = function () {
            return [
                '⚠️ <b>Chưa liên kết tài khoản</b>',
                '----------------------',
                'Vui lòng quay lại website bachhoammo và nhấn “Kết nối Telegram”.',
            ].join('\n');
        };
        TelegramService_1.prototype.buildInvalidPayloadMessage = function () {
            return [
                '⚠️ <b>Liên kết không hợp lệ hoặc đã hết hạn</b>',
                '----------------------',
                'Vui lòng quay lại website bachhoammo và nhấn “Kết nối Telegram” để tạo liên kết mới.',
            ].join('\n');
        };
        TelegramService_1.prototype.handleDisconnect = function (chatId, telegramUserId) {
            return __awaiter(this, void 0, void 0, function () {
                var connection, user, displayName;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.telegramRepository.deactivateByTelegramUserId(telegramUserId)];
                        case 1:
                            connection = _a.sent();
                            if (!!connection) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.sendMessage(chatId, 'Telegram của bạn chưa được liên kết với tài khoản nào.')];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                        case 3: return [4 /*yield*/, this.findUserSummary(connection.user_id)];
                        case 4:
                            user = _a.sent();
                            displayName = (user === null || user === void 0 ? void 0 : user.shop_name) ||
                                (user === null || user === void 0 ? void 0 : user.full_name) ||
                                (user === null || user === void 0 ? void 0 : user.username) ||
                                (user === null || user === void 0 ? void 0 : user.email) ||
                                'tài khoản';
                            return [4 /*yield*/, this.sendMessage(chatId, [
                                    '🔓 <b>Đã hủy liên kết Telegram</b>',
                                    '----------------------',
                                    "\uD83D\uDC64 <b>T\u00E0i kho\u1EA3n:</b> ".concat(this.escapeHtml(displayName)),
                                    '✅ <b>Trạng thái:</b> Ngừng nhận thông báo từ bachhoammo.',
                                ].join('\n'), { parse_mode: 'HTML', disable_preview: true })];
                        case 5:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        TelegramService_1.prototype.escapeHtml = function (text) {
            return text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        };
        TelegramService_1.prototype.sendMessage = function (chatId, text, options) {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!this.botToken) {
                                this.logger.warn('TELEGRAM_BOT_TOKEN is not configured.');
                                return [2 /*return*/];
                            }
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, axios_1.default.post("https://api.telegram.org/bot".concat(this.botToken, "/sendMessage"), {
                                    chat_id: chatId,
                                    text: text,
                                    parse_mode: options === null || options === void 0 ? void 0 : options.parse_mode,
                                    disable_web_page_preview: options === null || options === void 0 ? void 0 : options.disable_preview,
                                })];
                        case 2:
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            this.logger.error('Failed to send Telegram message', error_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        return TelegramService_1;
    }());
    __setFunctionName(_classThis, "TelegramService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        TelegramService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return TelegramService = _classThis;
}();
exports.TelegramService = TelegramService;
