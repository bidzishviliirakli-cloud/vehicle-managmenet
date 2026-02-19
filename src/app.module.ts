import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';
import { CarModule } from 'src/car/car.module';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports: [DatabaseModule, UserModule, CarModule, AdminModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
