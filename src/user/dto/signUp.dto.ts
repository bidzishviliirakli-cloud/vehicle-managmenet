import { ApiProperty } from "@nestjs/swagger";
import { IsDefined, IsEmail, IsNotEmpty, IsString, MinLength, NotContains } from "class-validator";

export class SignUpDto {
	@ApiProperty({ description: "email", type: String })
	@IsDefined()
	@IsEmail()
	email: string;

	@ApiProperty({ description: "Full name of the user", type: String })
	@IsNotEmpty()
	@IsString()
	fullName: string;

	@ApiProperty({ description: "Password", type: String })
	@IsNotEmpty()
	@IsString()
	@MinLength(4)
	@NotContains(" ")
	password: string;
}
