import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Products, ProductsDocument } from './entities/products.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name)
    private productsModel: Model<ProductsDocument>,
  ) {}

  create(createProductDto: CreateProductDto) {
    return this.productsModel.create(createProductDto);
  }
}
