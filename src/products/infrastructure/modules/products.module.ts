import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductModel,
  ProductSchema,
} from 'src/shared/infrastructure/schemas/product.schema';
import { ProductsStoreController } from '../controllers/products-store.controller';
import { ProductsStoreUseCase } from 'src/products/application/products-store.usecase';
import { ProductsMongoImplementation } from '../implementations/products-mongo.implementation';
import { ProductsIndexController } from '../controllers/products-index.controller';
import { ProductsIndexUseCase } from 'src/products/application/products-index.usecase';
import { ProductsShowUseCase } from 'src/products/application/products-show.usecase';
import { ProductsShowController } from '../controllers/products-show.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductModel.name, schema: ProductSchema },
    ]),
  ],
  controllers: [
    ProductsIndexController,
    ProductsStoreController,
    ProductsShowController,
  ],
  providers: [
    ProductsStoreUseCase,
    ProductsIndexUseCase,
    ProductsShowUseCase,
    { provide: 'ProductRepository', useClass: ProductsMongoImplementation },
  ],
})
export class ProductsModule {}
