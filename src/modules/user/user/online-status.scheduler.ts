import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class OnlineStatusScheduler implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(OnlineStatusScheduler.name);
  private intervalId?: NodeJS.Timeout;

  constructor(private readonly userService: UserService) {}

  onModuleInit() {
    this.intervalId = setInterval(() => {
      void this.handleUpdateOfflineUsers();
    }, 60000);
  }

  private async handleUpdateOfflineUsers(): Promise<void> {
    try {
      const updatedCount =
        await this.userService.updateUsersOfflineIfInactive(1);
      if (updatedCount > 0) {
        this.logger.log(`Updated ${updatedCount} users to offline status`);
      }
    } catch (error) {
      this.logger.error('Error updating offline users:', error);
    }
  }

  onModuleDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
