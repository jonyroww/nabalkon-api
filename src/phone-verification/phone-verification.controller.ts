import { Controller, Post, Body } from "@nestjs/common";
import { PhoneVerificationService } from "../phone-verification/phone-verification.service";
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiBearerAuth
} from "@nestjs/swagger";
import { PhoneVerification } from "./entities/Phone-verification.entity";
import { PhoneVerificationRequestDto } from "./dto/create-phone-verification.dto";

@Controller("auth/phone-verification")
export class PhoneVerificationController {
  constructor(private phoneVerificationService: PhoneVerificationService) {}
  @Post()
  @ApiTags("Phone verification")
  @ApiCreatedResponse({ type: PhoneVerification })
  createPhoneVerification(@Body() body: PhoneVerificationRequestDto) {
    return this.phoneVerificationService.createPhoneVerification(body);
  }
}
