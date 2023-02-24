import { BaseEntity } from './base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import Role from '../roles/role.enum';
import { User } from './user.entity';

@Entity({ orderBy: { created_at: 'DESC' } })
export class Manager extends BaseEntity {
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.MANAGER,
  })
  public role: Role;

  @OneToMany(() => User, (user: User) => user)
  public subordinates: User[];
}
