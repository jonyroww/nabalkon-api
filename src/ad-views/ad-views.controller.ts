import {
  Controller,
  UsePipes,
  ValidationPipe,
  Post,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AdViewsService } from "./ad-views.service";
import { User } from "../users/entities/User.entity";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { GetUser } from "../common/decorators/get-user.decorator";
import { CreateAdViewParamsDto } from "./dto/ad-id.dto";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller("ad-views")
export class AdViewsController {
  constructor(private adViewsService: AdViewsService) {}

  @ApiTags("Ad views")
  @ApiCreatedResponse()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @Post("ads/:adId/views")
  createAdView(@GetUser() user: User, @Param() params: CreateAdViewParamsDto) {
    return this.adViewsService.createAdView(user, params);
  }
}
