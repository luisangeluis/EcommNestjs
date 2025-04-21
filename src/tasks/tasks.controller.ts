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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

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
  PostTask(@Body() task: CreateTaskDto) {
    return this.tasksService.createTask(task);
  }

  @Put()
  updateTask(@Body() task: UpdateTaskDto) {
    return this.tasksService.updateTask(task);
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
