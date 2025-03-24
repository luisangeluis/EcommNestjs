import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  isNotEmpty,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  // @IsNumber()
  // @Max(150)
  // age: number;
  //
}
