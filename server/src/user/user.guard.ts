import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';

@Injectable()
export class UserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const header = req.headers.authorization;
      const bearer = header.split(' ')[0];
      const token = header.split(' ')[1];

      if (bearer !== 'bearer' || !token) {
        throw new UnauthorizedException({
          message: 'User not authorized',
        });
      }

      const user: any = verify(token, process.env.SECRET_ACCESS);
      req.userId = user.userId;
      return true;
    } catch (e) {
      throw new UnauthorizedException({
        message: 'User not authorized',
      });
    }
  }
}
