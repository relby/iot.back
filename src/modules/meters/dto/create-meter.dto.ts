import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { SERIAL_LENGTH } from 'src/constants';
import { ApiPropertySerial } from 'src/decorators/swagger';

export class CreateMeterDto {
  @ApiPropertySerial()
  @IsString()
  @MinLength(SERIAL_LENGTH)
  @MaxLength(SERIAL_LENGTH)
  public readonly serial: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public readonly description?: string;
}
