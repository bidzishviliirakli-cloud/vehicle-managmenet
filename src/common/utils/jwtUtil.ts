import { HttpException, HttpStatus, InternalServerErrorException } from "@nestjs/common";
import { decode, verify, sign } from "jsonwebtoken";
import { UserEntity } from "src/user/entities/user.entity";
import { EHttpCode } from "../contracts/enums";

export class JwtUtil {
	static verifyToken(token: string, secret: string): void {
		try {
			verify(token, secret);
		} catch (err) {
			throw new HttpException(EHttpCode.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
		}
	}

	static signToken(user: UserEntity): string {
		try {
			const payload = {
				userId: user.id,
				role: user.roleId,
				isActive: user.isActive,
				fullName: user.fullName
			};

			return sign(payload, process.env.USER_JWT_SECRET);
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}

	static getToken(authorization: string): string {
		let token;

		if (authorization?.startsWith("Bearer") && (token = this.extractTokenFromHeaders(authorization))) {
			return token;
		}

		throw new HttpException(EHttpCode.INVALID_AUTH_HEADER, HttpStatus.UNAUTHORIZED);
	}

	static decode(token: string) {
		try {
			return decode(token);
		} catch (err) {
			throw new HttpException(EHttpCode.INVALID_TOKEN, HttpStatus.UNAUTHORIZED);
		}
	}

	static extractTokenFromHeaders(authorization: string): string {
		return authorization.split(" ")[1];
	}
}
