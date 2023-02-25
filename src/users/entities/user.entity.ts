import {Column, Entity, ManyToOne } from 'typeorm';
import { BaseUserEntity } from './base-user.entity';
import Role from '../roles/role.enum';
import {Manager} from "./manager.entity";

@Entity({ orderBy: { created_at: 'DESC' } })
export class User extends BaseUserEntity {
    @Column({
        type: 'enum',
        enum: Role,
        default:  Role.GENERIC
    })
    public role: Role;

    @Column({ type: 'string', nullable: true })
    public name_of_organization: string;

    @ManyToOne(() => Manager, (manager: Manager) => manager.full_name)
    public overseer: Manager;
}
