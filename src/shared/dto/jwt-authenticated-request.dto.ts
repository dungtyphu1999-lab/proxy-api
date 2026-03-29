import { Shop, User } from '@/database/entities';

export interface JwtAuthenticatedRequest extends Request {
  user: {
    sub: string;
    email: string;
    user: Omit<User, 'password_hash'>;
    roles: string[];
    shop: Shop;
  };
}
