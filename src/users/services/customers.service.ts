import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customers.dto';
import { Customer } from '../entities/customer.entity';
import { Order } from '../entities/order.entity';
import { ProductsService } from '../../products/services/products.service';

@Injectable()
export class CustomersService {
  constructor(
    private productsService: ProductsService,
    //* Inyectándolo como global
    // @Inject('API_KEY') private apiKey: string,
    //* Obtienendolo del .env
    private configService: ConfigService,
  ) {}

  private counterId = 1;

  private customers: Customer[] = [
    {
      id: 1,
      name: 'Juan Perez',
      email: 'jperez@mail.com',
      address: 'Rivadavia 2200 CABA',
      paymentMethod: 'Debit',
    },
  ];

  findAll() {
    //* Traigo la información del .env
    const apiKey = this.configService.get('API_KEY');
    console.log(apiKey);
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((item) => item.id === id);
    if (!customer) throw new NotFoundException(`Customer id:${id} not found`);
    return customer;
  }

  createCustomer(payload: CreateCustomerDto) {
    this.counterId += 1;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  updateCustomer(id: number, payload: UpdateCustomerDto) {
    const customer = this.findOne(id);
    const index = this.customers.findIndex((item) => item.id === id);
    this.customers[index] = { ...customer, ...payload };
    return this.customers[index];
  }

  deleteCustomer(id: number) {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`Customer #${id} not found`);
    this.customers.splice(index, 1);
    return this.customers;
  }

  getOrderByUser(id: number): Order {
    const customer = this.findOne(id);
    return {
      date: new Date(),
      customer,
      products: this.productsService.findAll(),
    };
  }
}
