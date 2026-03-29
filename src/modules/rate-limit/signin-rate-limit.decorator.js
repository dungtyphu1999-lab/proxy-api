"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInRateLimit = exports.SIGNIN_RATE_LIMIT_KEY = void 0;
var common_1 = require("@nestjs/common");
exports.SIGNIN_RATE_LIMIT_KEY = 'signin_rate_limit';
var SignInRateLimit = function (options) {
    return (0, common_1.SetMetadata)(exports.SIGNIN_RATE_LIMIT_KEY, options);
};
exports.SignInRateLimit = SignInRateLimit;
