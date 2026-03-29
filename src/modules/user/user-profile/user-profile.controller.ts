import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Request,
  Post,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import { UserProfileService } from './user-profile.service';
import { UserProfileDto } from './dto/user-profile-response.dto';
import { ErrorResponseDto } from '@/shared/dto/response.dto';
import { UseJwtAuthGuard } from '../auth/decorators/use-jwt-auth-guard.decorator';
import { JwtAuthenticatedRequest } from '@/shared/dto/jwt-authenticated-request.dto';
import { UseImageUpload } from '@/modules/file-upload/file-upload.decorators';
import { UploadImageInputDto } from '@/modules/file-upload/file-upload.dtos';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ChangePasswordResponseDto } from '@/modules/user/user-profile/dto/change-password-response.dto';
import { UpdateUserProfileDto } from './update-profile.dto';
import { SendEmailDto } from './send-email.dto';
import { VerifyEmailDto } from '../auth/dto/verify-email.dto';

/**
 * User Profile Controller
 * Handles user profile management for authenticated users
 */
@ApiTags('[User] Profile')
@Controller('')
@UseJwtAuthGuard()
@ApiBearerAuth()
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  /**
   * POST /user/profile/upload-avatar
   * Upload avatar for current user and update profile
   */
  @Post('upload-avatar')
  @UseImageUpload('file')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: 'Upload user avatar',
    description:
      'Upload an avatar image for the current user. The avatar URL will be automatically updated in the user profile after successful upload.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Avatar uploaded and profile updated successfully',
    type: UserProfileDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid file or request data',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - valid JWT token required',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User profile not found',
    type: ErrorResponseDto,
  })
  @ApiBody({ type: UploadImageInputDto })
  async uploadAvatar(
    @Request() req: JwtAuthenticatedRequest,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UserProfileDto> {
    if (!file) {
      throw new BadRequestException('No avatar file provided');
    }

    return await this.userProfileService.uploadAvatar(req.user.sub, file);
  }

  /**
   * PATCH /user/profile/change-password
   * Change user password
   */
  @Patch('change-password')
  @ApiOperation({
    summary: 'Change user password',
    description:
      "Change the authenticated user's password by providing current password and new password",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password changed successfully - user must log in again',
    type: ChangePasswordResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Invalid input data - current password incorrect or passwords do not match',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'New password must be different from current password',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - valid JWT token required',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    type: ErrorResponseDto,
  })
  async changePassword(
    @Request() req: JwtAuthenticatedRequest,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<null> {
    return await this.userProfileService.changePassword(
      req.user.sub,
      changePasswordDto,
    );
  }

  /**
   * PATCH /user/profile
   * Update user profile information
   */
  @Post('update-profile')
  @ApiOperation({
    summary: 'Update user profile',
    description: 'Update profile information of the authenticated user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profile updated successfully',
    type: UserProfileDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email or username already exists',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - valid JWT token required',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found',
    type: ErrorResponseDto,
  })
  async updateProfile(
    @Request() req: JwtAuthenticatedRequest,
    @Body() updateProfileDto: UpdateUserProfileDto,
  ): Promise<UserProfileDto> {
    return await this.userProfileService.updateProfile(
      req.user.sub,
      updateProfileDto,
    );
  }

  /**
   * PATCH /user/profile/send-email
   * Update user email
   */
  @Post('send-email')
  @ApiOperation({
    summary: 'Update user email',
    description: "Update the authenticated user's email",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Email updated successfully',
    type: UserProfileDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid email format',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already exists',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async sendEmail(
    @Request() req: JwtAuthenticatedRequest,
    @Body() dto: SendEmailDto,
  ): Promise<any> {
    // Send verification code
    await this.userProfileService.sendVerificationCode(dto.email, req.user.sub);
    return {
      message:
        'User registered successfully. Please check your email for verification code.',
    };
  }

  /**
   * PATCH /user/profile/update-email
   * Update user email
   */
  @Post('update-email')
  @ApiOperation({
    summary: 'Update user email',
    description: "Update the authenticated user's email",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Email updated successfully',
    type: UserProfileDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid email format',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email already exists',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  async updateEmail(
    @Request() req: JwtAuthenticatedRequest,
    @Body() dto: VerifyEmailDto,
  ): Promise<any> {
    // Send verification code
    return await this.userProfileService.updateEmail(dto, req.user.sub);
  }
}
