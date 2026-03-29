import { registerAs } from '@nestjs/config';

export default registerAs('ekyc', () => ({
  apiBankList: process.env.EKYC_API_BANK_LIST || '',
  apiBankLookup: process.env.EKYC_API_BANK_LOOKUP || '',
  apiKey: process.env.EKYC_API_KEY || '',
  apiSecret: process.env.EKYC_API_SECRET || '',
}));
