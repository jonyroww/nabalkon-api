import { Controller, Post, Body, Param, Get, Query } from "@nestjs/common";
import { AdsService } from "./ads.service";
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth
} from "@nestjs/swagger";
import { CreateAdDto } from "./dto/create-ad.dto";
import { GetAllDto } from "./dto/get-all-ad.dto";

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
  getAllAds(@Query() query: GetAllDto) {
    return this.adsService.getAllAds(query);
  }
}
