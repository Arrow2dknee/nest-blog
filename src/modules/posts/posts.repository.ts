import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Posts } from './entities/post.entity';
import { CreatePostDto } from './dto';

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

  async findPostsByUser(userId: number): Promise<Posts[]> {
    return this.postRepository.find({
      where: {
        author: {
          id: userId,
        },
        isDeleted: false,
      },
    });
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
