import express from 'express';
import { userController } from './user.controller';
import validator from '../../middlewares/validator';
import { userValidationSchema } from './user.validation';
import { loginUserSchema } from '../auth/auth.validation';
import { authController } from '../auth/auth.controller';
// import auth from '../../middlewares/auth';
// import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/register',
  validator(userValidationSchema),
  userController.createUser,
);
router.get(
  '/user',
  userController.getAllUsers,
);
router.post('/login', validator(loginUserSchema), authController.loginUser);
export const UserRoutes = router;
