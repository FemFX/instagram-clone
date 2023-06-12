import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { Server } from 'socket.io';
import { Logger, Req, UseGuards } from '@nestjs/common';
import { ChatGuard } from './chat.guard';
import { Socket } from 'socket.io';
import { CreateChatDto } from './dto/create-chat.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { SendMessageDto } from './dto/send-message.dto';

@WebSocketGateway({
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService) {}
  private readonly logger = new Logger();
  @WebSocketServer()
  server: Server;
  afterInit(server: any) {
    this.logger.log('hello');
  }
  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log('connect', client);
  }
  handleDisconnect(client: Socket) {
    this.logger.log('disconnect', client);
  }
  @UseGuards(ChatGuard)
  @SubscribeMessage('getRooms')
  async getRooms(@ConnectedSocket() socket: Socket, @Req() req) {
    console.log(socket.handshake);

    return this.chatService.getRooms(+req.userId);
  }
  @UseGuards(ChatGuard)
  @SubscribeMessage('createRoom')
  async createRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data,
    @Req() req,
  ) {
    // console.log(data.room);
    return this.chatService.createChat(+req.userId, +data.withUserId);
  }
}

// @UseGuards(ChatGuard)
//   @SubscribeMessage('create_chat')
//   async createChat(
//     @Req() req,
//     @ConnectedSocket() client: Socket,
//     @MessageBody() data: CreateChatDto,
//   ) {
//     return this.chatService.createChat(req.userId, data.withUserId);
//   }
//   @UseGuards(ChatGuard)
//   @SubscribeMessage('join_chat')
//   async joinChat(
//     @Req() req,
//     @ConnectedSocket() client: Socket,
//     @MessageBody() body: JoinRoomDto,
//   ) {
//     const room = await this.chatService.join(
//       req.userId,
//       body.room,
//       body.withUserId,
//     );
//     client.join(room.name);
//   }
//   @SubscribeMessage('msg_server')
//   async sendMessage(
//     @Req() req,
//     @ConnectedSocket() client: Socket,
//     @MessageBody() data: SendMessageDto,
//   ) {
//     // this.server.emit('msg_client', message, client.id);
//     // client.broadcast.emit("msg_client", message)
//     const message = await this.chatService.createMessage(req.userId, data);
//     client.to(data.room).emit('msg_client', message, client.id);
//   }
