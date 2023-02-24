import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { PasswordManager } from '../shared/utils/password.manager';
import { PageOptionsDto } from '../shared/dtos/page-options.dto';
import { PageDto } from '../shared/dtos/page.dto';
import { PageMetaDto } from '../shared/dtos/page-meta.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly passwordManager: PasswordManager,
  ) {}

  async findUsers(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<User> | null> {
    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    await queryBuilder
      .orderBy('product.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    const users = new PageDto(entities, pageMetaDto);
    if (!users) {
      throw new NotFoundException('No users were found!');
    }
    return users;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({
      email: email,
    });
    if (!user) {
      throw new NotFoundException(
        `The user with email: ${email} does not exist!`,
      );
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashed_password = await this.passwordManager.encrypt(
      createUserDto.password,
    );
    const user = await this.usersRepository.create({
      ...createUserDto,
      password: hashed_password,
    });
    await this.usersRepository.save(user);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    const user_found = await this.usersRepository.findOneBy({
      id: id,
    });
    if (!user_found) {
      throw new NotFoundException(`The user does not exist!`);
    }
    const user = await this.usersRepository.preload({
      id: id,
      ...updateUserDto,
    });
    await this.usersRepository.save(user);
  }

  async remove(email: string): Promise<void> {
    const user = await this.findByEmail(email);
    await this.usersRepository.remove(user);
  }
}
