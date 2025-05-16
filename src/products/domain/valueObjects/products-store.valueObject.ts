export class ProductsStoreValueObject {
  constructor(
    private name: string,
    private price: number,
    private user: any,
  ) {}

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price;
  }

  public getId(): string {
    return this.user.id;
  }
}
