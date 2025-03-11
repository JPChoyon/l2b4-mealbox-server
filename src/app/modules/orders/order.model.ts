import mongoose, { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    mealSelection: {
      type: String,
      required: [true, ' Please enter meal Selection'],
    },
    dietaryPreferences: {
      type: String,
      required: [true, 'Please enter  dietary Preferences'],
      unique: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please enter  dietary Preferences'],
    },
    status: {
      type: String,
      enum: ['pending', 'in_progress', 'delivered'],
      default: 'pending',
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const OrderModel = model<TOrder>('Order', orderSchema);
