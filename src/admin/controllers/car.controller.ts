import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CarService } from 'src/car/services/car.service';
import { CreateCarDto } from '../dto/createCar.dto';
import { UpdateCarDto } from '../dto/updateCar.dto';

@ApiTags('Admin - Car CMS')
@Controller('admin/car')
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  async findAll() {
    return this.carService.findAll();
  }

  @Post()
  @ApiBody({ type: CreateCarDto })
  async create(@Body() createCarDto: CreateCarDto) {
    return this.carService.save(createCarDto);
  }

  @Put(':id')
  @ApiBody({ type: UpdateCarDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() car: UpdateCarDto,
  ) {
    return this.carService.update(id, car);
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.carService.delete(id);
  }
}
