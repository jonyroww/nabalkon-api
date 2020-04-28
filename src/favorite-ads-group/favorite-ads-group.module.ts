import { Module } from '@nestjs/common';
import { FavoriteAdsGroupService } from './favorite-ads-group.service';
import { FavoriteAdsGroupController } from './favorite-ads-group.controller';

@Module({
  providers: [FavoriteAdsGroupService],
  controllers: [FavoriteAdsGroupController],
})
export class FavoriteAdsGroupModule {}
