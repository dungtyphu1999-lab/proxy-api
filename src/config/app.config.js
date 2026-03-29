"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('app', function () { return ({
    port: parseInt(process.env.APP_PORT || '3001', 10),
    publicUrl: process.env.PUBLIC_URL || 'http://localhost:8081',
    // Normalize to avoid subtle mismatches (whitespace, trailing slash, empty items).
    corsOrigins: (process.env.CORS_ORIGINS || '')
        .split(',')
        .map(function (s) { return s.trim(); })
        .filter(Boolean)
        .map(function (s) { return s.replace(/\/$/, ''); }),
}); });
