import { IsNumber, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { TransformInt } from '../../common/utils/transform-int.util';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUsersBasketDto {
  @ApiProperty({ type: 'number', example: 2 })
  @IsInt()
  @IsNumber()
  @Transform(TransformInt)
  userId: number;

  @ApiProperty({ type: 'number', example: 2 })
  @IsInt()
  @IsNumber()
  @Transform(TransformInt)
  adId: number;
}
