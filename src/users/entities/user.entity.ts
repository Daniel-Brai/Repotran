import {Column, Entity, ManyToOne} from 'typeorm';
import { BaseEntity } from './base.entity';
import Role from '../roles/role.enum';
import {Manager} from "./manager.entity";

@Entity({ orderBy: { created_at: 'DESC' } })
export class User extends BaseEntity {
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.GENERIC,
  })
  public role: Role;

  @ManyToOne(() => Manager, (manager: Manager) => manager.full_name )
  public overseer: Manager
}
