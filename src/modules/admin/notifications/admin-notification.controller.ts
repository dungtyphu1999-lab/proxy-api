import {
  Controller,
  Get,
  Query,
  Request,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AdminNotificationService } from './admin-notification.service';
import {
  GetAdminNotificationsInputDto,
  GetAdminNotificationsOutputDto,
} from './dto/get-admin-notifications.dto';
import {
  MarkAdminNotificationReadInputDto,
  MarkAdminNotificationReadOutputDto,
} from './dto/mark-admin-notification-read.dto';
import {
  SendUserNotificationInputDto,
  SendUserNotificationOutputDto,
} from './dto/send-user-notification.dto';
import {
  EditNotificationInputDto,
  EditNotificationOutputDto,
} from './dto/edit-notification.dto';
import { UseAdminJwtAuthGuard } from '../auth/decorators/use-admin-jwt-auth-guard.decorator';
import { AdminJwtAuthenticatedRequest } from '../chat/dto/admin-jwt-authenticated-request.dto';

@ApiTags('[Admin] Notifications')
@Controller()
export class AdminNotificationController {
  constructor(
    private readonly adminNotificationService: AdminNotificationService,
  ) {}

  @Get()
  @UseAdminJwtAuthGuard()
  @ApiOperation({
    summary: 'Get admin notifications',
    description: 'Get paginated list of admin notifications with filters',
  })
  @ApiResponse({
    status: 200,
    description: 'Admin notifications retrieved successfully',
    type: GetAdminNotificationsOutputDto,
  })
  async getNotifications(
    @Query() query: GetAdminNotificationsInputDto,
    @Request() req: AdminJwtAuthenticatedRequest,
  ): Promise<GetAdminNotificationsOutputDto> {
    return this.adminNotificationService.getNotifications(query, req.user.sub);
  }

  @Post('read')
  @UseAdminJwtAuthGuard()
  @ApiOperation({
    summary: 'Mark admin notification as read',
    description: 'Mark a specific notification or all notifications as read',
  })
  @ApiBody({
    type: MarkAdminNotificationReadInputDto,
    description: 'Mark read data',
  })
  @ApiResponse({
    status: 200,
    description: 'Admin notification marked as read successfully',
    type: MarkAdminNotificationReadOutputDto,
  })
  async markNotificationAsRead(
    @Body() markReadDto: MarkAdminNotificationReadInputDto,
    @Request() req: AdminJwtAuthenticatedRequest,
  ): Promise<MarkAdminNotificationReadOutputDto> {
    if (markReadDto.notification_id) {
      return this.adminNotificationService.markNotificationAsRead(
        req.user.sub,
        markReadDto,
      );
    } else {
      return this.adminNotificationService.markAllNotificationsAsRead(
        req.user.sub,
      );
    }
  }

  @Post('read-all')
  @UseAdminJwtAuthGuard()
  @ApiOperation({
    summary: 'Mark all admin notifications as read',
    description: 'Mark all notifications for the current admin as read',
  })
  @ApiResponse({
    status: 200,
    description: 'All admin notifications marked as read successfully',
    type: MarkAdminNotificationReadOutputDto,
  })
  async markAllNotificationsAsRead(
    @Request() req: AdminJwtAuthenticatedRequest,
  ): Promise<MarkAdminNotificationReadOutputDto> {
    return this.adminNotificationService.markAllNotificationsAsRead(
      req.user.sub,
    );
  }

  @Delete(':id')
  @UseAdminJwtAuthGuard()
  @ApiOperation({
    summary: 'Delete admin notification',
    description:
      'Soft delete a specific admin notification by setting deleted_at and deleted_by. The notification will be hidden from admin views but user_notifications remain intact.',
  })
  @ApiResponse({
    status: 200,
    description: 'Admin notification deleted successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
      },
    },
  })
  async deleteNotification(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: AdminJwtAuthenticatedRequest,
  ): Promise<{ success: boolean }> {
    return this.adminNotificationService.deleteNotification(req.user.sub, id);
  }

  @Get('unread-count')
  @UseAdminJwtAuthGuard()
  @ApiOperation({
    summary: 'Get admin unread count',
    description:
      'Get total number of unread notifications for the current admin',
  })
  @ApiResponse({
    status: 200,
    description: 'Admin unread count retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        unread_count: { type: 'number' },
      },
    },
  })
  async getUnreadCount(
    @Request() req: AdminJwtAuthenticatedRequest,
  ): Promise<{ unread_count: number }> {
    return this.adminNotificationService.getUnreadCount(req.user.sub);
  }

  @Post('send-to-users')
  @UseAdminJwtAuthGuard()
  @ApiOperation({
    summary: 'Send notification to users',
    description:
      'Send a notification to multiple users (verified and unblocked users only)',
  })
  @ApiBody({
    type: SendUserNotificationInputDto,
    description: 'User notification data',
  })
  @ApiResponse({
    status: 201,
    description: 'User notification sent successfully',
    type: SendUserNotificationOutputDto,
  })
  async sendUserNotification(
    @Body() sendDto: SendUserNotificationInputDto,
    @Request() req: AdminJwtAuthenticatedRequest,
  ): Promise<SendUserNotificationOutputDto> {
    return this.adminNotificationService.sendUserNotification(
      sendDto,
      req.user.sub,
    );
  }

  @Post(':id/edit')
  @UseAdminJwtAuthGuard()
  @ApiOperation({
    summary: 'Edit admin notification',
    description:
      'Edit an existing admin notification by creating a new one and soft deleting the old one. The new notification will have related_entity_type="notification" and related_entity_id pointing to the original notification.',
  })
  @ApiBody({
    type: EditNotificationInputDto,
    description: 'Edit notification data',
  })
  @ApiResponse({
    status: 200,
    description: 'Admin notification edited successfully',
    type: EditNotificationOutputDto,
  })
  async editNotification(
    @Param('id', ParseIntPipe) id: number,
    @Body() editDto: EditNotificationInputDto,
    @Request() req: AdminJwtAuthenticatedRequest,
  ): Promise<EditNotificationOutputDto> {
    return this.adminNotificationService.editNotification(
      id,
      editDto,
      req.user.sub,
    );
  }
}
