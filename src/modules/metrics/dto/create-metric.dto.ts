import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { MeterEntity } from 'src/modules/meters/entities/meter.entity';

export class CreateMetricDto {
  @IsString()
  public readonly value: number;

  @IsString()
  @ValidateNested()
  @Type(() => MeterEntity)
  public readonly meter: MeterEntity;
}
