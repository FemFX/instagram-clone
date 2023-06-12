import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ILike, Like, Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { BadRequestException } from '@nestjs/common/exceptions';
import { compare, genSalt, hash } from 'bcryptjs';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { sendRefreshToken } from 'src/utils/sendRefreshToken';
import { createAccessToken, createRefreshToken } from 'src/utils/auth';
import { COOKIE_NAME } from 'src/constants';
import { v4 } from 'uuid';
import { sendMail } from '../utils/sendMail';
import { Subscription } from './subscription.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { MediaService } from 'src/media/media.service';
import { redis } from 'src/main';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly mediaService: MediaService,
  ) {}
  async getUsers() {
    const users = await this.userRepository.find({
      relations: {
        posts: {
          images: true,
          comments: true,
          likes: true,
        },
        subscribers: true,
        subscriptions: true,
        likes: true,
      },
    });
    // console.log(users);

    return users;
  }
  async me(userId: number) {
    // console.log(await redis.get('userId'));

    return this.userRepository.findOne({
      where: { id: userId },
      relations: {
        posts: {
          images: true,
          comments: true,
          likes: true,
        },
        subscribers: {
          fromUser: true,
        },
        subscriptions: {
          toChannel: true,
        },
        likes: true,
      },
    });
  }
  async getUser(id: string) {
    try {
      const isUserExists = await this.userRepository.findOne({
        where: { id: +id },
        relations: {
          posts: {
            images: true,
          },
          subscriptions: {
            toChannel: true,
            fromUser: true,
          },
          subscribers: { toChannel: true, fromUser: true },
        },
      });
      if (!isUserExists) {
        return new BadRequestException('User not found');
      }
      const { password, ...user } = isUserExists;
      return user;
    } catch (err) {
      console.log(err);
      return new BadRequestException('Something went wrong');
    }
  }
  async getUserByUsername(username: string) {
    try {
      const isUserExists = await this.userRepository.findOne({
        where: { username },
        relations: {
          posts: {
            images: true,
            likes: true,
          },
          subscriptions: {
            toChannel: true,
            fromUser: true,
          },
          subscribers: { toChannel: true, fromUser: true },
        },
      });
      if (!isUserExists) {
        return new BadRequestException('User not found');
      }
      const { password, ...user } = isUserExists;
      return user;
    } catch (err) {
      console.log(err);
      return new BadRequestException('Something went wrong');
    }
  }

  async subscribe(id: number, channelId: number) {
    const data = {
      toChannel: { id: channelId },
      fromUser: { id },
    };
    const isSubscribed = await this.subscriptionRepository.findOneBy(data);
    if (!isSubscribed) {
      const newSubscription = await this.subscriptionRepository.create(data);
      await this.subscriptionRepository.save(newSubscription);
      return true;
    }
    await this.subscriptionRepository.delete(data);
    return false;
  }
  async register({ email, fullName, password, username }: RegisterUserDto) {
    try {
      const isUserExists = await this.userRepository.findOneBy({ email });
      if (isUserExists) {
        return new BadRequestException('User already exists');
      }
      const salt = await genSalt(10);
      const hashedPass = await hash(password, salt);
      const activationLink = v4();
      const newUser = await this.userRepository
        .create({
          username,
          email,
          fullName,
          password: hashedPass,
          activationLink,
        })
        .save();
      const { password: userPassword, ...user } = newUser;
      // await sendMail(
      //   user.email,
      //   'activate an account',
      //   `<a href="http://localhost:4000/user/activate/${user.activationLink}">activate an account</a>`,
      // );
      return user;
    } catch (err) {
      console.log(err);
      return new BadRequestException('Something went wrong');
    }
  }

  async login({ usernameOrEmail, password }: LoginUserDto, req, res: Response) {
    try {
      const user = await this.userRepository.findOneBy(
        usernameOrEmail.includes('@')
          ? {
              email: usernameOrEmail,
            }
          : { username: usernameOrEmail },
      );
      if (!user) {
        return new BadRequestException(`User doesn't exist`);
      }

      const isPassEquals = await compare(password, user.password);
      if (!isPassEquals) {
        return new BadRequestException(`Invalid password`);
      }

      req.userId = user.id;

      await sendRefreshToken(res, createRefreshToken(user));
      const { password: userPassword, ...responseUser } = user;
      // await redis.set('userId', user.id);
      return res.json({
        user: responseUser,
        accessToken: createAccessToken(user),
      });
    } catch (err) {
      console.log(err);
      return new BadRequestException('Something went wrong');
    }
  }
  async logout(res) {
    try {
      res.clearCookie(COOKIE_NAME);
      return res.json(true);
    } catch (err) {
      console.log(err);
      return new BadRequestException('Something went wrong');
    }
  }
  async activate(activationLink: string, res: Response) {
    try {
      const user = await this.userRepository.findOneBy({ activationLink });
      user.isActivated = true;
      await this.userRepository.save(user);
      return res.redirect(process.env.CORS_ORIGIN);
    } catch (err) {
      console.log(err);
      return new BadRequestException('Something went wrong');
    }
  }
  async update(
    id: number,
    { username, fullName, description }: UpdateUserDto,
    mediaFile?: Express.Multer.File,
  ) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (username) {
        user.username = username;
      }
      if (fullName) {
        user.fullName = fullName;
      }
      if (description) {
        user.description = description;
      }
      if (mediaFile) {
        const { url } = await this.mediaService.saveMedia(mediaFile, 'avatar');
        user.avatarPath = url;
      }
      await this.userRepository.save(user);
      const { password, ...responseUser } = user;
      return responseUser;
    } catch (err) {
      console.log(err);
      return new BadRequestException('Something went wrong');
    }
  }
  async search(searchTerm: string) {
    try {
      const users = await this.userRepository.find({
        where: {
          username: ILike(`%${searchTerm}%`),
        },
      });
      return users;
    } catch (err) {
      console.log(err);
      return new BadRequestException('Something went wrong');
    }
  }
  async recommendations(userId: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: {
          subscriptions: true,
        },
      });
      return user;
    } catch (err) {
      console.log(err);
      return new BadRequestException('Something went wrong');
    }
  }
}
