import { ProductNotValidForPurchaseException } from '../exceptions/product-not-valid-for-purchase.exception';

export class ProductsStoreValueObject {
  constructor(
    private name: string,
    private price: number,
    private user: any,
    private isValid: boolean,
  ) {
    this.ensureIsValid();
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price;
  }

  public getId(): string {
    return this.user.id;
  }

  private ensureIsValid(): void {
    if (!this.isValid) {
      throw new ProductNotValidForPurchaseException();
    }
  }
}
