import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "../users/repositories/User.repository";
import { PhoneVerificationRepository } from "../phone-verification/repositories/Phone-verification.repository";
import { ConfigModule } from "./../config/config.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, PhoneVerificationRepository]),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
