import { BaseProductEntity } from './base-product.entity';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import { InStock } from '../enums/in-stock.enum';
import { Product } from './order-product.entity';

@Entity()
export class InventoryProduct extends BaseProductEntity {
  @Column({ type: 'decimal', nullable: false })
  public price: number;

  @Column({ type: 'number', nullable: true })
  public total_quantity: number;

  @Column({ type: 'string', nullable: true })
  public category: string;

  @Column({
    type: 'enum',
    enum: InStock,
    default: InStock.TRUE,
  })
  public is_in_stock: InStock;

  @OneToMany(() => Product, (order_product: Product) => order_product)
  public quantity_ordered: Product[];

  @Column({ type: 'integer', default: 0 })
  public total_quantity_of_products: number;

  @BeforeInsert()
  async Insert() {
      this.quantity_ordered.map((product) => {
          this.total_quantity_of_products += product.amount_ordered
      })
  }
}
