import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, ' Please enter your name'],
      maxlength: [20, 'Name can not be more than 20 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please enter your email'],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Please enter your phone number'],
    },
    password: {
      type: String,
      required: [true, 'Please enter your password'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
      type: String,
      enum: ['customer', 'meal_provider'],
      default: 'customer',
    },
    isBlocked: {
      type: Boolean,
      default: false,
      
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('save', async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bycript_salt_rounds),
  );
  next();
});

export const UserModel = model<TUser>('User', userSchema);
