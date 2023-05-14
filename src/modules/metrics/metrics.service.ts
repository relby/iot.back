import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { MetersService } from '../meters/meters.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricEntity } from './entities/metric.entity';

@Injectable()
export class MetricsService {
  public constructor(
    @InjectRepository(MetricEntity)
    private readonly metricsRepository: Repository<MetricEntity>,

    private readonly metersService: MetersService,
  ) {}

  public async findAll(query: PaginateQuery): Promise<Paginated<MetricEntity>> {
    return paginate(query, this.metricsRepository, {
      sortableColumns: ['id'],
    });
  }

  public async create({
    serial,
    value,
  }: CreateMetricDto): Promise<MetricEntity> {
    const meter = await this.metersService.upsert({ serial });
    return this.metricsRepository.save({ meter, value });
  }
}
