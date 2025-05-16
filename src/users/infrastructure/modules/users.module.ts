import { Module } from '@nestjs/common';
import { UsersStoreController } from '../controllers/users-store.controller';
import { UsersStoreUseCase } from 'src/users/application/users-store.usecase';
import { UsersMongoImplementation } from '../implementations/users-mongo.implementation';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserModel,
  UserSchema,
} from 'src/shared/infrastructure/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
  ],
  controllers: [UsersStoreController],
  providers: [
    UsersStoreUseCase,
    { provide: 'UsersRepository', useClass: UsersMongoImplementation },
  ],
})
export class UsersModule {}
