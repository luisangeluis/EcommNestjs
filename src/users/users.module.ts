import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { LoggerMiddleware } from './logger/logger.middleware';
import { AuthMiddleware } from './auth/auth.middleware';
import { PrismaService } from 'src/prisma/prisma.service';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  imports: [RolesModule],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //Se usa el middleware en todas las rutas users
    // consumer.apply(LoggerMiddleware).forRoutes("users");

    //Para usar el middleware en rutas en especifico
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(
        {
          path: '/users',
          method: RequestMethod.GET,
        },
        {
          path: '/users',
          method: RequestMethod.POST,
        },
      )
      .apply(AuthMiddleware)
      .forRoutes('users');
  }
}
