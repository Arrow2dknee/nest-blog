import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { isURL } from 'class-validator';

import { ERROR } from '@messages/errorMessages';
import { CreateCommentDto } from '@modules/comments/dto';
import { CommentsService } from '@modules/comments/comments.service';
import { Comment } from '@modules/comments/entities/comment.entity';

import { PostsRepository } from './posts.repository';
import { CreatePostDto } from './dto';
import { IPostInfo } from './interfaces/postInfo.interface';
import { Posts } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly commentService: CommentsService,
  ) {}

  async newPost(dto: CreatePostDto, loggedInUser: string): Promise<IPostInfo> {
    const { title } = dto;

    const post = await this.postsRepository.getPostByTitle(title);
    if (post) {
      throw new BadRequestException(ERROR.POST.TITLE_EXISTS);
    }

    const newPost = await this.postsRepository.savePost(
      dto,
      Number(loggedInUser),
    );

    return {
      id: newPost.id.toString(),
      title: newPost.title,
      description: newPost.description,
    };
  }

  async addComment(
    postId: string,
    dto: CreateCommentDto,
    userId: string,
  ): Promise<Comment> {
    // validate post id
    const post = await this.postsRepository.getPostById(Number(postId));

    if (!post) {
      throw new NotFoundException(ERROR.POST.NOT_FOUND);
    }

    const isUrlString = isURL(dto.content, {
      protocols: ['http', 'https', 'ftp'],
      require_tld: true,
      require_protocol: false,
      require_host: true,
      require_valid_protocol: true,
      allow_underscores: false,
      allow_trailing_dot: false,
      allow_protocol_relative_urls: false,
      disallow_auth: false,
    });

    if (isUrlString) {
      throw new BadRequestException(ERROR.COMMENT.URL_COMMENT);
    }

    return this.commentService.addCommentToPost(
      Number(postId),
      dto,
      Number(userId),
    );
  }

  async getPostsForLoggedInUser(userId: string): Promise<Posts[]> {
    return this.postsRepository.findPostsByUser(Number(userId));
  }

  async postDetails(postId: string): Promise<Posts> {
    return this.postsRepository.findPost(Number(postId));
  }
}
