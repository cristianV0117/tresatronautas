import { Inject, Injectable } from '@nestjs/common';
import { ProductsStoreValueObject } from '../domain/valueObjects/products-store.valueObject';
import { ProductDTO } from '../infrastructure/dtos/products.dto';
import { ProductsRepository } from '../domain/repositories/products.repository';
import { Product } from '../domain/Product';
import { CoreValidatorService } from '../domain/repositories/core-validator-service.repository';

@Injectable()
export class ProductsStoreUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly ProductRepository: ProductsRepository,
    @Inject('CoreValidatorService')
    private readonly coreValidatorService: CoreValidatorService,
  ) {}

  async store(body: ProductDTO, user: any): Promise<Product> {
    const isValid = await this.coreValidatorService.validate(body);
    return await this.ProductRepository.store(
      new ProductsStoreValueObject(body.name, body.price, user, isValid),
    );
  }
}
