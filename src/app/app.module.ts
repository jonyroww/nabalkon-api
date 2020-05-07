
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdsModule } from "../ads/ads.module";
import { PhoneVerificationModule } from "../phone-verification/phone-verification.module";
import { ConfigModule } from "./../config/config.module";
import { AuthModule } from "../auth/auth.module";
import { HandlebarsAdapter, MailerModule } from "@nest-modules/mailer";
import { ConfigService } from "../config/config.service";
import path from "path";
import appRootPath from "app-root-path";
import { CategoriesModule } from "../categories/categories.module";
import { AdImagesModule } from "../ad-images/ad-images.module";
import { PhotosModule } from "../photos/photos.module";
import { AdViewsModule } from "../ad-views/ad-views.module";
import { BasketModule } from "../basket/basket.module";
import { FavoriteSellersModule } from "../favorite-sellers/favorite-sellers.module";
import { FavoriteAdsModule } from "../favorite-ads/favorite-ads.module";
import { FavoriteAdsGroupModule } from "../favorite-ads-group/favorite-ads-group.module";



@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        defaults: {
          from: configService.get('EMAIL_FROM'),
        },
        transport: configService.get('SMTP_URL'),
        template: {
          dir: path.join(appRootPath.toString(), 'templates'),
          adapter: new HandlebarsAdapter(),
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRoot(),
    AdsModule,
    ConfigModule,
    PhoneVerificationModule,
    AuthModule,
    CategoriesModule,
    AdImagesModule,
    PhotosModule,
    AdViewsModule,
    BasketModule,
    FavoriteSellersModule,
    FavoriteAdsModule,
    FavoriteAdsGroupModule,
    FavoriteAdsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
