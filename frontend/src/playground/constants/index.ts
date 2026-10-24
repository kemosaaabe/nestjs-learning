import type { ResourceTab, TaskStatus } from '../types/index.js';

export const resourceTabs: ResourceTab[] = ['tasks', 'users', 'notifications'];

export const statusLabels: Record<TaskStatus, string> = {
  todo: 'To do',
  in_progress: 'In progress',
  done: 'Done',
};

export const apiPrefix = '/api';
