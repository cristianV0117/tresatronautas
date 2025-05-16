import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from '../dtos/users.dto';
import { UsersStoreUseCase } from 'src/users/application/users-store.usecase';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersStoreController {
  constructor(private readonly userStoreUseCase: UsersStoreUseCase) {}

  @Post()
  store(@Body() body: UserDTO) {
    return this.userStoreUseCase.store(body);
  }
}
