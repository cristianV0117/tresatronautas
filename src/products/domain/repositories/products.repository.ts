import { Product } from '../Product';
import { ProductsStoreValueObject } from '../valueObjects/products-store.valueObject';

export interface ProductsRepository {
  index(): Promise<Product[]>;
  store(productStore: ProductsStoreValueObject): Promise<Product>;
  show(id: string): Promise<Product>;
}
