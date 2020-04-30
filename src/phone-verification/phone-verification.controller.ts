import {
  Controller,
  Post,
  Body,
  Put,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PhoneVerificationService } from '../phone-verification/phone-verification.service';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { PhoneVerification } from './entities/Phone-verification.entity';
import { PhoneVerificationRequestDto } from './dto/create-phone-verification.dto';
import { PhoneVerificationIdDto } from './dto/phone-verification-id.dto';
import { VerificationPhoneDto } from './dto/verification-phone.dto';
import { VerificationResendDto } from './dto/verification-resend.dto';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth/phone-verification')
export class PhoneVerificationController {
  constructor(private phoneVerificationService: PhoneVerificationService) {}
  @Post()
  @ApiTags('Phone verification')
  @ApiCreatedResponse({ type: PhoneVerification })
  createPhoneVerification(@Body() body: PhoneVerificationRequestDto) {
    return this.phoneVerificationService.createPhoneVerification(body);
  }

  @Put('/:id')
  @ApiTags('Phone verification')
  @ApiCreatedResponse()
  verificationPhone(
    @Body() body: VerificationPhoneDto,
    @Param() params: PhoneVerificationIdDto,
  ) {
    return this.phoneVerificationService.verificationPhone(body, params);
  }

  @Put('/:id/resend')
  @ApiTags('Phone verification')
  @ApiCreatedResponse()
  verificationPhoneResend(
    @Body() body: VerificationResendDto,
    @Param() params: PhoneVerificationIdDto,
  ) {
    return this.phoneVerificationService.verificationPhoneResend(body, params);
  }
}
