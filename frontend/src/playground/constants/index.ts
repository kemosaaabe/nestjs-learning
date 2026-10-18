import type { TaskStatus } from '../types/index.js';

export const statusLabels: Record<TaskStatus, string> = {
  todo: 'To do',
  in_progress: 'In progress',
  done: 'Done',
};

export const apiPrefix = '/api';
