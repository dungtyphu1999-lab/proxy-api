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
exports.AdminNotificationController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var get_admin_notifications_dto_1 = require("./dto/get-admin-notifications.dto");
var mark_admin_notification_read_dto_1 = require("./dto/mark-admin-notification-read.dto");
var send_user_notification_dto_1 = require("./dto/send-user-notification.dto");
var edit_notification_dto_1 = require("./dto/edit-notification.dto");
var use_admin_jwt_auth_guard_decorator_1 = require("../auth/decorators/use-admin-jwt-auth-guard.decorator");
var AdminNotificationController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('[Admin] Notifications'), (0, common_1.Controller)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getNotifications_decorators;
    var _markNotificationAsRead_decorators;
    var _markAllNotificationsAsRead_decorators;
    var _deleteNotification_decorators;
    var _getUnreadCount_decorators;
    var _sendUserNotification_decorators;
    var _editNotification_decorators;
    var AdminNotificationController = _classThis = /** @class */ (function () {
        function AdminNotificationController_1(adminNotificationService) {
            this.adminNotificationService = (__runInitializers(this, _instanceExtraInitializers), adminNotificationService);
        }
        AdminNotificationController_1.prototype.getNotifications = function (query, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminNotificationService.getNotifications(query, req.user.sub)];
                });
            });
        };
        AdminNotificationController_1.prototype.markNotificationAsRead = function (markReadDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (markReadDto.notification_id) {
                        return [2 /*return*/, this.adminNotificationService.markNotificationAsRead(req.user.sub, markReadDto)];
                    }
                    else {
                        return [2 /*return*/, this.adminNotificationService.markAllNotificationsAsRead(req.user.sub)];
                    }
                    return [2 /*return*/];
                });
            });
        };
        AdminNotificationController_1.prototype.markAllNotificationsAsRead = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminNotificationService.markAllNotificationsAsRead(req.user.sub)];
                });
            });
        };
        AdminNotificationController_1.prototype.deleteNotification = function (id, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminNotificationService.deleteNotification(req.user.sub, id)];
                });
            });
        };
        AdminNotificationController_1.prototype.getUnreadCount = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminNotificationService.getUnreadCount(req.user.sub)];
                });
            });
        };
        AdminNotificationController_1.prototype.sendUserNotification = function (sendDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminNotificationService.sendUserNotification(sendDto, req.user.sub)];
                });
            });
        };
        AdminNotificationController_1.prototype.editNotification = function (id, editDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.adminNotificationService.editNotification(id, editDto, req.user.sub)];
                });
            });
        };
        return AdminNotificationController_1;
    }());
    __setFunctionName(_classThis, "AdminNotificationController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getNotifications_decorators = [(0, common_1.Get)(), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'Get admin notifications',
                description: 'Get paginated list of admin notifications with filters',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Admin notifications retrieved successfully',
                type: get_admin_notifications_dto_1.GetAdminNotificationsOutputDto,
            })];
        _markNotificationAsRead_decorators = [(0, common_1.Post)('read'), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'Mark admin notification as read',
                description: 'Mark a specific notification or all notifications as read',
            }), (0, swagger_1.ApiBody)({
                type: mark_admin_notification_read_dto_1.MarkAdminNotificationReadInputDto,
                description: 'Mark read data',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Admin notification marked as read successfully',
                type: mark_admin_notification_read_dto_1.MarkAdminNotificationReadOutputDto,
            })];
        _markAllNotificationsAsRead_decorators = [(0, common_1.Post)('read-all'), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'Mark all admin notifications as read',
                description: 'Mark all notifications for the current admin as read',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'All admin notifications marked as read successfully',
                type: mark_admin_notification_read_dto_1.MarkAdminNotificationReadOutputDto,
            })];
        _deleteNotification_decorators = [(0, common_1.Delete)(':id'), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'Delete admin notification',
                description: 'Soft delete a specific admin notification by setting deleted_at and deleted_by. The notification will be hidden from admin views but user_notifications remain intact.',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Admin notification deleted successfully',
                schema: {
                    type: 'object',
                    properties: {
                        success: { type: 'boolean' },
                    },
                },
            })];
        _getUnreadCount_decorators = [(0, common_1.Get)('unread-count'), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'Get admin unread count',
                description: 'Get total number of unread notifications for the current admin',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Admin unread count retrieved successfully',
                schema: {
                    type: 'object',
                    properties: {
                        unread_count: { type: 'number' },
                    },
                },
            })];
        _sendUserNotification_decorators = [(0, common_1.Post)('send-to-users'), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'Send notification to users',
                description: 'Send a notification to multiple users (verified and unblocked users only)',
            }), (0, swagger_1.ApiBody)({
                type: send_user_notification_dto_1.SendUserNotificationInputDto,
                description: 'User notification data',
            }), (0, swagger_1.ApiResponse)({
                status: 201,
                description: 'User notification sent successfully',
                type: send_user_notification_dto_1.SendUserNotificationOutputDto,
            })];
        _editNotification_decorators = [(0, common_1.Post)(':id/edit'), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'Edit admin notification',
                description: 'Edit an existing admin notification by creating a new one and soft deleting the old one. The new notification will have related_entity_type="notification" and related_entity_id pointing to the original notification.',
            }), (0, swagger_1.ApiBody)({
                type: edit_notification_dto_1.EditNotificationInputDto,
                description: 'Edit notification data',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Admin notification edited successfully',
                type: edit_notification_dto_1.EditNotificationOutputDto,
            })];
        __esDecorate(_classThis, null, _getNotifications_decorators, { kind: "method", name: "getNotifications", static: false, private: false, access: { has: function (obj) { return "getNotifications" in obj; }, get: function (obj) { return obj.getNotifications; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _markNotificationAsRead_decorators, { kind: "method", name: "markNotificationAsRead", static: false, private: false, access: { has: function (obj) { return "markNotificationAsRead" in obj; }, get: function (obj) { return obj.markNotificationAsRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _markAllNotificationsAsRead_decorators, { kind: "method", name: "markAllNotificationsAsRead", static: false, private: false, access: { has: function (obj) { return "markAllNotificationsAsRead" in obj; }, get: function (obj) { return obj.markAllNotificationsAsRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteNotification_decorators, { kind: "method", name: "deleteNotification", static: false, private: false, access: { has: function (obj) { return "deleteNotification" in obj; }, get: function (obj) { return obj.deleteNotification; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUnreadCount_decorators, { kind: "method", name: "getUnreadCount", static: false, private: false, access: { has: function (obj) { return "getUnreadCount" in obj; }, get: function (obj) { return obj.getUnreadCount; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _sendUserNotification_decorators, { kind: "method", name: "sendUserNotification", static: false, private: false, access: { has: function (obj) { return "sendUserNotification" in obj; }, get: function (obj) { return obj.sendUserNotification; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _editNotification_decorators, { kind: "method", name: "editNotification", static: false, private: false, access: { has: function (obj) { return "editNotification" in obj; }, get: function (obj) { return obj.editNotification; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminNotificationController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminNotificationController = _classThis;
}();
exports.AdminNotificationController = AdminNotificationController;
