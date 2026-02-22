import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { CategoryService } from "src/car/services/category.service";
import { CreateCategoryDto } from "../dto/createCategory.dto";
import { UpdateCategoryDto } from "../dto/updateCategory.dto";

@ApiTags("Admin - Car Category CMS")
@Controller("admin/category")
export class CategoryController {
	constructor(private categoryService: CategoryService) {}

	@Get()
	async findAll() {
		return this.categoryService.findAll();
	}

	@Post()
	@ApiBody({ type: CreateCategoryDto })
	async create(@Body() category: CreateCategoryDto) {
		return this.categoryService.create(category);
	}

	@Put(":id")
	@ApiBody({ type: UpdateCategoryDto })
	async update(@Param("id", ParseUUIDPipe) id: string, @Body() category: UpdateCategoryDto) {
		return this.categoryService.update(id, category);
	}

	@Delete(":id")
	async delete(@Param("id", ParseUUIDPipe) id: string) {
		return this.categoryService.delete(id);
	}
}
