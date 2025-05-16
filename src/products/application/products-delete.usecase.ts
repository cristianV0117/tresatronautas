import { Inject, Injectable } from '@nestjs/common';
import { ProductsRepository } from '../domain/repositories/products.repository';
import { ProductIdDTO } from '../infrastructure/dtos/products.dto';

@Injectable()
export class ProductsDeleteUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly ProductRepository: ProductsRepository,
  ) {}

  async delete(id: ProductIdDTO, ownerId: string): Promise<void> {
    return await this.ProductRepository.delete(id.id, ownerId);
  }
}
