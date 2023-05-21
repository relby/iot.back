import { Controller, Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { SseService } from '../sse/sse.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricsService } from './metrics.service';

@ApiTags('Метрики')
@Controller('metrics')
export class MetricsController {
  public constructor(
    private readonly metricsService: MetricsService,
    private readonly sseService: SseService,
  ) {}

  @UsePipes(new ValidationPipe())
  @EventPattern('postMetric')
  public async createMetric(@Payload() dto: CreateMetricDto) {
    await this.metricsService.create(dto);

    this.sseService.addEvent(dto);

    Logger.log(`${dto.serial}: ${dto.watts}`, 'postMetric');
  }
}
