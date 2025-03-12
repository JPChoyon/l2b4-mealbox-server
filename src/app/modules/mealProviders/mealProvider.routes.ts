import express from 'express';
import validator from '../../middlewares/validator';
import { mealProviderValidationSchema } from './mealProvider.validation';
import { mealProviderController } from './mealProvider.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/menu',
  validator(mealProviderValidationSchema),auth(USER_ROLE.meal_provider),
  mealProviderController.createMealProvider,
);
router.get(
  '/orders',
  auth(USER_ROLE.meal_provider),
  mealProviderController.getAllMealProviders,
);
router.put(
  '/:id',
  auth(USER_ROLE.meal_provider),
  mealProviderController.updateMealProvider,
);
router.put(
  '/response',
  auth(USER_ROLE.meal_provider),
  mealProviderController.respondToOrder,
);

export const MealProviderRoutes = router;
