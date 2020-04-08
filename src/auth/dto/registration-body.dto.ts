import {
  IsInt,
  IsOptional,
  IsString,
  IsNumber,
  IsAlphanumeric,
} from "class-validator";
import { Transform } from "class-transformer";
import { TransformInt } from "../../common/utils/transform-int.util";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class RegistrationBodyDto {
  @ApiProperty({ type: "number" })
  @Transform(TransformInt)
  @IsNumber()
  verification_id: number;

  @ApiProperty({ type: "varchar" })
  @IsString()
  @IsAlphanumeric()
  verification_key: string;

  @ApiPropertyOptional({ type: "varchar" })
  @IsString()
  full_name: string;

  @ApiProperty({ type: "varchar" })
  @IsString()
  password: string;
}
