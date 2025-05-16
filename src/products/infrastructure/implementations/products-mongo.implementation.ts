import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductNotFoundException } from 'src/products/domain/exceptions/product-not-found.exception';
import { Product } from 'src/products/domain/Product';
import { ProductsRepository } from 'src/products/domain/repositories/products.repository';
import { ProductsStoreValueObject } from 'src/products/domain/valueObjects/products-store.valueObject';
import { UserNotAuthorizedException } from 'src/shared/domain/user-not-authorized.exception';
import {
  ProductDocument,
  ProductModel,
} from 'src/shared/infrastructure/schemas/product.schema';
import { User } from 'src/users/domain/User';

export class ProductsMongoImplementation implements ProductsRepository {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async index(ownerId: string): Promise<Product[]> {
    const products = await this.productModel
      .find({ isActive: true, owner: ownerId })
      .populate('owner');

    return products.map((product) => {
      const owner = product.owner as any;
      return new Product({
        id: product._id.toString(),
        name: product.name,
        price: product.price,
        owner: new User({
          id: product.owner._id.toString(),
          name: owner.name,
          email: owner.email,
        }),
        isActive: product.isActive,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      });
    });
  }

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
      isActive: createdProduct.isActive,
      createdAt: createdProduct.createdAt,
      updatedAt: createdProduct.updatedAt,
    });
  }

  async show(id: string, ownerId: string): Promise<Product> {
    const objectId = new Types.ObjectId(id);

    const product = await this.productModel
      .findOne({
        _id: objectId,
        isActive: true,
        owner: ownerId,
      })
      .populate('owner');

    if (!product) {
      throw new ProductNotFoundException(id);
    }

    const owner = product.owner as any;
    return new Product({
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      owner: new User({
        id: product.owner._id.toString(),
        name: owner.name,
        email: owner.email,
      }),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    });
  }

  async update(
    id: string,
    ownerId: string,
    productStore: ProductsStoreValueObject,
  ): Promise<Product> {
    const objectId = new Types.ObjectId(id);

    const product = await this.productModel.findOne({
      _id: objectId,
      isActive: true,
    });

    if (!product) {
      throw new ProductNotFoundException(id);
    }

    console.log(product.owner.toString(), ownerId);
    if (product.owner.toString() !== ownerId) {
      throw new UserNotAuthorizedException();
    }

    const updatedProduct = await this.productModel
      .findOneAndUpdate(
        { _id: objectId },
        {
          name: productStore.getName(),
          price: productStore.getPrice(),
          updatedAt: new Date(),
        },
        { new: true },
      )
      .populate('owner');

    if (!updatedProduct) {
      throw new ProductNotFoundException(id);
    }
    const owner = updatedProduct.owner as any;
    return new Product({
      id: updatedProduct._id.toString(),
      name: updatedProduct.name,
      price: updatedProduct.price,
      owner: new User({
        id: updatedProduct.owner._id.toString(),
        name: owner.name,
        email: owner.email,
      }),
      createdAt: updatedProduct.createdAt,
      updatedAt: updatedProduct.updatedAt,
    });
  }

  async delete(id: string, ownerId: string): Promise<void> {
    const objectId = new Types.ObjectId(id);

    const product = await this.productModel.findOne({
      _id: objectId,
      isActive: true,
    });

    if (!product) {
      throw new ProductNotFoundException(id);
    }

    if (product.owner.toString() !== ownerId) {
      throw new UserNotAuthorizedException();
    }

    await this.productModel.updateOne(
      { _id: objectId },
      { $set: { isActive: false } },
    );
  }
}
