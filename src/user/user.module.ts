import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { AuthController } from './controllers/auth.controller';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
  providers: [RoleService, UserService],
  controllers: [AuthController],
})
export class UserModule {}
