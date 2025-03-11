import { userServices } from './user.service';
import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;
  const result = await userServices.createUserInDB(userData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data:result
  });
});
const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.findAllUserInDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});
export const userController = {
  createUser,
  getAllUsers,
};
