"use strict";
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
exports.WebshareAdminController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var use_admin_jwt_auth_guard_decorator_1 = require("@/modules/admin/auth/decorators/use-admin-jwt-auth-guard.decorator");
var WebshareAdminController = function () {
    var _classDecorators = [(0, swagger_1.ApiTags)('[Admin] Webshare'), (0, common_1.Controller)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _getConfig_decorators;
    var _updateConfig_decorators;
    var _getDashboard_decorators;
    var _testConnection_decorators;
    var _getManagedSubUsers_decorators;
    var _getManagedSubUserOrdersByUser_decorators;
    var _refreshManagedSubUser_decorators;
    var _revokeManagedSubUser_decorators;
    var WebshareAdminController = _classThis = /** @class */ (function () {
        function WebshareAdminController_1(webshareAdminService) {
            this.webshareAdminService = (__runInitializers(this, _instanceExtraInitializers), webshareAdminService);
        }
        WebshareAdminController_1.prototype.getConfig = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.webshareAdminService.getConfig()];
                });
            });
        };
        WebshareAdminController_1.prototype.updateConfig = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.webshareAdminService.updateConfig(body)];
                });
            });
        };
        WebshareAdminController_1.prototype.getDashboard = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.webshareAdminService.getDashboard()];
                });
            });
        };
        WebshareAdminController_1.prototype.testConnection = function (body) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.webshareAdminService.testConnection(body)];
                });
            });
        };
        WebshareAdminController_1.prototype.getManagedSubUsers = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.webshareAdminService.getManagedSubUsers()];
                });
            });
        };
        WebshareAdminController_1.prototype.getManagedSubUserOrdersByUser = function (userId, query) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.webshareAdminService.getManagedSubUserOrdersByUser(userId, query)];
                });
            });
        };
        WebshareAdminController_1.prototype.refreshManagedSubUser = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.webshareAdminService.refreshManagedSubUser(orderId)];
                });
            });
        };
        WebshareAdminController_1.prototype.revokeManagedSubUser = function (orderId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.webshareAdminService.revokeManagedSubUser(orderId)];
                });
            });
        };
        return WebshareAdminController_1;
    }());
    __setFunctionName(_classThis, "WebshareAdminController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _getConfig_decorators = [(0, common_1.Get)('config'), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'Get Webshare config managed from admin',
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Webshare config' })];
        _updateConfig_decorators = [(0, common_1.Put)('config'), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, common_1.HttpCode)(common_1.HttpStatus.OK), (0, swagger_1.ApiOperation)({
                summary: 'Update Webshare config',
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Updated config' })];
        _getDashboard_decorators = [(0, common_1.Get)('dashboard'), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'Get Webshare pools health dashboard',
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Dashboard rows' })];
        _testConnection_decorators = [(0, common_1.Post)('test-connection'), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'Test Webshare API key connection',
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Connection status' })];
        _getManagedSubUsers_decorators = [(0, common_1.Get)('sub-users'), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'List managed Webshare proxy orders grouped by user',
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Managed users/orders' })];
        _getManagedSubUserOrdersByUser_decorators = [(0, common_1.Get)('sub-users/users/:userId/orders'), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'List managed proxy orders for one user in Webshare admin',
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Managed proxy orders by user' })];
        _refreshManagedSubUser_decorators = [(0, common_1.Post)('sub-users/:orderId/refresh'), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'Refresh one managed proxy order from Webshare',
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Refreshed proxy order' })];
        _revokeManagedSubUser_decorators = [(0, common_1.Post)('sub-users/:orderId/revoke'), (0, use_admin_jwt_auth_guard_decorator_1.UseAdminJwtAuthGuard)(), (0, swagger_1.ApiOperation)({
                summary: 'Revoke one managed proxy order',
            }), (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'Revoked proxy order' })];
        __esDecorate(_classThis, null, _getConfig_decorators, { kind: "method", name: "getConfig", static: false, private: false, access: { has: function (obj) { return "getConfig" in obj; }, get: function (obj) { return obj.getConfig; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateConfig_decorators, { kind: "method", name: "updateConfig", static: false, private: false, access: { has: function (obj) { return "updateConfig" in obj; }, get: function (obj) { return obj.updateConfig; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getDashboard_decorators, { kind: "method", name: "getDashboard", static: false, private: false, access: { has: function (obj) { return "getDashboard" in obj; }, get: function (obj) { return obj.getDashboard; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _testConnection_decorators, { kind: "method", name: "testConnection", static: false, private: false, access: { has: function (obj) { return "testConnection" in obj; }, get: function (obj) { return obj.testConnection; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getManagedSubUsers_decorators, { kind: "method", name: "getManagedSubUsers", static: false, private: false, access: { has: function (obj) { return "getManagedSubUsers" in obj; }, get: function (obj) { return obj.getManagedSubUsers; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getManagedSubUserOrdersByUser_decorators, { kind: "method", name: "getManagedSubUserOrdersByUser", static: false, private: false, access: { has: function (obj) { return "getManagedSubUserOrdersByUser" in obj; }, get: function (obj) { return obj.getManagedSubUserOrdersByUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _refreshManagedSubUser_decorators, { kind: "method", name: "refreshManagedSubUser", static: false, private: false, access: { has: function (obj) { return "refreshManagedSubUser" in obj; }, get: function (obj) { return obj.refreshManagedSubUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _revokeManagedSubUser_decorators, { kind: "method", name: "revokeManagedSubUser", static: false, private: false, access: { has: function (obj) { return "revokeManagedSubUser" in obj; }, get: function (obj) { return obj.revokeManagedSubUser; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        WebshareAdminController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return WebshareAdminController = _classThis;
}();
exports.WebshareAdminController = WebshareAdminController;
