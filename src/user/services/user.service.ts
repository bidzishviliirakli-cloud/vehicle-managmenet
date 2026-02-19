import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { JwtUtil } from 'src/common/utils/jwtUtil';
import { SignInDto } from 'src/user/dto/signIn.dto';
import { SignUpDto } from 'src/user/dto/signUp.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { RoleService } from './role.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
    private roleService: RoleService,
  ) {}

  async signUp(payload: SignUpDto): Promise<string> {
    try {
      const hash = await this.generateHash(payload.password);
      const role = await this.roleService.findOne('USER');

      await this.repository.query(
        `INSERT INTO user_entity (email, "fullName", "roleId", active, password) VALUES ($1,$2,$3,$4,$5)`,
        [payload.email, payload.fullName, role.id, true, hash],
      );

      return 'ok';
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async signIn(signInDto: SignInDto): Promise<any> {
    const { email, password } = signInDto;
    const user = await this.repository.query(
      `SELECT * FROM user_entity where email = $1`,
      [email],
    );
    await this.validatePassword(password, user[0]);

    return { accessToken: JwtUtil.signToken(user[0]) };
  }

  private async validatePassword(password: string, user: UserEntity) {
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new HttpException('InvalidCredentials', HttpStatus.BAD_REQUEST);
    }
  }

  private async generateHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  }
}
