import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { JwtUtil } from "src/common/utils/jwtUtil";
import { SignInDto } from "src/user/dto/signIn.dto";
import { SignUpDto } from "src/user/dto/signUp.dto";
import { MailService } from "src/mail/Mail.service";
import { UserEntity } from "src/user/entities/user.entity";
import { RepositoryService } from "src/common/services/repository.service";
import { RoleService } from "./role.service";

@Injectable()
export class UserService extends RepositoryService<UserEntity> {
	constructor(
		@InjectRepository(UserEntity)
		private userRepository: Repository<UserEntity>,
		private roleService: RoleService,
		private mailService: MailService
	) {
		super(userRepository);
	}

	async signUp(payload: SignUpDto) {
		try {
			const hash = await this.generateHash(payload.password);
			const role = await this.roleService.findOne("USER");
			const user = {
				email: payload.email,
				fullName: payload.fullName,
				roleId: role.id,
				active: true,
				password: hash
			};

			await this.create(user);
			await this.mailService.sendWelcomeEmail(payload);
		} catch (error) {
			this.throwHttpException(error);
		}
	}

	async signIn(signInDto: SignInDto): Promise<{ accessToken: string } | void> {
		try {
			const { email, password } = signInDto;
			const user = await this.findByEmail(email);

			await this.validatePassword(password, user);

			return { accessToken: JwtUtil.signToken(user) };
		} catch (error) {
			this.throwHttpException(error);
		}
	}

	async toggleActiveStatus(id: string) {
		try {
			const user = await this.findOne(id);

			await this.userRepository.query(`UPDATE user_entity SET active = $2 WHERE id = $1`, [id, !user?.active]);

			return this.findOne(id);
		} catch (error) {
			this.throwHttpException(error);
		}
	}

	private async findByEmail(email: string) {
		const user = await this.userRepository.query(`SELECT * FROM user_entity where email = $1`, [email]);

		return user[0];
	}

	private async validatePassword(password: string, user: UserEntity) {
		const isValid = await bcrypt.compare(password, user.password);

		if (!isValid) {
			throw new HttpException("InvalidCredentials", HttpStatus.BAD_REQUEST);
		}
	}

	private async generateHash(password: string): Promise<string> {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(password, salt);

		return hashedPassword;
	}
}
