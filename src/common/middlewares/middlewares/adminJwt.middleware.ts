import { NextFunction, Request } from "express";
import { Injectable, NestMiddleware } from "@nestjs/common";

import { JwtUtil } from "src/common/utils/JwtUtil";

@Injectable()
export class AdminJwtMiddleware implements NestMiddleware {
	async use(req: Request, res: Response, next: NextFunction) {
		const authorization = req.headers.authorization;
		const token = JwtUtil.getToken(authorization);

		JwtUtil.verifyToken(token, process.env.ADMIN_JWT_SECRET);

		next();
	}
}
