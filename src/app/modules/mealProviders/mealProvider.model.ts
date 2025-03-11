import mongoose, { Schema } from "mongoose";
import { TMealProvider } from "./mealProvider.interface";

const MealProviderSchema: Schema = new Schema({
  cuisineSpecialties: { type: [String], required: true },
  availableMeals: { type: [String], required: true },
  pricing: { type: Number, required: true },
  experience: { type: Number, required: true },
  customerReviews: { type: [String] },
});

export const MealProvider = mongoose.model<TMealProvider>(
  'MealProvider',
  MealProviderSchema,
);
