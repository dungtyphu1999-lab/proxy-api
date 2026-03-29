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
exports.ChatRepository = void 0;
var common_1 = require("@nestjs/common");
var base_repository_1 = require("@/database/repositories/base.repository");
var get_conversations_dto_1 = require("./dto/get-conversations.dto");
var create_message_dto_1 = require("./dto/create-message.dto");
var chat_constants_1 = require("./chat.constants");
var ChatRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_repository_1.BaseRepository;
    var ChatRepository = _classThis = /** @class */ (function (_super) {
        __extends(ChatRepository_1, _super);
        function ChatRepository_1(databaseService) {
            var _this = _super.call(this, 'chat_conversations') || this;
            _this.databaseService = databaseService;
            _this.logger = new common_1.Logger(ChatRepository.name);
            return _this;
        }
        ChatRepository_1.prototype.findConversationsByUserId = function (userId, params) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, page, _b, pageSize, type, status, is_pinned, search, exclude_conversation_id, offset, query, countQuery, totalResult, total, results, items;
                var _this = this;
                var _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _a = params.page, page = _a === void 0 ? 1 : _a, _b = params.take, pageSize = _b === void 0 ? 10 : _b, type = params.type, status = params.status, is_pinned = params.is_pinned, search = params.search, exclude_conversation_id = params.exclude_conversation_id;
                            offset = (page - 1) * pageSize;
                            query = this.qb
                                .select([
                                'cc.id',
                                'cc.title',
                                'cc.last_message',
                                'cc.last_message_at',
                                'cc.last_sender_id',
                                'cc.type',
                                'cc.status',
                                'cc.is_pinned',
                                'cc.is_muted',
                                'cc.muted_until',
                                'cc.notifications_enabled',
                                'cc.unread_count',
                                'cc.created_at',
                                'cc.updated_at',
                                'cc.initiator_id',
                                'cc.participant_id',
                                'initiator.username as initiator_name',
                                'initiator_avatar.avatar_url as initiator_avatar_url',
                                'initiator.is_online as initiator_is_online',
                                'initiator.last_online_at as initiator_last_online_at',
                                this.knexInstance.raw("CASE WHEN cc.type = 'user_to_shop' THEN cc.title ELSE participant.username END as participant_name"),
                                'participant_avatar.avatar_url as participant_avatar_url',
                                'participant.is_online as participant_is_online',
                                'participant.last_online_at as participant_last_online_at',
                                this.qb
                                    .select('cm.message_type')
                                    .from('chat_messages as cm')
                                    .whereRaw('cm.conversation_id = cc.id')
                                    .where('cm.is_deleted', false)
                                    .orderBy('cm.created_at', 'desc')
                                    .limit(1)
                                    .as('last_message_type'),
                            ])
                                .from('chat_conversations as cc')
                                .leftJoin('users as initiator', 'cc.initiator_id', 'initiator.id')
                                .leftJoin('user_profiles as initiator_avatar', 'cc.initiator_id', 'initiator_avatar.user_id')
                                .leftJoin('users as participant', 'cc.participant_id', 'participant.id')
                                .leftJoin('user_profiles as participant_avatar', 'cc.participant_id', 'participant_avatar.user_id')
                                .where(function () {
                                this.where('cc.initiator_id', userId).orWhere('cc.participant_id', userId);
                            })
                                .where(function () {
                                this.whereExists(function () {
                                    this.select('*')
                                        .from('chat_messages as cm')
                                        .whereRaw('cm.conversation_id = cc.id')
                                        .where('cm.is_deleted', false);
                                })
                                    .orWhere('cc.type', 'user_to_admin')
                                    .orWhere(function () {
                                    if (exclude_conversation_id) {
                                        this.where('cc.id', exclude_conversation_id);
                                    }
                                });
                            });
                            // Apply filters
                            if (type) {
                                query = query.where('cc.type', type);
                            }
                            if (status) {
                                query = query.where('cc.status', status);
                            }
                            if (is_pinned !== undefined) {
                                query = query.where('cc.is_pinned', is_pinned);
                            }
                            if (search) {
                                query = query.where(function () {
                                    this.where('cc.last_message', 'ilike', "%".concat(search, "%"))
                                        .orWhere(function () {
                                        // If current user is initiator and type is user_to_shop, search in title (shop name)
                                        this.where('cc.initiator_id', userId)
                                            .andWhere('cc.type', 'user_to_shop')
                                            .andWhere('cc.title', 'ilike', "%".concat(search, "%"));
                                    })
                                        .orWhere(function () {
                                        // If current user is initiator and type is NOT user_to_shop, search in participant username
                                        this.where('cc.initiator_id', userId)
                                            .andWhere('cc.type', '!=', 'user_to_shop')
                                            .andWhere('participant.username', 'ilike', "%".concat(search, "%"));
                                    })
                                        .orWhere(function () {
                                        // If current user is participant, search in initiator username
                                        this.where('cc.participant_id', userId).andWhere('initiator.username', 'ilike', "%".concat(search, "%"));
                                    });
                                });
                            }
                            countQuery = this.qb
                                .from('chat_conversations as cc')
                                .leftJoin('users as initiator', 'cc.initiator_id', 'initiator.id')
                                .leftJoin('users as participant', 'cc.participant_id', 'participant.id')
                                .where(function () {
                                this.where('cc.initiator_id', userId).orWhere('cc.participant_id', userId);
                            })
                                .where(function () {
                                this.whereExists(function () {
                                    this.select('*')
                                        .from('chat_messages as cm')
                                        .whereRaw('cm.conversation_id = cc.id')
                                        .where('cm.is_deleted', false);
                                })
                                    .orWhere('cc.type', 'user_to_admin')
                                    .orWhere(function () {
                                    if (exclude_conversation_id) {
                                        this.where('cc.id', exclude_conversation_id);
                                    }
                                });
                            });
                            if (type) {
                                countQuery.where('cc.type', type);
                            }
                            if (status) {
                                countQuery.where('cc.status', status);
                            }
                            if (is_pinned !== undefined) {
                                countQuery.where('cc.is_pinned', is_pinned);
                            }
                            if (search) {
                                countQuery.where(function () {
                                    this.where('cc.last_message', 'ilike', "%".concat(search, "%"))
                                        .orWhere(function () {
                                        // If current user is initiator and type is user_to_shop, search in title (shop name)
                                        this.where('cc.initiator_id', userId)
                                            .andWhere('cc.type', 'user_to_shop')
                                            .andWhere('cc.title', 'ilike', "%".concat(search, "%"));
                                    })
                                        .orWhere(function () {
                                        // If current user is initiator and type is NOT user_to_shop, search in participant username
                                        this.where('cc.initiator_id', userId)
                                            .andWhere('cc.type', '!=', 'user_to_shop')
                                            .andWhere('participant.username', 'ilike', "%".concat(search, "%"));
                                    })
                                        .orWhere(function () {
                                        // If current user is participant, search in initiator username
                                        this.where('cc.participant_id', userId).andWhere('initiator.username', 'ilike', "%".concat(search, "%"));
                                    });
                                });
                            }
                            return [4 /*yield*/, countQuery.countDistinct('cc.id as total')];
                        case 1:
                            totalResult = _e.sent();
                            total = parseInt((_d = (_c = totalResult[0]) === null || _c === void 0 ? void 0 : _c.total) !== null && _d !== void 0 ? _d : '0', 10);
                            return [4 /*yield*/, query
                                    .groupBy([
                                    'cc.id',
                                    'cc.title',
                                    'cc.last_message',
                                    'cc.last_message_at',
                                    'cc.last_sender_id',
                                    'cc.type',
                                    'cc.status',
                                    'cc.is_pinned',
                                    'cc.is_muted',
                                    'cc.muted_until',
                                    'cc.notifications_enabled',
                                    'cc.unread_count',
                                    'cc.created_at',
                                    'cc.updated_at',
                                    'cc.initiator_id',
                                    'cc.participant_id',
                                    'initiator.username',
                                    'initiator_avatar.avatar_url',
                                    'initiator.is_online',
                                    'initiator.last_online_at',
                                    'participant.username',
                                    'participant_avatar.avatar_url',
                                    'participant.is_online',
                                    'participant.last_online_at',
                                ])
                                    // Add special ordering for exclude_conversation_id to appear first
                                    .modify(function (queryBuilder) {
                                    if (exclude_conversation_id) {
                                        queryBuilder.orderByRaw("CASE WHEN cc.id = ? THEN 0 ELSE 1 END", [
                                            exclude_conversation_id,
                                        ]);
                                    }
                                })
                                    .orderBy('cc.is_pinned', 'desc')
                                    .orderBy('cc.last_message_at', 'desc')
                                    .orderBy('cc.created_at', 'desc')
                                    .limit(pageSize)
                                    .offset(offset)];
                        case 2:
                            results = (_e.sent());
                            items = results.map(function (result) {
                                return _this.mapToDto(result, userId);
                            });
                            return [2 /*return*/, { items: items, total: total }];
                    }
                });
            });
        };
        ChatRepository_1.prototype.findConversationById = function (conversationId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb
                                .select(['id', 'initiator_id', 'participant_id', 'unread_count'])
                                .from('chat_conversations')
                                .where('id', conversationId)
                                .first()];
                        case 1:
                            result = (_a.sent());
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        ChatRepository_1.prototype.findConversationWithLastSender = function (conversationId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb
                                .select([
                                'id',
                                'initiator_id',
                                'participant_id',
                                'unread_count',
                                'last_sender_id',
                            ])
                                .from('chat_conversations')
                                .where('id', conversationId)
                                .first()];
                        case 1:
                            result = (_a.sent());
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        ChatRepository_1.prototype.findConversationByParticipants = function (initiatorId, participantId, type, shopId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb
                                .select(['id', 'participant_id', 'type', 'title', 'shop_id'])
                                .from('chat_conversations')
                                .where(function () {
                                this.where(function () {
                                    this.where('initiator_id', initiatorId).andWhere('participant_id', participantId);
                                }).orWhere(function () {
                                    this.where('initiator_id', participantId).andWhere('participant_id', initiatorId);
                                });
                            })
                                .where('type', type)
                                .where(function () {
                                if (type === 'user_to_shop' && shopId) {
                                    this.where('shop_id', shopId);
                                }
                            })
                                .first()];
                        case 1:
                            result = (_a.sent());
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        ChatRepository_1.prototype.findOrCreateConversation = function (initiatorId, participantId, type, title, shopId) {
            return __awaiter(this, void 0, void 0, function () {
                var existingConversation, newConversation;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb
                                .select([
                                'id',
                                'initiator_id',
                                'participant_id',
                                'type',
                                'title',
                                'shop_id',
                            ])
                                .from('chat_conversations')
                                .where(function () {
                                this.where(function () {
                                    this.where('initiator_id', initiatorId).andWhere('participant_id', participantId);
                                }).orWhere(function () {
                                    this.where('initiator_id', participantId).andWhere('participant_id', initiatorId);
                                });
                            })
                                .where('type', type)
                                .where(function () {
                                if (type === get_conversations_dto_1.ConversationType.USER_TO_SHOP && shopId) {
                                    this.where('shop_id', shopId);
                                }
                            })
                                .first()];
                        case 1:
                            existingConversation = (_a.sent());
                            if (existingConversation) {
                                return [2 /*return*/, {
                                        conversation: {
                                            id: existingConversation.id,
                                            participant_id: existingConversation.participant_id,
                                            type: existingConversation.type,
                                            title: existingConversation.title,
                                            is_new: false,
                                        },
                                        is_new: false,
                                    }];
                            }
                            return [4 /*yield*/, this.qb
                                    .insert({
                                    initiator_id: initiatorId,
                                    participant_id: participantId,
                                    shop_id: type === get_conversations_dto_1.ConversationType.USER_TO_SHOP ? (shopId !== null && shopId !== void 0 ? shopId : null) : null,
                                    type: type,
                                    title: title,
                                    status: chat_constants_1.CHAT_CONSTANTS.DEFAULT_CONVERSATION_STATUS,
                                    is_pinned: chat_constants_1.CHAT_CONSTANTS.DEFAULT_IS_PINNED,
                                    is_muted: chat_constants_1.CHAT_CONSTANTS.DEFAULT_IS_MUTED,
                                    notifications_enabled: chat_constants_1.CHAT_CONSTANTS.DEFAULT_NOTIFICATIONS_ENABLED,
                                    unread_count: chat_constants_1.CHAT_CONSTANTS.DEFAULT_UNREAD_COUNT,
                                    created_at: new Date(),
                                    updated_at: new Date(),
                                })
                                    .into('chat_conversations')
                                    .returning([
                                    'id',
                                    'participant_id',
                                    'type',
                                    'title',
                                ])];
                        case 2:
                            newConversation = (_a.sent())[0];
                            return [2 /*return*/, {
                                    conversation: {
                                        id: newConversation.id,
                                        participant_id: newConversation.participant_id,
                                        type: newConversation.type,
                                        title: newConversation.title,
                                        is_new: true,
                                    },
                                    is_new: true,
                                }];
                    }
                });
            });
        };
        ChatRepository_1.prototype.mapToDto = function (result, userId) {
            var initiator = {
                id: result.initiator_id,
                name: result.initiator_name || chat_constants_1.CHAT_CONSTANTS.UNKNOWN_USER_NAME,
                avatar_url: result.initiator_avatar_url,
                is_online: result.initiator_is_online,
                last_online_at: result.initiator_last_online_at,
            };
            var participant = {
                id: result.participant_id,
                name: result.participant_name || chat_constants_1.CHAT_CONSTANTS.UNKNOWN_USER_NAME,
                avatar_url: result.participant_avatar_url,
                is_online: result.participant_is_online,
                last_online_at: result.participant_last_online_at,
            };
            // Determine title based on current user
            var title = result.title;
            if (userId === result.initiator_id) {
                // Current user is initiator, show participant name
                title = result.participant_name || chat_constants_1.CHAT_CONSTANTS.UNKNOWN_USER_NAME;
            }
            else if (userId === result.participant_id) {
                // Current user is participant, show initiator name
                title = result.initiator_name || chat_constants_1.CHAT_CONSTANTS.UNKNOWN_USER_NAME;
            }
            return {
                id: result.id,
                title: title,
                last_message: result.last_message,
                last_message_at: result.last_message_at,
                last_message_type: result.last_message_type,
                last_sender_id: result.last_sender_id,
                type: result.type,
                status: result.status,
                is_pinned: result.is_pinned,
                is_muted: result.is_muted,
                muted_until: result.muted_until,
                notifications_enabled: result.notifications_enabled,
                unread_count: result.unread_count,
                created_at: result.created_at,
                updated_at: result.updated_at,
                initiator: initiator,
                participant: participant,
            };
        };
        ChatRepository_1.prototype.findMessagesByConversationId = function (conversationId, params) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, pageSize, offset, query, totalResult, total, results, items;
                var _this = this;
                var _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = params.take, pageSize = _a === void 0 ? 20 : _a;
                            offset = params.skip;
                            query = this.qb
                                .select([
                                'cm.id',
                                'cm.content',
                                'cm.message_type',
                                'cm.file_url',
                                'cm.file_name',
                                'cm.file_size',
                                'cm.file_type',
                                'cm.is_read',
                                'cm.read_at',
                                'cm.is_deleted',
                                'cm.deleted_at',
                                'cm.sender_id',
                                'u.username as sender_name',
                                'up.avatar_url as sender_avatar_url',
                                'cm.created_at',
                                'cm.updated_at',
                            ])
                                .from('chat_messages as cm')
                                .leftJoin('users as u', 'cm.sender_id', 'u.id')
                                .leftJoin('user_profiles as up', 'cm.sender_id', 'up.user_id')
                                .where('cm.conversation_id', conversationId)
                                .where('cm.is_deleted', false)
                                .groupBy([
                                'cm.id',
                                'cm.content',
                                'cm.message_type',
                                'cm.file_url',
                                'cm.file_name',
                                'cm.file_size',
                                'cm.file_type',
                                'cm.is_read',
                                'cm.read_at',
                                'cm.is_deleted',
                                'cm.deleted_at',
                                'cm.sender_id',
                                'u.username',
                                'up.avatar_url',
                                'cm.created_at',
                                'cm.updated_at',
                            ]);
                            return [4 /*yield*/, this.qb
                                    .from('chat_messages as cm')
                                    .where('cm.conversation_id', conversationId)
                                    .where('cm.is_deleted', false)
                                    .countDistinct('cm.id as total')];
                        case 1:
                            totalResult = _d.sent();
                            total = parseInt((_c = (_b = totalResult[0]) === null || _b === void 0 ? void 0 : _b.total) !== null && _c !== void 0 ? _c : '0', 10);
                            return [4 /*yield*/, query
                                    .orderBy('cm.created_at', 'desc')
                                    .limit(pageSize)
                                    .offset(offset)];
                        case 2:
                            results = _d.sent();
                            items = results.map(function (result) {
                                return _this.mapMessageToDto(result);
                            });
                            return [2 /*return*/, { items: items, total: total }];
                    }
                });
            });
        };
        ChatRepository_1.prototype.mapMessageToDto = function (result) {
            var sender = {
                id: result.sender_id,
                name: result.sender_name || chat_constants_1.CHAT_CONSTANTS.UNKNOWN_USER_NAME,
                avatar_url: result.sender_avatar_url,
            };
            return {
                id: result.id,
                content: result.content,
                message_type: result.message_type,
                file_url: result.file_url,
                file_name: result.file_name,
                file_size: result.file_size,
                file_type: result.file_type,
                is_read: result.is_read,
                read_at: result.read_at,
                is_deleted: result.is_deleted,
                deleted_at: result.deleted_at,
                sender: sender,
                created_at: result.created_at,
                updated_at: result.updated_at,
            };
        };
        ChatRepository_1.prototype.createMessage = function (senderId, createDto) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                            var results, newMessage;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, trx
                                            .insert({
                                            conversation_id: createDto.conversation_id,
                                            sender_id: senderId,
                                            content: createDto.content,
                                            message_type: createDto.message_type || create_message_dto_1.MessageType.TEXT,
                                            file_url: createDto.file_url,
                                            file_name: createDto.file_name,
                                            file_size: createDto.file_size,
                                            file_type: createDto.file_type,
                                            is_read: chat_constants_1.CHAT_CONSTANTS.DEFAULT_IS_READ,
                                            is_deleted: chat_constants_1.CHAT_CONSTANTS.DEFAULT_IS_DELETED,
                                            created_at: new Date(),
                                            updated_at: new Date(),
                                        })
                                            .into('chat_messages')
                                            .returning([
                                            'id',
                                            'conversation_id',
                                            'sender_id',
                                            'content',
                                            'message_type',
                                            'file_url',
                                            'file_name',
                                            'file_size',
                                            'file_type',
                                            'is_read',
                                            'is_deleted',
                                            'created_at',
                                            'updated_at',
                                        ])];
                                    case 1:
                                        results = (_a.sent());
                                        newMessage = results[0];
                                        return [2 /*return*/, __assign(__assign({}, newMessage), { message_type: newMessage.message_type })];
                                }
                            });
                        }); })];
                });
            });
        };
        ChatRepository_1.prototype.updateConversationLastMessage = function (conversationId, lastMessage, lastSenderId) {
            return __awaiter(this, void 0, void 0, function () {
                var currentConversation, isDifferentSender, newUnreadCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb
                                .select(['unread_count', 'last_sender_id'])
                                .from('chat_conversations')
                                .where('id', conversationId)
                                .first()];
                        case 1:
                            currentConversation = (_a.sent());
                            isDifferentSender = (currentConversation === null || currentConversation === void 0 ? void 0 : currentConversation.last_sender_id) !== lastSenderId;
                            newUnreadCount = isDifferentSender
                                ? 1
                                : ((currentConversation === null || currentConversation === void 0 ? void 0 : currentConversation.unread_count) || 0) + 1;
                            return [4 /*yield*/, this.qb
                                    .update({
                                    last_message: lastMessage,
                                    last_message_at: new Date(),
                                    last_sender_id: lastSenderId,
                                    unread_count: newUnreadCount,
                                    updated_at: new Date(),
                                })
                                    .from('chat_conversations')
                                    .where('id', conversationId)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ChatRepository_1.prototype.markConversationAsRead = function (conversationId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var conversation, isLastMessageSender_1, error_1;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            return [4 /*yield*/, this.findConversationWithLastSender(conversationId)];
                        case 1:
                            conversation = _a.sent();
                            if (!conversation) {
                                throw new Error('Conversation not found');
                            }
                            if (conversation.initiator_id !== userId &&
                                conversation.participant_id !== userId) {
                                throw new Error('Access denied to this conversation');
                            }
                            isLastMessageSender_1 = conversation.last_sender_id === userId;
                            // Mark all unread messages in conversation as read and reset unread count
                            return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: 
                                            // Mark all unread messages from other users as read
                                            return [4 /*yield*/, trx
                                                    .update({
                                                    is_read: true,
                                                    read_at: new Date(),
                                                    updated_at: new Date(),
                                                })
                                                    .from('chat_messages')
                                                    .where('conversation_id', conversationId)
                                                    .where('sender_id', '!=', userId)
                                                    .where('is_read', false)];
                                            case 1:
                                                // Mark all unread messages from other users as read
                                                _a.sent();
                                                if (!!isLastMessageSender_1) return [3 /*break*/, 3];
                                                return [4 /*yield*/, trx
                                                        .update({
                                                        unread_count: 0,
                                                        updated_at: new Date(),
                                                    })
                                                        .from('chat_conversations')
                                                        .where('id', conversationId)];
                                            case 2:
                                                _a.sent();
                                                _a.label = 3;
                                            case 3: return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 2:
                            // Mark all unread messages in conversation as read and reset unread count
                            _a.sent();
                            this.logger.log("Conversation ".concat(conversationId, " marked as read by user ").concat(userId, " (isLastMessageSender: ").concat(isLastMessageSender_1, ")"));
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            this.logger.error("Failed to mark conversation as read: ".concat(error_1.message));
                            throw error_1;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        ChatRepository_1.prototype.searchConversations = function (userId_1, query_1) {
            return __awaiter(this, arguments, void 0, function (userId, query, limit) {
                var results;
                var _this = this;
                if (limit === void 0) { limit = 50; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, trx
                                            .select([
                                            'cc.id',
                                            'cc.title',
                                            'cc.last_message',
                                            'cc.type',
                                            'cc.last_message_at',
                                            'cc.participant_id',
                                            'u.username as participant_name',
                                            'up.avatar_url as participant_avatar_url',
                                            trx.raw('GREATEST(similarity(cc.last_message, ?), similarity(u.username, ?)) as relevance_score', [query, query]),
                                        ])
                                            .from('chat_conversations as cc')
                                            .leftJoin('users as u', 'cc.participant_id', 'u.id')
                                            .leftJoin('user_profiles as up', 'cc.participant_id', 'up.user_id')
                                            .where(function () {
                                            this.where('cc.initiator_id', userId).orWhere('cc.participant_id', userId);
                                        })
                                            .where(function () {
                                            this.where('cc.last_message', 'ilike', "%".concat(query, "%"))
                                                .orWhereRaw('cc.last_message % ?', [query])
                                                .orWhere(function () {
                                                // If current user is initiator, search in participant username
                                                this.where('cc.initiator_id', userId).andWhere('u.username', 'ilike', "%".concat(query, "%"));
                                            })
                                                .orWhere(function () {
                                                // If current user is participant, search in initiator username
                                                this.where('cc.participant_id', userId).andWhere('u.username', 'ilike', "%".concat(query, "%"));
                                            })
                                                .orWhere(function () {
                                                // If current user is initiator, search in participant username with similarity
                                                this.where('cc.initiator_id', userId).andWhereRaw('u.username % ?', [query]);
                                            })
                                                .orWhere(function () {
                                                // If current user is participant, search in initiator username with similarity
                                                this.where('cc.participant_id', userId).andWhereRaw('u.username % ?', [query]);
                                            });
                                        })
                                            .orderBy('relevance_score', 'desc')
                                            .orderBy('cc.last_message_at', 'desc')
                                            .limit(limit)];
                                });
                            }); })];
                        case 1:
                            results = (_a.sent());
                            return [2 /*return*/, results.map(function (result) { return ({
                                    id: result.id,
                                    title: result.title,
                                    last_message: result.last_message,
                                    type: result.type,
                                    participant: {
                                        id: result.participant_id,
                                        name: result.participant_name || chat_constants_1.CHAT_CONSTANTS.UNKNOWN_USER_NAME,
                                        avatar_url: result.participant_avatar_url,
                                    },
                                    relevance_score: parseFloat(result.relevance_score || '0'),
                                    last_message_at: result.last_message_at,
                                }); })];
                    }
                });
            });
        };
        ChatRepository_1.prototype.searchMessages = function (userId_1, query_1, conversationId_1) {
            return __awaiter(this, arguments, void 0, function (userId, query, conversationId, limit) {
                var results;
                var _this = this;
                if (limit === void 0) { limit = 50; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                var queryBuilder;
                                return __generator(this, function (_a) {
                                    queryBuilder = trx
                                        .select([
                                        'cm.id',
                                        'cm.content',
                                        'cm.message_type',
                                        'cm.conversation_id',
                                        'cm.sender_id',
                                        'cm.created_at',
                                        'cc.title as conversation_title',
                                        'u.username as sender_name',
                                        'up.avatar_url as sender_avatar_url',
                                        trx.raw('similarity(cm.content, ?) as relevance_score', [query]),
                                    ])
                                        .from('chat_messages as cm')
                                        .leftJoin('chat_conversations as cc', 'cm.conversation_id', 'cc.id')
                                        .leftJoin('users as u', 'cm.sender_id', 'u.id')
                                        .leftJoin('user_profiles as up', 'cm.sender_id', 'up.user_id')
                                        .where('cm.is_deleted', false)
                                        .where(function () {
                                        this.where('cc.initiator_id', userId).orWhere('cc.participant_id', userId);
                                    })
                                        .where(function () {
                                        this.where('cm.content', 'ilike', "%".concat(query, "%")).orWhereRaw('cm.content % ?', [query]);
                                    });
                                    if (conversationId) {
                                        queryBuilder = queryBuilder.where('cm.conversation_id', conversationId);
                                    }
                                    return [2 /*return*/, queryBuilder
                                            .groupBy('cm.id', 'cm.content', 'cm.message_type', 'cm.conversation_id', 'cm.sender_id', 'cm.created_at', 'cc.title', 'u.username', 'up.avatar_url', 'relevance_score')
                                            .orderBy('relevance_score', 'desc')
                                            .orderBy('cm.created_at', 'desc')
                                            .limit(limit)];
                                });
                            }); })];
                        case 1:
                            results = (_a.sent());
                            return [2 /*return*/, results.map(function (result) { return ({
                                    id: result.id,
                                    content: result.content,
                                    message_type: result.message_type,
                                    conversation_id: result.conversation_id,
                                    conversation_title: result.conversation_title,
                                    sender: {
                                        id: result.sender_id,
                                        name: result.sender_name || chat_constants_1.CHAT_CONSTANTS.UNKNOWN_USER_NAME,
                                        avatar_url: result.sender_avatar_url,
                                    },
                                    relevance_score: parseFloat(result.relevance_score || '0'),
                                    created_at: result.created_at,
                                }); })];
                    }
                });
            });
        };
        ChatRepository_1.prototype.searchContacts = function (userId_1, query_1) {
            return __awaiter(this, arguments, void 0, function (userId, query, limit) {
                var results, rows;
                var _this = this;
                if (limit === void 0) { limit = 50; }
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                var sql;
                                return __generator(this, function (_a) {
                                    sql = "\n        SELECT \n          u.id,\n          u.username as name,\n          up.avatar_url,\n          u.phone_number,\n          cc.id as conversation_id,\n          cc.title as conversation_title,\n          cc.last_message,\n          cc.last_message_at,\n          similarity(u.username, ?) as relevance_score\n        FROM chat_conversations cc\n        LEFT JOIN users u ON (\n          (cc.initiator_id = ? AND u.id = cc.participant_id) OR \n          (cc.participant_id = ? AND u.id = cc.initiator_id)\n        )\n        LEFT JOIN user_profiles up ON u.id = up.user_id\n        LEFT JOIN user_role_map urm ON u.id = urm.user_id\n        LEFT JOIN roles r ON urm.role_id = r.id\n        WHERE u.id != ? \n          AND u.username ILIKE ? \n          AND (r.name != 'admin' OR r.name IS NULL)\n          AND (\n            EXISTS (\n              SELECT 1 FROM chat_messages cm \n              WHERE cm.conversation_id = cc.id \n              AND cm.is_deleted = false\n            )\n          )\n        GROUP BY u.id, u.username, up.avatar_url, u.phone_number, cc.id, cc.title, cc.last_message, cc.last_message_at, relevance_score\n        ORDER BY relevance_score DESC, cc.last_message_at DESC\n        LIMIT ?\n      ";
                                    return [2 /*return*/, trx.raw(sql, [
                                            query,
                                            userId,
                                            userId,
                                            userId,
                                            "%".concat(query, "%"),
                                            limit,
                                        ])];
                                });
                            }); })];
                        case 1:
                            results = _a.sent();
                            rows = results.rows;
                            return [2 /*return*/, rows.map(function (result) { return ({
                                    id: result.id,
                                    name: result.name || chat_constants_1.CHAT_CONSTANTS.UNKNOWN_USER_NAME,
                                    avatar_url: result.avatar_url,
                                    phone_number: result.phone_number,
                                    conversation_id: result.conversation_id,
                                    conversation_title: result.conversation_title,
                                    last_message: result.last_message,
                                    last_message_at: result.last_message_at,
                                    relevance_score: parseFloat(result.relevance_score || '0'),
                                }); })];
                    }
                });
            });
        };
        ChatRepository_1.prototype.getTotalUnreadCount = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb
                                .sum('unread_count as total_unread_count')
                                .from('chat_conversations')
                                .where(function () {
                                this.where('initiator_id', userId).orWhere('participant_id', userId);
                            })
                                .whereRaw('last_sender_id != ? OR last_sender_id IS NULL', [userId])
                                .first()];
                        case 1:
                            result = (_a.sent());
                            return [2 /*return*/, parseInt((result === null || result === void 0 ? void 0 : result.total_unread_count) || '0') || 0];
                    }
                });
            });
        };
        ChatRepository_1.prototype.findConversationDetailsById = function (conversationId, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb
                                .select([
                                'cc.id',
                                'cc.title',
                                'cc.last_message',
                                'cc.last_message_at',
                                'cc.last_sender_id',
                                'cc.type',
                                'cc.status',
                                'cc.is_pinned',
                                'cc.is_muted',
                                'cc.muted_until',
                                'cc.notifications_enabled',
                                'cc.unread_count',
                                'cc.created_at',
                                'cc.updated_at',
                                'cc.initiator_id',
                                'cc.participant_id',
                                'initiator.username as initiator_name',
                                'initiator_avatar.avatar_url as initiator_avatar_url',
                                'initiator.is_online as initiator_is_online',
                                'initiator.last_online_at as initiator_last_online_at',
                                this.knexInstance.raw("CASE WHEN cc.type = 'user_to_shop' THEN cc.title ELSE participant.username END as participant_name"),
                                'participant_avatar.avatar_url as participant_avatar_url',
                                'participant.is_online as participant_is_online',
                                'participant.last_online_at as participant_last_online_at',
                            ])
                                .from('chat_conversations as cc')
                                .leftJoin('users as initiator', 'cc.initiator_id', 'initiator.id')
                                .leftJoin('user_profiles as initiator_avatar', 'cc.initiator_id', 'initiator_avatar.user_id')
                                .leftJoin('users as participant', 'cc.participant_id', 'participant.id')
                                .leftJoin('user_profiles as participant_avatar', 'cc.participant_id', 'participant_avatar.user_id')
                                .where('cc.id', conversationId)
                                .where(function () {
                                this.where('cc.initiator_id', userId).orWhere('cc.participant_id', userId);
                            })
                                .first()];
                        case 1:
                            result = (_a.sent());
                            if (!result) {
                                return [2 /*return*/, undefined];
                            }
                            return [2 /*return*/, this.mapToDto(result, userId)];
                    }
                });
            });
        };
        /**
         * Get message count for a conversation
         */
        ChatRepository_1.prototype.getConversationMessageCount = function (conversationId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb
                                .count('id as message_count')
                                .from('chat_messages')
                                .where('conversation_id', conversationId)
                                .where('is_deleted', false)
                                .first()];
                        case 1:
                            result = (_a.sent());
                            return [2 /*return*/, parseInt((result === null || result === void 0 ? void 0 : result.message_count) || '0', 10)];
                    }
                });
            });
        };
        /**
         * Delete conversation and all its messages
         */
        ChatRepository_1.prototype.deleteConversation = function (conversationId) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: 
                                        // Delete all messages in the conversation
                                        return [4 /*yield*/, trx
                                                .from('chat_messages')
                                                .where('conversation_id', conversationId)
                                                .del()];
                                        case 1:
                                            // Delete all messages in the conversation
                                            _a.sent();
                                            // Delete the conversation
                                            return [4 /*yield*/, trx.from('chat_conversations').where('id', conversationId).del()];
                                        case 2:
                                            // Delete the conversation
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                        case 1:
                            _a.sent();
                            this.logger.log("Conversation ".concat(conversationId, " deleted successfully"));
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get unread messages for user when connecting
         */
        ChatRepository_1.prototype.getUnreadMessagesForUser = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var unreadConversations;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb
                                .select([
                                'id as conversation_id',
                                'unread_count',
                                'last_message as message_preview',
                                'last_sender_id as sender_id',
                            ])
                                .from('chat_conversations')
                                .where(function () {
                                this.where('initiator_id', userId).orWhere('participant_id', userId);
                            })
                                .where('unread_count', '>', 0)
                                .whereRaw('(last_sender_id != ? OR last_sender_id IS NULL)', [
                                userId,
                            ])];
                        case 1:
                            unreadConversations = (_a.sent());
                            return [2 /*return*/, unreadConversations.map(function (conversation) { return ({
                                    conversation_id: conversation.conversation_id,
                                    unread_count: conversation.unread_count,
                                    message_preview: conversation.message_preview || '',
                                    sender_id: conversation.sender_id || '',
                                }); })];
                    }
                });
            });
        };
        return ChatRepository_1;
    }(_classSuper));
    __setFunctionName(_classThis, "ChatRepository");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ChatRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ChatRepository = _classThis;
}();
exports.ChatRepository = ChatRepository;
