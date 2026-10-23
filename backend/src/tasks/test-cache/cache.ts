import type { Task } from '../interfaces/tasks.interface.js';

export const tasksCache = new Map<number, Task>();
