import {
  Controller,
  Post,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { RegistrationBodyDto } from "./dto/registration-body.dto";
import { AuthService } from "./auth.service";
import { GetUser } from "../common/decorators/get-user.decorator";
import { User } from "../users/entities/User.entity";
import { UserLoginDto } from "./dto/login-body.dto";
import { EmailTokenDto } from "./dto/email-confirm-query.dto";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/registration")
  @ApiTags("Auth")
  @ApiCreatedResponse()
  registrationUser(@Body() body: RegistrationBodyDto) {
    return this.authService.registrationUser(body);
  }

  @Post("/login")
  @ApiTags("Auth")
  @ApiOkResponse()
  @ApiBody({ type: UserLoginDto })
  @UseGuards(AuthGuard("local"))
  async userLogin(@GetUser() user: User) {
    return await this.authService.userLogin(user);
  }

  @Post("/email-verification")
  @ApiTags("Auth")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiCreatedResponse()
  emailVerification(@GetUser() user: User) {
    return this.authService.emailVerificationSend(user);
  }

  @Get("/email-confirm")
  @ApiTags("Auth")
  @ApiCreatedResponse()
  emailConfirm(@Query() query: EmailTokenDto) {
    return this.authService.emailConfirm(query);
  }

  @Get("/me")
  @ApiTags("Auth")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  async me(@GetUser() user: User) {
    return user;
  }
}
