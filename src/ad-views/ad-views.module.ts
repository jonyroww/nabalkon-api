import { Module } from "@nestjs/common";
import { AdViewsController } from "./ad-views.controller";
import { AdViewsService } from "./ad-views.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdViewRepository } from "./repositories/AdView.repository";
import { AdsRepository } from "../ads/repositories/ads.repository";

@Module({
  imports: [TypeOrmModule.forFeature([AdViewRepository, AdsRepository])],
  controllers: [AdViewsController],
  providers: [AdViewsService],
})
export class AdViewsModule {}
