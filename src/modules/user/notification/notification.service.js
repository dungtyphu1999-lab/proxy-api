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
exports.NotificationService = void 0;
var common_1 = require("@nestjs/common");
var NotificationService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var NotificationService = _classThis = /** @class */ (function () {
        function NotificationService_1(notificationRepository) {
            this.notificationRepository = notificationRepository;
        }
        NotificationService_1.prototype.getNotifications = function (userId, params) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, items, total, _b, page, _c, pageSize, unreadCount;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.notificationRepository.findNotificationsByUserId(userId, params)];
                        case 1:
                            _a = _d.sent(), items = _a.items, total = _a.total;
                            _b = params.page, page = _b === void 0 ? 1 : _b, _c = params.take, pageSize = _c === void 0 ? 20 : _c;
                            return [4 /*yield*/, this.notificationRepository.getUnreadCount(userId)];
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
        NotificationService_1.prototype.getSystemNotifications = function (params) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, items, total, _b, page, _c, pageSize, unreadCount;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, this.notificationRepository.findSystemNotifications(params)];
                        case 1:
                            _a = _d.sent(), items = _a.items, total = _a.total;
                            _b = params.page, page = _b === void 0 ? 1 : _b, _c = params.pageRow, pageSize = _c === void 0 ? 10 : _c;
                            unreadCount = total;
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
        NotificationService_1.prototype.createNotification = function (createDto, createdBy) {
            return __awaiter(this, void 0, void 0, function () {
                var notification, usersNotified, userNotifications, userNotifications;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.notificationRepository.createNotification(createDto, createdBy)];
                        case 1:
                            notification = _a.sent();
                            usersNotified = 0;
                            if (!createDto.is_global) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.notificationRepository.createGlobalUserNotifications(notification.id)];
                        case 2:
                            userNotifications = _a.sent();
                            usersNotified = userNotifications.length;
                            return [3 /*break*/, 6];
                        case 3:
                            if (!(createDto.user_ids && createDto.user_ids.length > 0)) return [3 /*break*/, 5];
                            return [4 /*yield*/, this.notificationRepository.createUserNotifications(notification.id, createDto.user_ids)];
                        case 4:
                            userNotifications = _a.sent();
                            usersNotified = userNotifications.length;
                            return [3 /*break*/, 6];
                        case 5: throw new common_1.BadRequestException('Either is_global must be true or user_ids must be provided');
                        case 6: return [2 /*return*/, {
                                id: notification.id,
                                type: notification.type,
                                title: notification.title,
                                message: notification.message,
                                link_url: notification.link_url,
                                is_global: notification.is_global,
                                target_audience: notification.target_audience,
                                users_notified: usersNotified,
                                created_at: notification.created_at,
                            }];
                    }
                });
            });
        };
        NotificationService_1.prototype.markNotificationAsRead = function (userId, markReadDto) {
            return __awaiter(this, void 0, void 0, function () {
                var markedCount, unreadCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.notificationRepository.markNotificationAsRead(userId, markReadDto.notification_id)];
                        case 1:
                            markedCount = _a.sent();
                            return [4 /*yield*/, this.notificationRepository.getUnreadCount(userId)];
                        case 2:
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
        NotificationService_1.prototype.markAllNotificationsAsRead = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var markedCount, unreadCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.notificationRepository.markNotificationAsRead(userId)];
                        case 1:
                            markedCount = _a.sent();
                            return [4 /*yield*/, this.notificationRepository.getUnreadCount(userId)];
                        case 2:
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
        NotificationService_1.prototype.getUnreadCount = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var unreadCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.notificationRepository.getUnreadCount(userId)];
                        case 1:
                            unreadCount = _a.sent();
                            return [2 /*return*/, { unread_count: unreadCount }];
                    }
                });
            });
        };
        NotificationService_1.prototype.getLatestSystemNotifications = function () {
            return __awaiter(this, arguments, void 0, function (limit) {
                var results, notifications;
                if (limit === void 0) { limit = 10; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.notificationRepository.findLatestSystemNotifications(limit)];
                        case 1:
                            results = _a.sent();
                            notifications = results.map(function (result) { return ({
                                id: result.id,
                                type: result.type,
                                title: result.title,
                                message: result.message,
                                link_url: result.link_url || undefined,
                                slug: result.slug || undefined,
                                thumbnail_url: result.thumbnail_url || undefined,
                                created_at: new Date(result.created_at).toISOString(),
                            }); });
                            return [2 /*return*/, {
                                    notifications: notifications,
                                    total: notifications.length,
                                    limit: limit,
                                }];
                    }
                });
            });
        };
        NotificationService_1.prototype.getNotificationById = function (notificationId) {
            return __awaiter(this, void 0, void 0, function () {
                var result, notification;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.notificationRepository.findNotificationById(notificationId)];
                        case 1:
                            result = _a.sent();
                            if (!result) {
                                return [2 /*return*/, {
                                        notification: null,
                                        found: false,
                                    }];
                            }
                            notification = {
                                id: result.id,
                                type: result.type,
                                title: result.title,
                                message: result.message,
                                link_url: result.link_url || undefined,
                                slug: result.slug || undefined,
                                thumbnail_url: result.thumbnail_url || undefined,
                                is_global: result.is_global,
                                target_audience: result.target_audience,
                                created_at: new Date(result.created_at).toISOString(),
                            };
                            return [2 /*return*/, {
                                    notification: notification,
                                    found: true,
                                }];
                    }
                });
            });
        };
        NotificationService_1.prototype.getNotificationBySlug = function (slug) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.notificationRepository.findNotificationBySlug(slug)];
                        case 1:
                            result = _a.sent();
                            if (!result) {
                                throw new common_1.NotFoundException("Notification with slug ".concat(slug, " not found"));
                            }
                            return [2 /*return*/, {
                                    id: result.id,
                                    type: result.type,
                                    title: result.title,
                                    message: result.message,
                                    link_url: result.link_url || undefined,
                                    slug: result.slug || undefined,
                                    thumbnail_url: result.thumbnail_url || undefined,
                                    is_global: result.is_global,
                                    target_audience: result.target_audience,
                                    created_at: new Date(result.created_at).toISOString(),
                                }];
                    }
                });
            });
        };
        return NotificationService_1;
    }());
    __setFunctionName(_classThis, "NotificationService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationService = _classThis;
}();
exports.NotificationService = NotificationService;
