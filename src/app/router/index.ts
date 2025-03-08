import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.routes';
import { BlogsRoutes } from '../modules/blogs/blogs.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';

const router = Router();
const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/blogs',
    route: BlogsRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
