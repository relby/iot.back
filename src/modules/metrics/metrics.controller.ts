import { Controller, Logger, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricsService } from './metrics.service';

@ApiTags('Метрики')
@Controller('metrics')
export class MetricsController {
  public constructor(private readonly metricsService: MetricsService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern('postMetric')
  public async createMetric(@Payload() dto: CreateMetricDto) {
    await this.metricsService.create(dto);

    Logger.log(`${dto.serial}: ${dto.watts}`, 'postMetric');
  }
}
