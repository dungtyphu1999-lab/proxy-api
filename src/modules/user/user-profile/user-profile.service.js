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
exports.UserProfileService = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var common_2 = require("@nestjs/common");
var error_codes_enum_1 = require("@/shared/constants/error-codes.enum");
var UserProfileService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var UserProfileService = _classThis = /** @class */ (function () {
        function UserProfileService_1(userProfileRepository, fileUploadService, appConfig, userService, authTokenService, emailService) {
            this.userProfileRepository = userProfileRepository;
            this.fileUploadService = fileUploadService;
            this.appConfig = appConfig;
            this.userService = userService;
            this.authTokenService = authTokenService;
            this.emailService = emailService;
        }
        UserProfileService_1.prototype.createProfile = function (userId, data, trx) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.userProfileRepository.createProfile(userId, data, trx)];
                });
            });
        };
        UserProfileService_1.prototype.getProfile = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var profile;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userProfileRepository.findProfile(userId)];
                        case 1:
                            profile = _a.sent();
                            if (!profile) {
                                throw new common_1.NotFoundException('User profile not found');
                            }
                            return [2 /*return*/, profile];
                    }
                });
            });
        };
        UserProfileService_1.prototype.updateProfile = function (userId, data) {
            return __awaiter(this, void 0, void 0, function () {
                var existingProfile, existingUsername;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.userProfileRepository.findProfile(userId)];
                        case 1:
                            existingProfile = _b.sent();
                            if (!existingProfile) {
                                throw new common_1.NotFoundException('User profile not found');
                            }
                            // Nếu đã update rồi (true) thì chặn luôn
                            if (existingProfile.is_profile_updated) {
                                throw new common_1.ForbiddenException('Profile has already been updated once and cannot be changed again.');
                            }
                            return [4 /*yield*/, this.userProfileRepository.findByUsernameExit((_a = data.username) !== null && _a !== void 0 ? _a : '', userId)];
                        case 2:
                            existingUsername = _b.sent();
                            if (existingUsername) {
                                throw new common_2.ConflictException('Username đã tồn tại');
                            }
                            return [2 /*return*/, this.userProfileRepository.updateProfile2(userId, data)];
                    }
                });
            });
        };
        UserProfileService_1.prototype.deleteProfile = function (userId) {
            return __awaiter(this, void 0, void 0, function () {
                var existingProfile;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userProfileRepository.findProfile(userId)];
                        case 1:
                            existingProfile = _a.sent();
                            if (!existingProfile) {
                                throw new common_1.NotFoundException('User profile not found');
                            }
                            return [4 /*yield*/, this.userProfileRepository.deleteProfile(userId)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, { message: 'User profile deleted successfully' }];
                    }
                });
            });
        };
        /**
         * Upload avatar and update user profile.
         * Avatar can be updated anytime (not blocked by is_profile_updated).
         * @param userId - User ID from JWT token
         * @param file - Avatar image file
         * @returns Updated user profile with new avatar URL
         */
        UserProfileService_1.prototype.uploadAvatar = function (userId, file) {
            return __awaiter(this, void 0, void 0, function () {
                var existingProfile, uploadResult, updateData, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.userProfileRepository.findProfile(userId)];
                        case 1:
                            existingProfile = _a.sent();
                            if (!existingProfile) {
                                throw new common_1.NotFoundException('User profile not found');
                            }
                            return [4 /*yield*/, this.fileUploadService.uploadImage(file, 'avatars')];
                        case 2:
                            uploadResult = _a.sent();
                            updateData = {
                                avatar_url: "".concat(this.appConfig.app.publicUrl, "/").concat(uploadResult.url.replace(/\\/g, '/')),
                            };
                            return [4 /*yield*/, this.userProfileRepository.updateProfile(userId, updateData)];
                        case 3:
                            updated = _a.sent();
                            return [2 /*return*/, updated];
                    }
                });
            });
        };
        UserProfileService_1.prototype.changePassword = function (userId, changePasswordDto) {
            return __awaiter(this, void 0, void 0, function () {
                var current_password, new_password, confirm_password, user, isCurrentPasswordValid, isSamePassword, saltRounds, newPasswordHash;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            current_password = changePasswordDto.current_password, new_password = changePasswordDto.new_password, confirm_password = changePasswordDto.confirm_password;
                            // Validate password confirmation
                            if (new_password !== confirm_password) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_PASSWORD_CONFIRM_MISMATCH);
                            }
                            return [4 /*yield*/, this.userService.findById(userId)];
                        case 1:
                            user = _a.sent();
                            if (!user) {
                                throw new common_1.NotFoundException(error_codes_enum_1.ErrorCode.AUTH_USER_NOT_FOUND);
                            }
                            return [4 /*yield*/, bcrypt.compare(current_password, user.password_hash)];
                        case 2:
                            isCurrentPasswordValid = _a.sent();
                            if (!isCurrentPasswordValid) {
                                throw new common_1.BadRequestException(error_codes_enum_1.ErrorCode.AUTH_PASSWORD_INVALID_CURRENT);
                            }
                            return [4 /*yield*/, bcrypt.compare(new_password, user.password_hash)];
                        case 3:
                            isSamePassword = _a.sent();
                            if (isSamePassword) {
                                throw new common_2.ConflictException(error_codes_enum_1.ErrorCode.AUTH_PASSWORD_REUSED);
                            }
                            saltRounds = 10;
                            return [4 /*yield*/, bcrypt.hash(new_password, saltRounds)];
                        case 4:
                            newPasswordHash = _a.sent();
                            // Update password
                            return [4 /*yield*/, this.userService.updateUser(userId, {
                                    password_hash: newPasswordHash,
                                })];
                        case 5:
                            // Update password
                            _a.sent();
                            return [4 /*yield*/, this.authTokenService.revokeAllUserTokens(userId)];
                        case 6:
                            _a.sent();
                            return [2 /*return*/, null];
                    }
                });
            });
        };
        UserProfileService_1.prototype.updateEmail = function (dto, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var isVerified;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.verifyCode(userId, dto.code)];
                        case 1:
                            isVerified = _a.sent();
                            if (!isVerified) {
                                throw new common_1.BadRequestException('Invalid verification code');
                            }
                            return [4 /*yield*/, this.userService.updateUser(userId, { email: dto.email })];
                        case 2: 
                        // Update the user's email
                        return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        UserProfileService_1.prototype.generateVerificationCode = function () {
            return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
        };
        /* ================= SEND CODE ================= */
        UserProfileService_1.prototype.sendVerificationCode = function (email, userId) {
            return __awaiter(this, void 0, void 0, function () {
                var verificationCode, record, expiredAt, success, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            verificationCode = this.generateVerificationCode();
                            return [4 /*yield*/, this.userProfileRepository.findUserId(userId)];
                        case 1:
                            record = _a.sent();
                            if (!record) {
                                throw new common_1.NotFoundException('User not found');
                            }
                            expiredAt = new Date(Date.now() + 180 * 1000);
                            return [4 /*yield*/, this.userProfileRepository.saveCode(userId, verificationCode, expiredAt)];
                        case 2:
                            _a.sent();
                            return [4 /*yield*/, this.emailService.sendVerificationCodeEmail({ email: record.email }, { verificationCode: verificationCode })];
                        case 3:
                            success = _a.sent();
                            if (success) {
                                return [2 /*return*/, true];
                            }
                            throw new common_1.NotFoundException("Send email fail");
                        case 4:
                            error_1 = _a.sent();
                            console.log('sendVerificationCode error: ' + email, error_1);
                            return [2 /*return*/, false];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        /* ================= VERIFY CODE ================= */
        UserProfileService_1.prototype.verifyCode = function (userId, code) {
            return __awaiter(this, void 0, void 0, function () {
                var record, expiredAt, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.userProfileRepository.findUserId(userId)];
                        case 1:
                            record = _b.sent();
                            if (!record) {
                                return [2 /*return*/, false];
                            }
                            expiredAt = record.verification_code_expired_at;
                            if (expiredAt == null || new Date(expiredAt) < new Date()) {
                                throw new common_1.NotFoundException("Verification code expired for");
                            }
                            if (record.verification_code !== code) {
                                throw new common_1.NotFoundException("Invalid verification code for");
                            }
                            // Thành công → xoá code
                            return [2 /*return*/, true];
                        case 2:
                            _a = _b.sent();
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return UserProfileService_1;
    }());
    __setFunctionName(_classThis, "UserProfileService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UserProfileService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UserProfileService = _classThis;
}();
exports.UserProfileService = UserProfileService;
