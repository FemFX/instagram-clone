import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
      serveRoot: '/uploads',
    }),
  ],
  providers: [MediaService],
  exports: [MediaService],
})
export class MediaModule {}
