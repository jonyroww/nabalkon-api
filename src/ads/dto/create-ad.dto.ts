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
  IsJSON,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { TransformInt } from '../../common/utils/transform-int.util';
import { TransformIntArray } from '../../common/utils/transform-array-int.util';
import { TransformDate } from '../../common/utils/transform-date.util';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AdsState } from '../../constants/AdsState.enum';
import { AdsStatus } from '../../constants/AdsStatus.enum';
import { AdsTransferMode } from '../../constants/AdsTransferMode.enum';

export class CreateAdDto {
  @ApiProperty({ type: 'Date' })
  @IsDate()
  @Transform(TransformDate)
  active_until: Date;

  @ApiPropertyOptional()
  @IsEnum(AdsState)
  state: AdsState;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  city: string;

  @ApiPropertyOptional({ type: 'number' })
  @Transform(TransformInt)
  @IsOptional()
  @IsNumber()
  weight: number;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  title: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional({ type: 'number' })
  @Transform(TransformInt)
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsEnum(AdsTransferMode)
  transfer_mode: AdsTransferMode;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  deal_address: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsJSON()
  deal_coordinates: JSON;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  contact_email: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  contact_phone: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  contact_call_time_start: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  contact_call_time_end: string;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsBoolean()
  contact_can_call_rdc: boolean;

  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsBoolean()
  contact_no_matter: boolean;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  @Transform(TransformInt)
  category_id: number;
}
