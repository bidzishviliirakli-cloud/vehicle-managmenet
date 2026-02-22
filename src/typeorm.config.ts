import { config } from "dotenv";
import { DataSource } from "typeorm";

config();

export default new DataSource({
	type: "postgres",
	host: "localhost",
	port: 5432,
	username: "casini",
	password: "",
	database: "postgres",
	synchronize: false,
	logging: true,
	migrationsRun: true,
	migrations: ["src/migrations/*.ts"],
	entities: [__dirname + "/**/*.entity{.ts,.js}"]
});
