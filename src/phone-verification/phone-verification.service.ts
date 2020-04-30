import { Injectable } from '@nestjs/common';
import { PhoneVerificationRepository } from './repositories/Phone-verification.repository';
import { PhoneVerificationRequestDto } from './dto/create-phone-verification.dto';
import { ConfigService } from '../config/config.service';
import cryptoRandomString from 'crypto-random-string';
import { makeError } from '../common/errors/index';
import axios from 'axios';
import { PurposeType } from '../constants/PurposeType.enum';
import { UserRepository } from '../users/repositories/User.repository';
import { VerificationPhoneDto } from './dto/verification-phone.dto';
import { PhoneVerificationIdDto } from './dto/phone-verification-id.dto';
import { VerificationResendDto } from './dto/verification-resend.dto';

@Injectable()
export class PhoneVerificationService {
  constructor(
    private phoneVerificationRepository: PhoneVerificationRepository,
    private configService: ConfigService,
    private userRepository: UserRepository,
  ) {}

  async createPhoneVerification(body: PhoneVerificationRequestDto) {
    const phoneVerificationRequest = this.phoneVerificationRepository.create(
      body,
    );
    const user = await this.userRepository.findOne({ phone: body.phone });
    if (body.purpose === PurposeType.REGISTRATION) {
      if (user) {
        throw makeError('PHONE_ALREADY_EXISTS');
      }
    }
    phoneVerificationRequest.key = cryptoRandomString({ length: 32 });

    const smsCode = this.configService.get('SMS_CODE_GEN')
      ? cryptoRandomString({ length: 6, type: 'numeric' })
      : '111111';

    if (this.configService.get('SMS_CODE_GEN')) {
      await axios.get(
        `https://sms.ru/sms/send?api_id=${this.configService.get(
          'SMS_API_ID',
        )}&to=${phoneVerificationRequest.phone}&msg=${smsCode}`,
      );
    }

    phoneVerificationRequest.sms_code = smsCode;
    phoneVerificationRequest.sms_sent_count = 1;
    phoneVerificationRequest.sms_last_sent_at = new Date();
    phoneVerificationRequest.purpose = body.purpose;
    await this.phoneVerificationRepository.save(phoneVerificationRequest);
    return {
      id: phoneVerificationRequest.id,
      key: phoneVerificationRequest.key,
    };
  }

  async verificationPhone(
    body: VerificationPhoneDto,
    params: PhoneVerificationIdDto,
  ) {
    const phoneVerification = await this.phoneVerificationRepository.findOne({
      id: params.id,
    });

    if (!phoneVerification) {
      throw makeError('RECORD_NOT_FOUND');
    } else if (body.key != phoneVerification.key) {
      throw makeError('KEY_IS_NOT_VALID');
    } else if (phoneVerification.success !== false) {
      throw makeError('CODE_ALREADY_USED');
    } else if (phoneVerification.used === true) {
      throw makeError('VERIFICATION_ALREADY_USED');
    } else if (phoneVerification.wrong_attempts_count > 5) {
      throw makeError('MAX_LIMIT_OF_WRONG_ATTEMPTS');
    }

    if (phoneVerification.sms_code != body.sms_code) {
      phoneVerification.wrong_attempts_count += 1;
      await this.phoneVerificationRepository.save(phoneVerification);
      throw makeError('SMS_CODE_IS_NOT_CORRECT');
    } else {
      phoneVerification.success = true;
      await this.phoneVerificationRepository.save(phoneVerification);
    }
    return phoneVerification;
  }

  async verificationPhoneResend(
    body: VerificationResendDto,
    params: PhoneVerificationIdDto,
  ) {
    const phoneVerification = await this.phoneVerificationRepository.findOne(
      params.id,
    );

    if (!phoneVerification) {
      throw makeError('RECORD_NOT_FOUND');
    } else if (body.key != phoneVerification.key) {
      throw makeError('KEY_IS_NOT_VALID');
    } else if (phoneVerification.success === true) {
      throw makeError('CODE_ALREADY_USED');
    } else if (phoneVerification.used === true) {
      throw makeError('VERIFICATION_ALREADY_USED');
    } else if (phoneVerification.sms_sent_count > 5) {
      throw makeError('LIMIT_EXCEEDED');
    }

    const interval = Date.now() - phoneVerification.sms_last_sent_at.getTime();
    if (interval < 2 * 60 * 1000) {
      throw makeError('TIME_INTERVAL_IS_NOT_OVER');
    }

    const smsCode = this.configService.get('SMS_CODE_GEN')
      ? cryptoRandomString({ length: 6, type: 'numeric' })
      : '111111';

    if (this.configService.get('SMS_CODE_GEN')) {
      await axios.get(
        `https://sms.ru/sms/send?api_id=${this.configService.get(
          'SMS_API_ID',
        )}&to=${phoneVerification.phone}&msg=${smsCode}`,
      );
    }
    phoneVerification.sms_code = smsCode;
    phoneVerification.sms_sent_count += 1;
    phoneVerification.wrong_attempts_count = 0;
    phoneVerification.sms_last_sent_at = new Date();
    await this.phoneVerificationRepository.save(phoneVerification);

    return phoneVerification;
  }
}
