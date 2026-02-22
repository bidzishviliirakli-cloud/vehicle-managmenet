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
		description: "Car tags, separated with comma (Big Car, Small Car, etc...)",
		type: String,
		required: false
	})
	@IsOptional()
	tags: string;
}
