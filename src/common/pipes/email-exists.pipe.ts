import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class EmailExistsPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) { }

  async transform(value: any, metadata: ArgumentMetadata) {
    const email = value;

    if (!email)
      return value;

    const user = await this.usersService.findOneByEmail(email);

    if (!user)
      throw new BadRequestException(
        `User with ID ${email} does not exist`,
      );

    return value;
  }
}
