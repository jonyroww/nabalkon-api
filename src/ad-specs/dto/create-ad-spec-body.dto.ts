import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdSpecDto {
  @ApiProperty({ type: 'string', example: 'Характеристика' })
  @IsString()
  title: string;

  @ApiProperty({ type: 'string', example: 'Значение' })
  @IsString()
  value: string;
}
