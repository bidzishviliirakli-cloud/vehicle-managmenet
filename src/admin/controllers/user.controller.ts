import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserService } from "src/user/services/user.service";
import { CreateRoleDto } from "../dto/createRole.dto";
import { RoleService } from "src/user/services/role.service";

@ApiTags("Admin - User CMS")
@Controller("admin/user/")
export class UserController {
	constructor(
		private userService: UserService,
		private roleService: RoleService
	) {}

	@Get()
	@ApiBearerAuth()
	async findAll() {
		return this.userService.findAll();
	}

	@Put("toggleActiveStatus/:id")
	@ApiBearerAuth()
	async toggleActiveStatus(@Param("id", ParseUUIDPipe) id: string) {
		return this.userService.toggleActiveStatus(id);
	}

	@Post("role")
	@ApiBearerAuth()
	async role(@Body() createRoleDto: CreateRoleDto) {
		return this.roleService.create(createRoleDto);
	}
}
