import { z } from 'zod';

export const createTaskSchema = z.strictObject({
  title: z.string().trim().min(1),
  description: z.string().trim(),
  userId: z.number().nullish(),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
