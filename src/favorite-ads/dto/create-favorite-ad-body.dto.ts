import { IsNumber, IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { TransformInt } from '../../common/utils/transform-int.util';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteAdDto {
  @ApiProperty({ type: 'number', example: 2 })
  @IsInt()
  @IsNumber()
  @Transform(TransformInt)
  ad_id: number;

  @ApiProperty({ type: 'number', example: 2 })
  @IsInt()
  @IsNumber()
  @Transform(TransformInt)
  @IsOptional()
  group_id: number;
}
