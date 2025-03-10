import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: any = [
    {
      id: 1,
      user: 'juan',
    },
    {
      id: 2,
      user: 'pablo',
    },
  ];

  getAllUsers() {
    return this.users;
  }

  createUser(user: CreateUserDto) {
    const newUser = { ...user, id: this.users.length + 1 };
    this.users.push(newUser);

    return newUser;
  }
}
