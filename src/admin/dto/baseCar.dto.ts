import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString, IsUUID, NotContains } from "class-validator";

export class BaseCarDto {
	@ApiProperty({ description: "Unique plate number", type: String })
	@IsNotEmpty()
	@IsString()
	@NotContains(" ")
	plateNumber: string;

	@ApiProperty({ description: "Car availability", type: Boolean })
	@IsNotEmpty()
	@IsBoolean()
	isAvailable: boolean;

	@ApiProperty({
		description: "Latitude",
		type: Number
	})
	@IsNotEmpty()
	@IsString()
	latitude: number;

	@ApiProperty({
		description: "Longitude",
		type: Number
	})
	@IsNotEmpty()
	@IsString()
	longitude: number;

	@ApiProperty({
		description: "Car category UUID",
		type: String
	})
	@IsNotEmpty()
	@IsUUID()
	categoryId: string;
}
