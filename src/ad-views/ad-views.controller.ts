import {
  Controller,
  UsePipes,
  ValidationPipe,
  Post,
  Param,
  UseGuards,
  Get,
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
import { AdIdDto } from "./dto/ad-id.dto";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller()
export class AdViewsController {
  constructor(private adViewsService: AdViewsService) {}

  @ApiTags("Ad views")
  @ApiCreatedResponse()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @Post("ads/:adId/views")
  createAdView(@GetUser() user: User, @Param() params: AdIdDto) {
    return this.adViewsService.createAdView(user, params);
  }

  @ApiTags("Ad views")
  @ApiCreatedResponse()
  @Get("ads/:adId/views")
  getAdViews(@Param() params: AdIdDto) {
    return this.adViewsService.getAdViews(params);
  }
}
