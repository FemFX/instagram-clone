import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Image } from './image.entity';
import { Comment } from 'src/comment/comment.entity';
import { Like } from 'src/like/like.entity';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn()
  user: User;
  @OneToMany(() => Image, (image) => image.post)
  images: Image[];
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: [];
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];
}
