import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserDocument,
  UserModel,
} from 'src/shared/infrastructure/schemas/user.schema';
import { UsersRepository } from 'src/users/domain/repositories/users.repository';
import { User } from 'src/users/domain/User';
import { UsersStoreValueObject } from 'src/users/domain/valueObjects/users-store.valueObject';

export class UsersMongoImplementation implements UsersRepository {
  constructor(
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async store(userStore: UsersStoreValueObject): Promise<User> {
    const value = userStore.value();

    const createdUser = await this.userModel.create({
      fullName: value.name,
      email: value.email,
      password: value.password,
    });

    return new User(
      createdUser._id.toString(),
      createdUser.fullName,
      createdUser.email,
      createdUser.password,
      createdUser.createdAt,
      createdUser.updatedAt,
    );
  }
}
