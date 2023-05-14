import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { Repository } from 'typeorm';
import { MetricEntity } from '../metrics/entities/metric.entity';
import { PaymentEntity } from '../payments/entities/payment.entity';
import { PaymentsService } from '../payments/payments.service';
import { CreateMeterDto } from './dto/create-meter.dto';
import { MeterEntity } from './entities/meter.entity';

@Injectable()
export class MetersService {
  public constructor(
    @InjectRepository(MeterEntity)
    private readonly metersRepository: Repository<MeterEntity>,

    @InjectRepository(MetricEntity)
    private readonly metricsRepository: Repository<MetricEntity>,

    @InjectRepository(PaymentEntity)
    private readonly paymentsRepository: Repository<PaymentEntity>,

    private readonly paymentsService: PaymentsService,
  ) {}

  public async findAll(query: PaginateQuery): Promise<Paginated<MeterEntity>> {
    return paginate(query, this.metersRepository, {
      sortableColumns: ['serial'],
    });
  }

  public async findBySerial(serial: string): Promise<MeterEntity> {
    const meter = await this.metersRepository.findOne({
      where: { serial },
      relations: { metrics: true },
    });

    if (!meter) {
      throw new HttpException('Счетчик не найден', HttpStatus.NOT_FOUND);
    }

    return meter;
  }

  public async findMetricsBySerial(
    serial: string,
    query: PaginateQuery,
  ): Promise<Paginated<MetricEntity>> {
    return paginate(query, this.metricsRepository, {
      sortableColumns: ['id'],
      where: { meter: { serial } },
    });
  }

  public async findPaymentsBySerial(
    serial: string,
    query: PaginateQuery,
  ): Promise<Paginated<PaymentEntity>> {
    return paginate(query, this.paymentsRepository, {
      sortableColumns: ['id'],
      where: { meter: { serial } },
    });
  }

  public async upsert(dto: CreateMeterDto): Promise<MeterEntity> {
    return this.metersRepository.save(dto);
  }

  public async payBySerial(serial: string): Promise<void> {
    const meter = await this.findBySerial(serial);
    await this.paymentsService.create(meter);
  }

  public async pay(): Promise<void> {
    const meters = await this.metersRepository.find();
    await Promise.all(
      meters.map((meter) => this.paymentsService.create(meter)),
    );
  }
}
