"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderComplaintsRepository = void 0;
var common_1 = require("@nestjs/common");
var base_repository_1 = require("@/database/repositories/base.repository");
var order_complaint_entity_1 = require("@/database/entities/order-complaint.entity");
var OrderComplaintsRepository = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _classSuper = base_repository_1.BaseRepository;
    var OrderComplaintsRepository = _classThis = /** @class */ (function (_super) {
        __extends(OrderComplaintsRepository_1, _super);
        function OrderComplaintsRepository_1() {
            return _super.call(this, 'order_complaints') || this;
        }
        /**
         * Get order by ID with shop info for complaint validation
         */
        OrderComplaintsRepository_1.prototype.getOrderForComplaint = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.knexInstance
                                .select([
                                'orders.id',
                                'orders.buyer_id',
                                'orders.shop_id',
                                'orders.status',
                                'orders.created_at',
                                'orders.order_number',
                                'shops.name as shop_name',
                            ])
                                .from('orders')
                                .leftJoin('shops', 'orders.shop_id', 'shops.id')
                                .where('orders.id', orderId)
                                .first()];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result !== null && result !== void 0 ? result : null];
                    }
                });
            });
        };
        /**
         * Check if order already has a complaint
         */
        OrderComplaintsRepository_1.prototype.hasExistingComplaint = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb.where('order_id', orderId).first()];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, !!result];
                    }
                });
            });
        };
        /**
         * Create complaint with transaction support
         */
        OrderComplaintsRepository_1.prototype.createComplaint = function (data, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var query, insertData, complaint;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = trx ? trx('order_complaints') : this.qb;
                            insertData = {
                                order_id: data.order_id,
                                complainant_id: data.complainant_id,
                                shop_id: data.shop_id,
                                type: data.type,
                                title: data.title,
                                description: data.description,
                                status: data.status,
                                priority: data.priority || 'medium',
                            };
                            if (data.evidence_images && data.evidence_images.length > 0) {
                                insertData.evidence_images = JSON.stringify(data.evidence_images);
                            }
                            if (data.reason_detail) {
                                insertData.reason_detail = data.reason_detail;
                            }
                            if (data.requested_resolution) {
                                insertData.requested_resolution = data.requested_resolution;
                            }
                            return [4 /*yield*/, query.insert(insertData).returning('*')];
                        case 1:
                            complaint = (_a.sent())[0];
                            return [2 /*return*/, complaint];
                    }
                });
            });
        };
        /**
         * Create status log
         */
        OrderComplaintsRepository_1.prototype.createStatusLog = function (data, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var query, log;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = trx
                                ? trx('complaint_status_logs')
                                : this.knexInstance('complaint_status_logs');
                            return [4 /*yield*/, query.insert(data).returning('*')];
                        case 1:
                            log = (_a.sent())[0];
                            return [2 /*return*/, log];
                    }
                });
            });
        };
        /**
         * Get complaint by ID with status logs
         */
        OrderComplaintsRepository_1.prototype.getComplaintWithDetails = function (complaintId) {
            return __awaiter(this, void 0, void 0, function () {
                var complaint, status_logs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb.where('id', complaintId).first()];
                        case 1:
                            complaint = _a.sent();
                            if (!complaint)
                                return [2 /*return*/, null];
                            return [4 /*yield*/, this.knexInstance('complaint_status_logs')
                                    .where('complaint_id', complaintId)
                                    .orderBy('created_at', 'asc')];
                        case 2:
                            status_logs = _a.sent();
                            return [2 /*return*/, { complaint: complaint, status_logs: status_logs }];
                    }
                });
            });
        };
        /**
         * Count unresolved complaints for a shop
         */
        OrderComplaintsRepository_1.prototype.countUnresolvedComplaintsForShop = function (shopId, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var query, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = trx ? trx('order_complaints') : this.qb;
                            return [4 /*yield*/, query
                                    .where('shop_id', shopId)
                                    .whereNotIn('status', order_complaint_entity_1.RESOLVED_STATUSES)
                                    .count('* as count')
                                    .first()];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, parseInt((result === null || result === void 0 ? void 0 : result.count) || '0', 10)];
                    }
                });
            });
        };
        /**
         * Update shop complaint restriction status
         */
        OrderComplaintsRepository_1.prototype.updateShopRestriction = function (shopId, isRestricted, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var query;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = trx ? trx('shops') : this.knexInstance('shops');
                            return [4 /*yield*/, query.where('id', shopId).update({
                                    is_complaint_restricted: isRestricted,
                                    complaint_restricted_at: isRestricted ? new Date() : null,
                                    updated_at: new Date(),
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Get knex transaction
         */
        OrderComplaintsRepository_1.prototype.getTransaction = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.knexInstance.transaction()];
                });
            });
        };
        /**
         * Get complaint by ID
         */
        OrderComplaintsRepository_1.prototype.getComplaintById = function (complaintId) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb.where('id', complaintId).first()];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result !== null && result !== void 0 ? result : null];
                    }
                });
            });
        };
        /**
         * Update complaint status
         */
        OrderComplaintsRepository_1.prototype.updateComplaintStatus = function (complaintId, status, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var query, updateData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = trx ? trx('order_complaints') : this.qb;
                            updateData = {
                                status: status,
                                updated_at: new Date(),
                            };
                            // Set dismissed_at if status is dismissed
                            if (status === 'dismissed') {
                                updateData.closed_at = new Date();
                            }
                            return [4 /*yield*/, query.where('id', complaintId).update(updateData)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Update complaint fields (for user to update their complaint)
         */
        OrderComplaintsRepository_1.prototype.updateComplaint = function (complaintId, data, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var query, updateData, selectQuery, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = trx ? trx('order_complaints') : this.qb;
                            updateData = {
                                type: data.type,
                                title: data.title.trim(),
                                description: data.description.trim(),
                                updated_at: new Date(),
                            };
                            // Only update evidence_images if it's explicitly provided
                            // - undefined: keep existing images (don't update)
                            // - []: clear all images (intentional deletion)
                            // - [urls...]: update with new images
                            if (data.evidence_images !== undefined) {
                                updateData.evidence_images = JSON.stringify(data.evidence_images);
                            }
                            if (data.reason_detail) {
                                updateData.reason_detail = data.reason_detail.trim();
                            }
                            else {
                                updateData.reason_detail = null;
                            }
                            if (data.requested_resolution) {
                                updateData.requested_resolution = data.requested_resolution;
                            }
                            return [4 /*yield*/, query.where('id', complaintId).update(updateData)];
                        case 1:
                            _a.sent();
                            selectQuery = trx
                                ? trx('order_complaints')
                                : this.knexInstance('order_complaints');
                            return [4 /*yield*/, selectQuery.where('id', complaintId).first()];
                        case 2:
                            updated = _a.sent();
                            if (!updated) {
                                throw new Error('Failed to update complaint');
                            }
                            return [2 /*return*/, updated];
                    }
                });
            });
        };
        /**
         * Get complaint by order ID with full details (order, shop, items, status logs)
         */
        OrderComplaintsRepository_1.prototype.getComplaintByOrderId = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var complaint, order, knex, items, statusLogs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb.where('order_id', orderId).first()];
                        case 1:
                            complaint = _a.sent();
                            if (!complaint)
                                return [2 /*return*/, null];
                            return [4 /*yield*/, this.knexInstance
                                    .select([
                                    'orders.id',
                                    'orders.order_number',
                                    'orders.total_amount',
                                    'orders.status',
                                    'orders.created_at',
                                    'shops.id as shop_id',
                                    'shops.name as shop_name',
                                    'shops.avatar_url as shop_avatar_url',
                                ])
                                    .from('orders')
                                    .leftJoin('shops', 'orders.shop_id', 'shops.id')
                                    .where('orders.id', orderId)
                                    .first()];
                        case 2:
                            order = _a.sent();
                            if (!order)
                                return [2 /*return*/, null];
                            knex = this.knexInstance;
                            return [4 /*yield*/, knex
                                    .select([
                                    'order_items.id',
                                    'order_items.product_id',
                                    'order_items.quantity',
                                    'order_items.total_price',
                                    'order_items.final_price',
                                    'product_versions.name as product_name',
                                    'pvi.file_path as product_image',
                                ])
                                    .from('order_items')
                                    .leftJoin('product_versions', 'order_items.product_version_id', 'product_versions.id')
                                    .leftJoin('product_version_images as pvi', function () {
                                    this.on('product_versions.id', '=', 'pvi.product_version_id').andOn('pvi.is_primary', '=', knex.raw('true'));
                                })
                                    .where('order_items.order_id', orderId)];
                        case 3:
                            items = _a.sent();
                            return [4 /*yield*/, this.knexInstance('complaint_status_logs')
                                    .where('complaint_id', complaint.id)
                                    .orderBy('created_at', 'asc')];
                        case 4:
                            statusLogs = _a.sent();
                            return [2 /*return*/, {
                                    complaint: complaint,
                                    order: {
                                        id: order.id,
                                        order_number: order.order_number,
                                        total_amount: Number(order.total_amount),
                                        status: order.status,
                                        created_at: order.created_at,
                                    },
                                    shop: {
                                        id: order.shop_id,
                                        name: order.shop_name,
                                        avatar_url: order.shop_avatar_url,
                                    },
                                    items: items.map(function (item) { return ({
                                        id: item.id,
                                        product_id: item.product_id,
                                        product_name: item.product_name || 'Unknown Product',
                                        product_image: item.product_image || null,
                                        quantity: item.quantity,
                                        total_price: Number(item.total_price),
                                        final_price: Number(item.final_price),
                                    }); }),
                                    status_logs: statusLogs,
                                }];
                    }
                });
            });
        };
        /**
         * Get complaint detail by complaint ID for shop owner
         * Includes buyer info instead of shop info
         */
        OrderComplaintsRepository_1.prototype.getComplaintDetailForShop = function (complaintId, shopId) {
            return __awaiter(this, void 0, void 0, function () {
                var complaint, order, knex, items, statusLogs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.qb.where('id', complaintId).first()];
                        case 1:
                            complaint = _a.sent();
                            if (!complaint)
                                return [2 /*return*/, null];
                            // Verify shop owns this complaint
                            if (complaint.shop_id !== shopId) {
                                return [2 /*return*/, null];
                            }
                            return [4 /*yield*/, this.knexInstance
                                    .select([
                                    'orders.id',
                                    'orders.order_number',
                                    'orders.total_amount',
                                    'orders.status',
                                    'orders.created_at',
                                    'orders.buyer_id',
                                    'users.username as buyer_username',
                                    'user_profiles.avatar_url as buyer_avatar_url',
                                ])
                                    .from('orders')
                                    .leftJoin('users', 'orders.buyer_id', 'users.id')
                                    .leftJoin('user_profiles', 'users.id', 'user_profiles.user_id')
                                    .where('orders.id', complaint.order_id)
                                    .first()];
                        case 2:
                            order = _a.sent();
                            if (!order)
                                return [2 /*return*/, null];
                            knex = this.knexInstance;
                            return [4 /*yield*/, knex
                                    .select([
                                    'order_items.id',
                                    'order_items.product_id',
                                    'order_items.quantity',
                                    'order_items.total_price',
                                    'order_items.final_price',
                                    'product_versions.name as product_name',
                                    'pvi.file_path as product_image',
                                ])
                                    .from('order_items')
                                    .leftJoin('product_versions', 'order_items.product_version_id', 'product_versions.id')
                                    .leftJoin('product_version_images as pvi', function () {
                                    this.on('product_versions.id', '=', 'pvi.product_version_id').andOn('pvi.is_primary', '=', knex.raw('true'));
                                })
                                    .where('order_items.order_id', complaint.order_id)];
                        case 3:
                            items = _a.sent();
                            return [4 /*yield*/, this.knexInstance('complaint_status_logs')
                                    .where('complaint_id', complaint.id)
                                    .orderBy('created_at', 'asc')];
                        case 4:
                            statusLogs = _a.sent();
                            return [2 /*return*/, {
                                    complaint: complaint,
                                    order: {
                                        id: order.id,
                                        order_number: order.order_number,
                                        total_amount: Number(order.total_amount),
                                        status: order.status,
                                        created_at: order.created_at,
                                    },
                                    buyer: {
                                        id: order.buyer_id,
                                        username: order.buyer_username || 'Unknown',
                                        avatar_url: order.buyer_avatar_url,
                                    },
                                    items: items.map(function (item) { return ({
                                        id: item.id,
                                        product_id: item.product_id,
                                        product_name: item.product_name || 'Unknown Product',
                                        product_image: item.product_image || null,
                                        quantity: item.quantity,
                                        total_price: Number(item.total_price),
                                        final_price: Number(item.final_price),
                                    }); }),
                                    status_logs: statusLogs,
                                }];
                    }
                });
            });
        };
        /**
         * Get order total amount by order ID
         */
        OrderComplaintsRepository_1.prototype.getOrderTotalAmount = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.knexInstance('orders')
                                .select('total_amount')
                                .where('id', orderId)
                                .first()];
                        case 1:
                            order = _a.sent();
                            if (!order)
                                return [2 /*return*/, null];
                            return [2 /*return*/, Number(order.total_amount)];
                    }
                });
            });
        };
        /**
         * Get order with shop amount (total_amount - commission)
         * This is the amount that was added to shop's locked_balance
         */
        OrderComplaintsRepository_1.prototype.getOrderWithShopAmount = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                var order, totalAmount, orderItemsResult, orderItems, totalCommission, _i, orderItems_1, item, finalPrice, commissionRate, commission, shopAmount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.knexInstance('orders')
                                .select('total_amount')
                                .where('id', orderId)
                                .first()];
                        case 1:
                            order = _a.sent();
                            if (!order)
                                return [2 /*return*/, null];
                            totalAmount = Number(order.total_amount);
                            return [4 /*yield*/, this.knexInstance('order_items')
                                    .select([
                                    'order_items.final_price',
                                    'order_items.category_commissions_id',
                                    'category_commissions.commission_rate',
                                ])
                                    .leftJoin('category_commissions', 'order_items.category_commissions_id', 'category_commissions.id')
                                    .where('order_items.order_id', orderId)];
                        case 2:
                            orderItemsResult = _a.sent();
                            orderItems = orderItemsResult;
                            totalCommission = 0;
                            for (_i = 0, orderItems_1 = orderItems; _i < orderItems_1.length; _i++) {
                                item = orderItems_1[_i];
                                finalPrice = Number(item.final_price || 0);
                                commissionRate = Number(item.commission_rate || 0);
                                commission = finalPrice * (commissionRate / 100);
                                totalCommission += commission;
                            }
                            shopAmount = totalAmount - totalCommission;
                            return [2 /*return*/, {
                                    total_amount: totalAmount,
                                    shop_amount: Number(shopAmount.toFixed(2)),
                                }];
                    }
                });
            });
        };
        /**
         * Update payment_release_status of order
         */
        OrderComplaintsRepository_1.prototype.updateOrderPaymentReleaseStatus = function (orderId, paymentReleaseStatus, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var query;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = trx ? trx('orders') : this.knexInstance('orders');
                            return [4 /*yield*/, query.where('id', orderId).update({
                                    payment_release_status: paymentReleaseStatus,
                                    updated_at: new Date(),
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Update complaint response from shop
         */
        OrderComplaintsRepository_1.prototype.updateComplaintResponse = function (complaintId, shopId, data, trx) {
            return __awaiter(this, void 0, void 0, function () {
                var query, complaint, newStatus, updateData, selectQuery, updated;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = trx ? trx('order_complaints') : this.qb;
                            return [4 /*yield*/, query.where('id', complaintId).first()];
                        case 1:
                            complaint = _a.sent();
                            if (!complaint || complaint.shop_id !== shopId) {
                                throw new Error('Complaint not found or shop does not own this complaint');
                            }
                            newStatus = 'shop_responded';
                            updateData = {
                                status: newStatus,
                                updated_at: new Date(),
                            };
                            if (data.action === 'refund') {
                                updateData.resolution_type = 'refund';
                                updateData.refund_amount = data.refund_amount;
                                updateData.resolution =
                                    data.resolution_message || 'Đã hoàn tiền cho khách hàng';
                            }
                            else if (data.action === 'update_product') {
                                updateData.resolution_type = 'replacement';
                                updateData.resolution =
                                    data.resolution_message || 'Đã cập nhật sản phẩm / link download mới';
                            }
                            return [4 /*yield*/, query.where('id', complaintId).update(updateData)];
                        case 2:
                            _a.sent();
                            selectQuery = trx
                                ? trx('order_complaints')
                                : this.knexInstance('order_complaints');
                            return [4 /*yield*/, selectQuery.where('id', complaintId).first()];
                        case 3:
                            updated = _a.sent();
                            if (!updated) {
                                throw new Error('Failed to update complaint');
                            }
                            return [2 /*return*/, updated];
                    }
                });
            });
        };
        /**
         * Get complaints by shop_id with filters, search, and pagination
         */
        OrderComplaintsRepository_1.prototype.getComplaintsByShopId = function (shopId, options) {
            return __awaiter(this, void 0, void 0, function () {
                var search, _a, statusFilter, _b, orderBy, _c, orderDir, _d, page, _e, limit, baseQuery, countQuery, countResult, total, offset, records, totalPages, hasPreviousPage, hasNextPage;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            search = options.search, _a = options.statusFilter, statusFilter = _a === void 0 ? 'all' : _a, _b = options.orderBy, orderBy = _b === void 0 ? 'order_complaints.created_at' : _b, _c = options.orderDir, orderDir = _c === void 0 ? 'desc' : _c, _d = options.page, page = _d === void 0 ? 1 : _d, _e = options.limit, limit = _e === void 0 ? 10 : _e;
                            baseQuery = this.knexInstance
                                .select([
                                'order_complaints.id',
                                'order_complaints.created_at',
                                'order_complaints.order_id',
                                'order_complaints.status',
                                'order_complaints.title as reason',
                                'orders.order_number',
                                // Get first product from order items
                                this.knexInstance.raw("(\n            SELECT product_versions.product_id\n            FROM order_items\n            LEFT JOIN product_versions ON order_items.product_version_id = product_versions.id\n            WHERE order_items.order_id = orders.id\n            LIMIT 1\n          ) as product_id"),
                                this.knexInstance.raw("(\n            SELECT product_versions.name\n            FROM order_items\n            LEFT JOIN product_versions ON order_items.product_version_id = product_versions.id\n            WHERE order_items.order_id = orders.id\n            LIMIT 1\n          ) as product_name"),
                                this.knexInstance.raw("(\n            SELECT pvi.file_path\n            FROM order_items\n            LEFT JOIN product_versions ON order_items.product_version_id = product_versions.id\n            LEFT JOIN product_version_images as pvi ON product_versions.id = pvi.product_version_id AND pvi.is_primary = true\n            WHERE order_items.order_id = orders.id\n            LIMIT 1\n          ) as product_image"),
                            ])
                                .from('order_complaints')
                                .leftJoin('orders', 'order_complaints.order_id', 'orders.id')
                                .where('order_complaints.shop_id', shopId);
                            // Apply status filter
                            if (statusFilter === 'all') {
                                // No filter - show all statuses
                            }
                            else if (statusFilter === 'pending') {
                                baseQuery.where('order_complaints.status', 'pending');
                            }
                            else if (statusFilter === 'shop_responded') {
                                baseQuery.where('order_complaints.status', 'shop_responded');
                            }
                            else if (statusFilter === 'admin_review') {
                                baseQuery.where('order_complaints.status', 'admin_review');
                            }
                            else if (statusFilter === 'resolved') {
                                baseQuery.where('order_complaints.status', 'resolved');
                            }
                            else if (statusFilter === 'rejected') {
                                baseQuery.where('order_complaints.status', 'rejected');
                            }
                            else if (statusFilter === 'cancelled') {
                                baseQuery.where('order_complaints.status', 'cancelled');
                            }
                            else if (statusFilter === 'closed') {
                                baseQuery.where('order_complaints.status', 'closed');
                            }
                            else if (statusFilter === 'responded') {
                                // Legacy filter: show shop_responded, resolved, closed
                                baseQuery.whereIn('order_complaints.status', [
                                    'shop_responded',
                                    'resolved',
                                    'closed',
                                ]);
                            }
                            else if (statusFilter === 'dismissed') {
                                baseQuery.where('order_complaints.status', 'dismissed');
                            }
                            else if (statusFilter === 'investigating') {
                                baseQuery.where('order_complaints.status', 'investigating');
                            }
                            // Apply search by order_number
                            if (search && search.trim()) {
                                baseQuery.where('orders.order_number', 'ilike', "%".concat(search.trim(), "%"));
                            }
                            countQuery = baseQuery.clone().clearSelect().clearOrder();
                            return [4 /*yield*/, countQuery
                                    .count('order_complaints.id as total')
                                    .first()];
                        case 1:
                            countResult = _f.sent();
                            total = Number((countResult === null || countResult === void 0 ? void 0 : countResult.total) || 0);
                            // Apply ordering
                            baseQuery.orderBy(orderBy, orderDir);
                            offset = (page - 1) * limit;
                            return [4 /*yield*/, baseQuery.offset(offset).limit(limit)];
                        case 2:
                            records = (_f.sent());
                            totalPages = Math.ceil(total / limit);
                            hasPreviousPage = page > 1;
                            hasNextPage = page < totalPages;
                            return [2 /*return*/, {
                                    records: records.map(function (record) { return ({
                                        id: record.id,
                                        created_at: record.created_at,
                                        order_number: record.order_number,
                                        order_id: record.order_id,
                                        product: {
                                            id: record.product_id || '',
                                            name: record.product_name ||
                                                'Unknown Product',
                                            image: record.product_image ||
                                                null,
                                        },
                                        reason: record.reason,
                                        status: record.status,
                                    }); }),
                                    meta: {
                                        total: total,
                                        page: page,
                                        limit: limit,
                                        totalPages: totalPages,
                                        hasPreviousPage: hasPreviousPage,
                                        hasNextPage: hasNextPage,
                                        previousPage: hasPreviousPage ? page - 1 : null,
                                        nextPage: hasNextPage ? page + 1 : null,
                                    },
                                }];
                    }
                });
            });
        };
        return OrderComplaintsRepository_1;
    }(_classSuper));
    __setFunctionName(_classThis, "OrderComplaintsRepository");
    (function () {
        var _a;
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OrderComplaintsRepository = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OrderComplaintsRepository = _classThis;
}();
exports.OrderComplaintsRepository = OrderComplaintsRepository;
