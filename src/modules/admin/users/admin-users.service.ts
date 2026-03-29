import { User } from '@/database/entities/user.entity';
import { VerificationService } from '@/modules/user/auth/verification.service';
import { ErrorCode } from '@/shared/constants/error-codes.enum';
import { PaginatedResult, PaginationOptions } from '@/shared/pagination';
import { EncryptionUtil } from '@/shared/utils/encryption-hashing.util';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AdminUsersRepository } from './admin-users.repository';
import { UpdateUserStatusInputDto } from './dto/update-user-status.dto';

@Injectable()
export class AdminUsersService {
  constructor(
    private readonly adminUsersRepository: AdminUsersRepository,
    private readonly verificationService: VerificationService,
  ) {}

  async findUserById(
    id: string,
  ): Promise<(User & { full_name: string }) | null> {
    const user = await this.adminUsersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findAllUsers(
    options: PaginationOptions & {
      isLocked?: number;
      isVerified?: number;
    } = {},
  ): Promise<PaginatedResult<User>> {
    return await this.adminUsersRepository.findAllUsers(options);
  }

  async updateUserStatus(
    userId: string,
    data: UpdateUserStatusInputDto,
    adminUserId: string,
  ) {
    // Check if user exists and get current status
    const currentUser = await this.adminUsersRepository.findById(userId);

    if (!currentUser) {
      throw new NotFoundException('User not found');
    }

    return await this.adminUsersRepository.updateUserStatusAndLog(
      userId,
      data.isLocked,
      data.reason || '',
      data.note || '',
      adminUserId,
    );
  }

  async resetPassword(userId: string) {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new BadRequestException(ErrorCode.AUTH_USER_NOT_FOUND);
    }

    if (!user.is_verified) {
      throw new BadRequestException(ErrorCode.AUTH_EMAIL_NOT_VERIFIED);
    }

    const newPassword = EncryptionUtil.generateStrongPassword();
    const hashedPassword = EncryptionUtil.generateHash(newPassword);

    const updatedUser = await this.adminUsersRepository.updateUser(user.id, {
      password_hash: hashedPassword,
    });

    const verificationSent = await this.verificationService.sendPassword(
      user.full_name,
      updatedUser.email,
      newPassword,
    );

    if (!verificationSent) {
      throw new BadRequestException(
        ErrorCode.AUTH_CANNOT_SEND_VERIFICATION_EMAIL,
      );
    }

    return { success: true, message: 'Password reset successfully' };
  }
}
