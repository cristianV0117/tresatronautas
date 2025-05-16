import { ProductsUpdateUseCase } from '../products-update.usecase';
import { ProductsRepository } from 'src/products/domain/repositories/products.repository';
import { CoreValidatorService } from 'src/products/domain/repositories/core-validator-service.repository';
import {
  ProductDTO,
  ProductIdDTO,
} from 'src/products/infrastructure/dtos/products.dto';
import { Product } from 'src/products/domain/Product';

describe('ProductsUpdateUseCase', () => {
  let useCase: ProductsUpdateUseCase;
  let mockRepository: jest.Mocked<ProductsRepository>;
  let mockValidator: jest.Mocked<CoreValidatorService>;

  beforeEach(() => {
    mockRepository = {
      index: jest.fn(),
      store: jest.fn(),
      show: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    mockValidator = {
      validate: jest.fn(),
    };

    useCase = new ProductsUpdateUseCase(mockRepository, mockValidator);
  });

  it('should validate product and call repository update method', async () => {
    const id: ProductIdDTO = { id: 'product-id-1' };
    const ownerId = 'owner-id-123';
    const body: ProductDTO = {
      name: 'Updated Product',
      price: 99,
    };

    const expectedProduct = new Product({
      id: id.id,
      name: body.name,
      price: body.price,
      owner: ownerId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockValidator.validate.mockResolvedValue(true);
    mockRepository.update.mockResolvedValue(expectedProduct);

    const result = await useCase.update(id, ownerId, body);

    expect(mockValidator.validate).toHaveBeenCalledWith(body);
    expect(mockRepository.update).toHaveBeenCalled();
    expect(result).toBe(expectedProduct);
  });
});
