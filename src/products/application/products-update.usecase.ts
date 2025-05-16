import { Inject, Injectable } from '@nestjs/common';
import { ProductDTO, ProductIdDTO } from '../infrastructure/dtos/products.dto';
import { Product } from '../domain/Product';
import { ProductsRepository } from '../domain/repositories/products.repository';
import { ProductsStoreValueObject } from '../domain/valueObjects/products-store.valueObject';
import { CoreValidatorService } from '../domain/repositories/core-validator-service.repository';

@Injectable()
export class ProductsUpdateUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productsRepository: ProductsRepository,
    @Inject('CoreValidatorService')
    private readonly coreValidatorService: CoreValidatorService,
  ) {}

  async update(
    id: ProductIdDTO,
    ownerId: string,
    body: ProductDTO,
  ): Promise<Product> {
    const isValid = await this.coreValidatorService.validate(body);
    return await this.productsRepository.update(
      id.id,
      ownerId,
      new ProductsStoreValueObject(body.name, body.price, ownerId, isValid),
    );
  }
}
