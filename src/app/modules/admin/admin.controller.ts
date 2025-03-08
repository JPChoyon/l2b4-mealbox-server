import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { adminServices } from './admin.service';
import httpStatus from 'http-status-codes';

// Block User Controller
const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const adminId = req?.user?.userId as string;

  // Call the service to block the user
  await adminServices.blockUserInDB(userId, adminId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully',
    data: {},
  });
});

// Delete Blog Controller
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const adminId = req?.user?.userId as string;

  // Call the service to delete the blog
  await adminServices.deleteBlogInDB(id, adminId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: {},
  });
});
export const adminController = {
  blockUser,
  deleteBlog,
};
