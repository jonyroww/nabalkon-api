import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { ConfigService } from '../config/config.service';
import multer from 'multer';
import uuid from 'uuid/v4';
import mime from 'mime';

@Controller('upload-photo')
export class PhotosController {
  constructor(private readonly configService: ConfigService) {}
  @ApiTags('Photos')
  @ApiCreatedResponse()
  @Post()
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: multer.diskStorage({
        destination: 'photos',
        filename: (req, file, callback) => {
          const filename = uuid() + '.' + mime.getExtension(file.mimetype);
          callback(null, filename);
        },
      }),
    }),
  )
  uploadPhoto(@UploadedFile() photo) {
    const photoUrl =
      this.configService.get('BASE_URL') + '/static/photos/' + photo.filename;
    return { url: photoUrl };
  }
}
