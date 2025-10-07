import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { EmailExists } from '../validators/email-exists.validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @EmailExists({ message: 'El correo no está registrado en el sistema' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
