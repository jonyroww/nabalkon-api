import {
  Controller,
  UsePipes,
  ValidationPipe,
  Post,
  Body,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { AdImagesService } from './ad-images.service';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateAdImageBodyDto } from './dto/create-ad-image-body.dto';
import { GetAllDto } from './dto/get-all-ad-images.dto';
import { CreateAdImageParamsDto } from './dto/create-ad-params.dto';
import { DeleteAdImageParamsDto } from './dto/delete-ad-image.dto';

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller()
export class AdImagesController {
  constructor(private adImagesService: AdImagesService) {}

  @ApiTags('Ad images')
  @ApiCreatedResponse()
  @Post('ads/:adId/images')
  createAd(
    @Body() body: CreateAdImageBodyDto,
    @Param() params: CreateAdImageParamsDto,
  ) {
    return this.adImagesService.createAdImage(body, params);
  }

  @ApiTags('Ad images')
  @ApiCreatedResponse()
  @Get('ads/:adId/images')
  getAllAdImages(@Param() params: GetAllDto) {
    return this.adImagesService.getAllAdImages(params);
  }

  @ApiTags('Ad images')
  @ApiCreatedResponse()
  @Delete('ads/:adId/images/:imageId')
  deleteAdImage(@Param() params: DeleteAdImageParamsDto) {
    return this.adImagesService.deleteAllAdImages(params);
  }
}
