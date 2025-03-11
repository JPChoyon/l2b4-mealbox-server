import { z } from 'zod';

export const orderValidationSchema = z.object({
  body: z.object({
    mealSelection: z.string({
      required_error: 'mealSelection is required',
    }),
    dietaryPreferences: z.string({
      required_error: 'dietary Preferences is required',
    }),
    customerId: z.string({ required_error: 'customer Id is required' }),
    status: z.enum(['pending', 'in_progress', 'delivered']).default('pending'),
  }),
});
