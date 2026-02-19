import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsString,
  NotContains,
} from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: 'Valid email for already registered user',
    type: String,
  })
  @IsDefined()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Valid password for already registered user',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @NotContains(' ')
  password: string;
}
