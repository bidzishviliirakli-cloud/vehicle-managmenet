import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CarMediaDto {
	@ApiProperty({
		description: "Car images, separated with comma",
		type: String
	})
	@IsNotEmpty()
	@IsString()
	media: string;
}
