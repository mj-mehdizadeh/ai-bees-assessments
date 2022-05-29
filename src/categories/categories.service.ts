import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import {
  Categories,
  CategoriesDocument,
  CategoriesSchema,
} from './categories.schema';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name)
    private categoriesModel: Model<CategoriesDocument>,
  ) {}

  create(createDto: CreateCategoryDto) {
    return this.categoriesModel.create(createDto);
  }

  findDiscount(id: string) {
    const filter: FilterQuery<Categories> = {};
    return this.categoriesModel.aggregate().match({ _id: id }).graphLookup({
      from: 'categories',
      startWith: '$parent',
      connectFromField: 'parent',
      connectToField: '_id',
      as: 'parents',
      depthField: 'level',
    });
  }

  findOne(id: string, filter?: { parent?: string }) {
    return this.categoriesModel.findOne({ _id: id, ...filter });
  }

  update(id: string, updateDto: UpdateCategoryDto) {
    return this.categoriesModel.findOneAndUpdate({ _id: id }, updateDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.categoriesModel.deleteOne({ _id: id });
  }
}