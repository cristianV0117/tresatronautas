import { ApiProperty } from '@nestjs/swagger';

export class ProductDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  price: number;
}
