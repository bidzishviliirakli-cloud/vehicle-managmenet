import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarDto } from 'src/admin/dto/createCar.dto';
import { CarEntity } from 'src/car/entities/car.entity';
import { RepositoryService } from 'src/common/services/Repository.service';
import { CarImageService } from './carImage.service';
import { CarImageEntity } from '../entities/carImage.entity';
import { CarTagEntity } from '../entities/carTag.entity';
import { CarTagService } from './carTag.service';

export class CarService extends RepositoryService<CarEntity> {
  constructor(
    @InjectRepository(CarEntity)
    readonly carRepository: Repository<CarEntity>,
    private carImageService: CarImageService,
    private carTagService: CarTagService,
  ) {
    super(carRepository);
  }

  async save(createCarDto: CreateCarDto) {
    const car = await this.create(createCarDto);
    if (car) {
      const media = createCarDto.media.split(',');
      const carImages = [] as DeepPartial<CarImageEntity>[];
      const carTags = [] as DeepPartial<CarTagEntity>[];

      for (let i = 0; i < media.length; i++) {
        carImages.push({ carId: car.id, url: media[i], isPrimary: false });
      }

      for (let i = 0; i < createCarDto.tag.length; i++) {
        carTags.push({ carId: car.id, tagId: createCarDto.tag[i] });
      }

      await this.carImageService.bulkInsert(carImages);
      await this.carTagService.bulkInsert(carTags);
    }
  }
}
