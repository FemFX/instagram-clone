import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class ChatGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client: Socket = context.switchToWs().getClient();

    try {
      const header = client.handshake.headers.authorization;
      const bearer = header.split(' ')[0];
      const token = header.split(' ')[1];
      if (bearer !== 'bearer' || !token) {
        throw new UnauthorizedException({
          message: 'User not authorized',
        });
      }
      const user: any = verify(token, process.env.SECRET_ACCESS);
      client.userId = user.userId;
      return true;
    } catch (err) {
      throw new UnauthorizedException({
        message: 'User not authorized',
      });
    }
  }
}
