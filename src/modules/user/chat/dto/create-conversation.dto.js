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
exports.CreateConversationOutputDto = exports.CreateConversationInputDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var get_conversations_dto_1 = require("./get-conversations.dto");
var CreateConversationInputDto = function () {
    var _a;
    var _participant_id_decorators;
    var _participant_id_initializers = [];
    var _participant_id_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateConversationInputDto() {
                this.participant_id = __runInitializers(this, _participant_id_initializers, void 0);
                this.type = (__runInitializers(this, _participant_id_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.title = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                __runInitializers(this, _title_extraInitializers);
            }
            return CreateConversationInputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _participant_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Participant ID (user, shop, or admin to chat with)',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)(), (0, class_validator_1.IsUUID)()];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation type',
                    enum: get_conversations_dto_1.ConversationType,
                    example: get_conversations_dto_1.ConversationType.USER_TO_USER,
                }), (0, class_validator_1.IsEnum)(get_conversations_dto_1.ConversationType), (0, class_transformer_1.Type)(function () { return String; })];
            _title_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation title',
                    example: 'Chat with John Doe',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _participant_id_decorators, { kind: "field", name: "participant_id", static: false, private: false, access: { has: function (obj) { return "participant_id" in obj; }, get: function (obj) { return obj.participant_id; }, set: function (obj, value) { obj.participant_id = value; } }, metadata: _metadata }, _participant_id_initializers, _participant_id_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateConversationInputDto = CreateConversationInputDto;
var CreateConversationOutputDto = function () {
    var _a;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _participant_id_decorators;
    var _participant_id_initializers = [];
    var _participant_id_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _title_decorators;
    var _title_initializers = [];
    var _title_extraInitializers = [];
    var _is_new_decorators;
    var _is_new_initializers = [];
    var _is_new_extraInitializers = [];
    return _a = /** @class */ (function () {
            function CreateConversationOutputDto() {
                this.id = __runInitializers(this, _id_initializers, void 0);
                this.participant_id = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _participant_id_initializers, void 0));
                this.type = (__runInitializers(this, _participant_id_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.title = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _title_initializers, void 0));
                this.is_new = (__runInitializers(this, _title_extraInitializers), __runInitializers(this, _is_new_initializers, void 0));
                __runInitializers(this, _is_new_extraInitializers);
            }
            return CreateConversationOutputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                }), (0, class_validator_1.IsString)()];
            _participant_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Participant ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                }), (0, class_validator_1.IsString)()];
            _type_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation type',
                    enum: get_conversations_dto_1.ConversationType,
                    example: get_conversations_dto_1.ConversationType.USER_TO_USER,
                }), (0, class_validator_1.IsEnum)(get_conversations_dto_1.ConversationType)];
            _title_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation title',
                    example: 'Chat with John Doe',
                    required: false,
                }), (0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _is_new_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Whether conversation was newly created',
                    example: true,
                })];
            __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
            __esDecorate(null, null, _participant_id_decorators, { kind: "field", name: "participant_id", static: false, private: false, access: { has: function (obj) { return "participant_id" in obj; }, get: function (obj) { return obj.participant_id; }, set: function (obj, value) { obj.participant_id = value; } }, metadata: _metadata }, _participant_id_initializers, _participant_id_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _title_decorators, { kind: "field", name: "title", static: false, private: false, access: { has: function (obj) { return "title" in obj; }, get: function (obj) { return obj.title; }, set: function (obj, value) { obj.title = value; } }, metadata: _metadata }, _title_initializers, _title_extraInitializers);
            __esDecorate(null, null, _is_new_decorators, { kind: "field", name: "is_new", static: false, private: false, access: { has: function (obj) { return "is_new" in obj; }, get: function (obj) { return obj.is_new; }, set: function (obj, value) { obj.is_new = value; } }, metadata: _metadata }, _is_new_initializers, _is_new_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.CreateConversationOutputDto = CreateConversationOutputDto;
