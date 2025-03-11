import express from 'express';
import { orderController } from './order.controller';
import validator from '../../middlewares/validator';
import { orderValidationSchema } from './order.validation';

const router = express.Router();

router.post(
  '/order',
  validator(orderValidationSchema),
  orderController.createOrder,
);
router.get('/orders/:customerId', orderController.getCustomerOrders);
router.put('/profile', (req, res) => {
  res.json({ message: 'Profile updated successfully (dummy implementation)' });
});

export const OrderRoutes = router;
