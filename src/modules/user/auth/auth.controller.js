"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var sign_in_dto_1 = require("./dto/sign-in.dto");
var local_auth_guard_1 = require("./guards/local-auth.guard");
var jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
var response_dto_1 = require("@/shared/dto/response.dto");
var use_jwt_auth_guard_decorator_1 = require("./decorators/use-jwt-auth-guard.decorator");
var auth_response_dto_1 = require("./dto/auth-response.dto");
var refresh_response_dto_1 = require("./dto/refresh-response.dto");
var resend_code_rate_limit_guard_1 = require("@/modules/rate-limit/resend-code-rate-limit.guard");
var resend_code_rate_limit_decorator_1 = require("@/modules/rate-limit/resend-code-rate-limit.decorator");
var signin_rate_limit_guard_1 = require("@/modules/rate-limit/signin-rate-limit.guard");
var signin_rate_limit_decorator_1 = require("@/modules/rate-limit/signin-rate-limit.decorator");
var domain_role_guard_1 = require("./guards/domain-role.guard");
var social_auth_dto_1 = require("./dto/social-auth.dto");
var check_profile_completed_response_dto_1 = require("./dto/check-profile-completed-response.dto");
var AuthController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('Authentication'), (0, common_1.Controller)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _signUp_decorators;
    var _signIn_decorators;
    var _verifyEmail_decorators;
    var _resendVerification_decorators;
    var _refreshToken_decorators;
    var _logout_decorators;
    var _updateOnlineStatus_decorators;
    var _logoutAll_decorators;
    var _forgotPassword_decorators;
    var _verifyResetCode_decorators;
    var _resetPassword_decorators;
    var _getMe_decorators;
    var _checkProfileCompleted_decorators;
    var _updateProfile_decorators;
    var _googleCallback_decorators;
    var _facebookCallback_decorators;
    var AuthController = _classThis = /** @class */ (function () {
        function AuthController_1(authService, socialAuthService) {
            this.authService = (__runInitializers(this, _instanceExtraInitializers), authService);
            this.socialAuthService = socialAuthService;
        }
        AuthController_1.prototype.signUp = function (signUpDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.signUp(signUpDto)];
                });
            });
        };
        AuthController_1.prototype.signIn = function (req) {
            return this.authService.signIn(req.user);
        };
        AuthController_1.prototype.verifyEmail = function (verifyEmailDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.verifyEmail(verifyEmailDto.email, verifyEmailDto.code)];
                });
            });
        };
        AuthController_1.prototype.resendVerification = function (sendVerificationDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.resendVerificationCode(sendVerificationDto.email)];
                });
            });
        };
        AuthController_1.prototype.refreshToken = function (refreshTokenDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.refreshAccessToken(refreshTokenDto.refresh_token)];
                });
            });
        };
        AuthController_1.prototype.logout = function (logoutDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.logout(logoutDto.refresh_token)];
                });
            });
        };
        AuthController_1.prototype.updateOnlineStatus = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                var userId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = req.user.sub;
                            return [4 /*yield*/, this.authService.updateOnlineStatus(userId)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, {
                                    message: 'Online status updated successfully',
                                }];
                    }
                });
            });
        };
        AuthController_1.prototype.logoutAll = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.logoutAll(req.user.sub)];
                });
            });
        };
        AuthController_1.prototype.forgotPassword = function (forgotPasswordDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.forgotPassword(forgotPasswordDto.email)];
                });
            });
        };
        AuthController_1.prototype.verifyResetCode = function (verifyResetCodeDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.checkResetCode(verifyResetCodeDto.email, verifyResetCodeDto.code)];
                });
            });
        };
        AuthController_1.prototype.resetPassword = function (resetPasswordDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.resetPassword(resetPasswordDto.email, resetPasswordDto.code, resetPasswordDto.new_password)];
                });
            });
        };
        AuthController_1.prototype.getMe = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.getCurrentUser(req.user)];
                });
            });
        };
        AuthController_1.prototype.checkProfileCompleted = function (req) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.authService.checkProfileCompleted(req.user.sub)];
                });
            });
        };
        AuthController_1.prototype.updateProfile = function (req, updateProfileDto) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.authService.updateProfile(req.user.sub, updateProfileDto)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        AuthController_1.prototype.googleCallback = function (googleAuthDto) {
            return __awaiter(this, void 0, void 0, function () {
                var userInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.socialAuthService.verifyGoogleToken(googleAuthDto.idToken)];
                        case 1:
                            userInfo = _a.sent();
                            return [2 /*return*/, this.socialAuthService.handleSocialLogin(userInfo)];
                    }
                });
            });
        };
        // TODO: Facebook callback
        AuthController_1.prototype.facebookCallback = function (facebookAuthDto) {
            return __awaiter(this, void 0, void 0, function () {
                var userInfo;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.socialAuthService.verifyFacebookToken(facebookAuthDto.accessToken)];
                        case 1:
                            userInfo = _a.sent();
                            return [2 /*return*/, this.socialAuthService.handleSocialLogin(userInfo)];
                    }
                });
            });
        };
        return AuthController_1;
    }());
    __setFunctionName(_classThis, "AuthController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _signUp_decorators = [(0, common_1.Post)('signup'), (0, swagger_1.ApiOperation)({ summary: 'User sign up' }), (0, swagger_1.ApiResponse)({
                status: 201,
                description: 'User successfully registered',
                type: auth_response_dto_1.AuthResponseDto,
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Email already registered but not verified. Verification code resent.',
                type: auth_response_dto_1.AuthResponseDto,
            }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }), (0, swagger_1.ApiResponse)({
                status: 409,
                description: 'Email already exists and is verified',
            })];
        _signIn_decorators = [(0, common_1.UseGuards)(signin_rate_limit_guard_1.SignInRateLimitGuard, local_auth_guard_1.LocalAuthGuard, domain_role_guard_1.DomainRoleGuard), (0, signin_rate_limit_decorator_1.SignInRateLimit)({
                windowMs: 10 * 60 * 1000,
                maxAttempts: 10,
                message: 'Too many sign-in attempts from your network. Please try again after 10 minutes.',
            }), (0, common_1.Post)('signin'), (0, common_1.HttpCode)(200), (0, swagger_1.ApiOperation)({ summary: 'User sign in' }), (0, swagger_1.ApiBody)({ type: sign_in_dto_1.SignInDto }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'User successfully signed in',
                type: auth_response_dto_1.AuthResponseDto,
            }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials' })];
        _verifyEmail_decorators = [(0, common_1.Post)('verify'), (0, swagger_1.ApiOperation)({ summary: 'Verify email address' }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Email successfully verified',
                type: auth_response_dto_1.AuthResponseDto,
            }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid verification code' })];
        _resendVerification_decorators = [(0, common_1.Post)('resend-verification'), (0, common_1.UseGuards)(resend_code_rate_limit_guard_1.ResendCodeRateLimitGuard), (0, resend_code_rate_limit_decorator_1.ResendCodeRateLimit)({
                windowMs: 120 * 1000, // 120 seconds in milliseconds
                maxAttempts: 1,
                message: 'Verification email can only be resent once per two minutes. Please try again later.',
            }), (0, swagger_1.ApiOperation)({ summary: 'Resend email verification code' }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Verification code sent successfully',
                type: response_dto_1.SuccessResponseDto,
            }), (0, swagger_1.ApiResponse)({
                status: 400,
                description: 'Invalid email address or rate limit exceeded',
            })];
        _refreshToken_decorators = [(0, common_1.Post)('refresh'), (0, swagger_1.ApiOperation)({ summary: 'Refresh access token' }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Access token refreshed successfully',
                type: refresh_response_dto_1.RefreshResponseDto,
            }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid or expired refresh token' })];
        _logout_decorators = [(0, common_1.Post)('logout'), (0, swagger_1.ApiOperation)({ summary: 'Logout user' }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'User logged out successfully',
                type: response_dto_1.SuccessResponseDto,
            }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid refresh token' })];
        _updateOnlineStatus_decorators = [(0, use_jwt_auth_guard_decorator_1.UseJwtAuthGuard)(), (0, common_1.Post)('update-online-status'), (0, common_1.HttpCode)(200), (0, swagger_1.ApiOperation)({ summary: 'Update online status (polling endpoint)' }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Online status updated successfully',
                type: response_dto_1.SuccessResponseDto,
            }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' })];
        _logoutAll_decorators = [(0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard), (0, common_1.Post)('logout-all'), (0, swagger_1.ApiOperation)({ summary: 'Logout user from all devices' }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'User logged out from all devices successfully',
                type: response_dto_1.SuccessResponseDto,
            }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' })];
        _forgotPassword_decorators = [(0, common_1.Post)('forgot-password'), (0, swagger_1.ApiOperation)({ summary: 'Send password reset code to email' }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Password reset code sent successfully',
                type: response_dto_1.SuccessResponseDto,
            }), (0, swagger_1.ApiResponse)({
                status: 400,
                description: 'User not found or email not verified',
            })];
        _verifyResetCode_decorators = [(0, common_1.Post)('verify-reset-code'), (0, swagger_1.ApiOperation)({
                summary: 'Verify password reset code without resetting password',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Code is valid',
                type: response_dto_1.SuccessResponseDto,
            }), (0, swagger_1.ApiResponse)({
                status: 400,
                description: 'Invalid or expired verification code',
            })];
        _resetPassword_decorators = [(0, common_1.Post)('reset-password'), (0, swagger_1.ApiOperation)({ summary: 'Reset password using verification code' }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Password reset successfully',
                type: response_dto_1.SuccessResponseDto,
            }), (0, swagger_1.ApiResponse)({
                status: 400,
                description: 'Invalid verification code or user not found',
            })];
        _getMe_decorators = [(0, use_jwt_auth_guard_decorator_1.UseJwtAuthGuard)(), (0, common_1.Get)('me'), (0, swagger_1.ApiOperation)({ summary: 'Get current user information' }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Current user information retrieved successfully',
                type: response_dto_1.SuccessResponseDto,
            }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' })];
        _checkProfileCompleted_decorators = [(0, use_jwt_auth_guard_decorator_1.UseJwtAuthGuard)(), (0, common_1.Get)('check-profile-completed'), (0, swagger_1.ApiOperation)({
                summary: 'Check if user profile is completed',
                description: 'Check if user profile is completed (has phone_number, full_name, username)',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Profile completion status retrieved successfully',
                type: check_profile_completed_response_dto_1.CheckProfileCompletedResponseDto,
            }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' })];
        _updateProfile_decorators = [(0, use_jwt_auth_guard_decorator_1.UseJwtAuthGuard)(), (0, common_1.Post)('update-profile'), (0, common_1.HttpCode)(200), (0, swagger_1.ApiOperation)({
                summary: 'Update account information',
                description: 'Update account information after social login (Google/Facebook). Email cannot be changed.',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Account information updated successfully',
                type: response_dto_1.SuccessResponseDto,
            }), (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid data' }), (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }), (0, swagger_1.ApiResponse)({
                status: 403,
                description: 'Only social login users can update profile',
            }), (0, swagger_1.ApiResponse)({ status: 409, description: 'Username already exists' })];
        _googleCallback_decorators = [(0, common_1.Post)('google/callback'), (0, common_1.HttpCode)(200), (0, swagger_1.ApiOperation)({
                summary: 'Google OAuth callback',
                description: 'Social login for site users only. Admin users cannot use social login. ' +
                    'Uses Google ID Token (JWT) for secure authentication.',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Google authentication successful',
                type: social_auth_dto_1.SocialAuthResponse,
            }), (0, swagger_1.ApiResponse)({
                status: 400,
                description: 'Invalid Google ID token or user is not a site user',
            }), (0, swagger_1.ApiResponse)({
                status: 409,
                description: 'Email already exists with different provider',
            })];
        _facebookCallback_decorators = [(0, common_1.Post)('facebook/callback'), (0, common_1.HttpCode)(200), (0, swagger_1.ApiOperation)({
                summary: 'Facebook OAuth callback',
                description: 'Social login for site users only. Admin users cannot use social login.',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Facebook authentication successful',
                type: social_auth_dto_1.SocialAuthResponse,
            }), (0, swagger_1.ApiResponse)({
                status: 400,
                description: 'Invalid Facebook token or user is not a site user',
            }), (0, swagger_1.ApiResponse)({
                status: 409,
                description: 'Email already exists with different provider',
            })];
        __esDecorate(_classThis, null, _signUp_decorators, { kind: "method", name: "signUp", static: false, private: false, access: { has: function (obj) { return "signUp" in obj; }, get: function (obj) { return obj.signUp; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _signIn_decorators, { kind: "method", name: "signIn", static: false, private: false, access: { has: function (obj) { return "signIn" in obj; }, get: function (obj) { return obj.signIn; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyEmail_decorators, { kind: "method", name: "verifyEmail", static: false, private: false, access: { has: function (obj) { return "verifyEmail" in obj; }, get: function (obj) { return obj.verifyEmail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resendVerification_decorators, { kind: "method", name: "resendVerification", static: false, private: false, access: { has: function (obj) { return "resendVerification" in obj; }, get: function (obj) { return obj.resendVerification; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _refreshToken_decorators, { kind: "method", name: "refreshToken", static: false, private: false, access: { has: function (obj) { return "refreshToken" in obj; }, get: function (obj) { return obj.refreshToken; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _logout_decorators, { kind: "method", name: "logout", static: false, private: false, access: { has: function (obj) { return "logout" in obj; }, get: function (obj) { return obj.logout; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateOnlineStatus_decorators, { kind: "method", name: "updateOnlineStatus", static: false, private: false, access: { has: function (obj) { return "updateOnlineStatus" in obj; }, get: function (obj) { return obj.updateOnlineStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _logoutAll_decorators, { kind: "method", name: "logoutAll", static: false, private: false, access: { has: function (obj) { return "logoutAll" in obj; }, get: function (obj) { return obj.logoutAll; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _forgotPassword_decorators, { kind: "method", name: "forgotPassword", static: false, private: false, access: { has: function (obj) { return "forgotPassword" in obj; }, get: function (obj) { return obj.forgotPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _verifyResetCode_decorators, { kind: "method", name: "verifyResetCode", static: false, private: false, access: { has: function (obj) { return "verifyResetCode" in obj; }, get: function (obj) { return obj.verifyResetCode; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resetPassword_decorators, { kind: "method", name: "resetPassword", static: false, private: false, access: { has: function (obj) { return "resetPassword" in obj; }, get: function (obj) { return obj.resetPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getMe_decorators, { kind: "method", name: "getMe", static: false, private: false, access: { has: function (obj) { return "getMe" in obj; }, get: function (obj) { return obj.getMe; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _checkProfileCompleted_decorators, { kind: "method", name: "checkProfileCompleted", static: false, private: false, access: { has: function (obj) { return "checkProfileCompleted" in obj; }, get: function (obj) { return obj.checkProfileCompleted; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateProfile_decorators, { kind: "method", name: "updateProfile", static: false, private: false, access: { has: function (obj) { return "updateProfile" in obj; }, get: function (obj) { return obj.updateProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _googleCallback_decorators, { kind: "method", name: "googleCallback", static: false, private: false, access: { has: function (obj) { return "googleCallback" in obj; }, get: function (obj) { return obj.googleCallback; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _facebookCallback_decorators, { kind: "method", name: "facebookCallback", static: false, private: false, access: { has: function (obj) { return "facebookCallback" in obj; }, get: function (obj) { return obj.facebookCallback; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AuthController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AuthController = _classThis;
}();
exports.AuthController = AuthController;
