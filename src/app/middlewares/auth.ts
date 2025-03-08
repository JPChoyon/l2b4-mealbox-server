import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import catchAsync from '../utils/catchAsync';
import AppError from '../error/AppError';
import { userServices } from '../modules/User/user.service';
import { TUserRole } from '../modules/User/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    // Checking if the Authorization header is missing
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // Extracting the token from the Authorization header
    const token = authHeader.split(' ')[1];

    // checking if the given token is valid
    const decoded = jwt.verify(token, config.secret as string) as JwtPayload;
    const { role, userId } = decoded;

    // checking if the user is exist
    const user = await userServices.findAUserInDB(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    // checking if the user is blocked
    const isBlocked = user?.isBlocked;

    if (isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You cannot access this');
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
