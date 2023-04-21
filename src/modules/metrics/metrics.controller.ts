import { Controller, Get, Logger, ParseIntPipe } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  MqttContext,
  Payload,
} from '@nestjs/microservices';
import { MeterEntity } from '../meters/entities/meter.entity';
import { MetersService } from '../meters/meters.service';
import { MetricsService } from './metrics.service';

@Controller('metrics')
export class MetricsController {
  public constructor(
    private readonly metricsService: MetricsService,
    private readonly metersService: MetersService,
  ) {}

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
