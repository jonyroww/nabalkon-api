import {
  IsNumber,
  IsInt,
  IsString,
  Length,
  IsOptional,
  IsEmail,
  IsUrl,
  IsDate,
} from "class-validator";
import { Transform } from "class-transformer";
import { TransformInt } from "../../common/utils/transform-int.util";
import { TransformDate } from "../../common/utils/transform-date.util";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GetAdViewsQueryDto {
  @ApiPropertyOptional({ type: "string", example: "20.01.1998" })
  @Transform(TransformDate)
  @IsOptional()
  @IsDate()
  from_time: Date;

  @ApiPropertyOptional({ type: "string", example: "20.01.1998" })
  @Transform(TransformDate)
  @IsOptional()
  @IsDate()
  to_time: Date;
}
