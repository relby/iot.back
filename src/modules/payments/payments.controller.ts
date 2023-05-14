import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { PaymentEntity } from './entities/payment.entity';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  public constructor(private readonly paymentsService: PaymentsService) {}

  @ApiOperation({ summary: 'Получить все оплаты' })
  @ApiOkResponse({ type: Paginated<PaymentEntity> })
  @Get()
  public async getAll(@Paginate() query: PaginateQuery) {
    return this.paymentsService.findAll(query);
  }
}
