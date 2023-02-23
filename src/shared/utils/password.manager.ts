import { genSalt, hash, compare } from 'bcrypt';
import { config } from '../../config/config.default'

export class PasswordManager {
    async encrypt(password: string): Promise<string> {
        const salt = await genSalt(config.TOKENS.salt_rounds)
        return await hash(password, salt);
    }

    async validatePassword(password: string, hash_password: string): Promise<boolean> {
        return await compare(password, hash_password);
    }
}