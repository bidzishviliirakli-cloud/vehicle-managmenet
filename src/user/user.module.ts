import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailModule } from 'src/mail/Mail.module';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { AuthController } from './controllers/auth.controller';
import { RoleService } from './services/role.service';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity]), MailModule],
  providers: [RoleService, UserService],
  controllers: [AuthController],
  exports: [UserService],
})
export class UserModule {}
