import { ApiProperty } from '@nestjs/swagger';

export class GetDiscountDto {
  @ApiProperty({ required: true })
  productId: number;
  @ApiProperty({ required: true })
  userId: number;
  @ApiProperty({ required: true })
  amount: number;
}

export class GetDiscountResponseDto {
  @ApiProperty({ required: true })
  discount: number;
}
