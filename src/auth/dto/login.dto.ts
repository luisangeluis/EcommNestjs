import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { EmailExists } from '../validators/email-exists.validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  // @EmailExists({ message: 'Email not found' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
