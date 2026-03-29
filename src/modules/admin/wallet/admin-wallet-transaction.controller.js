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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
exports.AdminWalletTransactionController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var get_withdrawals_response_dto_1 = require("./dto/get-withdrawals-response.dto");
var use_admin_jwt_auth_guard_decorator_1 = require("../auth/decorators/use-admin-jwt-auth-guard.decorator");
var file_upload_decorators_1 = require("@/modules/file-upload/file-upload.decorators");
var file_upload_dtos_1 = require("@/modules/file-upload/file-upload.dtos");
var AdminWalletTransactionController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('[Admin] Wallet Transaction'), (0, common_1.Controller)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getWithdrawals_decorators;
    var _approveWithdraw_decorators;
    var _rejectWithdraw_decorators;
    var _getWalletSettings_decorators;
    var _updateWalletSettings_decorators;
    var _releaseLockedBalance_decorators;
    var AdminWalletTransactionController = _classThis = /** @class */ (function () {
        function AdminWalletTransactionController_1(adminWalletTransactionService, walletSettingsService, walletReleaseService) {
            this.adminWalletTransactionService = (__runInitializers(this, _instanceExtraInitializers), adminWalletTransactionService);
            this.walletSettingsService = walletSettingsService;
            this.walletReleaseService = walletReleaseService;
        }
        AdminWalletTransactionController_1.prototype.getWithdrawals = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var paginationOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            paginationOptions = __assign(__assign({}, query.paginationOptions), { searchFields: query.searchFieldsArray.length > 0
                                    ? query.searchFieldsArray
                                    : ['transaction_number', 'note', 'users.email', 'users.username'], status: query.status, authorId: query.authorId, typeTransaction: query.typeTransaction });
                            return [4 /*yield*/, this.adminWalletTransactionService.getWithdrawalsWithPagination(paginationOptions)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AdminWalletTransactionController_1.prototype.approveWithdraw = function (transactionId, file, req) {
            return __awaiter(this, void 0, void 0, function () {
                var error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.adminWalletTransactionService.approveWithdraw(transactionId, file, req.user.sub)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            if (error_1 instanceof common_1.NotFoundException) {
                                throw new common_1.NotFoundException('Transaction not found');
                            }
                            throw error_1;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AdminWalletTransactionController_1.prototype.rejectWithdraw = function (transactionId, rejectWithdrawDto, req) {
            return __awaiter(this, void 0, void 0, function () {
                var error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.adminWalletTransactionService.rejectWithdraw(transactionId, rejectWithdrawDto.note, req.user.sub)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _a.sent();
                            if (error_2 instanceof common_1.NotFoundException) {
                                throw new common_1.NotFoundException('Transaction not found');
                            }
                            throw error_2;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        AdminWalletTransactionController_1.prototype.getWalletSettings = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.walletSettingsService.getSettings()];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AdminWalletTransactionController_1.prototype.updateWalletSettings = function (updateData) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.walletSettingsService.updateSettings(updateData)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AdminWalletTransactionController_1.prototype.releaseLockedBalance = function () {
            return __awaiter(this, void 0, void 0, function () {
                var results, successCount, failedCount;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.walletReleaseService.releaseLockedBalanceToSaleBalance()];
                        case 1:
                            results = _a.sent();
                            successCount = results.filter(function (r) { return r.success; }).length;
                            failedCount = results.filter(function (r) { return !r.success; }).length;
                            return [2 /*return*/, {
                                    success: true,
                                    message: "Release process completed. Success: ".concat(successCount, ", Failed/Skipped: ").concat(failedCount),
                                    results: results,
                                }];
                    }
                });
            });
        };
        return AdminWalletTransactionController_1;
    }());
    __setFunctionName(_classThis, "AdminWalletTransactionController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getWithdrawals_decorators = [(0, common_1.Get)('transactions'), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'Get all withdraw requests with pagination',
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Withdraw requests retrieved successfully',
                type: get_withdrawals_response_dto_1.GetWithdrawalsResponseDto,
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })];
        _approveWithdraw_decorators = [(0, common_1.Post)('withdrawals/:transactionId/approve'), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, file_upload_decorators_1.UseImageUpload)('file'), (0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiOperation)({ summary: 'Approve withdraw request' }), (0, swagger_1.ApiParam)({ name: 'transactionId', type: String }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Withdraw request approved successfully',
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.NOT_FOUND,
                description: 'Transaction not found',
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Unauthorized' }), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiBody)({ type: file_upload_dtos_1.UploadImageInputDto })];
        _rejectWithdraw_decorators = [(0, common_1.Post)('withdrawals/:transactionId/reject'), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, swagger_1.ApiOperation)({ summary: 'Reject withdraw request' }), (0, swagger_1.ApiParam)({ name: 'transactionId', type: String }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Withdraw request rejected successfully',
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.NOT_FOUND,
                description: 'Transaction not found',
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Unauthorized' }), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _getWalletSettings_decorators = [(0, common_1.Get)('settings'), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'Get wallet settings',
                description: 'Get current wallet settings including money holding days',
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Wallet settings retrieved successfully',
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })];
        _updateWalletSettings_decorators = [(0, common_1.Put)('settings'), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'Update wallet settings',
                description: 'Update wallet settings including money holding days',
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Wallet settings updated successfully',
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Unauthorized' }), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        _releaseLockedBalance_decorators = [(0, common_1.Post)('release-locked-balance'), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'Manually trigger release of locked balance to sale balance',
                description: 'Manually trigger the process to release money from locked_balance to sale_balance for eligible orders. This is useful for testing or manual intervention.',
            }), (0, swagger_1.ApiResponse)({
                status: common_1.HttpStatus.OK,
                description: 'Release process completed',
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.UNAUTHORIZED, description: 'Unauthorized' }), (0, common_1.HttpCode)(common_1.HttpStatus.OK)];
        __esDecorate(_classThis, null, _getWithdrawals_decorators, { kind: "method", name: "getWithdrawals", static: false, private: false, access: { has: function (obj) { return "getWithdrawals" in obj; }, get: function (obj) { return obj.getWithdrawals; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _approveWithdraw_decorators, { kind: "method", name: "approveWithdraw", static: false, private: false, access: { has: function (obj) { return "approveWithdraw" in obj; }, get: function (obj) { return obj.approveWithdraw; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _rejectWithdraw_decorators, { kind: "method", name: "rejectWithdraw", static: false, private: false, access: { has: function (obj) { return "rejectWithdraw" in obj; }, get: function (obj) { return obj.rejectWithdraw; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getWalletSettings_decorators, { kind: "method", name: "getWalletSettings", static: false, private: false, access: { has: function (obj) { return "getWalletSettings" in obj; }, get: function (obj) { return obj.getWalletSettings; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateWalletSettings_decorators, { kind: "method", name: "updateWalletSettings", static: false, private: false, access: { has: function (obj) { return "updateWalletSettings" in obj; }, get: function (obj) { return obj.updateWalletSettings; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _releaseLockedBalance_decorators, { kind: "method", name: "releaseLockedBalance", static: false, private: false, access: { has: function (obj) { return "releaseLockedBalance" in obj; }, get: function (obj) { return obj.releaseLockedBalance; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminWalletTransactionController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminWalletTransactionController = _classThis;
}();
exports.AdminWalletTransactionController = AdminWalletTransactionController;
