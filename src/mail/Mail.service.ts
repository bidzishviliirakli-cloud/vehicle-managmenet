import { MailerService } from "@nestjs-modules/mailer";
import { HttpException, Injectable } from "@nestjs/common";

import { ISendMailOptions } from "./contracts/interfaces";
import { NO_REPLY_EMAIL } from "./contracts/constants";
import { TemplateService } from "./Template.service";
import { SignUpDto } from "src/user/dto/signUp.dto";

@Injectable()
export class MailService {
	constructor(
		private mailerService: MailerService,
		private templateService: TemplateService
	) {}

	async sendWelcomeEmail(signUpDto: SignUpDto) {
		try {
			await this.sendMail({
				to: signUpDto.email,
				from: NO_REPLY_EMAIL,
				subject: "Welcome to car booking portal",
				html: this.templateService.generateHtml(signUpDto)
			});
		} catch (err) {
			throw new HttpException(err.response, err.responseCode);
		}
	}

	private async sendMail(options: ISendMailOptions) {
		await this.mailerService.sendMail(options);
	}
}
