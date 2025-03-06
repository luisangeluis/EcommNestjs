import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('/tasks')
export class TasksController {
  //CTOR Opcion 1
  //   tasksService: TasksService;

  //   constructor(tasksService: TasksService) {
  //     this.tasksService = tasksService;
  //   }

  //CTOR Opcion 2
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() query: any) {
    console.log(query);

    return this.tasksService.getTasks();
  }

  @Get('/:id')
  getTask(@Param('id') id: number) {
    console.log({ id });

    return this.tasksService.getTask(id);
  }

  @Post()
  PostTask(@Body() task: any) {
    return this.tasksService.createTask(task);
  }

  @Put()
  updateTask() {
    return this.tasksService.updateTask();
  }

  @Patch()
  updatingTaskStatus() {
    return this.tasksService.updateTaskStatus();
  }

  @Delete()
  deleteTask() {
    return this.tasksService.deleteTask();
  }
}
