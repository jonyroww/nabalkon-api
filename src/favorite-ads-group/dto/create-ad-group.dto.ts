import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteAdGroupDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  title: string;
}
