import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { AppConfigService } from '@/config/app-config.service';

export interface Pay2sQrData {
  amount: number;
  content: string;
}

export interface Pay2SResponse {
  code: number;
  message: string;
  data?: {
    paymentUrl: string;
    referenceCode: string;
  };
}

export interface BankInfo {
  bankCode: string;
  bankNumber: string;
  bankName: string;
}

@Injectable()
export class Pay2SService {
  private readonly logger = new Logger(Pay2SService.name);
  private readonly qrLink: string | undefined;
  private readonly bankCode: string | undefined;
  private readonly bankNumber: string | undefined;
  private readonly bankName: string | undefined;

  constructor(private readonly appConfigService: AppConfigService) {
    const pay2sConfig = this.appConfigService.pay2s;
    this.qrLink = pay2sConfig.qrLink;
    this.bankCode = pay2sConfig.bankCode;
    this.bankNumber = pay2sConfig.bankNumber;
    this.bankName = pay2sConfig.bankName;

    this.validateConfiguration();
  }

  private validateConfiguration(): void {
    const missingConfigs: string[] = [];

    if (!this.qrLink) missingConfigs.push('PAY2s_QR_LINK');
    if (!this.bankCode) missingConfigs.push('PAY2s_BANK_CODE');
    if (!this.bankNumber) missingConfigs.push('PAY2s_BANK_NUMBER');
    if (!this.bankName) missingConfigs.push('PAY2s_BANK_NAME');

    if (missingConfigs.length > 0) {
      this.logger.error(
        `Missing Pay2S configuration: ${missingConfigs.join(', ')}`,
      );
      throw new InternalServerErrorException(
        `Payment configuration is missing: ${missingConfigs.join(', ')}`,
      );
    }
  }

  generateQrCode(data: Pay2sQrData): string {
    return this.qrLink!.replaceAll('{BANK_CODE}', this.bankCode!)
      .replaceAll('{BANK_NUMBER}', this.bankNumber!)
      .replaceAll('{BANK_NAME}', this.bankName!)
      .replaceAll('{AMOUNT}', data.amount.toString())
      .replaceAll('{CONTENT}', data.content);
  }

  getBankInfo(): BankInfo {
    return {
      bankCode: this.bankCode!,
      bankNumber: this.bankNumber!,
      bankName: this.bankName!,
    };
  }
}
