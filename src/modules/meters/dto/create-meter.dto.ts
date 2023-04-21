import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { SERIAL_LENGTH } from 'src/constants';

export class CreateMeterDto {
  @IsString()
  @MinLength(SERIAL_LENGTH)
  @MaxLength(SERIAL_LENGTH)
  public readonly serial: string;

  @IsOptional()
  @IsString()
  public readonly description?: string;
}
