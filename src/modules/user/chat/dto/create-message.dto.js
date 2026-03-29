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
exports.CreateMessageOutputDto = exports.CreateMessageInputDto = exports.MessageType = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var MessageType;
(function (MessageType) {
    MessageType["TEXT"] = "text";
    MessageType["IMAGE"] = "image";
    MessageType["FILE"] = "file";
    MessageType["SYSTEM"] = "system";
})(MessageType || (exports.MessageType = MessageType = {}));
var CreateMessageInputDto = function () {
    var _a;
    var _conversation_id_decorators;
    var _conversation_id_initializers = [];
    var _conversation_id_extraInitializers = [];
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
    return _a = /** @class */ (function () {
            function CreateMessageInputDto() {
                this.conversation_id = __runInitializers(this, _conversation_id_initializers, void 0);
                this.content = (__runInitializers(this, _conversation_id_extraInitializers), __runInitializers(this, _content_initializers, void 0));
                this.message_type = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _message_type_initializers, void 0));
                this.file_url = (__runInitializers(this, _message_type_extraInitializers), __runInitializers(this, _file_url_initializers, void 0));
                this.file_name = (__runInitializers(this, _file_url_extraInitializers), __runInitializers(this, _file_name_initializers, void 0));
                this.file_size = (__runInitializers(this, _file_name_extraInitializers), __runInitializers(this, _file_size_initializers, void 0));
                this.file_type = (__runInitializers(this, _file_size_extraInitializers), __runInitializers(this, _file_type_initializers, void 0));
                __runInitializers(this, _file_type_extraInitializers);
            }
            return CreateMessageInputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _conversation_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation ID to send message to',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                }), (0, class_validator_1.IsUUID)()];
            _content_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Message content (optional if file_url is provided for image messages)',
                    example: 'Hello, how are you?',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _message_type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Message type',
                    example: 'text',
                    enum: MessageType,
                    default: MessageType.TEXT,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsEnum)(MessageType)];
            _file_url_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'File URL (for file/image messages)',
                    example: 'https://example.com/file.pdf',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _file_name_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'File name (for file/image messages)',
                    example: 'document.pdf',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _file_size_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'File size in bytes (for file/image messages)',
                    example: 1024,
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0)];
            _file_type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'File type (for file/image messages)',
                    example: 'application/pdf',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _conversation_id_decorators, { kind: "field", name: "conversation_id", static: false, private: false, access: { has: function (obj) { return "conversation_id" in obj; }, get: function (obj) { return obj.conversation_id; }, set: function (obj, value) { obj.conversation_id = value; } }, metadata: _metadata }, _conversation_id_initializers, _conversation_id_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _message_type_decorators, { kind: "field", name: "message_type", static: false, private: false, access: { has: function (obj) { return "message_type" in obj; }, get: function (obj) { return obj.message_type; }, set: function (obj, value) { obj.message_type = value; } }, metadata: _metadata }, _message_type_initializers, _message_type_extraInitializers);
            __esDecorate(null, null, _file_url_decorators, { kind: "field", name: "file_url", static: false, private: false, access: { has: function (obj) { return "file_url" in obj; }, get: function (obj) { return obj.file_url; }, set: function (obj, value) { obj.file_url = value; } }, metadata: _metadata }, _file_url_initializers, _file_url_extraInitializers);
            __esDecorate(null, null, _file_name_decorators, { kind: "field", name: "file_name", static: false, private: false, access: { has: function (obj) { return "file_name" in obj; }, get: function (obj) { return obj.file_name; }, set: function (obj, value) { obj.file_name = value; } }, metadata: _metadata }, _file_name_initializers, _file_name_extraInitializers);
            __esDecorate(null, null, _file_size_decorators, { kind: "field", name: "file_size", static: false, private: false, access: { has: function (obj) { return "file_size" in obj; }, get: function (obj) { return obj.file_size; }, set: function (obj, value) { obj.file_size = value; } }, metadata: _metadata }, _file_size_initializers, _file_size_extraInitializers);
            __esDecorate(null, null, _file_type_decorators, { kind: "field", name: "file_type", static: false, private: false, access: { has: function (obj) { return "file_type" in obj; }, get: function (obj) { return obj.file_type; }, set: function (obj, value) { obj.file_type = value; } }, metadata: _metadata }, _file_type_initializers, _file_type_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateMessageInputDto = CreateMessageInputDto;
var CreateMessageOutputDto = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _conversation_id_decorators;
    var _conversation_id_initializers = [];
    var _conversation_id_extraInitializers = [];
    var _sender_id_decorators;
    var _sender_id_initializers = [];
    var _sender_id_extraInitializers = [];
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
    var _is_deleted_decorators;
    var _is_deleted_initializers = [];
    var _is_deleted_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var _updated_at_decorators;
    var _updated_at_initializers = [];
    var _updated_at_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateMessageOutputDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.conversation_id = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _conversation_id_initializers, void 0));
                this.sender_id = (__runInitializers(this, _conversation_id_extraInitializers), __runInitializers(this, _sender_id_initializers, void 0));
                this.content = (__runInitializers(this, _sender_id_extraInitializers), __runInitializers(this, _content_initializers, void 0));
                this.message_type = (__runInitializers(this, _content_extraInitializers), __runInitializers(this, _message_type_initializers, void 0));
                this.file_url = (__runInitializers(this, _message_type_extraInitializers), __runInitializers(this, _file_url_initializers, void 0));
                this.file_name = (__runInitializers(this, _file_url_extraInitializers), __runInitializers(this, _file_name_initializers, void 0));
                this.file_size = (__runInitializers(this, _file_name_extraInitializers), __runInitializers(this, _file_size_initializers, void 0));
                this.file_type = (__runInitializers(this, _file_size_extraInitializers), __runInitializers(this, _file_type_initializers, void 0));
                this.is_read = (__runInitializers(this, _file_type_extraInitializers), __runInitializers(this, _is_read_initializers, void 0));
                this.is_deleted = (__runInitializers(this, _is_read_extraInitializers), __runInitializers(this, _is_deleted_initializers, void 0));
                this.created_at = (__runInitializers(this, _is_deleted_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
                this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
                __runInitializers(this, _updated_at_extraInitializers);
            }
            return CreateMessageOutputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Message ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                })];
            _conversation_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                })];
            _sender_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Sender ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                })];
            _content_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Message content',
                    example: 'Hello, how are you?',
                })];
            _message_type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Message type',
                    example: 'text',
                    enum: MessageType,
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
                    example: false,
                })];
            _is_deleted_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether message is deleted',
                    example: false,
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
            __esDecorate(null, null, _conversation_id_decorators, { kind: "field", name: "conversation_id", static: false, private: false, access: { has: function (obj) { return "conversation_id" in obj; }, get: function (obj) { return obj.conversation_id; }, set: function (obj, value) { obj.conversation_id = value; } }, metadata: _metadata }, _conversation_id_initializers, _conversation_id_extraInitializers);
            __esDecorate(null, null, _sender_id_decorators, { kind: "field", name: "sender_id", static: false, private: false, access: { has: function (obj) { return "sender_id" in obj; }, get: function (obj) { return obj.sender_id; }, set: function (obj, value) { obj.sender_id = value; } }, metadata: _metadata }, _sender_id_initializers, _sender_id_extraInitializers);
            __esDecorate(null, null, _content_decorators, { kind: "field", name: "content", static: false, private: false, access: { has: function (obj) { return "content" in obj; }, get: function (obj) { return obj.content; }, set: function (obj, value) { obj.content = value; } }, metadata: _metadata }, _content_initializers, _content_extraInitializers);
            __esDecorate(null, null, _message_type_decorators, { kind: "field", name: "message_type", static: false, private: false, access: { has: function (obj) { return "message_type" in obj; }, get: function (obj) { return obj.message_type; }, set: function (obj, value) { obj.message_type = value; } }, metadata: _metadata }, _message_type_initializers, _message_type_extraInitializers);
            __esDecorate(null, null, _file_url_decorators, { kind: "field", name: "file_url", static: false, private: false, access: { has: function (obj) { return "file_url" in obj; }, get: function (obj) { return obj.file_url; }, set: function (obj, value) { obj.file_url = value; } }, metadata: _metadata }, _file_url_initializers, _file_url_extraInitializers);
            __esDecorate(null, null, _file_name_decorators, { kind: "field", name: "file_name", static: false, private: false, access: { has: function (obj) { return "file_name" in obj; }, get: function (obj) { return obj.file_name; }, set: function (obj, value) { obj.file_name = value; } }, metadata: _metadata }, _file_name_initializers, _file_name_extraInitializers);
            __esDecorate(null, null, _file_size_decorators, { kind: "field", name: "file_size", static: false, private: false, access: { has: function (obj) { return "file_size" in obj; }, get: function (obj) { return obj.file_size; }, set: function (obj, value) { obj.file_size = value; } }, metadata: _metadata }, _file_size_initializers, _file_size_extraInitializers);
            __esDecorate(null, null, _file_type_decorators, { kind: "field", name: "file_type", static: false, private: false, access: { has: function (obj) { return "file_type" in obj; }, get: function (obj) { return obj.file_type; }, set: function (obj, value) { obj.file_type = value; } }, metadata: _metadata }, _file_type_initializers, _file_type_extraInitializers);
            __esDecorate(null, null, _is_read_decorators, { kind: "field", name: "is_read", static: false, private: false, access: { has: function (obj) { return "is_read" in obj; }, get: function (obj) { return obj.is_read; }, set: function (obj, value) { obj.is_read = value; } }, metadata: _metadata }, _is_read_initializers, _is_read_extraInitializers);
            __esDecorate(null, null, _is_deleted_decorators, { kind: "field", name: "is_deleted", static: false, private: false, access: { has: function (obj) { return "is_deleted" in obj; }, get: function (obj) { return obj.is_deleted; }, set: function (obj, value) { obj.is_deleted = value; } }, metadata: _metadata }, _is_deleted_initializers, _is_deleted_extraInitializers);
            __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
            __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: function (obj) { return "updated_at" in obj; }, get: function (obj) { return obj.updated_at; }, set: function (obj, value) { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateMessageOutputDto = CreateMessageOutputDto;
