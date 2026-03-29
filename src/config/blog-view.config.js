"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('blogView', function () { return ({
    uniqueMinutes: Number(process.env.BLOG_VIEW_UNIQUE_MINUTES) || 5,
}); });
