import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { BaseCarDto } from "./baseCar.dto";

export class CreateCarDto extends BaseCarDto {
	@ApiProperty({
		description: "Car images, separated with comma",
		type: String
	})
	@IsNotEmpty()
	@IsString()
	media: string;

	@ApiProperty({
		description: "Car tags",
		type: Array
	})
	@IsArray()
	@IsUUID(4, { each: true })
	tag: string[];
}
