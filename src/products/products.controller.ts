import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetDiscountDto, GetDiscountResponseDto } from './dto/get-discount.dto';
import { CategoriesService } from '../categories/categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post('/discount')
  async discount(
    @Body() getDiscount: GetDiscountDto,
  ): Promise<GetDiscountResponseDto> {
    const product = await this.productsService.findOne(getDiscount.productId);
    if (!product) {
      throw new BadRequestException('Invalid Product');
    }

    if (product.discount) {
      return { discount: product?.discount };
    }

    const category = await this.categoriesService.findDiscount(
      product.categoryId,
    );
    if (category.discount) {
      return { discount: category?.discount };
    }

    const sorted = category.parents.sort(function (a, b) {
      return a.level - b.level;
    });
    for (const item of sorted) {
      if (item.discount) {
        return { discount: item.discount };
      }
    }

    return { discount: -1 };
  }
}
