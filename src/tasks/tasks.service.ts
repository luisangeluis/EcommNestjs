import { Injectable } from '@nestjs/common';

export interface Task {
  id: number;
  title: string;
  description: string;
}

@Injectable()
export class TasksService {
  private readonly tasks: Task[] = [];

  getTasks() {
    return this.tasks;
  }

  getTask(id: number) {
    const result = this.tasks.find((task) => task.id == id);
    // console.log({ result });

    return result;
  }

  createTask(task: any) {
    const newTask = { ...task, id: this.tasks.length + 1 };
    this.tasks.push(newTask);
    return newTask;
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
