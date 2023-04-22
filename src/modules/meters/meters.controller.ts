import { Body, Controller, Get, Param, Patch, Put } from '@nestjs/common';
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
  @ApiOkResponse({ type: MeterEntity, isArray: true })
  @Get()
  public async getAll() {
    return this.metersService.findAll();
  }

  @ApiOperation({ summary: 'Получить счетчик по серийному номеру' })
  @ApiOkResponse({ type: MeterEntity, isArray: true })
  @ApiNotFoundResponse({ description: 'Счетчик не найден' })
  @Get(':serial')
  public async getBySerial(@Param('serial') serial: string) {
    return this.metersService.findBySerial(serial);
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
