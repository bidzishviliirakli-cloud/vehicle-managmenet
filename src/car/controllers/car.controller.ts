import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { CarService } from "src/car/services/car.service";
import { ApiQueryDecorator } from "src/common/decorators/ApiQuery.decorator";
import { PaginationDto } from "src/common/dto/Pagination.dto";
import { CarFilterDto } from "../dto/CarFilter.dto";
import { CarSortDto } from "../dto/CarSort.dto";

@ApiTags("Car portal")
@Controller("car/")
export class CarController {
	constructor(private carService: CarService) {}

	@Get("findAvailable")
	@ApiQueryDecorator("filter", CarFilterDto)
	@ApiQueryDecorator("sort", CarSortDto)
	async findAvailable(
		@Query() paginationDto: PaginationDto,
		@Query("filter") filterDto: CarFilterDto,
		@Query("sort") sortDto: CarSortDto
	) {
		return this.carService.findAvailable(paginationDto, filterDto, sortDto);
	}

	@Get("findByCategory")
	async findByCategory() {
		return this.carService.findByCategory();
	}
}
