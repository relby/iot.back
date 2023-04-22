import { IsNumber } from 'class-validator';
import { IsSerial } from 'src/decorators';

export class CreateMetricDto {
  @IsSerial()
  public readonly serial: string;

  @IsNumber()
  public readonly value: number;
}
