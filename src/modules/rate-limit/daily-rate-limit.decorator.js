"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyRateLimit = exports.DAILY_RATE_LIMIT_KEY = void 0;
var common_1 = require("@nestjs/common");
exports.DAILY_RATE_LIMIT_KEY = 'daily_rate_limit';
var DailyRateLimit = function (options) {
    return (0, common_1.SetMetadata)(exports.DAILY_RATE_LIMIT_KEY, options);
};
exports.DailyRateLimit = DailyRateLimit;
