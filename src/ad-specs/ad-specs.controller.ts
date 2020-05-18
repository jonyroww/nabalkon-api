import { Controller, UseGuards, Get, Param, Query } from '@nestjs/common';
import { AdSpecsService } from './ad-specs.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdIdDto } from '../ads/dto/ad-id.dto';
import { PaginationFilterDto } from '../common/dto/pagination-filter.dto';

@Controller('ad-specs')
export class AdSpecsController {
  constructor(private adSpecsService: AdSpecsService) {}

  @ApiTags('Ads specs')
  @ApiCreatedResponse()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('/:adId')
  getAdSpecs(@Param() params: AdIdDto, @Query() query: PaginationFilterDto) {
    return this.adSpecsService.getAdSpecs(params, query);
  }
}
