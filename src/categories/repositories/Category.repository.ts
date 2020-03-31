import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { Category } from "../entities/Category.entity";

@EntityRepository(Category)
export class CategoryRepository extends BaseRepository<Category> {}
