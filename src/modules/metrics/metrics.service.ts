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

  public async findAll() {
    return this.metricsRepository.find();
  }

  public async create({ serial, value }: CreateMetricDto) {
    const meter = await this.metersService.findBySerial(serial);
    return this.metricsRepository.save({ meter, value });
  }
}
