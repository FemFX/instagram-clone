import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.entity';
import { User } from 'src/user/user.entity';
import { Room } from './room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Message, User])],
  providers: [ChatGateway, ChatService],
})
export class ChatModule {}
