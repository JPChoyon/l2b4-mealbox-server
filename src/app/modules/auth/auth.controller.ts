
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: {
      token: result,
    },
  });
});
export const authController = {
  loginUser,
};
