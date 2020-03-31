import { Injectable } from "@nestjs/common";
import { CategoryRepository } from "./repositories/Category.repository";

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: CategoryRepository) {}
}
