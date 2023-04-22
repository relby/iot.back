import { ApiProperty } from '@nestjs/swagger';
import { MeterEntity } from 'src/modules/meters/entities/meter.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

// TODO: Move documentation to separate dto
@Entity('metrics')
export class MetricEntity {
  // TODO: Consider changing to a composite primary column of the fields: createAt, meterSerial?
  @ApiProperty()
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  public id: string;

  @ApiProperty({ format: 'date-time' })
  @CreateDateColumn()
  public createdAt: string;

  @ApiProperty()
  @Column()
  public value: number;

  @ManyToOne(() => MeterEntity, (meter) => meter.metrics, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  public meter: MeterEntity;
}
