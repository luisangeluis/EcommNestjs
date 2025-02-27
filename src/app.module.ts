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
  //Atajo para crear modules
  //nest g mo tasks
  //Atajo para crear controllers
  //nest g co tasks
  //Atajo para crear controllers sin archivo de testing
  //nest g co tasks --no-spec
  //Atajo para generar un servicio
  //nest g s users --no--spec
}
