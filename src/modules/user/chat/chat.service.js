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
exports.ChatService = void 0;
var common_1 = require("@nestjs/common");
var create_message_dto_1 = require("./dto/create-message.dto");
var search_chat_dto_1 = require("./dto/search-chat.dto");
var get_conversations_dto_1 = require("./dto/get-conversations.dto");
var socket_message_dto_1 = require("./dto/socket-message.dto");
var WELCOME_MESSAGE_CONTENT = "Ch\u00E0o m\u1EEBng b\u1EA1n \u0111\u1EBFn v\u1EDBi bachhoammo! M\u00ECnh l\u00E0 nh\u00E2n vi\u00EAn h\u1ED7 tr\u1EE3. N\u1EBFu b\u1EA1n c\u1EA7n gi\u00FAp \u0111\u1EE1 g\u00EC, c\u1EE9 nh\u1EAFn tin cho m\u00ECnh \u1EDF \u0111\u00E2y nh\u00E9.\n\nL\u01B0u \u00FD: N\u1EBFu ng\u01B0\u1EDDi b\u00E1n h\u01B0\u1EDBng d\u1EABn b\u1EA1n Ra Ngo\u00E0i bachhoammo \u0111\u1EC3 b\u1EA3o h\u00E0nh, \u0111\u1ED5i h\u00E0ng, vv.... H\u00E3y khi\u1EBFu n\u1EA1i \u0111\u01A1n h\u00E0ng v\u00E0 th\u00F4ng b\u00E1o cho support \u0111\u1EC3 \u0111\u01B0\u1EE3c \u0111\u1EA3m b\u1EA3o quy\u1EC1n l\u1EE3i v\u00E0 x\u1EED l\u00FD theo h\u01B0\u1EDBng ho\u00E0n ti\u1EC1n \u0111\u01A1n h\u00E0ng.";
var buildSellerGreetingContent = function (shopName) {
    return "Xin ch\u00E0o! M\u00ECnh l\u00E0 ".concat(shopName ? shopName : 'cửa hàng', ". C\u1EA3m \u01A1n b\u1EA1n \u0111\u00E3 quan t\u00E2m s\u1EA3n ph\u1EA9m. B\u1EA1n c\u1EA7n m\u00ECnh h\u1ED7 tr\u1EE3 th\u00F4ng tin g\u00EC th\u00EAm kh\u00F4ng?");
};
var ChatService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var ChatService = _classThis = /** @class */ (function () {
        function ChatService_1(chatRepository, userService, shopsRepository, chatGateway, userTelegramService) {
            this.chatRepository = chatRepository;
            this.userService = userService;
            this.shopsRepository = shopsRepository;
            this.chatGateway = chatGateway;
            this.userTelegramService = userTelegramService;
            this.logger = new common_1.Logger(ChatService.name);
        }
        ChatService_1.prototype.getConversations = function (userId, params) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, items, total, _b, page, _c, pageSize;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.chatRepository.findConversationsByUserId(userId, params)];
                        case 1:
                            _a = _d.sent(), items = _a.items, total = _a.total;
                            _b = params.page, page = _b === void 0 ? 1 : _b, _c = params.take, pageSize = _c === void 0 ? 10 : _c;
                            return [2 /*return*/, {
                                    items: items,
                                    pagination: {
                                        page: page,
                                        pageSize: pageSize,
                                        total: total,
                                    },
                                }];
                    }
                });
            });
        };
        ChatService_1.prototype.createConversation = function (userId, createDto) {
            return __awaiter(this, void 0, void 0, function () {
                var normalizedParticipantUserId, normalizedTitle, normalizedShopId, shopNameForGreeting, _a, user, shop, _b, conversation, is_new;
                var _this = this;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            // Prevent creating conversation with self
                            if (userId === createDto.participant_id) {
                                throw new common_1.BadRequestException('Cannot create conversation with yourself');
                            }
                            normalizedParticipantUserId = createDto.participant_id;
                            normalizedTitle = createDto.title;
                            _a = createDto.type;
                            switch (_a) {
                                case get_conversations_dto_1.ConversationType.USER_TO_USER: return [3 /*break*/, 1];
                                case get_conversations_dto_1.ConversationType.USER_TO_ADMIN: return [3 /*break*/, 1];
                                case get_conversations_dto_1.ConversationType.ADMIN_TO_USER: return [3 /*break*/, 1];
                                case get_conversations_dto_1.ConversationType.USER_TO_SHOP: return [3 /*break*/, 3];
                            }
                            return [3 /*break*/, 5];
                        case 1: return [4 /*yield*/, this.userService.findById(createDto.participant_id)];
                        case 2:
                            user = _c.sent();
                            if (!user) {
                                throw new common_1.BadRequestException("User with ID ".concat(createDto.participant_id, " does not exist"));
                            }
                            return [3 /*break*/, 6];
                        case 3: return [4 /*yield*/, this.shopsRepository.findById(createDto.participant_id)];
                        case 4:
                            shop = _c.sent();
                            if (!shop) {
                                throw new common_1.BadRequestException("Shop with ID ".concat(createDto.participant_id, " does not exist"));
                            }
                            normalizedParticipantUserId = shop.owner_id;
                            normalizedTitle = normalizedTitle || shop.name;
                            normalizedShopId = shop.id;
                            shopNameForGreeting = shop.name;
                            return [3 /*break*/, 6];
                        case 5: throw new common_1.BadRequestException("Invalid conversation type: ".concat(createDto.type));
                        case 6: return [4 /*yield*/, this.chatRepository.findOrCreateConversation(userId, normalizedParticipantUserId, createDto.type, normalizedTitle, normalizedShopId)];
                        case 7:
                            _b = _c.sent(), conversation = _b.conversation, is_new = _b.is_new;
                            if (is_new && createDto.type === get_conversations_dto_1.ConversationType.USER_TO_SHOP) {
                                this.sendSellerGreetingMessage(conversation.id, normalizedParticipantUserId, userId, shopNameForGreeting).catch(function (error) {
                                    _this.logger.warn("Failed to send seller greeting message: ".concat(error instanceof Error ? error.message : String(error)));
                                });
                            }
                            return [2 /*return*/, conversation];
                    }
                });
            });
        };
        ChatService_1.prototype.getMessages = function (userId, params) {
            return __awaiter(this, void 0, void 0, function () {
                var conversation, error_1, _a, items, total;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.chatRepository.findConversationById(params.conversation_id)];
                        case 1:
                            conversation = _b.sent();
                            if (!conversation) {
                                throw new common_1.BadRequestException('Conversation not found');
                            }
                            // Check if user is a participant in this conversation
                            if (conversation.initiator_id !== userId &&
                                conversation.participant_id !== userId) {
                                throw new common_1.BadRequestException('Access denied to this conversation');
                            }
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.chatRepository.markConversationAsRead(params.conversation_id, userId)];
                        case 3:
                            _b.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _b.sent();
                            // Log error but don't fail the request if mark read fails
                            console.error("Failed to mark conversation as read: ".concat(error_1.message));
                            return [3 /*break*/, 5];
                        case 5: return [4 /*yield*/, this.chatRepository.findMessagesByConversationId(params.conversation_id, params)];
                        case 6:
                            _a = _b.sent(), items = _a.items, total = _a.total;
                            return [2 /*return*/, {
                                    items: items,
                                    pagination: {
                                        page: params.page,
                                        pageSize: params.take,
                                        total: total,
                                    },
                                }];
                    }
                });
            });
        };
        ChatService_1.prototype.createMessage = function (userId, createDto) {
            return __awaiter(this, void 0, void 0, function () {
                var conversation, messageType, messageData, messageDataWithContent, newMessage, lastMessagePreview;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.chatRepository.findConversationById(createDto.conversation_id)];
                        case 1:
                            conversation = _a.sent();
                            if (!conversation) {
                                throw new common_1.BadRequestException('Conversation not found');
                            }
                            // Check if user is a participant in this conversation
                            if (conversation.initiator_id !== userId &&
                                conversation.participant_id !== userId) {
                                throw new common_1.BadRequestException('Access denied to this conversation');
                            }
                            if (!createDto.content && !createDto.file_url) {
                                throw new common_1.BadRequestException('Either content or file_url must be provided');
                            }
                            messageType = createDto.message_type ||
                                (createDto.file_url ? create_message_dto_1.MessageType.IMAGE : create_message_dto_1.MessageType.TEXT);
                            messageData = __assign(__assign({}, createDto), { message_type: messageType });
                            messageDataWithContent = __assign(__assign({}, messageData), { content: messageData.content || '' });
                            return [4 /*yield*/, this.chatRepository.createMessage(userId, messageDataWithContent)];
                        case 2:
                            newMessage = _a.sent();
                            lastMessagePreview = !createDto.content && createDto.file_url
                                ? createDto.file_name || '[Image]'
                                : createDto.content || '';
                            return [4 /*yield*/, this.chatRepository.updateConversationLastMessage(createDto.conversation_id, lastMessagePreview, userId)];
                        case 3:
                            _a.sent();
                            this.notifyTelegramNewMessage(conversation.initiator_id === userId
                                ? conversation.participant_id
                                : conversation.initiator_id, userId, lastMessagePreview).catch(function (error) {
                                _this.logger.warn("Failed to send Telegram chat notification: ".concat(error instanceof Error ? error.message : String(error)));
                            });
                            return [2 /*return*/, newMessage];
                    }
                });
            });
        };
        ChatService_1.prototype.searchChat = function (userId, params) {
            return __awaiter(this, void 0, void 0, function () {
                var query, _a, type, conversation_id, limit, conversations, messages, contacts, total;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            query = params.query, _a = params.type, type = _a === void 0 ? search_chat_dto_1.SearchType.ALL : _a, conversation_id = params.conversation_id;
                            limit = 50;
                            conversations = [];
                            messages = [];
                            contacts = [];
                            if (!(type === search_chat_dto_1.SearchType.ALL || type === search_chat_dto_1.SearchType.CONVERSATIONS)) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.chatRepository.searchConversations(userId, query, limit)];
                        case 1:
                            conversations = _b.sent();
                            _b.label = 2;
                        case 2:
                            if (!(type === search_chat_dto_1.SearchType.ALL || type === search_chat_dto_1.SearchType.MESSAGES)) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.chatRepository.searchMessages(userId, query, conversation_id, limit)];
                        case 3:
                            messages = _b.sent();
                            _b.label = 4;
                        case 4:
                            if (!(type === search_chat_dto_1.SearchType.ALL || type === search_chat_dto_1.SearchType.CONTACTS)) return [3 /*break*/, 6];
                            return [4 /*yield*/, this.chatRepository.searchContacts(userId, query, limit)];
                        case 5:
                            contacts = _b.sent();
                            _b.label = 6;
                        case 6:
                            total = conversations.length + messages.length + contacts.length;
                            return [2 /*return*/, {
                                    conversations: conversations,
                                    messages: messages,
                                    contacts: contacts,
                                    total: total,
                                }];
                    }
                });
            });
        };
        ChatService_1.prototype.getTotalUnreadCount = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var totalUnreadCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.chatRepository.getTotalUnreadCount(userId)];
                        case 1:
                            totalUnreadCount = _a.sent();
                            return [2 /*return*/, {
                                    total_unread_count: totalUnreadCount,
                                }];
                    }
                });
            });
        };
        ChatService_1.prototype.getConversationDetails = function (userId, conversationId) {
            return __awaiter(this, void 0, void 0, function () {
                var conversation;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.chatRepository.findConversationDetailsById(conversationId, userId)];
                        case 1:
                            conversation = _a.sent();
                            if (!conversation) {
                                throw new common_1.BadRequestException('Conversation not found');
                            }
                            return [2 /*return*/, conversation];
                    }
                });
            });
        };
        /**
         * Send welcome message from admin to user if not already sent
         * This method is called after user login to send initial welcome message
         */
        ChatService_1.prototype.sendWelcomeMessageIfNeeded = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var user, hasAdminRole, adminUser, adminUserId, conversation, message, updatedConversation, receiveMessageDto, conversationUpdate, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 9, , 10]);
                            return [4 /*yield*/, this.userService.findById(userId)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                console.error("User with ID ".concat(userId, " not found"));
                                return [2 /*return*/];
                            }
                            // Skip if user already received welcome message
                            if (user.has_received_welcome_message) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.userService.hasAdminRole(userId)];
                        case 2:
                            hasAdminRole = _a.sent();
                            if (hasAdminRole) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.userService.findAdminUser()];
                        case 3:
                            adminUser = _a.sent();
                            if (!adminUser) {
                                console.error('No admin user found in the system');
                                return [2 /*return*/];
                            }
                            adminUserId = adminUser.id;
                            return [4 /*yield*/, this.chatRepository.findOrCreateConversation(adminUserId, userId, get_conversations_dto_1.ConversationType.ADMIN_TO_USER, 'Hỗ trợ khách hàng')];
                        case 4:
                            conversation = (_a.sent()).conversation;
                            return [4 /*yield*/, this.chatRepository.createMessage(adminUserId, {
                                    conversation_id: conversation.id,
                                    content: WELCOME_MESSAGE_CONTENT,
                                    message_type: create_message_dto_1.MessageType.TEXT,
                                })];
                        case 5:
                            message = _a.sent();
                            // Update conversation last message
                            return [4 /*yield*/, this.chatRepository.updateConversationLastMessage(conversation.id, WELCOME_MESSAGE_CONTENT.substring(0, 100), // Preview first 100 chars
                                adminUserId)];
                        case 6:
                            // Update conversation last message
                            _a.sent();
                            return [4 /*yield*/, this.chatRepository.findConversationById(conversation.id)];
                        case 7:
                            updatedConversation = _a.sent();
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
                            conversationUpdate = {
                                conversation_id: conversation.id,
                                last_message: WELCOME_MESSAGE_CONTENT.substring(0, 100),
                                unread_count: (updatedConversation === null || updatedConversation === void 0 ? void 0 : updatedConversation.unread_count) || 1,
                                last_message_at: message.created_at,
                            };
                            // Emit WebSocket notifications to conversation room (if user has joined)
                            this.chatGateway.emitToConversation(conversation.id, receiveMessageDto, conversationUpdate);
                            // Also emit directly to user if they are online (in case they haven't joined the room yet)
                            if (this.chatGateway.isUserOnline(userId)) {
                                this.chatGateway.sendToUser(userId, socket_message_dto_1.SocketEvents.RECEIVE_MESSAGE, receiveMessageDto);
                                this.chatGateway.sendToUser(userId, socket_message_dto_1.SocketEvents.CONVERSATION_UPDATED, conversationUpdate);
                            }
                            // Send unread message count notification to user
                            this.chatGateway.sendToUser(userId, 'unread_message_count', {
                                conversation_id: conversation.id,
                                unread_count: conversationUpdate.unread_count,
                                message_preview: WELCOME_MESSAGE_CONTENT.substring(0, 50),
                                sender_id: adminUserId,
                            });
                            // Mark user as having received welcome message
                            return [4 /*yield*/, this.userService.updateUser(userId, {
                                    has_received_welcome_message: true,
                                })];
                        case 8:
                            // Mark user as having received welcome message
                            _a.sent();
                            return [3 /*break*/, 10];
                        case 9:
                            error_2 = _a.sent();
                            // Log error but don't fail the login process
                            console.error('Failed to send welcome message:', error_2.message, error_2.stack);
                            return [3 /*break*/, 10];
                        case 10: return [2 /*return*/];
                    }
                });
            });
        };
        ChatService_1.prototype.notifyTelegramNewMessage = function (recipientId, senderId, preview) {
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
        ChatService_1.prototype.truncateText = function (text, maxLength) {
            if (text.length <= maxLength) {
                return text;
            }
            return "".concat(text.slice(0, maxLength - 3), "...");
        };
        ChatService_1.prototype.sendSellerGreetingMessage = function (conversationId, sellerUserId, buyerUserId, shopName) {
            return __awaiter(this, void 0, void 0, function () {
                var greetingContent, message, updatedConversation, receiveMessageDto, conversationUpdate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            greetingContent = buildSellerGreetingContent(shopName);
                            return [4 /*yield*/, this.chatRepository.createMessage(sellerUserId, {
                                    conversation_id: conversationId,
                                    content: greetingContent,
                                    message_type: create_message_dto_1.MessageType.TEXT,
                                })];
                        case 1:
                            message = _a.sent();
                            return [4 /*yield*/, this.chatRepository.updateConversationLastMessage(conversationId, greetingContent.substring(0, 100), sellerUserId)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.chatRepository.findConversationById(conversationId)];
                        case 3:
                            updatedConversation = _a.sent();
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
                            conversationUpdate = {
                                conversation_id: conversationId,
                                last_message: greetingContent.substring(0, 100),
                                unread_count: (updatedConversation === null || updatedConversation === void 0 ? void 0 : updatedConversation.unread_count) || 1,
                                last_message_at: message.created_at,
                            };
                            this.chatGateway.emitToConversation(conversationId, receiveMessageDto, conversationUpdate);
                            if (this.chatGateway.isUserOnline(buyerUserId)) {
                                this.chatGateway.sendToUser(buyerUserId, socket_message_dto_1.SocketEvents.RECEIVE_MESSAGE, receiveMessageDto);
                                this.chatGateway.sendToUser(buyerUserId, socket_message_dto_1.SocketEvents.CONVERSATION_UPDATED, conversationUpdate);
                            }
                            this.chatGateway.sendToUser(buyerUserId, 'unread_message_count', {
                                conversation_id: conversationId,
                                unread_count: conversationUpdate.unread_count,
                                message_preview: greetingContent.substring(0, 50),
                                sender_id: sellerUserId,
                            });
                            return [2 /*return*/];
                    }
                });
            });
        };
        return ChatService_1;
    }());
    __setFunctionName(_classThis, "ChatService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChatService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChatService = _classThis;
}();
exports.ChatService = ChatService;
