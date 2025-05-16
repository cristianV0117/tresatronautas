import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from '../dtos/users.dto';
import { UsersStoreUseCase } from 'src/users/application/users-store.usecase';
import { ApiTags } from '@nestjs/swagger';
import { Exceptions } from 'src/shared/domain/exceptions';

@ApiTags('Users')
@Controller('users')
export class UsersStoreController {
  constructor(private readonly userStoreUseCase: UsersStoreUseCase) {}

  @Post()
  async store(@Body() body: UserDTO) {
    try {
      return await this.userStoreUseCase.store(body);
    } catch (error) {
      if (error instanceof Exceptions) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
