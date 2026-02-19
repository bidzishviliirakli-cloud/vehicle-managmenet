import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common';

import { CategoryEntity } from 'src/car/entities/category.entity';

export class CategoryService {
  constructor(readonly repository: Repository<CategoryEntity>) {}

  async findOne(id: string) {
    try {
      const category = await this.repository.query(
        `SELECT * FROM category_entity WHERE id = $1`,
        [id],
      );

      return category[0];
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    const categories = await this.repository.query(
      `SELECT * FROM category_entity`,
    );

    return categories;
  }

  async create(category: CategoryEntity) {
    await this.repository.save(category);
    return 'ok';
  }

  async update(id: string, category: Partial<CategoryEntity>) {
    await this.repository.update(id, category);
    return 'ok';
  }

  async delete(id: string) {
    await this.repository.delete(id);

    return 'ok';
  }
}
