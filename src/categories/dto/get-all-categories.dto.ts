import {
  IsNumber,
  IsString,
  Length,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { TransformInt } from '../../common/utils/transform-int.util';
import { PaginationFilterDto } from '../../common/dto/pagination-filter.dto';

export class GetAllCategoriesDto extends PaginationFilterDto {
  @ApiPropertyOptional({ type: 'varchar' })
  @Transform(TransformInt)
  @IsOptional()
  @IsString()
  parent_category_id: number;
}
