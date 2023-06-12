import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { verify } from 'jsonwebtoken';
import { sendRefreshToken } from './utils/sendRefreshToken';
import { createAccessToken, createRefreshToken } from './utils/auth';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async refreshToken(token, res) {
    if (!token) {
      throw new UnauthorizedException('UnauthorizedException');
    }
    let payload: any = null;
    try {
      payload = verify(token, process.env.SECRET_REFRESH);
    } catch (err) {
      console.log(err);
      throw new UnauthorizedException('UnauthorizedException');
    }
    const user = await this.userRepository.findOne({
      where: { id: payload.userId },
    });
    if (!user) {
      throw new UnauthorizedException('UnauthorizedException');
    }
    sendRefreshToken(res, createRefreshToken(user));
    const { password: userPassword, ...responseUser } = user;
    return {
      user: responseUser,
      accessToken: createAccessToken(user),
    };
  }
}
