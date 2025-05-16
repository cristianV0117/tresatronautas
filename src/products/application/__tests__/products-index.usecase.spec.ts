import { ProductsIndexUseCase } from '../products-index.usecase';
import { ProductsRepository } from 'src/products/domain/repositories/products.repository';
import { Product } from 'src/products/domain/Product';

describe('ProductsIndexUseCase', () => {
  let useCase: ProductsIndexUseCase;
  let mockRepository: jest.Mocked<ProductsRepository>;

  beforeEach(() => {
    mockRepository = {
      index: jest.fn(),
      store: jest.fn(),
      show: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new ProductsIndexUseCase(mockRepository);
  });

  it('should return a list of products for the given owner', async () => {
    const ownerId = 'owner-id-123';

    const products: Product[] = [
      new Product({
        id: 'prod1',
        name: 'Product 1',
        price: 10,
        owner: ownerId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      }),
      new Product({
        id: 'prod2',
        name: 'Product 2',
        price: 20,
        owner: ownerId,
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      }),
    ];

    mockRepository.index.mockResolvedValue(products);

    const result = await useCase.index(ownerId);

    expect(mockRepository.index).toHaveBeenCalledWith(ownerId);
    expect(result).toEqual(products);
  });
});
