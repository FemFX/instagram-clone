import { Controller, Post, Req, Body } from '@nestjs/common';
import { CommentService } from './comment.service';
import { UseGuards } from '@nestjs/common/decorators';
import { UserGuard } from 'src/user/user.guard';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @UseGuards(UserGuard)
  @Post('create')
  async createComment(@Req() req, @Body() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(req.userId, createCommentDto);
  }
}
