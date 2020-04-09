import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdsModule } from "../ads/ads.module";
import { PhoneVerificationModule } from "../phone-verification/phone-verification.module";
import { ConfigModule } from "./../config/config.module";
import { AuthModule } from "../auth/auth.module";
import { HandlebarsAdapter, MailerModule } from "@nest-modules/mailer";
import { ConfigService } from "../config/config.service";

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        defaults: {
          from: configService.get("EMAIL_FROM"),
        },
        transport: configService.get("SMTP_URL"),
      }),
      inject: [ConfigService],
    }),
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
