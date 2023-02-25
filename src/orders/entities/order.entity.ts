import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { InventoryProduct } from '../../products/entities/inventory-product.entity';
import { User } from '../../users/entities/user.entity';
import { Payment } from '../../products/enums/payment.enum';

@Entity({ orderBy: { created_at: 'DESC' } })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @OneToOne(() => User, { eager: true, onDelete: 'SET NULL' })
  @JoinColumn()
  public customer: User;

  @Column({
    type: 'enum',
    enum: Payment,
    default: Payment.CASH,
  })
  public payment_type: Payment;

  @OneToMany(
    () => InventoryProduct,
    (inventory_product: InventoryProduct) => inventory_product,
  )
  public products_ordered: InventoryProduct[];

  @Column({ type: 'decimal', nullable: false, default: 0.0 })
  public total_price_of_products_ordered: number;

  @CreateDateColumn({ type: 'timestamptz' })
  @Exclude()
  public created_at: Date;

  @BeforeInsert()
  async Insert() {
    this.products_ordered.forEach((product: InventoryProduct) => {
      let sum = 0;
      sum += product.total_quantity_of_products * product.price;
      this.total_price_of_products_ordered = sum;
    });
  }
}
