import { SuccessResponseDto } from '@/shared/dto/response.dto';
import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({
    status: 200,
    description: 'Service is healthy',
    type: SuccessResponseDto<{ status: string }>,
  })
  check() {
    return { status: 'ok' };
  }
}
