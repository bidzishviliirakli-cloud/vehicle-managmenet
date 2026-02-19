import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: process.env.DATABASE_PSWD,
        database: 'mysql',
        entities: [__dirname + '/../**/*.entity{.js,.ts}'],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
