import { mealProviderServices } from './mealProvider.service';
import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createMealProvider = catchAsync(async (req, res) => {
  const providerData = req.body;
  const result =
    await mealProviderServices.createMealProviderInDB(providerData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Meal provider registered successfully',
    data: result,
  });
});

const getAllMealProviders = catchAsync(async (req, res) => {
  const result = await mealProviderServices.findAllMealProvidersInDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Meal providers retrieved successfully',
    data: result,
  });
});

const updateMealProvider = catchAsync(async (req, res) => {
  const { id } = req.params;
  const providerData = req.body;
  const result = await mealProviderServices.updateMealProviderInDB(
    id,
    providerData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Meal provider updated successfully',
    data: result,
  });
});
const respondToOrder = catchAsync(async (req, res) => {
  const { orderId } = req.body;
  const { status } = req.body;
  const result = await mealProviderServices.respondToCustomerOrder(
    orderId,
    status,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order status updated successfully',
    data: result,
  });
});
export const mealProviderController = {
  createMealProvider,
  getAllMealProviders,
  updateMealProvider,
  respondToOrder,
};
