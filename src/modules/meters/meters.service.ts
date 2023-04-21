import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeterDto } from './dto/create-meter.dto';
import { MeterEntity } from './entities/meter.entity';

@Injectable()
export class MetersService {
  public constructor(
    @InjectRepository(MeterEntity)
    private readonly metersRepository: Repository<MeterEntity>,
  ) {}

  public async findAll(): Promise<MeterEntity[]> {
    return this.metersRepository.find();
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

  public async upsert(dto: CreateMeterDto) {
    return this.metersRepository.save(dto);
  }

  public async payBySerial(serial: string) {
    // TODO: Unimplemented
  }
}
