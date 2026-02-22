import { PaginationDto } from "../dto/Pagination.dto";
import { ESortDirection } from "./enums";

export interface ISortDto {
	target?: string;
	direction?: ESortDirection;
}

export interface ICollectPayload<FilterDto> {
	query: string;
	paginationDto?: PaginationDto;
	filterDto?: FilterDto;
	sortDto?: ISortDto;
}
