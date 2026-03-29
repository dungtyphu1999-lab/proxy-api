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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminNotificationService = void 0;
var common_1 = require("@nestjs/common");
var blog_constants_1 = require("@/shared/constants/blog.constants");
var utils_1 = require("@/shared/utils");
var AdminNotificationService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AdminNotificationService = _classThis = /** @class */ (function () {
        function AdminNotificationService_1(adminNotificationRepository, notificationGateway, adminUsersService, userTelegramService, configService) {
            this.adminNotificationRepository = adminNotificationRepository;
            this.notificationGateway = notificationGateway;
            this.adminUsersService = adminUsersService;
            this.userTelegramService = userTelegramService;
            this.configService = configService;
            this.logger = new common_1.Logger(AdminNotificationService.name);
            this.adminTelegramTopicMap = this.parseAdminTelegramTopicMap(this.configService.get('TELEGRAM_ADMIN_TOPIC_MAP'));
            this.adminTelegramChatId = this.parseAdminTelegramChatId(this.configService.get('TELEGRAM_ADMIN_CHAT_ID'));
        }
        AdminNotificationService_1.prototype.getUserName = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var user, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.adminUsersService.findUserById(userId)];
                        case 1:
                            user = _a.sent();
                            return [2 /*return*/, (user === null || user === void 0 ? void 0 : user.username) || (user === null || user === void 0 ? void 0 : user.full_name) || userId];
                        case 2:
                            error_1 = _a.sent();
                            this.logger.warn("Failed to get user name for ID ".concat(userId, ": ").concat(error_1 instanceof Error ? error_1.message : String(error_1)));
                            return [2 /*return*/, userId];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AdminNotificationService_1.prototype.getNotifications = function (params, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, items, total, _b, page, _c, pageSize, unreadCount;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.adminNotificationRepository.findAllAdminNotifications(params, userId)];
                        case 1:
                            _a = _d.sent(), items = _a.items, total = _a.total;
                            _b = params.page, page = _b === void 0 ? 1 : _b, _c = params.pageRow, pageSize = _c === void 0 ? 20 : _c;
                            return [4 /*yield*/, this.adminNotificationRepository.getAdminUnreadCount(userId)];
                        case 2:
                            unreadCount = _d.sent();
                            return [2 /*return*/, {
                                    items: items,
                                    pagination: {
                                        page: page,
                                        pageSize: pageSize,
                                        total: total,
                                    },
                                    unread_count: unreadCount,
                                }];
                    }
                });
            });
        };
        AdminNotificationService_1.prototype.createNotification = function (createDto, createdBy) {
            return __awaiter(this, void 0, void 0, function () {
                var notification, adminUsersNotified, adminUserNotifications, userNotifications, userNotifications, adminUserIds, category, button, message, telegramOptions, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.adminNotificationRepository.createAdminNotification(createDto, createdBy)];
                        case 1:
                            notification = _a.sent();
                            adminUsersNotified = 0;
                            adminUserNotifications = [];
                            if (!(createDto.admin_user_ids && createDto.admin_user_ids.length > 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.adminNotificationRepository.createAdminUserNotifications(notification.id, createDto.admin_user_ids)];
                        case 2:
                            userNotifications = _a.sent();
                            adminUsersNotified = userNotifications.length;
                            adminUserNotifications = userNotifications;
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, this.adminNotificationRepository.createAllAdminUserNotifications(notification.id)];
                        case 4:
                            userNotifications = _a.sent();
                            adminUsersNotified = userNotifications.length;
                            adminUserNotifications = userNotifications;
                            _a.label = 5;
                        case 5:
                            _a.trys.push([5, 10, , 11]);
                            adminUserIds = adminUserNotifications.map(function (row) { return row.user_id; });
                            category = this.resolveAdminTelegramCategory(notification.type, notification.related_entity_type);
                            button = this.userTelegramService.buildInlineButton('Mở trang quản trị', notification.link_url || undefined);
                            message = this.buildAdminQueueTelegramMessage({
                                title: notification.title,
                                message: notification.message,
                                category: category,
                                includeAction: !button,
                            });
                            telegramOptions = {
                                parse_mode: 'HTML',
                                disable_preview: true,
                                reply_markup: button ? { inline_keyboard: [[button]] } : undefined,
                                message_thread_id: category
                                    ? this.adminTelegramTopicMap[category.key]
                                    : undefined,
                            };
                            if (!this.adminTelegramChatId) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.userTelegramService.notifyChat(this.adminTelegramChatId, message, telegramOptions)];
                        case 6:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 7:
                            if (!(adminUserIds.length > 0)) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.userTelegramService.notifyUsers(adminUserIds, 'admin_notification', message, telegramOptions)];
                        case 8:
                            _a.sent();
                            _a.label = 9;
                        case 9: return [3 /*break*/, 11];
                        case 10:
                            error_2 = _a.sent();
                            this.logger.warn("Failed to send Telegram notifications to admins: ".concat(error_2 instanceof Error ? error_2.message : String(error_2)));
                            return [3 /*break*/, 11];
                        case 11: return [2 /*return*/, {
                                id: notification.id,
                                type: notification.type,
                                title: notification.title,
                                message: notification.message,
                                link_url: notification.link_url,
                                target_audience: notification.target_audience,
                                admin_users_notified: adminUsersNotified,
                                created_at: notification.created_at,
                            }];
                    }
                });
            });
        };
        AdminNotificationService_1.prototype.markNotificationAsRead = function (userId, markReadDto) {
            return __awaiter(this, void 0, void 0, function () {
                var markedCount, userName, unreadCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.adminNotificationRepository.markAdminNotificationAsRead(userId, markReadDto.notification_id)];
                        case 1:
                            markedCount = _a.sent();
                            if (!(markedCount > 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.getUserName(userId)];
                        case 2:
                            userName = _a.sent();
                            this.logger.log("Admin ".concat(userName, " marked notification ").concat(markReadDto.notification_id, " as read"));
                            _a.label = 3;
                        case 3: return [4 /*yield*/, this.adminNotificationRepository.getAdminUnreadCount(userId)];
                        case 4:
                            unreadCount = _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    unread_count: unreadCount,
                                    marked_count: markedCount,
                                }];
                    }
                });
            });
        };
        AdminNotificationService_1.prototype.markAllNotificationsAsRead = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var markedCount, userName, unreadCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.adminNotificationRepository.markAdminNotificationAsRead(userId)];
                        case 1:
                            markedCount = _a.sent();
                            if (!(markedCount > 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.getUserName(userId)];
                        case 2:
                            userName = _a.sent();
                            this.logger.log("Admin (".concat(userName, ") marked ").concat(markedCount, " notifications as read"));
                            _a.label = 3;
                        case 3: return [4 /*yield*/, this.adminNotificationRepository.getAdminUnreadCount(userId)];
                        case 4:
                            unreadCount = _a.sent();
                            return [2 /*return*/, {
                                    success: true,
                                    unread_count: unreadCount,
                                    marked_count: markedCount,
                                }];
                    }
                });
            });
        };
        AdminNotificationService_1.prototype.markNotificationsAsReadByRelatedEntity = function (userId, relatedEntityType, relatedEntityId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.adminNotificationRepository.markNotificationsAsReadByRelatedEntity(userId, relatedEntityType, relatedEntityId)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AdminNotificationService_1.prototype.deleteNotification = function (userId, notificationId) {
            return __awaiter(this, void 0, void 0, function () {
                var deleted, userName;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.adminNotificationRepository.deleteAdminNotification(userId, notificationId)];
                        case 1:
                            deleted = _a.sent();
                            if (!deleted) {
                                throw new common_1.BadRequestException('Notification not found or access denied');
                            }
                            return [4 /*yield*/, this.getUserName(userId)];
                        case 2:
                            userName = _a.sent();
                            this.logger.log("Admin ".concat(userName, " deleted notification ").concat(notificationId));
                            return [2 /*return*/, { success: true }];
                    }
                });
            });
        };
        AdminNotificationService_1.prototype.getUnreadCount = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var unreadCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.adminNotificationRepository.getAdminUnreadCount(userId)];
                        case 1:
                            unreadCount = _a.sent();
                            return [2 /*return*/, { unread_count: unreadCount }];
                    }
                });
            });
        };
        AdminNotificationService_1.prototype.sendUserNotification = function (sendDto, createdBy) {
            return __awaiter(this, void 0, void 0, function () {
                var plainContent, notification, usersNotified, targetUserIds, userNotificationRows, userNotifications, userNotifications, button, telegramText, telegramTargets, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            plainContent = utils_1.stripHtml(sendDto.message);
                            if (plainContent.length > blog_constants_1.MAX_CONTENT_LENGTH) {
                                throw new common_1.BadRequestException("Content cannot exceed ".concat(blog_constants_1.MAX_CONTENT_LENGTH, " characters (excluding HTML tags)"));
                            }
                            return [4 /*yield*/, this.adminNotificationRepository.createUserNotification(sendDto, createdBy)];
                        case 1:
                            notification = _a.sent();
                            usersNotified = 0;
                            targetUserIds = [];
                            userNotificationRows = [];
                            if (!(sendDto.user_ids && sendDto.user_ids.length > 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.adminNotificationRepository.createUserNotifications(notification.id, sendDto.user_ids)];
                        case 2:
                            userNotifications = _a.sent();
                            usersNotified = userNotifications.length;
                            targetUserIds = sendDto.user_ids;
                            userNotificationRows = userNotifications;
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, this.adminNotificationRepository.createAllVerifiedUserNotifications(notification.id)];
                        case 4:
                            userNotifications = _a.sent();
                            usersNotified = userNotifications.length;
                            // For global notifications, we'll broadcast to all users
                            targetUserIds = [];
                            userNotificationRows = userNotifications;
                            _a.label = 5;
                        case 5:
                            // Emit real-time notification to users
                            try {
                                if (targetUserIds.length > 0) {
                                    // Send to specific users
                                    this.notificationGateway.broadcastToUsers(targetUserIds, 'admin_notification', {
                                        type: notification.type,
                                        title: notification.title,
                                        message: notification.message,
                                        notification_id: notification.id,
                                        data: {
                                            link_url: notification.link_url,
                                            created_at: notification.created_at.toISOString(),
                                        },
                                        timestamp: new Date().toISOString(),
                                    });
                                }
                                else {
                                    this.notificationGateway.broadcastToAll('admin_notification', {
                                        type: notification.type,
                                        title: notification.title,
                                        message: notification.message,
                                        notification_id: notification.id,
                                        data: {
                                            link_url: notification.link_url,
                                            created_at: notification.created_at.toISOString(),
                                        },
                                        timestamp: new Date().toISOString(),
                                    });
                                }
                            }
                            catch (error) {
                                console.error('Failed to emit user notification:', error);
                                // Don't fail the operation if emit fails
                            }
                            _a.label = 6;
                        case 6:
                            _a.trys.push([6, 8, , 9]);
                            button = this.userTelegramService.buildInlineButton('Xem thông báo', notification.link_url || undefined);
                            telegramText = this.buildAdminTelegramMessage(notification.title, notification.message, !button);
                            telegramTargets = targetUserIds.length > 0
                                ? targetUserIds
                                : userNotificationRows.map(function (row) { return row.user_id; });
                            return [4 /*yield*/, this.userTelegramService.notifyUsers(telegramTargets, 'admin_notification', telegramText, {
                                    parse_mode: 'HTML',
                                    disable_preview: true,
                                    reply_markup: button ? { inline_keyboard: [[button]] } : undefined,
                                })];
                        case 7:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            error_3 = _a.sent();
                            this.logger.warn("Failed to send Telegram admin notifications: ".concat(error_3 instanceof Error ? error_3.message : String(error_3)));
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/, {
                                id: notification.id,
                                type: notification.type,
                                title: notification.title,
                                message: notification.message,
                                link_url: notification.link_url,
                                target_audience: notification.target_audience,
                                users_notified: usersNotified,
                                created_at: notification.created_at,
                            }];
                    }
                });
            });
        };
        AdminNotificationService_1.prototype.editNotification = function (notificationId, editDto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var createDto, newNotification, oldNotificationDeleted, userNotifications, button, telegramText, error_4, userName;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            createDto = {
                                type: editDto.type,
                                title: editDto.title,
                                message: editDto.message,
                                link_url: editDto.link_url,
                                related_entity_type: 'notification',
                                related_entity_id: notificationId.toString(),
                            };
                            return [4 /*yield*/, this.adminNotificationRepository.createUserNotification(createDto, userId)];
                        case 1:
                            newNotification = _a.sent();
                            return [4 /*yield*/, this.adminNotificationRepository.deleteAdminNotification(userId, notificationId)];
                        case 2:
                            oldNotificationDeleted = _a.sent();
                            if (!oldNotificationDeleted) {
                                throw new common_1.BadRequestException('Old notification not found or access denied');
                            }
                            return [4 /*yield*/, this.adminNotificationRepository.createAllVerifiedUserNotifications(newNotification.id)];
                        case 3:
                            userNotifications = _a.sent();
                            // Step 4: Emit event to all users (global notification)
                            try {
                                this.notificationGateway.broadcastToAll('admin_notification', {
                                    type: newNotification.type,
                                    title: newNotification.title,
                                    message: newNotification.message,
                                    notification_id: newNotification.id,
                                    data: {
                                        link_url: newNotification.link_url,
                                        created_at: newNotification.created_at.toISOString(),
                                        is_edit: true,
                                        original_notification_id: notificationId,
                                    },
                                    timestamp: new Date().toISOString(),
                                });
                            }
                            catch (error) {
                                this.logger.error('Failed to emit edited notification:', error);
                                // Don't fail the operation if emit fails
                            }
                            _a.label = 4;
                        case 4:
                            _a.trys.push([4, 6, , 7]);
                            button = this.userTelegramService.buildInlineButton('Xem thông báo', newNotification.link_url || undefined);
                            telegramText = this.buildAdminTelegramMessage(newNotification.title, newNotification.message, !button);
                            return [4 /*yield*/, this.userTelegramService.notifyUsers(userNotifications.map(function (row) { return row.user_id; }), 'admin_notification', telegramText, {
                                    parse_mode: 'HTML',
                                    disable_preview: true,
                                    reply_markup: button ? { inline_keyboard: [[button]] } : undefined,
                                })];
                        case 5:
                            _a.sent();
                            return [3 /*break*/, 7];
                        case 6:
                            error_4 = _a.sent();
                            this.logger.warn("Failed to send Telegram admin notifications: ".concat(error_4 instanceof Error ? error_4.message : String(error_4)));
                            return [3 /*break*/, 7];
                        case 7: return [4 /*yield*/, this.getUserName(userId)];
                        case 8:
                            userName = _a.sent();
                            this.logger.log("Admin ".concat(userName, " edited notification ").concat(notificationId, " -> ").concat(newNotification.id));
                            return [2 /*return*/, {
                                    success: true,
                                    new_notification_id: newNotification.id,
                                    old_notification_id: notificationId,
                                    title: newNotification.title,
                                    message: newNotification.message,
                                    type: newNotification.type,
                                    created_at: newNotification.created_at.toISOString(),
                                }];
                    }
                });
            });
        };
        AdminNotificationService_1.prototype.sendProxyOrderPurchasedAlert = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var proxyCountriesLine, isUpdate;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            proxyCountriesLine = this.formatProxyCountriesForTelegram(params.proxyCountries);
                            isUpdate = params.provisioningAction === 'update';
                            return [4 /*yield*/, this.sendProxyOrderTopicMessage({
                                    title: isUpdate ? 'Cập nhật gói' : 'Đơn proxy mới',
                                    hashtag: '#don_proxy_moi',
                                    lines: [
                                        "<b>M\u00E3 \u0111\u01A1n:</b> <code>".concat(this.userTelegramService.escapeHtml(params.orderId), "</code>"),
                                        params.userEmail
                                            ? "<b>Email user:</b> <code>".concat(this.userTelegramService.escapeHtml(params.userEmail), "</code>")
                                            : null,
                                        "<b>Ng\u01B0\u1EDDi mua:</b> ".concat(this.userTelegramService.escapeHtml(params.userName || params.userEmail || params.userId)),
                                        "<b>T\u00E0i kho\u1EA3n Webshare:</b> <code>".concat(this.userTelegramService.escapeHtml(params.mappedWebshareEmail || 'Chưa gán'), "</code>"),
                                        "<b>Lo\u1EA1i x\u1EED l\u00FD:</b> ".concat(this.userTelegramService.escapeHtml(isUpdate ? 'Cập nhật gói' : 'Mua mới')),
                                        null,
                                        "<b>T\u00EAn g\u00F3i:</b> ".concat(this.userTelegramService.escapeHtml(params.productName)),
                                        params.optionName
                                            ? "<b>Option:</b> ".concat(this.userTelegramService.escapeHtml(params.optionName))
                                            : null,
                                        params.quantity != null && params.quantity > 0
                                            ? "<b>S\u1ED1 l\u01B0\u1EE3ng:</b> ".concat(this.userTelegramService.escapeHtml(String(params.quantity)))
                                            : null,
                                        params.bandwidthGb != null && params.bandwidthGb >= 0
                                            ? "<b>B\u0103ng th\u00F4ng:</b> ".concat(this.userTelegramService.escapeHtml(params.bandwidthGb === 0
                                                ? 'Không giới hạn'
                                                : "".concat(params.bandwidthGb, " GB")))
                                            : null,
                                        "<b>Qu\u1ED1c gia:</b> ".concat(this.userTelegramService.escapeHtml(proxyCountriesLine)),
                                        "<b>Gi\u00E1:</b> ".concat(this.userTelegramService.escapeHtml(this.formatCurrencyVnd(params.amountTotalVnd))),
                                        "<b>Chu k\u1EF3:</b> ".concat(this.userTelegramService.escapeHtml(this.formatBillingCycle(params.billingCycle))),
                                        null,
                                        'Đơn đã ghi nhận thành công và đang chờ xử lý.',
                                    ],
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AdminNotificationService_1.prototype.formatProxyCountriesForTelegram = function (countries) {
            if (!countries || typeof countries !== 'object') {
                return 'Ngẫu nhiên (Pool)';
            }
            var entries = Object.entries(countries)
                .map(function (_a) {
                var rawCode = _a[0], rawQty = _a[1];
                return ({
                    code: String(rawCode !== null && rawCode !== void 0 ? rawCode : '')
                        .trim()
                        .toUpperCase(),
                    qty: Math.trunc(Number(rawQty)),
                });
            })
                .filter(function (item) { return /^[A-Z]{2}$/.test(item.code) && Number.isFinite(item.qty) && item.qty > 0; })
                .sort(function (a, b) {
                if (a.code === 'ZZ')
                    return -1;
                if (b.code === 'ZZ')
                    return 1;
                if (b.qty !== a.qty)
                    return b.qty - a.qty;
                return a.code.localeCompare(b.code);
            });
            if (!entries.length) {
                return 'Ngẫu nhiên (Pool)';
            }
            return entries
                .map(function (item) {
                return item.code === 'ZZ' ? "Ng\u1EABu nhi\u00EAn: ".concat(item.qty) : "".concat(item.code, ": ").concat(item.qty);
            })
                .join(' | ');
        };
        AdminNotificationService_1.prototype.sendProxyOrderActivatedAlert = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.sendProxyOrderTopicMessage({
                                icon: '✅',
                                title: 'Đơn proxy đã xử lý xong',
                                hashtag: '#don_proxy_hoan_tat',
                                lines: [
                                    "<b>M\u00E3 \u0111\u01A1n:</b> <code>".concat(this.userTelegramService.escapeHtml(params.orderId), "</code>"),
                                    params.userEmail
                                        ? "<b>Email user:</b> <code>".concat(this.userTelegramService.escapeHtml(params.userEmail), "</code>")
                                        : null,
                                    "<b>D\u1ECBch v\u1EE5:</b> ".concat(this.userTelegramService.escapeHtml(params.productName)),
                                ],
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AdminNotificationService_1.prototype.buildAdminTelegramMessage = function (title, message, includeAction) {
            var plainMessage = utils_1.stripHtml(message).trim();
            var preview = plainMessage.length > 300
                ? "".concat(plainMessage.slice(0, 297), "...")
                : plainMessage;
            var lines = [
                '🔔 <b>Thông báo từ Admin</b>',
                '----------------------',
                "\uD83C\uDFF7\uFE0F <b>Ti\u00EAu \u0111\u1EC1:</b> ".concat(this.userTelegramService.escapeHtml(title)),
                "\uD83D\uDCDD <b>N\u1ED9i dung:</b> ".concat(this.userTelegramService.escapeHtml(preview || 'Bạn có một thông báo mới từ Admin.')),
            ];
            if (includeAction) {
                lines.push('👉 Mở bachhoammo để xem chi tiết.');
            }
            return lines.join('\n');
        };
        AdminNotificationService_1.prototype.parseAdminTelegramTopicMap = function (raw) {
            var _a;
            if (!raw) {
                return {};
            }
            try {
                var parsed = JSON.parse(raw);
                var map = {};
                var blog = this.normalizeThreadId(parsed.blog);
                var product = this.normalizeThreadId(parsed.product);
                var shop = this.normalizeThreadId(parsed.shop);
                var withdraw = (_a = this.normalizeThreadId(parsed.withdraw)) !== null && _a !== void 0 ? _a : this.normalizeThreadId(parsed.wallet);
                var proxy = this.normalizeThreadId(parsed.proxy);
                if (blog != null)
                    map.blog = blog;
                if (product != null)
                    map.product = product;
                if (shop != null)
                    map.shop = shop;
                if (withdraw != null)
                    map.withdraw = withdraw;
                if (proxy != null)
                    map.proxy = proxy;
                return map;
            }
            catch (error) {
                this.logger.warn("Invalid TELEGRAM_ADMIN_TOPIC_MAP config: ".concat(error instanceof Error ? error.message : String(error)));
                return {};
            }
        };
        AdminNotificationService_1.prototype.normalizeThreadId = function (value) {
            if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
                return value;
            }
            if (typeof value === 'string') {
                var trimmed = value.trim();
                if (!trimmed) {
                    return null;
                }
                var parsed = Number(trimmed);
                if (Number.isInteger(parsed) && parsed > 0) {
                    return parsed;
                }
            }
            return null;
        };
        AdminNotificationService_1.prototype.parseAdminTelegramChatId = function (raw) {
            if (!raw) {
                return null;
            }
            var trimmed = raw.trim();
            if (!trimmed) {
                return null;
            }
            if (!/^-?\d+$/.test(trimmed)) {
                this.logger.warn("Invalid TELEGRAM_ADMIN_CHAT_ID config: ".concat(trimmed));
                return null;
            }
            return trimmed;
        };
        AdminNotificationService_1.prototype.resolveAdminTelegramCategory = function (notificationType, relatedEntityType) {
            var type = String(notificationType || '').toLowerCase();
            var related = String(relatedEntityType || '').toLowerCase();
            if (type === 'blog' || related === 'blog') {
                return {
                    key: 'blog',
                    label: 'Bài viết',
                    icon: '📝',
                    hashtag: '#bai_viet',
                };
            }
            if (type === 'product' || related === 'product') {
                return {
                    key: 'product',
                    label: 'Sản phẩm',
                    icon: '📦',
                    hashtag: '#san_pham',
                };
            }
            if (type === 'shop' || related === 'shop') {
                return {
                    key: 'shop',
                    label: 'Cửa hàng',
                    icon: '🏬',
                    hashtag: '#cua_hang',
                };
            }
            if (type === 'wallet' ||
                related === 'wallet' ||
                related === 'withdraw' ||
                related === 'withdrawal') {
                return {
                    key: 'withdraw',
                    label: 'Rút tiền',
                    icon: '💸',
                    hashtag: '#rut_tien',
                };
            }
            return null;
        };
        AdminNotificationService_1.prototype.buildAdminQueueTelegramMessage = function (params) {
            var plainMessage = utils_1.stripHtml(params.message).trim();
            var preview = plainMessage.length > 300
                ? "".concat(plainMessage.slice(0, 297), "...")
                : plainMessage;
            var category = params.category;
            var timestamp = new Date().toLocaleString('vi-VN', {
                timeZone: 'Asia/Ho_Chi_Minh',
            });
            var lines = [
                "<b>Th\u00F4ng b\u00E1o qu\u1EA3n tr\u1ECB</b>",
                "<b>Danh m\u1EE5c:</b> ".concat(this.userTelegramService.escapeHtml((category === null || category === void 0 ? void 0 : category.label) || 'Khác')),
                "<b>Ti\u00EAu \u0111\u1EC1:</b> ".concat(this.userTelegramService.escapeHtml(params.title)),
                "<b>N\u1ED9i dung:</b> ".concat(this.userTelegramService.escapeHtml(preview || 'Có thông báo mới cần kiểm tra.')),
                "<b>Th\u1EDDi gian:</b> ".concat(this.userTelegramService.escapeHtml(timestamp)),
                (category === null || category === void 0 ? void 0 : category.hashtag) || '#thong_bao_admin',
            ];
            if (params.includeAction) {
                lines.push('Xem chi tiết trong trang quản trị.');
            }
            return lines.join('\n');
        };
        AdminNotificationService_1.prototype.sendProxyOrderTopicMessage = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var body, error_5;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.adminTelegramChatId || !this.adminTelegramTopicMap.proxy) {
                                return [2 /*return*/];
                            }
                            body = __spreadArray(__spreadArray([
                                "".concat((_a = params.icon) !== null && _a !== void 0 ? _a : '🧾', " <b>").concat(this.userTelegramService.escapeHtml(params.title), "</b>")
                            ], params.lines.filter(Boolean), true), [
                                params.hashtag,
                            ], false).join('\n');
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, this.userTelegramService.notifyChat(this.adminTelegramChatId, body, {
                                    parse_mode: 'HTML',
                                    disable_preview: true,
                                    message_thread_id: this.adminTelegramTopicMap.proxy,
                                    allow_topic_fallback: false,
                                })];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_5 = _b.sent();
                            this.logger.warn("Failed to send proxy order Telegram alert: ".concat(error_5 instanceof Error ? error_5.message : String(error_5)));
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        AdminNotificationService_1.prototype.formatBillingCycle = function (value) {
            var normalized = String(value || '')
                .trim()
                .toLowerCase();
            return normalized === 'yearly' || normalized === 'annual'
                ? 'Theo năm'
                : 'Theo tháng';
        };
        AdminNotificationService_1.prototype.formatCurrencyVnd = function (amount) {
            return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                maximumFractionDigits: 0,
            }).format(Number.isFinite(amount) ? amount : 0);
        };
        AdminNotificationService_1.prototype.formatDateTime = function (value) {
            var date = value instanceof Date ? value : new Date(String(value));
            if (Number.isNaN(date.getTime())) {
                return String(value);
            }
            return date.toLocaleString('vi-VN', {
                timeZone: 'Asia/Ho_Chi_Minh',
            });
        };
        return AdminNotificationService_1;
    }());
    __setFunctionName(_classThis, "AdminNotificationService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminNotificationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminNotificationService = _classThis;
}();
exports.AdminNotificationService = AdminNotificationService;
