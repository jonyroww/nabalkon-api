import { IsString, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetOneQueryDto {
  @ApiPropertyOptional({ type: 'string' })
  @IsOptional()
  @IsString()
  join: string;
}
