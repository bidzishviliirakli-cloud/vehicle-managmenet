import { Controller, Get, Param, ParseUUIDPipe, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/services/user.service';

@ApiTags('Admin - User CMS')
@Controller('admin/user/')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Put('toggleActiveStatus/:id')
  async toggleActiveStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.userService.toggleActiveStatus(id);
  }
}
