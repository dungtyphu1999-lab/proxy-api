import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export enum UserStatus {
  DRAFT = 'draft',
  PENDING = 'pending',
  PUBLISHED = 'published',
  REJECTED = 'rejected',
  HIDDEN = 'hidden',
}

export class UpdateUserStatusInputDto {
  @ApiProperty({
    description: 'Whether the user is locked',
    example: true,
  })
  @IsBoolean()
  isLocked: boolean;

  @ApiProperty({
    description: 'Optional reason for the status change',
    example: 'Approved after review',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  reason?: string;

  @ApiProperty({
    description: 'Optional note for the status change',
    example: 'Approved after review',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  note?: string;
}
