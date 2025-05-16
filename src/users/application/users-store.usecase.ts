import { Inject, Injectable } from '@nestjs/common';
import { UserDTO } from '../infrastructure/dtos/users.dto';
import { UsersRepository } from '../domain/repositories/users.repository';
import { UsersStoreValueObject } from '../domain/valueObjects/users-store.valueObject';
import { User } from '../domain/User';

@Injectable()
export class UsersStoreUseCase {
  constructor(
    @Inject('UsersRepository') private readonly UserRepository: UsersRepository,
  ) {}

  async store(body: UserDTO): Promise<User> {
    return await this.UserRepository.store(
      new UsersStoreValueObject(body.name, body.email, body.password),
    );
  }
}
