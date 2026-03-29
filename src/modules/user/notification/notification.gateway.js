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
exports.NotificationGateway = void 0;
var websockets_1 = require("@nestjs/websockets");
var common_1 = require("@nestjs/common");
var socket_notification_dto_1 = require("./dto/socket-notification.dto");
var notification_templates_1 = require("@/shared/constants/notification-templates");
var _a = notification_templates_1.LINK_URL_TEMPLATES, BLOG_POSTS = _a.BLOG_POSTS, SHOPS = _a.SHOPS, PRODUCTS = _a.PRODUCTS, WITHDRAWAL_REQUESTS = _a.WITHDRAWAL_REQUESTS, SUPPORT_EMAIL = _a.SUPPORT_EMAIL;
var NotificationGateway = function () {
    var _classDecorators = [(0, websockets_1.WebSocketGateway)({
            namespace: '/notification',
        })];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _server_decorators;
    var _server_initializers = [];
    var _server_extraInitializers = [];
    var _handleAuth_decorators;
    var _handleGetNotifications_decorators;
    var _handleMarkRead_decorators;
    var _handleMarkAllRead_decorators;
    var _handleJoinRoom_decorators;
    var _handlePing_decorators;
    var NotificationGateway = _classThis = /** @class */ (function () {
        function NotificationGateway_1(notificationService, jwtService, appConfigService, userService) {
            this.notificationService = (__runInitializers(this, _instanceExtraInitializers), notificationService);
            this.jwtService = jwtService;
            this.appConfigService = appConfigService;
            this.userService = userService;
            this.server = __runInitializers(this, _server_initializers, void 0);
            this.logger = (__runInitializers(this, _server_extraInitializers), new common_1.Logger(NotificationGateway.name));
            this.connectedUsers = new Map();
            this.userTimeouts = new Map();
            this.TIMEOUT_DURATION = 300000; // 5 minutes
        }
        NotificationGateway_1.prototype.afterInit = function () {
            this.logger.log('Notification Gateway initialized');
        };
        NotificationGateway_1.prototype.handleConnection = function (client) {
            return __awaiter(this, void 0, void 0, function () {
                var user, userId, currentUser, wasOffline, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            return [4 /*yield*/, this.authenticateUser(client)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                client.disconnect();
                                return [2 /*return*/];
                            }
                            client.data = { user: user };
                            userId = user.id;
                            this.connectedUsers.set(userId, client.id);
                            return [4 /*yield*/, client.join("user:".concat(userId))];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.userService.findById(userId)];
                        case 3:
                            currentUser = _a.sent();
                            wasOffline = currentUser && !currentUser.is_online;
                            return [4 /*yield*/, this.userService.updateLastOnlineAtAndSetOnline(userId)];
                        case 4:
                            _a.sent();
                            if (wasOffline || !currentUser) {
                                this.server.emit('user_online', {
                                    user_id: userId,
                                    email: user.email,
                                    username: user.username,
                                    status: 'online',
                                    last_seen: new Date().toISOString(),
                                    timestamp: new Date().toISOString(),
                                });
                            }
                            this.initTimeout(userId);
                            return [3 /*break*/, 6];
                        case 5:
                            error_1 = _a.sent();
                            this.logger.error('Connection error:', error_1);
                            client.disconnect();
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationGateway_1.prototype.handleDisconnect = function (client) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            userId = (_b = (_a = client.data) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id;
                            if (!userId) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.userService.setOnlineStatus(userId, false)];
                        case 1:
                            _c.sent();
                            return [4 /*yield*/, this.userService.updateLastOnlineAt(userId)];
                        case 2:
                            _c.sent();
                            // Emit user_offline event to all other users
                            this.server.emit('user_offline', {
                                user_id: userId,
                                email: client.data.user.email,
                                username: client.data.user.username,
                                status: 'offline',
                                last_seen: new Date().toISOString(),
                                timestamp: new Date().toISOString(),
                            });
                            this.clearTimeout(userId);
                            this.connectedUsers.delete(userId);
                            return [2 /*return*/];
                    }
                });
            });
        };
        NotificationGateway_1.prototype.handleAuth = function (authDto, client) {
            try {
                var userId = client.data.user.id;
                return { success: true, userId: userId };
            }
            catch (error) {
                this.logger.error('Auth error:', error);
                return {
                    success: false,
                    error: error.message,
                };
            }
        };
        NotificationGateway_1.prototype.handleGetNotifications = function (getNotificationsDto, client) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, _a, page, _b, limit, _c, type, serviceParams, result, notifications, error_2;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 2, , 3]);
                            userId = client.data.user.id;
                            _a = getNotificationsDto.page, page = _a === void 0 ? 1 : _a, _b = getNotificationsDto.limit, limit = _b === void 0 ? 20 : _b, _c = getNotificationsDto.type, type = _c === void 0 ? 'all' : _c;
                            serviceParams = {
                                page: page,
                                take: limit,
                                skip: (page - 1) * limit,
                                type: type === 'all' ? undefined : type,
                            };
                            return [4 /*yield*/, this.notificationService.getNotifications(userId, serviceParams)];
                        case 1:
                            result = _d.sent();
                            notifications = result.items.map(function (item) {
                                var _a;
                                return ({
                                    id: item.id,
                                    type: item.type,
                                    title: item.title,
                                    message: item.message,
                                    link_url: item.link_url,
                                    is_read: (_a = item.is_read) !== null && _a !== void 0 ? _a : false,
                                    is_global: item.is_global,
                                    target_audience: item.target_audience,
                                    created_at: item.created_at.toISOString(),
                                });
                            });
                            return [2 /*return*/, {
                                    success: true,
                                    notifications: notifications,
                                    unread_count: result.unread_count,
                                }];
                        case 2:
                            error_2 = _d.sent();
                            this.logger.error('Get notifications error:', error_2);
                            return [2 /*return*/, {
                                    success: false,
                                    error: error_2.message,
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationGateway_1.prototype.handleMarkRead = function (markReadDto, client) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, result, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            userId = client.data.user.id;
                            return [4 /*yield*/, this.notificationService.markNotificationAsRead(userId, { notification_id: markReadDto.notification_id })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    unread_count: result.unread_count,
                                }];
                        case 2:
                            error_3 = _a.sent();
                            this.logger.error('Mark read error:', error_3);
                            return [2 /*return*/, {
                                    success: false,
                                    error: error_3.message,
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationGateway_1.prototype.handleMarkAllRead = function (client) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, result, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            userId = client.data.user.id;
                            return [4 /*yield*/, this.notificationService.markAllNotificationsAsRead(userId)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    unread_count: result.unread_count,
                                }];
                        case 2:
                            error_4 = _a.sent();
                            this.logger.error('Mark all read error:', error_4);
                            return [2 /*return*/, {
                                    success: false,
                                    error: error_4.message,
                                }];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Handle join room request
         */
        NotificationGateway_1.prototype.handleJoinRoom = function (data, client) {
            return __awaiter(this, void 0, void 0, function () {
                var room, userId, socketUserId, roomUserId, currentUser, wasOffline, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            room = data.room;
                            if (!room) {
                                client.emit('join_error', { error: 'Room name is required' });
                                return [2 /*return*/];
                            }
                            userId = client.data.user.id;
                            socketUserId = userId;
                            roomUserId = room.startsWith('user:')
                                ? room.replace('user:', '')
                                : room;
                            if (roomUserId !== socketUserId) {
                                client.emit('join_error', { error: 'Unauthorized to join this room' });
                                return [2 /*return*/];
                            }
                            // Join the specified room
                            return [4 /*yield*/, client.join(room)];
                        case 1:
                            // Join the specified room
                            _a.sent();
                            // Update database: set online status and last_seen
                            return [4 /*yield*/, this.userService.updateLastOnlineAtAndSetOnline(userId)];
                        case 2:
                            // Update database: set online status and last_seen
                            _a.sent();
                            return [4 /*yield*/, this.userService.findById(userId)];
                        case 3:
                            currentUser = _a.sent();
                            wasOffline = currentUser && !currentUser.is_online;
                            // Emit user_online event if user was offline
                            if (wasOffline) {
                                this.server.emit('user_online', {
                                    user_id: userId,
                                    email: client.data.user.email,
                                    username: client.data.user.username,
                                    status: 'online',
                                    last_seen: new Date().toISOString(),
                                    timestamp: new Date().toISOString(),
                                });
                            }
                            // Initialize timeout counter
                            this.initTimeout(userId);
                            // Emit confirmation back to client
                            client.emit('joined', room);
                            return [3 /*break*/, 5];
                        case 4:
                            error_5 = _a.sent();
                            this.logger.error('Join room error:', error_5);
                            client.emit('join_error', { error: error_5.message });
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Handle ping event from client to keep connection alive
         */
        NotificationGateway_1.prototype.handlePing = function (client) {
            return __awaiter(this, void 0, void 0, function () {
                var userId, currentUser, wasOffline, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            userId = client.data.user.id;
                            return [4 /*yield*/, this.userService.updateLastOnlineAt(userId)];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, this.userService.findById(userId)];
                        case 2:
                            currentUser = _a.sent();
                            wasOffline = currentUser && !currentUser.is_online;
                            if (!wasOffline) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.userService.setOnlineStatus(userId, true)];
                        case 3:
                            _a.sent();
                            this.server.emit('user_online', {
                                user_id: userId,
                                email: client.data.user.email,
                                username: client.data.user.username,
                                status: 'online',
                                last_seen: new Date().toISOString(),
                                timestamp: new Date().toISOString(),
                            });
                            _a.label = 4;
                        case 4:
                            this.resetTimeout(userId);
                            return [3 /*break*/, 6];
                        case 5:
                            error_6 = _a.sent();
                            this.logger.error('Ping error:', error_6);
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationGateway_1.prototype.authenticateUser = function (client) {
            return __awaiter(this, void 0, void 0, function () {
                var token, payload, error_7, err, name_1, message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            token = this.extractTokenFromSocket(client);
                            if (!token || typeof token !== 'string' || token.trim() === '') {
                                // Don't spam logs for anonymous visitors; this is expected.
                                client.emit('auth_error', {
                                    code: 'TOKEN_MISSING',
                                });
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
                            err = error_7;
                            name_1 = (err === null || err === void 0 ? void 0 : err.name) || 'UnknownError';
                            message = (err === null || err === void 0 ? void 0 : err.message) || 'Unknown error';
                            // Token errors happen often (expired token, invalid token). Avoid noisy stack traces.
                            if (name_1 === 'TokenExpiredError') {
                                client.emit('auth_error', {
                                    code: 'TOKEN_EXPIRED',
                                });
                                this.logger.debug("Authentication token expired: ".concat(message));
                                return [2 /*return*/, null];
                            }
                            if (name_1 === 'JsonWebTokenError' || name_1 === 'NotBeforeError') {
                                client.emit('auth_error', {
                                    code: 'TOKEN_INVALID',
                                });
                                this.logger.debug("Authentication token invalid: ".concat(message));
                                return [2 /*return*/, null];
                            }
                            // Unexpected error - keep warn.
                            this.logger.warn("Authentication error: ".concat(name_1, ": ").concat(message));
                            return [2 /*return*/, null];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationGateway_1.prototype.extractTokenFromSocket = function (client) {
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
        /**
         * Initialize timeout for a user
         * If user doesn't send ping within TIMEOUT_DURATION, they will be marked as offline
         */
        NotificationGateway_1.prototype.initTimeout = function (userId) {
            var _this = this;
            // Clear existing timeout if any
            if (this.userTimeouts.has(userId)) {
                clearTimeout(this.userTimeouts.get(userId));
            }
            // Set new timeout
            var timeout = setTimeout(function () {
                void _this.handleUserTimeout(userId)
                    .then(function () {
                    _this.userTimeouts.delete(userId);
                })
                    .catch(function (error) {
                    _this.logger.error("Error in timeout handler for user ".concat(userId, ":"), error);
                    _this.userTimeouts.delete(userId);
                });
            }, this.TIMEOUT_DURATION);
            this.userTimeouts.set(userId, timeout);
        };
        /**
         * Reset timeout when receiving ping
         */
        NotificationGateway_1.prototype.resetTimeout = function (userId) {
            this.initTimeout(userId);
        };
        /**
         * Clear timeout for a user
         */
        NotificationGateway_1.prototype.clearTimeout = function (userId) {
            if (this.userTimeouts.has(userId)) {
                clearTimeout(this.userTimeouts.get(userId));
                this.userTimeouts.delete(userId);
            }
        };
        /**
         * Handle user timeout - user hasn't sent ping in TIMEOUT_DURATION
         */
        NotificationGateway_1.prototype.handleUserTimeout = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var user, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            if (!this.connectedUsers.has(userId)) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.userService.findById(userId)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                return [2 /*return*/];
                            }
                            // Update database: set offline status and last_seen
                            return [4 /*yield*/, this.userService.setOnlineStatus(userId, false)];
                        case 2:
                            // Update database: set offline status and last_seen
                            _a.sent();
                            return [4 /*yield*/, this.userService.updateLastOnlineAt(userId)];
                        case 3:
                            _a.sent();
                            // Emit user_offline event
                            this.server.emit('user_offline', {
                                user_id: userId,
                                email: user.email,
                                username: user.username,
                                status: 'offline',
                                last_seen: new Date().toISOString(),
                                timestamp: new Date().toISOString(),
                            });
                            return [3 /*break*/, 5];
                        case 4:
                            error_8 = _a.sent();
                            this.logger.error("Error handling timeout for user ".concat(userId, ":"), error_8);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        // Public methods for broadcasting notifications
        NotificationGateway_1.prototype.getUserSocketId = function (userId) {
            return this.connectedUsers.get(userId);
        };
        NotificationGateway_1.prototype.isUserOnline = function (userId) {
            return this.connectedUsers.has(userId);
        };
        NotificationGateway_1.prototype.sendToUser = function (userId, event, data) {
            var socketId = this.getUserSocketId(userId);
            if (socketId) {
                this.server.to(socketId).emit(event, data);
            }
            else {
                this.logger.warn("User ".concat(userId, " is not online, cannot send event ").concat(event));
            }
        };
        NotificationGateway_1.prototype.broadcastToAll = function (event, data) {
            this.server.emit(event, data);
        };
        NotificationGateway_1.prototype.broadcastToUsers = function (userIds, event, data) {
            var _this = this;
            userIds.forEach(function (userId) {
                _this.sendToUser(userId, event, data);
            });
        };
        NotificationGateway_1.prototype.emitWalletBalanceUpdated = function (data) {
            this.sendToUser(data.user_id, socket_notification_dto_1.SocketEvents.WALLET_BALANCE_UPDATED, {
                user_id: data.user_id,
                wallet_id: data.wallet_id,
                transaction_id: data.transaction_id,
                reference_code: data.reference_code,
                amount: data.amount,
                balance: data.balance,
                deposit_balance: data.deposit_balance,
                sale_balance: data.sale_balance,
                locked_balance: data.locked_balance,
                status: data.status,
                timestamp: data.timestamp,
            });
        };
        // Method to send new notification to specific users
        NotificationGateway_1.prototype.sendNewNotification = function (notification, userIds) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, userIds_1, userId, unreadCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (userIds.length === 0)
                                return [2 /*return*/];
                            // Send to specific users
                            this.broadcastToUsers(userIds, socket_notification_dto_1.SocketEvents.NEW_NOTIFICATION, notification);
                            _i = 0, userIds_1 = userIds;
                            _a.label = 1;
                        case 1:
                            if (!(_i < userIds_1.length)) return [3 /*break*/, 4];
                            userId = userIds_1[_i];
                            if (!this.isUserOnline(userId)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.notificationService.getUnreadCount(userId)];
                        case 2:
                            unreadCount = _a.sent();
                            this.sendToUser(userId, socket_notification_dto_1.SocketEvents.UNREAD_COUNT, {
                                unread_count: unreadCount.unread_count,
                            });
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        // Method to send global notification to all online users
        NotificationGateway_1.prototype.sendGlobalNotification = function (notification) {
            return __awaiter(this, void 0, void 0, function () {
                var onlineUserIds, _i, onlineUserIds_1, userId, unreadCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            // Broadcast to all connected users
                            this.broadcastToAll(socket_notification_dto_1.SocketEvents.GLOBAL_NOTIFICATION, notification);
                            onlineUserIds = Array.from(this.connectedUsers.keys());
                            _i = 0, onlineUserIds_1 = onlineUserIds;
                            _a.label = 1;
                        case 1:
                            if (!(_i < onlineUserIds_1.length)) return [3 /*break*/, 4];
                            userId = onlineUserIds_1[_i];
                            return [4 /*yield*/, this.notificationService.getUnreadCount(userId)];
                        case 2:
                            unreadCount = _a.sent();
                            this.sendToUser(userId, socket_notification_dto_1.SocketEvents.UNREAD_COUNT, {
                                unread_count: unreadCount.unread_count,
                            });
                            _a.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Emit blog created notification to admin
         */
        NotificationGateway_1.prototype.emitBlogCreated = function (data) {
            // Emit to admin namespace
            this.server.to('admin').emit('blog:created', {
                type: 'blog',
                title: data.notification_title,
                message: data.notification_message,
                link_url: BLOG_POSTS,
                notification_id: data.notification_id,
                data: {
                    blog_id: data.blog_id,
                    author_id: data.author_id,
                    author_username: data.author_username,
                    created_at: data.created_at,
                    hash: data.hash,
                },
                timestamp: data.notification_created_at,
            });
        };
        /**
         * Emit blog updated notification to admin
         */
        NotificationGateway_1.prototype.emitBlogUpdated = function (data) {
            // Emit to admin namespace
            this.server.to('admin').emit('blog:updated', {
                type: 'blog_updated',
                title: data.notification_title,
                message: data.notification_message,
                link_url: BLOG_POSTS,
                notification_id: data.notification_id,
                data: {
                    blog_id: data.blog_id,
                    title: data.title,
                    author_id: data.author_id,
                    author_username: data.author_username,
                    updated_at: data.updated_at,
                    hash: data.hash,
                },
                timestamp: data.notification_created_at,
            });
        };
        /**
         * Emit blog status changed notification to user
         */
        NotificationGateway_1.prototype.emitBlogStatusChanged = function (data) {
            // Emit to specific user namespace
            this.server.to(data.author_id).emit('blog:status_changed', {
                type: 'blog_status_changed',
                title: data.notification_title,
                message: data.notification_message,
                notification_id: data.notification_id,
                data: {
                    blog_id: data.blog_id,
                    title: data.title,
                    old_status: data.old_status,
                    new_status: data.new_status,
                    approval_notes: data.approval_notes,
                    approved_by: data.approved_by,
                    approved_at: data.approved_at.toISOString(),
                    hash: data.hash,
                    link_url: data.link_url,
                },
                timestamp: data.notification_created_at,
            });
        };
        /**
         * Emit shop request created notification to admin
         */
        NotificationGateway_1.prototype.emitShopRequestCreated = function (data) {
            // Emit to admin namespace
            this.server.to('admin').emit('shop_request:created', {
                type: 'shop',
                title: data.notification_title,
                message: data.notification_message,
                link_url: SHOPS,
                notification_id: data.notification_id,
                data: {
                    shop_request_id: data.shop_request_id,
                    user_id: data.user_id,
                    bank_code: data.bank_code,
                    bank_name: data.bank_name,
                    bank_account_name: data.bank_account_name,
                    created_at: data.created_at,
                    hash: data.hash,
                },
                timestamp: data.notification_created_at,
            });
        };
        /**
         * Emit shop request status changed notification to user
         */
        NotificationGateway_1.prototype.emitShopRequestStatusChanged = function (data) {
            // Emit to specific user namespace
            this.server.to(data.user_id).emit('shop_request:status_changed', {
                type: 'shop',
                title: data.notification_title,
                message: data.notification_message,
                notification_id: data.notification_id,
                data: {
                    shop_request_id: data.shop_request_id,
                    old_status: data.old_status,
                    new_status: data.new_status,
                    note: data.note,
                    admin_user_id: data.admin_user_id,
                    updated_at: data.updated_at,
                    hash: data.hash,
                    link_url: data.link_url,
                },
                timestamp: data.notification_created_at,
            });
        };
        /**
         * Emit withdraw request created notification to admin
         */
        NotificationGateway_1.prototype.emitWithdrawRequestCreated = function (data) {
            // Emit to admin namespace
            this.server.to('admin').emit('withdraw_request:created', {
                type: 'wallet',
                title: data.notification_title,
                message: data.notification_message,
                link_url: WITHDRAWAL_REQUESTS,
                notification_id: data.notification_id,
                data: {
                    transaction_id: data.transaction_id,
                    transaction_number: data.transaction_number,
                    user_id: data.user_id,
                    amount: data.amount,
                    bank_info: data.bank_info,
                    created_at: data.created_at,
                    hash: data.hash,
                },
                timestamp: data.notification_created_at,
            });
        };
        /**
         * Emit withdraw status changed notification to user
         */
        NotificationGateway_1.prototype.emitWithdrawStatusChanged = function (data) {
            // Emit to specific user namespace
            this.server.to(data.user_id).emit('withdraw:status_changed', {
                type: 'wallet',
                title: data.notification_title,
                message: data.notification_message,
                notification_id: data.notification_id,
                data: {
                    transaction_id: data.transaction_id,
                    transaction_number: data.transaction_number,
                    old_status: data.old_status,
                    new_status: data.new_status,
                    amount: data.amount,
                    bank_info: data.bank_info,
                    note: data.note,
                    admin_user_id: data.admin_user_id,
                    updated_at: data.updated_at,
                    hash: data.hash,
                    link_url: data.link_url,
                },
                timestamp: data.notification_created_at,
            });
        };
        /**
         * Emit product created notification to admin
         */
        NotificationGateway_1.prototype.emitProductCreated = function (data) {
            // Emit to admin namespace
            this.server.to('admin').emit('product:created', {
                type: 'product',
                title: data.notification_title,
                message: data.notification_message,
                link_url: PRODUCTS,
                notification_id: data.notification_id,
                data: {
                    product_id: data.product_id,
                    name: data.name,
                    shop_id: data.shop_id,
                    user_id: data.user_id,
                    created_at: data.created_at,
                    hash: data.hash,
                },
                timestamp: data.notification_created_at,
            });
        };
        /**
         * Emit product updated notification to admin
         */
        NotificationGateway_1.prototype.emitProductUpdated = function (data) {
            // Emit to admin namespace
            this.server.to('admin').emit('product:updated', {
                type: 'product',
                title: data.notification_title,
                message: data.notification_message,
                link_url: PRODUCTS,
                notification_id: data.notification_id,
                data: {
                    product_id: data.product_id,
                    name: data.name,
                    shop_id: data.shop_id,
                    user_id: data.user_id,
                    updated_at: data.updated_at,
                    hash: data.hash,
                },
                timestamp: data.notification_created_at,
            });
        };
        /**
         * Emit product status changed notification to user
         */
        NotificationGateway_1.prototype.emitProductStatusChanged = function (data) {
            // Emit to specific user namespace
            this.server.to(data.user_id).emit('product:status_changed', {
                type: 'product',
                title: data.notification_title,
                message: data.notification_message,
                notification_id: data.notification_id,
                data: {
                    product_id: data.product_id,
                    shop_id: data.shop_id,
                    old_status: data.old_status,
                    new_status: data.new_status,
                    reason: data.reason,
                    admin_user_id: data.admin_user_id,
                    updated_at: data.updated_at,
                    hash: data.hash,
                    link_url: data.link_url,
                },
                timestamp: data.notification_created_at,
            });
        };
        /**
         * Emit support contact created notification to admin
         */
        NotificationGateway_1.prototype.emitSupportContactCreated = function (data) {
            // Emit to admin namespace
            this.server.to('admin').emit('support_contact:created', {
                type: 'support',
                title: data.notification_title,
                message: data.notification_message,
                link_url: SUPPORT_EMAIL,
                notification_id: data.notification_id,
                data: {
                    support_contact_id: data.support_contact_id,
                    name: data.name,
                    email: data.email,
                    subject: data.subject,
                    message: data.message,
                    user_id: data.user_id,
                    created_at: data.created_at,
                    hash: data.hash,
                },
                timestamp: data.notification_created_at,
            });
        };
        /**
         * Emit blog liked notification to blog author
         */
        NotificationGateway_1.prototype.emitBlogLiked = function (data) {
            // Emit to specific user namespace
            this.server.to(data.author_id).emit('blog:liked', {
                type: 'blog',
                title: data.notification_title,
                message: data.notification_message,
                notification_id: data.notification_id,
                data: {
                    blog_id: data.blog_id,
                    title: data.title,
                    user_id: data.user_id,
                    is_liked: true,
                    like_count: data.like_count,
                    updated_at: data.updated_at,
                    hash: data.hash,
                    link_url: data.link_url,
                },
                timestamp: data.notification_created_at,
            });
        };
        /**
         * Emit blog comment added notification to blog author
         */
        NotificationGateway_1.prototype.emitBlogCommentAdded = function (data) {
            // Emit to specific user namespace
            this.server.to(data.author_id).emit('blog:comment_added', {
                type: 'blog',
                title: data.notification_title,
                message: data.notification_message,
                notification_id: data.notification_id,
                data: {
                    blog_id: data.blog_id,
                    title: data.title,
                    comment_id: data.comment_id,
                    comment_author_id: data.comment_author_id,
                    comment_author_username: data.comment_author_username,
                    comment_content: data.comment_content,
                    is_reply: data.is_reply,
                    parent_comment_id: data.parent_comment_id,
                    created_at: data.created_at,
                    hash: data.hash,
                    link_url: data.link_url,
                },
                timestamp: data.notification_created_at,
            });
        };
        /**
         * Emit blog comment reply added notification to parent comment author
         */
        NotificationGateway_1.prototype.emitBlogCommentReplyAdded = function (data) {
            // Emit to specific user namespace
            this.server
                .to(data.parent_comment_author_id)
                .emit('blog:comment_reply_added', {
                type: 'blog',
                title: data.notification_title,
                message: data.notification_message,
                notification_id: data.notification_id,
                data: {
                    blog_id: data.blog_id,
                    title: data.title,
                    parent_comment_id: data.parent_comment_id,
                    reply_id: data.reply_id,
                    reply_author_id: data.reply_author_id,
                    reply_author_username: data.reply_author_username,
                    reply_content: data.reply_content,
                    created_at: data.created_at,
                    hash: data.hash,
                    link_url: data.link_url,
                },
                timestamp: data.notification_created_at,
            });
        };
        /**
         * Emit product review created notification to shop owner
         */
        NotificationGateway_1.prototype.emitProductReviewCreated = function (data) {
            // Emit to specific user namespace
            this.server.to(data.shop_owner_id).emit('product:review_created', {
                type: 'product',
                title: data.notification_title,
                message: data.notification_message,
                notification_id: data.notification_id,
                data: {
                    product_id: data.product_id,
                    product_name: data.product_name,
                    shop_id: data.shop_id,
                    review_id: data.review_id,
                    reviewer_id: data.reviewer_id,
                    rating: data.rating,
                    review_content: data.review_content,
                    created_at: data.created_at,
                    hash: data.hash,
                    link_url: data.link_url,
                },
                timestamp: data.notification_created_at,
            });
        };
        return NotificationGateway_1;
    }());
    __setFunctionName(_classThis, "NotificationGateway");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _server_decorators = [(0, websockets_1.WebSocketServer)()];
        _handleAuth_decorators = [(0, websockets_1.SubscribeMessage)(socket_notification_dto_1.SocketEvents.AUTH)];
        _handleGetNotifications_decorators = [(0, websockets_1.SubscribeMessage)(socket_notification_dto_1.SocketEvents.GET_NOTIFICATIONS)];
        _handleMarkRead_decorators = [(0, websockets_1.SubscribeMessage)(socket_notification_dto_1.SocketEvents.MARK_READ)];
        _handleMarkAllRead_decorators = [(0, websockets_1.SubscribeMessage)(socket_notification_dto_1.SocketEvents.MARK_ALL_READ)];
        _handleJoinRoom_decorators = [(0, websockets_1.SubscribeMessage)('join')];
        _handlePing_decorators = [(0, websockets_1.SubscribeMessage)('ping')];
        __esDecorate(_classThis, null, _handleAuth_decorators, { kind: "method", name: "handleAuth", static: false, private: false, access: { has: function (obj) { return "handleAuth" in obj; }, get: function (obj) { return obj.handleAuth; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleGetNotifications_decorators, { kind: "method", name: "handleGetNotifications", static: false, private: false, access: { has: function (obj) { return "handleGetNotifications" in obj; }, get: function (obj) { return obj.handleGetNotifications; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleMarkRead_decorators, { kind: "method", name: "handleMarkRead", static: false, private: false, access: { has: function (obj) { return "handleMarkRead" in obj; }, get: function (obj) { return obj.handleMarkRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleMarkAllRead_decorators, { kind: "method", name: "handleMarkAllRead", static: false, private: false, access: { has: function (obj) { return "handleMarkAllRead" in obj; }, get: function (obj) { return obj.handleMarkAllRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handleJoinRoom_decorators, { kind: "method", name: "handleJoinRoom", static: false, private: false, access: { has: function (obj) { return "handleJoinRoom" in obj; }, get: function (obj) { return obj.handleJoinRoom; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _handlePing_decorators, { kind: "method", name: "handlePing", static: false, private: false, access: { has: function (obj) { return "handlePing" in obj; }, get: function (obj) { return obj.handlePing; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, null, _server_decorators, { kind: "field", name: "server", static: false, private: false, access: { has: function (obj) { return "server" in obj; }, get: function (obj) { return obj.server; }, set: function (obj, value) { obj.server = value; } }, metadata: _metadata }, _server_initializers, _server_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationGateway = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationGateway = _classThis;
}();
exports.NotificationGateway = NotificationGateway;
