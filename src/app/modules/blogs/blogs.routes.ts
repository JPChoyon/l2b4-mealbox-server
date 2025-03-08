import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { blogsController } from './blogs.controller';
import validator from '../../middlewares/validator';
import { blogPostUpdateValidationSchema } from './blogs.validation';
const router = express.Router();

router.post('/', auth(USER_ROLE.user), blogsController.createBlogs);
router.get('/', blogsController.findAllBlogs);
router.delete('/:id', auth(USER_ROLE.user), blogsController.deleteBlogs);
router.patch('/:id', auth(USER_ROLE.user),validator(blogPostUpdateValidationSchema), blogsController.updateBlogs);

export const BlogsRoutes = router;
