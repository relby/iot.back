import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeterEntity } from '../meters/entities/meter.entity';
import { MetersService } from '../meters/meters.service';
import { MetricEntity } from '../metrics/entities/metric.entity';
import { MetricsService } from '../metrics/metrics.service';
import { PaymentEntity } from './entities/payment.entity';
import { PaymentsService } from './payments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MeterEntity, MetricEntity, PaymentEntity]),
  ],
  controllers: [],
  providers: [MetersService, MetricsService, PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
