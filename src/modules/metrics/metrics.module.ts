import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeterEntity } from '../meters/entities/meter.entity';
import { MetersModule } from '../meters/meters.module';
import { MetersService } from '../meters/meters.service';
import { MetricEntity } from './entities/metric.entity';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';

@Module({
  imports: [MetersModule, TypeOrmModule.forFeature([MetricEntity])],
  controllers: [MetricsController],
  providers: [MetricsService],
  exports: [MetricsService],
})
export class MetricsModule {}
