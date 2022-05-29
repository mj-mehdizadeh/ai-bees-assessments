import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Categories, CategoriesDocument } from './entities/categories.schema';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('categories')
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories.name)
    private categoriesModel: Model<CategoriesDocument>,
  ) {}

  create(createDto: CreateCategoryDto) {
    return this.categoriesModel.create(createDto);
  }

  findDiscount(
    id: string,
  ): Promise<Categories & { parents: [Categories & { level: number }] }> {
    return this.categoriesModel
      .aggregate()
      .match({ _id: id })
      .graphLookup({
        from: 'categories',
        startWith: '$parent',
        connectFromField: 'parent',
        connectToField: '_id',
        as: 'parents',
        depthField: 'level',
      })
      .then((items) => items.pop());
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
