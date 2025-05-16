import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UserDocument,
  UserModel,
} from 'src/shared/infrastructure/schemas/user.schema';
import { UsersEmailAlreadyExistsException } from 'src/users/domain/exceptions/users-email-already-exists.exception';
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

    try {
      const createdUser = await this.userModel.create({
        name: value.name,
        email: value.email,
        password: value.password,
      });

      return new User({
        id: createdUser._id.toString(),
        name: createdUser.name,
        email: createdUser.email,
        password: createdUser.password,
        createdAt: createdUser.createdAt,
        updatedAt: createdUser.updatedAt,
      });
    } catch (error: any) {
      if (error.code === 11000 && error.keyPattern?.email) {
        throw new UsersEmailAlreadyExistsException(value.email);
      }

      throw error;
    }
  }
}
