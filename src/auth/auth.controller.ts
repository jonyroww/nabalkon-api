import { Controller, Post, Body } from "@nestjs/common";
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { RegistrationBodyDto } from "./dto/registration-body.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/registration")
  @ApiTags("Auth")
  @ApiCreatedResponse()
  registrationUser(@Body() body: RegistrationBodyDto) {
    return this.authService.registrationUser(body);
  }
}
