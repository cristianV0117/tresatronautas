import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsUpdateUseCase } from 'src/products/application/products-update.usecase';
import { Product } from 'src/products/domain/Product';
import { JwtAuthGuard } from 'src/shared/infrastructure/guards/jwt-auth.guard';
import { ProductDTO, ProductIdDTO } from '../dtos/products.dto';
import { CurrentUser } from 'src/shared/infrastructure/decorators/current-user.decorator';
import { Exceptions } from 'src/shared/domain/exceptions';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsUpdateController {
  constructor(private readonly productsUpdateUseCase: ProductsUpdateUseCase) {}

  @Put(':id')
  async update(
    @Body() body: ProductDTO,
    @Param() id: ProductIdDTO,
    @CurrentUser() owner: any,
  ): Promise<Product> {
    try {
      return await this.productsUpdateUseCase.update(id, owner.id, body);
    } catch (error) {
      if (error instanceof Exceptions) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
