import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Posts } from './entities/post.entity';
import { CreatePostDto } from './dto';
import { IPostRecords } from './interfaces/postsByUser.interface';

@Injectable()
export class PostsRepository {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
  ) {}

  async getPostById(id: number): Promise<Posts> {
    return this.postRepository.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
  }

  async getPostByTitle(title: string): Promise<Posts> {
    return this.postRepository.findOne({
      where: {
        title,
        isDeleted: false,
      },
    });
  }

  async savePost(dto: CreatePostDto, user: number): Promise<Posts> {
    const post = new Posts();

    Object.assign(post, {
      title: dto.title,
      description: dto.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      author: user,
    });

    return this.postRepository.save(post);
  }

  async findPostsByUser(
    userId: number,
    skip: number,
    limit: number,
  ): Promise<IPostRecords> {
    const where = {
      author: {
        id: userId,
      },
      isDeleted: false,
    };
    const count = await this.postRepository.count({ where });
    const posts = await this.postRepository.find({
      where,
      skip,
      take: limit,
    });

    return {
      totalRecords: count,
      posts,
    };
  }

  async findPost(postId: number): Promise<Posts> {
    return this.postRepository.findOne({
      select: {
        id: true,
        title: true,
        description: true,
        comments: true,
      },
      relations: ['author', 'comments'],
      where: {
        id: postId,
        isDeleted: false,
      },
      order: {
        comments: {
          updatedAt: 'DESC',
        },
      },
    });
  }
}
