import {
  Controller,
  UseGuards,
  Post,
  Body,
  Request,
  Param,
  UsePipes,
  ValidationPipe,
  Get,
  Query,
} from '@nestjs/common';

import { AuthGuard } from '@modules/auth/auth.guard';
import { CreateCommentDto } from '@modules/comments/dto';
import { Comment } from '@modules/comments/entities/comment.entity';
import { PaginationDto } from '@dto/pagination.dto';

import { PostsService } from './posts.service';
import { CreatePostDto, PostIdDto } from './dto';
import { IPostInfo } from './interfaces/postInfo.interface';
import { Posts } from './entities/post.entity';
import { IPostsByUser } from './interfaces/postsByUser.interface';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async createPost(
    @Body() dto: CreatePostDto,
    @Request() req: any,
  ): Promise<IPostInfo> {
    return this.postsService.newPost(dto, req.user);
  }

  @Post('/:id/comments')
  @UsePipes(new ValidationPipe())
  async commentToPost(
    @Param() { id: postId }: PostIdDto,
    @Body() dto: CreateCommentDto,
    @Request() req: any,
  ): Promise<Comment> {
    return this.postsService.addComment(postId, dto, req.user);
  }

  @Get()
  async getPosts(
    @Query() dto: PaginationDto,
    @Request() req: any,
  ): Promise<IPostsByUser> {
    return this.postsService.getPostsForLoggedInUser(dto, req.user);
  }

  @Get('/:id')
  async getPostDetails(@Param() { id: postId }: PostIdDto): Promise<Posts> {
    return this.postsService.postDetails(postId);
  }
}
