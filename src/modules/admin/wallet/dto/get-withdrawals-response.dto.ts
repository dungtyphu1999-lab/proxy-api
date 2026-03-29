import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResult } from '@/shared/pagination/pagination.interface';
import { AdminWithdrawResponseDto } from '@/modules/user/wallet/dto/admin-withdraw-response.dto';

export class GetWithdrawalsResponseDto
  implements PaginatedResult<AdminWithdrawResponseDto>
{
  @ApiProperty({
    description: 'Danh sách giao dịch rút tiền',
    type: [AdminWithdrawResponseDto],
  })
  records: AdminWithdrawResponseDto[];

  @ApiProperty({
    description: 'Thông tin phân trang',
  })
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    previousPage: number | null;
    nextPage: number | null;
  };

  @ApiProperty({
    description: 'Số ngày tạm giữ tiền',
    example: 7,
  })
  money_holding_days: number;
}
