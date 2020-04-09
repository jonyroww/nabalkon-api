import { Injectable } from "@nestjs/common";
import { makeError } from "../common/errors";
import bcrypt from "bcrypt";
import { UserRepository } from "../users/repositories/User.repository";
import { RegistrationBodyDto } from "./dto/registration-body.dto";
import { PhoneVerificationRepository } from "../phone-verification/repositories/Phone-verification.repository";
import { PurposeType } from "src/constants/PurposeType.enum";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/User.entity";
import { IJwtPayload } from "./interfaces/JwtPayload.interface";

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private phoneVerificationRepository: PhoneVerificationRepository,
    private jwtService: JwtService
  ) {}

  async registrationUser(body: RegistrationBodyDto) {
    const phoneVerification = await this.phoneVerificationRepository.findOne(
      body.verification_id
    );

    if (!phoneVerification) {
      throw makeError("RECORD_NOT_FOUND");
    } else if (phoneVerification.purpose !== PurposeType.REGISTRATION) {
      throw makeError("PURPOSE_IS_NOT_CORRECT");
    } else if (phoneVerification.key !== body.verification_key) {
      throw makeError("KEY_IS_NOT_VALID");
    } else if (phoneVerification.success !== true) {
      throw makeError("CODE_ALREADY_USED");
    } else if (phoneVerification.used === true) {
      throw makeError("VERIFICATION_ALREADY_USED");
    }
    const isPhoneUnique = await this.userRepository.findOne({
      phone: phoneVerification.phone,
    });
    if (isPhoneUnique) {
      throw makeError("PHONE_ALREADY_EXISTS");
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);
    body.password = hashedPassword;
    const user = this.userRepository.create(body);
    user.phone_confirmed = true;
    user.phone = phoneVerification.phone;
    phoneVerification.used = true;
    await this.phoneVerificationRepository.save(phoneVerification);
    await this.userRepository.save(user);
    const token = await this.jwtService.signAsync({
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    });
    return { token: token };
  }

  async userLogin(user: User) {
    const payload: IJwtPayload = {
      sub: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
  async emailVerification(user: User) {}

  async validateUser(phone: string, password: string) {
    const user = await this.userRepository.findOne({ phone: phone });
    if (user) {
      if (user.deleted_at) {
        throw makeError("USER_NOT_FOUND");
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return user;
      } else {
        throw makeError("WRONG_PASSWORD");
      }
    } else {
      throw makeError("USER_NOT_FOUND");
    }
  }
}
