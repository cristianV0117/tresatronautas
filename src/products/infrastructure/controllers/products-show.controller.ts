import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Product } from 'src/products/domain/Product';
import { JwtAuthGuard } from 'src/shared/infrastructure/guards/jwt-auth.guard';
import { ProductIdDTO } from '../dtos/products.dto';
import { ProductsShowUseCase } from 'src/products/application/products-show.usecase';
import { Exceptions } from 'src/shared/domain/exceptions';
import { CurrentUser } from 'src/shared/infrastructure/decorators/current-user.decorator';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsShowController {
  constructor(private readonly productsShowUseCase: ProductsShowUseCase) {}

  @Get(':id')
  async show(
    @Param() id: ProductIdDTO,
    @CurrentUser() owner: any,
  ): Promise<Product> {
    try {
      return await this.productsShowUseCase.show(id, owner.id);
    } catch (error) {
      if (error instanceof Exceptions) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
