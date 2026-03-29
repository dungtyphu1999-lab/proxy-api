import {
  Controller,
  Get,
  Query,
  Request,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import {
  GetNotificationsInputDto,
  GetNotificationsOutputDto,
} from './dto/get-notifications.dto';
import {
  GetSystemNotificationsInputDto,
  GetSystemNotificationsOutputDto,
} from './dto/get-system-notifications.dto';
import {
  MarkNotificationReadInputDto,
  MarkNotificationReadOutputDto,
} from './dto/mark-read.dto';
import {
  GetLatestSystemNotificationsInputDto,
  GetLatestSystemNotificationsOutputDto,
} from './dto/get-latest-system-notifications.dto';
import {
  GetNotificationBySlugInputDto,
  GetNotificationBySlugQueryDto,
  GetNotificationBySlugOutputDto,
} from './dto/get-notification-by-slug.dto';
import { UseJwtAuthGuard } from '../auth/decorators/use-jwt-auth-guard.decorator';
import { JwtAuthenticatedRequest } from '@/shared/dto/jwt-authenticated-request.dto';

@ApiTags('[User] Notifications')
@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  @UseJwtAuthGuard({ optional: true })
  @ApiOperation({
    summary: 'Get user notifications',
    description: 'Get paginated list of user notifications with filters',
  })
  @ApiResponse({
    status: 200,
    description: 'Notifications retrieved successfully',
    type: GetNotificationsOutputDto,
  })
  async getNotifications(
    @Query() query: GetNotificationsInputDto,
    @Request() req: JwtAuthenticatedRequest,
  ): Promise<GetNotificationsOutputDto> {
    const userId = req.user?.sub;
    if (!userId) {
      // If no user, return system notifications instead
      return this.notificationService.getSystemNotifications(query);
    }
    return this.notificationService.getNotifications(userId, query);
  }

  @Get('system')
  @ApiOperation({
    summary: 'Get system notifications',
    description:
      'Get paginated list of global system notifications (no authentication required)',
  })
  @ApiResponse({
    status: 200,
    description: 'System notifications retrieved successfully',
    type: GetSystemNotificationsOutputDto,
  })
  async getSystemNotifications(
    @Query() query: GetSystemNotificationsInputDto,
  ): Promise<GetSystemNotificationsOutputDto> {
    return await this.notificationService.getSystemNotifications(query);
  }

  @Post('read')
  @UseJwtAuthGuard()
  @ApiOperation({
    summary: 'Mark notification as read',
    description: 'Mark a specific notification as read by notification ID',
  })
  @ApiBody({
    type: MarkNotificationReadInputDto,
    description: 'Mark read data',
  })
  @ApiResponse({
    status: 200,
    description: 'Notification marked as read successfully',
    type: MarkNotificationReadOutputDto,
  })
  async markNotificationAsRead(
    @Body() markReadDto: MarkNotificationReadInputDto,
    @Request() req: JwtAuthenticatedRequest,
  ): Promise<MarkNotificationReadOutputDto> {
    return this.notificationService.markNotificationAsRead(
      req.user.sub,
      markReadDto,
    );
  }

  @Get('unread-count')
  @UseJwtAuthGuard()
  @ApiOperation({
    summary: 'Get unread count',
    description:
      'Get total number of unread notifications for the current user',
  })
  @ApiResponse({
    status: 200,
    description: 'Unread count retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        unread_count: { type: 'number' },
      },
    },
  })
  async getUnreadCount(
    @Request() req: JwtAuthenticatedRequest,
  ): Promise<{ unread_count: number }> {
    return this.notificationService.getUnreadCount(req.user.sub);
  }

  @Get('latest-system')
  @ApiOperation({
    summary: 'Get latest system notifications',
    description:
      'Get the latest system notifications with a specified limit (no authentication required)',
  })
  @ApiResponse({
    status: 200,
    description: 'Latest system notifications retrieved successfully',
    type: GetLatestSystemNotificationsOutputDto,
  })
  async getLatestSystemNotifications(
    @Query() query: GetLatestSystemNotificationsInputDto,
  ): Promise<GetLatestSystemNotificationsOutputDto> {
    return this.notificationService.getLatestSystemNotifications(query.limit);
  }

  @Get(':slug')
  @ApiOperation({
    summary: 'Get notification by slug',
    description:
      'Get a specific notification by its slug (no authentication required). Use for_seo=true to prevent any tracking.',
  })
  @ApiParam({
    name: 'slug',
    description: 'Notification slug',
    example: 'system-maintenance-notice',
  })
  @ApiQuery({
    name: 'for_seo',
    description:
      'Flag to indicate if request is for SEO purposes (will not perform any tracking)',
    required: false,
    type: String,
    example: 'false',
  })
  @ApiResponse({
    status: 200,
    description: 'Notification retrieved successfully',
    type: GetNotificationBySlugOutputDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Notification not found',
    schema: {
      type: 'object',
      properties: {
        notification: { type: 'null' },
        found: { type: 'boolean', example: false },
      },
    },
  })
  async getNotificationBySlug(
    @Param() params: GetNotificationBySlugInputDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Query() query: GetNotificationBySlugQueryDto,
  ): Promise<GetNotificationBySlugOutputDto> {
    return this.notificationService.getNotificationBySlug(params.slug);
  }

  @Post('read-all')
  @UseJwtAuthGuard()
  @ApiOperation({
    summary: 'Mark all user notifications as read',
    description: 'Mark all notifications for the current user as read',
  })
  @ApiResponse({
    status: 200,
    description: 'All user notifications marked as read successfully',
    type: MarkNotificationReadOutputDto,
  })
  async markAllNotificationsAsRead(
    @Request() req: JwtAuthenticatedRequest,
  ): Promise<MarkNotificationReadOutputDto> {
    return this.notificationService.markAllNotificationsAsRead(req.user.sub);
  }
}
