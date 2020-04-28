import { IsNumber, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { TransformInt } from '../../common/utils/transform-int.util';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetAllDto {
  @ApiPropertyOptional({
    type: 'number',
    example: 2,
    description: 'id объявления',
  })
  @IsInt()
  @IsNumber()
  @Transform(TransformInt)
  adId: number;
}
