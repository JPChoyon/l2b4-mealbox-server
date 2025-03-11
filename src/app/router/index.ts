import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { OrderRoutes } from '../modules/orders/order.routes';
import { MealProviderRoutes } from '../modules/mealProviders/mealProvider.routes';

const router = Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/customers',
    route: OrderRoutes,
  },
  {
    path: '/providers',
    route: MealProviderRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
