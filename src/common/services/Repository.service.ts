import * as format from "pg-format";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";

import { TPaginated } from "../contracts/types";
import { BaseEntity } from "../entities/base.entity";
import { QueryEngine } from "../engines/QueryEngine";
import { PaginationDto } from "../dto/Pagination.dto";
import { ICollectPayload, ISortDto } from "../contracts/interfaces";
import { BaseService } from "./base.service";

@Injectable()
export class RepositoryService<Entity extends BaseEntity> extends BaseService<Entity> {
	constructor(readonly repository: Repository<Entity>) {
		super(repository);
	}

	public async collect<TResult, FilterDto = unknown>({
		query,
		paginationDto,
		filterDto,
		sortDto
	}: ICollectPayload<FilterDto>): Promise<TPaginated<TResult[]>> {
		try {
			const queryEngine = await this.prepare(query, paginationDto, filterDto, sortDto);
			const content = await this.repository.query(queryEngine.getParameterizedQuery(), queryEngine.getParams());

			return {
				content,
				meta: queryEngine.getMetadata()
			};
		} catch (error) {
			this.throwHttpException(error);
		}
	}

	private async prepare<FilterDto = unknown>(
		query: string,
		paginationDto?: PaginationDto,
		filterDto?: FilterDto,
		sortDto?: ISortDto
	): Promise<QueryEngine> {
		await this.analyzeTables();

		const queryEngine = new QueryEngine()
			.initQuery(query)
			.initFilterDto(filterDto)
			.initSortDto(sortDto)
			.initPaginationDto(paginationDto)
			.initMetadata()
			.setFilters()
			.setSorting();

		const composedQuery = format(queryEngine.getQuery(), ...queryEngine.getParams());
		const total = await this.countEstimate(composedQuery);

		return queryEngine.setPagination(total);
	}

	/**
	 * Do not pass an unsanitized `query` to this function, as it is subject to SQL injection.
	 * Source : https://wiki.postgresql.org/wiki/Count_estimate
	 **/
	private async countEstimate(query: string): Promise<number> {
		const count = await this.repository.query(`SELECT count_estimate($$${query}$$)`);
		return count[0].count_estimate ?? 0;
	}

	/**
	 * @Warning Regularly running commands that acquire locks conflicting with a SHARE UPDATE EXCLUSIVE lock (e.g., ANALYZE) can effectively prevent autovacuums from ever completing.
	 * Source: https://www.postgresql.org/docs/current/routine-vacuuming.html#VACUUM-BASICS
	 */
	private async analyzeTables(): Promise<void> {
		await this.repository.query(
			`ANALYZE car_entity, car_image_entity, car_tag_entity, category_entity, tag_entity, user_entity;`
		);
	}
}
