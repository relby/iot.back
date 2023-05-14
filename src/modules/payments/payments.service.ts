import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { MeterEntity } from '../meters/entities/meter.entity';
import { PaymentEntity } from './entities/payment.entity';

export class PaymentsService {
  public constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentsRepository: Repository<PaymentEntity>,
  ) {}

  public async findAll(
    query: PaginateQuery,
  ): Promise<Paginated<PaymentEntity>> {
    return paginate(query, this.paymentsRepository, {
      sortableColumns: ['id'],
    });
  }

  public async create(meter: MeterEntity): Promise<PaymentEntity> {
    return this.paymentsRepository.save({ meter });
  }
}
