import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { UserProfileRepository } from './user-profile.repository';
import { UserProfile } from '@/database/entities';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { UserProfileDto } from './dto/user-profile-response.dto';
import { FileUploadService } from '@/modules/file-upload/file-upload.service';
import { AppConfigService } from '@/config/app-config.service';
import { UserService } from '@/modules/user/user/user.service';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';
import { ChangePasswordDto } from '@/modules/user/user-profile/dto/change-password.dto';
import { AuthTokenService } from '@/modules/user/auth-token/auth-token.service';
import { Knex } from 'knex';
import { ErrorCode } from '@/shared/constants/error-codes.enum';
import { VerifyEmailDto } from '../auth/dto/verify-email.dto';
import { EmailService } from '@/modules/email/email.service';

@Injectable()
export class UserProfileService {
  constructor(
    private readonly userProfileRepository: UserProfileRepository,
    private readonly fileUploadService: FileUploadService,
    private appConfig: AppConfigService,
    private readonly userService: UserService,
    private readonly authTokenService: AuthTokenService,
    private readonly emailService: EmailService,
  ) {}

  async createProfile(
    userId: string,
    data: Partial<UserProfile>,
    trx?: Knex.Transaction,
  ) {
    return this.userProfileRepository.createProfile(userId, data, trx);
  }

  async getProfile(userId: string) {
    const profile = await this.userProfileRepository.findProfile(userId);
    if (!profile) {
      throw new NotFoundException('User profile not found');
    }
    return profile;
  }

  async updateProfile(userId: string, data: Partial<UserProfile>) {
    const existingProfile =
      await this.userProfileRepository.findProfile(userId);
    if (!existingProfile) {
      throw new NotFoundException('User profile not found');
    }

    // Nếu đã update rồi (true) thì chặn luôn
    if (existingProfile.is_profile_updated) {
      throw new ForbiddenException(
        'Profile has already been updated once and cannot be changed again.',
      );
    }

    const existingUsername =
      await this.userProfileRepository.findByUsernameExit(
        data.username ?? '',
        userId,
      );
    if (existingUsername) {
      throw new ConflictException('Username đã tồn tại');
    }

    return this.userProfileRepository.updateProfile2(userId, data);
  }

  async deleteProfile(userId: string) {
    const existingProfile =
      await this.userProfileRepository.findProfile(userId);
    if (!existingProfile) {
      throw new NotFoundException('User profile not found');
    }
    await this.userProfileRepository.deleteProfile(userId);
    return { message: 'User profile deleted successfully' };
  }

  /**
   * Upload avatar and update user profile.
   * Avatar can be updated anytime (not blocked by is_profile_updated).
   * @param userId - User ID from JWT token
   * @param file - Avatar image file
   * @returns Updated user profile with new avatar URL
   */
  async uploadAvatar(
    userId: string,
    file: Express.Multer.File,
  ): Promise<UserProfileDto> {
    const existingProfile =
      await this.userProfileRepository.findProfile(userId);
    if (!existingProfile) {
      throw new NotFoundException('User profile not found');
    }

    const uploadResult = await this.fileUploadService.uploadImage(
      file,
      'avatars',
    );

    const updateData: UpdateUserProfileDto = {
      avatar_url: `${this.appConfig.app.publicUrl}/${uploadResult.url.replace(/\\/g, '/')}`,
    };

    const updated = await this.userProfileRepository.updateProfile(
      userId,
      updateData,
    );
    return updated as UserProfileDto;
  }

  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<null> {
    const { current_password, new_password, confirm_password } =
      changePasswordDto;

    // Validate password confirmation
    if (new_password !== confirm_password) {
      throw new BadRequestException(ErrorCode.AUTH_PASSWORD_CONFIRM_MISMATCH);
    }

    // Get current user
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException(ErrorCode.AUTH_USER_NOT_FOUND);
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(
      current_password,
      user.password_hash,
    );
    if (!isCurrentPasswordValid) {
      throw new BadRequestException(ErrorCode.AUTH_PASSWORD_INVALID_CURRENT);
    }

    // Check if new password is different from current
    const isSamePassword = await bcrypt.compare(
      new_password,
      user.password_hash,
    );
    if (isSamePassword) {
      throw new ConflictException(ErrorCode.AUTH_PASSWORD_REUSED);
    }

    // Hash new password
    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(new_password, saltRounds);

    // Update password
    await this.userService.updateUser(userId, {
      password_hash: newPasswordHash,
    });

    await this.authTokenService.revokeAllUserTokens(userId);

    return null;
  }

  async updateEmail(dto: VerifyEmailDto, userId: string) {
    // Verify the email verification code
    const isVerified = await this.verifyCode(userId, dto.code);
    if (!isVerified) {
      throw new BadRequestException('Invalid verification code');
    }

    // Update the user's email
    return await this.userService.updateUser(userId, { email: dto.email });
  }

  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits
  }

  /* ================= SEND CODE ================= */
  async sendVerificationCode(email: string, userId: string): Promise<boolean> {
    try {
      const verificationCode = this.generateVerificationCode();
      const record = await this.userProfileRepository.findUserId(userId);
      if (!record) {
        throw new NotFoundException('User not found');
      }
      const expiredAt = new Date(Date.now() + 180 * 1000);

      await this.userProfileRepository.saveCode(
        userId,
        verificationCode,
        expiredAt,
      );

      const success = await this.emailService.sendVerificationCodeEmail(
        { email: record.email },
        { verificationCode },
      );

      if (success) {
        return true;
      }

      throw new NotFoundException(`Send email fail`);
    } catch (error) {
      console.log('sendVerificationCode error: ' + email, error);
      return false;
    }
  }

  /* ================= VERIFY CODE ================= */
  async verifyCode(userId: string, code: string): Promise<boolean> {
    try {
      const record = await this.userProfileRepository.findUserId(userId);

      if (!record) {
        return false;
      }

      const expiredAt = record.verification_code_expired_at;
      if (expiredAt == null || new Date(expiredAt) < new Date()) {
        throw new NotFoundException(`Verification code expired for`);
      }

      if (record.verification_code !== code) {
        throw new NotFoundException(`Invalid verification code for`);
      }

      // Thành công → xoá code
      return true;
    } catch {
      return false;
    }
  }
}
