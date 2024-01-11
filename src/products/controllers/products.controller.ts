import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  Res,
  // ParseIntPipe,
} from '@nestjs/common';

import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int.pipe';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dtos/products.dtos';

import { ProductsService } from '../services/products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Products list' })
  getProducts(
    // @Query('limit') limit = 100,
    // @Query('offset') offset = 0,
    // @Query('brand') brand: string,
    @Query() params: FilterProductsDto,
  ) {
    // return {
    //   message: `products limit=> ${limit} offset=> ${offset} brand=> ${brand}`,
    // };
    // return this.productsService.findAll();
    return this.productsService.findAll(params);
  }

  @Get('filter')
  getProductFilter() {
    return `yo soy un filter`;
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  // getOne(@Param('productId', ParseIntPipe) productId: number) {
  getOne(@Param('productId', MongoIdPipe) productId: string) {
    // response.status(200).send({
    //   message: `product ${productId}`,
    // });
    return this.productsService.findOne(productId);
  }

  // @Post()
  // create(@Body() payload: CreateProductDto) {
  //   // return {
  //   //   message: 'accion de crear',
  //   //   payload,
  //   // };
  //   return this.productsService.create(payload);
  // }
  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  // @Put(':id')
  // update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
  //   return this.productsService.update(+id, payload);
  // }
  @Put(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(id, payload);
  }

  // @Delete(':id')
  // delete(@Param('id') id: string) {
  //   return this.productsService.remove(+id);
  // }
  @Delete(':id')
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.productsService.remove(id);
  }
}
