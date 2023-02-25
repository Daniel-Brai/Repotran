import { Injectable, Logger } from '@nestjs/common';
import { cwd } from 'process';
import { DataSource } from 'typeorm';
import config from '../shared/config/config.default'

const logger: Logger = new Logger();
const ConnectionSource = new DataSource({
  type: 'postgres',
  host: config.DATABASE.host,
  port: config.DATABASE.port,
  username: config.DATABASE.username,
  password: config.DATABASE.password,
  database: config.DATABASE.name,
  entities: [cwd() + '/apps/server/src/**/*.entity.js'],
  synchronize: config.DATABASE.sync,
});

@Injectable()
export class DatabaseService {

  public async connect(): Promise<void> {
    await ConnectionSource.initialize()
      .then(() => logger.log('[Database]: DataSource connection successful...'))
      .catch((e) =>
        logger.error(`[Database]: DataSource connection failed: ${e.msg}`),
      );
  }
}
