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
exports.ChatSocketService = void 0;
var common_1 = require("@nestjs/common");
var socket_message_dto_1 = require("../dto/socket-message.dto");
var ChatSocketService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ChatSocketService = _classThis = /** @class */ (function () {
        function ChatSocketService_1(chatService, chatRepository, userService, userTelegramService) {
            this.chatService = chatService;
            this.chatRepository = chatRepository;
            this.userService = userService;
            this.userTelegramService = userTelegramService;
            this.logger = new common_1.Logger(ChatSocketService.name);
        }
        /**
         * Send a message via socket and broadcast to conversation participants
         */
        ChatSocketService_1.prototype.sendMessage = function (userId, sendMessageDto) {
            return __awaiter(this, void 0, void 0, function () {
                var conversation, messageType, message, lastMessagePreview, recipientId, receiveMessageDto, updatedConversation, conversationUpdate, error_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            return [4 /*yield*/, this.chatRepository.findConversationById(sendMessageDto.conversation_id)];
                        case 1:
                            conversation = _a.sent();
                            if (!conversation) {
                                throw new Error('Conversation not found');
                            }
                            // Check if user is a participant in this conversation
                            if (conversation.initiator_id !== userId &&
                                conversation.participant_id !== userId) {
                                throw new Error('Access denied to this conversation');
                            }
                            if (!sendMessageDto.content && !sendMessageDto.file_url) {
                                throw new Error('Either content or file_url must be provided');
                            }
                            messageType = sendMessageDto.message_type ||
                                (sendMessageDto.file_url ? socket_message_dto_1.MessageType.IMAGE : socket_message_dto_1.MessageType.TEXT);
                            return [4 /*yield*/, this.chatRepository.createMessage(userId, {
                                    conversation_id: sendMessageDto.conversation_id,
                                    content: sendMessageDto.content || '',
                                    message_type: messageType,
                                    file_url: sendMessageDto.file_url,
                                    file_name: sendMessageDto.file_name,
                                    file_size: sendMessageDto.file_size,
                                    file_type: sendMessageDto.file_type,
                                })];
                        case 2:
                            message = _a.sent();
                            lastMessagePreview = !sendMessageDto.content && sendMessageDto.file_url
                                ? sendMessageDto.file_name || '[Image]'
                                : sendMessageDto.content || '';
                            return [4 /*yield*/, this.chatRepository.updateConversationLastMessage(sendMessageDto.conversation_id, lastMessagePreview, userId)];
                        case 3:
                            _a.sent();
                            recipientId = conversation.initiator_id === userId
                                ? conversation.participant_id
                                : conversation.initiator_id;
                            this.notifyTelegramNewMessage(recipientId, userId, lastMessagePreview).catch(function (error) {
                                _this.logger.warn("Failed to send Telegram chat notification: ".concat(error instanceof Error ? error.message : String(error)));
                            });
                            receiveMessageDto = {
                                id: message.id,
                                conversation_id: message.conversation_id,
                                sender_id: message.sender_id,
                                content: message.content,
                                message_type: message.message_type,
                                file_url: message.file_url,
                                file_name: message.file_name,
                                file_size: message.file_size,
                                file_type: message.file_type,
                                created_at: message.created_at,
                            };
                            return [4 /*yield*/, this.chatRepository.findConversationById(sendMessageDto.conversation_id)];
                        case 4:
                            updatedConversation = _a.sent();
                            conversationUpdate = {
                                conversation_id: conversation.id,
                                last_message: message.content,
                                unread_count: (updatedConversation === null || updatedConversation === void 0 ? void 0 : updatedConversation.unread_count) || 0,
                                last_message_at: message.created_at,
                            };
                            return [2 /*return*/, {
                                    message: receiveMessageDto,
                                    conversationUpdate: conversationUpdate,
                                    participants: [conversation.initiator_id, conversation.participant_id],
                                }];
                        case 5:
                            error_1 = _a.sent();
                            this.logger.error("Failed to send message: ".concat(error_1.message), error_1.stack);
                            throw error_1;
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Mark conversation as read (mark all messages in conversation as read)
         */
        ChatSocketService_1.prototype.markConversationAsRead = function (userId, markReadDto) {
            return __awaiter(this, void 0, void 0, function () {
                var conversation, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.chatRepository.findConversationById(markReadDto.conversation_id)];
                        case 1:
                            conversation = _a.sent();
                            if (!conversation) {
                                throw new Error('Conversation not found');
                            }
                            if (conversation.initiator_id !== userId &&
                                conversation.participant_id !== userId) {
                                throw new Error('Access denied to this conversation');
                            }
                            // Mark all messages in conversation as read and reset unread count
                            return [4 /*yield*/, this.chatRepository.markConversationAsRead(markReadDto.conversation_id, userId)];
                        case 2:
                            // Mark all messages in conversation as read and reset unread count
                            _a.sent();
                            this.logger.log("Conversation ".concat(markReadDto.conversation_id, " marked as read by user ").concat(userId));
                            return [3 /*break*/, 4];
                        case 3:
                            error_2 = _a.sent();
                            this.logger.error("Failed to mark conversation as read: ".concat(error_2.message), error_2.stack);
                            throw error_2;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get conversation participants for broadcasting
         */
        ChatSocketService_1.prototype.getConversationParticipants = function (conversationId) {
            return __awaiter(this, void 0, void 0, function () {
                var conversation;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.chatRepository.findConversationById(conversationId)];
                        case 1:
                            conversation = _a.sent();
                            if (!conversation) {
                                return [2 /*return*/, []];
                            }
                            return [2 /*return*/, [conversation.initiator_id, conversation.participant_id]];
                    }
                });
            });
        };
        ChatSocketService_1.prototype.notifyTelegramNewMessage = function (recipientId, senderId, preview) {
            return __awaiter(this, void 0, void 0, function () {
                var sender, senderName, messagePreview, safeSenderName, safePreview, button, lines, text;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!recipientId || recipientId === senderId) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.userService.findById(senderId)];
                        case 1:
                            sender = _a.sent();
                            senderName = (sender === null || sender === void 0 ? void 0 : sender.username) || (sender === null || sender === void 0 ? void 0 : sender.email) || 'Một người dùng';
                            messagePreview = this.truncateText(preview || '[Tin nhắn mới]', 180);
                            safeSenderName = this.userTelegramService.escapeHtml(senderName);
                            safePreview = this.userTelegramService.escapeHtml(messagePreview);
                            button = this.userTelegramService.buildInlineButton('Xem và trả lời');
                            lines = [
                                '📩 <b>Tin nhắn mới</b>',
                                '----------------------',
                                "\uD83D\uDC64 <b>T\u1EEB:</b> ".concat(safeSenderName),
                                "\uD83D\uDCAC <b>N\u1ED9i dung:</b> ".concat(safePreview),
                            ];
                            if (!button) {
                                lines.push('👉 Mở bachhoammo để xem và trả lời.');
                            }
                            text = lines.join('\n');
                            return [4 /*yield*/, this.userTelegramService.notifyUser(recipientId, 'new_message', text, {
                                    parse_mode: 'HTML',
                                    disable_preview: true,
                                    reply_markup: button ? { inline_keyboard: [[button]] } : undefined,
                                })];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ChatSocketService_1.prototype.truncateText = function (text, maxLength) {
            if (text.length <= maxLength) {
                return text;
            }
            return "".concat(text.slice(0, maxLength - 3), "...");
        };
        /**
         * Validate user access to conversation
         */
        ChatSocketService_1.prototype.validateConversationAccess = function (userId, conversationId) {
            return __awaiter(this, void 0, void 0, function () {
                var conversation;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.chatRepository.findConversationById(conversationId)];
                        case 1:
                            conversation = _a.sent();
                            if (!conversation) {
                                return [2 /*return*/, false];
                            }
                            return [2 /*return*/, (conversation.initiator_id === userId ||
                                    conversation.participant_id === userId)];
                    }
                });
            });
        };
        /**
         * Handle user joining a conversation
         */
        ChatSocketService_1.prototype.joinConversation = function (userId, conversationId) {
            return __awaiter(this, void 0, void 0, function () {
                var hasAccess;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.validateConversationAccess(userId, conversationId)];
                        case 1:
                            hasAccess = _a.sent();
                            if (!hasAccess) {
                                throw new Error('Access denied to this conversation');
                            }
                            this.logger.log("User ".concat(userId, " joined conversation ").concat(conversationId));
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Handle user leaving a conversation
         */
        ChatSocketService_1.prototype.leaveConversation = function (userId, conversationId) {
            this.logger.log("User ".concat(userId, " left conversation ").concat(conversationId));
        };
        /**
         * Handle typing indicators
         */
        ChatSocketService_1.prototype.handleTypingStart = function (userId, conversationId) {
            return __awaiter(this, void 0, void 0, function () {
                var hasAccess;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.validateConversationAccess(userId, conversationId)];
                        case 1:
                            hasAccess = _a.sent();
                            if (!hasAccess) {
                                throw new Error('Access denied to this conversation');
                            }
                            this.logger.log("User ".concat(userId, " started typing in conversation ").concat(conversationId));
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Handle typing stop indicators
         */
        ChatSocketService_1.prototype.handleTypingStop = function (userId, conversationId) {
            this.logger.log("User ".concat(userId, " stopped typing in conversation ").concat(conversationId));
        };
        /**
         * Get unread messages for user when connecting
         */
        ChatSocketService_1.prototype.getUnreadMessagesForUser = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.chatRepository.getUnreadMessagesForUser(userId)];
                });
            });
        };
        return ChatSocketService_1;
    }());
    __setFunctionName(_classThis, "ChatSocketService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChatSocketService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChatSocketService = _classThis;
}();
exports.ChatSocketService = ChatSocketService;
