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
exports.VerificationService = void 0;
var common_1 = require("@nestjs/common");
var VerificationService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var VerificationService = _classThis = /** @class */ (function () {
        function VerificationService_1(emailService, cacheManager) {
            this.emailService = emailService;
            this.cacheManager = cacheManager;
            this.logger = new common_1.Logger(VerificationService.name);
        }
        VerificationService_1.prototype.generateVerificationCode = function () {
            return Math.floor(100000 + Math.random() * 900000).toString();
        };
        VerificationService_1.prototype.getRedisKey = function (email, type) {
            if (type === void 0) { type = 'verification'; }
            return "".concat(type, ":").concat(email);
        };
        VerificationService_1.prototype.getPasswordResetKey = function (email) {
            return this.getRedisKey(email, 'password-reset');
        };
        VerificationService_1.prototype.sendVerificationCode = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                var verificationCode, redisKey, recipient, success, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            verificationCode = this.generateVerificationCode();
                            redisKey = this.getRedisKey(email);
                            // Store code in cache with 3 minutes expiration (180 seconds)
                            return [4 /*yield*/, this.cacheManager.set(redisKey, verificationCode, 180 * 1000)];
                        case 1:
                            // Store code in cache with 3 minutes expiration (180 seconds)
                            _a.sent();
                            recipient = { email: email };
                            return [4 /*yield*/, this.emailService.sendVerificationCodeEmail(recipient, { verificationCode: verificationCode })];
                        case 2:
                            success = _a.sent();
                            if (!success) return [3 /*break*/, 3];
                            this.logger.log("Verification code sent to ".concat(email));
                            return [2 /*return*/, true];
                        case 3: 
                        // Clean up cache if email failed
                        return [4 /*yield*/, this.cacheManager.del(redisKey)];
                        case 4:
                            // Clean up cache if email failed
                            _a.sent();
                            return [2 /*return*/, false];
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            error_1 = _a.sent();
                            this.logger.error('Failed to send verification code:', error_1);
                            return [2 /*return*/, false];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        VerificationService_1.prototype.verifyCode = function (email, code) {
            return __awaiter(this, void 0, void 0, function () {
                var redisKey, storedCode, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            redisKey = this.getRedisKey(email);
                            return [4 /*yield*/, this.cacheManager.get(redisKey)];
                        case 1:
                            storedCode = _a.sent();
                            if (!storedCode) {
                                this.logger.warn("Verification code not found or expired for ".concat(email));
                                return [2 /*return*/, false];
                            }
                            if (!(storedCode === code)) return [3 /*break*/, 3];
                            // Remove code after successful verification
                            return [4 /*yield*/, this.cacheManager.del(redisKey)];
                        case 2:
                            // Remove code after successful verification
                            _a.sent();
                            this.logger.log("Email verification successful for ".concat(email));
                            return [2 /*return*/, true];
                        case 3:
                            this.logger.warn("Invalid verification code provided for ".concat(email));
                            return [2 /*return*/, false];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            error_2 = _a.sent();
                            this.logger.error('Failed to verify code:', error_2);
                            return [2 /*return*/, false];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        VerificationService_1.prototype.getCodeTTL = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                var redisKey, storedCode, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            redisKey = this.getRedisKey(email);
                            return [4 /*yield*/, this.cacheManager.get(redisKey)];
                        case 1:
                            storedCode = _a.sent();
                            return [2 /*return*/, storedCode ? 1 : -1]; // Cache manager doesn't expose TTL, return 1 if exists, -1 if not
                        case 2:
                            error_3 = _a.sent();
                            this.logger.error('Failed to get code TTL:', error_3);
                            return [2 /*return*/, -1];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        VerificationService_1.prototype.deleteCode = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                var redisKey, error_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            redisKey = this.getRedisKey(email);
                            return [4 /*yield*/, this.cacheManager.del(redisKey)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 2:
                            error_4 = _a.sent();
                            this.logger.error('Failed to delete verification code:', error_4);
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        VerificationService_1.prototype.sendPasswordResetCode = function (email) {
            return __awaiter(this, void 0, void 0, function () {
                var resetCode, redisKey, recipient, success, error_5;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 6, , 7]);
                            resetCode = this.generateVerificationCode();
                            redisKey = this.getPasswordResetKey(email);
                            // Store code in cache with 3 minutes expiration (180 seconds)
                            return [4 /*yield*/, this.cacheManager.set(redisKey, resetCode, 180 * 1000)];
                        case 1:
                            // Store code in cache with 3 minutes expiration (180 seconds)
                            _a.sent();
                            recipient = { email: email };
                            return [4 /*yield*/, this.emailService.sendPasswordResetCodeEmail(recipient, { resetCode: resetCode })];
                        case 2:
                            success = _a.sent();
                            if (!success) return [3 /*break*/, 3];
                            this.logger.log("Password reset code sent to ".concat(email));
                            return [2 /*return*/, true];
                        case 3: 
                        // Clean up cache if email failed
                        return [4 /*yield*/, this.cacheManager.del(redisKey)];
                        case 4:
                            // Clean up cache if email failed
                            _a.sent();
                            return [2 /*return*/, false];
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            error_5 = _a.sent();
                            this.logger.error('Failed to send password reset code:', error_5);
                            return [2 /*return*/, false];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        VerificationService_1.prototype.checkPasswordResetCode = function (email, code) {
            return __awaiter(this, void 0, void 0, function () {
                var redisKey, storedCode, error_6;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            redisKey = this.getPasswordResetKey(email);
                            return [4 /*yield*/, this.cacheManager.get(redisKey)];
                        case 1:
                            storedCode = _a.sent();
                            if (!storedCode) {
                                this.logger.warn("Password reset code not found or expired for ".concat(email));
                                return [2 /*return*/, false];
                            }
                            if (storedCode === code) {
                                this.logger.log("Password reset code check successful for ".concat(email));
                                return [2 /*return*/, true];
                            }
                            else {
                                this.logger.warn("Invalid password reset code provided for ".concat(email));
                                return [2 /*return*/, false];
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_6 = _a.sent();
                            this.logger.error('Failed to check password reset code:', error_6);
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        VerificationService_1.prototype.verifyPasswordResetCode = function (email, code) {
            return __awaiter(this, void 0, void 0, function () {
                var redisKey, storedCode, error_7;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 5, , 6]);
                            redisKey = this.getPasswordResetKey(email);
                            return [4 /*yield*/, this.cacheManager.get(redisKey)];
                        case 1:
                            storedCode = _a.sent();
                            if (!storedCode) {
                                this.logger.warn("Password reset code not found or expired for ".concat(email));
                                return [2 /*return*/, false];
                            }
                            if (!(storedCode === code)) return [3 /*break*/, 3];
                            // Remove code after successful verification
                            return [4 /*yield*/, this.cacheManager.del(redisKey)];
                        case 2:
                            // Remove code after successful verification
                            _a.sent();
                            this.logger.log("Password reset code verification successful for ".concat(email));
                            return [2 /*return*/, true];
                        case 3:
                            this.logger.warn("Invalid password reset code provided for ".concat(email));
                            return [2 /*return*/, false];
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            error_7 = _a.sent();
                            this.logger.error('Failed to verify password reset code:', error_7);
                            return [2 /*return*/, false];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        };
        VerificationService_1.prototype.sendPassword = function (fullName, email, newPassword) {
            return __awaiter(this, void 0, void 0, function () {
                var recipient, success, error_8;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            recipient = { email: email };
                            return [4 /*yield*/, this.emailService.sendPasswordResetEndUser(recipient, { fullName: fullName, newPassword: newPassword })];
                        case 1:
                            success = _a.sent();
                            if (success) {
                                this.logger.log("Password reset email sent to ".concat(email));
                                return [2 /*return*/, true];
                            }
                            else {
                                return [2 /*return*/, false];
                            }
                            return [3 /*break*/, 3];
                        case 2:
                            error_8 = _a.sent();
                            this.logger.error('Failed to send password reset email:', error_8);
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        return VerificationService_1;
    }());
    __setFunctionName(_classThis, "VerificationService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        VerificationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return VerificationService = _classThis;
}();
exports.VerificationService = VerificationService;
