import { registerAs } from '@nestjs/config';

export default registerAs('pay2s', () => ({
  qrLink: process.env.PAY2s_QR_LINK,
  bankCode: process.env.PAY2s_BANK_CODE,
  bankNumber: process.env.PAY2s_BANK_NUMBER,
  bankName: process.env.PAY2s_BANK_NAME,
  webhookSecretKey: process.env.PAY2S_WEBHOOK_SECRET_KEY,
}));
