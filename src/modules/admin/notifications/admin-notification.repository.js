"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.AdminNotificationRepository = void 0;
var common_1 = require("@nestjs/common");
var base_repository_1 = require("@/database/repositories/base.repository");
var admin_notification_constants_1 = require("./admin-notification.constants");
var lodash_1 = require("lodash");
var utils_1 = require("@/shared/utils");
var AdminNotificationRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_repository_1.BaseRepository;
    var AdminNotificationRepository = _classThis = /** @class */ (function (_super) {
        __extends(AdminNotificationRepository_1, _super);
        function AdminNotificationRepository_1(databaseService) {
            var _this = _super.call(this, 'notifications') || this;
            _this.databaseService = databaseService;
            _this.logger = new common_1.Logger(AdminNotificationRepository.name);
            return _this;
        }
        AdminNotificationRepository_1.prototype.getAdminRoleId = function () {
            return __awaiter(this, void 0, void 0, function () {
                var adminRole;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb
                                .select('id')
                                .from('roles')
                                .where('name', 'admin')
                                .first()];
                        case 1:
                            adminRole = (_a.sent());
                            if (!adminRole) {
                                throw new Error('Admin role not found in database');
                            }
                            return [2 /*return*/, adminRole.id];
                    }
                });
            });
        };
        AdminNotificationRepository_1.prototype.checkSlugExists = function (slug, excludeId) {
            return __awaiter(this, void 0, void 0, function () {
                var query, existing;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = this.qb.where('slug', slug);
                            if (excludeId) {
                                query = query.whereNot('id', excludeId);
                            }
                            return [4 /*yield*/, query.first()];
                        case 1:
                            existing = _a.sent();
                            return [2 /*return*/, !!existing];
                    }
                });
            });
        };
        AdminNotificationRepository_1.prototype.extractFirstImageUrl = function (content) {
            var regex = /<img[^>]+src="([^">]+)"/i;
            var match = regex.exec(content);
            return match && match[1] ? match[1] : null;
        };
        AdminNotificationRepository_1.prototype.findAllAdminNotifications = function (params, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, page, _b, pageSize, type, is_read, is_global, target_audience, _c, sortOrder, query, countQuery, totalResult, total, results, items, query, allResults, allItems, uniqueItems, startIndex, endIndex, paginatedItems;
                var _this = this;
                var _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _a = params.page, page = _a === void 0 ? 1 : _a, _b = params.pageRow, pageSize = _b === void 0 ? admin_notification_constants_1.ADMIN_NOTIFICATION_CONSTANTS.DEFAULT_PAGE_SIZE : _b, type = params.type, is_read = params.is_read, is_global = params.is_global, target_audience = params.target_audience, _c = params.sortOrder, sortOrder = _c === void 0 ? 'desc' : _c;
                            if (!(is_global === true)) return [3 /*break*/, 3];
                            query = this.qb
                                .select([
                                'n.id',
                                'n.type',
                                'n.title',
                                'n.message',
                                'n.link_url',
                                'n.slug',
                                'n.thumbnail_url',
                                'n.is_global',
                                'n.target_audience',
                                'n.created_by',
                                'n.related_entity_type',
                                'n.related_entity_id',
                                'n.created_at',
                            ])
                                .from('notifications as n')
                                .where('n.is_global', true)
                                .whereNull('n.deleted_at');
                            // Apply other filters
                            if (type) {
                                query = query.where('n.type', type);
                            }
                            if (target_audience) {
                                query = query.where('n.target_audience', target_audience);
                            }
                            countQuery = this.qb
                                .count('* as total')
                                .from('notifications as n')
                                .where('n.is_global', true)
                                .whereNull('n.deleted_at');
                            // Apply same filters to count query
                            if (type) {
                                countQuery.where('n.type', type);
                            }
                            if (target_audience) {
                                countQuery.where('n.target_audience', target_audience);
                            }
                            return [4 /*yield*/, countQuery.first()];
                        case 1:
                            totalResult = (_e.sent());
                            total = parseInt((_d = totalResult === null || totalResult === void 0 ? void 0 : totalResult.total) !== null && _d !== void 0 ? _d : '0', 10);
                            return [4 /*yield*/, query
                                    .orderBy('n.created_at', sortOrder)
                                    .limit(pageSize)
                                    .offset((page - 1) * pageSize)];
                        case 2:
                            results = (_e.sent());
                            items = results.map(function (result) { return ({
                                id: result.id,
                                type: result.type,
                                title: result.title,
                                message: result.message,
                                link_url: result.link_url || undefined,
                                slug: result.slug || undefined,
                                thumbnail_url: result.thumbnail_url || undefined,
                                is_global: result.is_global,
                                target_audience: result.target_audience,
                                is_read: false, // Global notifications are always unread for admin view
                                read_at: undefined,
                                created_at: result.created_at,
                            }); });
                            return [2 /*return*/, { items: items, total: total }];
                        case 3:
                            query = this.qb
                                .select([
                                'n.id',
                                'n.type',
                                'n.title',
                                'n.message',
                                'n.link_url',
                                'n.slug',
                                'n.thumbnail_url',
                                'n.is_global',
                                'n.target_audience',
                                'n.created_by',
                                'n.related_entity_type',
                                'n.related_entity_id',
                                'n.created_at',
                                'un.is_read',
                                'un.read_at',
                            ])
                                .from('notifications as n')
                                .leftJoin('user_notifications as un', 'n.id', 'un.notification_id')
                                .whereNull('n.deleted_at')
                                .where('un.user_id', userId);
                            // Apply filters
                            if (type) {
                                query = query.where('n.type', type);
                            }
                            if (is_read !== undefined) {
                                query = query.where('un.is_read', is_read);
                            }
                            if (is_global !== undefined) {
                                query = query.where('n.is_global', is_global);
                            }
                            if (target_audience) {
                                query = query.where('n.target_audience', target_audience);
                            }
                            return [4 /*yield*/, query
                                    .groupBy([
                                    'n.id',
                                    'n.type',
                                    'n.title',
                                    'n.message',
                                    'n.link_url',
                                    'n.slug',
                                    'n.thumbnail_url',
                                    'n.is_global',
                                    'n.target_audience',
                                    'n.created_by',
                                    'n.related_entity_type',
                                    'n.related_entity_id',
                                    'n.created_at',
                                    'un.is_read',
                                    'un.read_at',
                                ])
                                    .orderBy('n.created_at', sortOrder)];
                        case 4:
                            allResults = _e.sent();
                            allItems = allResults.map(function (result) {
                                return _this.mapToAdminDto(result);
                            });
                            uniqueItems = (0, lodash_1.uniqBy)(allItems, 'id');
                            startIndex = (page - 1) * pageSize;
                            endIndex = startIndex + pageSize;
                            paginatedItems = uniqueItems.slice(startIndex, endIndex);
                            return [2 /*return*/, { items: paginatedItems, total: uniqueItems.length }];
                    }
                });
            });
        };
        AdminNotificationRepository_1.prototype.createAdminNotification = function (createDto, createdBy) {
            return __awaiter(this, void 0, void 0, function () {
                var baseSlug, slug, thumbnailUrl, result;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            baseSlug = utils_1.SlugUtil.generate(createDto.title);
                            return [4 /*yield*/, utils_1.SlugUtil.makeUnique(baseSlug, function (slug) {
                                    return _this.checkSlugExists(slug);
                                })];
                        case 1:
                            slug = _a.sent();
                            thumbnailUrl = this.extractFirstImageUrl(createDto.message);
                            return [4 /*yield*/, this.qb
                                    .insert({
                                    type: createDto.type,
                                    title: createDto.title,
                                    message: createDto.message,
                                    link_url: createDto.link_url,
                                    slug: slug,
                                    thumbnail_url: thumbnailUrl || undefined,
                                    target_audience: 'admin',
                                    created_by: createdBy || undefined,
                                    related_entity_type: createDto.related_entity_type || undefined,
                                    related_entity_id: createDto.related_entity_id || undefined,
                                    created_at: new Date(),
                                })
                                    .into('notifications')
                                    .returning([
                                    'id',
                                    'type',
                                    'title',
                                    'message',
                                    'link_url',
                                    'slug',
                                    'thumbnail_url',
                                    'target_audience',
                                    'created_by',
                                    'related_entity_type',
                                    'related_entity_id',
                                    'created_at',
                                ])];
                        case 2:
                            result = (_a.sent())[0];
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        AdminNotificationRepository_1.prototype.createAdminUserNotifications = function (notificationId, adminUserIds) {
            return __awaiter(this, void 0, void 0, function () {
                var unlockedUsers, userNotifications, results;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (adminUserIds.length === 0)
                                return [2 /*return*/, []];
                            return [4 /*yield*/, this.qb
                                    .select('id')
                                    .from('users')
                                    .whereIn('id', adminUserIds)
                                    .where('is_locked', false)];
                        case 1:
                            unlockedUsers = (_a.sent());
                            if (unlockedUsers.length === 0)
                                return [2 /*return*/, []];
                            userNotifications = unlockedUsers.map(function (u) { return ({
                                notification_id: notificationId,
                                user_id: u.id,
                                is_read: admin_notification_constants_1.ADMIN_NOTIFICATION_CONSTANTS.DEFAULT_IS_READ,
                                created_at: new Date(),
                            }); });
                            return [4 /*yield*/, this.qb
                                    .insert(userNotifications)
                                    .into('user_notifications')
                                    .onConflict(['notification_id', 'user_id'])
                                    .ignore()
                                    .returning([
                                    'id',
                                    'notification_id',
                                    'user_id',
                                    'is_read',
                                    'created_at',
                                ])];
                        case 2:
                            results = (_a.sent());
                            return [2 /*return*/, results];
                    }
                });
            });
        };
        AdminNotificationRepository_1.prototype.createAllAdminUserNotifications = function (notificationId) {
            return __awaiter(this, void 0, void 0, function () {
                var adminRoleId, adminUsers, userNotifications, results;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getAdminRoleId()];
                        case 1:
                            adminRoleId = _a.sent();
                            return [4 /*yield*/, this.qb
                                    .select('users.id')
                                    .from('users')
                                    .join('user_role_map', 'users.id', 'user_role_map.user_id')
                                    .where('user_role_map.role_id', adminRoleId)
                                    .where('users.is_locked', false)];
                        case 2:
                            adminUsers = (_a.sent());
                            if (adminUsers.length === 0)
                                return [2 /*return*/, []];
                            userNotifications = adminUsers.map(function (u) { return ({
                                notification_id: notificationId,
                                user_id: u.id,
                                is_read: admin_notification_constants_1.ADMIN_NOTIFICATION_CONSTANTS.DEFAULT_IS_READ,
                                created_at: new Date(),
                            }); });
                            return [4 /*yield*/, this.qb
                                    .insert(userNotifications)
                                    .into('user_notifications')
                                    .onConflict(['notification_id', 'user_id'])
                                    .ignore()
                                    .returning([
                                    'id',
                                    'notification_id',
                                    'user_id',
                                    'is_read',
                                    'created_at',
                                ])];
                        case 3:
                            results = (_a.sent());
                            return [2 /*return*/, results];
                    }
                });
            });
        };
        AdminNotificationRepository_1.prototype.createUserNotification = function (createDto, createdBy) {
            return __awaiter(this, void 0, void 0, function () {
                var baseSlug, slug, thumbnailUrl, result;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            baseSlug = utils_1.SlugUtil.generate(createDto.title);
                            return [4 /*yield*/, utils_1.SlugUtil.makeUnique(baseSlug, function (slug) {
                                    return _this.checkSlugExists(slug);
                                })];
                        case 1:
                            slug = _a.sent();
                            thumbnailUrl = this.extractFirstImageUrl(createDto.message);
                            return [4 /*yield*/, this.qb
                                    .insert({
                                    type: createDto.type,
                                    title: createDto.title,
                                    message: createDto.message,
                                    link_url: "/notification/".concat(slug),
                                    slug: slug,
                                    thumbnail_url: thumbnailUrl || undefined,
                                    is_global: true,
                                    target_audience: 'user',
                                    created_by: createdBy || undefined,
                                    related_entity_type: createDto.related_entity_type || undefined,
                                    related_entity_id: createDto.related_entity_id || undefined,
                                    created_at: new Date(),
                                })
                                    .into('notifications')
                                    .returning([
                                    'id',
                                    'type',
                                    'title',
                                    'message',
                                    'link_url',
                                    'slug',
                                    'thumbnail_url',
                                    'is_global',
                                    'target_audience',
                                    'created_by',
                                    'related_entity_type',
                                    'related_entity_id',
                                    'created_at',
                                ])];
                        case 2:
                            result = (_a.sent())[0];
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        AdminNotificationRepository_1.prototype.createUserNotifications = function (notificationId, userIds) {
            return __awaiter(this, void 0, void 0, function () {
                var userNotifications, results;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (userIds.length === 0)
                                return [2 /*return*/, []];
                            userNotifications = userIds.map(function (uid) { return ({
                                notification_id: notificationId,
                                user_id: uid,
                                is_read: admin_notification_constants_1.ADMIN_NOTIFICATION_CONSTANTS.DEFAULT_IS_READ,
                                created_at: new Date(),
                            }); });
                            return [4 /*yield*/, this.qb
                                    .insert(userNotifications)
                                    .into('user_notifications')
                                    .onConflict(['notification_id', 'user_id'])
                                    .ignore()
                                    .returning([
                                    'id',
                                    'notification_id',
                                    'user_id',
                                    'is_read',
                                    'created_at',
                                ])];
                        case 1:
                            results = (_a.sent());
                            return [2 /*return*/, results];
                    }
                });
            });
        };
        AdminNotificationRepository_1.prototype.createAllVerifiedUserNotifications = function (notificationId) {
            return __awaiter(this, void 0, void 0, function () {
                var adminRoleId, verifiedUsers, userNotifications, results;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getAdminRoleId()];
                        case 1:
                            adminRoleId = _a.sent();
                            return [4 /*yield*/, this.knexInstance('users')
                                    .select('users.id')
                                    .where('users.is_verified', true)
                                    .where('users.is_locked', false)
                                    .whereNotExists(this.knexInstance('user_role_map')
                                    .select('*')
                                    .whereRaw('user_role_map.user_id = users.id')
                                    .where('user_role_map.role_id', adminRoleId))];
                        case 2:
                            verifiedUsers = (_a.sent());
                            if (verifiedUsers.length === 0)
                                return [2 /*return*/, []];
                            userNotifications = verifiedUsers.map(function (u) { return ({
                                notification_id: notificationId,
                                user_id: u.id,
                                is_read: admin_notification_constants_1.ADMIN_NOTIFICATION_CONSTANTS.DEFAULT_IS_READ,
                                created_at: new Date(),
                            }); });
                            return [4 /*yield*/, this.qb
                                    .insert(userNotifications)
                                    .into('user_notifications')
                                    .onConflict(['notification_id', 'user_id'])
                                    .ignore()
                                    .returning([
                                    'id',
                                    'notification_id',
                                    'user_id',
                                    'is_read',
                                    'created_at',
                                ])];
                        case 3:
                            results = (_a.sent());
                            return [2 /*return*/, results];
                    }
                });
            });
        };
        AdminNotificationRepository_1.prototype.markAdminNotificationAsRead = function (userId, notificationId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb
                                .table('user_notifications')
                                .update({
                                is_read: true,
                                read_at: new Date(),
                            })
                                .where('user_id', userId)
                                .where('is_read', false) // Only update unread notifications
                                .modify(function (qb) {
                                if (notificationId) {
                                    qb.where('notification_id', notificationId);
                                }
                            })
                                .returning('id')];
                        case 1:
                            result = (_a.sent());
                            return [2 /*return*/, result.length];
                    }
                });
            });
        };
        AdminNotificationRepository_1.prototype.deleteAdminNotification = function (userId, notificationId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb
                                .table('notifications')
                                .update({
                                deleted_at: new Date(),
                                deleted_by: userId,
                            })
                                .where('id', notificationId)
                                .whereNull('deleted_at')];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result > 0];
                    }
                });
            });
        };
        AdminNotificationRepository_1.prototype.getAdminUnreadCount = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.qb
                                .count('* as total')
                                .from('user_notifications as un')
                                .join('notifications as n', 'un.notification_id', 'n.id')
                                .where('un.user_id', userId)
                                .where('un.is_read', false)
                                .where('n.target_audience', 'admin')
                                .whereNull('n.deleted_at')
                                .first()];
                        case 1:
                            result = (_b.sent());
                            return [2 /*return*/, parseInt((_a = result === null || result === void 0 ? void 0 : result.total) !== null && _a !== void 0 ? _a : '0', 10)];
                    }
                });
            });
        };
        AdminNotificationRepository_1.prototype.getTotalAdminUnreadCount = function () {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.qb
                                .count('* as total')
                                .from('user_notifications as un')
                                .join('notifications as n', 'un.notification_id', 'n.id')
                                .where('un.is_read', false)
                                .where('n.target_audience', 'admin')
                                .whereNull('n.deleted_at')
                                .first()];
                        case 1:
                            result = (_b.sent());
                            return [2 /*return*/, parseInt((_a = result === null || result === void 0 ? void 0 : result.total) !== null && _a !== void 0 ? _a : '0', 10)];
                    }
                });
            });
        };
        AdminNotificationRepository_1.prototype.markNotificationsAsReadByRelatedEntity = function (userId, relatedEntityType, relatedEntityId) {
            return __awaiter(this, void 0, void 0, function () {
                var relatedNotifications, notificationIds, result, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.qb
                                    .select('id')
                                    .from('notifications')
                                    .where('related_entity_type', relatedEntityType)
                                    .where('related_entity_id', relatedEntityId)
                                    .where('target_audience', 'admin')
                                    .whereNull('deleted_at')];
                        case 1:
                            relatedNotifications = (_a.sent());
                            if (relatedNotifications.length === 0) {
                                this.logger.log("No notifications found for entity ".concat(relatedEntityType, ":").concat(relatedEntityId));
                                return [2 /*return*/, 0];
                            }
                            notificationIds = relatedNotifications.map(function (n) { return n.id; });
                            return [4 /*yield*/, this.qb
                                    .table('user_notifications')
                                    .update({
                                    is_read: true,
                                    read_at: new Date(),
                                })
                                    .where('user_id', userId)
                                    .where('is_read', false) // Only update unread notifications
                                    .whereIn('notification_id', notificationIds)
                                    .returning('id')];
                        case 2:
                            result = _a.sent();
                            return [2 /*return*/, result.length];
                        case 3:
                            error_1 = _a.sent();
                            this.logger.error("Error marking notifications as read for user ".concat(userId, ":"), error_1);
                            throw error_1;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        AdminNotificationRepository_1.prototype.mapToAdminDto = function (result) {
            return {
                id: result.id,
                type: result.type,
                title: result.title,
                message: result.message,
                link_url: result.link_url,
                slug: result.slug || undefined,
                thumbnail_url: result.thumbnail_url || undefined,
                is_global: result.is_global || false,
                target_audience: result.target_audience,
                is_read: result.is_read || false,
                read_at: result.read_at,
                created_at: result.created_at,
            };
        };
        return AdminNotificationRepository_1;
    }(_classSuper));
    __setFunctionName(_classThis, "AdminNotificationRepository");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminNotificationRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminNotificationRepository = _classThis;
}();
exports.AdminNotificationRepository = AdminNotificationRepository;
