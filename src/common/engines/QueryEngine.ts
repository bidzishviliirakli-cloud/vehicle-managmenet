import { DEFAULT_OFFSET, DEFAULT_PAGE_SIZE } from "src/common/contracts/constants";
import { ISortDto } from "src/common/contracts/interfaces";
import { TPaginationMetadata } from "src/common/contracts/types";
import { PaginationDto } from "src/common/dto/Pagination.dto";

export class QueryEngine<FilterDto = unknown> {
	private query: string;
	private filterDto: FilterDto;
	private sortDto: ISortDto;
	private paginationDto: PaginationDto;
	private metaData: TPaginationMetadata;
	private params: (number | string)[] = [];

	initQuery(query: string) {
		this.query = query;
		return this;
	}

	initFilterDto(filterDto: FilterDto) {
		this.filterDto = filterDto;
		return this;
	}

	initSortDto(sortDto: ISortDto) {
		this.sortDto = sortDto;
		return this;
	}

	initPaginationDto(paginationDto?: PaginationDto) {
		this.paginationDto = paginationDto ?? {
			limit: DEFAULT_PAGE_SIZE,
			offset: DEFAULT_OFFSET
		};
		return this;
	}

	initMetadata() {
		this.metaData = {
			page: 0,
			total: 0,
			totalPages: 0,
			limit: 0
		};
		return this;
	}

	setFilters() {
		if (!this.filterDto) return this;

		this.initFilters();

		for (const [key, value] of Object.entries(this.filterDto)) {
			if (typeof value === undefined) return;

			const isPrimitive = (typeof value !== "object" && typeof value !== "function") || value === null;
			const isArray = Array.isArray(value);

			if (isPrimitive) this.addCondition(`"${key}" = %L`, value);
			if (isArray) this.addCondition(`"${key}" = ANY(%L)`, `{${value.join(",")}}`);
		}

		return this;
	}

	setSorting() {
		if (!this.sortDto || !this.sortDto.direction || !this.sortDto.target) return this;

		this.query = this.query.concat(` ORDER BY "${this.sortDto.target}" ${this.sortDto.direction}`);

		return this;
	}

	setPagination(total: number) {
		const offset = +(this.paginationDto.offset ?? DEFAULT_OFFSET);
		const limit = +(this.paginationDto.limit ?? DEFAULT_PAGE_SIZE);

		this.metaData.page = Math.floor(offset / limit + 1);
		this.metaData.limit = limit;
		this.metaData.total = total;
		this.metaData.totalPages = Math.ceil(total / limit);

		this.query = this.query.concat(` LIMIT ${limit} OFFSET ${offset};`);

		return this;
	}

	getMetadata() {
		return this.metaData;
	}

	getQuery() {
		return this.query;
	}

	getParameterizedQuery() {
		let counter = 1;
		const query = this.query.replace(/%L/g, () => `$${counter++}`);
		return query;
	}

	getParams() {
		return this.params;
	}

	private initFilters() {
		this.query = this.query.concat(" WHERE 1 = 1");
	}

	private addCondition(condition: string, value: any) {
		this.query += ` AND ${condition}`;
		this.params.push(value);
	}
}
