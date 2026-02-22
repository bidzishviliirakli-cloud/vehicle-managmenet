import { DeepPartial, FindOptionsWhere, QueryDeepPartialEntity, Repository } from "typeorm";
import { HttpException } from "@nestjs/common";
import { BaseEntity } from "../entities/base.entity";

export class BaseService<Entity extends BaseEntity> {
	constructor(readonly repository: Repository<Entity>) {}

	async findOne(id: string) {
		try {
			return this.repository.findOneBy({ id } as FindOptionsWhere<Entity>);
		} catch (error) {
			this.throwHttpException(error);
		}
	}

	async findAll() {
		try {
			return this.repository.find();
		} catch (error) {
			this.throwHttpException(error);
		}
	}

	async create(entity: DeepPartial<Entity>) {
		try {
			const record = this.repository.create(entity);
			await this.repository.save(record);
			return this.findOne(record.id);
		} catch (error) {
			this.throwHttpException(error);
		}
	}

	async bulkInsert(entityList: DeepPartial<Entity>[]) {
		try {
			const list = [] as Entity[];
			for (let i = 0; i < entityList.length; i++) {
				list.push(this.repository.create(entityList[i]));
			}

			await this.repository.save(list);

			return this.findAll();
		} catch (error) {
			this.throwHttpException(error);
		}
	}

	async update(id: string, entity: QueryDeepPartialEntity<Entity>) {
		try {
			await this.repository.update(id, entity);
			return this.findOne(id);
		} catch (error) {
			this.throwHttpException(error);
		}
	}

	async delete(id: string) {
		try {
			await this.repository.delete(id);
			return this.findAll();
		} catch (error) {
			this.throwHttpException(error);
		}
	}

	protected throwHttpException(error) {
		console.log("error", error);
		const message = error?.message || error?.data?.message || "Internal server error";
		const status = error?.status || error?.data?.status || 500;

		throw new HttpException(message, status);
	}
}
