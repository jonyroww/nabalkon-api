import {
  Controller,
  Post,
  Param,
  Body,
  Get,
  UseGuards,
  Query,
  Delete,
} from '@nestjs/common';
import { FavoriteAdsService } from './favorite-ads.service';
import { UserIdDto } from '../common/dto/user-id.dto';
import { CreateFavoriteAdDto } from './dto/create-favorite-ad-body.dto';
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserWriteAccessGuard } from '../common/guards/read-access.guard';
import { GetAllFavoriteAdDto } from './dto/get-all-favorite-ad.dto';
import { DeleteFavoriteAdDto } from './dto/delete-favorite-ad.dto';

@Controller()
export class FavoriteAdsController {
  constructor(private favoriteAdsService: FavoriteAdsService) {}

  @ApiTags('Favorite ads')
  @ApiCreatedResponse()
  @UseGuards(AuthGuard('jwt'), UserWriteAccessGuard)
  @ApiCreatedResponse()
  @ApiBearerAuth()
  @Post('users/:userId/favorites/ads')
  createFavoriteAd(
    @Param() params: UserIdDto,
    @Body() body: CreateFavoriteAdDto,
  ) {
    return this.favoriteAdsService.createFavoriteAd(params, body);
  }

  @ApiTags('Favorite ads')
  @ApiOkResponse()
  @UseGuards(AuthGuard('jwt'), UserWriteAccessGuard)
  @ApiCreatedResponse()
  @ApiBearerAuth()
  @Get('users/:userId/favorites/ads')
  getAllFavoriteAds(
    @Query() query: GetAllFavoriteAdDto,
    @Param() params: UserIdDto,
  ) {
    return this.favoriteAdsService.getAllFavoriteAds(query, params);
  }

  @ApiTags('Favorite ads')
  @ApiOkResponse()
  @UseGuards(AuthGuard('jwt'), UserWriteAccessGuard)
  @ApiCreatedResponse()
  @ApiBearerAuth()
  @Delete('users/:userId/favorites/ads/:adId')
  deleteFavoriteAd(@Param() params: DeleteFavoriteAdDto) {
    return this.favoriteAdsService.deleteFavoriteAd(params);
  }
}
