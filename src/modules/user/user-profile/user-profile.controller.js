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
exports.UserProfileController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var user_profile_response_dto_1 = require("./dto/user-profile-response.dto");
var response_dto_1 = require("@/shared/dto/response.dto");
var use_jwt_auth_guard_decorator_1 = require("../auth/decorators/use-jwt-auth-guard.decorator");
var file_upload_decorators_1 = require("@/modules/file-upload/file-upload.decorators");
var file_upload_dtos_1 = require("@/modules/file-upload/file-upload.dtos");
var change_password_response_dto_1 = require("@/modules/user/user-profile/dto/change-password-response.dto");
/**
 * User Profile Controller
 * Handles user profile management for authenticated users
 */
var UserProfileController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('[User] Profile'), (0, common_1.Controller)(''), (0, use_jwt_auth_guard_decorator_1.UseJwtAuthGuard)(), (0, swagger_1.ApiBearerAuth)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _uploadAvatar_decorators;
    var _changePassword_decorators;
    var _updateProfile_decorators;
    var _sendEmail_decorators;
    var _updateEmail_decorators;
    var UserProfileController = _classThis = /** @class */ (function () {
        function UserProfileController_1(userProfileService) {
            this.userProfileService = (__runInitializers(this, _instanceExtraInitializers), userProfileService);
        }
        /**
         * POST /user/profile/upload-avatar
         * Upload avatar for current user and update profile
         */
        UserProfileController_1.prototype.uploadAvatar = function (req, file) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!file) {
                                throw new common_1.BadRequestException('No avatar file provided');
                            }
                            return [4 /*yield*/, this.userProfileService.uploadAvatar(req.user.sub, file)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * PATCH /user/profile/change-password
         * Change user password
         */
        UserProfileController_1.prototype.changePassword = function (req, changePasswordDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userProfileService.changePassword(req.user.sub, changePasswordDto)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * PATCH /user/profile
         * Update user profile information
         */
        UserProfileController_1.prototype.updateProfile = function (req, updateProfileDto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userProfileService.updateProfile(req.user.sub, updateProfileDto)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        /**
         * PATCH /user/profile/send-email
         * Update user email
         */
        UserProfileController_1.prototype.sendEmail = function (req, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Send verification code
                        return [4 /*yield*/, this.userProfileService.sendVerificationCode(dto.email, req.user.sub)];
                        case 1:
                            // Send verification code
                            _a.sent();
                            return [2 /*return*/, {
                                    message: 'User registered successfully. Please check your email for verification code.',
                                }];
                    }
                });
            });
        };
        /**
         * PATCH /user/profile/update-email
         * Update user email
         */
        UserProfileController_1.prototype.updateEmail = function (req, dto) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userProfileService.updateEmail(dto, req.user.sub)];
                        case 1: 
                        // Send verification code
                        return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return UserProfileController_1;
    }());
    __setFunctionName(_classThis, "UserProfileController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _uploadAvatar_decorators = [(0, common_1.Post)('upload-avatar'), (0, file_upload_decorators_1.UseImageUpload)('file'), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiOperation)({
                summary: 'Upload user avatar',
                description: 'Upload an avatar image for the current user. The avatar URL will be automatically updated in the user profile after successful upload.',
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.CREATED,
                description: 'Avatar uploaded and profile updated successfully',
                type: user_profile_response_dto_1.UserProfileDto,
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.BAD_REQUEST,
                description: 'Invalid file or request data',
                type: response_dto_1.ErrorResponseDto,
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.UNAUTHORIZED,
                description: 'Unauthorized - valid JWT token required',
                type: response_dto_1.ErrorResponseDto,
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.NOT_FOUND,
                description: 'User profile not found',
                type: response_dto_1.ErrorResponseDto,
            }), (0, swagger_1.ApiBody)({ type: file_upload_dtos_1.UploadImageInputDto })];
        _changePassword_decorators = [(0, common_1.Patch)('change-password'), (0, swagger_1.ApiOperation)({
                summary: 'Change user password',
                description: "Change the authenticated user's password by providing current password and new password",
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Password changed successfully - user must log in again',
                type: change_password_response_dto_1.ChangePasswordResponseDto,
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.BAD_REQUEST,
                description: 'Invalid input data - current password incorrect or passwords do not match',
                type: response_dto_1.ErrorResponseDto,
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.CONFLICT,
                description: 'New password must be different from current password',
                type: response_dto_1.ErrorResponseDto,
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.UNAUTHORIZED,
                description: 'Unauthorized - valid JWT token required',
                type: response_dto_1.ErrorResponseDto,
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.NOT_FOUND,
                description: 'User not found',
                type: response_dto_1.ErrorResponseDto,
            })];
        _updateProfile_decorators = [(0, common_1.Post)('update-profile'), (0, swagger_1.ApiOperation)({
                summary: 'Update user profile',
                description: 'Update profile information of the authenticated user',
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Profile updated successfully',
                type: user_profile_response_dto_1.UserProfileDto,
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.BAD_REQUEST,
                description: 'Invalid input data',
                type: response_dto_1.ErrorResponseDto,
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.CONFLICT,
                description: 'Email or username already exists',
                type: response_dto_1.ErrorResponseDto,
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.UNAUTHORIZED,
                description: 'Unauthorized - valid JWT token required',
                type: response_dto_1.ErrorResponseDto,
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.NOT_FOUND,
                description: 'User not found',
                type: response_dto_1.ErrorResponseDto,
            })];
        _sendEmail_decorators = [(0, common_1.Post)('send-email'), (0, swagger_1.ApiOperation)({
                summary: 'Update user email',
                description: "Update the authenticated user's email",
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Email updated successfully',
                type: user_profile_response_dto_1.UserProfileDto,
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.BAD_REQUEST,
                description: 'Invalid email format',
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.CONFLICT,
                description: 'Email already exists',
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.UNAUTHORIZED,
                description: 'Unauthorized',
            })];
        _updateEmail_decorators = [(0, common_1.Post)('update-email'), (0, swagger_1.ApiOperation)({
                summary: 'Update user email',
                description: "Update the authenticated user's email",
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Email updated successfully',
                type: user_profile_response_dto_1.UserProfileDto,
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.BAD_REQUEST,
                description: 'Invalid email format',
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.CONFLICT,
                description: 'Email already exists',
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.UNAUTHORIZED,
                description: 'Unauthorized',
            })];
        __esDecorate(_classThis, null, _uploadAvatar_decorators, { kind: "method", name: "uploadAvatar", static: false, private: false, access: { has: function (obj) { return "uploadAvatar" in obj; }, get: function (obj) { return obj.uploadAvatar; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _changePassword_decorators, { kind: "method", name: "changePassword", static: false, private: false, access: { has: function (obj) { return "changePassword" in obj; }, get: function (obj) { return obj.changePassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateProfile_decorators, { kind: "method", name: "updateProfile", static: false, private: false, access: { has: function (obj) { return "updateProfile" in obj; }, get: function (obj) { return obj.updateProfile; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _sendEmail_decorators, { kind: "method", name: "sendEmail", static: false, private: false, access: { has: function (obj) { return "sendEmail" in obj; }, get: function (obj) { return obj.sendEmail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateEmail_decorators, { kind: "method", name: "updateEmail", static: false, private: false, access: { has: function (obj) { return "updateEmail" in obj; }, get: function (obj) { return obj.updateEmail; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserProfileController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserProfileController = _classThis;
}();
exports.UserProfileController = UserProfileController;
