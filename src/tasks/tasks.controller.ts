import { Controller, Get } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller({})
export class TasksController {
  //CTOR Opcion 1
  //   tasksService: TasksService;

  //   constructor(tasksService: TasksService) {
  //     this.tasksService = tasksService;
  //   }

  //CTOR Opcion 2
  constructor(private tasksService: TasksService) {}

  @Get('/tasks')
  getAllTasks() {
    return this.tasksService.getTasks();
    // return 'getting all tasks';
  }
}
