import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { RoleEntity } from "src/user/entities/role.entity";

@Injectable()
export class RoleService {
	constructor(
		@InjectRepository(RoleEntity)
		private repository: Repository<RoleEntity>
	) {}

	async findOne(title: string): Promise<RoleEntity> {
		const role = await this.repository.query(`SELECT * from role_entity where title = $1`, [title]);
		return role[0];
	}

	async findAll(): Promise<RoleEntity[]> {
		const roles = await this.repository.query(`SELECT * from role_entity`);
		return roles;
	}

	async create(role: RoleEntity): Promise<string> {
		await this.repository.query(`INSERT INTO role_entity (title) VALUES ($1)`, [role]);

		return "ok";
	}
}
