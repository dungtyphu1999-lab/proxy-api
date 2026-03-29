import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UseJwtAuthGuard } from '@/modules/user/auth/decorators/use-jwt-auth-guard.decorator';
import { JwtAuthenticatedRequest } from '@/shared/dto/jwt-authenticated-request.dto';
import { UserTelegramService } from './telegram.service';
import { TelegramConnectionResponseDto } from './dto/telegram-connection-response.dto';
import {
  TelegramSettingsResponseDto,
  UpdateTelegramSettingsDto,
} from './dto/telegram-settings.dto';
import {
  TelegramConnectTokenDto,
  TelegramConnectTokenResponseDto,
} from './dto/telegram-connect-token.dto';

@ApiTags('[User] Telegram')
@Controller('')
@UseJwtAuthGuard()
@ApiBearerAuth()
export class UserTelegramController {
  constructor(private readonly userTelegramService: UserTelegramService) {}

  @Get('connection')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get Telegram connection status',
    description: 'Returns Telegram connection status for the current user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Connection status retrieved successfully',
    type: TelegramConnectionResponseDto,
  })
  async getConnectionStatus(@Request() req: JwtAuthenticatedRequest) {
    return this.userTelegramService.getConnectionStatus(req.user.sub);
  }

  @Post('connect-token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Create Telegram connect token',
    description: 'Generate a short-lived token to link Telegram safely',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Connect token created successfully',
    type: TelegramConnectTokenResponseDto,
  })
  async createConnectToken(
    @Request() req: JwtAuthenticatedRequest,
  ): Promise<TelegramConnectTokenDto> {
    return this.userTelegramService.createLinkToken(req.user.sub);
  }

  @Post('disconnect')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Disconnect Telegram',
    description: 'Disconnect Telegram for the current user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Disconnected successfully',
    type: TelegramConnectionResponseDto,
  })
  async disconnect(@Request() req: JwtAuthenticatedRequest) {
    return this.userTelegramService.disconnect(req.user.sub);
  }

  @Get('settings')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get Telegram notification settings',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Settings retrieved successfully',
    type: TelegramSettingsResponseDto,
  })
  async getSettings(@Request() req: JwtAuthenticatedRequest) {
    return this.userTelegramService.getSettings(req.user.sub);
  }

  @Post('settings/update')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update Telegram notification settings',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Settings updated successfully',
    type: TelegramSettingsResponseDto,
  })
  async updateSettings(
    @Request() req: JwtAuthenticatedRequest,
    @Body() body: UpdateTelegramSettingsDto,
  ) {
    return this.userTelegramService.updateSettings(req.user.sub, body);
  }
}
