import { PartialType } from "@nestjs/swagger";
import { BaseCarDto } from "./baseCar.dto";

export class UpdateCarDto extends PartialType(BaseCarDto) {}
