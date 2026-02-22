import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DatabaseModule } from "src/database/database.module";
import { UserModule } from "src/user/user.module";
import { CarModule } from "src/car/car.module";
import { AdminModule } from "src/admin/admin.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		DatabaseModule,
		UserModule,
		CarModule,
		AdminModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
