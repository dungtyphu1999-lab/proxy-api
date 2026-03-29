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
exports.paginateQuery = paginateQuery;
exports.paginateUnionQuery = paginateUnionQuery;
exports.simplePaginate = simplePaginate;
var common_1 = require("@nestjs/common");
var pagination_constants_1 = require("./pagination.constants");
var pagination_helpers_1 = require("./pagination.helpers");
/**
 * Advanced pagination function with comprehensive features
 * @template T - Type of the data being paginated
 * @param qb - Knex query builder instance
 * @param options - Pagination configuration options
 * @param countDistinctField - Optional field for distinct counting
 * @returns Promise resolving to paginated results
 */
function paginateQuery(qb_1) {
    return __awaiter(this, arguments, void 0, function (qb, options, countDistinctField) {
        var _a, page, _b, limit, search, _c, searchFields, _d, orderBy, _e, orderDir, _f, filters, offset, sanitizedSearch, total, records, meta;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _a = options.page, page = _a === void 0 ? pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_PAGE : _a, _b = options.limit, limit = _b === void 0 ? pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_LIMIT : _b, search = options.search, _c = options.searchFields, searchFields = _c === void 0 ? [] : _c, _d = options.orderBy, orderBy = _d === void 0 ? pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_ORDER_BY : _d, _e = options.orderDir, orderDir = _e === void 0 ? pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_ORDER_DIR : _e, _f = options.filters, filters = _f === void 0 ? {} : _f;
                    // Validate pagination parameters
                    validatePaginationParams({ page: page, limit: limit, search: search, orderDir: orderDir });
                    offset = (0, pagination_helpers_1.calculateOffset)(page, limit);
                    sanitizedSearch = (0, pagination_helpers_1.sanitizeSearchTerm)(search);
                    // Apply filters with type safety
                    applyFilters(qb, filters);
                    // Apply search functionality
                    if (sanitizedSearch && searchFields.length > 0) {
                        applySearch(qb, sanitizedSearch, searchFields);
                    }
                    // Apply ordering with validation
                    applyOrdering(qb, orderBy, orderDir);
                    return [4 /*yield*/, executeCountQuery(qb, countDistinctField)];
                case 1:
                    total = _g.sent();
                    return [4 /*yield*/, executeDataQuery(qb, offset, limit)];
                case 2:
                    records = _g.sent();
                    meta = (0, pagination_helpers_1.createPaginationMeta)({ total: total, page: page, limit: limit });
                    return [2 /*return*/, { records: records, meta: meta }];
            }
        });
    });
}
function paginateUnionQuery(knex_1, qb_1) {
    return __awaiter(this, arguments, void 0, function (knex, qb, options) {
        var _a, page, _b, limit, search, _c, searchFields, _d, orderBy, _e, orderDir, offset, sanitizedSearch, wrapped, countQb, totalResult, total, dataQb, records, meta;
        if (options === void 0) { options = {}; }
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    _a = options.page, page = _a === void 0 ? pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_PAGE : _a, _b = options.limit, limit = _b === void 0 ? pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_LIMIT : _b, search = options.search, _c = options.searchFields, searchFields = _c === void 0 ? [] : _c, _d = options.orderBy, orderBy = _d === void 0 ? pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_ORDER_BY : _d, _e = options.orderDir, orderDir = _e === void 0 ? pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_ORDER_DIR : _e;
                    offset = (0, pagination_helpers_1.calculateOffset)(page, limit);
                    sanitizedSearch = (0, pagination_helpers_1.sanitizeSearchTerm)(search);
                    wrapped = qb.clone().as('u');
                    countQb = knex.queryBuilder().from(wrapped).count('* as total');
                    if (sanitizedSearch && searchFields.length > 0) {
                        countQb.where(function () {
                            for (var _i = 0, searchFields_1 = searchFields; _i < searchFields_1.length; _i++) {
                                var field = searchFields_1[_i];
                                this.orWhere(field, 'ilike', "%".concat(sanitizedSearch, "%"));
                            }
                        });
                    }
                    return [4 /*yield*/, countQb.first()];
                case 1:
                    totalResult = (_f.sent());
                    total = Number((totalResult === null || totalResult === void 0 ? void 0 : totalResult.total) || 0);
                    dataQb = knex.queryBuilder().from(wrapped).select('*');
                    if (sanitizedSearch && searchFields.length > 0) {
                        dataQb.where(function () {
                            for (var _i = 0, searchFields_2 = searchFields; _i < searchFields_2.length; _i++) {
                                var field = searchFields_2[_i];
                                this.orWhere(field, 'ilike', "%".concat(sanitizedSearch, "%"));
                            }
                        });
                    }
                    dataQb.orderBy(orderBy, orderDir).offset(offset).limit(limit);
                    return [4 /*yield*/, dataQb];
                case 2:
                    records = (_f.sent());
                    meta = (0, pagination_helpers_1.createPaginationMeta)({ total: total, page: page, limit: limit });
                    return [2 /*return*/, { records: records, meta: meta }];
            }
        });
    });
}
/**
 * Validates pagination parameters and throws appropriate errors
 */
function validatePaginationParams(params) {
    var page = params.page, limit = params.limit, search = params.search, orderDir = params.orderDir;
    if (page < 1) {
        throw new common_1.BadRequestException(pagination_constants_1.PAGINATION_ERRORS.INVALID_PAGE);
    }
    if (limit < pagination_constants_1.PAGINATION_CONSTANTS.MIN_LIMIT ||
        limit > pagination_constants_1.PAGINATION_CONSTANTS.MAX_LIMIT) {
        throw new common_1.BadRequestException(pagination_constants_1.PAGINATION_ERRORS.INVALID_LIMIT);
    }
    if (search && search.length > pagination_constants_1.PAGINATION_CONSTANTS.MAX_SEARCH_LENGTH) {
        throw new common_1.BadRequestException(pagination_constants_1.PAGINATION_ERRORS.SEARCH_TOO_LONG);
    }
    if (orderDir !== 'asc' && orderDir !== 'desc') {
        throw new common_1.BadRequestException(pagination_constants_1.PAGINATION_ERRORS.INVALID_ORDER_DIR);
    }
}
/**
 * Applies filters to the query builder
 */
function applyFilters(qb, filters) {
    Object.entries(filters).forEach(function (_a) {
        var field = _a[0], value = _a[1];
        if (value !== undefined && value !== null) {
            if (Array.isArray(value)) {
                // Handle array values with IN clause
                qb.whereIn(field, value);
            }
            else if (typeof value === 'object' && value !== null) {
                // Handle complex filter objects
                var filterObj = value;
                Object.entries(filterObj).forEach(function (_a) {
                    var operator = _a[0], filterValue = _a[1];
                    applyComplexFilter(qb, field, operator, filterValue);
                });
            }
            else {
                // Simple equality filter
                qb.where(field, value);
            }
        }
    });
}
/**
 * Applies complex filters with operators (gt, lt, like, etc.)
 */
function applyComplexFilter(qb, field, operator, value) {
    switch (operator) {
        case 'gt':
            if (typeof value === 'string' ||
                typeof value === 'number' ||
                value instanceof Date) {
                qb.where(field, '>', value);
            }
            break;
        case 'gte':
            if (typeof value === 'string' ||
                typeof value === 'number' ||
                value instanceof Date) {
                qb.where(field, '>=', value);
            }
            break;
        case 'lt':
            if (typeof value === 'string' ||
                typeof value === 'number' ||
                value instanceof Date) {
                qb.where(field, '<', value);
            }
            break;
        case 'lte':
            if (typeof value === 'string' ||
                typeof value === 'number' ||
                value instanceof Date) {
                qb.where(field, '<=', value);
            }
            break;
        case 'like':
            qb.where(field, 'like', "%".concat(String(value), "%"));
            break;
        case 'ilike':
            qb.whereILike(field, "%".concat(String(value), "%"));
            break;
        case 'not':
            qb.whereNot(field, value);
            break;
        case 'in':
            if (Array.isArray(value)) {
                qb.whereIn(field, value);
            }
            break;
        case 'notIn':
            if (Array.isArray(value)) {
                qb.whereNotIn(field, value);
            }
            break;
        case 'isNull':
            if (value === true) {
                qb.whereNull(field);
            }
            else if (value === false) {
                qb.whereNotNull(field);
            }
            break;
        default:
            qb.where(field, value);
    }
}
/**
 * Applies search functionality across multiple fields
 */
function applySearch(qb, search, searchFields) {
    qb.andWhere(function (builder) {
        searchFields.forEach(function (field, index) {
            if (index === 0) {
                builder.whereILike(field, "%".concat(search, "%"));
            }
            else {
                builder.orWhereILike(field, "%".concat(search, "%"));
            }
        });
    });
}
/**
 * Applies ordering to the query
 */
function applyOrdering(qb, orderBy, orderDir) {
    // Support for multiple order fields
    if (orderBy.includes(',')) {
        var orderFields = orderBy.split(',').map(function (field) { return field.trim(); });
        orderFields.forEach(function (field) {
            qb.orderBy(field, orderDir);
        });
    }
    else {
        qb.orderBy(orderBy, orderDir);
    }
}
/**
 * Executes count query and returns total number of records
 */
function executeCountQuery(qb, countDistinctField) {
    return __awaiter(this, void 0, void 0, function () {
        var countQuery, countResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    countQuery = qb.clone().clearSelect().clearOrder();
                    if (!countDistinctField) return [3 /*break*/, 2];
                    return [4 /*yield*/, countQuery
                            .countDistinct({ total: countDistinctField })
                            .first()];
                case 1:
                    countResult = (_a.sent());
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, countQuery.count({ total: '*' }).first()];
                case 3:
                    countResult = (_a.sent());
                    _a.label = 4;
                case 4: return [2 /*return*/, Number((countResult === null || countResult === void 0 ? void 0 : countResult.total) || 0)];
            }
        });
    });
}
/**
 * Executes data query with pagination and returns results
 */
function executeDataQuery(qb, offset, limit) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, qb.clone().offset(offset).limit(limit)];
                case 1:
                    result = _a.sent();
                    return [2 /*return*/, result];
            }
        });
    });
}
/**
 * Simple pagination utility for basic use cases
 */
function simplePaginate(qb_1) {
    return __awaiter(this, arguments, void 0, function (qb, page, limit) {
        if (page === void 0) { page = pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_PAGE; }
        if (limit === void 0) { limit = pagination_constants_1.PAGINATION_CONSTANTS.DEFAULT_LIMIT; }
        return __generator(this, function (_a) {
            return [2 /*return*/, paginateQuery(qb, { page: page, limit: limit })];
        });
    });
}
