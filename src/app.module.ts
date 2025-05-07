import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { HelloController } from './hello/hello.controller';
import { PaymentsModule } from './payments/payments.module';
import { ProductsModule } from './products/products.module';
import { CategoriesService } from './categories/categories.service';
import { CategoriesModule } from './categories/categories.module';
import { RolesModule } from './roles/roles.module';
import { ProductsService } from './src/products/products.service';
import { ProductsService } from './src/products/products.service';
import { ProductsService } from './src/products/products.service';
import { ProductsService } from './src/products/products.service';

@Module({
  imports: [
    TasksModule,
    UsersModule,
    PaymentsModule,
    ProductsModule,
    CategoriesModule,
    RolesModule,
  ],
  controllers: [HelloController],
  providers: [ProductsService],
})
export class AppModule {
  //MODULES
  //Atajo para crear modules
  //nest g mo tasks
  //CONTROLLERS
  //Atajo para crear controllers
  //nest g co tasks
  //Atajo para crear controllers sin archivo de testing
  //nest g co tasks --no-spec
  //SERVICES
  //Atajo para generar un servicio
  //nest g s users --no-spec
  //Atajo para crear un pipe(En el ejemplo se validaron los querys de la URL)
  //nest g pipe hello/pipes/validateuser
  //GUARDS
  //Atajo para generar un guard
  //nest g guard /hello/guards/auth
  //MIDDLEWARES
  //Atajo para generar un MIDDLEWARE
  // nest g mi users/logger
  //RESOURCES
  //Generar service, controller y module
  //nest g resource payments
}
