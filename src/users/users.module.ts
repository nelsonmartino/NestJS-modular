import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomersController } from './controllers/customers.controller';
import { OrdersController } from './controllers/orders.controller';

import { CustomersService } from './services/customers.service';
import { OrdersService } from './services/orders.service';

import { Customer, CustomerSchema } from './entities/customer.entity';
import { Order, OrderSchema } from './entities/order.entity';

import { ProductsModule } from './../products/products.module';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([
      {
        name: Customer.name,
        schema: CustomerSchema,
      },
      {
        name: Order.name,
        schema: OrderSchema
      }
    ]),
  ],
  controllers: [CustomersController, OrdersController],
  providers: [CustomersService, OrdersService],
})
export class UsersModule {}