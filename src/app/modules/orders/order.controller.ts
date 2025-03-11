import { orderServices } from './order.service';
import httpStatus from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createOrder = catchAsync(async (req, res) => {
  const orderData = req.body;
  const customerId = orderData.customerId;
  const isCustomerValid = await orderServices.validateCustomerId(customerId);
  if (!isCustomerValid) {
    sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Customer not found',
      data: null,
    });
  }
  // Place the order
  const result = await orderServices.createOrderInDB(orderData);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Order placed successfully',
    data: result,
  });
});

const getCustomerOrders = catchAsync(async (req, res) => {
  const { customerId } = req.params;
  const result = await orderServices.findOrdersByCustomer(customerId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const result = await orderServices.updateOrderStatus(orderId, status);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order status updated successfully',
    data: result,
  });
});

export const orderController = {
  createOrder,
  getCustomerOrders,
  updateOrderStatus,
};
