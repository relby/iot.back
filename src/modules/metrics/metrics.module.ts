import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeterEntity } from '../meters/entities/meter.entity';
import { MetersService } from '../meters/meters.service';
import { PaymentEntity } from '../payments/entities/payment.entity';
import { PaymentsService } from '../payments/payments.service';
import { MetricEntity } from './entities/metric.entity';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MeterEntity, MetricEntity, PaymentEntity]),
  ],
  controllers: [MetricsController],
  providers: [MetersService, MetricsService, PaymentsService],
  exports: [MetricsService],
})
export class MetricsModule {}
