import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { MediaService } from 'src/media/media.service';
import { User } from 'src/user/user.entity';
import { Image } from './image.entity';
import { v4 } from 'uuid';
import { Request } from 'express';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly mediaService: MediaService,
  ) {}
  async getAllPosts(req: Request) {
    try {
      const { p } = req.query;
      const postsCount = await this.postRepository.count();
      const posts = await this.postRepository.find({
        order: {
          createdAt: 'DESC',
        },
        relations: {
          user: true,
          images: true,
          comments: true,
          likes: true,
        },
        skip: +p * 10 || 0,
        take: 10,
      });

      return {
        posts,
        hasMore: postsCount - ((+p * 10 || 0) + 10) > 0,
      };
    } catch (err) {
      console.log(err);

      return new BadRequestException('Something went wrong');
    }
  }
  async getPostById(id: number) {
    try {
      const post = await this.postRepository.findOne({
        where: { id },
        relations: { user: true, images: true, comments: true },
      });
      return post;
    } catch (err) {
      console.log(err);

      return new BadRequestException('Something went wrong');
    }
  }
  async getPostsByUser(userId: string) {
    try {
      const posts = await this.postRepository.find({
        where: {
          user: {
            id: +userId,
          },
        },
        relations: {
          comments: true,
          user: true,
          likes: true,
          images: true,
        },
      });
      return posts;
    } catch (err) {
      console.log(err);

      return new BadRequestException('Something went wrong');
    }
  }
  async createPost(id: number, files: Array<Express.Multer.File>) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });

      const newPost = await this.postRepository.create({ user, images: [] });
      await this.postRepository.save(newPost);
      const folder = `post/${user.id}/${v4()}`;
      files.forEach(async (file) => {
        const { url } = await this.mediaService.saveMedia(file, folder);
        await this.imageRepository
          .create({
            imagePath: url,
            post: newPost,
          })
          .save();
        // newPost.images.push(image);
      });
      await this.postRepository.save(newPost);
      return true;
    } catch (err) {
      console.log(err);

      return new BadRequestException('Something went wrong');
    }
  }
  async deletePost(userId: number, postId: number) {
    try {
      const post = await this.postRepository.findOne({
        where: { id: postId },
        relations: {
          user: true,
        },
      });
      if (post.user.id !== userId) {
        return new BadRequestException(`You don't have permission`);
      }
      await this.postRepository.delete({ id: postId });
      return true;
    } catch (err) {
      console.log(err);

      return new BadRequestException('Something went wrong');
    }
  }
}
