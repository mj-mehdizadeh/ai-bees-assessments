import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Categories, CategoriesDocument } from './categories.schema';
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

  findAll(query: { parent?: string }) {
    const filter: FilterQuery<Categories> = {};
    if (query.parent) filter.parent = query.parent;
    return this.categoriesModel.find(filter);
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
