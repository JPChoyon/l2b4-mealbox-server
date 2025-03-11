import mongoose from "mongoose";

export type TOrder = {
  mealSelection: string;
  dietaryPreferences?: string;
  customerId: mongoose.Schema.Types.ObjectId;
  status: 'pending' | 'in_progress' | 'delivered';
};