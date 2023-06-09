import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  public async create({
    serial,
    watts,
  }: CreateMetricDto): Promise<MetricEntity> {
    const meter = await this.metersService.upsert({ serial });
    return this.metricsRepository.save({ meter, watts });
  }
}
