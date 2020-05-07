import { Module } from "@nestjs/common";
import { FavoriteAdsService } from "./favorite-ads.service";
import { FavoriteAdsController } from "./favorite-ads.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavoriteAdRepository } from "./repositories/favorite-ads.repository";
import { UserRepository } from "../users/repositories/User.repository";

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteAdRepository, UserRepository])],
  providers: [FavoriteAdsService],
  controllers: [FavoriteAdsController],
})
export class FavoriteAdsModule {}
