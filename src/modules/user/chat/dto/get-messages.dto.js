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
exports.GetMessagesOutputDto = exports.MessageDto = exports.MessageSenderDto = exports.GetMessagesInputDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var pagination_dtos_1 = require("@/shared/dto/pagination.dtos");
var GetMessagesInputDto = function () {
    var _a;
    var _classSuper = pagination_dtos_1.PaginationInputDto;
    var _conversation_id_decorators;
    var _conversation_id_initializers = [];
    var _conversation_id_extraInitializers = [];
    return _a = /** @class */ (function (_super) {
            __extends(GetMessagesInputDto, _super);
            function GetMessagesInputDto() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this.conversation_id = __runInitializers(_this, _conversation_id_initializers, void 0);
                __runInitializers(_this, _conversation_id_extraInitializers);
                return _this;
            }
            return GetMessagesInputDto;
        }(_classSuper)),
        (function () {
            var _b;
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_b = _classSuper[Symbol.metadata]) !== null && _b !== void 0 ? _b : null) : void 0;
            _conversation_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation ID to get messages from',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                }), (0, class_validator_1.IsUUID)()];
            __esDecorate(null, null, _conversation_id_decorators, { kind: "field", name: "conversation_id", static: false, private: false, access: { has: function (obj) { return "conversation_id" in obj; }, get: function (obj) { return obj.conversation_id; }, set: function (obj, value) { obj.conversation_id = value; } }, metadata: _metadata }, _conversation_id_initializers, _conversation_id_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetMessagesInputDto = GetMessagesInputDto;
var MessageSenderDto = function () {
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
    return _a = /** @class */ (function () {
            function MessageSenderDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
                this.avatar_url = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _avatar_url_initializers, void 0));
                __runInitializers(this, _avatar_url_extraInitializers);
            }
            return MessageSenderDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Sender ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                })];
            _name_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Sender name',
                    example: 'John Doe',
                })];
            _avatar_url_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Sender avatar URL',
                    example: 'https://example.com/avatar.jpg',
                    required: false,
                })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _avatar_url_decorators, { kind: "field", name: "avatar_url", static: false, private: false, access: { has: function (obj) { return "avatar_url" in obj; }, get: function (obj) { return obj.avatar_url; }, set: function (obj, value) { obj.avatar_url = value; } }, metadata: _metadata }, _avatar_url_initializers, _avatar_url_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.MessageSenderDto = MessageSenderDto;
var MessageDto = function () {
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
    var _file_url_decorators;
    var _file_url_initializers = [];
    var _file_url_extraInitializers = [];
    var _file_name_decorators;
    var _file_name_initializers = [];
    var _file_name_extraInitializers = [];
    var _file_size_decorators;
    var _file_size_initializers = [];
    var _file_size_extraInitializers = [];
    var _file_type_decorators;
    var _file_type_initializers = [];
    var _file_type_extraInitializers = [];
    var _is_read_decorators;
    var _is_read_initializers = [];
    var _is_read_extraInitializers = [];
    var _read_at_decorators;
    var _read_at_initializers = [];
    var _read_at_extraInitializers = [];
    var _is_deleted_decorators;
    var _is_deleted_initializers = [];
    var _is_deleted_extraInitializers = [];
    var _deleted_at_decorators;
    var _deleted_at_initializers = [];
    var _deleted_at_extraInitializers = [];
    var _sender_decorators;
    var _sender_initializers = [];
    var _sender_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var _updated_at_decorators;
    var _updated_at_initializers = [];
    var _updated_at_extraInitializers = [];
    return _a = /** @class */ (function () {
            function MessageDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.content = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _content_initializers, void 0));
                this.message_type = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _message_type_initializers, void 0));
                this.file_url = (__runInitializers(this, _message_type_extraInitializers), __runInitializers(this, _file_url_initializers, void 0));
                this.file_name = (__runInitializers(this, _file_url_extraInitializers), __runInitializers(this, _file_name_initializers, void 0));
                this.file_size = (__runInitializers(this, _file_name_extraInitializers), __runInitializers(this, _file_size_initializers, void 0));
                this.file_type = (__runInitializers(this, _file_size_extraInitializers), __runInitializers(this, _file_type_initializers, void 0));
                this.is_read = (__runInitializers(this, _file_type_extraInitializers), __runInitializers(this, _is_read_initializers, void 0));
                this.read_at = (__runInitializers(this, _is_read_extraInitializers), __runInitializers(this, _read_at_initializers, void 0));
                this.is_deleted = (__runInitializers(this, _read_at_extraInitializers), __runInitializers(this, _is_deleted_initializers, void 0));
                this.deleted_at = (__runInitializers(this, _is_deleted_extraInitializers), __runInitializers(this, _deleted_at_initializers, void 0));
                this.sender = (__runInitializers(this, _deleted_at_extraInitializers), __runInitializers(this, _sender_initializers, void 0));
                this.created_at = (__runInitializers(this, _sender_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
                this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
                __runInitializers(this, _updated_at_extraInitializers);
            }
            return MessageDto;
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
                    enum: ['text', 'image', 'file', 'system'],
                })];
            _file_url_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'File URL (for file/image messages)',
                    example: 'https://example.com/file.pdf',
                    required: false,
                })];
            _file_name_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'File name (for file/image messages)',
                    example: 'document.pdf',
                    required: false,
                })];
            _file_size_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'File size in bytes (for file/image messages)',
                    example: 1024,
                    required: false,
                })];
            _file_type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'File type (for file/image messages)',
                    example: 'application/pdf',
                    required: false,
                })];
            _is_read_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether message is read',
                    example: true,
                })];
            _read_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'When message was read',
                    example: '2024-01-01T12:00:00Z',
                    required: false,
                })];
            _is_deleted_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether message is deleted',
                    example: false,
                })];
            _deleted_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'When message was deleted',
                    example: '2024-01-01T12:00:00Z',
                    required: false,
                })];
            _sender_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Message sender information',
                    type: MessageSenderDto,
                })];
            _created_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Message creation timestamp',
                    example: '2024-01-01T12:00:00Z',
                })];
            _updated_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Message last update timestamp',
                    example: '2024-01-01T12:00:00Z',
                })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _message_type_decorators, { kind: "field", name: "message_type", static: false, private: false, access: { has: function (obj) { return "message_type" in obj; }, get: function (obj) { return obj.message_type; }, set: function (obj, value) { obj.message_type = value; } }, metadata: _metadata }, _message_type_initializers, _message_type_extraInitializers);
            __esDecorate(null, null, _file_url_decorators, { kind: "field", name: "file_url", static: false, private: false, access: { has: function (obj) { return "file_url" in obj; }, get: function (obj) { return obj.file_url; }, set: function (obj, value) { obj.file_url = value; } }, metadata: _metadata }, _file_url_initializers, _file_url_extraInitializers);
            __esDecorate(null, null, _file_name_decorators, { kind: "field", name: "file_name", static: false, private: false, access: { has: function (obj) { return "file_name" in obj; }, get: function (obj) { return obj.file_name; }, set: function (obj, value) { obj.file_name = value; } }, metadata: _metadata }, _file_name_initializers, _file_name_extraInitializers);
            __esDecorate(null, null, _file_size_decorators, { kind: "field", name: "file_size", static: false, private: false, access: { has: function (obj) { return "file_size" in obj; }, get: function (obj) { return obj.file_size; }, set: function (obj, value) { obj.file_size = value; } }, metadata: _metadata }, _file_size_initializers, _file_size_extraInitializers);
            __esDecorate(null, null, _file_type_decorators, { kind: "field", name: "file_type", static: false, private: false, access: { has: function (obj) { return "file_type" in obj; }, get: function (obj) { return obj.file_type; }, set: function (obj, value) { obj.file_type = value; } }, metadata: _metadata }, _file_type_initializers, _file_type_extraInitializers);
            __esDecorate(null, null, _is_read_decorators, { kind: "field", name: "is_read", static: false, private: false, access: { has: function (obj) { return "is_read" in obj; }, get: function (obj) { return obj.is_read; }, set: function (obj, value) { obj.is_read = value; } }, metadata: _metadata }, _is_read_initializers, _is_read_extraInitializers);
            __esDecorate(null, null, _read_at_decorators, { kind: "field", name: "read_at", static: false, private: false, access: { has: function (obj) { return "read_at" in obj; }, get: function (obj) { return obj.read_at; }, set: function (obj, value) { obj.read_at = value; } }, metadata: _metadata }, _read_at_initializers, _read_at_extraInitializers);
            __esDecorate(null, null, _is_deleted_decorators, { kind: "field", name: "is_deleted", static: false, private: false, access: { has: function (obj) { return "is_deleted" in obj; }, get: function (obj) { return obj.is_deleted; }, set: function (obj, value) { obj.is_deleted = value; } }, metadata: _metadata }, _is_deleted_initializers, _is_deleted_extraInitializers);
            __esDecorate(null, null, _deleted_at_decorators, { kind: "field", name: "deleted_at", static: false, private: false, access: { has: function (obj) { return "deleted_at" in obj; }, get: function (obj) { return obj.deleted_at; }, set: function (obj, value) { obj.deleted_at = value; } }, metadata: _metadata }, _deleted_at_initializers, _deleted_at_extraInitializers);
            __esDecorate(null, null, _sender_decorators, { kind: "field", name: "sender", static: false, private: false, access: { has: function (obj) { return "sender" in obj; }, get: function (obj) { return obj.sender; }, set: function (obj, value) { obj.sender = value; } }, metadata: _metadata }, _sender_initializers, _sender_extraInitializers);
            __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
            __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: function (obj) { return "updated_at" in obj; }, get: function (obj) { return obj.updated_at; }, set: function (obj, value) { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.MessageDto = MessageDto;
var GetMessagesOutputDto = /** @class */ (function (_super) {
    __extends(GetMessagesOutputDto, _super);
    function GetMessagesOutputDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GetMessagesOutputDto;
}(pagination_dtos_1.PaginationDto));
exports.GetMessagesOutputDto = GetMessagesOutputDto;
