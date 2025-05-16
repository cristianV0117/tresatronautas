import { Product } from '../Product';
import { ProductsStoreValueObject } from '../valueObjects/products-store.valueObject';

export interface ProductsRepository {
  index(ownerId: string): Promise<Product[]>;
  store(productStore: ProductsStoreValueObject): Promise<Product>;
  show(id: string, ownerId: string): Promise<Product>;
  delete(id: string, ownerId: string): Promise<void>;
}
