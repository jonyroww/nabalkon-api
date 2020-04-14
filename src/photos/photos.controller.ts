import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get
} from "@nestjs/common";
import { FileInterceptor, MulterModule } from "@nestjs/platform-express";
import { PhotosService } from "./photos.service";
import { ApiOkResponse, ApiTags, ApiCreatedResponse } from "@nestjs/swagger";
import { ConfigService } from "../config/config.service";
import multer from "multer";
import uuid from "uuid/v4";
import mime from "mime";

@Controller("photos")
export class PhotosController {}
