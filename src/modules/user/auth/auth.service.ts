import {
  ConflictException,
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@/database/entities/user.entity';
import { UserRoleMap } from '@/database/entities/user-role-map.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { VerificationService } from './verification.service';
import { UserProfileService } from '../user-profile/user-profile.service';
import { omit } from 'lodash';
import { DatabaseService } from '@/database/database.service';
import { UserService } from '../user/user.service';
import { AuthTokenService } from '../auth-token/auth-token.service';
import { JwtAuthenticatedRequest } from '@/shared/dto/jwt-authenticated-request.dto';
import { RolesService } from '../roles/roles.service';
import { ShopsService } from '../shops/shops.service';
import { WalletService } from '../wallet/wallet.service';
import { ErrorCode } from '@/shared/constants/error-codes.enum';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChatService } from '../chat/chat.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly verificationService: VerificationService,
    private readonly userProfileService: UserProfileService,
    private readonly authTokenService: AuthTokenService,
    private readonly rolesService: RolesService,
    private readonly shopsService: ShopsService,
    private readonly walletService: WalletService,
    private readonly chatService: ChatService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    const validPassword =
      user && (await bcrypt.compare(password, user.password_hash));
    if (!user || !validPassword) {
      throw new BadRequestException(ErrorCode.AUTH_INVALID_CREDENTIALS);
    }

    if (user.is_locked) {
      throw new BadRequestException(ErrorCode.AUTH_USER_LOCKED);
    }
    const userRoleNames = await this.rolesService.getUserRoleNames(user.id);

    return omit({ ...user, roles: userRoleNames }, ['password_hash']);
  }

  async signUp(signUpDto: SignUpDto) {
    const existingUser = await this.userService.findByEmail(signUpDto.email);
    if (existingUser && !existingUser.is_verified) {
      throw new ConflictException(ErrorCode.AUTH_EMAIL_NOT_VERIFIED);
    }

    if (existingUser) {
      throw new ConflictException(ErrorCode.AUTH_EMAIL_ALREADY_EXISTS);
    }

    const existingUsername = await this.userService.findByUsername(
      signUpDto.username,
    );
    if (existingUsername) {
      throw new ConflictException(ErrorCode.AUTH_USERNAME_ALREADY_EXISTS);
    }

    // const existingPhone = await this.userService.findByPhone(
    //   signUpDto.phone_number,
    // );
    // if (existingPhone) {
    //   throw new ConflictException(ErrorCode.AUTH_PHONE_NUMBER_ALREADY_EXISTS);
    // }

    const saltRounds = 10;
    const password_hash = await bcrypt.hash(signUpDto.password, saltRounds);
    const id = uuidv4();

    const { user } = await this.databaseService.transaction(async (trx) => {
      const user = await this.userService.createUser(
        {
          id,
          email: signUpDto.email,
          username: signUpDto.username,
          // phone_number: signUpDto.phone_number,
          password_hash,
          is_verified: false,
          is_online: false,
          has_received_welcome_message: false,
        },
        trx,
      );

      // Create user profile with fullname and phone
      const user_profile = await this.userProfileService.createProfile(
        user.id,
        {
          full_name: signUpDto.fullname,
        },
        trx,
      );

      // Assign default 'user' role
      const userRole = await this.rolesService.findByName('user', trx);
      if (!userRole) {
        throw new BadRequestException(ErrorCode.AUTH_CANNOT_CREATE_USER);
      }

      await trx<UserRoleMap>('user_role_map').insert({
        user_id: user.id,
        role_id: userRole.id,
        assigned_at: new Date(),
      });

      // Send verification code (non-blocking - user can resend if email fails)
      const verificationSent =
        await this.verificationService.sendVerificationCode(signUpDto.email);
      if (!verificationSent) {
        this.logger.warn(
          `Verification email failed for ${signUpDto.email}, user can resend`,
        );
      }

      return { user, user_profile };
    });

    const res = await this.generateAuthResponse(user);

    return {
      message:
        'User registered successfully. Please check your email for verification code.',
      ...res,
    };
  }

  async signIn(user: User) {
    return this.generateAuthResponse(user);
  }

  async verifyEmail(email: string, code: string) {
    const isValid = await this.verificationService.verifyCode(email, code);
    if (!isValid) {
      throw new BadRequestException(ErrorCode.AUTH_INVALID_VERIFICATION_CODE);
    }

    // Update user verification status
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException(ErrorCode.AUTH_USER_NOT_FOUND);
    }

    if (user.is_verified) {
      throw new BadRequestException(ErrorCode.AUTH_EMAIL_ALREADY_VERIFIED);
    }

    const updatedUser = await this.userService.updateUser(user.id, {
      is_verified: true,
    });

    return this.generateAuthResponse(updatedUser);
  }

  async resendVerificationCode(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException(ErrorCode.AUTH_USER_NOT_FOUND);
    }

    if (user.is_verified) {
      throw new BadRequestException(ErrorCode.AUTH_EMAIL_ALREADY_VERIFIED);
    }

    const verificationSent =
      await this.verificationService.sendVerificationCode(email);
    if (!verificationSent) {
      throw new BadRequestException(
        ErrorCode.AUTH_CANNOT_SEND_VERIFICATION_EMAIL,
      );
    }

    return {
      message: 'Verification code sent successfully',
    };
  }

  async refreshAccessToken(refreshToken: string) {
    const tokenRecord =
      await this.authTokenService.findByRefreshToken(refreshToken);

    if (
      !tokenRecord ||
      !(await this.authTokenService.isRefreshTokenValid(refreshToken))
    ) {
      throw new BadRequestException(ErrorCode.AUTH_INVALID_REFRESH_TOKEN);
    }

    const user = await this.userService.findById(tokenRecord.user_id);
    if (!user) {
      throw new BadRequestException(ErrorCode.AUTH_USER_NOT_FOUND);
    }

    const shop = await this.shopsService.findShopOfUser(user.id);

    const userRoleNames = await this.rolesService.getUserRoleNames(user.id);

    const payload = {
      email: user.email,
      sub: user.id,
      user: omit(user, ['password_hash']),
      roles: userRoleNames,
      shop,
    };

    return {
      access_token: this.jwtService.sign(payload),
      roles: userRoleNames,
    };
  }

  async logout(refreshToken: string) {
    const tokenRecord =
      await this.authTokenService.findByRefreshToken(refreshToken);

    if (!tokenRecord) {
      throw new UnauthorizedException(ErrorCode.AUTH_INVALID_REFRESH_TOKEN);
    }

    await this.authTokenService.revokeToken(tokenRecord.id);

    // Set is_online = false when user logs out
    await this.userService
      .setOnlineStatus(tokenRecord.user_id, false)
      .catch((error) => {
        // Silently handle errors to not affect logout flow
        this.logger.warn(
          `Failed to update is_online: ${this.safeErrorMessage(error)}`,
        );
      });

    return {
      message: 'Logged out successfully',
    };
  }

  async logoutAll(userId: string) {
    await this.authTokenService.revokeAllUserTokens(userId);

    // Set is_online = false when user logs out from all devices
    await this.userService.setOnlineStatus(userId, false).catch((error) => {
      // Silently handle errors to not affect logout flow
      this.logger.warn(
        `Failed to update is_online: ${this.safeErrorMessage(error)}`,
      );
    });

    return {
      message: 'Logged out from all devices successfully',
    };
  }

  async updateOnlineStatus(userId: string): Promise<void> {
    await this.userService.updateLastOnlineAtAndSetOnline(userId);
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException(ErrorCode.AUTH_USER_NOT_FOUND);
    }

    if (!user.is_verified) {
      throw new BadRequestException(ErrorCode.AUTH_EMAIL_NOT_VERIFIED);
    }

    const resetCodeSent =
      await this.verificationService.sendPasswordResetCode(email);
    if (!resetCodeSent) {
      throw new BadRequestException(
        ErrorCode.AUTH_CANNOT_SEND_VERIFICATION_EMAIL,
      );
    }

    return {
      message: 'Password reset code sent to your email',
    };
  }

  async checkResetCode(email: string, code: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException(ErrorCode.AUTH_USER_NOT_FOUND);
    }

    const isValidCode = await this.verificationService.checkPasswordResetCode(
      email,
      code,
    );
    if (!isValidCode) {
      throw new BadRequestException(ErrorCode.AUTH_INVALID_PWD_RESET_CODE);
    }

    return {
      message: 'Password reset code is valid',
      valid: true,
    };
  }

  async resetPassword(email: string, code: string, newPassword: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException(ErrorCode.AUTH_USER_NOT_FOUND);
    }

    const isValidCode = await this.verificationService.verifyPasswordResetCode(
      email,
      code,
    );
    if (!isValidCode) {
      throw new BadRequestException(ErrorCode.AUTH_INVALID_PWD_RESET_CODE);
    }

    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    await this.userService.updateUser(user.id, {
      password_hash: newPasswordHash,
    });

    // Logout user from all devices for security
    await this.authTokenService.revokeAllUserTokens(user.id);

    // Remove social login providers if any existed for this user
    await this.databaseService.transaction(async (trx) => {
      await trx('user_providers').where('user_id', user.id).del();
    });

    return {
      message:
        'Password reset successfully. Please log in with your new password.',
    };
  }

  async getCurrentUser(user: JwtAuthenticatedRequest['user']) {
    const currentUser = await this.userService.findById(
      user.sub || user.user.id,
    );
    if (!currentUser) {
      throw new UnauthorizedException(ErrorCode.AUTH_USER_NOT_FOUND);
    }

    const userId = currentUser.id;
    const [userProfile, shop, wallet] = await Promise.all([
      this.userProfileService.getProfile(userId),
      this.shopsService.findShopDetailOfUser(userId),
      this.walletService.findWallet(userId),
    ]);

    return {
      user: omit(currentUser, ['password_hash']),
      profile: userProfile,
      shop,
      wallet,
    };
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<{ message: string }> {
    return await this.databaseService.transaction(async (trx) => {
      // Check if user exists
      const user = await this.userService.findById(userId);
      if (!user) {
        throw new BadRequestException(ErrorCode.AUTH_USER_NOT_FOUND);
      }

      // Check if user is social login user (has social provider)
      const socialProviderCount = await trx('user_providers')
        .where('user_id', userId)
        .count('* as count')
        .first();

      if (!socialProviderCount || Number(socialProviderCount.count) === 0) {
        throw new ForbiddenException(ErrorCode.AUTH_UPDATE_PROFILE_FORBIDDEN);
      }

      // Check if username is already taken by another user
      const existingUserByUsername = await this.userService.findByUsername(
        updateProfileDto.username,
      );
      if (existingUserByUsername && existingUserByUsername.id !== userId) {
        throw new ConflictException(ErrorCode.AUTH_USERNAME_ALREADY_EXISTS);
      }

      if (updateProfileDto.phone_number) {
        // Check if phone number is already taken by another user
        const existingUserByPhone = await this.userService.findByPhone(
          updateProfileDto.phone_number,
        );

        if (existingUserByPhone && existingUserByPhone.id !== userId) {
          throw new ConflictException(
            ErrorCode.AUTH_PHONE_NUMBER_ALREADY_EXISTS,
          );
        }
      }

      // Update user basic info
      await trx('users').where('id', userId).update({
        username: updateProfileDto.username,
        is_verified: true,
        phone_number: updateProfileDto.phone_number,
        updated_at: new Date(),
      });

      // Update user profile
      await trx('user_profiles').where('user_id', userId).update({
        full_name: updateProfileDto.full_name,
      });

      return {
        message: 'Thông tin tài khoản đã được cập nhật thành công',
      };
    });
  }

  async checkProfileCompleted(
    userId: string,
  ): Promise<{ is_profile_completed: boolean }> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException(ErrorCode.AUTH_USER_NOT_FOUND);
    }

    const userProfile = await this.userProfileService.getProfile(userId);

    const isProfileCompleted = !!(userProfile?.full_name && user?.username);

    return {
      is_profile_completed: isProfileCompleted,
    };
  }

  async generateAuthResponse(user: User) {
    const userRoleNames = await this.rolesService.getUserRoleNames(user.id);

    const shop = await this.shopsService.findShopOfUser(user.id);

    // Update last_online_at and is_online when user logs in
    await this.userService.updateLastOnlineAt(user.id).catch((error) => {
      // Silently handle errors to not affect login flow
      this.logger.warn(
        `Failed to update last_online_at: ${this.safeErrorMessage(error)}`,
      );
    });
    await this.userService.setOnlineStatus(user.id, true).catch((error) => {
      // Silently handle errors to not affect login flow
      this.logger.warn(
        `Failed to update is_online: ${this.safeErrorMessage(error)}`,
      );
    });

    const payload = {
      email: user.email,
      sub: user.id,
      user: omit(user, ['password_hash']),
      roles: userRoleNames,
      shop,
    };

    const refreshToken = await this.authTokenService.createRefreshToken(
      user.id,
    );

    return {
      access_token: this.jwtService.sign(payload),
      refresh_token: refreshToken.refresh_token,
      user: omit(user, ['password_hash']),
      roles: userRoleNames,
      shop,
    };
  }

  private safeErrorMessage(error: unknown): string {
    if (error instanceof Error && error.message) {
      return error.message;
    }
    return 'Unknown error';
  }
}
