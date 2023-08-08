import { Controller, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@modules/auth/auth.guard';

import { CommentsService } from './comments.service';

@Controller('comments')
@UseGuards(AuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}
}
