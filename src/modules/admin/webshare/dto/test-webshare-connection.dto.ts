import { IsString } from 'class-validator';

export class TestWebshareConnectionDto {
  @IsString()
  api_key: string;
}

