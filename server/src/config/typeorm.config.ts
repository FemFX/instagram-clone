import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Room } from 'src/chat/room.entity';
import { Message } from 'src/chat/message.entity';
import { Comment } from 'src/comment/comment.entity';
import { Like } from 'src/like/like.entity';
import { Image } from 'src/post/image.entity';
import { Post } from 'src/post/post.entity';
import { Subscription } from 'src/user/subscription.entity';
import { User } from 'src/user/user.entity';

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'mysql',
  host: 'localhost',
  port: +configService.get<number>('DB_PORT'),
  database: configService.get<string>('DATABASE'),
  username: configService.get<string>('DB_USERNAME'),
  password: configService.get<string>('DB_PASSWORD'),
  synchronize: true,
  autoLoadEntities: true,
  logging: true,
  entities: [User, Subscription, Post, Image, Comment, Like, Room, Message],
});
