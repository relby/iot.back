import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMetricDto } from './dto/create-metric.dto';
import { MetricEntity } from './entities/metric.entity';

@Injectable()
export class MetricsService {
  public constructor(
    @InjectRepository(MetricEntity)
    private readonly metricsRepository: Repository<MetricEntity>,
  ) {}

  public async findAll() {
    return this.metricsRepository.find();
  }

  public async create(dto: CreateMetricDto) {
    return this.metricsRepository.save(dto);
  }
}
