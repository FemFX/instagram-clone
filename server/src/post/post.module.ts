import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MediaModule } from 'src/media/media.module';
import { User } from 'src/user/user.entity';
import { Image } from './image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Image]), MediaModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
