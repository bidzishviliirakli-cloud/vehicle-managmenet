import { IsEnum, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { ISortDto } from "src/common/contracts/interfaces";
import { ESortDirection } from "src/common/contracts/enums";

enum ESortableColumns {
	CREATED_AT = "createdAt"
}

export class CarSortDto implements ISortDto {
	@ApiProperty({
		description: "Target column to sort",
		required: false,
		enum: ESortableColumns
	})
	@IsEnum(ESortableColumns)
	@IsOptional()
	target: ESortableColumns;

	@ApiProperty({
		description: "Sort direction ASC/DESC",
		required: false,
		enum: ESortDirection
	})
	@IsEnum(ESortDirection)
	@IsOptional()
	direction: ESortDirection;
}
