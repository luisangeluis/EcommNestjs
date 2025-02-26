import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ProjectsModule } from './projects/projects.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

//Atajo para crear modules
//nest g mo users
@Module({
  imports: [TasksModule, ProjectsModule, AuthModule, UsersModule],
})
export class AppModule {}
