import { CreateCategoryDto } from './create-category.dto';
import { IDDto } from '../../common/dto/document.dto';
import { IntersectionType } from '@nestjs/swagger/dist/type-helpers/intersection-type.helper';

export class CategoryDto extends IntersectionType(IDDto, CreateCategoryDto) {}
