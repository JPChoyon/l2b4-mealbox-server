import { z } from 'zod';

export const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name is required',
      })
      .max(20, { message: 'Name cannot be more than 20 characters' }),
    email: z
      .string({ required_error: 'Email is required' })
      .email({ message: 'Please provide a valid email address' }),
    phone: z
      .string({ required_error: 'Phone number is required' })
      .min(11, { message: 'Phone number must be at least 11 characters long' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long' })
      .min(1, { message: 'Password is required' }),
    role: z.enum(['customer', 'meal_provider']).default('customer'),
    isBlocked: z.boolean().default(false),
  }),
});
