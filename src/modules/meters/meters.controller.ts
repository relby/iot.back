import { Body, Controller, Get, Param, Patch, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
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
  @ApiOkResponse({ type: Paginated<MeterEntity> })
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
  @ApiOkResponse({ type: Paginated<MetricEntity> })
  @ApiNotFoundResponse({ description: 'Счетчик не найден' })
  @Get(':serial/metrics')
  public async getMetricsBySerial(
    @Param('serial') serial: string,
    @Paginate() query: PaginateQuery,
  ) {
    return this.metersService.findMetricsBySerial(serial, query);
  }

  @ApiOperation({ summary: 'Получить оплаты по серийному номеру счетчика' })
  @ApiOkResponse({ type: Paginated<PaymentEntity> })
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
  @ApiNotFoundResponse({ description: 'Счетчик не найден' })
  @Patch(':serial')
  public async payBySerial(@Param('serial') serial: string) {
    return this.metersService.payBySerial(serial);
  }
}
