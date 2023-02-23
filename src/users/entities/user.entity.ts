import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import Role from "../roles/role.enum";

@Entity({ orderBy: { created_at: 'DESC' } })
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'string', nullable: false })
  public first_name: string;

  @Column({ type: 'string', nullable: false })
  public last_name: string;

  @Column({ type: 'string', nullable: false, unique: true })
  public email: string;

  @Column({ type: 'string', nullable: false, unique: true })
  public phone_number: string;

  @Column({ type: 'string', nullable: false })
  @Exclude()
  public password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  public role: Role;

  @CreateDateColumn({ type: 'timestamptz' })
  public created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  public updated_at: Date;
}
