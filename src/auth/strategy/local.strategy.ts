import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import IRequestUser from "../../shared/interfaces/request-user.interface";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({ usernameField: 'email' });
    }
    async validate(email: string, password: string): Promise<IRequestUser> {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            throw new UnauthorizedException('You are not authorized!');
        }
        return user;
    }
}
