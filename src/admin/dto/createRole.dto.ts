import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, NotContains } from "class-validator";

export class CreateRoleDto {
	@ApiProperty({ description: "Title", type: String })
	@IsNotEmpty()
	@IsString()
	@NotContains(" ")
	title: string;
}
