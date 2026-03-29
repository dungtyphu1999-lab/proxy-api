import { Module } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { AdminUsersRepository } from './admin-users.repository';
import { AdminUsersController } from './admin-users.controller';
import { VerificationService } from '@/modules/user/auth/verification.service';
import { EmailModule } from '@/modules/email/email.module';
import { RedisModule } from '@/redis/redis.module';

@Module({
  imports: [EmailModule, RedisModule],
  controllers: [AdminUsersController],
  providers: [AdminUsersService, AdminUsersRepository, VerificationService],
  exports: [AdminUsersService, AdminUsersRepository],
})
export class AdminUserModule {}
