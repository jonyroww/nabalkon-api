import { Module } from '@nestjs/common';
import { AdSpecsService } from './ad-specs.service';
import { AdSpecsController } from './ad-specs.controller';
import { AdSpecRepository } from './repositories/ad-spec.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AdSpecRepository])],
  providers: [AdSpecsService],
  controllers: [AdSpecsController],
})
export class AdSpecsModule {}
