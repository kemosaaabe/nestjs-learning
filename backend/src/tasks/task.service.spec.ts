import { vi } from 'vitest';
import { Test } from '@nestjs/testing';
import { TasksService } from './tasks.service.js';
import { LifecycleService } from '../lifecycle/lifecycle.service.js';
import { NotFoundException } from '@nestjs/common';

describe('TasksService', () => {
  let tasksService: TasksService;

  beforeEach(async () => {
    const lifecycleMock = {
      getLifecycleMessage: vi.fn(),
    };

    const moduleRef = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: LifecycleService, useValue: lifecycleMock },
      ],
    }).compile();

    tasksService = moduleRef.get(TasksService);
  });

  describe('createTask', () => {
    it('should create a task', () => {
      const task = tasksService.createTask({
        title: 'Learn NestJS',
        description: 'Practice unit tests',
      });

      expect(task).toEqual({
        id: 1,
        status: 'todo',
        userId: null,
        title: 'Learn NestJS',
        description: 'Practice unit tests',
      });
    });

    it('should create tasks with sequential IDs', () => {
      const firstTask = tasksService.createTask({
        title: 'Learn NestJS',
        description: 'Practice unit tests',
      });

      const secondTask = tasksService.createTask({
        title: 'Learn NestJS',
        description: 'Practice unit tests',
      });

      expect(firstTask.id).toBe(1);
      expect(secondTask.id).toBe(2);

      const tasks = tasksService.getTasks();
      expect(tasks).toEqual([
        {
          id: 1,
          status: 'todo',
          userId: null,
          title: 'Learn NestJS',
          description: 'Practice unit tests',
        },
        {
          id: 2,
          status: 'todo',
          userId: null,
          title: 'Learn NestJS',
          description: 'Practice unit tests',
        },
      ]);
    });
  });

  describe('getTask', () => {
    it('should throw NotFoundException if task does not exist', () => {
      expect.assertions(2);

      try {
        tasksService.getTask(1);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect((error as NotFoundException).message).toBe('Task not found');
      }
    });
  });
});
