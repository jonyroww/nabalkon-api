import { Module } from '@nestjs/common';
import { FavoriteAdsGroupService } from './favorite-ads-group.service';
import { FavoriteAdsGroupController } from './favorite-ads-group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/User.entity';
import { UserRepository } from '../users/repositories/User.repository';

@Module({
  imports:[TypeOrmModule.forFeature([User, UserRepository])],
  providers: [FavoriteAdsGroupService],
  controllers: [FavoriteAdsGroupController],
})
export class FavoriteAdsGroupModule {}
