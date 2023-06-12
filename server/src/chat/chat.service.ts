import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { v4 } from 'uuid';
import { SendMessageDto } from './dto/send-message.dto';
import { Message } from './message.entity';
import { Room } from './room.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Room) private readonly roomRepository: Repository<Room>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async getRooms(userId: number) {
    try {
      
      const rooms = await this.roomRepository.find({
        where: {
          users: {
            id: userId,
          },
        },
        relations: {
          users: true,
        },
      });
      // console.log(rooms[0].users);
      return rooms;
    } catch (err) {
      console.log(err);
      return new BadRequestException('Something went wrong');
    }
  }
  async createChat(userId: number, withUserId: number) {
    try {
      const users = await this.userRepository.find({
        where: [
          {
            id: userId,
          },
          {
            id: withUserId,
          },
        ],
      });
      const room = await this.roomRepository
        .create({
          users,
        })
        .save();
      return room;
    } catch (err) {
      console.log(err);
      return new BadRequestException('Something went wrong');
    }
  }
}

// async createChat(userId: number, withUserId: number) {
//   try {
//     const user = await this.userRepository.findOne({
//       where: { id: userId },
//     });
//     const room = await this.chatRepository
//       .create({
//         user,
//         withUserId,
//         name: v4(),
//       })
//       .save();
//     return room;
//   } catch (err) {
//     console.log(err);
//     return new BadRequestException('Something went wrong');
//   }
// }

// async createMessage(userId: number, data: SendMessageDto) {
//   try {
//     const room = await this.chatRepository.findOne({
//       where: {
//         name: data.room,
//       },
//     });
//     const message = await this.messageRepository
//       .create({ sender: userId, text: data.message, chat: room })
//       .save();
//     return message;
//   } catch (err) {
//     console.log(err);
//     return new BadRequestException('Something went wrong');
//   }
// }
// async join(userId, roomName: string, withUserId: number) {
//   const room = await this.chatRepository.findOne({
//     where: { name: roomName },
//   });
//   if (!room) {
//     return this.createChat(userId, withUserId);
//   }
//   return room;
// }
