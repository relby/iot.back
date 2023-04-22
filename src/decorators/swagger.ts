import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';

export const ApiPropertySerial = (options?: ApiPropertyOptions) =>
  ApiProperty({
    example: '00000001',
    minLength: 8,
    maxLength: 8,
    ...options,
  });
