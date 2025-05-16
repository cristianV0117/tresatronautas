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
import { ProductsDeleteController } from '../controllers/products-delete.controller';
import { ProductsDeleteUseCase } from 'src/products/application/products-delete.usecase';
import { CoreValidatorFakeService } from '../services/core-validator.service';
import { ProductsUpdateController } from '../controllers/products-update.controller';
import { ProductsUpdateUseCase } from 'src/products/application/products-update.usecase';

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
    ProductsDeleteController,
    ProductsUpdateController,
  ],
  providers: [
    ProductsStoreUseCase,
    ProductsIndexUseCase,
    ProductsShowUseCase,
    ProductsUpdateUseCase,
    ProductsDeleteUseCase,
    { provide: 'ProductRepository', useClass: ProductsMongoImplementation },
    {
      provide: 'CoreValidatorService',
      useClass: CoreValidatorFakeService,
    },
  ],
})
export class ProductsModule {}
