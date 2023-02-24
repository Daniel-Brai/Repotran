import {
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { InStock } from '../enums/in-stock.enum';

export class CreateProductDto {
  @MaxLength(100)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @MaxLength(100)
  @MinLength(2)
  @IsString()
  @IsOptional()
  readonly description: string;

  @IsDecimal()
  @IsNotEmpty()
  readonly price: number;

  @IsEnum({
    InStock,
  })
  @IsOptional()
  readonly is_in_stock: InStock;
}
