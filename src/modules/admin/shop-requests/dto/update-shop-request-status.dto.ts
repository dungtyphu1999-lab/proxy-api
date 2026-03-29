import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ShopRequestStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class UpdateShopRequestStatusDto {
  @ApiProperty({
    description: 'Request status',
    enum: ShopRequestStatus,
    example: ShopRequestStatus.APPROVED,
  })
  @IsEnum(ShopRequestStatus)
  status: ShopRequestStatus;

  @ApiProperty({
    description: 'Admin note (required if rejecting)',
    example: 'Invalid CCCD images',
    required: false,
  })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  note?: string;
}
