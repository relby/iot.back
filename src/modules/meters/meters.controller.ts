import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { PaginateQueryOptions } from 'src/decorators/pagination';
import { MetricEntity } from '../metrics/entities/metric.entity';
import { PaymentEntity } from '../payments/entities/payment.entity';
import { CreateMeterDto } from './dto/create-meter.dto';
import { MeterEntity } from './entities/meter.entity';
import { MetersService } from './meters.service';

@ApiTags('Счетчики')
@Controller('meters')
export class MetersController {
  public constructor(private readonly metersService: MetersService) {}

  @ApiOperation({ summary: 'Получить все счетчики' })
  @PaginateQueryOptions(MeterEntity)
  @Get()
  public async getAll(@Paginate() query: PaginateQuery) {
    return this.metersService.findAll(query);
  }

  @ApiOperation({ summary: 'Получить счетчик по серийному номеру' })
  @ApiOkResponse({ type: MeterEntity })
  @ApiNotFoundResponse({ description: 'Счетчик не найден' })
  @Get(':serial')
  public async getBySerial(@Param('serial') serial: string) {
    return this.metersService.findBySerial(serial);
  }

  @ApiOperation({ summary: 'Получить метрики по серийному номеру счетчика' })
  @PaginateQueryOptions(MetricEntity)
  @ApiNotFoundResponse({ description: 'Счетчик не найден' })
  @Get(':serial/metrics')
  public async getMetricsBySerial(
    @Param('serial') serial: string,
    @Paginate() query: PaginateQuery,
  ) {
    return this.metersService.findMetricsBySerial(serial, query);
  }

  @ApiOperation({ summary: 'Получить оплаты по серийному номеру счетчика' })
  @PaginateQueryOptions(PaymentEntity)
  @ApiNotFoundResponse({ description: 'Счетчик не найден' })
  @Get(':serial/payments')
  public async getPaymentsBySerial(
    @Param('serial') serial: string,
    @Paginate() query: PaginateQuery,
  ) {
    return this.metersService.findPaymentsBySerial(serial, query);
  }

  @ApiOperation({ summary: 'Создать или обновить счетчик' })
  @ApiOkResponse({ type: MeterEntity })
  @ApiBadRequestResponse()
  @Put()
  public async upsert(@Body() dto: CreateMeterDto) {
    return this.metersService.upsert(dto);
  }

  @ApiOperation({ summary: 'Оплатить счетчик по серийному номеру' })
  @Post(':serial/pay')
  public async payBySerial(@Param('serial') serial: string) {
    return this.metersService.payBySerial(serial);
  }

  @ApiOperation({ summary: 'Оплатить все счетчики' })
  @Post('pay')
  public async pay() {
    return this.metersService.pay();
  }
}
