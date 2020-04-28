import { Module } from '@nestjs/common';
import { AdImagesController } from './ad-images.controller';
import { AdImagesService } from './ad-images.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdImageRepository } from './repositories/AdImage.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AdImageRepository])],
  controllers: [AdImagesController],
  providers: [AdImagesService],
})
export class AdImagesModule {}
