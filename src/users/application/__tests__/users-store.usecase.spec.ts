import { Test, TestingModule } from '@nestjs/testing';
import { UsersStoreUseCase } from './../users-store.usecase';
import { UsersRepository } from '../../domain/repositories/users.repository';
import { UserDTO } from '../../infrastructure/dtos/users.dto';
import { UsersStoreValueObject } from '../../domain/valueObjects/users-store.valueObject';
import { User } from '../../domain/User';

describe('UsersStoreUseCase', () => {
  let useCase: UsersStoreUseCase;
  let repository: UsersRepository;

  const mockUser: User = new User({
    id: '123',
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedpassword',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const mockRepository: UsersRepository = {
    store: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersStoreUseCase,
        {
          provide: 'UsersRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<UsersStoreUseCase>(UsersStoreUseCase);
    repository = module.get<UsersRepository>('UsersRepository');
  });

  it('should call repository with value object and return User', async () => {
    const dto: UserDTO = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'plainpassword',
    };

    const result = await useCase.store(dto);

    expect(repository.store).toHaveBeenCalledWith(
      expect.any(UsersStoreValueObject),
    );
    expect(result).toEqual(mockUser);
  });
});
