import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { SuccessResponseDto } from '@/shared/dto/response.dto';

export class TelegramSettingsDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  notify_new_message: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  notify_new_order: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  notify_new_preorder: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  notify_warranty_request: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  notify_new_complaint: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  notify_admin: boolean;
}

export class UpdateTelegramSettingsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  notify_new_message?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  notify_new_order?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  notify_new_preorder?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  notify_warranty_request?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  notify_new_complaint?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  notify_admin?: boolean;
}

export class TelegramSettingsResponseDto extends SuccessResponseDto<TelegramSettingsDto> {}
