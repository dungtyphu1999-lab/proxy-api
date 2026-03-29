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
var FEATURES = [
    {
        code: 'high-concurrency',
        title_vi: 'Đồng thời cao',
        title_en: 'High concurrency',
        price_per_month: 101.25,
        badge_type: 'popular',
    },
    {
        code: 'high-priority',
        title_vi: 'Mạng ưu tiên cao',
        title_en: 'High priority network',
        price_per_month: 66.5,
        badge_type: 'recommended',
    },
    {
        code: 'unlimited-ip',
        title_vi: 'Ủy quyền IP không giới hạn',
        title_en: 'Unlimited IP authorization',
        price_per_month: 5,
        badge_type: null,
    },
];
function seed(knex) {
    return __awaiter(this, void 0, void 0, function () {
        var now, i, row, exists, insertData;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    now = new Date();
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < FEATURES.length)) return [3 /*break*/, 7];
                    row = FEATURES[i];
                    return [4 /*yield*/, knex('proxy_additional_features')
                            .where('code', row.code)
                            .first()];
                case 2:
                    exists = _a.sent();
                    if (!exists) return [3 /*break*/, 4];
                    return [4 /*yield*/, knex('proxy_additional_features')
                            .where('code', row.code)
                            .update({
                            title_vi: row.title_vi,
                            title_en: row.title_en,
                            price_per_month: row.price_per_month,
                            badge_type: row.badge_type,
                            sort_order: i + 1,
                            updated_at: now,
                        })];
                case 3:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 4:
                    insertData = __assign(__assign({}, row), { sort_order: i + 1, is_active: true, created_at: now, updated_at: now });
                    return [4 /*yield*/, knex('proxy_additional_features').insert(insertData)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    i++;
                    return [3 /*break*/, 1];
                case 7: return [2 /*return*/];
            }
        });
    });
}
