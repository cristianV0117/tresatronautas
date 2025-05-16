import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserDocument,
  UserModel,
} from 'src/shared/infrastructure/schemas/user.schema';
import { UsersLoginRepository } from 'src/users/domain/repositories/users-login.repository';
import { User } from 'src/users/domain/User';
import { UsersLoginValueObject } from 'src/users/domain/valueObjects/users-login.valueObject';
import { JwtService } from '@nestjs/jwt';
import { UsersInvalidCredentialsException } from 'src/users/domain/exceptions/users-invalid-credentials.exception';
import * as bcrypt from 'bcrypt';

export class UsersLoginMongoImplementation implements UsersLoginRepository {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(userLogin: UsersLoginValueObject): Promise<User> {
    const user = await this.userModel.findOne({ email: userLogin.getEmail() });

    if (!user) {
      console.error('User not found');
      throw new UsersInvalidCredentialsException();
    }

    const passwordMatch = await bcrypt.compare(
      userLogin.getPassword(),
      user.password,
    );
    if (!passwordMatch) {
      console.error('Invalid password');
      throw new UsersInvalidCredentialsException();
    }

    const token = this.jwtService.sign({
      sub: user._id.toString(),
      email: user.email,
    });

    return new User({ email: userLogin.getEmail(), token: token });
  }
}
