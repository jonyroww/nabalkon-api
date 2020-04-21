import { Module } from '@nestjs/common';
import { FavoriteSellersController } from './favorite-sellers.controller';
import { FavoriteSellersService } from './favorite-sellers.service';

@Module({
  controllers: [FavoriteSellersController],
  providers: [FavoriteSellersService]
})
export class FavoriteSellersModule {}
