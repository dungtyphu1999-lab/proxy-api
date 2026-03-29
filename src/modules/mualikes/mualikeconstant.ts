import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Primary provider token used by mualikes.net API endpoints like:
// - /api/listCategory
// - /api/listService
// - /api/server
// - /api/createOrder
//
// Never fallback to a hardcoded token.
dotenv.config({ path: resolve(process.cwd(), '.env') });

const configuredToken = process.env.MUALIKES_TOKEN?.trim();
if (!configuredToken) {
  throw new Error('Missing required env: MUALIKES_TOKEN');
}
export const TOKEN_MUALIKE = configuredToken;

// Legacy types used by existing revenue/history queries.
export const TYPE_TRANSACTION = 'SERVICE';
export const PROXY = 'PROXY';
