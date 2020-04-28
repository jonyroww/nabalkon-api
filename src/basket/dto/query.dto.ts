import {
  IsNumber,
  IsInt,
  IsString,
  Length,
  IsOptional,
  IsEmail,
  IsUrl,
  IsBoolean,
  IsArray,
  IsDate,
  IsEnum,
  IsJSON,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Order } from '../../constants/Order.enum';
import { PaginationFilterDto } from '../../common/dto/pagination-filter.dto';
import { Transform } from 'class-transformer';
import { TransformInt } from '../../common/utils/transform-int.util';

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
