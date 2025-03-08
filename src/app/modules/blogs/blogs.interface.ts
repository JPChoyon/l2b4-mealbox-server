import { ObjectId } from 'mongodb';

export type TBlogPost = {
  title: string;
  content: string;
  author: {
    _id: ObjectId;
    name: string;
    email: string;
  };
  isPublished?: boolean;
};
export interface IFindBlogsQueryParams {
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filter?: string;
}
