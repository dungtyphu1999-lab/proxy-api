"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
exports.ChatGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var common_1 = require("@nestjs/common");
var socket_message_dto_1 = require("./dto/socket-message.dto");
var ChatGateway = function () {
    var _classDecorators = [(0, websockets_1.WebSocketGateway)({
            namespace: '/chat',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _server_decorators;
    var _server_initializers = [];
    var _server_extraInitializers = [];
    var _handleAuth_decorators;
    var _handleSendMessage_decorators;
    var _handleMarkConversationRead_decorators;
    var _handleJoinConversation_decorators;
    var _handleLeaveConversation_decorators;
    var _handleTypingStart_decorators;
    var _handleTypingStop_decorators;
    var ChatGateway = _classThis = /** @class */ (function () {
        function ChatGateway_1(chatSocketService, jwtService, appConfigService) {
            this.chatSocketService = (__runInitializers(this, _instanceExtraInitializers), chatSocketService);
            this.jwtService = jwtService;
            this.appConfigService = appConfigService;
            this.server = __runInitializers(this, _server_initializers, void 0);
            this.logger = (__runInitializers(this, _server_extraInitializers), new common_1.Logger(ChatGateway.name));
            this.connectedUsers = new Map();
            this.onlineUsers = new Map();
        }
        ChatGateway_1.prototype.afterInit = function () {
            this.logger.log('Chat Gateway initialized');
            this.logger.log("Chat Gateway namespace: /chat");
        };
        ChatGateway_1.prototype.handleConnection = function (client) {
            return __awaiter(this, void 0, void 0, function () {
                var user, userId, onlineUser, conversations, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.logger.log("New socket connection attempt: ".concat(client.id));
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, this.authenticateUser(client)];
                        case 2:
                            user = _a.sent();
                            if (!user) {
                                client.disconnect();
                                return [2 /*return*/];
                            }
                            client.data = { user: user };
                            userId = user.id;
                            this.connectedUsers.set(userId, client.id);
                            onlineUser = {
                                user_id: userId,
                                username: user.username,
                                email: user.email,
                                status: 'online',
                                last_seen: new Date(),
                            };
                            this.onlineUsers.set(userId, onlineUser);
                            conversations = this.getUserConversations(userId);
                            return [4 /*yield*/, Promise.all(conversations.map(function (conversationId) {
                                    return client.join("conversation:".concat(conversationId));
                                }))];
                        case 3:
                            _a.sent();
                            // Emit user online status to all connected users
                            this.broadcastUserStatusChange(onlineUser, 'user_online');
                            // Send unread message count for each conversation to the connected user
                            return [4 /*yield*/, this.sendUnreadMessagesToUser(userId, client)];
                        case 4:
                            // Send unread message count for each conversation to the connected user
                            _a.sent();
                            this.logger.log("User ".concat(userId, " connected with socket ").concat(client.id));
                            return [3 /*break*/, 6];
                        case 5:
                            error_1 = _a.sent();
                            this.logger.error("Connection error for socket ".concat(client.id, ":"), error_1);
                            this.logger.error('Error stack:', error_1.stack);
                            client.disconnect();
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        ChatGateway_1.prototype.handleDisconnect = function (client) {
            var _a, _b;
            var userId = (_b = (_a = client.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id;
            if (userId) {
                this.connectedUsers.delete(userId);
                // Update user status to offline
                var offlineUser = {
                    user_id: userId,
                    username: client.data.user.username,
                    email: client.data.user.email,
                    status: 'offline',
                    last_seen: new Date(),
                };
                this.onlineUsers.set(userId, offlineUser);
                // Emit user offline status to all connected users
                this.broadcastUserStatusChange(offlineUser, 'user_offline');
                this.logger.log("User ".concat(userId, " disconnected (socket ").concat(client.id, ")"));
            }
            else {
                this.logger.warn("Socket ".concat(client.id, " disconnected without user data"));
            }
        };
        ChatGateway_1.prototype.handleAuth = function (authDto, client) {
            try {
                var userId = client.data.user.id;
                this.logger.debug("User ".concat(userId, " authenticated via auth event"));
                return { success: true, userId: userId };
            }
            catch (error) {
                this.logger.debug('Auth error:', error);
                return {
                    success: false,
                    error: error.message,
                };
            }
        };
        ChatGateway_1.prototype.handleSendMessage = function (sendMessageDto, client) {
            return __awaiter(this, void 0, void 0, function () {
                var userId_1, result_1, roomName, participants, otherParticipants, error_2;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            userId_1 = client.data.user.id;
                            return [4 /*yield*/, this.chatSocketService.sendMessage(userId_1, sendMessageDto)];
                        case 1:
                            result_1 = _a.sent();
                            roomName = "conversation:".concat(sendMessageDto.conversation_id);
                            client.to(roomName).emit(socket_message_dto_1.SocketEvents.RECEIVE_MESSAGE, result_1.message);
                            this.server
                                .to(roomName)
                                .emit(socket_message_dto_1.SocketEvents.CONVERSATION_UPDATED, result_1.conversationUpdate);
                            participants = result_1.participants;
                            otherParticipants = participants.filter(function (id) { return id !== userId_1; });
                            otherParticipants.forEach(function (participantId) {
                                _this.sendToUser(participantId, 'unread_message_count', {
                                    conversation_id: sendMessageDto.conversation_id,
                                    unread_count: result_1.conversationUpdate.unread_count,
                                    message_preview: sendMessageDto.content,
                                    sender_id: userId_1,
                                });
                            });
                            return [2 /*return*/, {
                                    success: true,
                                    message: result_1.message,
                                }];
                        case 2:
                            error_2 = _a.sent();
                            this.logger.debug('Send message error:', error_2);
                            return [2 /*return*/, {
                                    success: false,
                                    error: error_2.message,
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ChatGateway_1.prototype.handleMarkConversationRead = function (markReadDto, client) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, roomName, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            userId = client.data.user.id;
                            return [4 /*yield*/, this.chatSocketService.markConversationAsRead(userId, markReadDto)];
                        case 1:
                            _a.sent();
                            roomName = "conversation:".concat(markReadDto.conversation_id);
                            client.to(roomName).emit(socket_message_dto_1.SocketEvents.MARK_CONVERSATION_READ, {
                                conversation_id: markReadDto.conversation_id,
                                read_by: userId,
                                unread_count: 0,
                            });
                            return [2 /*return*/, { success: true }];
                        case 2:
                            error_3 = _a.sent();
                            this.logger.debug('Mark conversation read error:', error_3);
                            return [2 /*return*/, {
                                    success: false,
                                    error: error_3.message,
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ChatGateway_1.prototype.handleJoinConversation = function (data, client) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, onlineUsersList, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            userId = client.data.user.id;
                            return [4 /*yield*/, this.chatSocketService.joinConversation(userId, data.conversation_id)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, client.join("conversation:".concat(data.conversation_id))];
                        case 2:
                            _a.sent();
                            onlineUsersList = Array.from(this.onlineUsers.values());
                            client.emit('online_users_list', {
                                users: onlineUsersList,
                                timestamp: new Date(),
                            });
                            return [2 /*return*/, { success: true }];
                        case 3:
                            error_4 = _a.sent();
                            this.logger.debug('Join conversation error:', error_4);
                            return [2 /*return*/, {
                                    success: false,
                                    error: error_4.message,
                                }];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        ChatGateway_1.prototype.handleLeaveConversation = function (data, client) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            userId = client.data.user.id;
                            this.chatSocketService.leaveConversation(userId, data.conversation_id);
                            return [4 /*yield*/, client.leave("conversation:".concat(data.conversation_id))];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, { success: true }];
                        case 2:
                            error_5 = _a.sent();
                            this.logger.debug('Leave conversation error:', error_5);
                            return [2 /*return*/, {
                                    success: false,
                                    error: error_5.message,
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ChatGateway_1.prototype.handleTypingStart = function (data, client) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, roomName, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            userId = client.data.user.id;
                            return [4 /*yield*/, this.chatSocketService.handleTypingStart(userId, data.conversation_id)];
                        case 1:
                            _a.sent();
                            roomName = "conversation:".concat(data.conversation_id);
                            client.to(roomName).emit('typing:start', {
                                user_id: userId,
                                conversation_id: data.conversation_id,
                            });
                            return [2 /*return*/, { success: true }];
                        case 2:
                            error_6 = _a.sent();
                            this.logger.debug('Typing start error:', error_6);
                            return [2 /*return*/, {
                                    success: false,
                                    error: error_6.message,
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ChatGateway_1.prototype.handleTypingStop = function (data, client) {
            try {
                var userId = client.data.user.id;
                this.chatSocketService.handleTypingStop(userId, data.conversation_id);
                var roomName = "conversation:".concat(data.conversation_id);
                client.to(roomName).emit('typing:stop', {
                    user_id: userId,
                    conversation_id: data.conversation_id,
                });
                return { success: true };
            }
            catch (error) {
                this.logger.debug('Typing stop error:', error);
                return {
                    success: false,
                    error: error.message,
                };
            }
        };
        ChatGateway_1.prototype.authenticateUser = function (client) {
            return __awaiter(this, void 0, void 0, function () {
                var token, payload, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            token = this.extractTokenFromSocket(client);
                            if (!token || typeof token !== 'string' || token.trim() === '') {
                                this.logger.warn("No token found for socket ".concat(client.id));
                                return [2 /*return*/, null];
                            }
                            return [4 /*yield*/, this.jwtService.verifyAsync(token, {
                                    secret: this.appConfigService.jwt.secret,
                                })];
                        case 1:
                            payload = _a.sent();
                            return [2 /*return*/, {
                                    id: payload.sub,
                                    email: payload.email,
                                    username: payload.username,
                                }];
                        case 2:
                            error_7 = _a.sent();
                            this.logger.warn("Authentication error for socket ".concat(client.id, ":"), error_7.message);
                            return [2 /*return*/, null];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        ChatGateway_1.prototype.extractTokenFromSocket = function (client) {
            var _a, _b, _c;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            if ((_a = client.handshake.auth) === null || _a === void 0 ? void 0 : _a.token)
                return client.handshake.auth.token || '';
            var authHeader = (_b = client.handshake.headers) === null || _b === void 0 ? void 0 : _b.authorization;
            if (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))
                return authHeader.substring(7);
            if ((_c = client.handshake.query) === null || _c === void 0 ? void 0 : _c.token)
                return client.handshake.query.token;
            return undefined;
        };
        ChatGateway_1.prototype.getUserConversations = function (userId) {
            try {
                // Bạn có thể replace phần này nếu cần query DB
                this.logger.debug('Getting user conversations for user:', userId);
                return [];
            }
            catch (error) {
                this.logger.debug('Error getting user conversations:', error);
                return [];
            }
        };
        ChatGateway_1.prototype.broadcastUserStatusChange = function (user, event) {
            var payload = {
                user_id: user.user_id,
                username: user.username,
                email: user.email,
                status: user.status,
                last_seen: user.last_seen ? user.last_seen.toISOString() : null,
                timestamp: new Date().toISOString(),
            };
            this.logger.log("Broadcasting ".concat(event, " event for user ").concat(user.user_id, ":"), payload);
            this.server.emit(event, payload);
        };
        ChatGateway_1.prototype.getUserSocketId = function (userId) {
            return this.connectedUsers.get(userId);
        };
        ChatGateway_1.prototype.isUserOnline = function (userId) {
            return this.connectedUsers.has(userId);
        };
        ChatGateway_1.prototype.sendToUser = function (userId, event, data) {
            var socketId = this.getUserSocketId(userId);
            if (socketId) {
                this.server.to(socketId).emit(event, data);
            }
        };
        ChatGateway_1.prototype.broadcastToAll = function (event, data) {
            this.server.emit(event, data);
        };
        /**
         * Emit message and conversation update to conversation room
         * Used for sending welcome messages and other system messages
         */
        ChatGateway_1.prototype.emitToConversation = function (conversationId, message, conversationUpdate) {
            var roomName = "conversation:".concat(conversationId);
            this.server.to(roomName).emit(socket_message_dto_1.SocketEvents.RECEIVE_MESSAGE, message);
            this.server
                .to(roomName)
                .emit(socket_message_dto_1.SocketEvents.CONVERSATION_UPDATED, conversationUpdate);
        };
        /**
         * Send unread message count for each conversation to the connected user
         */
        ChatGateway_1.prototype.sendUnreadMessagesToUser = function (userId, client) {
            return __awaiter(this, void 0, void 0, function () {
                var unreadMessages, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.chatSocketService.getUnreadMessagesForUser(userId)];
                        case 1:
                            unreadMessages = _a.sent();
                            // Send unread_message_count event for each conversation
                            unreadMessages.forEach(function (unreadMessage) {
                                client.emit('unread_message_count', unreadMessage);
                            });
                            this.logger.debug("Sent ".concat(unreadMessages.length, " unread notifications to user ").concat(userId));
                            return [3 /*break*/, 3];
                        case 2:
                            error_8 = _a.sent();
                            this.logger.debug("Failed to send unread messages to user ".concat(userId, ": ").concat(error_8.message));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return ChatGateway_1;
    }());
    __setFunctionName(_classThis, "ChatGateway");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _server_decorators = [(0, websockets_1.WebSocketServer)()];
        _handleAuth_decorators = [(0, websockets_1.SubscribeMessage)(socket_message_dto_1.SocketEvents.AUTH)];
        _handleSendMessage_decorators = [(0, websockets_1.SubscribeMessage)(socket_message_dto_1.SocketEvents.SEND_MESSAGE)];
        _handleMarkConversationRead_decorators = [(0, websockets_1.SubscribeMessage)(socket_message_dto_1.SocketEvents.MARK_CONVERSATION_READ)];
        _handleJoinConversation_decorators = [(0, websockets_1.SubscribeMessage)(socket_message_dto_1.SocketEvents.JOIN_CONVERSATION)];
        _handleLeaveConversation_decorators = [(0, websockets_1.SubscribeMessage)(socket_message_dto_1.SocketEvents.LEAVE_CONVERSATION)];
        _handleTypingStart_decorators = [(0, websockets_1.SubscribeMessage)(socket_message_dto_1.SocketEvents.TYPING_START)];
        _handleTypingStop_decorators = [(0, websockets_1.SubscribeMessage)(socket_message_dto_1.SocketEvents.TYPING_STOP)];
        __esDecorate(_classThis, null, _handleAuth_decorators, { kind: "method", name: "handleAuth", static: false, private: false, access: { has: function (obj) { return "handleAuth" in obj; }, get: function (obj) { return obj.handleAuth; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleSendMessage_decorators, { kind: "method", name: "handleSendMessage", static: false, private: false, access: { has: function (obj) { return "handleSendMessage" in obj; }, get: function (obj) { return obj.handleSendMessage; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleMarkConversationRead_decorators, { kind: "method", name: "handleMarkConversationRead", static: false, private: false, access: { has: function (obj) { return "handleMarkConversationRead" in obj; }, get: function (obj) { return obj.handleMarkConversationRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleJoinConversation_decorators, { kind: "method", name: "handleJoinConversation", static: false, private: false, access: { has: function (obj) { return "handleJoinConversation" in obj; }, get: function (obj) { return obj.handleJoinConversation; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleLeaveConversation_decorators, { kind: "method", name: "handleLeaveConversation", static: false, private: false, access: { has: function (obj) { return "handleLeaveConversation" in obj; }, get: function (obj) { return obj.handleLeaveConversation; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleTypingStart_decorators, { kind: "method", name: "handleTypingStart", static: false, private: false, access: { has: function (obj) { return "handleTypingStart" in obj; }, get: function (obj) { return obj.handleTypingStart; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleTypingStop_decorators, { kind: "method", name: "handleTypingStop", static: false, private: false, access: { has: function (obj) { return "handleTypingStop" in obj; }, get: function (obj) { return obj.handleTypingStop; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _server_decorators, { kind: "field", name: "server", static: false, private: false, access: { has: function (obj) { return "server" in obj; }, get: function (obj) { return obj.server; }, set: function (obj, value) { obj.server = value; } }, metadata: _metadata }, _server_initializers, _server_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChatGateway = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChatGateway = _classThis;
}();
exports.ChatGateway = ChatGateway;
