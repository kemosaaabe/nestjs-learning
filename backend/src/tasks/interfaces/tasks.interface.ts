type TaskStatus = 'todo' | 'in_progress' | 'done';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  userId: number | null;
}

export type CreateTaskDto = Omit<Task, 'id' | 'status'>;

export type UpdateTaskDto = Omit<Partial<Task>, 'id'>;
