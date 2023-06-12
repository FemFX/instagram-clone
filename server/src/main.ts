import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as connectRedis from 'connect-redis';
import * as session from 'express-session';
import Redis from 'ioredis';
import { __prod__ } from './constants';
import { WsAdapter } from '@nestjs/platform-ws';

export const redis = new Redis(process.env.REDIS_URL);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const RedisStore = connectRedis(session);
  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  });
  app.use(
    session({
      name: 'qid',
      secret: process.env.SECRET_SESSION,
      resave: false,
      saveUninitialized: false,
      store: new RedisStore({
        client: redis as any,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true,
        sameSite: 'lax', // csrf
        secure: __prod__, // cookie only works in https
      },
    }),
  );
  app.use(cookieParser());
  app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(process.env.PORT);
}
bootstrap();
