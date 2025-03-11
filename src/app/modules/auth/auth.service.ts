import config from '../../config';
import { TUser } from '../user/user.interface';
import { UserModel } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};
const loginUser = async (payload: TLoginUser) => {
  const result = await UserModel.findOne({ email: payload.email });
  if (!result) {
    throw new Error('User not found');
  }

  // Check for password and compare
  if (!payload.password || !result.password) {
    throw new Error('Password is incorrect or missing');
  }

  const isPasswordMatch = await bcrypt.compare(
    payload.password,
    result.password,
  );

  if (!isPasswordMatch) {
    throw new Error('Password incorrect');
  }

  const token = jwt.sign(
    {
      email: result.email,
      phone: result.phone,
      name: result.name,
      role: result.role,
    },
    config.secret as string,
    { expiresIn: '2d' },
  );

  return { token, result };
};
const findUserByEmail = async (email: string) => {
  try {
    const user = await UserModel.findOne({ email });
    return user; // Returns the user if found, or null if not
  } catch (err: any) {
    throw new Error('Error checking email in database');
  }
};
export const AuthService = {
  registerUser,
  loginUser,
  findUserByEmail,
};
