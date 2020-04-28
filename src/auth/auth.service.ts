import { Injectable } from '@nestjs/common';
import { makeError } from '../common/errors';
import bcrypt from 'bcrypt';
import { UserRepository } from '../users/repositories/User.repository';
import { RegistrationBodyDto } from './dto/registration-body.dto';
import { PhoneVerificationRepository } from '../phone-verification/repositories/Phone-verification.repository';
import { PurposeType } from '../constants/PurposeType.enum';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/User.entity';
import { IJwtPayload } from './interfaces/JwtPayload.interface';
import { MailerService } from '@nest-modules/mailer';
import { ConfigService } from '../config/config.service';
import { EmailTokenDto } from './dto/email-confirm-query.dto';
import { JwtPurposeType } from '../constants/JwtPurpose.enum';
import { RoleName } from '../constants/RoleName.enum';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private phoneVerificationRepository: PhoneVerificationRepository,
    private jwtService: JwtService,
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async registrationUser(body: RegistrationBodyDto) {
    const phoneVerification = await this.phoneVerificationRepository.findOne(
      body.verification_id,
    );

    if (!phoneVerification) {
      throw makeError('RECORD_NOT_FOUND');
    } else if (phoneVerification.purpose !== PurposeType.REGISTRATION) {
      throw makeError('PURPOSE_IS_NOT_CORRECT');
    } else if (phoneVerification.key !== body.verification_key) {
      throw makeError('KEY_IS_NOT_VALID');
    } else if (phoneVerification.success !== true) {
      throw makeError('CODE_ALREADY_USED');
    } else if (phoneVerification.used === true) {
      throw makeError('VERIFICATION_ALREADY_USED');
    }
    const isPhoneUnique = await this.userRepository.findOne({
      phone: phoneVerification.phone,
    });
    if (isPhoneUnique) {
      throw makeError('PHONE_ALREADY_EXISTS');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);
    body.password = hashedPassword;
    const user = this.userRepository.create(body);
    user.phone_confirmed = true;
    user.phone = phoneVerification.phone;
    user.role = RoleName.USER;
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
  async emailVerificationSend(user: User) {
    const token = await this.jwtService.signAsync({
      user_id: user.id,
      purpose: JwtPurposeType.EMAIL_VERIFICATION,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    });

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Nabalkon - подтверждение почты',
      template: 'email-verification.html',
      context: {
        link: `${this.configService.get(
          'BASE_URL',
        )}/auth/email-confirm?token=${encodeURIComponent(token)}`,
      },
    });
  }

  async emailConfirm(query: EmailTokenDto) {
    const jwtSign = await this.jwtService.verifyAsync(query.token);

    if (jwtSign && jwtSign.purpose === JwtPurposeType.EMAIL_VERIFICATION) {
      const user = await this.userRepository.findOne({ id: jwtSign.user_id });
      if (!user && user.deleted_at) {
        throw makeError('USER_NOT_FOUND');
      }
      if (user.email_confirmed === true) {
        throw makeError('EMAIL_ALREADY_CONFIRMED');
      }
      user.email_confirmed = true;
      await this.userRepository.save(user);
      return jwtSign;
    } else {
      throw makeError('FORBIDDEN');
    }
  }

  async validateUser(phone: string, password: string) {
    const user = await this.userRepository.findOne({ phone: phone });
    if (user) {
      if (user.deleted_at) {
        throw makeError('USER_NOT_FOUND');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        return user;
      } else {
        throw makeError('WRONG_PASSWORD');
      }
    } else {
      throw makeError('USER_NOT_FOUND');
    }
  }
}
