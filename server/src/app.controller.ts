import { Controller, Get, Inject, CACHE_MANAGER } from '@nestjs/common';
import { AppService } from './app.service';
import { Post, Req, Res } from '@nestjs/common/decorators';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) // @Inject(CACHE_MANAGER) private cacheManager: Cache,
  {}
  // @Get()
  // async getHello() {
  //   await this.cacheManager.set('key', 'value');
  //   const value = await this.cacheManager.get('key');
  //   return this.appService.getHello();
  // }
  @Get('/refresh_token')
  async sendRefreshToken(@Req() req, @Res() res) {
    const token = req.cookies.qid;
    return res.json(await this.appService.refreshToken(token, res));
  }
}
