import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import { cwd } from 'process';
import { join } from 'path';
import { DataSource } from 'typeorm';
import { createClient } from 'redis';
import * as createRedisStore from 'connect-redis';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as passport from 'passport';
import * as session from 'express-session';

const logger: Logger = new Logger();
const PORT: string | number = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configService = app.get(ConfigService);

  const RedisStore = createRedisStore(session);
  const redisHost: string = configService.get<string>('LOCAL_REDIS_HOST');
  const redisPort: number = +configService.get<number>('LOCAL_REDIS_PORT');
  const redisClient = createClient({
    host: redisHost,
    port: redisPort,
  });

  redisClient.on('error', (e) => {
    logger.error(`[Redis]: Redis connection failed: ${e.msg}...`);
  });
  redisClient.on('connect', () => {
    logger.log('[Redis]: Redis connection successful...');
  });

  const ConnectionSource = new DataSource({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: +configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USERNAME'),
    password: configService.get('DATABASE_PASSWORD'),
    database: configService.get('DATABASE_NAME'),
    entities: [cwd() + '/apps/server/src/**/*.entity.js'],
    synchronize: true,
  });

  ConnectionSource.initialize()
    .then(() => logger.log('[Database]: DataSource connection successful...'))
    .catch((e) =>
      logger.error(`[Database]: DataSource connection failed: ${e.msg}`),
    );

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(compression());
  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      secret: configService.get('SESSION_SECRET') || 'Magdaia',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000, httpOnly: true, sameSite: 'strict' },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());
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
  app.useStaticAssets(join(__dirname, '../client/assets'));
  app.setBaseViewsDir(join(__dirname, '../client/views'));
  app.setViewEngine('ejs');
  await app.listen(PORT);
}
bootstrap()
  .then(() => logger.log(`[Server]: Server is listening on port ${PORT}...`))
  .catch((e) => {
    logger.error(`[Server]: Server initialization failed: ${e.msg}...`);
  });
