import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
  ValidatorConstraint,
  registerDecorator,
} from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class EmailExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(email: string) {
    // console.log('prisma:', this.prisma);

    const user = await this.prisma.user.findUnique({ where: { email } });
    return !!user;
  }

  defaultMessage(args: ValidationArguments) {
    return `Email ${args.value} is not registered.`;
  }
}

export function EmailExists(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: EmailExistsConstraint,
    });
  };
}
