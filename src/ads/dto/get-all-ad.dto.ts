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
  IsJSON
} from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Order } from "../../constants/Order.enum";
import { PaginationFilterDto } from "../../common/dto/pagination-filter.dto";

export class GetAllDto extends PaginationFilterDto {
  @ApiPropertyOptional({ type: "number" })
  @IsNumber()
  @IsInt()
  category_id: number;

  @ApiPropertyOptional({ type: "string" })
  @IsString()
  city: string;

  @ApiPropertyOptional({ type: "number" })
  @IsNumber()
  @IsInt()
  price_from: number;

  @ApiPropertyOptional({ type: "number" })
  @IsNumber()
  @IsInt()
  price_to: number;

  @ApiPropertyOptional({ type: "string" })
  @IsString()
  search_text: string;

  @ApiPropertyOptional({ type: "string" })
  @IsString()
  sort: string;

  @ApiPropertyOptional({ enum: Order })
  @IsEnum(Order)
  order: Order;
}
