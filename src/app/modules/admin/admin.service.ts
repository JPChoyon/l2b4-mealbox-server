/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BlogsModel } from '../blogs/blogs.model';
import { UserModel } from '../User/user.model';

const blockUserInDB = async (userId: string, adminId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  user.isBlocked = true;
  await user.save();
  return user;
};
// Delete Blog Service
const deleteBlogInDB = async (blogId: string, adminId: string) => {
  const blog = await BlogsModel.findById(blogId);
  if (!blog) {
    throw new Error('Blog not found');
  }
  await blog.deleteOne();
  return blog;
};

export const adminServices = {
  blockUserInDB,
  deleteBlogInDB,
};
