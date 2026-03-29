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
exports.GetConversationDetailsOutputDto = exports.GetConversationDetailsInputDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var get_conversations_dto_1 = require("./get-conversations.dto");
var GetConversationDetailsInputDto = function () {
    var _a;
    var _conversation_id_decorators;
    var _conversation_id_initializers = [];
    var _conversation_id_extraInitializers = [];
    return _a = /** @class */ (function () {
            function GetConversationDetailsInputDto() {
                this.conversation_id = __runInitializers(this, _conversation_id_initializers, void 0);
                __runInitializers(this, _conversation_id_extraInitializers);
            }
            return GetConversationDetailsInputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _conversation_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation ID',
                    example: '123e4567-e89b-12d3-a456-426614174000',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsUUID)()];
            __esDecorate(null, null, _conversation_id_decorators, { kind: "field", name: "conversation_id", static: false, private: false, access: { has: function (obj) { return "conversation_id" in obj; }, get: function (obj) { return obj.conversation_id; }, set: function (obj, value) { obj.conversation_id = value; } }, metadata: _metadata }, _conversation_id_initializers, _conversation_id_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetConversationDetailsInputDto = GetConversationDetailsInputDto;
var GetConversationDetailsOutputDto = function () {
    var _a;
    var _conversation_decorators;
    var _conversation_initializers = [];
    var _conversation_extraInitializers = [];
    return _a = /** @class */ (function () {
            function GetConversationDetailsOutputDto() {
                this.conversation = __runInitializers(this, _conversation_initializers, void 0);
                __runInitializers(this, _conversation_extraInitializers);
            }
            return GetConversationDetailsOutputDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _conversation_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Conversation details',
                    type: get_conversations_dto_1.ConversationDto,
                })];
            __esDecorate(null, null, _conversation_decorators, { kind: "field", name: "conversation", static: false, private: false, access: { has: function (obj) { return "conversation" in obj; }, get: function (obj) { return obj.conversation; }, set: function (obj, value) { obj.conversation = value; } }, metadata: _metadata }, _conversation_initializers, _conversation_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetConversationDetailsOutputDto = GetConversationDetailsOutputDto;
