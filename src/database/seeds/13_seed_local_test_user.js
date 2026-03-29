"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
var bcrypt = require("bcrypt");
var crypto_1 = require("crypto");
/**
 * Local/dev helper seed: upsert a test user for QA.
 *
 * Env:
 * - LOCAL_TEST_USER_EMAIL (required)
 * - LOCAL_TEST_USER_PASSWORD (required)
 * - LOCAL_TEST_USER_USERNAME (optional)
 * - LOCAL_TEST_USER_FULL_NAME (optional)
 */
function seed(knex) {
    return __awaiter(this, void 0, void 0, function () {
        var env, email, password, username, fullName, userRole, passwordHash, now, existing, userId, profileExists, roleMapExists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    env = process.env.APP_ENV || process.env.NODE_ENV || 'development';
                    if (env === 'production')
                        return [2 /*return*/];
                    email = String(process.env.LOCAL_TEST_USER_EMAIL || '').trim();
                    password = String(process.env.LOCAL_TEST_USER_PASSWORD || '').trim();
                    username = String(process.env.LOCAL_TEST_USER_USERNAME || 'user_local_test').trim();
                    fullName = String(process.env.LOCAL_TEST_USER_FULL_NAME || 'Local Test User').trim();
                    if (!email || !password) {
                        console.log('Local test user seed skipped: missing LOCAL_TEST_USER_EMAIL or LOCAL_TEST_USER_PASSWORD');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, knex('roles')
                            .select('id')
                            .where('name', 'user')
                            .first()];
                case 1:
                    userRole = _a.sent();
                    if (!(userRole === null || userRole === void 0 ? void 0 : userRole.id)) {
                        console.log('Local test user seed skipped: role "user" not found');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, bcrypt.hash(password, 10)];
                case 2:
                    passwordHash = _a.sent();
                    now = new Date();
                    return [4 /*yield*/, knex('users')
                            .select('id')
                            .where('email', email)
                            .first()];
                case 3:
                    existing = _a.sent();
                    userId = existing === null || existing === void 0 ? void 0 : existing.id;
                    if (!!userId) return [3 /*break*/, 5];
                    userId = (0, crypto_1.randomUUID)();
                    return [4 /*yield*/, knex('users').insert({
                            id: userId,
                            email: email,
                            username: username,
                            password_hash: passwordHash,
                            is_verified: true,
                            is_locked: false,
                            is_online: false,
                            has_received_welcome_message: true,
                            created_at: now,
                            updated_at: now,
                        })];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, knex('users').where('id', userId).update({
                        email: email,
                        username: username,
                        password_hash: passwordHash,
                        is_verified: true,
                        is_locked: false,
                        updated_at: now,
                    })];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [4 /*yield*/, knex('user_profiles')
                        .where('user_id', userId)
                        .first()];
                case 8:
                    profileExists = _a.sent();
                    if (!!profileExists) return [3 /*break*/, 10];
                    return [4 /*yield*/, knex('user_profiles').insert({
                            user_id: userId,
                            full_name: fullName,
                            username: username,
                            is_profile_updated: true,
                        })];
                case 9:
                    _a.sent();
                    _a.label = 10;
                case 10: return [4 /*yield*/, knex('user_role_map')
                        .where('user_id', userId)
                        .where('role_id', userRole.id)
                        .first()];
                case 11:
                    roleMapExists = _a.sent();
                    if (!!roleMapExists) return [3 /*break*/, 13];
                    return [4 /*yield*/, knex('user_role_map').insert({
                            id: (0, crypto_1.randomUUID)(),
                            user_id: userId,
                            role_id: userRole.id,
                            assigned_at: now,
                        })];
                case 12:
                    _a.sent();
                    _a.label = 13;
                case 13:
                    console.log("Local test user upserted: ".concat(email));
                    return [2 /*return*/];
            }
        });
    });
}
