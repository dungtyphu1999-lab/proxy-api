import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '@/modules/user/user/user.service';
import { VerificationService } from '@/modules/user/auth/verification.service';
import { AuthTokenService } from '@/modules/user/auth-token/auth-token.service';
import { RolesService } from '@/modules/user/roles/roles.service';
import { ErrorCode } from '@/shared/constants/error-codes.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly userService: UserService,
    private readonly verificationService: VerificationService,
    private readonly authTokenService: AuthTokenService,
    private readonly rolesService: RolesService,
  ) {}

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException(ErrorCode.AUTH_USER_NOT_FOUND);
    }

    if (!user.is_verified) {
      throw new BadRequestException(ErrorCode.AUTH_EMAIL_NOT_VERIFIED);
    }

    // Check if user has admin role
    const userRoles = await this.rolesService.getUserRoleNames(user.id);
    if (!userRoles.includes('admin')) {
      throw new BadRequestException(ErrorCode.AUTH_IS_NOT_ADMIN);
    }

    const resetCodeSent =
      await this.verificationService.sendPasswordResetCode(email);
    if (!resetCodeSent) {
      throw new BadRequestException(
        ErrorCode.AUTH_CANNOT_SEND_VERIFICATION_EMAIL,
      );
    }

    return {
      message: 'Password reset code sent to your admin email',
    };
  }

  async checkResetCode(email: string, code: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException(ErrorCode.AUTH_USER_NOT_FOUND);
    }

    // Check if user has admin role
    const userRoles = await this.rolesService.getUserRoleNames(user.id);
    if (!userRoles.includes('admin')) {
      throw new BadRequestException(ErrorCode.AUTH_IS_NOT_ADMIN);
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

    // Check if user has admin role
    const userRoles = await this.rolesService.getUserRoleNames(user.id);
    if (!userRoles.includes('admin')) {
      throw new BadRequestException(ErrorCode.AUTH_IS_NOT_ADMIN);
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

    // Logout admin from all devices for security
    await this.authTokenService.revokeAllUserTokens(user.id);

    return {
      message:
        'Admin password reset successfully. Please log in with your new password.',
    };
  }
}
