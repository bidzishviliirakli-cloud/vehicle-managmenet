import {
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { decode, verify, sign } from 'jsonwebtoken';
import { UserEntity } from 'src/user/entities/user.entity';

export class JwtUtil {
  static verifyToken(token: string, secret: string): void {
    try {
      verify(token, secret);
    } catch (err) {
      throw new HttpException('invalidtoken', HttpStatus.UNAUTHORIZED);
    }
  }

  static signToken(user: UserEntity): string {
    try {
      const payload = {
        userId: user.id,
      };
      return sign(payload, this.getSecret(), {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME || 100,
      });
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  static getToken(authorization: string): string {
    let token;

    if (
      authorization?.startsWith('Bearer') &&
      (token = this.extractTokenFromHeaders(authorization))
    ) {
      return token;
    }

    throw new HttpException('invalidAuthHeader', HttpStatus.UNAUTHORIZED);
  }

  static decodeToken(authorization: string) {
    const token = this.extractTokenFromHeaders(authorization);
    return decode(token);
  }

  static extractTokenFromHeaders(authorization: string): string {
    return authorization.split(' ')[1];
  }

  private static getSecret() {
    return '123';
  }
}
