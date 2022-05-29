import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: false })
  parent: string;
  @ApiProperty({ required: false })
  discount: number;
}
