import { Module } from '@nestjs/common';
import { FavoriteSellersController } from './favorite-sellers.controller';
import { FavoriteSellersService } from './favorite-sellers.service';
import { FavoriteSellerRepository } from './repositories/favorite-seller.repository';
import { UserRepository } from '../users/repositories/User.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteSellerRepository, UserRepository]),
  ],
  controllers: [FavoriteSellersController],
  providers: [FavoriteSellersService],
})
export class FavoriteSellersModule {}
