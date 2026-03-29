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
function seed(knex) {
    return __awaiter(this, void 0, void 0, function () {
        var adminUserId, adminRoleId, adminEmail, adminUsername, adminPassword, existingById, existingByEmail, hashedPassword, existingProfile, existingRoleMap;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    adminUserId = '00000000-0000-0000-0000-000000000001';
                    adminRoleId = '00000000-0000-0000-0000-000000000001';
                    adminEmail = String(process.env.ADMIN_EMAIL || '').trim();
                    adminUsername = String(process.env.ADMIN_USERNAME || '').trim();
                    adminPassword = String(process.env.ADMIN_PASSWORD || '').trim();
                    if (!adminEmail || !adminUsername || !adminPassword) {
                        throw new Error('Missing admin seed envs. Please set ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD.');
                    }
                    return [4 /*yield*/, knex('users').where('id', adminUserId).first()];
                case 1:
                    existingById = _a.sent();
                    return [4 /*yield*/, knex('users')
                            .where('email', adminEmail)
                            .first()];
                case 2:
                    existingByEmail = _a.sent();
                    if (!existingById && existingByEmail) {
                        console.log('Admin email already exists but admin id is not the default seed id.');
                        console.log("Existing admin email: ".concat(adminEmail));
                        console.log('Skip creating default admin user to avoid email conflict.');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, bcrypt.hash(adminPassword, 10)];
                case 3:
                    hashedPassword = _a.sent();
                    if (!!existingById) return [3 /*break*/, 7];
                    // Insert admin user
                    return [4 /*yield*/, knex('users').insert({
                            id: adminUserId,
                            email: adminEmail,
                            username: adminUsername,
                            password_hash: hashedPassword,
                            is_verified: true,
                            created_at: new Date(),
                            updated_at: new Date(),
                        })];
                case 4:
                    // Insert admin user
                    _a.sent();
                    // Insert admin user profile
                    return [4 /*yield*/, knex('user_profiles').insert({
                            user_id: adminUserId,
                            full_name: 'Admin User',
                        })];
                case 5:
                    // Insert admin user profile
                    _a.sent();
                    // Assign admin role to user
                    return [4 /*yield*/, knex('user_role_map').insert({
                            user_id: adminUserId,
                            role_id: adminRoleId,
                            assigned_at: new Date(),
                        })];
                case 6:
                    // Assign admin role to user
                    _a.sent();
                    console.log('Admin user created successfully');
                    console.log("Email: ".concat(adminEmail));
                    return [3 /*break*/, 15];
                case 7: 
                // Keep it idempotent: ensure credentials match desired config.
                return [4 /*yield*/, knex('users')
                        .where('id', adminUserId)
                        .update({
                        email: adminEmail,
                        username: adminUsername,
                        password_hash: hashedPassword,
                        updated_at: new Date(),
                    })];
                case 8:
                    // Keep it idempotent: ensure credentials match desired config.
                    _a.sent();
                    return [4 /*yield*/, knex('user_profiles')
                            .where('user_id', adminUserId)
                            .first()];
                case 9:
                    existingProfile = _a.sent();
                    if (!!existingProfile) return [3 /*break*/, 11];
                    return [4 /*yield*/, knex('user_profiles').insert({
                            user_id: adminUserId,
                            full_name: 'Admin User',
                        })];
                case 10:
                    _a.sent();
                    _a.label = 11;
                case 11: return [4 /*yield*/, knex('user_role_map')
                        .where('user_id', adminUserId)
                        .where('role_id', adminRoleId)
                        .first()];
                case 12:
                    existingRoleMap = _a.sent();
                    if (!!existingRoleMap) return [3 /*break*/, 14];
                    return [4 /*yield*/, knex('user_role_map').insert({
                            user_id: adminUserId,
                            role_id: adminRoleId,
                            assigned_at: new Date(),
                        })];
                case 13:
                    _a.sent();
                    _a.label = 14;
                case 14:
                    console.log('Admin user updated successfully');
                    console.log("Email: ".concat(adminEmail));
                    _a.label = 15;
                case 15: return [2 /*return*/];
            }
        });
    });
}
