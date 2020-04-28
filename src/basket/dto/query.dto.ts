import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Order } from '../../constants/Order.enum';

export class SortQueryDto {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  sort: string;

  @ApiPropertyOptional({ enum: Order })
  @IsOptional()
  @IsEnum(Order)
  order: Order;
}
