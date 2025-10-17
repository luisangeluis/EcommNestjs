import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IHashService } from 'src/auth/hash/hash-service.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject('IHashService') private readonly hashService: IHashService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashService.hash(createUserDto.password);

    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        cart: { create: {} },
      },
    });

    const { password, ...result } = user;

    return result;
  }

  async findOneByEmail(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) return null;

    return user;
  }
}
