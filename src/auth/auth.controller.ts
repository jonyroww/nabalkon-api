import {
  Controller,
  Post,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Get,
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

  @Get("/me")
  @ApiTags("Auth")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  async me(@GetUser() user: User) {
    return user;
  }
}
