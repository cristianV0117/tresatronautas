import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from 'src/products/domain/Product';
import { ProductsRepository } from 'src/products/domain/repositories/products.repository';
import { ProductsStoreValueObject } from 'src/products/domain/valueObjects/products-store.valueObject';
import {
  ProductDocument,
  ProductModel,
} from 'src/shared/infrastructure/schemas/product.schema';

export class ProductsMongoImplementation implements ProductsRepository {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async store(productStore: ProductsStoreValueObject): Promise<Product> {
    console.log(productStore.getId());

    const createdProduct = await this.productModel.create({
      name: productStore.getName(),
      owner: productStore.getId(),
      price: productStore.getPrice(),
      isActive: true,
    });

    return await new Product({
      id: createdProduct._id.toString(),
      name: createdProduct.name,
      price: createdProduct.price,
      owner: createdProduct.owner.toString(),
      createdAt: createdProduct.createdAt,
      updatedAt: createdProduct.updatedAt,
    });
  }
}
