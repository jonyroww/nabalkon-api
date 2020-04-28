import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsRepository } from '../ads/repositories/ads.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdsRepository])],
  controllers: [AdsController],
  providers: [AdsService],
})
export class AdsModule {}
