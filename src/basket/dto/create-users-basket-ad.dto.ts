import {
  IsNumber,
  IsInt,
  IsString,
  Length,
  IsOptional,
  IsEmail,
  IsUrl,
} from "class-validator";
import { Transform } from "class-transformer";
import { TransformInt } from "../../common/utils/transform-int.util";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUsersBasketDto {
  @ApiProperty({ type: "number", example: 2 })
  @IsInt()
  @IsNumber()
  @Transform(TransformInt)
  userId: number;
}
