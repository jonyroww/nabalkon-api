import { IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdImageBodyDto {
  @ApiProperty({ type: 'string' })
  @IsString()
  @IsUrl()
  image_url: string;
}
