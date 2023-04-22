import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { ApiPropertySerial, IsSerial } from 'src/decorators';

export class CreateMeterDto {
  @ApiPropertySerial()
  @IsSerial()
  public readonly serial: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public readonly description?: string;
}
