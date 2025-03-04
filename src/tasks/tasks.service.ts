import { Injectable } from '@nestjs/common';

export interface Task {
  title: string;
  description: string;
}

@Injectable()
export class TasksService {
  getTasks(): Task[] {
    return [{ title: 'first task', description: 'first task' }];
  }

  createTask() {
    return 20;
  }

  updateTask() {
    return [1, 2, 3];
  }

  deleteTask() {
    return ['getting', 'all', 'the', 'tasks'];
  }

  updateTaskStatus() {
    return 'updating task status';
  }
}
