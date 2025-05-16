import { Inject, Injectable } from '@nestjs/common';
import { ProductsRepository } from '../domain/repositories/products.repository';
import { Product } from '../domain/Product';
import { ProductIdDTO } from '../infrastructure/dtos/products.dto';

@Injectable()
export class ProductsShowUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly ProductRepository: ProductsRepository,
  ) {}

  async show(id: ProductIdDTO): Promise<Product> {
    return await this.ProductRepository.show(id.id);
  }
}
