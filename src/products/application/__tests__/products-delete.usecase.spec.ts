import { ProductsDeleteUseCase } from '../products-delete.usecase';
import { ProductsRepository } from 'src/products/domain/repositories/products.repository';
import { ProductIdDTO } from 'src/products/infrastructure/dtos/products.dto';

describe('ProductsDeleteUseCase', () => {
  let useCase: ProductsDeleteUseCase;
  let mockRepository: jest.Mocked<ProductsRepository>;

  beforeEach(() => {
    mockRepository = {
      index: jest.fn(),
      store: jest.fn(),
      show: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };

    useCase = new ProductsDeleteUseCase(mockRepository);
  });

  it('should call repository.delete with id and ownerId', async () => {
    const id: ProductIdDTO = { id: 'product-id-123' };
    const ownerId = 'owner-id-456';

    mockRepository.delete.mockResolvedValue();

    await useCase.delete(id, ownerId);

    expect(mockRepository.delete).toHaveBeenCalledTimes(1);
    expect(mockRepository.delete).toHaveBeenCalledWith(id.id, ownerId);
  });
});
