import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarEntity } from './entities/car.entity';
import { CarImageEntity } from './entities/carImage.entity';
import { CarTagEntity } from './entities/carTag.entity';
import { TagEntity } from './entities/tag.entity';
import { CategoryEntity } from './entities/category.entity';

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
})
export class CarModule {}
