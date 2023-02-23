import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.usersRepository.findOneBy({
            email: email
        })
        if(!user) {
            throw new NotFoundException(`The user with email: ${email} does not exist!`)
        }
        return user;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = await this.usersRepository.create(createUserDto);
        await this.usersRepository.save(user);
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
        const user_found = await this.usersRepository.findOneBy({
            id: id
        })
        if (!user_found) {
            throw new NotFoundException(`The user does not id`)
        }
        const user = await this.usersRepository.preload({
            id: id,
            ...updateUserDto
        })
        await this.usersRepository.save(user);
    }

    async remove(email: string): Promise<void> {
        const user = await this.findByEmail(email)
        await this.usersRepository.remove(user)
    }
}
