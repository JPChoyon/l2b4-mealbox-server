import express from 'express';
import { orderController } from './order.controller';
import validator from '../../middlewares/validator';
import { orderValidationSchema } from './order.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/order',
  validator(orderValidationSchema),auth(USER_ROLE.customer),
  orderController.createOrder,
);
router.get('/orders/:customerId',auth(USER_ROLE.customer), orderController.getCustomerOrders);
router.put('/profile', (req, res) => {
  res.json({ message: 'Profile updated successfully (dummy implementation)' });
});

export const OrderRoutes = router;
