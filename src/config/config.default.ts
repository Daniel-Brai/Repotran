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
  readonly salt_rounds: number;
  readonly jwt_secret_key: string;
  readonly generic_secret_key: string;
}

export interface IConfig {
  DATABASE: DATABASE_PROPS;
  TOKENS: TOKEN_PROPS;
}

export const config: IConfig = {
  DATABASE: {
    name: configService.get<string>('DATABASE_NAME') || process.env.DATABASE_NAME,
    host: configService.get<string>('DATABASE_HOST') || process.env.DATABASE_HOST,
    url: configService.get<string>('DATABASE_URL') || process.env.DATABASE_URL,
    port: +configService.get<number>('DATABASE_PORT') || +process.env.DATABASE_PORT,
    username: configService.get<string>('DATABASE_USERNAME') || process.env.DATABASE_USERNAME,
    password: configService.get<string>('DATABASE_PASSWORD') || process.env.DATABASE_PASSWORD,
    sync: true,
  },
  TOKENS: {
    salt_rounds: +configService.get<number>('SALT_ROUNDS'),
    jwt_secret_key: configService.get<string>('JWT_SECRET_KEY'),
    generic_secret_key: configService.get<string>('GENERIC_SECRET_KEY'),
  },
};
