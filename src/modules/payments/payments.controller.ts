import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { PaginateQueryOptions } from 'src/decorators/pagination';
import { PaymentEntity } from './entities/payment.entity';
import { PaymentsService } from './payments.service';

@ApiTags('Оплаты')
@Controller('payments')
export class PaymentsController {
  public constructor(private readonly paymentsService: PaymentsService) {}

  @ApiOperation({ summary: 'Получить все оплаты' })
  @PaginateQueryOptions(PaymentEntity)
  @Get()
  public async getAll(@Paginate() query: PaginateQuery) {
    return this.paymentsService.findAll(query);
  }
}
