import { IsNumber, IsInt, IsOptional, IsString, IsEnum } from 'class-validator';
import { Order } from '../../constants/Order.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TransformInt } from '../../common/utils/transform-int.util';
import { ApiProperty } from '@nestjs/swagger';
import { PaginationFilterDto } from '../../common/dto/pagination-filter.dto';

export class GetAllFavoriteAdDto extends PaginationFilterDto {
  @ApiProperty({ type: 'number', example: 2 })
  @IsInt()
  @IsNumber()
  @Transform(TransformInt)
  @IsOptional()
  groupId: number;

  @ApiPropertyOptional({ type: 'number' })
  @IsNumber()
  @Transform(TransformInt)
  @IsOptional()
  @IsInt()
  category_id: number;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  city: string;

  @ApiPropertyOptional({ type: 'number' })
  @IsNumber()
  @Transform(TransformInt)
  @IsOptional()
  @IsInt()
  price_from: number;

  @ApiPropertyOptional({ type: 'number' })
  @IsNumber()
  @Transform(TransformInt)
  @IsOptional()
  @IsInt()
  price_to: number;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  sort: string;

  @ApiPropertyOptional({ enum: Order })
  @IsOptional()
  @IsEnum(Order)
  order: Order;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  q: string;
}
