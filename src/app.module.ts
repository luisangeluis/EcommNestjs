import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { HelloController } from './hello/hello.controller';

@Module({
  imports: [TasksModule, ProjectsModule, AuthModule, UsersModule],
  controllers: [HelloController],
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
}
