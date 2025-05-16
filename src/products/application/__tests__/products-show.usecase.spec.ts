import { ProductsShowUseCase } from '../products-show.usecase';
import { ProductsRepository } from 'src/products/domain/repositories/products.repository';
import { ProductIdDTO } from 'src/products/infrastructure/dtos/products.dto';
import { Product } from 'src/products/domain/Product';

describe('ProductsShowUseCase', () => {
  let useCase: ProductsShowUseCase;
  let mockRepository: jest.Mocked<ProductsRepository>;

  beforeEach(() => {
    mockRepository = {
      index: jest.fn(),
      store: jest.fn(),
      show: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new ProductsShowUseCase(mockRepository);
  });

  it('should call repository show and return product', async () => {
    const id: ProductIdDTO = { id: 'product-id-123' };
    const ownerId = 'owner-id-456';

    const expectedProduct = new Product({
      id: id.id,
      name: 'My Product',
      price: 20,
      owner: ownerId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    mockRepository.show.mockResolvedValue(expectedProduct);

    const result = await useCase.show(id, ownerId);

    expect(mockRepository.show).toHaveBeenCalledWith(id.id, ownerId);
    expect(result).toBe(expectedProduct);
  });
});
