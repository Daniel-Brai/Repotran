import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { PasswordManager } from '../shared/utils/password.manager';
import IRequestUser from "../shared/interfaces/request-user.interface";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordManager: PasswordManager,
  ) {}

  async validateUser(email: string, password: string): Promise<IRequestUser | null> {
    const user: User = await this.usersService.findByEmail(email);
    const valid_password = await this.passwordManager.validatePassword(password, user.password)

    if (user && valid_password) {
      return {
        id: user.id,
        email: user.email,
        role: user.role,
      };
    }
    return null;
  }
}
