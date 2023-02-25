import {
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export abstract class BaseProductEntity {
    @PrimaryGeneratedColumn('uuid')
    public id: string;

    @CreateDateColumn({ type: 'timestamptz' })
    @Exclude()
    public created_at: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    @Exclude()
    public updated_at: Date;
}
