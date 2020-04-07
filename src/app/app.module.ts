import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdsModule } from "../ads/ads.module";
import { PhoneVerificationModule } from "../phone-verification/phone-verification.module";
import { ConfigModule } from "./../config/config.module";
import { AuthModule } from "../auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AdsModule,
    ConfigModule,
    PhoneVerificationModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
