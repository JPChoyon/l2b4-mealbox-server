import express from 'express';
import validator from '../../middlewares/validator';
import { mealProviderValidationSchema } from './mealProvider.validation';
import { mealProviderController } from './mealProvider.controller';

const router = express.Router();

router.post(
  '/menu',
  validator(mealProviderValidationSchema),
  mealProviderController.createMealProvider,
);
router.get('/orders', mealProviderController.getAllMealProviders);
router.put('/:id', mealProviderController.updateMealProvider);
router.put('/response', mealProviderController.respondToOrder);

export const MealProviderRoutes = router;
