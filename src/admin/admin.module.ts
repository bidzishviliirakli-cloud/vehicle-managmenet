import { Module } from "@nestjs/common";
import { CarModule } from "src/car/car.module";
import { UserModule } from "src/user/user.module";
import { CarController } from "./controllers/car.controller";
import { TagController } from "./controllers/tag.controller";
import { CategoryController } from "./controllers/category.controller";
import { UserController } from "./controllers/user.controller";

@Module({
	controllers: [CarController, TagController, CategoryController, UserController],
	imports: [CarModule, UserModule]
})
export class AdminModule {}
