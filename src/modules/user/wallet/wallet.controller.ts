import {
  Controller,
  Post,
  Get,
  Body,
  Req,
  Param,
  HttpStatus,
  HttpCode,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { Request } from 'express';
import { WalletService } from './wallet.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { DepositResponseDto } from './dto/deposit-response.dto';
import { CreateWithdrawDto } from './dto/create-withdraw.dto';
import { WithdrawResponseDto } from './dto/withdraw-response.dto';
import { TransactionHistoryDto } from './dto/transaction-history.dto';
import { TransactionStatusResponseDto } from './dto/transaction-status-response.dto';
import { JwtAuthenticatedRequest } from '@/shared/dto/jwt-authenticated-request.dto';
import { UseJwtAuthGuard } from '../auth/decorators/use-jwt-auth-guard.decorator';
import { WebhookDepositDto } from './dto/webhook-transaction.dto';
import { WebhookService } from './webhook.service';
import { Logger } from '@nestjs/common';
import { GetTransactionsDto } from './dto/get-transactions.dto';
import { PaginatedResult } from '@/shared/pagination/pagination.interface';
import {
  WalletBalanceDto,
  WalletBalanceResponseDto,
} from './dto/wallet-balance-response.dto';

@ApiTags('[User] Wallet')
@Controller()
export class WalletController {
  private readonly logger = new Logger(WalletController.name);

  constructor(
    private readonly walletService: WalletService,
    private readonly webhookService: WebhookService,
  ) {}

  @Post('deposit')
  @UseJwtAuthGuard()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create deposit request' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Deposit request created successfully',
    type: DepositResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async createDeposit(
    @Req() req: JwtAuthenticatedRequest,
    @Body() createDepositDto: CreateDepositDto,
  ): Promise<DepositResponseDto> {
    const userId: string | undefined = req?.user?.sub;
    return await this.walletService.createDeposit(userId, createDepositDto);
  }

  @Post('withdraw')
  @UseJwtAuthGuard()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create withdraw request' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Withdraw request created successfully',
    type: WithdrawResponseDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async createWithdraw(
    @Req() req: JwtAuthenticatedRequest,
    @Body() createWithdrawDto: CreateWithdrawDto,
  ): Promise<WithdrawResponseDto> {
    const userId: string | undefined = req?.user?.sub;
    return await this.walletService.createWithdraw(userId, createWithdrawDto);
  }

  @Post('deposit/webhook')
  @ApiOperation({ summary: 'Handle Pay2S webhook callback' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Webhook processed successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @HttpCode(HttpStatus.OK)
  async handleDepositWebhook(
    @Body() webhookData: WebhookDepositDto,
    @Req() req: Request,
  ) {
    // Verify Bearer token
    const authorizationHeader = req.headers.authorization || '';
    if (!this.webhookService.verifyBearerToken(authorizationHeader)) {
      throw new UnauthorizedException('Invalid webhook secret key');
    }

    try {
      const result = await this.webhookService.processDepositWebhook(
        webhookData.transactions,
      );

      this.logger.log(
        `Webhook processed: ${result.processed} successful, ${result.failed} failed`,
      );

      return result.failed === 0;
    } catch (error) {
      this.logger.error('Webhook processing error:', error);
      return false;
    }
  }

  @Get('transaction/:transactionId/status')
  @UseJwtAuthGuard()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get transaction status by ID' })
  @ApiParam({ name: 'transactionId', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transaction status retrieved successfully',
    type: TransactionStatusResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Transaction not found',
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async getTransactionStatus(
    @Param('transactionId') transactionId: string,
    @Req() req: JwtAuthenticatedRequest,
  ): Promise<TransactionStatusResponseDto> {
    const userId: string | undefined = req?.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return await this.walletService.checkTransactionStatus(
      userId,
      transactionId,
    );
  }

  @Get('balance')
  @UseJwtAuthGuard()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get wallet balance' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Wallet balance retrieved successfully',
    type: WalletBalanceResponseDto,
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async getWalletBalance(
    @Req() req: JwtAuthenticatedRequest,
  ): Promise<WalletBalanceDto> {
    const userId: string | undefined = req?.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    const wallet = await this.walletService.getOrCreateWallet(userId);
    return {
      balance: wallet.balance,
      deposit_balance: wallet.deposit_balance,
      sale_balance: wallet.sale_balance,
      locked_balance: wallet.locked_balance,
      currency: wallet.currency,
      is_locked: wallet.is_locked,
    };
  }

  @Get('transactions')
  @UseJwtAuthGuard()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get transaction history' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Transaction history retrieved successfully',
    type: [TransactionHistoryDto],
  })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized' })
  async getTransactionHistory(
    @Req() req: JwtAuthenticatedRequest,
    @Query() query: GetTransactionsDto,
  ): Promise<PaginatedResult<TransactionHistoryDto>> {
    const userId: string | undefined = req?.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    const paginationOptions = {
      ...query.paginationOptions,
      searchFields:
        query.searchFieldsArray.length > 0
          ? query.searchFieldsArray
          : ['transaction_number', 'note', 'method', 'type', 'status'],
      type: query.type,
      status: query.status,
      start_date: query.start_date,
      end_date: query.end_date,
    };

    return await this.walletService.getTransactionHistory(
      userId,
      paginationOptions,
    );
  }
}
