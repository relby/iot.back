import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeterEntity } from '../meters/entities/meter.entity';
import { PaymentEntity } from './entities/payment.entity';

export class PaymentsService {
  public constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentsRepository: Repository<PaymentEntity>,
  ) {}

  public async create(meter: MeterEntity): Promise<PaymentEntity> {
    return this.paymentsRepository.save({
      meter,
      metrics: meter.metrics.filter((metric) => metric.payment === null),
    });
  }
}
