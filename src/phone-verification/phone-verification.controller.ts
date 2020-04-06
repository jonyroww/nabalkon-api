import { Controller, Post, Body, Put, Param } from "@nestjs/common";
import { PhoneVerificationService } from "../phone-verification/phone-verification.service";
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { PhoneVerification } from "./entities/Phone-verification.entity";
import { PhoneVerificationRequestDto } from "./dto/create-phone-verification.dto";
import { PhoneVerificationIdDto } from "./dto/phone-verification-id.dto";
import { VerificationPhoneDto } from "./dto/verification-phone.dto";

@Controller("auth/phone-verification")
export class PhoneVerificationController {
  constructor(private phoneVerificationService: PhoneVerificationService) {}
  @Post()
  @ApiTags("Phone verification")
  @ApiCreatedResponse({ type: PhoneVerification })
  createPhoneVerification(@Body() body: PhoneVerificationRequestDto) {
    return this.phoneVerificationService.createPhoneVerification(body);
  }

  @Put("/:id")
  @ApiTags("Phone verification")
  @ApiCreatedResponse()
  verificationPhone(
    @Body() body: VerificationPhoneDto,
    @Param() params: PhoneVerificationIdDto
  ) {
    return this.phoneVerificationService.verificationPhone(body, params);
  }
}
