import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/shared/infrastructure/guards/jwt-auth.guard';
import { ProductIdDTO } from '../dtos/products.dto';
import { Exceptions } from 'src/shared/domain/exceptions';
import { ProductsDeleteUseCase } from 'src/products/application/products-delete.usecase';
import { CurrentUser } from 'src/shared/infrastructure/decorators/current-user.decorator';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsDeleteController {
  constructor(private readonly productsDeleteUseCase: ProductsDeleteUseCase) {}

  @Delete(':id')
  @HttpCode(204)
  async show(
    @Param() id: ProductIdDTO,
    @CurrentUser() owner: any,
  ): Promise<void> {
    try {
      return await this.productsDeleteUseCase.delete(id, owner.id);
    } catch (error) {
      if (error instanceof Exceptions) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
