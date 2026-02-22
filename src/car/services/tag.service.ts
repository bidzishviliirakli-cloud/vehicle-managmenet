import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { TagEntity } from "src/car/entities/tag.entity";
import { RepositoryService } from "src/common/services/repository.service";

export class TagService extends RepositoryService<TagEntity> {
	constructor(
		@InjectRepository(TagEntity)
		readonly tagRepository: Repository<TagEntity>
	) {
		super(tagRepository);
	}
}
