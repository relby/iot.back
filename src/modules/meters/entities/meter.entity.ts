import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertySerial } from 'src/decorators/swagger';
import { MetricEntity } from 'src/modules/metrics/entities/metric.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

// TODO: Move documentation to separate dto
@Entity('meters')
export class MeterEntity {
  @ApiPropertySerial()
  @PrimaryColumn({ type: 'character', length: 8 })
  public serial: string;

  @ApiProperty({ type: 'string', nullable: true })
  @Column({ type: 'text', nullable: true })
  public description: string | null;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    nullable: true,
  })
  @Column({ type: 'timestamp', nullable: true })
  public lastTimePaid: string | null;

  @ApiProperty({ type: () => MetricEntity, isArray: true })
  @OneToMany(() => MetricEntity, (metric) => metric.meter)
  public metrics: MetricEntity[];
}
