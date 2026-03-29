import { ExtendedPaginationQueryDto } from '@/shared/pagination';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsIn } from 'class-validator';

export class GetUsersDto extends ExtendedPaginationQueryDto {
  @ApiPropertyOptional({ description: 'Filter by lock status, 0 hoặc 1' })
  @IsOptional()
  @IsIn([0, 1])
  isLocked?: number;

  @ApiPropertyOptional({
    description: 'Filter by verification status, 0 hoặc 1',
  })
  @IsOptional()
  @IsIn([0, 1])
  isVerified?: number;
}
