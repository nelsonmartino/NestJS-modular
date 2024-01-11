import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from '../entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto,
} from '../dtos/products.dtos';

@Injectable()
export class ProductsService {
  // private counterId = 1;
  // private products: Product[] = [
  //   {
  //     id: 1,
  //     name: 'Product 1',
  //     description: 'bla bla',
  //     price: 122,
  //     image: '',
  //     stock: 12,
  //   },
  // ];

  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  findAll(params?: FilterProductsDto) {
    if (params) {
      const filters: FilterQuery<Product> = {};
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        filters.price = { $gte: minPrice, $lte: maxPrice }; //* Genero un objeto de filtrado para enviar a la consulta de mongo
      }

      return this.productModel
        .find(filters)
        .populate('brand') //* Para que muestre la referencia al objeto al que está relacionado en lugar de solo el id
        .skip(offset)
        .limit(limit)
        .exec();
    }
    return this.productModel.find().populate('brand').exec();
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    // console.log(payload);
    // this.counterId = this.counterId + 1;
    // const newProduct = {
    //   id: this.counterId,
    //   ...payload,
    // };
    // this.products.push(newProduct);
    // return newProduct;
    const newProduct = new this.productModel(payload);
    return newProduct.save();
  }

  // update(id: number, payload: UpdateProductDto) {
  //   const product = this.findOne(id);
  //   const index = this.products.findIndex((item) => item.id === id);
  //   this.products[index] = {
  //     ...product,
  //     ...payload,
  //   };
  //   return this.products[index];
  // }
  update(id: string, payload: UpdateProductDto) {
    const product = this.productModel
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec(); //* con $set actualizo solo los campos que envío en lugar de reemplazar un objeto por otro
    //* {new:true} es para recibir la nueva versión del documento y no la anterior
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  // remove(id: number) {
  //   const index = this.products.findIndex((item) => item.id === id);
  //   if (index === -1) {
  //     throw new NotFoundException(`Product #${id} not found`);
  //   }
  //   this.products.splice(index, 1);
  //   return true;
  // }
  remove(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }
}
