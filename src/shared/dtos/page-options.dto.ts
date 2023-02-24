import {
  IsEnum,
  IsInt,
  IsOptional,
  IsPositive,
  Min,
  Max,
} from 'class-validator';
import { Order } from '../enums/order.enum';

export class PageOptionsDto {
  @IsEnum({ Order })
  @IsOptional()
  readonly order?: Order = Order.DESC;

  @Min(1)
  @IsInt()
  @IsPositive()
  @IsOptional()
  readonly page?: number = 1;

  @Max(50)
  @Min(1)
  @IsInt()
  @IsPositive()
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
