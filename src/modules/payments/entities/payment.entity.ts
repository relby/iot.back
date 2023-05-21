import { ApiProperty } from '@nestjs/swagger';
import { MeterEntity } from 'src/modules/meters/entities/meter.entity';
import { MetricEntity } from 'src/modules/metrics/entities/metric.entity';
import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('payments')
export class PaymentEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  public id: string;

  @ApiProperty({ format: 'date-time' })
  @CreateDateColumn()
  public createdAt: string;

  @ManyToOne(() => MeterEntity, (meter) => meter.payments, {
    nullable: false,
    onDelete: 'CASCADE',
    cascade: true,
  })
  public meter: MeterEntity;

  @OneToMany(() => MetricEntity, (metric) => metric.payment)
  public metrics: MetricEntity[];
}
