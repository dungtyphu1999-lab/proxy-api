import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { OnlineStatusScheduler } from './online-status.scheduler';

@Module({
  controllers: [],
  providers: [UserService, UserRepository, OnlineStatusScheduler],
  exports: [UserService],
})
export class UserModule {}
