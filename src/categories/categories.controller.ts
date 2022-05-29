import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { CategoryDto } from './dto/category.dto';

@ApiTags('categories')
@Controller('categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @ApiResponse({ type: CategoryDto, status: 200 })
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<any> {
    return this.categoriesService.create(createCategoryDto);
  }
}
