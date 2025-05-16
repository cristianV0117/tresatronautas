import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductModel,
  ProductSchema,
} from 'src/shared/infrastructure/schemas/product.schema';
import { ProductsStoreController } from '../controllers/products-store.controller';
import { ProductsStoreUseCase } from 'src/products/application/products-store.usecase';
import { ProductsMongoImplementation } from '../implementations/products-mongo.implementation';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductModel.name, schema: ProductSchema },
    ]),
  ],
  controllers: [ProductsStoreController],
  providers: [
    ProductsStoreUseCase,
    { provide: 'ProductRepository', useClass: ProductsMongoImplementation },
  ],
})
export class ProductsModule {}
