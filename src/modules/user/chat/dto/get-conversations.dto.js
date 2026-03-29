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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConversationsOutputDto = exports.ConversationDto = exports.ConversationParticipantDto = exports.GetConversationsInputDto = exports.ConversationStatus = exports.ConversationType = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var pagination_dtos_1 = require("@/shared/dto/pagination.dtos");
var ConversationType;
(function (ConversationType) {
    ConversationType["USER_TO_USER"] = "user_to_user";
    ConversationType["USER_TO_SHOP"] = "user_to_shop";
    ConversationType["USER_TO_ADMIN"] = "user_to_admin";
    ConversationType["ADMIN_TO_USER"] = "admin_to_user";
})(ConversationType || (exports.ConversationType = ConversationType = {}));
var ConversationStatus;
(function (ConversationStatus) {
    ConversationStatus["ACTIVE"] = "active";
    ConversationStatus["ARCHIVED"] = "archived";
    ConversationStatus["BLOCKED"] = "blocked";
})(ConversationStatus || (exports.ConversationStatus = ConversationStatus = {}));
var GetConversationsInputDto = function () {
    var _a;
    var _classSuper = pagination_dtos_1.PaginationInputDto;
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _is_pinned_decorators;
    var _is_pinned_initializers = [];
    var _is_pinned_extraInitializers = [];
    var _search_decorators;
    var _search_initializers = [];
    var _search_extraInitializers = [];
    var _exclude_conversation_id_decorators;
    var _exclude_conversation_id_initializers = [];
    var _exclude_conversation_id_extraInitializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(GetConversationsInputDto, _super);
            function GetConversationsInputDto() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.type = __runInitializers(_this, _type_initializers, void 0);
                _this.status = (__runInitializers(_this, _type_extraInitializers), __runInitializers(_this, _status_initializers, void 0));
                _this.is_pinned = (__runInitializers(_this, _status_extraInitializers), __runInitializers(_this, _is_pinned_initializers, void 0));
                _this.search = (__runInitializers(_this, _is_pinned_extraInitializers), __runInitializers(_this, _search_initializers, void 0));
                _this.exclude_conversation_id = (__runInitializers(_this, _search_extraInitializers), __runInitializers(_this, _exclude_conversation_id_initializers, void 0));
                __runInitializers(_this, _exclude_conversation_id_extraInitializers);
                return _this;
            }
            return GetConversationsInputDto;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Filter by conversation type',
                    enum: ConversationType,
                    example: 'user_to_user',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(ConversationType), (0, class_transformer_1.Type)(function () { return String; })];
            _status_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Filter by conversation status',
                    enum: ConversationStatus,
                    example: 'active',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(ConversationStatus), (0, class_transformer_1.Type)(function () { return String; })];
            _is_pinned_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Filter by pinned conversations only',
                    example: false,
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)(), (0, class_transformer_1.Type)(function () { return Boolean; })];
            _search_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Search conversations by title or last message',
                    example: 'Hello',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)(), (0, class_transformer_1.Type)(function () { return String; })];
            _exclude_conversation_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Exclude conversation ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsUUID)()];
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _is_pinned_decorators, { kind: "field", name: "is_pinned", static: false, private: false, access: { has: function (obj) { return "is_pinned" in obj; }, get: function (obj) { return obj.is_pinned; }, set: function (obj, value) { obj.is_pinned = value; } }, metadata: _metadata }, _is_pinned_initializers, _is_pinned_extraInitializers);
            __esDecorate(null, null, _search_decorators, { kind: "field", name: "search", static: false, private: false, access: { has: function (obj) { return "search" in obj; }, get: function (obj) { return obj.search; }, set: function (obj, value) { obj.search = value; } }, metadata: _metadata }, _search_initializers, _search_extraInitializers);
            __esDecorate(null, null, _exclude_conversation_id_decorators, { kind: "field", name: "exclude_conversation_id", static: false, private: false, access: { has: function (obj) { return "exclude_conversation_id" in obj; }, get: function (obj) { return obj.exclude_conversation_id; }, set: function (obj, value) { obj.exclude_conversation_id = value; } }, metadata: _metadata }, _exclude_conversation_id_initializers, _exclude_conversation_id_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetConversationsInputDto = GetConversationsInputDto;
var ConversationParticipantDto = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _avatar_url_decorators;
    var _avatar_url_initializers = [];
    var _avatar_url_extraInitializers = [];
    var _is_online_decorators;
    var _is_online_initializers = [];
    var _is_online_extraInitializers = [];
    var _last_online_at_decorators;
    var _last_online_at_initializers = [];
    var _last_online_at_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ConversationParticipantDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
                this.avatar_url = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _avatar_url_initializers, void 0));
                this.is_online = (__runInitializers(this, _avatar_url_extraInitializers), __runInitializers(this, _is_online_initializers, void 0));
                this.last_online_at = (__runInitializers(this, _is_online_extraInitializers), __runInitializers(this, _last_online_at_initializers, void 0));
                __runInitializers(this, _last_online_at_extraInitializers);
            }
            return ConversationParticipantDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Participant ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                }), (0, class_validator_1.IsString)()];
            _name_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Participant name',
                    example: 'John Doe',
                }), (0, class_validator_1.IsString)()];
            _avatar_url_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Participant avatar URL',
                    example: 'https://example.com/avatar.jpg',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _is_online_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Participant online status',
                    example: true,
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsBoolean)()];
            _last_online_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Participant last online timestamp',
                    example: '2024-01-01T12:00:00Z',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)(), (0, class_transformer_1.Type)(function () { return Date; })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _avatar_url_decorators, { kind: "field", name: "avatar_url", static: false, private: false, access: { has: function (obj) { return "avatar_url" in obj; }, get: function (obj) { return obj.avatar_url; }, set: function (obj, value) { obj.avatar_url = value; } }, metadata: _metadata }, _avatar_url_initializers, _avatar_url_extraInitializers);
            __esDecorate(null, null, _is_online_decorators, { kind: "field", name: "is_online", static: false, private: false, access: { has: function (obj) { return "is_online" in obj; }, get: function (obj) { return obj.is_online; }, set: function (obj, value) { obj.is_online = value; } }, metadata: _metadata }, _is_online_initializers, _is_online_extraInitializers);
            __esDecorate(null, null, _last_online_at_decorators, { kind: "field", name: "last_online_at", static: false, private: false, access: { has: function (obj) { return "last_online_at" in obj; }, get: function (obj) { return obj.last_online_at; }, set: function (obj, value) { obj.last_online_at = value; } }, metadata: _metadata }, _last_online_at_initializers, _last_online_at_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ConversationParticipantDto = ConversationParticipantDto;
var ConversationDto = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _last_message_decorators;
    var _last_message_initializers = [];
    var _last_message_extraInitializers = [];
    var _last_message_at_decorators;
    var _last_message_at_initializers = [];
    var _last_message_at_extraInitializers = [];
    var _last_message_type_decorators;
    var _last_message_type_initializers = [];
    var _last_message_type_extraInitializers = [];
    var _last_sender_id_decorators;
    var _last_sender_id_initializers = [];
    var _last_sender_id_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var _is_pinned_decorators;
    var _is_pinned_initializers = [];
    var _is_pinned_extraInitializers = [];
    var _is_muted_decorators;
    var _is_muted_initializers = [];
    var _is_muted_extraInitializers = [];
    var _muted_until_decorators;
    var _muted_until_initializers = [];
    var _muted_until_extraInitializers = [];
    var _notifications_enabled_decorators;
    var _notifications_enabled_initializers = [];
    var _notifications_enabled_extraInitializers = [];
    var _unread_count_decorators;
    var _unread_count_initializers = [];
    var _unread_count_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var _updated_at_decorators;
    var _updated_at_initializers = [];
    var _updated_at_extraInitializers = [];
    var _initiator_decorators;
    var _initiator_initializers = [];
    var _initiator_extraInitializers = [];
    var _participant_decorators;
    var _participant_initializers = [];
    var _participant_extraInitializers = [];
    return _a = /** @class */ (function () {
            function ConversationDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.title = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                this.last_message = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _last_message_initializers, void 0));
                this.last_message_at = (__runInitializers(this, _last_message_extraInitializers), __runInitializers(this, _last_message_at_initializers, void 0));
                this.last_message_type = (__runInitializers(this, _last_message_at_extraInitializers), __runInitializers(this, _last_message_type_initializers, void 0));
                this.last_sender_id = (__runInitializers(this, _last_message_type_extraInitializers), __runInitializers(this, _last_sender_id_initializers, void 0));
                this.type = (__runInitializers(this, _last_sender_id_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.status = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _status_initializers, void 0));
                this.is_pinned = (__runInitializers(this, _status_extraInitializers), __runInitializers(this, _is_pinned_initializers, void 0));
                this.is_muted = (__runInitializers(this, _is_pinned_extraInitializers), __runInitializers(this, _is_muted_initializers, void 0));
                this.muted_until = (__runInitializers(this, _is_muted_extraInitializers), __runInitializers(this, _muted_until_initializers, void 0));
                this.notifications_enabled = (__runInitializers(this, _muted_until_extraInitializers), __runInitializers(this, _notifications_enabled_initializers, void 0));
                this.unread_count = (__runInitializers(this, _notifications_enabled_extraInitializers), __runInitializers(this, _unread_count_initializers, void 0));
                this.created_at = (__runInitializers(this, _unread_count_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
                this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
                this.initiator = (__runInitializers(this, _updated_at_extraInitializers), __runInitializers(this, _initiator_initializers, void 0));
                this.participant = (__runInitializers(this, _initiator_extraInitializers), __runInitializers(this, _participant_initializers, void 0));
                __runInitializers(this, _participant_extraInitializers);
            }
            return ConversationDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                }), (0, class_validator_1.IsString)()];
            _title_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation title',
                    example: 'Chat with John Doe',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _last_message_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Last message content',
                    example: 'Hello, how are you?',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _last_message_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Last message timestamp',
                    example: '2024-01-01T12:00:00Z',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)(), (0, class_transformer_1.Type)(function () { return Date; })];
            _last_message_type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Last message type',
                    example: 'text',
                    enum: ['text', 'image', 'file', 'system'],
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _last_sender_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Last sender ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation type',
                    enum: ConversationType,
                    example: 'user_to_user',
                }), (0, class_validator_1.IsEnum)(ConversationType)];
            _status_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation status',
                    enum: ConversationStatus,
                    example: 'active',
                }), (0, class_validator_1.IsEnum)(ConversationStatus)];
            _is_pinned_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether conversation is pinned',
                    example: false,
                }), (0, class_validator_1.IsBoolean)()];
            _is_muted_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether conversation is muted',
                    example: false,
                }), (0, class_validator_1.IsBoolean)()];
            _muted_until_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Muted until timestamp',
                    example: '2024-01-01T12:00:00Z',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsDate)(), (0, class_transformer_1.Type)(function () { return Date; })];
            _notifications_enabled_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether notifications are enabled',
                    example: true,
                }), (0, class_validator_1.IsBoolean)()];
            _unread_count_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Number of unread messages',
                    example: 5,
                }), (0, class_validator_1.IsInt)()];
            _created_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation creation timestamp',
                    example: '2024-01-01T12:00:00Z',
                }), (0, class_validator_1.IsDate)(), (0, class_transformer_1.Type)(function () { return Date; })];
            _updated_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation update timestamp',
                    example: '2024-01-01T12:00:00Z',
                }), (0, class_validator_1.IsDate)(), (0, class_transformer_1.Type)(function () { return Date; })];
            _initiator_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Initiator of the conversation',
                    type: ConversationParticipantDto,
                }), (0, class_validator_1.ValidateNested)(), (0, class_validator_1.IsDefined)(), (0, class_transformer_1.Type)(function () { return ConversationParticipantDto; })];
            _participant_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Other participant in the conversation',
                    type: ConversationParticipantDto,
                }), (0, class_validator_1.ValidateNested)(), (0, class_validator_1.IsDefined)(), (0, class_transformer_1.Type)(function () { return ConversationParticipantDto; })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _last_message_decorators, { kind: "field", name: "last_message", static: false, private: false, access: { has: function (obj) { return "last_message" in obj; }, get: function (obj) { return obj.last_message; }, set: function (obj, value) { obj.last_message = value; } }, metadata: _metadata }, _last_message_initializers, _last_message_extraInitializers);
            __esDecorate(null, null, _last_message_at_decorators, { kind: "field", name: "last_message_at", static: false, private: false, access: { has: function (obj) { return "last_message_at" in obj; }, get: function (obj) { return obj.last_message_at; }, set: function (obj, value) { obj.last_message_at = value; } }, metadata: _metadata }, _last_message_at_initializers, _last_message_at_extraInitializers);
            __esDecorate(null, null, _last_message_type_decorators, { kind: "field", name: "last_message_type", static: false, private: false, access: { has: function (obj) { return "last_message_type" in obj; }, get: function (obj) { return obj.last_message_type; }, set: function (obj, value) { obj.last_message_type = value; } }, metadata: _metadata }, _last_message_type_initializers, _last_message_type_extraInitializers);
            __esDecorate(null, null, _last_sender_id_decorators, { kind: "field", name: "last_sender_id", static: false, private: false, access: { has: function (obj) { return "last_sender_id" in obj; }, get: function (obj) { return obj.last_sender_id; }, set: function (obj, value) { obj.last_sender_id = value; } }, metadata: _metadata }, _last_sender_id_initializers, _last_sender_id_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
            __esDecorate(null, null, _is_pinned_decorators, { kind: "field", name: "is_pinned", static: false, private: false, access: { has: function (obj) { return "is_pinned" in obj; }, get: function (obj) { return obj.is_pinned; }, set: function (obj, value) { obj.is_pinned = value; } }, metadata: _metadata }, _is_pinned_initializers, _is_pinned_extraInitializers);
            __esDecorate(null, null, _is_muted_decorators, { kind: "field", name: "is_muted", static: false, private: false, access: { has: function (obj) { return "is_muted" in obj; }, get: function (obj) { return obj.is_muted; }, set: function (obj, value) { obj.is_muted = value; } }, metadata: _metadata }, _is_muted_initializers, _is_muted_extraInitializers);
            __esDecorate(null, null, _muted_until_decorators, { kind: "field", name: "muted_until", static: false, private: false, access: { has: function (obj) { return "muted_until" in obj; }, get: function (obj) { return obj.muted_until; }, set: function (obj, value) { obj.muted_until = value; } }, metadata: _metadata }, _muted_until_initializers, _muted_until_extraInitializers);
            __esDecorate(null, null, _notifications_enabled_decorators, { kind: "field", name: "notifications_enabled", static: false, private: false, access: { has: function (obj) { return "notifications_enabled" in obj; }, get: function (obj) { return obj.notifications_enabled; }, set: function (obj, value) { obj.notifications_enabled = value; } }, metadata: _metadata }, _notifications_enabled_initializers, _notifications_enabled_extraInitializers);
            __esDecorate(null, null, _unread_count_decorators, { kind: "field", name: "unread_count", static: false, private: false, access: { has: function (obj) { return "unread_count" in obj; }, get: function (obj) { return obj.unread_count; }, set: function (obj, value) { obj.unread_count = value; } }, metadata: _metadata }, _unread_count_initializers, _unread_count_extraInitializers);
            __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
            __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: function (obj) { return "updated_at" in obj; }, get: function (obj) { return obj.updated_at; }, set: function (obj, value) { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
            __esDecorate(null, null, _initiator_decorators, { kind: "field", name: "initiator", static: false, private: false, access: { has: function (obj) { return "initiator" in obj; }, get: function (obj) { return obj.initiator; }, set: function (obj, value) { obj.initiator = value; } }, metadata: _metadata }, _initiator_initializers, _initiator_extraInitializers);
            __esDecorate(null, null, _participant_decorators, { kind: "field", name: "participant", static: false, private: false, access: { has: function (obj) { return "participant" in obj; }, get: function (obj) { return obj.participant; }, set: function (obj, value) { obj.participant = value; } }, metadata: _metadata }, _participant_initializers, _participant_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.ConversationDto = ConversationDto;
var GetConversationsOutputDto = function () {
    var _a;
    var _items_decorators;
    var _items_initializers = [];
    var _items_extraInitializers = [];
    var _pagination_decorators;
    var _pagination_initializers = [];
    var _pagination_extraInitializers = [];
    return _a = /** @class */ (function () {
            function GetConversationsOutputDto() {
                this.items = __runInitializers(this, _items_initializers, void 0);
                this.pagination = (__runInitializers(this, _items_extraInitializers), __runInitializers(this, _pagination_initializers, void 0));
                __runInitializers(this, _pagination_extraInitializers);
            }
            return GetConversationsOutputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _items_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'List of conversations',
                    type: [ConversationDto],
                }), (0, class_validator_1.ValidateNested)({ each: true }), (0, class_validator_1.IsArray)(), (0, class_transformer_1.Type)(function () { return ConversationDto; })];
            _pagination_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Pagination metadata',
                    type: pagination_dtos_1.PaginationMetadataDto,
                }), (0, class_validator_1.ValidateNested)(), (0, class_validator_1.IsDefined)(), (0, class_transformer_1.Type)(function () { return pagination_dtos_1.PaginationMetadataDto; })];
            __esDecorate(null, null, _items_decorators, { kind: "field", name: "items", static: false, private: false, access: { has: function (obj) { return "items" in obj; }, get: function (obj) { return obj.items; }, set: function (obj, value) { obj.items = value; } }, metadata: _metadata }, _items_initializers, _items_extraInitializers);
            __esDecorate(null, null, _pagination_decorators, { kind: "field", name: "pagination", static: false, private: false, access: { has: function (obj) { return "pagination" in obj; }, get: function (obj) { return obj.pagination; }, set: function (obj, value) { obj.pagination = value; } }, metadata: _metadata }, _pagination_initializers, _pagination_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetConversationsOutputDto = GetConversationsOutputDto;
