import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';
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

    private readonly paymentsService: PaymentsService,
  ) {}

  public async findAll(
    options: FindManyOptions<MeterEntity> = {},
  ): Promise<MeterEntity[]> {
    return this.metersRepository.find(options);
  }

  public async findBySerial(
    serial: string,
    options: FindOneOptions<MeterEntity> = {},
  ): Promise<MeterEntity> {
    const meter = await this.metersRepository.findOne({
      where: { serial },
      ...options,
    });

    if (!meter) {
      throw new HttpException('Счетчик не найден', HttpStatus.NOT_FOUND);
    }

    return meter;
  }

  public async findMetricsBySerial(serial: string): Promise<MetricEntity[]> {
    return this.findBySerial(serial, { relations: { metrics: true } }).then(
      ({ metrics }) => metrics,
    );
  }

  public async findPaymentsBySerial(serial: string): Promise<PaymentEntity[]> {
    return this.findBySerial(serial, { relations: { payments: true } }).then(
      ({ payments }) => payments,
    );
  }

  public async upsert(dto: CreateMeterDto): Promise<MeterEntity> {
    return this.metersRepository.save(dto);
  }

  public async payBySerial(serial: string): Promise<PaymentEntity> {
    const meter = await this.findBySerial(serial, {
      relations: { metrics: { payment: true } },
    });
    return this.paymentsService.create(meter);
  }

  public async pay(): Promise<PaymentEntity[]> {
    const meters = await this.findAll();
    return Promise.all(meters.map(({ serial }) => this.payBySerial(serial)));
  }
}
