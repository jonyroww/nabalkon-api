import { IsNumber, IsString, Length, IsPhoneNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { TransformPhone } from "../../common/utils/transform-phone.util";

export class UserLoginDto {
  @ApiProperty({ type: "varchar" })
  @IsString()
  @IsPhoneNumber("RU")
  @Transform(TransformPhone)
  phone: string;

  @ApiProperty({ type: "varchar" })
  @IsString()
  password: string;
}
