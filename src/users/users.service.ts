import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
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
}
