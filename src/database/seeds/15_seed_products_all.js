"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var ADMIN_USER_ID = '00000000-0000-0000-0000-000000000001';
var SHOP_ID = '00000000-0000-0000-0000-000000000101';
var SHOP_SLUG = 'shop-01';
var TAI_KHOAN_SUBCATEGORIES = [
    { name: 'Tài khoản FB', slug: 'tai-khoan-fb' },
    { name: 'BM', slug: 'bm' },
    { name: 'Zalo', slug: 'zalo' },
    { name: 'Twitter', slug: 'twitter' },
    { name: 'Telegram', slug: 'telegram' },
    { name: 'Instagram', slug: 'instagram' },
    { name: 'Shopee', slug: 'shopee' },
    { name: 'Discord', slug: 'discord' },
    { name: 'TikTok', slug: 'tiktok' },
    { name: 'Key Diệt Virus', slug: 'key-diet-virus' },
    { name: 'Capcut', slug: 'capcut' },
    { name: 'Canva', slug: 'canva' },
    { name: 'Key Window', slug: 'key-window' },
    { name: 'Tài khoản Khác', slug: 'tai-khoan-khac' },
];
var EMAIL_SUBCATEGORIES = [
    { name: 'Gmail', slug: 'gmail' },
    { name: 'HotMail', slug: 'hotmail' },
    { name: 'OutlookMail', slug: 'outlookmail' },
    { name: 'RuMail', slug: 'rumail' },
    { name: 'DomainMail', slug: 'domainmail' },
    { name: 'YahooMail', slug: 'yahoomail' },
    { name: 'ProtonMail', slug: 'protonmail' },
    { name: 'Loại Mail Khác', slug: 'loai-mail-khac' },
];
var IMAGE_POOL = [
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
];
function formatVND(price) {
    return price
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
function formatPriceWithAbbreviation(price) {
    var safePrice = Number(price) || 0;
    var fullPrice = "".concat(formatVND(safePrice), " \u0111");
    if (safePrice < 1000000) {
        return { display: fullPrice, fullPrice: fullPrice };
    }
    if (safePrice >= 1000000000) {
        var value_1 = safePrice / 1000000000;
        var rounded_1 = Math.round(value_1 * 10) / 10;
        var display_1 = rounded_1 % 1 === 0
            ? "".concat(rounded_1.toFixed(0), " t\u1EF7 \u0111")
            : "".concat(rounded_1.toFixed(1), " t\u1EF7 \u0111");
        return { display: display_1, fullPrice: fullPrice };
    }
    var value = safePrice / 1000000;
    var rounded = Math.round(value * 10) / 10;
    var display = rounded % 1 === 0
        ? "".concat(rounded.toFixed(0), " tri\u1EC7u \u0111")
        : "".concat(rounded.toFixed(1), " tri\u1EC7u \u0111");
    return { display: display, fullPrice: fullPrice };
}
function buildPriceMinMax(prices) {
    if (!prices.length)
        return formatPriceWithAbbreviation(0).display;
    var minPrice = Math.min.apply(Math, prices);
    var maxPrice = Math.max.apply(Math, prices);
    var minPriceFormatted = formatPriceWithAbbreviation(minPrice);
    var maxPriceFormatted = formatPriceWithAbbreviation(maxPrice);
    if (minPrice === maxPrice)
        return minPriceFormatted.display;
    return "".concat(formatVND(minPrice), "-").concat(maxPriceFormatted.display);
}
function buildOptions(basePrice, baseQty, seedKey) {
    var tiers = [
        { name: 'Gói 1', price: basePrice, quantity: baseQty },
        { name: 'Gói 2', price: Math.round(basePrice * 1.5), quantity: baseQty * 2 },
        { name: 'Gói 3', price: Math.round(basePrice * 2), quantity: baseQty * 4 },
    ];
    return tiers.map(function (tier, idx) { return (__assign(__assign({}, tier), { description_quantity: Array.from({ length: tier.quantity }, function (_, i) { return "".concat(seedKey, "-").concat(idx + 1, "-").concat(i + 1); }) })); });
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
        var env, admin, now, shop, categories, categoryBySlug, products, index, pushProduct, _i, TAI_KHOAN_SUBCATEGORIES_1, sub, _a, EMAIL_SUBCATEGORIES_1, sub, miscCategories, _b, miscCategories_1, misc, _loop_1, i;
        var _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    env = String(process.env.NODE_ENV || '').toLowerCase();
                    if (env === 'production') {
                        console.log('Seed products skipped in production.');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, knex('users').where('id', ADMIN_USER_ID).first()];
                case 1:
                    admin = _g.sent();
                    if (!admin) {
                        throw new Error('Admin user not found. Please run seed 03_seed_admin_user first.');
                    }
                    now = new Date();
                    return [4 /*yield*/, knex('shops').where('slug', SHOP_SLUG).first()];
                case 2:
                    shop = _g.sent();
                    if (!!shop) return [3 /*break*/, 4];
                    return [4 /*yield*/, knex('shops').insert({
                            id: SHOP_ID,
                            owner_id: ADMIN_USER_ID,
                            name: 'Shop 01',
                            slug: SHOP_SLUG,
                            description: 'Shop demo dùng cho dữ liệu sản phẩm mẫu.',
                            avatar_url: 'https://randomuser.me/api/portraits/men/32.jpg',
                            created_at: now,
                            updated_at: now,
                        })];
                case 3:
                    _g.sent();
                    shop = { id: SHOP_ID, slug: SHOP_SLUG };
                    _g.label = 4;
                case 4: return [4 /*yield*/, knex('categories').select('id', 'slug', 'name', 'parent_id')];
                case 5:
                    categories = _g.sent();
                    categoryBySlug = new Map(categories.map(function (c) { return [c.slug, c]; }));
                    products = [];
                    index = 1;
                    pushProduct = function (categorySlug, subcategorySlug, displayName) {
                        var basePrice = 50000 + index * 12000;
                        var baseQty = 5 + (index % 3) * 3;
                        var seedKey = "".concat(categorySlug, "-").concat(subcategorySlug !== null && subcategorySlug !== void 0 ? subcategorySlug : 'default', "-").concat(index);
                        var options = buildOptions(basePrice, baseQty, seedKey);
                        var slugIndex = String(index).padStart(3, '0');
                        var slug = "shop-01-product-".concat(slugIndex, "-").concat(subcategorySlug !== null && subcategorySlug !== void 0 ? subcategorySlug : categorySlug);
                        if (categorySlug === 'tai-khoan' && index === 7) {
                            slug = 'shop-01-product-007-tai-khoan';
                        }
                        var name = "".concat(displayName, " - G\u00F3i ").concat(slugIndex);
                        products.push({
                            slug: slug,
                            name: name,
                            categorySlug: categorySlug,
                            subcategorySlug: subcategorySlug,
                            price: Math.min.apply(Math, options.map(function (opt) { return opt.price; })),
                            discountPercent: index % 2 === 0 ? 10 : 0,
                            isFree: false,
                            description: "S\u1EA3n ph\u1EA9m ".concat(displayName.toLowerCase(), " ch\u1EA5t l\u01B0\u1EE3ng cao, b\u1EA3o h\u00E0nh 7 ng\u00E0y."),
                            instruction: 'Sau khi mua, bạn có thể xem hướng dẫn chi tiết và tải dữ liệu trong phần đơn hàng.',
                            meta: {
                                demo_url: 'https://bachhoammo.net',
                                download_link: 'https://bachhoammo.net',
                                download_password: '123456',
                            },
                            options: options,
                        });
                        index += 1;
                    };
                    for (_i = 0, TAI_KHOAN_SUBCATEGORIES_1 = TAI_KHOAN_SUBCATEGORIES; _i < TAI_KHOAN_SUBCATEGORIES_1.length; _i++) {
                        sub = TAI_KHOAN_SUBCATEGORIES_1[_i];
                        pushProduct('tai-khoan', sub.slug, sub.name);
                    }
                    for (_a = 0, EMAIL_SUBCATEGORIES_1 = EMAIL_SUBCATEGORIES; _a < EMAIL_SUBCATEGORIES_1.length; _a++) {
                        sub = EMAIL_SUBCATEGORIES_1[_a];
                        pushProduct('email', sub.slug, sub.name);
                    }
                    miscCategories = [
                        { slug: 'tools', name: 'Tools' },
                        { slug: 'dich-vu', name: 'Dịch vụ' },
                        { slug: 'website', name: 'Website' },
                    ];
                    for (_b = 0, miscCategories_1 = miscCategories; _b < miscCategories_1.length; _b++) {
                        misc = miscCategories_1[_b];
                        pushProduct(misc.slug, null, misc.name);
                        pushProduct(misc.slug, null, "".concat(misc.name, " Pro"));
                    }
                    _loop_1 = function (i) {
                        var product, category, subcategory, totalQuantity, priceMinMax, existingProduct, productId, existingVersion, versionId, images;
                        return __generator(this, function (_h) {
                            switch (_h.label) {
                                case 0:
                                    product = products[i];
                                    category = categoryBySlug.get(product.categorySlug);
                                    if (!category) {
                                        console.warn("Seed products: missing category slug=".concat(product.categorySlug));
                                        return [2 /*return*/, "continue"];
                                    }
                                    subcategory = product.subcategorySlug
                                        ? categoryBySlug.get(product.subcategorySlug)
                                        : null;
                                    totalQuantity = product.options.reduce(function (sum, opt) { return sum + (Number(opt.quantity) || 0); }, 0);
                                    priceMinMax = buildPriceMinMax(product.options.map(function (opt) { return opt.price; }));
                                    return [4 /*yield*/, knex('products')
                                            .where('slug', product.slug)
                                            .first()];
                                case 1:
                                    existingProduct = _h.sent();
                                    productId = (_c = existingProduct === null || existingProduct === void 0 ? void 0 : existingProduct.id) !== null && _c !== void 0 ? _c : (0, uuid_1.v4)();
                                    if (!existingProduct) return [3 /*break*/, 3];
                                    return [4 /*yield*/, knex('products').where('id', productId).update({
                                            shop_id: shop.id,
                                            slug: product.slug,
                                            state: 'live',
                                            price_min_max: priceMinMax,
                                            total_quantity: totalQuantity,
                                            updated_at: now,
                                        })];
                                case 2:
                                    _h.sent();
                                    return [3 /*break*/, 5];
                                case 3: return [4 /*yield*/, knex('products').insert({
                                        id: productId,
                                        shop_id: shop.id,
                                        approved_version_id: null,
                                        pending_version_id: null,
                                        slug: product.slug,
                                        state: 'live',
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
                                case 4:
                                    _h.sent();
                                    _h.label = 5;
                                case 5: return [4 /*yield*/, knex('product_versions')
                                        .where('slug', product.slug)
                                        .first()];
                                case 6:
                                    existingVersion = _h.sent();
                                    versionId = (_d = existingVersion === null || existingVersion === void 0 ? void 0 : existingVersion.id) !== null && _d !== void 0 ? _d : (0, uuid_1.v4)();
                                    if (!existingVersion) return [3 /*break*/, 8];
                                    return [4 /*yield*/, knex('product_versions').where('id', versionId).update({
                                            product_id: productId,
                                            version_type: 'new',
                                            status: 'approved',
                                            name: product.name,
                                            slug: product.slug,
                                            is_free: product.isFree,
                                            price: product.price,
                                            discount_percent: product.discountPercent,
                                            category_id: category.id,
                                            subcategory_id: (_e = subcategory === null || subcategory === void 0 ? void 0 : subcategory.id) !== null && _e !== void 0 ? _e : null,
                                            description: product.description,
                                            instruction: product.instruction,
                                            meta: product.meta,
                                            reviewed_by: ADMIN_USER_ID,
                                            reviewed_at: now,
                                            updated_at: now,
                                            total_quantity: totalQuantity,
                                            price_min_max: priceMinMax,
                                        })];
                                case 7:
                                    _h.sent();
                                    return [3 /*break*/, 10];
                                case 8: return [4 /*yield*/, knex('product_versions').insert({
                                        id: versionId,
                                        product_id: productId,
                                        version_type: 'new',
                                        status: 'approved',
                                        name: product.name,
                                        slug: product.slug,
                                        is_free: product.isFree,
                                        price: product.price,
                                        discount_percent: product.discountPercent,
                                        category_id: category.id,
                                        subcategory_id: (_f = subcategory === null || subcategory === void 0 ? void 0 : subcategory.id) !== null && _f !== void 0 ? _f : null,
                                        description: product.description,
                                        instruction: product.instruction,
                                        meta: product.meta,
                                        submitted_by: ADMIN_USER_ID,
                                        reviewed_by: ADMIN_USER_ID,
                                        submitted_at: now,
                                        reviewed_at: now,
                                        created_at: now,
                                        updated_at: now,
                                        total_quantity: totalQuantity,
                                        price_min_max: priceMinMax,
                                    })];
                                case 9:
                                    _h.sent();
                                    _h.label = 10;
                                case 10: return [4 /*yield*/, knex('products')
                                        .where('id', productId)
                                        .update({ approved_version_id: versionId, pending_version_id: null })];
                                case 11:
                                    _h.sent();
                                    return [4 /*yield*/, knex('product_version_images')
                                            .where('product_version_id', versionId)
                                            .del()];
                                case 12:
                                    _h.sent();
                                    images = buildImages(i);
                                    return [4 /*yield*/, knex('product_version_images').insert(images.map(function (img) { return ({
                                            id: (0, uuid_1.v4)(),
                                            product_version_id: versionId,
                                            file_path: img.file_path,
                                            sort_order: img.sort_order,
                                            is_primary: img.is_primary,
                                            created_at: now,
                                        }); }))];
                                case 13:
                                    _h.sent();
                                    return [4 /*yield*/, knex('option_products').where('product_id', productId).del()];
                                case 14:
                                    _h.sent();
                                    if (!(product.options.length > 0)) return [3 /*break*/, 16];
                                    return [4 /*yield*/, knex('option_products').insert(product.options.map(function (opt) {
                                            var _a;
                                            return ({
                                                product_id: productId,
                                                name: opt.name,
                                                price: opt.price,
                                                quantity: opt.quantity,
                                                description_quantity: (_a = opt.description_quantity) !== null && _a !== void 0 ? _a : null,
                                            });
                                        }))];
                                case 15:
                                    _h.sent();
                                    _h.label = 16;
                                case 16: return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _g.label = 6;
                case 6:
                    if (!(i < products.length)) return [3 /*break*/, 9];
                    return [5 /*yield**/, _loop_1(i)];
                case 7:
                    _g.sent();
                    _g.label = 8;
                case 8:
                    i += 1;
                    return [3 /*break*/, 6];
                case 9: return [2 /*return*/];
            }
        });
    });
}
