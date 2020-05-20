import { Module } from '@nestjs/common';
import { AdSpecRepository } from './repositories/ad-spec.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AdSpecRepository])],
})
export class AdSpecsModule {}
