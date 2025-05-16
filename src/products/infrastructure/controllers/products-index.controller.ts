import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProductsIndexUseCase } from 'src/products/application/products-index.usecase';
import { Product } from 'src/products/domain/Product';
import { CurrentUser } from 'src/shared/infrastructure/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/shared/infrastructure/guards/jwt-auth.guard';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsIndexController {
  constructor(private readonly productsIndexUseCase: ProductsIndexUseCase) {}

  @Get()
  async index(@CurrentUser() owner: any): Promise<Product[]> {
    return await this.productsIndexUseCase.index(owner.id);
  }
}
