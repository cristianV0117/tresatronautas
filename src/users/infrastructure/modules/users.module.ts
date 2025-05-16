import { Module } from '@nestjs/common';
import { UsersStoreController } from '../controllers/users-store.controller';
import { UsersStoreUseCase } from 'src/users/application/users-store.usecase';
import { UsersMongoImplementation } from '../implementations/users-mongo.implementation';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserModel,
  UserSchema,
} from 'src/shared/infrastructure/schemas/user.schema';
import { UsersLoginController } from '../controllers/users-login.controller';
import { UsersLoginUseCase } from 'src/users/application/users-login.usecase';
import { UsersLoginMongoImplementation } from '../implementations/users-login-mongo.implementation';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../../shared/infrastructure/strategies/jwt.strategy';
import { JwtAuthGuard } from '../../../shared/infrastructure/guards/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UsersStoreController, UsersLoginController],
  providers: [
    JwtStrategy,
    JwtAuthGuard,
    UsersStoreUseCase,
    { provide: 'UsersRepository', useClass: UsersMongoImplementation },
    UsersLoginUseCase,
    {
      provide: 'UsersLoginRepository',
      useClass: UsersLoginMongoImplementation,
    },
  ],
})
export class UsersModule {}
