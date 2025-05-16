import { Inject, Injectable } from '@nestjs/common';
import { UsersLoginRepository } from '../domain/repositories/users-login.repository';
import { User } from '../domain/User';
import { UsersLoginValueObject } from '../domain/valueObjects/users-login.valueObject';
import { UserLoginDTO } from '../infrastructure/dtos/users-login.dto';

@Injectable()
export class UsersLoginUseCase {
  constructor(
    @Inject('UsersLoginRepository')
    private readonly usersLoginRepository: UsersLoginRepository,
  ) {}

  async login(body: UserLoginDTO): Promise<User> {
    return await this.usersLoginRepository.login(
      new UsersLoginValueObject(body.email, body.password),
    );
  }
}
