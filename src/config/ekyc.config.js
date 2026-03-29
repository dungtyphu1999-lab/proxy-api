"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('ekyc', function () { return ({
    apiBankList: process.env.EKYC_API_BANK_LIST || '',
    apiBankLookup: process.env.EKYC_API_BANK_LOOKUP || '',
    apiKey: process.env.EKYC_API_KEY || '',
    apiSecret: process.env.EKYC_API_SECRET || '',
}); });
