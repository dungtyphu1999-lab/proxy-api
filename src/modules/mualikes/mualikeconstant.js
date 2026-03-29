"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROXY = exports.TYPE_TRANSACTION = exports.TOKEN_MUALIKE = void 0;
var dotenv = require("dotenv");
var path_1 = require("path");
// Primary provider token used by mualikes.net API endpoints like:
// - /api/listCategory
// - /api/listService
// - /api/server
// - /api/createOrder
//
// Never fallback to a hardcoded token.
dotenv.config({ path: (0, path_1.resolve)(process.cwd(), '.env') });
var configuredToken = (_a = process.env.MUALIKES_TOKEN) === null || _a === void 0 ? void 0 : _a.trim();
if (!configuredToken) {
    throw new Error('Missing required env: MUALIKES_TOKEN');
}
exports.TOKEN_MUALIKE = configuredToken;
// Legacy types used by existing revenue/history queries.
exports.TYPE_TRANSACTION = 'SERVICE';
exports.PROXY = 'PROXY';
