import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarEntity } from './entities/car.entity';
import { CarImageEntity } from './entities/carImage.entity';
import { CarTagEntity } from './entities/carTag.entity';
import { TagEntity } from './entities/tag.entity';
import { CategoryEntity } from './entities/category.entity';
import { CarService } from './services/car.service';
import { CategoryService } from './services/category.service';
import { TagService } from './services/tag.service';
import { CarImageService } from './services/carImage.service';
import { CarTagService } from './services/carTag.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CarEntity,
      TagEntity,
      CategoryEntity,
      CarImageEntity,
      CarTagEntity,
    ]),
  ],
  providers: [
    CarService,
    CategoryService,
    TagService,
    CarImageService,
    CarTagService,
  ],
  exports: [CarService, TagService, CategoryService],
  controllers: [],
})
export class CarModule {}
