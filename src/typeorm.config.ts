import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: process.env.DATABASE_PSWD,
  database: 'mysql',
  logging: true,
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*.ts'],
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
});
