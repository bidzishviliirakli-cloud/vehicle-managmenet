import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, NotContains } from "class-validator";

export class CreateCategoryDto {
	@ApiProperty({ description: "Title", type: String })
	@IsNotEmpty()
	@IsString()
	@NotContains(" ")
	title: string;

	@ApiProperty({
		description: "Description",
		type: String
	})
	@IsNotEmpty()
	@IsString()
	description: string;
}
