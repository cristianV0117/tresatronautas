import { Inject, Injectable } from '@nestjs/common';
import { ProductsRepository } from '../domain/repositories/products.repository';
import { Product } from '../domain/Product';

@Injectable()
export class ProductsIndexUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly ProductRepository: ProductsRepository,
  ) {}

  async index(): Promise<Product[]> {
    return await this.ProductRepository.index();
  }
}
