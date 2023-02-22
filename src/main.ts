import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service'
import { createClient } from 'redis';
import { join } from 'path'
import * as createRedisStore from 'connect-redis';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as passport from 'passport';
// import * as session from 'express-session';

const logger: Logger = new Logger();
const database: DatabaseService = new DatabaseService();
const PORT: string | number = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // const configService = app.get(ConfigService);
  //
  // const RedisStore = createRedisStore(session);
  // const redisHost: string = configService.get<string>('REDIS_HOST');
  // const redisPort: number = +configService.get<number>('REDIS_PORT');
  // const redisClient = createClient({
  //   host: redisHost,
  //   port: redisPort,
  // });
  //
  // redisClient.on('error', (e) => {
  //   logger.error(`[Redis]: Redis connection failed: ${e.msg}...`);
  // });
  // redisClient.on('connect', () => {
  //   logger.log('[Redis]: Redis connection successful...');
  // });
  //

  app.setViewEngine('ejs');
  app.useStaticAssets(join(__dirname, '../client/assets'));
  app.setBaseViewsDir(join(__dirname, '../client/views'));
  app.use(compression());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  await app.listen(PORT);
  await database.connect();
}

bootstrap()
  .then(() => logger.log(`[Server]: Server is listening on port ${PORT}...`))
  .catch((e) => {
    logger.error(`[Server]: Server initialization failed: ${e.msg}...`);
  });
