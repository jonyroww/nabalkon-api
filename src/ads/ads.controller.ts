import { Controller, Post, Body, Param } from "@nestjs/common";
import { AdsService } from "./ads.service";
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth
} from "@nestjs/swagger";
import { CreateAdDto } from "./dto/create-ad.dto";

@Controller("ads")
export class AdsController {
  constructor(private adsService: AdsService) {}

  @ApiTags("Organisations")
  @ApiCreatedResponse()
  @Post()
  createAd(@Body() body: CreateAdDto) {
    return this.adsService.createAd(body);
  }
}
