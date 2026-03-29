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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchChatOutputDto = exports.SearchContactResultDto = exports.SearchMessageResultDto = exports.SearchConversationResultDto = exports.SearchChatInputDto = exports.SearchType = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var SearchType;
(function (SearchType) {
    SearchType["CONVERSATIONS"] = "conversations";
    SearchType["MESSAGES"] = "messages";
    SearchType["CONTACTS"] = "contacts";
    SearchType["ALL"] = "all";
})(SearchType || (exports.SearchType = SearchType = {}));
var SearchChatInputDto = function () {
    var _a;
    var _query_decorators;
    var _query_initializers = [];
    var _query_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _conversation_id_decorators;
    var _conversation_id_initializers = [];
    var _conversation_id_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SearchChatInputDto() {
                this.query = __runInitializers(this, _query_initializers, void 0);
                this.type = (__runInitializers(this, _query_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.conversation_id = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _conversation_id_initializers, void 0));
                __runInitializers(this, _conversation_id_extraInitializers);
            }
            return SearchChatInputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _query_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Search query string',
                    example: 'hello world',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Type of search to perform',
                    example: 'all',
                    enum: SearchType,
                    default: SearchType.ALL,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(SearchType)];
            _conversation_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation ID to search within (for message search)',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                    required: false,
                }), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _query_decorators, { kind: "field", name: "query", static: false, private: false, access: { has: function (obj) { return "query" in obj; }, get: function (obj) { return obj.query; }, set: function (obj, value) { obj.query = value; } }, metadata: _metadata }, _query_initializers, _query_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _conversation_id_decorators, { kind: "field", name: "conversation_id", static: false, private: false, access: { has: function (obj) { return "conversation_id" in obj; }, get: function (obj) { return obj.conversation_id; }, set: function (obj, value) { obj.conversation_id = value; } }, metadata: _metadata }, _conversation_id_initializers, _conversation_id_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SearchChatInputDto = SearchChatInputDto;
var SearchConversationResultDto = function () {
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
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _participant_decorators;
    var _participant_initializers = [];
    var _participant_extraInitializers = [];
    var _relevance_score_decorators;
    var _relevance_score_initializers = [];
    var _relevance_score_extraInitializers = [];
    var _last_message_at_decorators;
    var _last_message_at_initializers = [];
    var _last_message_at_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SearchConversationResultDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.title = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                this.last_message = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _last_message_initializers, void 0));
                this.type = (__runInitializers(this, _last_message_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.participant = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _participant_initializers, void 0));
                this.relevance_score = (__runInitializers(this, _participant_extraInitializers), __runInitializers(this, _relevance_score_initializers, void 0));
                this.last_message_at = (__runInitializers(this, _relevance_score_extraInitializers), __runInitializers(this, _last_message_at_initializers, void 0));
                __runInitializers(this, _last_message_at_extraInitializers);
            }
            return SearchConversationResultDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                })];
            _title_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation title',
                    example: 'Chat with John Doe',
                })];
            _last_message_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Last message content',
                    example: 'Hello, how are you?',
                })];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation type',
                    example: 'user_to_user',
                })];
            _participant_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Participant information',
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
                        name: { type: 'string', example: 'John Doe' },
                        avatar_url: { type: 'string', example: 'https://example.com/avatar.jpg' },
                    },
                })];
            _relevance_score_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Search relevance score',
                    example: 0.85,
                })];
            _last_message_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Last message timestamp',
                    example: '2024-01-01T12:00:00Z',
                })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _last_message_decorators, { kind: "field", name: "last_message", static: false, private: false, access: { has: function (obj) { return "last_message" in obj; }, get: function (obj) { return obj.last_message; }, set: function (obj, value) { obj.last_message = value; } }, metadata: _metadata }, _last_message_initializers, _last_message_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _participant_decorators, { kind: "field", name: "participant", static: false, private: false, access: { has: function (obj) { return "participant" in obj; }, get: function (obj) { return obj.participant; }, set: function (obj, value) { obj.participant = value; } }, metadata: _metadata }, _participant_initializers, _participant_extraInitializers);
            __esDecorate(null, null, _relevance_score_decorators, { kind: "field", name: "relevance_score", static: false, private: false, access: { has: function (obj) { return "relevance_score" in obj; }, get: function (obj) { return obj.relevance_score; }, set: function (obj, value) { obj.relevance_score = value; } }, metadata: _metadata }, _relevance_score_initializers, _relevance_score_extraInitializers);
            __esDecorate(null, null, _last_message_at_decorators, { kind: "field", name: "last_message_at", static: false, private: false, access: { has: function (obj) { return "last_message_at" in obj; }, get: function (obj) { return obj.last_message_at; }, set: function (obj, value) { obj.last_message_at = value; } }, metadata: _metadata }, _last_message_at_initializers, _last_message_at_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SearchConversationResultDto = SearchConversationResultDto;
var SearchMessageResultDto = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _content_decorators;
    var _content_initializers = [];
    var _content_extraInitializers = [];
    var _message_type_decorators;
    var _message_type_initializers = [];
    var _message_type_extraInitializers = [];
    var _conversation_id_decorators;
    var _conversation_id_initializers = [];
    var _conversation_id_extraInitializers = [];
    var _conversation_title_decorators;
    var _conversation_title_initializers = [];
    var _conversation_title_extraInitializers = [];
    var _sender_decorators;
    var _sender_initializers = [];
    var _sender_extraInitializers = [];
    var _relevance_score_decorators;
    var _relevance_score_initializers = [];
    var _relevance_score_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SearchMessageResultDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.content = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _content_initializers, void 0));
                this.message_type = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _message_type_initializers, void 0));
                this.conversation_id = (__runInitializers(this, _message_type_extraInitializers), __runInitializers(this, _conversation_id_initializers, void 0));
                this.conversation_title = (__runInitializers(this, _conversation_id_extraInitializers), __runInitializers(this, _conversation_title_initializers, void 0));
                this.sender = (__runInitializers(this, _conversation_title_extraInitializers), __runInitializers(this, _sender_initializers, void 0));
                this.relevance_score = (__runInitializers(this, _sender_extraInitializers), __runInitializers(this, _relevance_score_initializers, void 0));
                this.created_at = (__runInitializers(this, _relevance_score_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
                __runInitializers(this, _created_at_extraInitializers);
            }
            return SearchMessageResultDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Message ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                })];
            _content_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Message content',
                    example: 'Hello, how are you?',
                })];
            _message_type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Message type',
                    example: 'text',
                })];
            _conversation_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                })];
            _conversation_title_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation title',
                    example: 'Chat with John Doe',
                })];
            _sender_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Sender information',
                    type: 'object',
                    properties: {
                        id: { type: 'string', example: '123e4567-e89b-12d3-a456-426614174000' },
                        name: { type: 'string', example: 'John Doe' },
                        avatar_url: { type: 'string', example: 'https://example.com/avatar.jpg' },
                    },
                })];
            _relevance_score_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Search relevance score',
                    example: 0.85,
                })];
            _created_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Message creation timestamp',
                    example: '2024-01-01T12:00:00Z',
                })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _message_type_decorators, { kind: "field", name: "message_type", static: false, private: false, access: { has: function (obj) { return "message_type" in obj; }, get: function (obj) { return obj.message_type; }, set: function (obj, value) { obj.message_type = value; } }, metadata: _metadata }, _message_type_initializers, _message_type_extraInitializers);
            __esDecorate(null, null, _conversation_id_decorators, { kind: "field", name: "conversation_id", static: false, private: false, access: { has: function (obj) { return "conversation_id" in obj; }, get: function (obj) { return obj.conversation_id; }, set: function (obj, value) { obj.conversation_id = value; } }, metadata: _metadata }, _conversation_id_initializers, _conversation_id_extraInitializers);
            __esDecorate(null, null, _conversation_title_decorators, { kind: "field", name: "conversation_title", static: false, private: false, access: { has: function (obj) { return "conversation_title" in obj; }, get: function (obj) { return obj.conversation_title; }, set: function (obj, value) { obj.conversation_title = value; } }, metadata: _metadata }, _conversation_title_initializers, _conversation_title_extraInitializers);
            __esDecorate(null, null, _sender_decorators, { kind: "field", name: "sender", static: false, private: false, access: { has: function (obj) { return "sender" in obj; }, get: function (obj) { return obj.sender; }, set: function (obj, value) { obj.sender = value; } }, metadata: _metadata }, _sender_initializers, _sender_extraInitializers);
            __esDecorate(null, null, _relevance_score_decorators, { kind: "field", name: "relevance_score", static: false, private: false, access: { has: function (obj) { return "relevance_score" in obj; }, get: function (obj) { return obj.relevance_score; }, set: function (obj, value) { obj.relevance_score = value; } }, metadata: _metadata }, _relevance_score_initializers, _relevance_score_extraInitializers);
            __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SearchMessageResultDto = SearchMessageResultDto;
var SearchContactResultDto = function () {
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
    var _phone_number_decorators;
    var _phone_number_initializers = [];
    var _phone_number_extraInitializers = [];
    var _conversation_id_decorators;
    var _conversation_id_initializers = [];
    var _conversation_id_extraInitializers = [];
    var _conversation_title_decorators;
    var _conversation_title_initializers = [];
    var _conversation_title_extraInitializers = [];
    var _last_message_decorators;
    var _last_message_initializers = [];
    var _last_message_extraInitializers = [];
    var _last_message_at_decorators;
    var _last_message_at_initializers = [];
    var _last_message_at_extraInitializers = [];
    var _relevance_score_decorators;
    var _relevance_score_initializers = [];
    var _relevance_score_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SearchContactResultDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
                this.avatar_url = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _avatar_url_initializers, void 0));
                this.phone_number = (__runInitializers(this, _avatar_url_extraInitializers), __runInitializers(this, _phone_number_initializers, void 0));
                this.conversation_id = (__runInitializers(this, _phone_number_extraInitializers), __runInitializers(this, _conversation_id_initializers, void 0));
                this.conversation_title = (__runInitializers(this, _conversation_id_extraInitializers), __runInitializers(this, _conversation_title_initializers, void 0));
                this.last_message = (__runInitializers(this, _conversation_title_extraInitializers), __runInitializers(this, _last_message_initializers, void 0));
                this.last_message_at = (__runInitializers(this, _last_message_extraInitializers), __runInitializers(this, _last_message_at_initializers, void 0));
                this.relevance_score = (__runInitializers(this, _last_message_at_extraInitializers), __runInitializers(this, _relevance_score_initializers, void 0));
                __runInitializers(this, _relevance_score_extraInitializers);
            }
            return SearchContactResultDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Contact user ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                })];
            _name_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Contact full name',
                    example: 'John Doe',
                })];
            _avatar_url_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Contact avatar URL',
                    example: 'https://example.com/avatar.jpg',
                    required: false,
                })];
            _phone_number_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Contact phone number',
                    example: '+84901234567',
                    required: false,
                })];
            _conversation_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation ID with this contact',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                })];
            _conversation_title_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation title',
                    example: 'Chat with John Doe',
                })];
            _last_message_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Last message in conversation',
                    example: 'Hello, how are you?',
                    required: false,
                })];
            _last_message_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Last message timestamp',
                    example: '2024-01-01T12:00:00Z',
                    required: false,
                })];
            _relevance_score_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Search relevance score',
                    example: 0.85,
                })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _avatar_url_decorators, { kind: "field", name: "avatar_url", static: false, private: false, access: { has: function (obj) { return "avatar_url" in obj; }, get: function (obj) { return obj.avatar_url; }, set: function (obj, value) { obj.avatar_url = value; } }, metadata: _metadata }, _avatar_url_initializers, _avatar_url_extraInitializers);
            __esDecorate(null, null, _phone_number_decorators, { kind: "field", name: "phone_number", static: false, private: false, access: { has: function (obj) { return "phone_number" in obj; }, get: function (obj) { return obj.phone_number; }, set: function (obj, value) { obj.phone_number = value; } }, metadata: _metadata }, _phone_number_initializers, _phone_number_extraInitializers);
            __esDecorate(null, null, _conversation_id_decorators, { kind: "field", name: "conversation_id", static: false, private: false, access: { has: function (obj) { return "conversation_id" in obj; }, get: function (obj) { return obj.conversation_id; }, set: function (obj, value) { obj.conversation_id = value; } }, metadata: _metadata }, _conversation_id_initializers, _conversation_id_extraInitializers);
            __esDecorate(null, null, _conversation_title_decorators, { kind: "field", name: "conversation_title", static: false, private: false, access: { has: function (obj) { return "conversation_title" in obj; }, get: function (obj) { return obj.conversation_title; }, set: function (obj, value) { obj.conversation_title = value; } }, metadata: _metadata }, _conversation_title_initializers, _conversation_title_extraInitializers);
            __esDecorate(null, null, _last_message_decorators, { kind: "field", name: "last_message", static: false, private: false, access: { has: function (obj) { return "last_message" in obj; }, get: function (obj) { return obj.last_message; }, set: function (obj, value) { obj.last_message = value; } }, metadata: _metadata }, _last_message_initializers, _last_message_extraInitializers);
            __esDecorate(null, null, _last_message_at_decorators, { kind: "field", name: "last_message_at", static: false, private: false, access: { has: function (obj) { return "last_message_at" in obj; }, get: function (obj) { return obj.last_message_at; }, set: function (obj, value) { obj.last_message_at = value; } }, metadata: _metadata }, _last_message_at_initializers, _last_message_at_extraInitializers);
            __esDecorate(null, null, _relevance_score_decorators, { kind: "field", name: "relevance_score", static: false, private: false, access: { has: function (obj) { return "relevance_score" in obj; }, get: function (obj) { return obj.relevance_score; }, set: function (obj, value) { obj.relevance_score = value; } }, metadata: _metadata }, _relevance_score_initializers, _relevance_score_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SearchContactResultDto = SearchContactResultDto;
var SearchChatOutputDto = function () {
    var _a;
    var _conversations_decorators;
    var _conversations_initializers = [];
    var _conversations_extraInitializers = [];
    var _messages_decorators;
    var _messages_initializers = [];
    var _messages_extraInitializers = [];
    var _contacts_decorators;
    var _contacts_initializers = [];
    var _contacts_extraInitializers = [];
    var _total_decorators;
    var _total_initializers = [];
    var _total_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SearchChatOutputDto() {
                this.conversations = __runInitializers(this, _conversations_initializers, void 0);
                this.messages = (__runInitializers(this, _conversations_extraInitializers), __runInitializers(this, _messages_initializers, void 0));
                this.contacts = (__runInitializers(this, _messages_extraInitializers), __runInitializers(this, _contacts_initializers, void 0));
                this.total = (__runInitializers(this, _contacts_extraInitializers), __runInitializers(this, _total_initializers, void 0));
                __runInitializers(this, _total_extraInitializers);
            }
            return SearchChatOutputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _conversations_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Search results for conversations',
                    type: [SearchConversationResultDto],
                })];
            _messages_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Search results for messages',
                    type: [SearchMessageResultDto],
                })];
            _contacts_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Search results for contacts',
                    type: [SearchContactResultDto],
                })];
            _total_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Total number of results found',
                    example: 50,
                })];
            __esDecorate(null, null, _conversations_decorators, { kind: "field", name: "conversations", static: false, private: false, access: { has: function (obj) { return "conversations" in obj; }, get: function (obj) { return obj.conversations; }, set: function (obj, value) { obj.conversations = value; } }, metadata: _metadata }, _conversations_initializers, _conversations_extraInitializers);
            __esDecorate(null, null, _messages_decorators, { kind: "field", name: "messages", static: false, private: false, access: { has: function (obj) { return "messages" in obj; }, get: function (obj) { return obj.messages; }, set: function (obj, value) { obj.messages = value; } }, metadata: _metadata }, _messages_initializers, _messages_extraInitializers);
            __esDecorate(null, null, _contacts_decorators, { kind: "field", name: "contacts", static: false, private: false, access: { has: function (obj) { return "contacts" in obj; }, get: function (obj) { return obj.contacts; }, set: function (obj, value) { obj.contacts = value; } }, metadata: _metadata }, _contacts_initializers, _contacts_extraInitializers);
            __esDecorate(null, null, _total_decorators, { kind: "field", name: "total", static: false, private: false, access: { has: function (obj) { return "total" in obj; }, get: function (obj) { return obj.total; }, set: function (obj, value) { obj.total = value; } }, metadata: _metadata }, _total_initializers, _total_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SearchChatOutputDto = SearchChatOutputDto;
