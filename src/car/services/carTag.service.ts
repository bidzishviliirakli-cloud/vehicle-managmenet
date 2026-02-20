import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from 'src/common/services/Repository.service';
import { CarTagEntity } from '../entities/carTag.entity';

export class CarTagService extends RepositoryService<CarTagEntity> {
  constructor(
    @InjectRepository(CarTagEntity)
    readonly carTagRepository: Repository<CarTagEntity>,
  ) {
    super(carTagRepository);
  }
}
