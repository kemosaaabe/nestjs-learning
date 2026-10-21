import { z } from 'zod';
import { createTaskSchema } from './create-task.schema.js';
import { taskStatuses } from '../interfaces/tasks.interface.js';

export const updateTaskSchema = createTaskSchema.partial().safeExtend({
  status: z.enum(taskStatuses).optional(),
});

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
