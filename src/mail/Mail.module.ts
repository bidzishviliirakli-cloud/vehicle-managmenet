import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";

import { MailService } from "./Mail.service";
import { TemplateService } from "./Template.service";

@Module({
	imports: [
		MailerModule.forRootAsync({
			useFactory: async (config: ConfigService) => ({
				transport: {
					host: config.get("SMTP_HOST"),
					auth: {
						user: config.get("SMTP_AUTH_USER"),
						pass: config.get("SMTP_AUTH_PASS")
					}
				}
			}),
			inject: [ConfigService]
		})
	],
	providers: [MailService, TemplateService],
	exports: [MailService]
})
export class MailModule {}
