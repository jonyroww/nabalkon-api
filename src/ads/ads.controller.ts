import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";
import { AdsService } from "./ads.service";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CreateAdDto } from "./dto/create-ad.dto";
import { GetAllQueryDto } from "./dto/get-all-query.dto";
import { User } from "../users/entities/User.entity";
import { GetUser } from "../common/decorators/get-user.decorator";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller("ads")
export class AdsController {
  constructor(private adsService: AdsService) {}

  @ApiTags("Ads")
  @ApiCreatedResponse()
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @Post()
  createAd(@Body() body: CreateAdDto, @GetUser() user: User) {
    return this.adsService.createAd(body, user);
  }

  @ApiTags("Ads")
  @ApiOkResponse()
  @Get()
  getAllAds(@Query() query: GetAllQueryDto) {
    return this.adsService.getAllAds(query);
  }
}
