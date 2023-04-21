import { MetricEntity } from 'src/modules/metrics/entities/metric.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('meters')
export class MeterEntity {
  @PrimaryColumn({ type: 'character', length: 8 })
  public serial: string;

  @Column({ type: 'text', nullable: true })
  public description: string | null;

  @Column({ type: 'timestamp', nullable: true })
  public lastTimePaid: Date | null;

  @OneToMany(() => MetricEntity, (metric) => metric.meter)
  public metrics: MetricEntity[];
}
