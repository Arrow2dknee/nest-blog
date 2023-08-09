import { Injectable } from '@nestjs/common';

import { CommentsRepository } from './comments.repository';
import { CreateCommentDto } from './dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  async addCommentToPost(
    postId: number,
    dto: CreateCommentDto,
    loggedInUser: number,
  ): Promise<Comment> {
    const { content } = dto;

    return this.commentsRepository.saveComment(content, postId, loggedInUser);
  }
}
