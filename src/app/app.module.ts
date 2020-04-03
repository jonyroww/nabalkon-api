import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdsModule } from "../ads/ads.module";
import { PhoneVerificationModule } from "../phone-verification/phone-verification.module";
import { ConfigModule } from "./../config/config.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AdsModule,
    ConfigModule,
    PhoneVerificationModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
