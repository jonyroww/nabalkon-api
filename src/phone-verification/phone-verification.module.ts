import { Module } from '@nestjs/common';
import { PhoneVerificationController } from './phone-verification.controller';
import { PhoneVerificationService } from './phone-verification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../users/repositories/User.repository';
import { PhoneVerificationRepository } from '../phone-verification/repositories/Phone-verification.repository';
import { ConfigModule } from './../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, PhoneVerificationRepository]),
    ConfigModule,
  ],
  controllers: [PhoneVerificationController],
  providers: [PhoneVerificationService],
})
export class PhoneVerificationModule {}
