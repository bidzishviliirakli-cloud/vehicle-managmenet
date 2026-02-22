import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),

		TypeOrmModule.forRootAsync({
			useFactory: () => ({
				type: "postgres",
				url: process.env.DATABASE_URL,
				ssl: {
					rejectUnauthorized: false
				},
				autoLoadEntities: true,
				synchronize: false
			})
		})
	]
})
export class DatabaseModule {}
