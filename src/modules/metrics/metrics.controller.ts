import { Controller, Get, Logger, ParseIntPipe } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MeterEntity } from '../meters/entities/meter.entity';
import { MetersService } from '../meters/meters.service';
import { MetricEntity } from './entities/metric.entity';
import { MetricsService } from './metrics.service';

@ApiTags('Метрики')
@Controller('metrics')
export class MetricsController {
  public constructor(
    private readonly metricsService: MetricsService,
    private readonly metersService: MetersService,
  ) {}

  @ApiOperation({ summary: 'Получить все метрики' })
  @ApiOkResponse({ type: MetricEntity, isArray: true })
  @Get()
  public async getAll() {
    return this.metricsService.findAll();
  }

  @MessagePattern('meters/+')
  public async createMetric(
    @Payload('value', new ParseIntPipe()) value: number,
    @Ctx() context: MqttContext,
  ) {
    const [_, serial] = context.getTopic().split('/');

    let meter: MeterEntity;
    try {
      meter = await this.metersService.findBySerial(serial);
    } catch (err) {
      return Logger.error(
        `Счетчик с серийным номером: ${serial} не найден`,
        'MQTT',
      );
    }

    await this.metricsService.create({ meter, value });
    Logger.log(`${serial}: ${value}`, 'MQTT');
  }
}
