import { Type } from "class-transformer";
import { IsNumber, IsOptional, Min, Max } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class NearestFilterDto {
	@ApiProperty({
		description: "User latitude coordinate",
		type: Number,
		required: true,
		example: 41.7151
	})
	@Type(() => Number)
	@IsNumber()
	@Min(-90)
	@Max(90)
	latitude: number;

	@ApiProperty({
		description: "User longitude coordinate",
		type: Number,
		required: true,
		example: 44.8271
	})
	@Type(() => Number)
	@IsNumber()
	@Min(-180)
	@Max(180)
	longitude: number;

	@ApiProperty({
		description: "Search radius in kilometers (default is 10km)",
		type: Number,
		required: false,
		example: 10
	})
	@Type(() => Number)
	@IsOptional()
	@IsNumber()
	@Min(1)
	@Max(100)
	radius?: number;
}
