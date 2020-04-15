import { Module } from "@nestjs/common";
import { AdViewsController } from "./ad-views.controller";
import { AdViewsService } from "./ad-views.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdViewRepository } from "./repositories/AdView.repository";

@Module({
  imports: [TypeOrmModule.forFeature([AdViewRepository])],
  controllers: [AdViewsController],
  providers: [AdViewsService],
})
export class AdViewsModule {}
