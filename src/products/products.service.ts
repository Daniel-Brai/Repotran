import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/order-product.entity';
import { InventoryProduct } from './entities/inventory-product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { PageDto } from '../shared/dtos/page.dto';
import { PageMetaDto } from '../shared/dtos/page-meta.dto';
import { PageOptionsDto } from '../shared/dtos/page-options.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findProducts(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Product> | null> {
    const queryBuilder = this.productRepository.createQueryBuilder('product');
    await queryBuilder
      .orderBy('product.created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ pageOptionsDto, itemCount });
    const products = new PageDto(entities, pageMetaDto);
    if (!products) {
      throw new NotFoundException('No products were found!')
    }
    return products
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await this.productRepository.findOneBy({
      name: name,
    });
    if (!product) {
      throw new NotFoundException(
        `The Product with the name: ${name}, does not exist!`,
      );
    }
    return product;
  }

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product_found = await this.productRepository.findOneBy({
      id: id,
    });
    if (!product_found) {
      throw new NotFoundException(`The product does not exist!`);
    }
    const product = await this.productRepository.preload({
      id: id,
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException(`The product with the id ${id} not found!`);
    }
    return this.productRepository.save(product);
  }

  async remove(name: string) {
    const product = await this.findByName(name);
    return await this.productRepository.remove(product);
  }
}
