import config from '../../config';
import AppError from '../../error/AppError';
import { userServices } from '../User/user.service';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status-codes';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await userServices.findUserByEmail(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // checking the user  blocked or not
  const userStatus = user?.isBlocked;
  if (userStatus === true) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct
  const isMatch = await bcrypt.compare(payload.password, user.password);
  if (!isMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');
  }

  //create token and sent to the  client
  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  const accessToken = createToken(jwtPayload, config.secret as string, '1d');
  return accessToken;
};

export const authServices = {
  loginUser,
};
