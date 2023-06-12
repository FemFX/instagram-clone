import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { User } from 'src/user/user.entity';
import { Post } from 'src/post/post.entity';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private readonly likeRepository: Repository<Like>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}
  async like(userId: number, postId: number) {
    try {
      const post = await this.postRepository.findOne({ where: { id: postId } });
      if (!post) {
        return new BadRequestException('Post not found');
      }
      const user = await this.userRepository.findOne({ where: { id: userId } });

      const isLike = await this.likeRepository.findOne({
        where: {
          user: {
            id: userId,
          },
          post: {
            id: postId,
          },
        },
      });
      if (isLike) {
        await this.likeRepository.remove(isLike);
        return true;
      }
      const like = await this.likeRepository
        .create({
          user,
          post,
        })
        .save();
      return like;
    } catch (err) {
      console.log(err);

      return new BadRequestException('Something went wrong');
    }
  }
}
