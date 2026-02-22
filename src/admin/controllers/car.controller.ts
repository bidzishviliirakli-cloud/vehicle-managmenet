import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiTags } from "@nestjs/swagger";
import { CarService } from "src/car/services/car.service";
import { CarTagService } from "src/car/services/carTag.service";
import { CreateCarDto } from "../dto/createCar.dto";
import { UpdateCarDto } from "../dto/updateCar.dto";
import { CarTagDto } from "../dto/carTag.dto";

@ApiTags("Admin - Car CMS")
@Controller("admin/car/")
export class CarController {
	constructor(
		private carService: CarService,
		private carTagService: CarTagService
	) {}

	@Get()
	@ApiBearerAuth()
	async findAll() {
		return this.carService.findAll();
	}

	@Post()
	@ApiBearerAuth()
	@ApiBody({ type: CreateCarDto })
	async create(@Body() createCarDto: CreateCarDto) {
		return this.carService.save(createCarDto);
	}

	@Put("tag/:id")
	@ApiBearerAuth()
	@ApiBody({ type: CarTagDto })
	async tag(@Param("id", ParseUUIDPipe) id: string, @Body() car: CarTagDto) {
		return this.carTagService.updateTags(id, car);
	}

	@Put(":id")
	@ApiBearerAuth()
	@ApiBody({ type: UpdateCarDto })
	async update(@Param("id", ParseUUIDPipe) id: string, @Body() car: UpdateCarDto) {
		return this.carService.update(id, car);
	}

	@Delete(":id")
	@ApiBearerAuth()
	async delete(@Param("id", ParseUUIDPipe) id: string) {
		return this.carService.delete(id);
	}
}
