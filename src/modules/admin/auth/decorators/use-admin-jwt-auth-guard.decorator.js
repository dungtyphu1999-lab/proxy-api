"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseAdminJwtAuthGuard = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var admin_jwt_auth_guard_1 = require("../guards/admin-jwt-auth.guard");
var UseAdminJwtAuthGuard = function () {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(admin_jwt_auth_guard_1.AdminJwtAuthGuard), (0, swagger_1.ApiResponse)({
        status: 401,
        description: 'Unauthorized',
    }), (0, swagger_1.ApiBearerAuth)('access-token'));
};
exports.UseAdminJwtAuthGuard = UseAdminJwtAuthGuard;
