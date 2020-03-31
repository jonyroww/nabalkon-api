import { Controller } from "@nestjs/common";
import { CategoriesService } from "./categories.service";

import {
  ApiOkResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiBearerAuth
} from "@nestjs/swagger";

@Controller("categories")
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}
}
