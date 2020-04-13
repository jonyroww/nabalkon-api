import {
  Controller,
  UsePipes,
  ValidationPipe,
  Post,
  Body
} from "@nestjs/common";
import { AdImagesService } from "./ad-images.service";
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth
} from "@nestjs/swagger";
import { CreateAdImageDto } from "./dto/create-ad-image.dto";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller("ad-images")
export class AdImagesController {
  constructor(private adImagesService: AdImagesService) {}

  @ApiTags()
  @ApiCreatedResponse()
  @Post()
  createAd(@Body() body: CreateAdImageDto) {
    return this.adImagesService.createAdImage(body);
  }
}
