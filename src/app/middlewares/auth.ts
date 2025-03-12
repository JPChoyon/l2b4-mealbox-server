import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import AppError from '../error/AppError';
import httpStatus from 'http-status-codes';
import { userServices } from '../modules/user/user.service';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Token is missing!');
    }

    let decoded: JwtPayload;
    try {
      decoded = jwt.verify(token, config.secret as string) as JwtPayload;
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid or expired token!');
    }
    const { role, userId } = decoded;
    const user = await userServices.findAUserInDB(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
    }

    if (user.isBlocked) {
      throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!');
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Access denied!');
    }

    req.user = decoded;

    next();
  });
};

export default auth;
