import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsUUID } from "class-validator";

export class CarTagDto {
	@ApiProperty({
		description: "Car tags",
		type: Array
	})
	@IsArray()
	@IsUUID(4, { each: true })
	tag: string[];
}
