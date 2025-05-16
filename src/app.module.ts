import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/infrastructure/modules/users.module';
import { SharedModule } from './shared/infrastructure/modules/shared.module';
import { ProductsModule } from './products/infrastructure/modules/products.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    SharedModule,
    UsersModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
