import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  Res,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserGuard } from './user.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common/decorators';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('all')
  async getUsers() {
    return this.userService.getUsers();
  }
  @UseGuards(UserGuard)
  @Post()
  me(@Req() req) {
    return this.userService.me(+req.userId);
  }
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Get('/username/:username')
  getUserByUsername(@Req() req: Request, @Param('username') username: string) {
    return this.userService.getUserByUsername(username);
  }
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Req() req, @Res() res) {
    return this.userService.login(loginUserDto, req, res);
  }
  @Post('logout')
  async logout(@Res() res) {
    return this.userService.logout(res);
  }
  @Get('activate/:activationLink')
  async activate(@Param('activationLink') activationLink: string, @Res() res) {
    return this.userService.activate(activationLink, res);
  }
  @UseGuards(UserGuard)
  @Post('subscribe/:channelId')
  async subscribe(@Param('channelId') channelId: string, @Req() req) {
    return this.userService.subscribe(+req.userId, +channelId);
  }
  @UseGuards(UserGuard)
  @UseInterceptors(FileInterceptor('media'))
  @Post('edit')
  async update(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() mediaFile?: Express.Multer.File,
  ) {
    return this.userService.update(+req.userId, updateUserDto, mediaFile);
  }
  @UseGuards(UserGuard)
  @Post('search')
  async search(@Body('searchTerm') searchTerm: string) {
    return this.userService.search(searchTerm);
  }
  @UseGuards(UserGuard)
  @Post('recommendations')
  async recommendations(@Req() req) {
    return this.userService.recommendations(+req.userId);
  }
}
