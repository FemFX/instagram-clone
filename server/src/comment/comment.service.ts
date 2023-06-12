import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from 'src/user/user.entity';
import { Post } from 'src/post/post.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createComment(userId, { postId, text }: CreateCommentDto) {
    try {
      const user = await this.userRepository.findOneBy({ id: userId });
      const post = await this.postRepository.findOneBy({ id: postId });
      const comment = await this.commentRepository
        .create({
          text,
          user,
          post,
          authorId: user.id,
        })
        .save();
      return comment;
    } catch (err) {
      console.log(err);

      return new BadRequestException('Something went wrong');
    }
  }
}
