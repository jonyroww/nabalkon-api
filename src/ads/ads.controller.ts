import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AdsService } from "./ads.service";
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { CreateAdDto } from "./dto/create-ad.dto";
import { GetAllQueryDto } from "./dto/get-all-query.dto";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller("ads")
export class AdsController {
  constructor(private adsService: AdsService) {}

  @ApiTags("Ads")
  @ApiCreatedResponse()
  @Post()
  createAd(@Body() body: CreateAdDto) {
    return this.adsService.createAd(body);
  }

  @ApiTags("Ads")
  @ApiOkResponse()
  @Get()
  getAllAds(@Query() query: GetAllQueryDto) {
    return this.adsService.getAllAds(query);
  }
}
