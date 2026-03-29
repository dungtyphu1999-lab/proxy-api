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
exports.EmailService = void 0;
var common_1 = require("@nestjs/common");
var EmailService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var EmailService = _classThis = /** @class */ (function () {
        function EmailService_1(appConfigService, mailerService) {
            this.appConfigService = appConfigService;
            this.mailerService = mailerService;
            this.logger = new common_1.Logger(EmailService.name);
        }
        // Hàm gửi email chung
        EmailService_1.prototype.sendEmail = function (options) {
            return __awaiter(this, void 0, void 0, function () {
                var to, subject, text, html, template, context, attachments, replyTo, fromEmail, fromName, recipients, senderEmail, senderName, fromAddress, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            to = options.to, subject = options.subject, text = options.text, html = options.html, template = options.template, context = options.context, attachments = options.attachments, replyTo = options.replyTo, fromEmail = options.fromEmail, fromName = options.fromName;
                            recipients = Array.isArray(to) ? to.map(function (r) { return r.email; }) : to.email;
                            senderEmail = fromEmail || this.appConfigService.email.noReplyEmail;
                            senderName = fromName || this.appConfigService.email.noReplyFromName;
                            fromAddress = senderName
                                ? "\"".concat(senderName, "\" <").concat(senderEmail, ">")
                                : senderEmail;
                            // Gửi email
                            return [4 /*yield*/, this.mailerService.sendMail({
                                    to: recipients,
                                    from: fromAddress,
                                    replyTo: replyTo === null || replyTo === void 0 ? void 0 : replyTo.email,
                                    subject: subject,
                                    text: text,
                                    html: html,
                                    template: template,
                                    context: context,
                                    attachments: attachments,
                                })];
                        case 1:
                            // Gửi email
                            _a.sent();
                            // Ghi log
                            this.logger.log("Email sent successfully to ".concat(Array.isArray(recipients) ? recipients.join(', ') : recipients));
                            return [2 /*return*/, true];
                        case 2:
                            error_1 = _a.sent();
                            // Ghi log lỗi
                            this.logger.error('Failed to send email:', error_1);
                            return [2 /*return*/, false];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        // Hàm gửi email xác thực
        EmailService_1.prototype.sendVerificationCodeEmail = function (recipient, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.sendEmail({
                            to: recipient,
                            subject: 'Mã xác thực email - BACHHOAMMO',
                            template: 'verification-code', // Tên file trong folder templates
                            context: {
                                // Data truyền vào
                                verificationCode: data.verificationCode,
                            },
                            fromEmail: this.appConfigService.email.noReplyEmail,
                            fromName: this.appConfigService.email.noReplyFromName,
                        })];
                });
            });
        };
        // Hàm gửi email quên mật khẩu
        EmailService_1.prototype.sendPasswordResetCodeEmail = function (recipient, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.sendEmail({
                            to: recipient,
                            subject: 'Mã đặt lại mật khẩu - BACHHOAMMO',
                            template: 'password-reset-code',
                            context: {
                                resetCode: data.resetCode,
                            },
                            fromEmail: this.appConfigService.email.noReplyEmail,
                            fromName: this.appConfigService.email.noReplyFromName,
                        })];
                });
            });
        };
        // Hàm gửi email phản hồi liên hệ hỗ trợ
        EmailService_1.prototype.sendSupportContactReplyEmail = function (recipient, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.sendEmail({
                            to: recipient,
                            subject: 'Phản hồi yêu cầu hỗ trợ - BACHHOAMMO',
                            template: 'support-contact-reply',
                            context: {
                                fullName: data.fullName,
                                originalContent: data.originalContent,
                                replyContent: data.replyContent,
                                createdAt: data.createdAt,
                                repliedAt: data.repliedAt,
                            },
                            fromEmail: this.appConfigService.email.supportEmail,
                            fromName: this.appConfigService.email.supportFromName,
                        })];
                });
            });
        };
        // Hàm gửi email thông báo đặt lại mật khẩu thành công
        EmailService_1.prototype.sendPasswordResetEndUser = function (recipient, data) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.sendEmail({
                            to: recipient,
                            subject: '[BACHHOAMMO] Mật khẩu tài khoản của bạn đã được đặt lại',
                            template: 'reset-password',
                            context: {
                                fullName: data.fullName,
                                newPassword: data.newPassword,
                                year: new Date().getFullYear(),
                            },
                            fromEmail: this.appConfigService.email.noReplyEmail,
                            fromName: this.appConfigService.email.noReplyFromName,
                        })];
                });
            });
        };
        return EmailService_1;
    }());
    __setFunctionName(_classThis, "EmailService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        EmailService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return EmailService = _classThis;
}();
exports.EmailService = EmailService;
