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
		type: String
	})
	@IsNotEmpty()
	@IsString()
	latitude: string;

	@ApiProperty({
		description: "Longitude",
		type: String
	})
	@IsNotEmpty()
	@IsString()
	longitude: string;

	@ApiProperty({
		description: "Car category UUID",
		type: String
	})
	@IsNotEmpty()
	@IsUUID()
	categoryId: string;
}
