import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AdminAuthService } from './admin-auth.service';
import { ForgotPasswordDto } from '@/modules/user/auth/dto/forgot-password.dto';
import { ResetPasswordDto } from '@/modules/user/auth/dto/reset-password.dto';
import { VerifyResetCodeDto } from '@/modules/user/auth/dto/verify-reset-code.dto';
import { SuccessResponseDto } from '@/shared/dto/response.dto';

@ApiTags('[Admin] Authentication')
@Controller()
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('forgot-password')
  @ApiOperation({ summary: 'Send password reset code to admin email' })
  @ApiResponse({
    status: 200,
    description: 'Password reset code sent successfully',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Admin not found, email not verified, or not an admin',
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.adminAuthService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('verify-reset-code')
  @ApiOperation({
    summary: 'Verify admin password reset code without resetting password',
  })
  @ApiResponse({
    status: 200,
    description: 'Code is valid',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid or expired verification code, or not an admin',
  })
  async verifyResetCode(@Body() verifyResetCodeDto: VerifyResetCodeDto) {
    return this.adminAuthService.checkResetCode(
      verifyResetCodeDto.email,
      verifyResetCodeDto.code,
    );
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset admin password using verification code' })
  @ApiResponse({
    status: 200,
    description: 'Admin password reset successfully',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid verification code, admin not found, or not an admin',
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.adminAuthService.resetPassword(
      resetPasswordDto.email,
      resetPasswordDto.code,
      resetPasswordDto.new_password,
    );
  }
}
