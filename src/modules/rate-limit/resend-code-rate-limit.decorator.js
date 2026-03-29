"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResendCodeRateLimit = exports.RESEND_CODE_RATE_LIMIT_KEY = void 0;
var common_1 = require("@nestjs/common");
exports.RESEND_CODE_RATE_LIMIT_KEY = 'resend_code_rate_limit';
var ResendCodeRateLimit = function (options) {
    return (0, common_1.SetMetadata)(exports.RESEND_CODE_RATE_LIMIT_KEY, options);
};
exports.ResendCodeRateLimit = ResendCodeRateLimit;
