import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMeterDto } from './dto/create-meter.dto';
import { MeterEntity } from './entities/meter.entity';
import { MetersService } from './meters.service';

@ApiTags('Счетчики')
@Controller('meters')
export class MetersController {
  public constructor(private readonly metersService: MetersService) {}

  @ApiOperation({ summary: 'Получить все счетчики' })
  @Get()
  public async getAll() {
    return this.metersService.findAll();
  }

  @ApiOperation({ summary: 'Получить счетчик по серийному номеру' })
  @ApiOkResponse({ type: MeterEntity })
  @ApiNotFoundResponse({ description: 'Счетчик не найден' })
  @Get(':serial')
  public async getBySerial(@Param('serial') serial: string) {
    return this.metersService.findBySerial(serial);
  }

  @ApiOperation({ summary: 'Получить метрики по серийному номеру счетчика' })
  @ApiNotFoundResponse({ description: 'Счетчик не найден' })
  @Get(':serial/metrics')
  public async getMetricsBySerial(@Param('serial') serial: string) {
    return this.metersService.findMetricsBySerial(serial);
  }

  @ApiOperation({ summary: 'Получить оплаты по серийному номеру счетчика' })
  @ApiNotFoundResponse({ description: 'Счетчик не найден' })
  @Get(':serial/payments')
  public async getPaymentsBySerial(@Param('serial') serial: string) {
    return this.metersService.findPaymentsBySerial(serial);
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
