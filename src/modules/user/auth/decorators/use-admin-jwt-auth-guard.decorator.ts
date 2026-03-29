import { UseGuards } from '@nestjs/common';
import { AdminJwtAuthGuard } from '../guards/admin-jwt-auth.guard';

export const UseAdminJwtAuthGuard = () => UseGuards(AdminJwtAuthGuard);
