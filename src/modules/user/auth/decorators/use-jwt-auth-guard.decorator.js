"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseJwtAuthGuard = exports.OPTIONAL_AUTH = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
exports.OPTIONAL_AUTH = Symbol('OPTIONAL_AUTH');
var UseJwtAuthGuard = function (options) {
    var decorators = __spreadArray(__spreadArray([], ((options === null || options === void 0 ? void 0 : options.optional) ? [(0, common_1.SetMetadata)(exports.OPTIONAL_AUTH, true)] : []), true), [
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, swagger_1.ApiBearerAuth)(),
        (0, swagger_1.ApiBearerAuth)('access-token'),
    ], false);
    return common_1.applyDecorators.apply(void 0, decorators);
};
exports.UseJwtAuthGuard = UseJwtAuthGuard;
