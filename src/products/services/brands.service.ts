import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dtos';

@Injectable()
export class BrandsService {
  // private counterId = 1;
  // private brands: Brand[] = [
  //   {
  //     id: 1,
  //     name: 'Brand 1',
  //     image: 'https://i.imgur.com/U4iGx1j.jpeg',
  //   },
  // ];
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  findAll() {
    // return this.brands;
    return this.brandModel.find().exec();
  }

  async findOne(id: string) {
    const brand = await this.brandModel.findOne({ _id: id }).exec();
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  create(data: CreateBrandDto) {
    // this.counterId = this.counterId + 1;
    // const newBrand = {
    //   id: this.counterId,
    //   ...data,
    // };
    // this.brands.push(newBrand);
    const newBrand = new this.brandModel(data);
    return newBrand.save();
  }

  async update(id: string, changes: UpdateBrandDto) {
    // const brand = this.findOne(id);
    // const index = this.brands.findIndex((item) => item.id === id);
    // this.brands[index] = {
    //   ...brand,
    //   ...changes,
    // };
    // return this.brands[index];
    const brand = await this.brandModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  remove(id: string) {
    // const index = this.brands.findIndex((item) => item.id === id);
    // if (index === -1) {
    //   throw new NotFoundException(`Brand #${id} not found`);
    // }
    // this.brands.splice(index, 1);
    // return true;
    return this.brandModel.findByIdAndDelete(id);
  }
}
