import { IsString, IsPhoneNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PurposeType } from '../../constants/PurposeType.enum';
import { Transform } from 'class-transformer';
import { TransformPhone } from '../../common/utils/transform-phone.util';

export class PhoneVerificationRequestDto {
  @ApiProperty({ type: 'varchar' })
  @IsString()
  @IsPhoneNumber('RU')
  @Transform(TransformPhone)
  phone: string;

  @ApiProperty({ enum: PurposeType })
  @IsString()
  @IsEnum(PurposeType)
  purpose: PurposeType;
}
