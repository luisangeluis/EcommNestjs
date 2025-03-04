import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
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
  getAllTasks() {
    return this.tasksService.getTasks();
  }

  @Post()
  PostTask() {
    return this.tasksService.createTask();
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
