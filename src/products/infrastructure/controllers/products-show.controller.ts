import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Product } from 'src/products/domain/Product';
import { JwtAuthGuard } from 'src/shared/infrastructure/guards/jwt-auth.guard';
import { ProductIdDTO } from '../dtos/products.dto';
import { ProductsShowUseCase } from 'src/products/application/products-show.usecase';

@ApiTags('Products')
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsShowController {
  constructor(private readonly productsShowUseCase: ProductsShowUseCase) {}

  @Get(':id')
  async show(@Param() id: ProductIdDTO): Promise<Product> {
    return await this.productsShowUseCase.show(id);
  }
}
