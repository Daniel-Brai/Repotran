import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';


@Module({
    imports: [ConfigModule],
    providers: [ConfigService],
    exports: [ConfigService],
})
export class BaseConfigModule {}