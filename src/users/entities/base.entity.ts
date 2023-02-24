import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @Column({ type: 'string', nullable: false })
    public first_name: string;

    @Column({ type: 'string', nullable: false })
    public last_name: string;

    @Column({ type: 'string', nullable: false })
    public full_name: string;

    @Column({ type: 'string', nullable: true })
    public name_of_organization: string;

    @Column({ type: 'string', nullable: false, unique: true })
    public email: string;

    @Column({ type: 'string', nullable: false, unique: true })
    public phone_number: string;

    @Column({ type: 'string', nullable: false })
    @Exclude()
    public password: string;

    @CreateDateColumn({ type: 'timestamptz' })
    @Exclude()
    public created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    @Exclude()
    public updated_at: Date;

    @BeforeInsert()
    Insert() {
        this.full_name = this.last_name + " " + this.first_name;
    }
}
