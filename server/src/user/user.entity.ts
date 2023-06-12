import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subscription } from './subscription.entity';
import { Post } from 'src/post/post.entity';
import { Comment } from 'src/comment/comment.entity';
import { Like } from 'src/like/like.entity';
import { Room } from 'src/chat/room.entity';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  fullName: string;
  @Column({ unique: true })
  username: string;
  @Column()
  password: string;
  @Column({
    unique: true,
  })
  email: string;
  @Column({
    nullable: true,
  })
  description: string;
  @Column({
    nullable: true,
  })
  avatarPath: string;
  @Column({
    default: false,
  })
  isActivated: boolean;
  @Column()
  activationLink: string;
  @CreateDateColumn()
  createdAt: string;
  @UpdateDateColumn()
  updatedAt: string;

  @OneToMany(() => Subscription, (sub) => sub.fromUser)
  subscriptions: Subscription[];

  @OneToMany(() => Subscription, (sub) => sub.toChannel)
  subscribers: Subscription[];

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
  @ManyToMany(() => Room, (room) => room.users)
  @JoinTable()
  rooms: Room[];
}
