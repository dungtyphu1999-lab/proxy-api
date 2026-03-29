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
exports.UpdateUserProfileResponseDto = exports.UserProfileDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var response_dto_1 = require("@/shared/dto/response.dto");
var UserProfileDto = function () {
    var _a;
    var _user_id_decorators;
    var _user_id_initializers = [];
    var _user_id_extraInitializers = [];
    var _full_name_decorators;
    var _full_name_initializers = [];
    var _full_name_extraInitializers = [];
    var _avatar_url_decorators;
    var _avatar_url_initializers = [];
    var _avatar_url_extraInitializers = [];
    var _dob_decorators;
    var _dob_initializers = [];
    var _dob_extraInitializers = [];
    var _created_at_decorators;
    var _created_at_initializers = [];
    var _created_at_extraInitializers = [];
    var _updated_at_decorators;
    var _updated_at_initializers = [];
    var _updated_at_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UserProfileDto() {
                this.user_id = __runInitializers(this, _user_id_initializers, void 0);
                this.full_name = (__runInitializers(this, _user_id_extraInitializers), __runInitializers(this, _full_name_initializers, void 0));
                this.avatar_url = (__runInitializers(this, _full_name_extraInitializers), __runInitializers(this, _avatar_url_initializers, void 0));
                this.dob = (__runInitializers(this, _avatar_url_extraInitializers), __runInitializers(this, _dob_initializers, void 0));
                this.created_at = (__runInitializers(this, _dob_extraInitializers), __runInitializers(this, _created_at_initializers, void 0));
                this.updated_at = (__runInitializers(this, _created_at_extraInitializers), __runInitializers(this, _updated_at_initializers, void 0));
                __runInitializers(this, _updated_at_extraInitializers);
            }
            return UserProfileDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _user_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'User ID',
                    format: 'uuid',
                    example: '550e8400-e29b-41d4-a716-446655440000',
                })];
            _full_name_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Full name of the user',
                    example: 'John Doe',
                    required: false,
                })];
            _avatar_url_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Avatar URL',
                    example: '/uploads/avatars/user-avatar.jpg',
                    required: false,
                })];
            _dob_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Date of birth',
                    format: 'date',
                    example: '1990-01-15',
                    required: false,
                })];
            _created_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Profile creation timestamp',
                    format: 'date-time',
                    example: '2024-01-15T10:30:45Z',
                })];
            _updated_at_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Profile last update timestamp',
                    format: 'date-time',
                    example: '2024-07-31T14:20:15Z',
                })];
            __esDecorate(null, null, _user_id_decorators, { kind: "field", name: "user_id", static: false, private: false, access: { has: function (obj) { return "user_id" in obj; }, get: function (obj) { return obj.user_id; }, set: function (obj, value) { obj.user_id = value; } }, metadata: _metadata }, _user_id_initializers, _user_id_extraInitializers);
            __esDecorate(null, null, _full_name_decorators, { kind: "field", name: "full_name", static: false, private: false, access: { has: function (obj) { return "full_name" in obj; }, get: function (obj) { return obj.full_name; }, set: function (obj, value) { obj.full_name = value; } }, metadata: _metadata }, _full_name_initializers, _full_name_extraInitializers);
            __esDecorate(null, null, _avatar_url_decorators, { kind: "field", name: "avatar_url", static: false, private: false, access: { has: function (obj) { return "avatar_url" in obj; }, get: function (obj) { return obj.avatar_url; }, set: function (obj, value) { obj.avatar_url = value; } }, metadata: _metadata }, _avatar_url_initializers, _avatar_url_extraInitializers);
            __esDecorate(null, null, _dob_decorators, { kind: "field", name: "dob", static: false, private: false, access: { has: function (obj) { return "dob" in obj; }, get: function (obj) { return obj.dob; }, set: function (obj, value) { obj.dob = value; } }, metadata: _metadata }, _dob_initializers, _dob_extraInitializers);
            __esDecorate(null, null, _created_at_decorators, { kind: "field", name: "created_at", static: false, private: false, access: { has: function (obj) { return "created_at" in obj; }, get: function (obj) { return obj.created_at; }, set: function (obj, value) { obj.created_at = value; } }, metadata: _metadata }, _created_at_initializers, _created_at_extraInitializers);
            __esDecorate(null, null, _updated_at_decorators, { kind: "field", name: "updated_at", static: false, private: false, access: { has: function (obj) { return "updated_at" in obj; }, get: function (obj) { return obj.updated_at; }, set: function (obj, value) { obj.updated_at = value; } }, metadata: _metadata }, _updated_at_initializers, _updated_at_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UserProfileDto = UserProfileDto;
var UpdateUserProfileResponseDto = /** @class */ (function (_super) {
    __extends(UpdateUserProfileResponseDto, _super);
    function UpdateUserProfileResponseDto() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UpdateUserProfileResponseDto;
}(response_dto_1.SuccessResponseDto));
exports.UpdateUserProfileResponseDto = UpdateUserProfileResponseDto;
