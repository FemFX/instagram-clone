import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostService } from './post.service';
import { UserGuard } from 'src/user/user.guard';
import { AnyFilesInterceptor } from '@nestjs/platform-express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  async getAllPosts(@Req() req) {
    return this.postService.getAllPosts(req);
  }
  @Get(':id')
  async getPostById(@Param('id') id: string) {
    return this.postService.getPostById(+id);
  }
  // @UseGuards(UserGuard)
  // @UseInterceptors(AnyFilesInterceptor())
  // @Post('create')
  // async createPost(
  //   @Req() req,
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  // ) {
  //   return this.postService.createPost(+req.userId, files);
  // }
  @UseGuards(UserGuard)
  @UseInterceptors(AnyFilesInterceptor())
  @Post('create')
  async createPost(
    @Req() req,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    return this.postService.createPost(+req.userId, files);
  }
  @UseGuards(UserGuard)
  @Post('delete/:postId')
  async delete(@Req() req, @Param('postId') postId: string) {
    return this.postService.deletePost(+req.userId, +postId);
  }
  @Get('byUser/:userId')
  async getPostsByUser(@Param('userId') userId: string) {
    return this.getPostsByUser(userId);
  }
}
