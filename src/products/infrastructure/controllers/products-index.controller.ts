import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductsIndexUseCase } from 'src/products/application/products-index.usecase';
import { Product } from 'src/products/domain/Product';
import { JwtAuthGuard } from 'src/shared/infrastructure/guards/jwt-auth.guard';

@ApiTags('Products')
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsIndexController {
  constructor(private readonly productsIndexUseCase: ProductsIndexUseCase) {}

  @Get()
  async index(): Promise<Product[]> {
    return await this.productsIndexUseCase.index();
  }
}
