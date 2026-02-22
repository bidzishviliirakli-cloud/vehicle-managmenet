import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { RepositoryService } from "src/common/services/repository.service";
import { CarImageEntity } from "../entities/carImage.entity";

export class CarImageService extends RepositoryService<CarImageEntity> {
	constructor(
		@InjectRepository(CarImageEntity)
		carImageRepository: Repository<CarImageEntity>
	) {
		super(carImageRepository);
	}
}
