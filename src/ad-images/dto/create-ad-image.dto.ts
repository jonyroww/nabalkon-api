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
import { ApiProperty } from "@nestjs/swagger";

export class CreateAdImageDto {
  @ApiProperty({ type: "number", example: 2 })
  @IsInt()
  @IsNumber()
  @Transform(TransformInt)
  ad_id: number;

  @ApiProperty({ type: "string" })
  @IsString()
  @IsUrl()
  image_url: string;
}
