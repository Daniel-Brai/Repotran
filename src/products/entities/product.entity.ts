import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InStock } from '../enums/in-stock.enum';
import { Exclude } from 'class-transformer';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'string', nullable: false, unique: true })
  public name: string;

  @Column({ type: 'string', nullable: true })
  public description: string;

  @Column({ type: 'decimal', nullable: false })
  public price: number;

  @Column({
    type: 'enum',
    enum: InStock,
    default: InStock.TRUE,
  })
  public is_in_stock: InStock;

  @CreateDateColumn({ type: 'timestamptz' })
  @Exclude()
  public created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @Exclude()
  public updated_at: Date;
}
