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
function seed(knex) {
    return __awaiter(this, void 0, void 0, function () {
        var now, products, _i, products_1, p, existing, insertedRows, inserted, productId, exclusivity, i, exists, quantity, i, q, extra, exists, pricePerMonth, bandwidth, i, bw, extra, exists, exclusivity, i, exists, quantity, i, q, extra, exists, pricePerMonth, bandwidth, i, bw, extra, exists, bandwidthOptions, i, bo, extra, exists;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    now = new Date();
                    products = [
                        {
                            code: 'static_residential',
                            name_vi: 'Proxy dân cư tĩnh',
                            name_en: 'Static Residential Proxy',
                        },
                        {
                            code: 'rotating_residential',
                            name_vi: 'Proxy dân cư xoay',
                            name_en: 'Rotating Residential Proxy',
                        },
                        {
                            code: 'proxy_server',
                            name_vi: 'Proxy Server',
                            name_en: 'Proxy Server',
                        },
                    ];
                    _i = 0, products_1 = products;
                    _a.label = 1;
                case 1:
                    if (!(_i < products_1.length)) return [3 /*break*/, 39];
                    p = products_1[_i];
                    return [4 /*yield*/, knex('proxy_products')
                            .where('code', p.code)
                            .select('id')
                            .first()];
                case 2:
                    existing = _a.sent();
                    if (existing)
                        return [3 /*break*/, 38];
                    return [4 /*yield*/, knex('proxy_products')
                            .insert({
                            code: p.code,
                            name_vi: p.name_vi,
                            name_en: p.name_en,
                            is_active: true,
                            created_at: now,
                            updated_at: now,
                        })
                            .returning('id')];
                case 3:
                    insertedRows = _a.sent();
                    inserted = insertedRows[0];
                    if (!inserted)
                        return [3 /*break*/, 38];
                    productId = inserted.id;
                    if (!(p.code === 'static_residential')) return [3 /*break*/, 18];
                    exclusivity = [
                        {
                            option_value: 'shared',
                            label: 'Dùng chung',
                            description: 'Chia sẻ với hơn 2 người dùng',
                            extra_data: JSON.stringify({ subnet_count: 228 }),
                        },
                        {
                            option_value: 'dedicated',
                            label: 'Chuyên dụng',
                            description: 'Toàn quyền sử dụng',
                            extra_data: JSON.stringify({ subnet_count: 357 }),
                        },
                    ];
                    i = 0;
                    _a.label = 4;
                case 4:
                    if (!(i < exclusivity.length)) return [3 /*break*/, 8];
                    return [4 /*yield*/, knex('proxy_product_options')
                            .where({
                            product_id: productId,
                            option_type: 'exclusivity',
                            option_value: exclusivity[i].option_value,
                        })
                            .first()];
                case 5:
                    exists = _a.sent();
                    if (exists)
                        return [3 /*break*/, 7];
                    return [4 /*yield*/, knex('proxy_product_options').insert({
                            product_id: productId,
                            option_type: 'exclusivity',
                            option_value: exclusivity[i].option_value,
                            label: exclusivity[i].label,
                            description: exclusivity[i].description,
                            extra_data: exclusivity[i].extra_data,
                            price_per_month: null,
                            sort_order: i + 1,
                            is_active: true,
                            created_at: now,
                            updated_at: now,
                        })];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    i++;
                    return [3 /*break*/, 4];
                case 8:
                    quantity = [
                        {
                            option_value: '20',
                            label: '20 IPs',
                            price_per_unit: (75 * 26000) / 20, // $75.00 cho 250GB từ JSON
                        },
                        {
                            option_value: '250',
                            label: '250 IPs',
                            price_per_unit: (75 * 26000) / 250, // $75.00 cho 250GB từ JSON
                        },
                        {
                            option_value: '1000',
                            label: '1000 IPs',
                            price_per_unit: (30 * 26000) / 1000, // $30.00 cho 250GB từ JSON
                            is_popular: true,
                        },
                        {
                            option_value: '5000',
                            label: '5000 IPs',
                            price_per_unit: (150 * 26000) / 5000, // $150.00 cho 250GB từ JSON
                        },
                        { option_value: 'custom', label: 'Tuỳ chỉnh', price_per_unit: null },
                    ];
                    i = 0;
                    _a.label = 9;
                case 9:
                    if (!(i < quantity.length)) return [3 /*break*/, 13];
                    q = quantity[i];
                    extra = q.is_popular
                        ? JSON.stringify({ is_popular: true })
                        : null;
                    return [4 /*yield*/, knex('proxy_product_options')
                            .where({
                            product_id: productId,
                            option_type: 'quantity',
                            option_value: q.option_value,
                        })
                            .first()];
                case 10:
                    exists = _a.sent();
                    if (exists)
                        return [3 /*break*/, 12];
                    pricePerMonth = q.price_per_unit && q.option_value !== 'custom'
                        ? q.price_per_unit * parseInt(q.option_value, 10)
                        : null;
                    return [4 /*yield*/, knex('proxy_product_options').insert({
                            product_id: productId,
                            option_type: 'quantity',
                            option_value: q.option_value,
                            label: q.label,
                            price_per_unit: q.price_per_unit,
                            price_per_month: pricePerMonth,
                            extra_data: extra,
                            sort_order: i + 1,
                            is_active: true,
                            created_at: now,
                            updated_at: now,
                        })];
                case 11:
                    _a.sent();
                    _a.label = 12;
                case 12:
                    i++;
                    return [3 /*break*/, 9];
                case 13:
                    bandwidth = [
                        { option_value: '250', label: '250 GB' },
                        { option_value: '1000', label: '1,000 GB' },
                        { option_value: '5000', label: '5,000 GB', is_popular: true },
                        { option_value: 'unlimited', label: 'Unlimited GB' },
                    ];
                    i = 0;
                    _a.label = 14;
                case 14:
                    if (!(i < bandwidth.length)) return [3 /*break*/, 18];
                    bw = bandwidth[i];
                    extra = bw.is_popular
                        ? JSON.stringify({ is_popular: true })
                        : null;
                    return [4 /*yield*/, knex('proxy_product_options')
                            .where({
                            product_id: productId,
                            option_type: 'bandwidth',
                            option_value: bw.option_value,
                        })
                            .first()];
                case 15:
                    exists = _a.sent();
                    if (exists)
                        return [3 /*break*/, 17];
                    return [4 /*yield*/, knex('proxy_product_options').insert({
                            product_id: productId,
                            option_type: 'bandwidth',
                            option_value: bw.option_value,
                            label: bw.label,
                            price_per_month: null,
                            extra_data: extra,
                            sort_order: i + 1,
                            is_active: true,
                            created_at: now,
                            updated_at: now,
                        })];
                case 16:
                    _a.sent();
                    _a.label = 17;
                case 17:
                    i++;
                    return [3 /*break*/, 14];
                case 18:
                    if (!(p.code === 'proxy_server')) return [3 /*break*/, 33];
                    exclusivity = [
                        {
                            option_value: 'shared',
                            label: 'Dùng chung',
                            description: 'Chia sẻ với hơn 2 người dùng',
                            extra_data: JSON.stringify({ subnet_count: 228 }),
                        },
                    ];
                    i = 0;
                    _a.label = 19;
                case 19:
                    if (!(i < exclusivity.length)) return [3 /*break*/, 23];
                    return [4 /*yield*/, knex('proxy_product_options')
                            .where({
                            product_id: productId,
                            option_type: 'exclusivity',
                            option_value: exclusivity[i].option_value,
                        })
                            .first()];
                case 20:
                    exists = _a.sent();
                    if (exists)
                        return [3 /*break*/, 22];
                    return [4 /*yield*/, knex('proxy_product_options').insert({
                            product_id: productId,
                            option_type: 'exclusivity',
                            option_value: exclusivity[i].option_value,
                            label: exclusivity[i].label,
                            description: exclusivity[i].description,
                            extra_data: exclusivity[i].extra_data,
                            price_per_month: null,
                            sort_order: i + 1,
                            is_active: true,
                            created_at: now,
                            updated_at: now,
                        })];
                case 21:
                    _a.sent();
                    _a.label = 22;
                case 22:
                    i++;
                    return [3 /*break*/, 19];
                case 23:
                    quantity = [
                        { option_value: '100', label: '100 IPs', price_per_unit: 0.6 },
                        { option_value: '250', label: '250 IPs', price_per_unit: 0.6 },
                        {
                            option_value: '1000',
                            label: '1000 IPs',
                            price_per_unit: 0.6,
                            is_popular: true,
                        },
                        { option_value: '5000', label: '5000 IPs', price_per_unit: 0.48 },
                        { option_value: 'custom', label: 'Tuỳ chỉnh', price_per_unit: null },
                    ];
                    i = 0;
                    _a.label = 24;
                case 24:
                    if (!(i < quantity.length)) return [3 /*break*/, 28];
                    q = quantity[i];
                    extra = q.is_popular
                        ? JSON.stringify({ is_popular: true })
                        : null;
                    return [4 /*yield*/, knex('proxy_product_options')
                            .where({
                            product_id: productId,
                            option_type: 'quantity',
                            option_value: q.option_value,
                        })
                            .first()];
                case 25:
                    exists = _a.sent();
                    if (exists)
                        return [3 /*break*/, 27];
                    pricePerMonth = q.price_per_unit && q.option_value !== 'custom'
                        ? q.price_per_unit * parseInt(q.option_value, 10)
                        : null;
                    return [4 /*yield*/, knex('proxy_product_options').insert({
                            product_id: productId,
                            option_type: 'quantity',
                            option_value: q.option_value,
                            label: q.label,
                            price_per_unit: q.price_per_unit,
                            price_per_month: pricePerMonth,
                            extra_data: extra,
                            sort_order: i + 1,
                            is_active: true,
                            created_at: now,
                            updated_at: now,
                        })];
                case 26:
                    _a.sent();
                    _a.label = 27;
                case 27:
                    i++;
                    return [3 /*break*/, 24];
                case 28:
                    bandwidth = [
                        { option_value: '100', label: '100 GB' },
                        { option_value: '250', label: '250 GB' },
                        { option_value: '500', label: '500 GB' },
                        { option_value: '1000', label: '1000 GB' },
                        { option_value: '2500', label: '2500 GB' },
                        { option_value: '5000', label: '5000 GB', is_popular: true },
                        { option_value: '10000', label: '10000 GB' },
                        { option_value: '15000', label: '15000 GB' },
                        { option_value: '25000', label: '25000 GB' },
                        { option_value: '40000', label: '40000 GB' },
                        { option_value: '60000', label: '60000 GB' },
                        { option_value: '100000', label: '100000 GB' },
                        { option_value: 'unlimited', label: 'Unlimited' },
                        { option_value: 'custom', label: 'Custom GB' },
                    ];
                    i = 0;
                    _a.label = 29;
                case 29:
                    if (!(i < bandwidth.length)) return [3 /*break*/, 33];
                    bw = bandwidth[i];
                    extra = bw.is_popular
                        ? JSON.stringify({ is_popular: true })
                        : null;
                    return [4 /*yield*/, knex('proxy_product_options')
                            .where({
                            product_id: productId,
                            option_type: 'bandwidth',
                            option_value: bw.option_value,
                        })
                            .first()];
                case 30:
                    exists = _a.sent();
                    if (exists)
                        return [3 /*break*/, 32];
                    return [4 /*yield*/, knex('proxy_product_options').insert({
                            product_id: productId,
                            option_type: 'bandwidth',
                            option_value: bw.option_value,
                            label: bw.label,
                            price_per_month: null,
                            extra_data: extra,
                            sort_order: i + 1,
                            is_active: true,
                            created_at: now,
                            updated_at: now,
                        })];
                case 31:
                    _a.sent();
                    _a.label = 32;
                case 32:
                    i++;
                    return [3 /*break*/, 29];
                case 33:
                    if (!(p.code === 'rotating_residential')) return [3 /*break*/, 38];
                    bandwidthOptions = [
                        { option_value: '1', label: '1 GB', is_popular: true },
                        { option_value: '3', label: '3 GB' },
                        { option_value: '10', label: '10 GB' },
                        { option_value: '25', label: '25 GB' },
                        { option_value: '50', label: '50 GB' },
                        { option_value: '100', label: '100 GB' },
                        { option_value: '250', label: '250 GB' },
                        { option_value: '500', label: '500 GB' },
                        { option_value: '1000', label: '1000 GB' },
                        { option_value: '3000', label: '3000 GB' },
                    ];
                    i = 0;
                    _a.label = 34;
                case 34:
                    if (!(i < bandwidthOptions.length)) return [3 /*break*/, 38];
                    bo = bandwidthOptions[i];
                    extra = bo.is_popular
                        ? JSON.stringify({ is_popular: true })
                        : null;
                    return [4 /*yield*/, knex('proxy_product_options')
                            .where({
                            product_id: productId,
                            option_type: 'bandwidth',
                            option_value: bo.option_value,
                        })
                            .first()];
                case 35:
                    exists = _a.sent();
                    if (exists)
                        return [3 /*break*/, 37];
                    return [4 /*yield*/, knex('proxy_product_options').insert({
                            product_id: productId,
                            option_type: 'bandwidth',
                            option_value: bo.option_value,
                            label: bo.label,
                            price_per_month: null,
                            extra_data: extra,
                            sort_order: i + 1,
                            is_active: true,
                            created_at: now,
                            updated_at: now,
                        })];
                case 36:
                    _a.sent();
                    _a.label = 37;
                case 37:
                    i++;
                    return [3 /*break*/, 34];
                case 38:
                    _i++;
                    return [3 /*break*/, 1];
                case 39: return [2 /*return*/];
            }
        });
    });
}
