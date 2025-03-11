import { UserModel } from '../user/user.model';
import { TOrder } from './order.interface';
import { OrderModel } from './order.model';

const createOrderInDB = async (payload: TOrder) => {
  const result = await OrderModel.create(payload);
  return result;
};

const findOrdersByCustomer = async (customerId: string) => {
  return await OrderModel.find({ customerId });
};

const updateOrderStatus = async (
  orderId: string,
  status: 'pending' | 'in_progress' | 'delivered',
) => {
  return await OrderModel.findByIdAndUpdate(orderId, { status }, { new: true });
};
const validateCustomerId = async (customerId: string) => {
  const customer = await UserModel.findById(customerId);
  return !!customer;
};

export const orderServices = {
  createOrderInDB,
  findOrdersByCustomer,
  updateOrderStatus,
  validateCustomerId,
};
