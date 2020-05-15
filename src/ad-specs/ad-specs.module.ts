import { Module } from '@nestjs/common';
import { AdSpecsService } from './ad-specs.service';
import { AdSpecsController } from './ad-specs.controller';

@Module({
  providers: [AdSpecsService],
  controllers: [AdSpecsController]
})
export class AdSpecsModule {}
