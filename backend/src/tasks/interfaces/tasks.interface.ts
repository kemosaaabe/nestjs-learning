export const taskStatuses = ['todo', 'in_progress', 'done'] as const;

export type TaskStatus = (typeof taskStatuses)[number];

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  userId: number | null;
}
