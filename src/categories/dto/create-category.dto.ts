import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ required: true })
  name: string;
  @ApiProperty({ required: false })
  parentId: string;
  @ApiProperty({ required: false })
  discount: number;
}
