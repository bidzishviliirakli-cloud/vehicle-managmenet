import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

import { CarTagDto } from "src/admin/dto/carTag.dto";
import { RepositoryService } from "src/common/services/repository.service";
import { CarTagEntity } from "../entities/carTag.entity";

export class CarTagService extends RepositoryService<CarTagEntity> {
	constructor(
		@InjectRepository(CarTagEntity)
		readonly carTagRepository: Repository<CarTagEntity>
	) {
		super(carTagRepository);
	}

	async updateTags(carId: string, carTagDto: CarTagDto) {
		for (let i = 0; i < carTagDto.tag.length; i++) {
			await this.carTagRepository.query(
				`INSERT INTO car_tag_entity ("carId", "tagId") VALUES ($1, $2) ON CONFLICT DO NOTHING`,
				[carId, carTagDto.tag[i]]
			);
		}
	}
}
