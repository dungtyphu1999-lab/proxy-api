"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('pay2s', function () { return ({
    qrLink: process.env.PAY2s_QR_LINK,
    bankCode: process.env.PAY2s_BANK_CODE,
    bankNumber: process.env.PAY2s_BANK_NUMBER,
    bankName: process.env.PAY2s_BANK_NAME,
    webhookSecretKey: process.env.PAY2S_WEBHOOK_SECRET_KEY,
}); });
