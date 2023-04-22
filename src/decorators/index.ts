import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { SERIAL_LENGTH } from 'src/constants';

export const ApiPropertySerial = (options?: ApiPropertyOptions) => {
  return ApiProperty({
    example: '00000001',
    minLength: SERIAL_LENGTH,
    maxLength: SERIAL_LENGTH,
    ...options,
  });
};

export const IsSerial = () => {
  return applyDecorators(
    IsString(),
    MinLength(SERIAL_LENGTH),
    MaxLength(SERIAL_LENGTH),
  );
};
