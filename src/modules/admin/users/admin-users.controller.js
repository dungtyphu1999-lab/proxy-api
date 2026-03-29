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
exports.AdminUsersController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var use_admin_jwt_auth_guard_decorator_1 = require("../auth/decorators/use-admin-jwt-auth-guard.decorator");
var user_response_dto_1 = require("./dto/user-response.dto");
var AdminUsersController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('[Admin] - Users'), (0, swagger_1.ApiBearerAuth)(), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, common_1.Controller)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getAllUsers_decorators;
    var _updateUserStatus_decorators;
    var _resetPassword_decorators;
    var AdminUsersController = _classThis = /** @class */ (function () {
        function AdminUsersController_1(adminUsersService) {
            this.adminUsersService = (__runInitializers(this, _instanceExtraInitializers), adminUsersService);
        }
        AdminUsersController_1.prototype.getAllUsers = function (query) {
            return __awaiter(this, void 0, void 0, function () {
                var paginationOptions;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            paginationOptions = __assign(__assign({}, query.paginationOptions), { searchFields: query.searchFieldsArray.length > 0
                                    ? query.searchFieldsArray
                                    : ['users.email', 'users.username', 'user_profiles.full_name'], isLocked: query.isLocked, isVerified: query.isVerified });
                            return [4 /*yield*/, this.adminUsersService.findAllUsers(paginationOptions)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        AdminUsersController_1.prototype.updateUserStatus = function (id, data, user) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    if (!((_a = user === null || user === void 0 ? void 0 : user.user) === null || _a === void 0 ? void 0 : _a.id)) {
                        throw new common_1.UnauthorizedException('Invalid user payload');
                    }
                    return [2 /*return*/, this.adminUsersService.updateUserStatus(id, data, user.user.id)];
                });
            });
        };
        AdminUsersController_1.prototype.resetPassword = function (resetPasswordDto, admin) {
            return __awaiter(this, void 0, void 0, function () {
                var _a;
                return __generator(this, function (_b) {
                    if (!((_a = admin === null || admin === void 0 ? void 0 : admin.user) === null || _a === void 0 ? void 0 : _a.id)) {
                        throw new common_1.UnauthorizedException('Invalid admin payload');
                    }
                    return [2 /*return*/, this.adminUsersService.resetPassword(resetPasswordDto.userId)];
                });
            });
        };
        return AdminUsersController_1;
    }());
    __setFunctionName(_classThis, "AdminUsersController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getAllUsers_decorators = [(0, common_1.Get)(), (0, swagger_1.ApiOperation)({ summary: 'Get all users with pagination and filtering' }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Paginated list of users',
                type: [user_response_dto_1.UserResponseDto],
            })];
        _updateUserStatus_decorators = [(0, common_1.Patch)(':id/status'), (0, swagger_1.ApiOperation)({
                summary: 'Update user status',
                description: 'Update the status of a user (locked, unlocked)',
            }), (0, swagger_1.ApiParam)({
                name: 'id',
                description: 'User ID',
                example: '735d162f-8bfb-4198-9968-d7d46e5eafc0',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'User status updated successfully',
            }), (0, swagger_1.ApiResponse)({
                status: 404,
                description: 'User not found',
            })];
        _resetPassword_decorators = [(0, common_1.Post)('reset-password'), (0, swagger_1.ApiOperation)({ summary: 'Admin reset user password' }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Password reset successfully',
            }), (0, swagger_1.ApiResponse)({
                status: 404,
                description: 'User not found',
            })];
        __esDecorate(_classThis, null, _getAllUsers_decorators, { kind: "method", name: "getAllUsers", static: false, private: false, access: { has: function (obj) { return "getAllUsers" in obj; }, get: function (obj) { return obj.getAllUsers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateUserStatus_decorators, { kind: "method", name: "updateUserStatus", static: false, private: false, access: { has: function (obj) { return "updateUserStatus" in obj; }, get: function (obj) { return obj.updateUserStatus; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _resetPassword_decorators, { kind: "method", name: "resetPassword", static: false, private: false, access: { has: function (obj) { return "resetPassword" in obj; }, get: function (obj) { return obj.resetPassword; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AdminUsersController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AdminUsersController = _classThis;
}();
exports.AdminUsersController = AdminUsersController;
