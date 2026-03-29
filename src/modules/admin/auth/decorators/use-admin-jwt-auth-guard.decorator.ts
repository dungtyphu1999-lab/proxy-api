import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AdminJwtAuthGuard } from '../guards/admin-jwt-auth.guard';

export const UseAdminJwtAuthGuard = () => {
  return applyDecorators(
    UseGuards(AdminJwtAuthGuard),
    ApiResponse({
      status: 401,
      description: 'Unauthorized',
    }),
    ApiBearerAuth('access-token'),
  );
};
