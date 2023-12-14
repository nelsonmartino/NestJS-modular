import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [ProductsModule],
})
export class UsersModule {}
