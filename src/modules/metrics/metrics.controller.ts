import {
  Controller,
  Get,
  Logger,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricEntity } from './entities/metric.entity';
import { MetricsService } from './metrics.service';

@ApiTags('Метрики')
@Controller('metrics')
export class MetricsController {
  public constructor(private readonly metricsService: MetricsService) {}

  @ApiOperation({ summary: 'Получить все метрики' })
  @ApiOkResponse({ type: Paginated<MetricEntity> })
  @Get()
  public async getAll(@Paginate() query: PaginateQuery) {
    return this.metricsService.findAll(query);
  }

  @UsePipes(new ValidationPipe())
  @EventPattern('postMetric')
  public async createMetric(@Payload() dto: CreateMetricDto) {
    await this.metricsService.create(dto);

    Logger.log(`${dto.serial}: ${dto.value}`, 'postMetric');
  }
}
