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
var uuid_1 = require("uuid");
function seed(knex) {
    return __awaiter(this, void 0, void 0, function () {
        var now, categoryData, validSlugs, _i, categoryData_1, data, existingCategory, categoryId, existingCommission, validChildSlugs, _a, _b, childData, existingChild, childId;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    now = new Date();
                    categoryData = [
                        {
                            name: 'Tài khoản',
                            slug: 'tai-khoan',
                            commission: 10.0,
                            icon_url: '/icons/account.svg',
                            order: 1,
                            is_coming_soon: false,
                            children: [
                                { name: 'Tài khoản FB', slug: 'tai-khoan-fb', order: 1 },
                                { name: 'BM', slug: 'bm', order: 2 },
                                { name: 'Zalo', slug: 'zalo', order: 3 },
                                { name: 'Twitter', slug: 'twitter', order: 4 },
                                { name: 'Telegram', slug: 'telegram', order: 5 },
                                { name: 'Instagram', slug: 'instagram', order: 6 },
                                { name: 'Shopee', slug: 'shopee', order: 7 },
                                { name: 'Discord', slug: 'discord', order: 8 },
                                { name: 'TikTok', slug: 'tiktok', order: 9 },
                                { name: 'Key Diệt Virus', slug: 'key-diet-virus', order: 10 },
                                { name: 'Capcut', slug: 'capcut', order: 11 },
                                { name: 'Canva', slug: 'canva', order: 12 },
                                { name: 'Key Window', slug: 'key-window', order: 13 },
                                { name: 'Tài khoản Khác', slug: 'tai-khoan-khac', order: 14 },
                            ],
                        },
                        {
                            name: 'Email',
                            slug: 'email',
                            commission: 10.0,
                            icon_url: '/icons/email.svg',
                            order: 2,
                            is_coming_soon: false,
                            children: [
                                { name: 'Gmail', slug: 'gmail', order: 1 },
                                { name: 'HotMail', slug: 'hotmail', order: 2 },
                                { name: 'OutlookMail', slug: 'outlookmail', order: 3 },
                                { name: 'RuMail', slug: 'rumail', order: 4 },
                                { name: 'DomainMail', slug: 'domainmail', order: 5 },
                                { name: 'YahooMail', slug: 'yahoomail', order: 6 },
                                { name: 'ProtonMail', slug: 'protonmail', order: 7 },
                                { name: 'Loại Mail Khác', slug: 'loai-mail-khac', order: 8 },
                            ],
                        },
                        {
                            name: 'Proxy',
                            slug: 'proxy',
                            commission: 12.0,
                            icon_url: '/icons/proxy.svg',
                            order: 3,
                            is_coming_soon: false,
                        },
                        {
                            name: 'Tools',
                            slug: 'tools',
                            commission: 15.0,
                            icon_url: '/icons/tools.svg',
                            order: 4,
                            is_coming_soon: false,
                        },
                        {
                            name: 'Dịch vụ',
                            slug: 'dich-vu',
                            commission: 12.0,
                            icon_url: '/icons/service.svg',
                            order: 5,
                            is_coming_soon: false,
                        },
                        {
                            name: 'Website',
                            slug: 'website',
                            commission: 20.0,
                            icon_url: '/icons/website.svg',
                            order: 6,
                            is_coming_soon: false,
                        },
                    ];
                    validSlugs = categoryData.map(function (c) { return c.slug; });
                    // Deactivate categories not in the new list (only parent categories)
                    return [4 /*yield*/, knex('categories')
                            .whereNull('parent_id')
                            .whereNotIn('slug', validSlugs)
                            .update({
                            is_active: false,
                            updated_at: now,
                        })];
                case 1:
                    // Deactivate categories not in the new list (only parent categories)
                    _c.sent();
                    _i = 0, categoryData_1 = categoryData;
                    _c.label = 2;
                case 2:
                    if (!(_i < categoryData_1.length)) return [3 /*break*/, 21];
                    data = categoryData_1[_i];
                    return [4 /*yield*/, knex('categories')
                            .where('slug', data.slug)
                            .whereNull('parent_id')
                            .first()];
                case 3:
                    existingCategory = _c.sent();
                    categoryId = void 0;
                    if (!existingCategory) return [3 /*break*/, 5];
                    // Update existing category
                    categoryId = existingCategory.id;
                    return [4 /*yield*/, knex('categories').where('id', categoryId).update({
                            name: data.name,
                            icon_url: data.icon_url,
                            order: data.order,
                            is_coming_soon: data.is_coming_soon,
                            is_active: true,
                            updated_at: now,
                        })];
                case 4:
                    _c.sent();
                    return [3 /*break*/, 7];
                case 5:
                    // Insert new category
                    categoryId = (0, uuid_1.v4)();
                    return [4 /*yield*/, knex('categories').insert({
                            id: categoryId,
                            parent_id: null,
                            name: data.name,
                            slug: data.slug,
                            icon_url: data.icon_url,
                            order: data.order,
                            is_coming_soon: data.is_coming_soon,
                            is_active: true,
                            created_at: now,
                            updated_at: now,
                        })];
                case 6:
                    _c.sent();
                    _c.label = 7;
                case 7: return [4 /*yield*/, knex('category_commissions')
                        .where('category_id', categoryId)
                        .first()];
                case 8:
                    existingCommission = _c.sent();
                    if (!existingCommission) return [3 /*break*/, 10];
                    return [4 /*yield*/, knex('category_commissions')
                            .where('category_id', categoryId)
                            .update({
                            commission_rate: data.commission,
                            effective_from: now,
                            updated_at: now,
                        })];
                case 9:
                    _c.sent();
                    return [3 /*break*/, 12];
                case 10: return [4 /*yield*/, knex('category_commissions').insert({
                        id: (0, uuid_1.v4)(),
                        category_id: categoryId,
                        commission_rate: data.commission,
                        effective_from: now,
                        created_at: now,
                        updated_at: now,
                    })];
                case 11:
                    _c.sent();
                    _c.label = 12;
                case 12:
                    if (!(data.children && data.children.length > 0)) return [3 /*break*/, 20];
                    validChildSlugs = data.children.map(function (c) { return c.slug; });
                    // Deactivate child categories not in the new list
                    return [4 /*yield*/, knex('categories')
                            .where('parent_id', categoryId)
                            .whereNotIn('slug', validChildSlugs)
                            .update({
                            is_active: false,
                            updated_at: now,
                        })];
                case 13:
                    // Deactivate child categories not in the new list
                    _c.sent();
                    _a = 0, _b = data.children;
                    _c.label = 14;
                case 14:
                    if (!(_a < _b.length)) return [3 /*break*/, 20];
                    childData = _b[_a];
                    return [4 /*yield*/, knex('categories')
                            .where('slug', childData.slug)
                            .where('parent_id', categoryId)
                            .first()];
                case 15:
                    existingChild = _c.sent();
                    if (!existingChild) return [3 /*break*/, 17];
                    // Update existing child category
                    return [4 /*yield*/, knex('categories').where('id', existingChild.id).update({
                            name: childData.name,
                            order: childData.order,
                            is_active: true,
                            updated_at: now,
                        })];
                case 16:
                    // Update existing child category
                    _c.sent();
                    return [3 /*break*/, 19];
                case 17:
                    childId = (0, uuid_1.v4)();
                    return [4 /*yield*/, knex('categories').insert({
                            id: childId,
                            parent_id: categoryId,
                            name: childData.name,
                            slug: childData.slug,
                            icon_url: null,
                            order: childData.order,
                            is_coming_soon: false,
                            is_active: true,
                            created_at: now,
                            updated_at: now,
                        })];
                case 18:
                    _c.sent();
                    _c.label = 19;
                case 19:
                    _a++;
                    return [3 /*break*/, 14];
                case 20:
                    _i++;
                    return [3 /*break*/, 2];
                case 21: return [2 /*return*/];
            }
        });
    });
}
