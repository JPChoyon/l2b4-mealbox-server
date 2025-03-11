import { z } from 'zod';

export const mealProviderValidationSchema = z.object({
  body: z.object({
    cuisineSpecialties: z.array(z.string()),
    availableMeals: z.array(z.string()),
    pricing: z.number().positive(),
    experience: z.number().min(0),
    customerReviews: z.array(z.string()).optional(),
  }),
});
