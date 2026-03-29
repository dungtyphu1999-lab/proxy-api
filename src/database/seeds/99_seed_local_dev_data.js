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
var crypto_1 = require("crypto");
var bcrypt = require("bcrypt");
var slugify_1 = require("slugify");
var USERS_COUNT = 10;
var SHOPS_COUNT = 20;
var PRODUCTS_COUNT = 100;
var OPTIONS_COUNT = 200;
var TOTAL_KEYS = 500;
var IMAGE_POOL = [
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
];
function formatVND(price) {
    return "".concat(price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.'), " \u0111");
}
function buildPriceMinMax(prices) {
    if (!prices.length)
        return formatVND(0);
    var minPrice = Math.min.apply(Math, prices);
    var maxPrice = Math.max.apply(Math, prices);
    if (minPrice === maxPrice)
        return formatVND(minPrice);
    return "".concat(formatVND(minPrice), "-").concat(formatVND(maxPrice));
}
function buildImages(index) {
    var first = IMAGE_POOL[index % IMAGE_POOL.length];
    var second = IMAGE_POOL[(index + 1) % IMAGE_POOL.length];
    return [
        { file_path: first, sort_order: 0, is_primary: true },
        { file_path: second, sort_order: 1, is_primary: false },
    ];
}
function seed(knex) {
    return __awaiter(this, void 0, void 0, function () {
        var env, now, hasOptionAccountKeys, hasOptionDescriptionQty, hasOptionDataSource, hasProfileUsername, role, passwordHash, users, i, id, email, username, profileRow, hasDepositBalance, hasSaleBalance, hasLockedBalance, i, amount, walletData, shops, i, owner, name_1, slug, shopId, categories, subcategories, baseKeysPerOption, extraKeys, optionIndex, keyCounter, _loop_1, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    env = String(process.env.APP_ENV || process.env.NODE_ENV || '').toLowerCase();
                    if (env === 'production') {
                        console.log('Local dev seed skipped in production.');
                        return [2 /*return*/];
                    }
                    now = new Date();
                    return [4 /*yield*/, knex.schema.hasColumn('option_products', 'account_keys')];
                case 1:
                    hasOptionAccountKeys = _a.sent();
                    return [4 /*yield*/, knex.schema.hasColumn('option_products', 'description_quantity')];
                case 2:
                    hasOptionDescriptionQty = _a.sent();
                    return [4 /*yield*/, knex.schema.hasColumn('option_products', 'data_source')];
                case 3:
                    hasOptionDataSource = _a.sent();
                    return [4 /*yield*/, knex.schema.hasColumn('user_profiles', 'username')];
                case 4:
                    hasProfileUsername = _a.sent();
                    return [4 /*yield*/, knex.raw("\n    TRUNCATE TABLE\n      order_items,\n      orders,\n      cart_items,\n      carts,\n      product_version_images,\n      product_versions,\n      option_products,\n      products,\n      shops,\n      wallet_transactions,\n      wallets,\n      user_profiles,\n      user_role_map,\n      users\n    RESTART IDENTITY CASCADE\n  ")];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, knex('roles')
                            .select('id')
                            .where('name', 'user')
                            .first()];
                case 6:
                    role = _a.sent();
                    if (!(role === null || role === void 0 ? void 0 : role.id)) {
                        throw new Error('Missing role "user". Seed roles before running this.');
                    }
                    return [4 /*yield*/, bcrypt.hash('Test@12345', 10)];
                case 7:
                    passwordHash = _a.sent();
                    users = [];
                    i = 1;
                    _a.label = 8;
                case 8:
                    if (!(i <= USERS_COUNT)) return [3 /*break*/, 13];
                    id = (0, crypto_1.randomUUID)();
                    email = "dev_user_".concat(i, "@local.test");
                    username = "dev_user_".concat(i);
                    users.push({ id: id, email: email, username: username });
                    return [4 /*yield*/, knex('users').insert({
                            id: id,
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
                case 9:
                    _a.sent();
                    profileRow = {
                        user_id: id,
                        full_name: "Dev User ".concat(i),
                        is_profile_updated: true,
                    };
                    if (hasProfileUsername) {
                        profileRow.username = username;
                    }
                    return [4 /*yield*/, knex('user_profiles').insert(profileRow)];
                case 10:
                    _a.sent();
                    return [4 /*yield*/, knex('user_role_map').insert({
                            id: (0, crypto_1.randomUUID)(),
                            user_id: id,
                            role_id: role.id,
                            assigned_at: now,
                        })];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12:
                    i += 1;
                    return [3 /*break*/, 8];
                case 13: return [4 /*yield*/, knex.schema.hasColumn('wallets', 'deposit_balance')];
                case 14:
                    hasDepositBalance = _a.sent();
                    return [4 /*yield*/, knex.schema.hasColumn('wallets', 'sale_balance')];
                case 15:
                    hasSaleBalance = _a.sent();
                    return [4 /*yield*/, knex.schema.hasColumn('wallets', 'locked_balance')];
                case 16:
                    hasLockedBalance = _a.sent();
                    i = 0;
                    _a.label = 17;
                case 17:
                    if (!(i < users.length)) return [3 /*break*/, 20];
                    amount = 5000000 + i * 500000;
                    walletData = {
                        id: (0, crypto_1.randomUUID)(),
                        user_id: users[i].id,
                        balance: amount,
                        currency: 'VND',
                        is_locked: false,
                        created_at: now,
                        updated_at: now,
                    };
                    if (hasDepositBalance)
                        walletData.deposit_balance = amount;
                    if (hasSaleBalance)
                        walletData.sale_balance = 0;
                    if (hasLockedBalance)
                        walletData.locked_balance = 0;
                    return [4 /*yield*/, knex('wallets').insert(walletData)];
                case 18:
                    _a.sent();
                    _a.label = 19;
                case 19:
                    i += 1;
                    return [3 /*break*/, 17];
                case 20:
                    shops = [];
                    i = 1;
                    _a.label = 21;
                case 21:
                    if (!(i <= SHOPS_COUNT)) return [3 /*break*/, 24];
                    owner = users[(i - 1) % users.length];
                    name_1 = "Dev Shop ".concat(i);
                    slug = (0, slugify_1.default)(name_1, { lower: true, strict: true });
                    shopId = (0, crypto_1.randomUUID)();
                    shops.push({ id: shopId, owner_id: owner.id, name: name_1, slug: slug });
                    return [4 /*yield*/, knex('shops').insert({
                            id: shopId,
                            owner_id: owner.id,
                            name: name_1,
                            slug: slug,
                            description: "Shop demo ".concat(i, " cho test local/dev."),
                            avatar_url: "https://randomuser.me/api/portraits/lego/".concat((i % 10) + 1, ".jpg"),
                            is_suspended: false,
                            created_at: now,
                            updated_at: now,
                        })];
                case 22:
                    _a.sent();
                    _a.label = 23;
                case 23:
                    i += 1;
                    return [3 /*break*/, 21];
                case 24: return [4 /*yield*/, knex('categories').select('id', 'parent_id')];
                case 25:
                    categories = _a.sent();
                    subcategories = categories.filter(function (c) { return c.parent_id; });
                    if (!subcategories.length) {
                        throw new Error('No subcategories found. Seed categories first.');
                    }
                    baseKeysPerOption = Math.floor(TOTAL_KEYS / OPTIONS_COUNT);
                    extraKeys = TOTAL_KEYS % OPTIONS_COUNT;
                    optionIndex = 0;
                    keyCounter = 1;
                    _loop_1 = function (i) {
                        var shop, subcategory, categoryId, productId, slug, name_2, basePrice, state, options, totalQuantity, priceMinMax, versionId, versionStatus, images;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    shop = shops[(i - 1) % shops.length];
                                    subcategory = subcategories[(i - 1) % subcategories.length];
                                    categoryId = subcategory.parent_id;
                                    productId = (0, crypto_1.randomUUID)();
                                    slug = "dev-product-".concat(String(i).padStart(3, '0'));
                                    name_2 = "Dev Product ".concat(i);
                                    basePrice = 50000 + i * 1000;
                                    state = i <= 60 ? 'live' : i <= 80 ? 'pending' : i <= 90 ? 'hidden' : 'rejected';
                                    options = Array.from({ length: 2 }, function (_, optIdx) {
                                        var qty = baseKeysPerOption + (optionIndex < extraKeys ? 1 : 0);
                                        var label = "P".concat(i, "-O").concat(optIdx + 1);
                                        var keys = Array.from({ length: qty }, function () {
                                            var key = "KEY-".concat(label, "-").concat(String(keyCounter).padStart(4, '0'));
                                            keyCounter += 1;
                                            return key;
                                        });
                                        optionIndex += 1;
                                        return {
                                            name: "G\u00F3i ".concat(optIdx + 1),
                                            price: basePrice + optIdx * 15000,
                                            quantity: qty,
                                            account_keys: keys,
                                            description_quantity: keys,
                                        };
                                    });
                                    totalQuantity = options.reduce(function (sum, opt) { return sum + (Number(opt.quantity) || 0); }, 0);
                                    priceMinMax = buildPriceMinMax(options.map(function (opt) { return opt.price; }));
                                    return [4 /*yield*/, knex('products').insert({
                                            id: productId,
                                            shop_id: shop.id,
                                            approved_version_id: null,
                                            pending_version_id: null,
                                            slug: slug,
                                            state: state,
                                            total_sales: 0,
                                            total_revenue: 0,
                                            rating_avg: 0,
                                            rating_count: 0,
                                            total_like: 0,
                                            total_view: 0,
                                            total_review: 0,
                                            price_min_max: priceMinMax,
                                            total_quantity: totalQuantity,
                                            created_at: now,
                                            updated_at: now,
                                        })];
                                case 1:
                                    _b.sent();
                                    versionId = (0, crypto_1.randomUUID)();
                                    versionStatus = state === 'rejected'
                                        ? 'rejected'
                                        : state === 'pending'
                                            ? 'pending'
                                            : 'approved';
                                    return [4 /*yield*/, knex('product_versions').insert({
                                            id: versionId,
                                            product_id: productId,
                                            version_type: 'new',
                                            status: versionStatus,
                                            name: name_2,
                                            slug: slug,
                                            is_free: false,
                                            price: basePrice,
                                            discount_percent: i % 3 === 0 ? 10 : 0,
                                            category_id: categoryId,
                                            subcategory_id: subcategory.id,
                                            description: "M\u00F4 t\u1EA3 s\u1EA3n ph\u1EA9m ".concat(i),
                                            instruction: "H\u01B0\u1EDBng d\u1EABn s\u1EED d\u1EE5ng s\u1EA3n ph\u1EA9m ".concat(i),
                                            meta: { demo_url: 'https://example.com' },
                                            submitted_by: shop.owner_id,
                                            reviewed_by: shop.owner_id,
                                            submitted_at: now,
                                            reviewed_at: now,
                                            created_at: now,
                                            updated_at: now,
                                            total_quantity: totalQuantity,
                                            price_min_max: priceMinMax,
                                        })];
                                case 2:
                                    _b.sent();
                                    return [4 /*yield*/, knex('products')
                                            .where('id', productId)
                                            .update({
                                            approved_version_id: versionStatus === 'approved' ? versionId : null,
                                            pending_version_id: versionStatus !== 'approved' ? versionId : null,
                                        })];
                                case 3:
                                    _b.sent();
                                    images = buildImages(i);
                                    return [4 /*yield*/, knex('product_version_images').insert(images.map(function (img) { return ({
                                            id: (0, crypto_1.randomUUID)(),
                                            product_version_id: versionId,
                                            file_path: img.file_path,
                                            sort_order: img.sort_order,
                                            is_primary: img.is_primary,
                                            created_at: now,
                                        }); }))];
                                case 4:
                                    _b.sent();
                                    return [4 /*yield*/, knex('option_products').insert(options.map(function (opt) {
                                            var row = {
                                                product_id: productId,
                                                name: opt.name,
                                                price: opt.price,
                                                quantity: opt.quantity,
                                                created_at: now,
                                                updated_at: now,
                                            };
                                            if (hasOptionDescriptionQty) {
                                                row.description_quantity = opt.description_quantity;
                                            }
                                            if (hasOptionAccountKeys) {
                                                row.account_keys = opt.account_keys;
                                            }
                                            if (hasOptionDataSource) {
                                                row.data_source = 'manual';
                                            }
                                            return row;
                                        }))];
                                case 5:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 1;
                    _a.label = 26;
                case 26:
                    if (!(i <= PRODUCTS_COUNT)) return [3 /*break*/, 29];
                    return [5 /*yield**/, _loop_1(i)];
                case 27:
                    _a.sent();
                    _a.label = 28;
                case 28:
                    i += 1;
                    return [3 /*break*/, 26];
                case 29:
                    console.log("Seeded: ".concat(USERS_COUNT, " users, ").concat(SHOPS_COUNT, " shops, ").concat(PRODUCTS_COUNT, " products, ").concat(OPTIONS_COUNT, " options, ").concat(TOTAL_KEYS, " keys."));
                    return [2 /*return*/];
            }
        });
    });
}
