import { User } from '@/database/entities';

export interface AdminJwtAuthenticatedRequest extends Request {
  user: {
    sub: string;
    email: string;
    user: Omit<User, 'password_hash'>;
    roles: string[];
  };
}
