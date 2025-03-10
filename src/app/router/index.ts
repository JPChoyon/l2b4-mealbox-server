import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.routes';


const router = Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
 
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
