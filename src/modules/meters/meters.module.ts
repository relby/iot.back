import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetricEntity } from '../metrics/entities/metric.entity';
import { PaymentEntity } from '../payments/entities/payment.entity';
import { MeterEntity } from './entities/meter.entity';
import { MetersController } from './meters.controller';
import { MetersService } from './meters.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([MeterEntity, MetricEntity, PaymentEntity]),
  ],
  controllers: [MetersController],
  providers: [MetersService],
  exports: [MetersService],
})
export class MetersModule {}
