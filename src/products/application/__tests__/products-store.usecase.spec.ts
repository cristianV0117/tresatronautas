import { ProductsStoreUseCase } from '../products-store.usecase';
import { ProductsRepository } from 'src/products/domain/repositories/products.repository';
import { CoreValidatorService } from 'src/products/domain/repositories/core-validator-service.repository';
import { ProductDTO } from 'src/products/infrastructure/dtos/products.dto';
import { Product } from 'src/products/domain/Product';

describe('ProductsStoreUseCase', () => {
  let useCase: ProductsStoreUseCase;
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

    useCase = new ProductsStoreUseCase(mockRepository, mockValidator);
  });

  it('should validate product and call repository with value object', async () => {
    const body: ProductDTO = {
      name: 'Test Product',
      price: 50,
    };

    const user = 'user-id-123';

    const mockProduct = new Product({
      id: 'product-id-456',
      name: 'Test Product',
      price: 50,
      owner: user,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockValidator.validate.mockResolvedValue(true);
    mockRepository.store.mockResolvedValue(mockProduct);

    const result = await useCase.store(body, user);

    expect(mockValidator.validate).toHaveBeenCalledWith(body);
    expect(mockRepository.store).toHaveBeenCalled();
    expect(result).toBe(mockProduct);
  });
});
