import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/car/entities/category.entity';
import { RepositoryService } from 'src/common/services/Repository.service';
import { Repository } from 'typeorm';

export class CategoryService extends RepositoryService<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    readonly categoryRepository: Repository<CategoryEntity>,
  ) {
    super(categoryRepository);
  }
}
