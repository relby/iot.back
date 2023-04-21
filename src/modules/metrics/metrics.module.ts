import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeterEntity } from '../meters/entities/meter.entity';
import { MetersService } from '../meters/meters.service';
import { MetricEntity } from './entities/metric.entity';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';

@Module({
  imports: [TypeOrmModule.forFeature([MetricEntity, MeterEntity])],
  controllers: [MetricsController],
  providers: [MetricsService, MetersService],
})
export class MetricsModule {}
