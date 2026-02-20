import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  isUUID,
  IsUUID,
  NotContains,
} from 'class-validator';

export class CreateCarDto {
  @ApiProperty({ description: 'Unique plate number', type: String })
  @IsNotEmpty()
  @IsString()
  @NotContains(' ')
  plateNumber: string;

  @ApiProperty({ description: 'Car availability', type: Boolean })
  @IsNotEmpty()
  @IsBoolean()
  isAvailable: boolean;

  @ApiProperty({
    description: 'Latitude',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  latitude: string;

  @ApiProperty({
    description: 'Longitude',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  longitude: string;

  @ApiProperty({
    description: 'Car category UUID',
    type: String,
  })
  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @ApiProperty({
    description: 'Car images, separated with comma',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  media: string;

  @ApiProperty({
    description: 'Car tags',
    type: Array,
  })
  @IsArray()
  @IsUUID(4, { each: true })
  tag: string[];
}
