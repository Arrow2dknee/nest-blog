import { Controller, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@modules/auth/auth.guard';
import { PostsService } from './posts.service';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
}
