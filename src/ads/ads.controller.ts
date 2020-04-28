import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CreateAdDto } from './dto/create-ad.dto';
import { GetAllQueryDto } from './dto/get-all-query.dto';
import { User } from '../users/entities/User.entity';
import { GetUser } from '../common/decorators/get-user.decorator';
import { AdIdDto } from './dto/ad-id.dto';
import { UserIdDto } from './dto/user-id.dto';
import { UserWriteAccessGuard } from '../common/guards/read-access.guard';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller()
export class AdsController {
  constructor(private adsService: AdsService) {}

  @ApiTags('Ads')
  @ApiCreatedResponse()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('/ads')
  createAd(@Body() body: CreateAdDto, @GetUser() user: User) {
    return this.adsService.createAd(body, user);
  }

  @ApiTags('Ads')
  @ApiOkResponse()
  @Get('/ads')
  getAllAds(@Query() query: GetAllQueryDto) {
    return this.adsService.getAllAds(query);
  }

  @ApiTags('Ads')
  @ApiOkResponse()
  @Get('/ads/:adId')
  getOneAd(@Param() params: AdIdDto) {
    return this.adsService.getOneAd(params);
  }

  @ApiTags('Ads')
  @ApiOkResponse()
  @UseGuards(AuthGuard('jwt'), UserWriteAccessGuard)
  @ApiBearerAuth()
  @Get('/users/:userId/ads')
  getUsersAds(@Param() params: UserIdDto) {
    return this.adsService.getUsersAds(params);
  }
}
