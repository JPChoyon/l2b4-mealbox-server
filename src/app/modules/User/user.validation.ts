import { z } from 'zod';

export const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: 'Name is required' })
      .max(20, { message: 'Name cannot be more than 20 characters' }),
    email: z
      .string()
      .email({ message: 'Please provide a valid email address' })
      .min(1, { message: 'Email is required' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .min(1, { message: 'Password is required' }),
    role: z.enum(['admin', 'user']).default('user'),
    isBlocked: z.boolean().default(false),
  }),
});