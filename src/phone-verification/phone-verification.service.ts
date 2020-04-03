import { Injectable } from "@nestjs/common";
import { PhoneVerificationRepository } from "./repositories/Phone-verification.repository";
import { PhoneVerificationRequestDto } from "./dto/create-phone-verification.dto";
import { ConfigService } from "../config/config.service";
import cryptoRandomString from "crypto-random-string";
import { makeError } from "../common/errors/index";
import axios from "axios";
import { PurposeType } from "src/constants/PurposeType.enum";
import { UserRepository } from "../users/repositories/User.repository";

@Injectable()
export class PhoneVerificationService {
  constructor(
    private phoneVerificationRepository: PhoneVerificationRepository,
    private configService: ConfigService,
    private userRepository: UserRepository
  ) {}

  async createPhoneVerification(body: PhoneVerificationRequestDto) {
    const phoneVerificationRequest = this.phoneVerificationRepository.create(
      body
    );
    const user = await this.userRepository.findOne({ phone: body.phone });
    if (body.purpose === PurposeType.REGISTRATION) {
      if (user) {
        throw makeError("PHONE_ALREADY_EXISTS");
      }
    }
    phoneVerificationRequest.key = cryptoRandomString({ length: 32 });

    const smsCode = this.configService.get("SMS_CODE_GEN")
      ? cryptoRandomString({ length: 6, type: "numeric" })
      : "111111";

    if (this.configService.get("SMS_CODE_GEN")) {
      await axios.get(
        `https://sms.ru/sms/send?api_id=${this.configService.get(
          "SMS_API_ID"
        )}&to=${phoneVerificationRequest.phone}&msg=${smsCode}`
      );
    }

    phoneVerificationRequest.sms_code = smsCode;
    phoneVerificationRequest.sms_sent_count = 1;
    phoneVerificationRequest.sms_last_sent_at = new Date();
    phoneVerificationRequest.purpose = body.purpose;
    await this.phoneVerificationRepository.save(phoneVerificationRequest);
    return {
      id: phoneVerificationRequest.id,
      key: phoneVerificationRequest.key
    };
  }
}
