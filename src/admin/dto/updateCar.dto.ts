import { PartialType } from '@nestjs/swagger';
import { CreateCarDto } from './createCar.dto';

export class UpdateCarDto extends PartialType(CreateCarDto) {}
