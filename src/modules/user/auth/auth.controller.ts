import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { VerifyEmailDto } from './dto/verify-email.dto';
import { SendVerificationDto } from './dto/send-verification.dto';
import { LogoutDto } from './dto/logout.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyResetCodeDto } from './dto/verify-reset-code.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SuccessResponseDto } from '@/shared/dto/response.dto';
import { AuthenticatedRequest } from './dto/req-user.dto';
import { UseJwtAuthGuard } from './decorators/use-jwt-auth-guard.decorator';
import { JwtAuthenticatedRequest } from '@/shared/dto/jwt-authenticated-request.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { ResendCodeRateLimitGuard } from '@/modules/rate-limit/resend-code-rate-limit.guard';
import { ResendCodeRateLimit } from '@/modules/rate-limit/resend-code-rate-limit.decorator';
import { SignInRateLimitGuard } from '@/modules/rate-limit/signin-rate-limit.guard';
import { SignInRateLimit } from '@/modules/rate-limit/signin-rate-limit.decorator';
import { DomainRoleGuard } from './guards/domain-role.guard';
import { SocialAuthService } from './social-auth.service';
import {
  GoogleAuthDto,
  FacebookAuthDto,
  SocialAuthResponse,
} from './dto/social-auth.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CheckProfileCompletedResponseDto } from './dto/check-profile-completed-response.dto';

@ApiTags('Authentication')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly socialAuthService: SocialAuthService,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'User sign up' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 200,
    description:
      'Email already registered but not verified. Verification code resent.',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({
    status: 409,
    description: 'Email already exists and is verified',
  })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @UseGuards(SignInRateLimitGuard, LocalAuthGuard, DomainRoleGuard)
  @SignInRateLimit({
    windowMs: 10 * 60 * 1000,
    maxAttempts: 10,
    message:
      'Too many sign-in attempts from your network. Please try again after 10 minutes.',
  })
  @Post('signin')
  @HttpCode(200)
  @ApiOperation({ summary: 'User sign in' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({
    status: 200,
    description: 'User successfully signed in',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  signIn(@Request() req: AuthenticatedRequest) {
    return this.authService.signIn(req.user);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify email address' })
  @ApiResponse({
    status: 200,
    description: 'Email successfully verified',
    type: AuthResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid verification code' })
  async verifyEmail(@Body() verifyEmailDto: VerifyEmailDto) {
    return this.authService.verifyEmail(
      verifyEmailDto.email,
      verifyEmailDto.code,
    );
  }

  @Post('resend-verification')
  @UseGuards(ResendCodeRateLimitGuard)
  @ResendCodeRateLimit({
    windowMs: 120 * 1000, // 120 seconds in milliseconds
    maxAttempts: 1,
    message:
      'Verification email can only be resent once per two minutes. Please try again later.',
  })
  @ApiOperation({ summary: 'Resend email verification code' })
  @ApiResponse({
    status: 200,
    description: 'Verification code sent successfully',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid email address or rate limit exceeded',
  })
  async resendVerification(@Body() sendVerificationDto: SendVerificationDto) {
    return this.authService.resendVerificationCode(sendVerificationDto.email);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({
    status: 200,
    description: 'Access token refreshed successfully',
    type: RefreshResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid or expired refresh token' })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshAccessToken(refreshTokenDto.refresh_token);
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({
    status: 200,
    description: 'User logged out successfully',
    type: SuccessResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid refresh token' })
  async logout(@Body() logoutDto: LogoutDto) {
    return this.authService.logout(logoutDto.refresh_token);
  }

  @UseJwtAuthGuard()
  @Post('update-online-status')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update online status (polling endpoint)' })
  @ApiResponse({
    status: 200,
    description: 'Online status updated successfully',
    type: SuccessResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateOnlineStatus(@Request() req: JwtAuthenticatedRequest) {
    const userId = req.user.sub;
    await this.authService.updateOnlineStatus(userId);
    return {
      message: 'Online status updated successfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout-all')
  @ApiOperation({ summary: 'Logout user from all devices' })
  @ApiResponse({
    status: 200,
    description: 'User logged out from all devices successfully',
    type: SuccessResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async logoutAll(@Request() req: JwtAuthenticatedRequest) {
    return this.authService.logoutAll(req.user.sub);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Send password reset code to email' })
  @ApiResponse({
    status: 200,
    description: 'Password reset code sent successfully',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'User not found or email not verified',
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('verify-reset-code')
  @ApiOperation({
    summary: 'Verify password reset code without resetting password',
  })
  @ApiResponse({
    status: 200,
    description: 'Code is valid',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid or expired verification code',
  })
  async verifyResetCode(@Body() verifyResetCodeDto: VerifyResetCodeDto) {
    return this.authService.checkResetCode(
      verifyResetCodeDto.email,
      verifyResetCodeDto.code,
    );
  }

  @Post('reset-password')
  @ApiOperation({ summary: 'Reset password using verification code' })
  @ApiResponse({
    status: 200,
    description: 'Password reset successfully',
    type: SuccessResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid verification code or user not found',
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(
      resetPasswordDto.email,
      resetPasswordDto.code,
      resetPasswordDto.new_password,
    );
  }

  @UseJwtAuthGuard()
  @Get('me')
  @ApiOperation({ summary: 'Get current user information' })
  @ApiResponse({
    status: 200,
    description: 'Current user information retrieved successfully',
    type: SuccessResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getMe(@Request() req: JwtAuthenticatedRequest) {
    return this.authService.getCurrentUser(req.user);
  }

  @UseJwtAuthGuard()
  @Get('check-profile-completed')
  @ApiOperation({
    summary: 'Check if user profile is completed',
    description:
      'Check if user profile is completed (has phone_number, full_name, username)',
  })
  @ApiResponse({
    status: 200,
    description: 'Profile completion status retrieved successfully',
    type: CheckProfileCompletedResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async checkProfileCompleted(@Request() req: JwtAuthenticatedRequest) {
    return this.authService.checkProfileCompleted(req.user.sub);
  }

  @UseJwtAuthGuard()
  @Post('update-profile')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Update account information',
    description:
      'Update account information after social login (Google/Facebook). Email cannot be changed.',
  })
  @ApiResponse({
    status: 200,
    description: 'Account information updated successfully',
    type: SuccessResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({
    status: 403,
    description: 'Only social login users can update profile',
  })
  @ApiResponse({ status: 409, description: 'Username already exists' })
  async updateProfile(
    @Request() req: JwtAuthenticatedRequest,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const result = await this.authService.updateProfile(
      req.user.sub,
      updateProfileDto,
    );
    return result;
  }

  @Post('google/callback')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Google OAuth callback',
    description:
      'Social login for site users only. Admin users cannot use social login. ' +
      'Uses Google ID Token (JWT) for secure authentication.',
  })
  @ApiResponse({
    status: 200,
    description: 'Google authentication successful',
    type: SocialAuthResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid Google ID token or user is not a site user',
  })
  @ApiResponse({
    status: 409,
    description: 'Email already exists with different provider',
  })
  async googleCallback(
    @Body() googleAuthDto: GoogleAuthDto,
  ): Promise<SocialAuthResponse> {
    const userInfo = await this.socialAuthService.verifyGoogleToken(
      googleAuthDto.idToken,
    );
    return this.socialAuthService.handleSocialLogin(userInfo);
  }

  // TODO: Facebook callback
  @Post('facebook/callback')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Facebook OAuth callback',
    description:
      'Social login for site users only. Admin users cannot use social login.',
  })
  @ApiResponse({
    status: 200,
    description: 'Facebook authentication successful',
    type: SocialAuthResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid Facebook token or user is not a site user',
  })
  @ApiResponse({
    status: 409,
    description: 'Email already exists with different provider',
  })
  async facebookCallback(
    @Body() facebookAuthDto: FacebookAuthDto,
  ): Promise<SocialAuthResponse> {
    const userInfo = await this.socialAuthService.verifyFacebookToken(
      facebookAuthDto.accessToken,
    );
    return this.socialAuthService.handleSocialLogin(userInfo);
  }
}
