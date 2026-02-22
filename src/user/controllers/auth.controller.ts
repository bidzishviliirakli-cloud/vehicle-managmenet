import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";

import { UserService } from "src/user/services/user.service";
import { SignInDto } from "src/user/dto/signIn.dto";
import { SignUpDto } from "src/user/dto/signUp.dto";

@ApiTags("Auth")
@Controller("user/")
export class AuthController {
	constructor(private readonly userService: UserService) {}

	@Post("signIn")
	@ApiBody({ type: SignInDto })
	signIn(@Body() body: SignInDto): Promise<any> {
		return this.userService.signIn(body);
	}

	@Post("signUp")
	@ApiBody({ type: SignUpDto })
	signUp(@Body() body: SignUpDto): Promise<any> {
		return this.userService.signUp(body);
	}
}
