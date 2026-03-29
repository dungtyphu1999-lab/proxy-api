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
var ADMIN_USER_ID = '00000000-0000-0000-0000-000000000001';
/** Fake proxy IPs (residential-style) - đủ unique (user_id, address, port) */
function fakeProxyAddresses(count) {
    var bases, idx, i, base, lastOctet, port;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                bases = ['142.111', '185.202', '192.168', '10.88'];
                idx = 0;
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < count)) return [3 /*break*/, 4];
                base = bases[i % bases.length];
                lastOctet = (idx % 254) + 1;
                port = 8000 + (idx % 5000);
                idx++;
                return [4 /*yield*/, {
                        address: "".concat(base, ".").concat(Math.floor(idx / 254) % 256, ".").concat(lastOctet),
                        port: port,
                    }];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
function seed(knex) {
    return __awaiter(this, void 0, void 0, function () {
        var now, admin, userId, paymentMethod, paymentMethodId, staticProduct, rotatingProduct, staticExclusivity, staticQuantity, staticBandwidth, rotatingBandwidth, locationUs, locationRandom, locationGb, feature, existingOrder, ordersToInsert, insertedOrders, paidOrderIds, transactionsToInsert, activeOrder, proxyCount, locationsWithCountry, cities, gen, proxiesToInsert, proxyIdx, _i, gen_1, _a, address, port, loc, countryCode, proxyRows, _b, _c, row, existingFilters;
        var _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    now = new Date();
                    return [4 /*yield*/, knex('users')
                            .where('id', ADMIN_USER_ID)
                            .first()];
                case 1:
                    admin = _e.sent();
                    if (!admin) {
                        console.log('Seed proxy user purchases: admin user not found. Run 03_seed_admin_user first.');
                        return [2 /*return*/];
                    }
                    userId = admin.id;
                    return [4 /*yield*/, knex('payment_methods')
                            .where('is_active', true)
                            .orderBy('sort_order')
                            .first()];
                case 2:
                    paymentMethod = _e.sent();
                    if (!paymentMethod) {
                        console.log('Seed proxy user purchases: no payment_methods. Run 11_seed_payment_methods first.');
                        return [2 /*return*/];
                    }
                    paymentMethodId = paymentMethod.id;
                    return [4 /*yield*/, knex('proxy_products')
                            .where('code', 'static_residential')
                            .where('is_active', true)
                            .first()];
                case 3:
                    staticProduct = _e.sent();
                    return [4 /*yield*/, knex('proxy_products')
                            .where('code', 'rotating_residential')
                            .where('is_active', true)
                            .first()];
                case 4:
                    rotatingProduct = _e.sent();
                    if (!staticProduct || !rotatingProduct) {
                        console.log('Seed proxy user purchases: proxy_products not found. Run 08_seed_proxy_all first.');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, knex('proxy_product_options')
                            .where('product_id', staticProduct.id)
                            .where('option_type', 'exclusivity')
                            .where('option_value', 'shared')
                            .first()];
                case 5:
                    staticExclusivity = _e.sent();
                    return [4 /*yield*/, knex('proxy_product_options')
                            .where('product_id', staticProduct.id)
                            .where('option_type', 'quantity')
                            .where('option_value', '20')
                            .first()];
                case 6:
                    staticQuantity = _e.sent();
                    return [4 /*yield*/, knex('proxy_product_options')
                            .where('product_id', staticProduct.id)
                            .where('option_type', 'bandwidth')
                            .where('option_value', '1000')
                            .first()];
                case 7:
                    staticBandwidth = _e.sent();
                    return [4 /*yield*/, knex('proxy_product_options')
                            .where('product_id', rotatingProduct.id)
                            .where('option_type', 'bandwidth')
                            .where('option_value', '10')
                            .first()];
                case 8:
                    rotatingBandwidth = _e.sent();
                    if (!staticExclusivity ||
                        !staticQuantity ||
                        !staticBandwidth ||
                        !rotatingBandwidth) {
                        console.log('Seed proxy user purchases: proxy_product_options not found. Run 08_seed_proxy_all first.');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, knex('proxy_locations')
                            .where('location_key', 'us')
                            .first()];
                case 9:
                    locationUs = _e.sent();
                    return [4 /*yield*/, knex('proxy_locations')
                            .where('location_key', 'random')
                            .first()];
                case 10:
                    locationRandom = _e.sent();
                    return [4 /*yield*/, knex('proxy_locations')
                            .where('location_key', 'uk')
                            .first()];
                case 11:
                    locationGb = _e.sent();
                    if (!locationUs || !locationRandom || !locationGb) {
                        console.log('Seed proxy user purchases: proxy_locations not found. Run 08_seed_proxy_all first.');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, knex('proxy_additional_features')
                            .where('is_active', true)
                            .orderBy('sort_order')
                            .first()];
                case 12:
                    feature = _e.sent();
                    return [4 /*yield*/, knex('proxy_orders')
                            .where('user_id', userId)
                            .first()];
                case 13:
                    existingOrder = _e.sent();
                    if (existingOrder) {
                        console.log('Seed proxy user purchases: proxy orders already exist for admin. Skip.');
                        return [2 /*return*/];
                    }
                    ordersToInsert = [
                        {
                            user_id: userId,
                            product_id: staticProduct.id,
                            exclusivity_option_id: staticExclusivity.id,
                            quantity_option_id: staticQuantity.id,
                            bandwidth_option_id: staticBandwidth.id,
                            location_id: locationUs.id,
                            additional_feature_id: feature != null ? feature.id : null,
                            discount_percent: 0,
                            amount_total: '270.00',
                            billing_cycle: 'monthly',
                            status: 'pending_payment',
                            created_at: now,
                            updated_at: now,
                        },
                        {
                            user_id: userId,
                            product_id: staticProduct.id,
                            exclusivity_option_id: staticExclusivity.id,
                            quantity_option_id: staticQuantity.id,
                            bandwidth_option_id: staticBandwidth.id,
                            location_id: locationGb.id,
                            additional_feature_id: null,
                            discount_percent: 10,
                            amount_total: '243.00',
                            billing_cycle: 'monthly',
                            status: 'paid',
                            created_at: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
                            updated_at: now,
                        },
                        {
                            user_id: userId,
                            product_id: rotatingProduct.id,
                            exclusivity_option_id: null,
                            quantity_option_id: null,
                            bandwidth_option_id: rotatingBandwidth.id,
                            location_id: locationRandom.id,
                            additional_feature_id: feature != null ? feature.id : null,
                            discount_percent: 0,
                            amount_total: '89.50',
                            billing_cycle: 'monthly',
                            status: 'active',
                            created_at: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
                            updated_at: now,
                        },
                    ];
                    return [4 /*yield*/, knex('proxy_orders')
                            .insert(ordersToInsert)
                            .returning('*')];
                case 14:
                    insertedOrders = _e.sent();
                    if (insertedOrders.length === 0) {
                        console.log('Seed proxy user purchases: no orders inserted.');
                        return [2 /*return*/];
                    }
                    paidOrderIds = insertedOrders
                        .filter(function (o) { return ['paid', 'active'].includes(o.status); })
                        .map(function (o) { return o.id; });
                    transactionsToInsert = paidOrderIds.map(function (proxy_order_id) { return ({
                        proxy_order_id: proxy_order_id,
                        type: 'payment',
                        amount: '243.00',
                        currency: 'USD',
                        payment_method_id: paymentMethodId,
                        external_id: "ext_".concat(proxy_order_id.slice(0, 8), "_").concat(Date.now()),
                        status: 'paid',
                        paid_at: now,
                        metadata: null,
                        created_at: now,
                        updated_at: now,
                    }); });
                    // Sửa amount cho đơn thứ 2 (active) nếu có 2 đơn paid
                    if (transactionsToInsert.length >= 2) {
                        transactionsToInsert[1].amount = '89.50';
                    }
                    return [4 /*yield*/, knex('proxy_transactions').insert(transactionsToInsert)];
                case 15:
                    _e.sent();
                    activeOrder = insertedOrders.find(function (o) { return o.status === 'active'; });
                    if (!activeOrder) return [3 /*break*/, 21];
                    proxyCount = 4;
                    locationsWithCountry = [
                        { location_id: locationRandom.id, country_code: 'US' },
                        { location_id: locationRandom.id, country_code: 'GB' },
                        { location_id: locationRandom.id, country_code: 'DE' },
                        { location_id: locationRandom.id, country_code: 'FR' },
                    ];
                    cities = {
                        US: 'New York',
                        GB: 'London',
                        DE: 'Berlin',
                        FR: 'Paris',
                    };
                    gen = fakeProxyAddresses(proxyCount);
                    proxiesToInsert = [];
                    proxyIdx = 0;
                    for (_i = 0, gen_1 = gen; _i < gen_1.length; _i++) {
                        _a = gen_1[_i], address = _a.address, port = _a.port;
                        loc = locationsWithCountry[proxyIdx % locationsWithCountry.length];
                        countryCode = loc.country_code;
                        proxiesToInsert.push({
                            user_id: userId,
                            address: address,
                            port: port,
                            username: "proxy_user_".concat(userId.slice(0, 8), "_").concat(proxyIdx),
                            password: "pw_".concat(proxyIdx, "_").concat(Date.now().toString(36)),
                            country_code: countryCode,
                            city: (_d = cities[countryCode]) !== null && _d !== void 0 ? _d : null,
                            status: proxyIdx === 0 ? 'inactive' : 'active',
                            last_checked_at: proxyIdx === 0 ? null : new Date(now.getTime() - 60 * 60 * 1000),
                            proxy_type: 'rotating_residential',
                            created_at: now,
                            updated_at: now,
                        });
                        proxyIdx++;
                    }
                    return [4 /*yield*/, knex('proxies').insert(proxiesToInsert)];
                case 16:
                    _e.sent();
                    return [4 /*yield*/, knex('proxies')
                            .where('user_id', userId)
                            .orderBy('id', 'desc')
                            .limit(proxyCount)];
                case 17:
                    proxyRows = _e.sent();
                    _b = 0, _c = proxyRows.slice(0, 2);
                    _e.label = 18;
                case 18:
                    if (!(_b < _c.length)) return [3 /*break*/, 21];
                    row = _c[_b];
                    return [4 /*yield*/, knex('proxy_check_logs').insert([
                            {
                                proxy_id: row.id,
                                checked_at: new Date(now.getTime() - 2 * 60 * 60 * 1000),
                                status: 'active',
                                created_at: now,
                            },
                            {
                                proxy_id: row.id,
                                checked_at: now,
                                status: 'active',
                                created_at: now,
                            },
                        ])];
                case 19:
                    _e.sent();
                    _e.label = 20;
                case 20:
                    _b++;
                    return [3 /*break*/, 18];
                case 21: return [4 /*yield*/, knex('user_proxy_country_filters')
                        .where('user_id', userId)
                        .first()];
                case 22:
                    existingFilters = _e.sent();
                    if (!!existingFilters) return [3 /*break*/, 24];
                    return [4 /*yield*/, knex('user_proxy_country_filters').insert([
                            { user_id: userId, country_code: 'US', created_at: now },
                            { user_id: userId, country_code: 'GB', created_at: now },
                            { user_id: userId, country_code: 'FR', created_at: now },
                        ])];
                case 23:
                    _e.sent();
                    _e.label = 24;
                case 24:
                    console.log('Seed proxy user purchases: done. Orders, transactions, proxies, check_logs, country_filters created.');
                    return [2 /*return*/];
            }
        });
    });
}
