import { SortOrder } from 'mongoose';
import { UserModel } from '../User/user.model';
import { BlogsModel } from './blogs.model';
import { IFindBlogsQueryParams } from './blogs.interface';
import AppError from '../../error/AppError';

const createBlogsInDB = async ({
  title,
  content,
  userId,
}: {
  title: string;
  content: string;
  userId: string;
}) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  // Create new blog
  const newBlog = new BlogsModel({
    title,
    content,
    author: userId,
  });
  await newBlog.save();
  await newBlog.populate('author', 'name email');
  return newBlog;
};

const findAllBlogsInDB = async ({
  search,
  sortBy,
  sortOrder,
  filter,
}: IFindBlogsQueryParams) => {
  // search filer are added
  const searchQuery = search
    ? {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { content: { $regex: search, $options: 'i' } },
        ],
      }
    : {};
  // Build the filter query for author
  const filterQuery = filter ? { author: filter } : {};
  const query = {
    ...searchQuery,
    ...filterQuery,
  };
  // sorting option
  const sortOptions: { [key: string]: SortOrder } = {};
  if (sortBy) {
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
  } else {
    sortOptions['createdAt'] = -1;
  }
  // populate and sorting method
  const result = await BlogsModel.find(query)
    .populate('author', 'name email')
    .sort(sortOptions);

  return result;
};
const deleteBlogsInDB = async (blogId: string, userId: string) => {
  // Find the blog by  ID
  const blog = await BlogsModel.findById(blogId);
  if (!blog) {
    throw new Error('Blog not found');
  }
  // Check if the user is the author of the blog
  if (blog.author.toString() !== userId) {
    throw new Error('You are not authorized to delete this blog');
  }
  await blog.deleteOne();
  return true;
};
const updateBlogsInDB = async (
  blogId: string,
  userId: string,
  title: string,
  content: string,
) => {
  // Find the blog
  const blog = await BlogsModel.findById(blogId);

  if (!blog) {
    throw new AppError(404, 'Blog not found');
  }
  // Check  the logged-in user
  if (blog.author.toString() !== userId) {
    throw new AppError(403, 'You are not authorized to update this blog');
  }
  // Update the blog 
  blog.title = title;
  blog.content = content;

  // Save the updated blog to the database
  await blog.save();
  // Populate the author details
  await blog.populate('author', 'name email');
  return blog; 
};

export const blogsServices = {
  createBlogsInDB,
  findAllBlogsInDB,
  deleteBlogsInDB,
  updateBlogsInDB,
};
