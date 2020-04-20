import { Module } from "@nestjs/common";
import { BasketController } from "./basket.controller";
import { BasketService } from "./basket.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdsRepository } from "../ads/repositories/ads.repository";
import { UserBasketAdsRepository } from "./repositories/Basket.repository";

@Module({
  imports: [TypeOrmModule.forFeature([AdsRepository, UserBasketAdsRepository])],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
