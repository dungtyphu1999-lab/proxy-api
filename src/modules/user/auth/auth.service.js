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
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var uuid_1 = require("uuid");
var lodash_1 = require("lodash");
var error_codes_enum_1 = require("@/shared/constants/error-codes.enum");
var AuthService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var AuthService = _classThis = /** @class */ (function () {
        function AuthService_1(databaseService, userService, jwtService, verificationService, userProfileService, authTokenService, rolesService, shopsService, walletService, chatService) {
            this.databaseService = databaseService;
            this.userService = userService;
            this.jwtService = jwtService;
            this.verificationService = verificationService;
            this.userProfileService = userProfileService;
            this.authTokenService = authTokenService;
            this.rolesService = rolesService;
            this.shopsService = shopsService;
            this.walletService = walletService;
            this.chatService = chatService;
            this.logger = new common_1.Logger(AuthService.name);
        }
        AuthService_1.prototype.validateUser = function (email, password) {
            return __awaiter(this, void 0, void 0, function () {
                var user, validPassword, _a, userRoleNames;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.userService.findByEmail(email)];
                        case 1:
                            user = _b.sent();
                            _a = user;
                            if (!_a) return [3 /*break*/, 3];
                            return [4 /*yield*/, bcrypt.compare(password, user.password_hash)];
                        case 2:
                            _a = (_b.sent());
                            _b.label = 3;
                        case 3:
                            validPassword = _a;
                            if (!user || !validPassword) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_INVALID_CREDENTIALS);
                            }
                            if (user.is_locked) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_USER_LOCKED);
                            }
                            return [4 /*yield*/, this.rolesService.getUserRoleNames(user.id)];
                        case 4:
                            userRoleNames = _b.sent();
                            return [2 /*return*/, (0, lodash_1.omit)(__assign(__assign({}, user), { roles: userRoleNames }), ['password_hash'])];
                    }
                });
            });
        };
        AuthService_1.prototype.signUp = function (signUpDto) {
            return __awaiter(this, void 0, void 0, function () {
                var existingUser, existingUsername, saltRounds, password_hash, id, user, res;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userService.findByEmail(signUpDto.email)];
                        case 1:
                            existingUser = _a.sent();
                            if (existingUser && !existingUser.is_verified) {
                                throw new common_1.ConflictException(error_codes_enum_1.ErrorCode.AUTH_EMAIL_NOT_VERIFIED);
                            }
                            if (existingUser) {
                                throw new common_1.ConflictException(error_codes_enum_1.ErrorCode.AUTH_EMAIL_ALREADY_EXISTS);
                            }
                            return [4 /*yield*/, this.userService.findByUsername(signUpDto.username)];
                        case 2:
                            existingUsername = _a.sent();
                            if (existingUsername) {
                                throw new common_1.ConflictException(error_codes_enum_1.ErrorCode.AUTH_USERNAME_ALREADY_EXISTS);
                            }
                            saltRounds = 10;
                            return [4 /*yield*/, bcrypt.hash(signUpDto.password, saltRounds)];
                        case 3:
                            password_hash = _a.sent();
                            id = (0, uuid_1.v4)();
                            return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                    var user, user_profile, userRole, verificationSent;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, this.userService.createUser({
                                                    id: id,
                                                    email: signUpDto.email,
                                                    username: signUpDto.username,
                                                    // phone_number: signUpDto.phone_number,
                                                    password_hash: password_hash,
                                                    is_verified: false,
                                                    is_online: false,
                                                    has_received_welcome_message: false,
                                                }, trx)];
                                            case 1:
                                                user = _a.sent();
                                                return [4 /*yield*/, this.userProfileService.createProfile(user.id, {
                                                        full_name: signUpDto.fullname,
                                                    }, trx)];
                                            case 2:
                                                user_profile = _a.sent();
                                                return [4 /*yield*/, this.rolesService.findByName('user', trx)];
                                            case 3:
                                                userRole = _a.sent();
                                                if (!userRole) {
                                                    throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_CANNOT_CREATE_USER);
                                                }
                                                return [4 /*yield*/, trx('user_role_map').insert({
                                                        user_id: user.id,
                                                        role_id: userRole.id,
                                                        assigned_at: new Date(),
                                                    })];
                                            case 4:
                                                _a.sent();
                                                return [4 /*yield*/, this.verificationService.sendVerificationCode(signUpDto.email)];
                                            case 5:
                                                verificationSent = _a.sent();
                                                if (!verificationSent) {
                                                    throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_CANNOT_SEND_VERIFICATION_EMAIL);
                                                }
                                                return [2 /*return*/, { user: user, user_profile: user_profile }];
                                        }
                                    });
                                }); })];
                        case 4:
                            user = (_a.sent()).user;
                            return [4 /*yield*/, this.generateAuthResponse(user)];
                        case 5:
                            res = _a.sent();
                            return [2 /*return*/, __assign({ message: 'User registered successfully. Please check your email for verification code.' }, res)];
                    }
                });
            });
        };
        AuthService_1.prototype.signIn = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.generateAuthResponse(user)];
                });
            });
        };
        AuthService_1.prototype.verifyEmail = function (email, code) {
            return __awaiter(this, void 0, void 0, function () {
                var isValid, user, updatedUser;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.verificationService.verifyCode(email, code)];
                        case 1:
                            isValid = _a.sent();
                            if (!isValid) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_INVALID_VERIFICATION_CODE);
                            }
                            return [4 /*yield*/, this.userService.findByEmail(email)];
                        case 2:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_USER_NOT_FOUND);
                            }
                            if (user.is_verified) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_EMAIL_ALREADY_VERIFIED);
                            }
                            return [4 /*yield*/, this.userService.updateUser(user.id, {
                                    is_verified: true,
                                })];
                        case 3:
                            updatedUser = _a.sent();
                            return [2 /*return*/, this.generateAuthResponse(updatedUser)];
                    }
                });
            });
        };
        AuthService_1.prototype.resendVerificationCode = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                var user, verificationSent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userService.findByEmail(email)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_USER_NOT_FOUND);
                            }
                            if (user.is_verified) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_EMAIL_ALREADY_VERIFIED);
                            }
                            return [4 /*yield*/, this.verificationService.sendVerificationCode(email)];
                        case 2:
                            verificationSent = _a.sent();
                            if (!verificationSent) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_CANNOT_SEND_VERIFICATION_EMAIL);
                            }
                            return [2 /*return*/, {
                                    message: 'Verification code sent successfully',
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.refreshAccessToken = function (refreshToken) {
            return __awaiter(this, void 0, void 0, function () {
                var tokenRecord, _a, user, shop, userRoleNames, payload;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.authTokenService.findByRefreshToken(refreshToken)];
                        case 1:
                            tokenRecord = _b.sent();
                            _a = !tokenRecord;
                            if (_a) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.authTokenService.isRefreshTokenValid(refreshToken)];
                        case 2:
                            _a = !(_b.sent());
                            _b.label = 3;
                        case 3:
                            if (_a) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_INVALID_REFRESH_TOKEN);
                            }
                            return [4 /*yield*/, this.userService.findById(tokenRecord.user_id)];
                        case 4:
                            user = _b.sent();
                            if (!user) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_USER_NOT_FOUND);
                            }
                            return [4 /*yield*/, this.shopsService.findShopOfUser(user.id)];
                        case 5:
                            shop = _b.sent();
                            return [4 /*yield*/, this.rolesService.getUserRoleNames(user.id)];
                        case 6:
                            userRoleNames = _b.sent();
                            payload = {
                                email: user.email,
                                sub: user.id,
                                user: (0, lodash_1.omit)(user, ['password_hash']),
                                roles: userRoleNames,
                                shop: shop,
                            };
                            return [2 /*return*/, {
                                    access_token: this.jwtService.sign(payload),
                                    roles: userRoleNames,
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.logout = function (refreshToken) {
            return __awaiter(this, void 0, void 0, function () {
                var tokenRecord;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authTokenService.findByRefreshToken(refreshToken)];
                        case 1:
                            tokenRecord = _a.sent();
                            if (!tokenRecord) {
                                throw new common_1.UnauthorizedException(error_codes_enum_1.ErrorCode.AUTH_INVALID_REFRESH_TOKEN);
                            }
                            return [4 /*yield*/, this.authTokenService.revokeToken(tokenRecord.id)];
                        case 2:
                            _a.sent();
                            // Set is_online = false when user logs out
                            return [4 /*yield*/, this.userService
                                    .setOnlineStatus(tokenRecord.user_id, false)
                                    .catch(function (error) {
                                    // Silently handle errors to not affect logout flow
                                    _this.logger.warn("Failed to update is_online: ".concat(_this.safeErrorMessage(error)));
                                })];
                        case 3:
                            // Set is_online = false when user logs out
                            _a.sent();
                            return [2 /*return*/, {
                                    message: 'Logged out successfully',
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.logoutAll = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authTokenService.revokeAllUserTokens(userId)];
                        case 1:
                            _a.sent();
                            // Set is_online = false when user logs out from all devices
                            return [4 /*yield*/, this.userService.setOnlineStatus(userId, false).catch(function (error) {
                                    // Silently handle errors to not affect logout flow
                                    _this.logger.warn("Failed to update is_online: ".concat(_this.safeErrorMessage(error)));
                                })];
                        case 2:
                            // Set is_online = false when user logs out from all devices
                            _a.sent();
                            return [2 /*return*/, {
                                    message: 'Logged out from all devices successfully',
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.updateOnlineStatus = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userService.updateLastOnlineAtAndSetOnline(userId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        AuthService_1.prototype.forgotPassword = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                var user, resetCodeSent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userService.findByEmail(email)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_USER_NOT_FOUND);
                            }
                            if (!user.is_verified) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_EMAIL_NOT_VERIFIED);
                            }
                            return [4 /*yield*/, this.verificationService.sendPasswordResetCode(email)];
                        case 2:
                            resetCodeSent = _a.sent();
                            if (!resetCodeSent) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_CANNOT_SEND_VERIFICATION_EMAIL);
                            }
                            return [2 /*return*/, {
                                    message: 'Password reset code sent to your email',
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.checkResetCode = function (email, code) {
            return __awaiter(this, void 0, void 0, function () {
                var user, isValidCode;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userService.findByEmail(email)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_USER_NOT_FOUND);
                            }
                            return [4 /*yield*/, this.verificationService.checkPasswordResetCode(email, code)];
                        case 2:
                            isValidCode = _a.sent();
                            if (!isValidCode) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_INVALID_PWD_RESET_CODE);
                            }
                            return [2 /*return*/, {
                                    message: 'Password reset code is valid',
                                    valid: true,
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.resetPassword = function (email, code, newPassword) {
            return __awaiter(this, void 0, void 0, function () {
                var user, isValidCode, saltRounds, newPasswordHash;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userService.findByEmail(email)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_USER_NOT_FOUND);
                            }
                            return [4 /*yield*/, this.verificationService.verifyPasswordResetCode(email, code)];
                        case 2:
                            isValidCode = _a.sent();
                            if (!isValidCode) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_INVALID_PWD_RESET_CODE);
                            }
                            saltRounds = 10;
                            return [4 /*yield*/, bcrypt.hash(newPassword, saltRounds)];
                        case 3:
                            newPasswordHash = _a.sent();
                            return [4 /*yield*/, this.userService.updateUser(user.id, {
                                    password_hash: newPasswordHash,
                                })];
                        case 4:
                            _a.sent();
                            // Logout user from all devices for security
                            return [4 /*yield*/, this.authTokenService.revokeAllUserTokens(user.id)];
                        case 5:
                            // Logout user from all devices for security
                            _a.sent();
                            // Remove social login providers if any existed for this user
                            return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0: return [4 /*yield*/, trx('user_providers').where('user_id', user.id).del()];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); })];
                        case 6:
                            // Remove social login providers if any existed for this user
                            _a.sent();
                            return [2 /*return*/, {
                                    message: 'Password reset successfully. Please log in with your new password.',
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.getCurrentUser = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var currentUser, userId, _a, userProfile, shop, wallet;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.userService.findById(user.sub || user.user.id)];
                        case 1:
                            currentUser = _b.sent();
                            if (!currentUser) {
                                throw new common_1.UnauthorizedException(error_codes_enum_1.ErrorCode.AUTH_USER_NOT_FOUND);
                            }
                            userId = currentUser.id;
                            return [4 /*yield*/, Promise.all([
                                    this.userProfileService.getProfile(userId),
                                    this.shopsService.findShopDetailOfUser(userId),
                                    this.walletService.findWallet(userId),
                                ])];
                        case 2:
                            _a = _b.sent(), userProfile = _a[0], shop = _a[1], wallet = _a[2];
                            return [2 /*return*/, {
                                    user: (0, lodash_1.omit)(currentUser, ['password_hash']),
                                    profile: userProfile,
                                    shop: shop,
                                    wallet: wallet,
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.updateProfile = function (userId, updateProfileDto) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.databaseService.transaction(function (trx) { return __awaiter(_this, void 0, void 0, function () {
                                var user, socialProviderCount, existingUserByUsername, existingUserByPhone;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.userService.findById(userId)];
                                        case 1:
                                            user = _a.sent();
                                            if (!user) {
                                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_USER_NOT_FOUND);
                                            }
                                            return [4 /*yield*/, trx('user_providers')
                                                    .where('user_id', userId)
                                                    .count('* as count')
                                                    .first()];
                                        case 2:
                                            socialProviderCount = _a.sent();
                                            if (!socialProviderCount || Number(socialProviderCount.count) === 0) {
                                                throw new common_1.ForbiddenException(error_codes_enum_1.ErrorCode.AUTH_UPDATE_PROFILE_FORBIDDEN);
                                            }
                                            return [4 /*yield*/, this.userService.findByUsername(updateProfileDto.username)];
                                        case 3:
                                            existingUserByUsername = _a.sent();
                                            if (existingUserByUsername && existingUserByUsername.id !== userId) {
                                                throw new common_1.ConflictException(error_codes_enum_1.ErrorCode.AUTH_USERNAME_ALREADY_EXISTS);
                                            }
                                            if (!updateProfileDto.phone_number) return [3 /*break*/, 5];
                                            return [4 /*yield*/, this.userService.findByPhone(updateProfileDto.phone_number)];
                                        case 4:
                                            existingUserByPhone = _a.sent();
                                            if (existingUserByPhone && existingUserByPhone.id !== userId) {
                                                throw new common_1.ConflictException(error_codes_enum_1.ErrorCode.AUTH_PHONE_NUMBER_ALREADY_EXISTS);
                                            }
                                            _a.label = 5;
                                        case 5: 
                                        // Update user basic info
                                        return [4 /*yield*/, trx('users').where('id', userId).update({
                                                username: updateProfileDto.username,
                                                is_verified: true,
                                                phone_number: updateProfileDto.phone_number,
                                                updated_at: new Date(),
                                            })];
                                        case 6:
                                            // Update user basic info
                                            _a.sent();
                                            // Update user profile
                                            return [4 /*yield*/, trx('user_profiles').where('user_id', userId).update({
                                                    full_name: updateProfileDto.full_name,
                                                })];
                                        case 7:
                                            // Update user profile
                                            _a.sent();
                                            return [2 /*return*/, {
                                                    message: 'Thông tin tài khoản đã được cập nhật thành công',
                                                }];
                                    }
                                });
                            }); })];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AuthService_1.prototype.checkProfileCompleted = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var user, userProfile, isProfileCompleted;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userService.findById(userId)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.UnauthorizedException(error_codes_enum_1.ErrorCode.AUTH_USER_NOT_FOUND);
                            }
                            return [4 /*yield*/, this.userProfileService.getProfile(userId)];
                        case 2:
                            userProfile = _a.sent();
                            isProfileCompleted = !!((userProfile === null || userProfile === void 0 ? void 0 : userProfile.full_name) && (user === null || user === void 0 ? void 0 : user.username));
                            return [2 /*return*/, {
                                    is_profile_completed: isProfileCompleted,
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.generateAuthResponse = function (user) {
            return __awaiter(this, void 0, void 0, function () {
                var userRoleNames, shop, payload, refreshToken;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.rolesService.getUserRoleNames(user.id)];
                        case 1:
                            userRoleNames = _a.sent();
                            return [4 /*yield*/, this.shopsService.findShopOfUser(user.id)];
                        case 2:
                            shop = _a.sent();
                            // Update last_online_at and is_online when user logs in
                            return [4 /*yield*/, this.userService.updateLastOnlineAt(user.id).catch(function (error) {
                                    // Silently handle errors to not affect login flow
                                    _this.logger.warn("Failed to update last_online_at: ".concat(_this.safeErrorMessage(error)));
                                })];
                        case 3:
                            // Update last_online_at and is_online when user logs in
                            _a.sent();
                            return [4 /*yield*/, this.userService.setOnlineStatus(user.id, true).catch(function (error) {
                                    // Silently handle errors to not affect login flow
                                    _this.logger.warn("Failed to update is_online: ".concat(_this.safeErrorMessage(error)));
                                })];
                        case 4:
                            _a.sent();
                            payload = {
                                email: user.email,
                                sub: user.id,
                                user: (0, lodash_1.omit)(user, ['password_hash']),
                                roles: userRoleNames,
                                shop: shop,
                            };
                            return [4 /*yield*/, this.authTokenService.createRefreshToken(user.id)];
                        case 5:
                            refreshToken = _a.sent();
                            return [2 /*return*/, {
                                    access_token: this.jwtService.sign(payload),
                                    refresh_token: refreshToken.refresh_token,
                                    user: (0, lodash_1.omit)(user, ['password_hash']),
                                    roles: userRoleNames,
                                    shop: shop,
                                }];
                    }
                });
            });
        };
        AuthService_1.prototype.safeErrorMessage = function (error) {
            if (error instanceof Error && error.message) {
                return error.message;
            }
            return 'Unknown error';
        };
        return AuthService_1;
    }());
    __setFunctionName(_classThis, "AuthService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthService = _classThis;
}();
exports.AuthService = AuthService;
