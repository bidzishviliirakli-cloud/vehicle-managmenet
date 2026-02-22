import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { RoleEntity } from "src/user/entities/role.entity";
import { RepositoryService } from "src/common/services/repository.service";

@Injectable()
export class RoleService extends RepositoryService<RoleEntity> {
	constructor(
		@InjectRepository(RoleEntity)
		readonly roleRepository: Repository<RoleEntity>
	) {
		super(roleRepository);
	}

	async findOneByTitle(title: string): Promise<RoleEntity> {
		try {
			const role = await this.repository.query(`SELECT * from role_entity where title = $1`, [title]);
			return role[0];
		} catch (error) {
			this.throwHttpException(error);
		}
	}
}
