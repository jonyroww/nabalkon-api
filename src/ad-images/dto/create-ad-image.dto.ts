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
  @ApiProperty({ type: "Date" })
  @IsInt()
  @IsNumber()
  @Transform(TransformInt)
  ad_id: number;

  @ApiProperty()
  @IsString()
  @IsUrl()
  image_url: string;
}
