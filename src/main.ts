import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DatabaseService } from './database/database.service'
import { join } from 'path'
import * as compression from 'compression';
import helmet from 'helmet';
import * as passport from 'passport';

const logger: Logger = new Logger();
const database: DatabaseService = new DatabaseService();
const PORT: string | number = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setViewEngine('ejs');
  app.useStaticAssets(join(__dirname, '../client/assets'));
  app.setBaseViewsDir(join(__dirname, '../client/views'));
  app.use(helmet());
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
