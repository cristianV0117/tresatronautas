import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductDTO } from '../dtos/products.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Exceptions } from 'src/shared/domain/exceptions';
import { ProductsStoreUseCase } from 'src/products/application/products-store.usecase';
import { JwtAuthGuard } from 'src/shared/infrastructure/guards/jwt-auth.guard';
import { CurrentUser } from 'src/shared/infrastructure/decorators/current-user.decorator';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsStoreController {
  constructor(private readonly productStoreUseCase: ProductsStoreUseCase) {}

  @Post()
  async store(@Body() body: ProductDTO, @CurrentUser() user: any) {
    try {
      return await this.productStoreUseCase.store(body, user);
    } catch (error) {
      if (error instanceof Exceptions) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
