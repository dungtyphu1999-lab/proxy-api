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
exports.SocialAuthResponse = exports.SocialUserInfo = exports.FacebookAuthDto = exports.GoogleAuthDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var GoogleAuthDto = function () {
    var _a;
    var _idToken_decorators;
    var _idToken_initializers = [];
    var _idToken_extraInitializers = [];
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    return _a = /** @class */ (function () {
            function GoogleAuthDto() {
                this.idToken = __runInitializers(this, _idToken_initializers, void 0);
                this.code = (__runInitializers(this, _idToken_extraInitializers), __runInitializers(this, _code_initializers, void 0));
                __runInitializers(this, _code_extraInitializers);
            }
            return GoogleAuthDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _idToken_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'ID token from Google (JWT format)',
                    example: 'eyJhbGciOiJSUzI1NiIsImtpZCI6...',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _code_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Authorization code from Google (optional)',
                    example: '4/0AX4XfWi...',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _idToken_decorators, { kind: "field", name: "idToken", static: false, private: false, access: { has: function (obj) { return "idToken" in obj; }, get: function (obj) { return obj.idToken; }, set: function (obj, value) { obj.idToken = value; } }, metadata: _metadata }, _idToken_initializers, _idToken_extraInitializers);
            __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GoogleAuthDto = GoogleAuthDto;
var FacebookAuthDto = function () {
    var _a;
    var _accessToken_decorators;
    var _accessToken_initializers = [];
    var _accessToken_extraInitializers = [];
    var _code_decorators;
    var _code_initializers = [];
    var _code_extraInitializers = [];
    return _a = /** @class */ (function () {
            function FacebookAuthDto() {
                this.accessToken = __runInitializers(this, _accessToken_initializers, void 0);
                this.code = (__runInitializers(this, _accessToken_extraInitializers), __runInitializers(this, _code_initializers, void 0));
                __runInitializers(this, _code_extraInitializers);
            }
            return FacebookAuthDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _accessToken_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Access token from Facebook',
                    example: 'EAAG...',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _code_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'Authorization code from Facebook (optional)',
                    example: '4/0AX4XfWi...',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _accessToken_decorators, { kind: "field", name: "accessToken", static: false, private: false, access: { has: function (obj) { return "accessToken" in obj; }, get: function (obj) { return obj.accessToken; }, set: function (obj, value) { obj.accessToken = value; } }, metadata: _metadata }, _accessToken_initializers, _accessToken_extraInitializers);
            __esDecorate(null, null, _code_decorators, { kind: "field", name: "code", static: false, private: false, access: { has: function (obj) { return "code" in obj; }, get: function (obj) { return obj.code; }, set: function (obj, value) { obj.code = value; } }, metadata: _metadata }, _code_initializers, _code_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.FacebookAuthDto = FacebookAuthDto;
var SocialUserInfo = function () {
    var _a;
    var _provider_id_decorators;
    var _provider_id_initializers = [];
    var _provider_id_extraInitializers = [];
    var _email_decorators;
    var _email_initializers = [];
    var _email_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _avatar_url_decorators;
    var _avatar_url_initializers = [];
    var _avatar_url_extraInitializers = [];
    var _provider_decorators;
    var _provider_initializers = [];
    var _provider_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SocialUserInfo() {
                this.provider_id = __runInitializers(this, _provider_id_initializers, void 0);
                this.email = (__runInitializers(this, _provider_id_extraInitializers), __runInitializers(this, _email_initializers, void 0));
                this.name = (__runInitializers(this, _email_extraInitializers), __runInitializers(this, _name_initializers, void 0));
                this.avatar_url = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _avatar_url_initializers, void 0));
                this.provider = (__runInitializers(this, _avatar_url_extraInitializers), __runInitializers(this, _provider_initializers, void 0)); // 'google' | 'facebook'
                __runInitializers(this, _provider_extraInitializers);
            }
            return SocialUserInfo;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _provider_id_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'User ID from provider',
                    example: '1234567890',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _email_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'User email',
                    example: 'user@example.com',
                }), (0, class_validator_1.IsEmail)()];
            _name_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'User name',
                    example: 'Nguyễn Văn A',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _avatar_url_decorators = [(0, swagger_1.ApiPropertyOptional)({
                    description: 'User avatar URL',
                    example: 'https://lh3.googleusercontent.com/a/...',
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsOptional)()];
            _provider_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Login provider',
                    example: 'google',
                    enum: ['google', 'facebook'],
                }), (0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            __esDecorate(null, null, _provider_id_decorators, { kind: "field", name: "provider_id", static: false, private: false, access: { has: function (obj) { return "provider_id" in obj; }, get: function (obj) { return obj.provider_id; }, set: function (obj, value) { obj.provider_id = value; } }, metadata: _metadata }, _provider_id_initializers, _provider_id_extraInitializers);
            __esDecorate(null, null, _email_decorators, { kind: "field", name: "email", static: false, private: false, access: { has: function (obj) { return "email" in obj; }, get: function (obj) { return obj.email; }, set: function (obj, value) { obj.email = value; } }, metadata: _metadata }, _email_initializers, _email_extraInitializers);
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _avatar_url_decorators, { kind: "field", name: "avatar_url", static: false, private: false, access: { has: function (obj) { return "avatar_url" in obj; }, get: function (obj) { return obj.avatar_url; }, set: function (obj, value) { obj.avatar_url = value; } }, metadata: _metadata }, _avatar_url_initializers, _avatar_url_extraInitializers);
            __esDecorate(null, null, _provider_decorators, { kind: "field", name: "provider", static: false, private: false, access: { has: function (obj) { return "provider" in obj; }, get: function (obj) { return obj.provider; }, set: function (obj, value) { obj.provider = value; } }, metadata: _metadata }, _provider_initializers, _provider_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SocialUserInfo = SocialUserInfo;
var SocialAuthResponse = function () {
    var _a;
    var _access_token_decorators;
    var _access_token_initializers = [];
    var _access_token_extraInitializers = [];
    var _refresh_token_decorators;
    var _refresh_token_initializers = [];
    var _refresh_token_extraInitializers = [];
    var _user_decorators;
    var _user_initializers = [];
    var _user_extraInitializers = [];
    var _roles_decorators;
    var _roles_initializers = [];
    var _roles_extraInitializers = [];
    var _shop_decorators;
    var _shop_initializers = [];
    var _shop_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SocialAuthResponse() {
                this.access_token = __runInitializers(this, _access_token_initializers, void 0);
                this.refresh_token = (__runInitializers(this, _access_token_extraInitializers), __runInitializers(this, _refresh_token_initializers, void 0));
                this.user = (__runInitializers(this, _refresh_token_extraInitializers), __runInitializers(this, _user_initializers, void 0));
                this.roles = (__runInitializers(this, _user_extraInitializers), __runInitializers(this, _roles_initializers, void 0));
                this.shop = (__runInitializers(this, _roles_extraInitializers), __runInitializers(this, _shop_initializers, void 0));
                __runInitializers(this, _shop_extraInitializers);
            }
            return SocialAuthResponse;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _access_token_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'JWT access token for authenticated user',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                })];
            _refresh_token_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Refresh token for getting new access tokens',
                    example: 'refresh_token_string',
                })];
            _user_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'User information',
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            description: 'User ID in the system',
                            example: '550e8400-e29b-41d4-a716-446655440000',
                        },
                        email: {
                            type: 'string',
                            description: 'User email',
                            example: 'user@example.com',
                        },
                        username: {
                            type: 'string',
                            description: 'User username',
                            example: 'user123',
                        },
                        full_name: {
                            type: 'string',
                            description: 'User full name',
                            example: 'Nguyễn Văn A',
                        },
                        phone_number: {
                            type: 'string',
                            description: 'User phone number',
                            example: '0909090909',
                        },
                        is_verified: {
                            type: 'boolean',
                            description: 'Email verification status',
                            example: true,
                        },
                        is_profile_completed: {
                            type: 'boolean',
                            description: 'Profile completion status (especially for social login)',
                            example: true,
                        },
                    },
                })];
            _roles_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'User roles',
                    example: ['user'],
                    type: [String],
                })];
            _shop_decorators = [(0, swagger_1.ApiProperty)({
                    description: 'Shop information if user has a shop',
                    required: false,
                })];
            __esDecorate(null, null, _access_token_decorators, { kind: "field", name: "access_token", static: false, private: false, access: { has: function (obj) { return "access_token" in obj; }, get: function (obj) { return obj.access_token; }, set: function (obj, value) { obj.access_token = value; } }, metadata: _metadata }, _access_token_initializers, _access_token_extraInitializers);
            __esDecorate(null, null, _refresh_token_decorators, { kind: "field", name: "refresh_token", static: false, private: false, access: { has: function (obj) { return "refresh_token" in obj; }, get: function (obj) { return obj.refresh_token; }, set: function (obj, value) { obj.refresh_token = value; } }, metadata: _metadata }, _refresh_token_initializers, _refresh_token_extraInitializers);
            __esDecorate(null, null, _user_decorators, { kind: "field", name: "user", static: false, private: false, access: { has: function (obj) { return "user" in obj; }, get: function (obj) { return obj.user; }, set: function (obj, value) { obj.user = value; } }, metadata: _metadata }, _user_initializers, _user_extraInitializers);
            __esDecorate(null, null, _roles_decorators, { kind: "field", name: "roles", static: false, private: false, access: { has: function (obj) { return "roles" in obj; }, get: function (obj) { return obj.roles; }, set: function (obj, value) { obj.roles = value; } }, metadata: _metadata }, _roles_initializers, _roles_extraInitializers);
            __esDecorate(null, null, _shop_decorators, { kind: "field", name: "shop", static: false, private: false, access: { has: function (obj) { return "shop" in obj; }, get: function (obj) { return obj.shop; }, set: function (obj, value) { obj.shop = value; } }, metadata: _metadata }, _shop_initializers, _shop_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SocialAuthResponse = SocialAuthResponse;
