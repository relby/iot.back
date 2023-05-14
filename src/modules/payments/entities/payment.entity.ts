import { ApiProperty } from '@nestjs/swagger';
import { MeterEntity } from 'src/modules/meters/entities/meter.entity';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('payments')
export class PaymentEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  public id: string;

  @ApiProperty({ format: 'date-time' })
  @CreateDateColumn()
  public timestamp: string;

  @ManyToOne(() => MeterEntity, (meter) => meter.payments, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  public meter: MeterEntity;
}
