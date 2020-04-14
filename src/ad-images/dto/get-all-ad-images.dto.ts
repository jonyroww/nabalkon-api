import {
  IsNumber,
  IsInt,
  IsString,
  Length,
  IsOptional,
  IsEmail,
  IsUrl
} from "class-validator";
import { Transform } from "class-transformer";
import { TransformInt } from "../../common/utils/transform-int.util";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GetAllDto {
  @ApiPropertyOptional({
    type: "number",
    example: 2,
    description: "id объявления"
  })
  @IsInt()
  @IsOptional()
  @IsNumber()
  @Transform(TransformInt)
  ad_id: number;

  @ApiPropertyOptional({
    type: "number",
    example: 2,
    description: "id записи"
  })
  @IsInt()
  @IsOptional()
  @IsNumber()
  @Transform(TransformInt)
  id: number;
}
