import { User } from '@/database/entities/user.entity';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: User & {
    roles: string[];
  };
}

export interface JwtAuthenticatedRequest extends Request {
  user: {
    sub: string;
    email: string;
    user: Omit<User, 'password_hash'>;
  };
}
