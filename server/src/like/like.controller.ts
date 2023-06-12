import { Controller, Post, Body } from '@nestjs/common';
import { LikeService } from './like.service';
import { Req, UseGuards } from '@nestjs/common/decorators';
import { UserGuard } from 'src/user/user.guard';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}
  @UseGuards(UserGuard)
  @Post()
  async like(@Req() req, @Body('postId') postId: number) {
    return this.likeService.like(+req.userId, postId);
  }
}
