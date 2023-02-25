import {Column, Entity, OneToMany } from 'typeorm';
import { BaseUserEntity } from './base-user.entity';
import Role from '../roles/role.enum';
import {User} from "./user.entity";

@Entity({ orderBy: { created_at: 'DESC' } })
export class Manager extends BaseUserEntity {
    @Column({
        type: 'enum',
        enum: Role,
        default:  Role.MANAGER,
    })
    public role: Role;

    @Column({ type: 'string', nullable: false })
    public name_of_organization: string;

    @OneToMany(() => User, (user: User) => user)
    public subordinates: User[];
}
