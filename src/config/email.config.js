"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('email', function () {
    var _a;
    return ({
        // Config SMTP Gmail
        host: process.env.MAIL_HOST || 'smtp.gmail.com',
        port: parseInt((_a = process.env.MAIL_PORT) !== null && _a !== void 0 ? _a : '587', 10),
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD, // App Password 16 ký tự
        secure: process.env.MAIL_SECURE === 'true', // false cho port 587
        encryption: process.env.MAIL_ENCRYPTION || 'tls', // 'tls' hoặc 'ssl'
        // Config From Email
        fromEmail: process.env.MAIL_NO_REPLY_FROM_EMAIL || 'support@bachhoammo.net',
        fromName: process.env.MAIL_NO_REPLY_FROM_NAME || 'BACHHOAMMO',
    });
});
