import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { BaseConfigModule } from './config/config.module';
import { UsersModule } from './users/users.module';
import { ManagersModule } from './managers/managers.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule,
    BaseConfigModule,
    DatabaseModule,
    ManagersModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
