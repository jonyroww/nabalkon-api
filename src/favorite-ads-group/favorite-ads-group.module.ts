import { Module } from '@nestjs/common';
import { FavoriteAdsGroupService } from './favorite-ads-group.service';
import { FavoriteAdsGroupController } from './favorite-ads-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../users/repositories/User.repository';
import { FavoriteAdGroupRepository } from './repositories/ad-group.repository';
import { FavoriteAdRepository } from '../favorite-ads/repositories/favorite-ads.repository';
import { AdsRepository } from '../ads/repositories/ads.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      FavoriteAdGroupRepository,
      FavoriteAdRepository,
      AdsRepository,
    ]),
  ],
  providers: [FavoriteAdsGroupService],
  controllers: [FavoriteAdsGroupController],
})
export class FavoriteAdsGroupModule {}
