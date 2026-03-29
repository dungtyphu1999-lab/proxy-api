import { Module } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfileRepository } from './user-profile.repository';
import { UserProfileController } from './user-profile.controller';
import { FileUploadModule } from '@/modules/file-upload/file-upload.module';
import { UserModule } from '@/modules/user/user/user.module';
import { AuthTokenModule } from '@/modules/user/auth-token/auth-token.module';
import { EmailModule } from '@/modules/email/email.module';

@Module({
  imports: [FileUploadModule, UserModule, AuthTokenModule, EmailModule],
  controllers: [UserProfileController],
  providers: [UserProfileService, UserProfileRepository],
  exports: [UserProfileService, UserProfileRepository],
})
export class UserProfileModule {}
