import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class BaseUserEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'string', nullable: false })
  public first_name: string;

  @Column({ type: 'string', nullable: false })
  public last_name: string;

  @Column({ type: 'string', nullable: true })
  public full_name: string;

  @Column({ type: 'string', nullable: false, unique: true })
  public email: string;

  @Column({ type: 'string', nullable: false })
  @Exclude()
  public password: string;

  @Column({ type: 'string', nullable: false })
  public phone_number: string;

  @CreateDateColumn()
  @Exclude()
  public created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  public updated_at: Date;

  @BeforeInsert()
  Insert() {
    if (this.full_name === null || this.full_name === undefined) {
      this.full_name =
        this.first_name.charAt(0).toUpperCase() +
        ' ' +
        this.last_name.charAt(0).toUpperCase();
    }
  }
}
