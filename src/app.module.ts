import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { UserModule } from "src/user/user.module";
import { CarModule } from "src/car/car.module";
import { AdminModule } from "src/admin/admin.module";
import { UserJwtMiddleware } from "./common/middlewares/middlewares/userJwt.middleware";
import { EXCLUDE_ADMIN_ENDPOINTS, PUBLIC_ENDPOINTS } from "./common/contracts/constants";
import { DatabaseModule } from "./database/database.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		DatabaseModule,
		UserModule,
		CarModule,
		AdminModule
	]
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(UserJwtMiddleware)
			.exclude(...PUBLIC_ENDPOINTS, EXCLUDE_ADMIN_ENDPOINTS)
			.forRoutes("*");
	}
}
