import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/Database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
