import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './repositories/Category.repository';
import { GetAllCategoriesDto } from './dto/get-all-categories.dto';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getAllCategories(query: GetAllCategoriesDto) {
    const qb = this.categoryRepository.createQueryBuilder('categories');
    if (query.parent_category_id) {
      qb.where({ parent_category_id: query.parent_category_id });
    }
    const [data, total] = await qb
      .take(query.limit)
      .offset(query.offset)
      .getManyAndCount();
    return { total: total, data: data };
  }
}
