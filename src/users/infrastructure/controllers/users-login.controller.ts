import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserLoginDTO } from '../dtos/users-login.dto';
import { UsersLoginUseCase } from 'src/users/application/users-login.usecase';
import { User } from 'src/users/domain/User';
import { Exceptions } from 'src/shared/domain/exceptions';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Login')
@Controller('login')
export class UsersLoginController {
  constructor(private readonly usersLoginUseCase: UsersLoginUseCase) {}

  @Post()
  async login(@Body() body: UserLoginDTO): Promise<User> {
    try {
      return await this.usersLoginUseCase.login(body);
    } catch (error) {
      if (error instanceof Exceptions) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
