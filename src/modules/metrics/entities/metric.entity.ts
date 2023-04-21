import { MeterEntity } from 'src/modules/meters/entities/meter.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('metrics')
export class MetricEntity {
  // TODO: Consider changing to a composite primary column of the fields: createAt, meterSerial?
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  public id: string;

  @CreateDateColumn()
  public createdAt: string;

  @Column()
  public value: number;

  @ManyToOne(() => MeterEntity, (meter) => meter.metrics, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  public meter: MeterEntity;
}
