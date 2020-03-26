import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdsModule } from "../ads/ads.module";

@Module({
  imports: [TypeOrmModule.forRoot(), AdsModule],
  controllers: [],
  providers: []
})
export class AppModule {}
