import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();

export interface DATABASE_PROPS {
  readonly name?: string;
  readonly host?: string;
  readonly url?: string;
  readonly port?: number;
  readonly username?: string;
  readonly password?: string;
  readonly sync?: boolean;
}

export interface TOKEN_PROPS {
  readonly hash_salt: number;
  readonly jwt_secret_key: string;
  readonly generic_secret_key: string;
}

export interface IConfig {
  DATABASE: DATABASE_PROPS;
  TOKENS: TOKEN_PROPS;
}

export const config: IConfig = {
  DATABASE: {
    name: configService.get<string>('DATABASE_NAME'),
    host: configService.get<string>('DATABASE_HOST'),
    url: configService.get<string>('DATABASE_URL'),
    port: configService.get<number>('DATABASE_PORT'),
    username: configService.get<string>('DATABASE_USERNAME'),
    password: configService.get<string>('DATABASE_PASSWORD'),
    sync: true,
  },
  TOKENS: {
    hash_salt: configService.get<number>('HASH_SALT'),
    jwt_secret_key: configService.get<string>('JWT_SECRET_KEY'),
    generic_secret_key: configService.get<string>('GENERIC_SECRET_KEY'),
  },
};
