"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('logger', function () { return ({
    verbose: process.env.LOGGER_VERBOSE === 'true',
}); });
