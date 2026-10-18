export interface User {
  id: number;
  name: string;
  email: string;
}

export type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  userId: number | null;
}
