import { ApiProperty } from '@nestjs/swagger';
import { ApiPropertySerial } from 'src/decorators';
import { MetricEntity } from 'src/modules/metrics/entities/metric.entity';
import { PaymentEntity } from 'src/modules/payments/entities/payment.entity';
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

  @OneToMany(() => PaymentEntity, (payment) => payment.meter)
  public payments: PaymentEntity[];

  @OneToMany(() => MetricEntity, (metric) => metric.meter)
  public metrics: MetricEntity[];
}
