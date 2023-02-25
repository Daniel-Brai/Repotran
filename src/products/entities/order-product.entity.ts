import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseProductEntity } from './base-product.entity';
import { InventoryProduct } from './inventory-product.entity';

@Entity()
export class Product extends BaseProductEntity {
  @Column({ type: 'integer', generated: "increment" })
  public order_product_id: number;

  @Column({ type: 'number', nullable: true })
  public amount_ordered: number;

  @ManyToOne(
    () => InventoryProduct,
    (inventory_product: InventoryProduct) => inventory_product,
  )
  public base_product: InventoryProduct;
}
