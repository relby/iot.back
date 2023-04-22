import {
  Controller,
  Get,
  Logger,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricEntity } from './entities/metric.entity';
import { MetricsService } from './metrics.service';

@ApiTags('Метрики')
@Controller('metrics')
export class MetricsController {
  public constructor(private readonly metricsService: MetricsService) {}

  @ApiOperation({ summary: 'Получить все метрики' })
  @ApiOkResponse({ type: MetricEntity, isArray: true })
  @Get()
  public async getAll() {
    return this.metricsService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @EventPattern('postMetric')
  public async createMetric(@Payload() dto: CreateMetricDto) {
    await this.metricsService.create(dto);

    Logger.log(`${dto.serial}: ${dto.value}`, 'postMetric');
  }
}
