import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth
} from "@nestjs/swagger";
import { GetAllCategoriesDto } from "./dto/get-all-categories.dto";

@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
@Controller("categories")
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}
  @Get()
  @ApiTags("Categories")
  @ApiOkResponse()
  getAllCategories(@Query() query: GetAllCategoriesDto) {
    return this.categoryService.getAllCategories(query);
  }
}
