"use strict";
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
exports.SocialAuthService = void 0;
var common_1 = require("@nestjs/common");
var axios_1 = require("axios");
var google_auth_library_1 = require("google-auth-library");
var uuid_1 = require("uuid");
var error_codes_enum_1 = require("@/shared/constants/error-codes.enum");
var SocialAuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var SocialAuthService = _classThis = /** @class */ (function () {
        function SocialAuthService_1(databaseService, userService, userProfileService, rolesService, walletService, configService, authService) {
            this.databaseService = databaseService;
            this.userService = userService;
            this.userProfileService = userProfileService;
            this.rolesService = rolesService;
            this.walletService = walletService;
            this.configService = configService;
            this.authService = authService;
            var googleClientId = this.configService.get('oauth.google.clientId');
            this.googleClient = new google_auth_library_1.OAuth2Client(googleClientId);
        }
        /** Verify Google ID token and return basic profile */
        SocialAuthService_1.prototype.verifyGoogleToken = function (idToken) {
            return __awaiter(this, void 0, void 0, function () {
                var ticket, payload, id, email, name_1, picture, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.googleClient.verifyIdToken({
                                    idToken: idToken,
                                    audience: this.configService.get('oauth.google.clientId'),
                                })];
                        case 1:
                            ticket = _b.sent();
                            payload = ticket.getPayload();
                            if (!payload) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_SOCIAL_INVALID_GOOGLE_TOKEN);
                            }
                            id = payload.sub, email = payload.email, name_1 = payload.name, picture = payload.picture;
                            if (!email) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_SOCIAL_EMAIL_REQUIRED);
                            }
                            return [2 /*return*/, {
                                    provider_id: id,
                                    email: email,
                                    name: name_1,
                                    avatar_url: picture,
                                    provider: 'google',
                                }];
                        case 2:
                            _a = _b.sent();
                            throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_SOCIAL_INVALID_GOOGLE_TOKEN);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /** Verify Facebook access token and return basic profile */
        SocialAuthService_1.prototype.verifyFacebookToken = function (accessToken) {
            return __awaiter(this, void 0, void 0, function () {
                var response, _a, id, email, name_2, picture, finalEmail, _b;
                var _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, axios_1.default.get("https://graph.facebook.com/me?fields=id,email,name,picture&access_token=".concat(accessToken))];
                        case 1:
                            response = _d.sent();
                            _a = response.data, id = _a.id, email = _a.email, name_2 = _a.name, picture = _a.picture;
                            finalEmail = email !== null && email !== void 0 ? email : "".concat(id, "@facebook.com");
                            return [2 /*return*/, {
                                    provider_id: id,
                                    email: finalEmail,
                                    name: name_2,
                                    avatar_url: ((_c = picture === null || picture === void 0 ? void 0 : picture.data) === null || _c === void 0 ? void 0 : _c.url) || '',
                                    provider: 'facebook',
                                }];
                        case 2:
                            _b = _d.sent();
                            throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_SOCIAL_INVALID_FACEBOOK_TOKEN);
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /** Orchestrate social login flow and return auth tokens */
        SocialAuthService_1.prototype.handleSocialLogin = function (userInfo) {
            return __awaiter(this, void 0, void 0, function () {
                var user, userProfile, _a, isProfileCompleted, response;
                var _this = this;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.databaseService.transaction(function (knex) { return __awaiter(_this, void 0, void 0, function () {
                                var existingProvider, user, existingUser;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, knex('user_providers')
                                                .where('provider', userInfo.provider)
                                                .where('provider_id', userInfo.provider_id)
                                                .first()];
                                        case 1:
                                            existingProvider = (_a.sent());
                                            if (!existingProvider) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.userService.findById(existingProvider.user_id)];
                                        case 2:
                                            user = _a.sent();
                                            if (!user) {
                                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_USER_NOT_FOUND);
                                            }
                                            return [3 /*break*/, 6];
                                        case 3: return [4 /*yield*/, this.userService.findByEmail(userInfo.email)];
                                        case 4:
                                            existingUser = _a.sent();
                                            if (existingUser) {
                                                throw new common_1.ConflictException(error_codes_enum_1.ErrorCode.AUTH_SOCIAL_EMAIL_ALREADY_EXISTS);
                                            }
                                            return [4 /*yield*/, this.createUserWithSocialProvider(userInfo, knex)];
                                        case 5:
                                            user = _a.sent();
                                            _a.label = 6;
                                        case 6:
                                            if (!user) {
                                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_USER_NOT_FOUND);
                                            }
                                            if (user.is_locked) {
                                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_USER_LOCKED);
                                            }
                                            return [2 /*return*/, user];
                                    }
                                });
                            }); })];
                        case 1:
                            user = _b.sent();
                            userProfile = null;
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, this.userProfileService.getProfile(user.id)];
                        case 3:
                            userProfile = _b.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            _a = _b.sent();
                            userProfile = null;
                            return [3 /*break*/, 5];
                        case 5:
                            isProfileCompleted = !!((userProfile === null || userProfile === void 0 ? void 0 : userProfile.full_name) &&
                                (user === null || user === void 0 ? void 0 : user.username));
                            return [4 /*yield*/, this.authService.generateAuthResponse(user)];
                        case 6:
                            response = _b.sent();
                            return [2 /*return*/, {
                                    access_token: response.access_token,
                                    refresh_token: response.refresh_token,
                                    user: __assign(__assign({}, response.user), { is_profile_completed: isProfileCompleted, full_name: userProfile === null || userProfile === void 0 ? void 0 : userProfile.full_name }),
                                    roles: response.roles,
                                    shop: response.shop,
                                }];
                    }
                });
            });
        };
        /**
         * Create new user and link social provider
         */
        SocialAuthService_1.prototype.createUserWithSocialProvider = function (userInfo, knex) {
            return __awaiter(this, void 0, void 0, function () {
                var executeInTransaction;
                var _this = this;
                return __generator(this, function (_a) {
                    executeInTransaction = function (trx) { return __awaiter(_this, void 0, void 0, function () {
                        var userId, baseUsername, username, newUser, userProfile, userProvider, userRole;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    userId = (0, uuid_1.v4)();
                                    baseUsername = userInfo.email.split('@')[0];
                                    return [4 /*yield*/, this.generateUniqueUsername(baseUsername, trx)];
                                case 1:
                                    username = _a.sent();
                                    newUser = {
                                        id: userId,
                                        email: userInfo.email,
                                        username: username,
                                        password_hash: '',
                                        is_verified: true,
                                        is_locked: false,
                                        is_online: false,
                                        has_received_welcome_message: false,
                                        created_at: new Date(),
                                        updated_at: new Date(),
                                    };
                                    return [4 /*yield*/, trx('users').insert(newUser)];
                                case 2:
                                    _a.sent();
                                    userProfile = {
                                        user_id: userId,
                                        full_name: userInfo.name || '',
                                        avatar_url: userInfo.avatar_url || '',
                                    };
                                    return [4 /*yield*/, this.userProfileService.createProfile(userId, userProfile, trx)];
                                case 3:
                                    _a.sent();
                                    userProvider = {
                                        user_id: userId,
                                        provider: userInfo.provider,
                                        provider_id: userInfo.provider_id,
                                        created_at: new Date(),
                                        updated_at: new Date(),
                                    };
                                    return [4 /*yield*/, trx('user_providers').insert(userProvider)];
                                case 4:
                                    _a.sent();
                                    return [4 /*yield*/, this.rolesService.findByName('user', trx)];
                                case 5:
                                    userRole = _a.sent();
                                    if (!userRole) {
                                        throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_CANNOT_CREATE_USER);
                                    }
                                    return [4 /*yield*/, trx('user_role_map').insert({
                                            user_id: userId,
                                            role_id: userRole.id,
                                            assigned_at: new Date(),
                                        })];
                                case 6:
                                    _a.sent();
                                    return [4 /*yield*/, this.walletService.getOrCreateWallet(userId, trx)];
                                case 7:
                                    _a.sent();
                                    return [2 /*return*/, newUser];
                            }
                        });
                    }); };
                    if (knex) {
                        return [2 /*return*/, executeInTransaction(knex)];
                    }
                    else {
                        return [2 /*return*/, this.databaseService.transaction(executeInTransaction)];
                    }
                    return [2 /*return*/];
                });
            });
        };
        /**
         * Generate a unique username from base value
         */
        SocialAuthService_1.prototype.generateUniqueUsername = function (baseUsername, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var username, counter, existingUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            username = baseUsername;
                            counter = 1;
                            _a.label = 1;
                        case 1:
                            if (!true) return [3 /*break*/, 3];
                            return [4 /*yield*/, trx('users')
                                    .where('username', username)
                                    .first()];
                        case 2:
                            existingUser = (_a.sent());
                            if (!existingUser) {
                                return [2 /*return*/, username];
                            }
                            username = "".concat(baseUsername).concat(counter);
                            counter++;
                            return [3 /*break*/, 1];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return SocialAuthService_1;
    }());
    __setFunctionName(_classThis, "SocialAuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SocialAuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SocialAuthService = _classThis;
}();
exports.SocialAuthService = SocialAuthService;
