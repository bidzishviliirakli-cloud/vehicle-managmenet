import { MiddlewareConsumer, Module } from "@nestjs/common";
import { CarModule } from "src/car/car.module";
import { UserModule } from "src/user/user.module";
import { CarController } from "./controllers/car.controller";
import { TagController } from "./controllers/tag.controller";
import { CategoryController } from "./controllers/category.controller";
import { UserController } from "./controllers/user.controller";
import { AdminJwtMiddleware } from "src/common/middlewares/middlewares/adminJwt.middleware";
import { INCLUDE_ADMIN_ENDPOINTS, PUBLIC_ENDPOINTS } from "src/common/contracts/constants";

@Module({
	controllers: [CarController, TagController, CategoryController, UserController],
	imports: [CarModule, UserModule]
})
export class AdminModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(AdminJwtMiddleware)
			.exclude(...PUBLIC_ENDPOINTS)
			.forRoutes(INCLUDE_ADMIN_ENDPOINTS);
	}
}
