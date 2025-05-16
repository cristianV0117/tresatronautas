import { Product } from '../Product';
import { ProductsStoreValueObject } from '../valueObjects/products-store.valueObject';

export interface ProductsRepository {
  store(productStore: ProductsStoreValueObject): Promise<Product>;
}
