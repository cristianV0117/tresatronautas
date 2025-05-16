import { UsersLoginUseCase } from '../users-login.usecase';
import { UsersLoginRepository } from 'src/users/domain/repositories/users-login.repository';
import { User } from 'src/users/domain/User';
import { UserLoginDTO } from 'src/users/infrastructure/dtos/users-login.dto';

describe('UsersLoginUseCase', () => {
  let useCase: UsersLoginUseCase;
  let mockRepository: jest.Mocked<UsersLoginRepository>;

  beforeEach(() => {
    mockRepository = {
      login: jest.fn(),
    };

    useCase = new UsersLoginUseCase(mockRepository);
  });

  it('should call repository with value object and return User', async () => {
    const dto: UserLoginDTO = {
      email: 'test@example.com',
      password: 'securepassword',
    };

    const expectedUser = new User({ email: dto.email, token: 'mock-token' });

    mockRepository.login.mockResolvedValue(expectedUser);

    const result = await useCase.login(dto);

    expect(mockRepository.login).toHaveBeenCalledTimes(1);
    expect(mockRepository.login).toHaveBeenCalledWith(
      expect.objectContaining({
        getEmail: expect.any(Function),
        getPassword: expect.any(Function),
      }),
    );
    expect(result).toEqual(expectedUser);
  });
});
