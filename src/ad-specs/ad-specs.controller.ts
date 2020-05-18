import { Controller, UseGuards, Post, Body, Param } from '@nestjs/common';
import { AdSpecsService } from './ad-specs.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AdIdDto } from '../ads/dto/ad-id.dto';
import { CreateAdSpecDto } from './dto/create-ad-spec-body.dto';
import { UserWriteAccessGuard } from '../common/guards/read-access.guard';

@Controller('ad-specs')
export class AdSpecsController {
  constructor(private adSpecsService: AdSpecsService) {}

  @ApiTags('Ads specs')
  @ApiCreatedResponse()
  @UseGuards(AuthGuard('jwt'), UserWriteAccessGuard)
  @ApiBearerAuth()
  @Post('/adId')
  createAdSpec(@Param() params: AdIdDto, @Body() body: CreateAdSpecDto) {
    return this.adSpecsService.createAdSpec(params, body);
  }
}
