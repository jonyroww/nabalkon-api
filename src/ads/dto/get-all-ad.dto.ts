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
import { Transform } from "class-transformer";
import { TransformInt } from "../../common/utils/transform-int.util";
import { TransformIntArray } from "../../common/utils/transform-array-int.util";
import { TransformDate } from "../../common/utils/transform-date.util";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AdsState } from "../../constants/AdsState.enum";
import { AdsStatus } from "../../constants/AdsStatus.enum";
import { AdsTransferMode } from "../../constants/AdsTransferMode.enum";

export class GetAllDto {
  @ApiProperty({ type: "number" })
  @IsNumber()
  @IsInt()
  category_id: number;
}
