import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';

@Module({
  controllers: [BasketController],
  providers: [BasketService]
})
export class BasketModule {}
