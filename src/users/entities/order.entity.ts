import { Product } from 'src/products/entities/product.entity';
import { Customer } from './customer.entity';

export class Order {
  date: Date;
  customer: Customer;
  products: Product[];
}
