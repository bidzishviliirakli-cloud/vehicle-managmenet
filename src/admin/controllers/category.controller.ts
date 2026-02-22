import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { CategoryService } from "src/car/services/category.service";
import { CreateCategoryDto } from "../dto/createCategory.dto";
import { UpdateCategoryDto } from "../dto/updateCategory.dto";

@ApiTags("Admin - Car Category CMS")
@Controller("admin/category")
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	@ApiBearerAuth()
	async findAll() {
		return this.categoryService.findAll();
	}

	@Post()
	@ApiBearerAuth()
	@ApiBody({ type: CreateCategoryDto })
	async create(@Body() category: CreateCategoryDto) {
		return this.categoryService.create(category);
	}

	@Put(":id")
	@ApiBearerAuth()
	@ApiBody({ type: UpdateCategoryDto })
	async update(@Param("id", ParseUUIDPipe) id: string, @Body() category: UpdateCategoryDto) {
		return this.categoryService.update(id, category);
	}

	@Delete(":id")
	@ApiBearerAuth()
	async delete(@Param("id", ParseUUIDPipe) id: string) {
		return this.categoryService.delete(id);
	}
}
