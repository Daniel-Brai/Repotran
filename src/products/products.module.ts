import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './products.service';
import { InventoryProduct } from './entities/inventory-product.entity';
import { Product } from './entities/order-product.entity';

@Module({
    imports: [TypeOrmModule.forFeature([InventoryProduct, Product])],
    providers: [ProductService],
    exports: [ProductService],
})
export class ProductsModule {}
