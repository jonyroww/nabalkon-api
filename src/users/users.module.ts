import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteAdGroup } from '../favorite-ads-group/entities/ad-group.entity';

@Module({
  imports:[TypeOrmModule.forFeature([ FavoriteAdGroup])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
