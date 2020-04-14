import {
  Controller,
  UsePipes,
  ValidationPipe,
  Post,
  Body,
  Get,
  Query
} from "@nestjs/common";
import { AdImagesService } from "./ad-images.service";
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth
} from "@nestjs/swagger";
import { CreateAdImageDto } from "./dto/create-ad-image.dto";
import { GetAllDto } from "./dto/get-all-ad-images.dto";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller("ad-images")
export class AdImagesController {
  constructor(private adImagesService: AdImagesService) {}

  @ApiTags("Ad images")
  @ApiCreatedResponse()
  @Post()
  createAd(@Body() body: CreateAdImageDto) {
    return this.adImagesService.createAdImage(body);
  }

  @ApiTags("Ad images")
  @ApiCreatedResponse()
  @Get()
  getAllAdImages(@Query() query: GetAllDto) {
    return this.adImagesService.getAllAdImages(query);
  }
}
