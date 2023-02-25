import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Manager } from './entities/manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Manager])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
