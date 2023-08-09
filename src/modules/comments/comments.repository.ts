import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsRepository {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async saveComment(
    content: string,
    postId: number,
    userId: number,
  ): Promise<Comment> {
    const comment = new Comment();

    Object.assign(comment, {
      content,
      post: postId,
      commenter: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const newComment = await this.commentRepository.save(comment);

    return newComment;
  }
}
