import { Posts } from '../entities/post.entity';

export interface IPostsByUser {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  list: Posts[];
}

export interface IPostRecords {
  totalRecords: number;
  posts: Posts[];
}
