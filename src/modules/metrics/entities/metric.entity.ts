import { ApiProperty } from '@nestjs/swagger';
import { WATT_PRICE } from 'src/constants';
import { MeterEntity } from 'src/modules/meters/entities/meter.entity';
import { PaymentEntity } from 'src/modules/payments/entities/payment.entity';
import {
  AfterLoad,
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// TODO: Move documentation to separate dto
@Entity('metrics')
export class MetricEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  public id: string;

  @ApiProperty({ format: 'date-time' })
  @CreateDateColumn()
  public createdAt: string;

  @ApiProperty()
  @Column()
  public watts: number;

  @ManyToOne(() => MeterEntity, (meter) => meter.metrics, {
    nullable: false,
    onDelete: 'CASCADE',
    cascade: true,
  })
  public meter: MeterEntity;

  @ManyToOne(() => PaymentEntity, (payment) => payment.metrics, {
    nullable: true,
    onDelete: 'CASCADE',
    cascade: true,
  })
  public payment: PaymentEntity | null;

  public cost: number;

  @AfterLoad()
  public calculateAndSetCost() {
    this.cost = this.watts * WATT_PRICE;
  }
}
