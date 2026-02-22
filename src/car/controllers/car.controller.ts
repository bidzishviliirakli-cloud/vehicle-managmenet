import { Controller, Get, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

import { CarService } from "src/car/services/car.service";
import { ApiQueryDecorator } from "src/common/decorators/ApiQuery.decorator";
import { PaginationDto } from "src/common/dto/Pagination.dto";
import { CarFilterDto } from "../dto/carFilter.dto";
import { CarSortDto } from "../dto/carSort.dto";
import { NearestFilterDto } from "../dto/nearestFilter.dto";

@ApiTags("Car portal")
@Controller("car/")
export class CarController {
	constructor(private carService: CarService) {}

	@Get()
	@ApiQueryDecorator("filter", CarFilterDto)
	@ApiQueryDecorator("sort", CarSortDto)
	async find(
		@Query() paginationDto: PaginationDto,
		@Query("filter") filterDto: CarFilterDto,
		@Query("sort") sortDto: CarSortDto
	) {
		return this.carService.find(paginationDto, filterDto, sortDto);
	}

	@Get("findByCategory")
	async findByCategory() {
		return this.carService.findByCategory();
	}

	@ApiBearerAuth()
	@Get("nearest")
	async nearest(@Query() nearestFilterDto: NearestFilterDto) {
		return this.carService.nearest(nearestFilterDto);
	}
}
