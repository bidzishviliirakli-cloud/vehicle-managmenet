import { IsBoolean, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CarFilterDto {
	@ApiProperty({
		description: "Car availability",
		type: Boolean,
		required: false
	})
	@IsOptional()
	@IsBoolean()
	isAvailable: boolean;

	@ApiProperty({
		description: "Car plate number",
		type: String,
		required: false
	})
	@IsOptional()
	@IsString()
	plateNumber: string;

	@ApiProperty({
		description: "Car category",
		type: String,
		required: false
	})
	@IsOptional()
	@IsString()
	category: string;

	@ApiProperty({
		description: "List of car tags",
		type: [String],
		required: false
	})
	@IsString({ each: true })
	@IsOptional()
	tags: string[];
}
