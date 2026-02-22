import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Max, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { DEFAULT_OFFSET, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE } from "src/common/contracts/constants";

export class PaginationDto {
	@ApiProperty({
		required: false,
		description: "How many records should be skipped before returning results from a database query",
		type: Number,
		minimum: DEFAULT_OFFSET,
		default: DEFAULT_OFFSET
	})
	@IsNumber({ maxDecimalPlaces: 0 })
	@IsOptional()
	@Min(DEFAULT_OFFSET)
	@Type(() => Number)
	offset: number;

	@ApiProperty({
		required: false,
		description: "Number of elements to fetch",
		type: Number,
		maximum: MAX_PAGE_SIZE,
		default: DEFAULT_PAGE_SIZE
	})
	@IsNumber({ maxDecimalPlaces: 0 })
	@IsOptional()
	@IsPositive()
	@Max(MAX_PAGE_SIZE)
	@Type(() => Number)
	limit: number;
}
