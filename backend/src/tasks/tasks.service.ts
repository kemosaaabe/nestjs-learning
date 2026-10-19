import { Injectable } from '@nestjs/common';
import type {
  CreateTaskDto,
  UpdateTaskDto,
  Task,
} from './interfaces/tasks.interface.js';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private taskNextId = 1;

  getTasks() {
    return this.tasks;
  }

  getTask(taskId: number) {
    const task = this.tasks.find(({ id }) => id === taskId);

    return task || null;
  }

  createTask(task: CreateTaskDto) {
    const newTaskId = this.taskNextId++;

    const newTask: Task = {
      id: newTaskId,
      status: 'todo',
      ...task,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  updateTask(taskId: number, task: UpdateTaskDto) {
    const selectedTask = this.tasks.find(({ id }) => id === taskId);

    if (!selectedTask) {
      return null;
    }

    const updatedTask = { ...selectedTask, ...task, id: taskId };

    this.tasks = this.tasks.map((task) => {
      if (task.id === taskId) {
        return updatedTask;
      }

      return task;
    });

    return updatedTask;
  }

  deleteTask(taskId: number) {
    this.tasks = this.tasks.filter(({ id }) => id !== taskId);
  }

  getUserTasks(userId: number) {
    return this.tasks.filter((task) => task.userId === userId);
  }
}
