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
exports.NotificationController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var get_notifications_dto_1 = require("./dto/get-notifications.dto");
var get_system_notifications_dto_1 = require("./dto/get-system-notifications.dto");
var mark_read_dto_1 = require("./dto/mark-read.dto");
var get_latest_system_notifications_dto_1 = require("./dto/get-latest-system-notifications.dto");
var get_notification_by_slug_dto_1 = require("./dto/get-notification-by-slug.dto");
var use_jwt_auth_guard_decorator_1 = require("../auth/decorators/use-jwt-auth-guard.decorator");
var NotificationController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('[User] Notifications'), (0, common_1.Controller)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getNotifications_decorators;
    var _getSystemNotifications_decorators;
    var _markNotificationAsRead_decorators;
    var _getUnreadCount_decorators;
    var _getLatestSystemNotifications_decorators;
    var _getNotificationBySlug_decorators;
    var _markAllNotificationsAsRead_decorators;
    var NotificationController = _classThis = /** @class */ (function () {
        function NotificationController_1(notificationService) {
            this.notificationService = (__runInitializers(this, _instanceExtraInitializers), notificationService);
        }
        NotificationController_1.prototype.getNotifications = function (query, req) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                var _a;
                return __generator(this, function (_b) {
                    userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.sub;
                    if (!userId) {
                        // If no user, return system notifications instead
                        return [2 /*return*/, this.notificationService.getSystemNotifications(query)];
                    }
                    return [2 /*return*/, this.notificationService.getNotifications(userId, query)];
                });
            });
        };
        NotificationController_1.prototype.getSystemNotifications = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.notificationService.getSystemNotifications(query)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        NotificationController_1.prototype.markNotificationAsRead = function (markReadDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.notificationService.markNotificationAsRead(req.user.sub, markReadDto)];
                });
            });
        };
        NotificationController_1.prototype.getUnreadCount = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.notificationService.getUnreadCount(req.user.sub)];
                });
            });
        };
        NotificationController_1.prototype.getLatestSystemNotifications = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.notificationService.getLatestSystemNotifications(query.limit)];
                });
            });
        };
        NotificationController_1.prototype.getNotificationBySlug = function (params, query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.notificationService.getNotificationBySlug(params.slug)];
                });
            });
        };
        NotificationController_1.prototype.markAllNotificationsAsRead = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.notificationService.markAllNotificationsAsRead(req.user.sub)];
                });
            });
        };
        return NotificationController_1;
    }());
    __setFunctionName(_classThis, "NotificationController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getNotifications_decorators = [(0, common_1.Get)(), (0, use_jwt_auth_guard_decorator_1.UseJwtAuthGuard)({ optional: true }), (0, swagger_1.ApiOperation)({
                summary: 'Get user notifications',
                description: 'Get paginated list of user notifications with filters',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Notifications retrieved successfully',
                type: get_notifications_dto_1.GetNotificationsOutputDto,
            })];
        _getSystemNotifications_decorators = [(0, common_1.Get)('system'), (0, swagger_1.ApiOperation)({
                summary: 'Get system notifications',
                description: 'Get paginated list of global system notifications (no authentication required)',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'System notifications retrieved successfully',
                type: get_system_notifications_dto_1.GetSystemNotificationsOutputDto,
            })];
        _markNotificationAsRead_decorators = [(0, common_1.Post)('read'), (0, use_jwt_auth_guard_decorator_1.UseJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'Mark notification as read',
                description: 'Mark a specific notification as read by notification ID',
            }), (0, swagger_1.ApiBody)({
                type: mark_read_dto_1.MarkNotificationReadInputDto,
                description: 'Mark read data',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Notification marked as read successfully',
                type: mark_read_dto_1.MarkNotificationReadOutputDto,
            })];
        _getUnreadCount_decorators = [(0, common_1.Get)('unread-count'), (0, use_jwt_auth_guard_decorator_1.UseJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'Get unread count',
                description: 'Get total number of unread notifications for the current user',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Unread count retrieved successfully',
                schema: {
                    type: 'object',
                    properties: {
                        unread_count: { type: 'number' },
                    },
                },
            })];
        _getLatestSystemNotifications_decorators = [(0, common_1.Get)('latest-system'), (0, swagger_1.ApiOperation)({
                summary: 'Get latest system notifications',
                description: 'Get the latest system notifications with a specified limit (no authentication required)',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Latest system notifications retrieved successfully',
                type: get_latest_system_notifications_dto_1.GetLatestSystemNotificationsOutputDto,
            })];
        _getNotificationBySlug_decorators = [(0, common_1.Get)(':slug'), (0, swagger_1.ApiOperation)({
                summary: 'Get notification by slug',
                description: 'Get a specific notification by its slug (no authentication required). Use for_seo=true to prevent any tracking.',
            }), (0, swagger_1.ApiParam)({
                name: 'slug',
                description: 'Notification slug',
                example: 'system-maintenance-notice',
            }), (0, swagger_1.ApiQuery)({
                name: 'for_seo',
                description: 'Flag to indicate if request is for SEO purposes (will not perform any tracking)',
                required: false,
                type: String,
                example: 'false',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Notification retrieved successfully',
                type: get_notification_by_slug_dto_1.GetNotificationBySlugOutputDto,
            }), (0, swagger_1.ApiResponse)({
                status: 404,
                description: 'Notification not found',
                schema: {
                    type: 'object',
                    properties: {
                        notification: { type: 'null' },
                        found: { type: 'boolean', example: false },
                    },
                },
            })];
        _markAllNotificationsAsRead_decorators = [(0, common_1.Post)('read-all'), (0, use_jwt_auth_guard_decorator_1.UseJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'Mark all user notifications as read',
                description: 'Mark all notifications for the current user as read',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'All user notifications marked as read successfully',
                type: mark_read_dto_1.MarkNotificationReadOutputDto,
            })];
        __esDecorate(_classThis, null, _getNotifications_decorators, { kind: "method", name: "getNotifications", static: false, private: false, access: { has: function (obj) { return "getNotifications" in obj; }, get: function (obj) { return obj.getNotifications; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getSystemNotifications_decorators, { kind: "method", name: "getSystemNotifications", static: false, private: false, access: { has: function (obj) { return "getSystemNotifications" in obj; }, get: function (obj) { return obj.getSystemNotifications; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _markNotificationAsRead_decorators, { kind: "method", name: "markNotificationAsRead", static: false, private: false, access: { has: function (obj) { return "markNotificationAsRead" in obj; }, get: function (obj) { return obj.markNotificationAsRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getUnreadCount_decorators, { kind: "method", name: "getUnreadCount", static: false, private: false, access: { has: function (obj) { return "getUnreadCount" in obj; }, get: function (obj) { return obj.getUnreadCount; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getLatestSystemNotifications_decorators, { kind: "method", name: "getLatestSystemNotifications", static: false, private: false, access: { has: function (obj) { return "getLatestSystemNotifications" in obj; }, get: function (obj) { return obj.getLatestSystemNotifications; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getNotificationBySlug_decorators, { kind: "method", name: "getNotificationBySlug", static: false, private: false, access: { has: function (obj) { return "getNotificationBySlug" in obj; }, get: function (obj) { return obj.getNotificationBySlug; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _markAllNotificationsAsRead_decorators, { kind: "method", name: "markAllNotificationsAsRead", static: false, private: false, access: { has: function (obj) { return "markAllNotificationsAsRead" in obj; }, get: function (obj) { return obj.markAllNotificationsAsRead; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationController = _classThis;
}();
exports.NotificationController = NotificationController;
