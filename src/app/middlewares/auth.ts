
import config from '../config';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { TUser } from '../modules/User/user.interface';
import { UserModel } from '../modules/User/user.model';
import { TLoginUser } from '../modules/auth/auth.interface';

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
    { email: result.email, role: result.role },
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
