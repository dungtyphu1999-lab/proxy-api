import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetCurrentUser } from '../auth/decorators/get-current-user.decorator';
import { UseAdminJwtAuthGuard } from '../auth/decorators/use-admin-jwt-auth-guard.decorator';
import { AdminUsersService } from './admin-users.service';
import { GetUsersDto } from './dto/get-admin-users-input.dto';
import { UpdateUserStatusInputDto } from './dto/update-user-status.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { CurrentUserPayload } from './types/current-user.type';
import { ResetUserPasswordDto } from './dto/reset-user-password.dto';

@ApiTags('[Admin] - Users')
@ApiBearerAuth()
@UseAdminJwtAuthGuard()
@Controller()
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users with pagination and filtering' })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of users',
    type: [UserResponseDto],
  })
  async getAllUsers(@Query() query: GetUsersDto) {
    const paginationOptions = {
      ...query.paginationOptions,
      searchFields:
        query.searchFieldsArray.length > 0
          ? query.searchFieldsArray
          : ['users.email', 'users.username', 'user_profiles.full_name'],
      isLocked: query.isLocked,
      isVerified: query.isVerified,
    };

    return await this.adminUsersService.findAllUsers(paginationOptions);
  }

  @Patch(':id/status')
  @ApiOperation({
    summary: 'Update user status',
    description: 'Update the status of a user (locked, unlocked)',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '735d162f-8bfb-4198-9968-d7d46e5eafc0',
  })
  @ApiResponse({
    status: 200,
    description: 'User status updated successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async updateUserStatus(
    @Param('id') id: string,
    @Body() data: UpdateUserStatusInputDto,
    @GetCurrentUser() user: CurrentUserPayload,
  ) {
    if (!user?.user?.id) {
      throw new UnauthorizedException('Invalid user payload');
    }
    return this.adminUsersService.updateUserStatus(id, data, user.user.id);
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Admin reset user password' })
  @ApiResponse({
    status: 200,
    description: 'Password reset successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async resetPassword(
    @Body() resetPasswordDto: ResetUserPasswordDto,
    @GetCurrentUser() admin: CurrentUserPayload,
  ) {
    if (!admin?.user?.id) {
      throw new UnauthorizedException('Invalid admin payload');
    }
    return this.adminUsersService.resetPassword(resetPasswordDto.userId);
  }
}
