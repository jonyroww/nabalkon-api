import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { FavoriteAdsService } from './favorite-ads.service';
import { UserIdDto } from '../common/dto/user-id.dto';
import { CreateFavoriteAdDto } from './dto/create-favorite-ad-body.dto';

@Controller()
export class FavoriteAdsController {
    constructor(private favoriteAdsService: FavoriteAdsService){}

    @Post("users/:userId/favorites/ads")
    createFavoriteAd(@Param() params:UserIdDto, @Body() body:CreateFavoriteAdDto){
        return this.favoriteAdsService.createFavoriteAd(params, body);
    }
}
