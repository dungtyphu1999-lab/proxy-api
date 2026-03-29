import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  HttpStatus,
  HttpCode,
  NotFoundException,
  UploadedFile,
  Request,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { AdminWalletTransactionService } from './admin-wallet-transaction.service';
import { GetWithdrawalsDto } from './dto/get-withdrawals.dto';
import { RejectWithdrawDto } from './dto/reject-withdraw.dto';
import { GetWithdrawalsResponseDto } from './dto/get-withdrawals-response.dto';
import { UseAdminJwtAuthGuard } from '../auth/decorators/use-admin-jwt-auth-guard.decorator';
import { UseImageUpload } from '@/modules/file-upload/file-upload.decorators';
import { UploadImageInputDto } from '@/modules/file-upload/file-upload.dtos';
import { AdminJwtAuthenticatedRequest } from '../chat/dto/admin-jwt-authenticated-request.dto';
import { WalletSettingsService } from './wallet-settings.service';
import { UpdateWalletSettingsDto } from './dto/update-wallet-settings.dto';
import { WalletSetting } from '@/database/entities/wallet-setting.entity';
import { WalletReleaseService } from '@/modules/user/wallet/wallet-release.service';

@ApiTags('[Admin] Wallet Transaction')
@Controller()
export class AdminWalletTransactionController {
  constructor(
    private readonly adminWalletTransactionService: AdminWalletTransactionService,
    private readonly walletSettingsService: WalletSettingsService,
    private readonly walletReleaseService: WalletReleaseService,
  ) {}

  @Get('transactions')
  @UseAdminJwtAuthGuard()
  @ApiOperation({
    summary: 'Get all withdraw requests with pagination',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Withdraw requests retrieved successfully',
    type: GetWithdrawalsResponseDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async getWithdrawals(
    @Query() query: GetWithdrawalsDto,
  ): Promise<GetWithdrawalsResponseDto> {
    const paginationOptions = {
      ...query.paginationOptions,
      searchFields:
        query.searchFieldsArray.length > 0
          ? query.searchFieldsArray
          : ['transaction_number', 'note', 'users.email', 'users.username'],
      status: query.status,
      authorId: query.authorId,
      typeTransaction: query.typeTransaction,
    };

    return await this.adminWalletTransactionService.getWithdrawalsWithPagination(
      paginationOptions,
    );
  }

  @Post('withdrawals/:transactionId/approve')
  @UseAdminJwtAuthGuard()
  @UseImageUpload('file')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Approve withdraw request' })
  @ApiParam({ name: 'transactionId', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Withdraw request approved successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Transaction not found',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: UploadImageInputDto })
  async approveWithdraw(
    @Param('transactionId') transactionId: string,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: AdminJwtAuthenticatedRequest,
  ): Promise<void> {
    try {
      await this.adminWalletTransactionService.approveWithdraw(
        transactionId,
        file,
        req.user.sub,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Transaction not found');
      }
      throw error;
    }
  }

  @Post('withdrawals/:transactionId/reject')
  @UseAdminJwtAuthGuard()
  @ApiOperation({ summary: 'Reject withdraw request' })
  @ApiParam({ name: 'transactionId', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Withdraw request rejected successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Transaction not found',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @HttpCode(HttpStatus.OK)
  async rejectWithdraw(
    @Param('transactionId') transactionId: string,
    @Body() rejectWithdrawDto: RejectWithdrawDto,
    @Request() req: AdminJwtAuthenticatedRequest,
  ): Promise<void> {
    try {
      await this.adminWalletTransactionService.rejectWithdraw(
        transactionId,
        rejectWithdrawDto.note,
        req.user.sub,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Transaction not found');
      }
      throw error;
    }
  }

  @Get('settings')
  @UseAdminJwtAuthGuard()
  @ApiOperation({
    summary: 'Get wallet settings',
    description: 'Get current wallet settings including money holding days',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Wallet settings retrieved successfully',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async getWalletSettings(): Promise<WalletSetting> {
    return await this.walletSettingsService.getSettings();
  }

  @Put('settings')
  @UseAdminJwtAuthGuard()
  @ApiOperation({
    summary: 'Update wallet settings',
    description: 'Update wallet settings including money holding days',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Wallet settings updated successfully',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @HttpCode(HttpStatus.OK)
  async updateWalletSettings(
    @Body() updateData: UpdateWalletSettingsDto,
  ): Promise<WalletSetting> {
    return await this.walletSettingsService.updateSettings(updateData);
  }

  @Post('release-locked-balance')
  @UseAdminJwtAuthGuard()
  @ApiOperation({
    summary: 'Manually trigger release of locked balance to sale balance',
    description:
      'Manually trigger the process to release money from locked_balance to sale_balance for eligible orders. This is useful for testing or manual intervention.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Release process completed',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  @HttpCode(HttpStatus.OK)
  async releaseLockedBalance(): Promise<{
    success: boolean;
    message: string;
    results: Array<{
      order_id: string;
      order_number: string;
      shop_id: string;
      shop_name: string;
      amount: number;
      success: boolean;
      reason: string;
    }>;
  }> {
    const results =
      await this.walletReleaseService.releaseLockedBalanceToSaleBalance();
    const successCount = results.filter((r) => r.success).length;
    const failedCount = results.filter((r) => !r.success).length;

    return {
      success: true,
      message: `Release process completed. Success: ${successCount}, Failed/Skipped: ${failedCount}`,
      results,
    };
  }
}
