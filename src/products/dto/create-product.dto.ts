import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ required: true })
  productId: number;
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: true })
  categoryId: string;
  @ApiProperty({ required: false })
  discount: number;
}
