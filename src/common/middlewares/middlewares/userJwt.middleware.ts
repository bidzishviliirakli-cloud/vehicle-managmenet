import { NextFunction, Request } from "express";
import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";

import { UserService } from "src/user/services/user.service";
import { JwtUtil } from "src/common/utils/jwtUtil";
import { EHttpCode } from "src/common/contracts/enums";

@Injectable()
export class UserJwtMiddleware implements NestMiddleware {
	constructor(private readonly userService: UserService) {}

	async use(req: Request, res: Response, next: NextFunction) {
		const authorization = req.headers.authorization;
		const token = JwtUtil.getToken(authorization);
		const payload = JwtUtil.decode(token);
		const user = await this.userService.findOne(payload.userId);

		if (!user.isActive) throw new HttpException(EHttpCode.USER_IS_DEACTIVATED, HttpStatus.FORBIDDEN);

		JwtUtil.verifyToken(token, process.env.USER_JWT_SECRET);

		next();
	}
}
