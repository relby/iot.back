import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricEntity } from '../metrics/entities/metric.entity';
import { MetricsService } from '../metrics/metrics.service';
import { PaymentEntity } from '../payments/entities/payment.entity';
import { PaymentsService } from '../payments/payments.service';
import { MeterEntity } from './entities/meter.entity';
import { MetersController } from './meters.controller';
import { MetersService } from './meters.service';
import { MeterSubscriber } from './subscribers/meter.subscriber';
import { SseModule } from '../sse/sse.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MeterEntity, MetricEntity, PaymentEntity]),
    SseModule,
  ],
  controllers: [MetersController],
  providers: [MetersService, MetricsService, PaymentsService, MeterSubscriber],
  exports: [MetersService],
})
export class MetersModule {}
