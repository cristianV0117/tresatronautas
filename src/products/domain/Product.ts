export class Product {
  constructor(
    private props: {
      id?: string;
      name?: string;
      price?: number;
      owner?: string;
      isActive?: boolean;
      createdAt?: Date;
      updatedAt?: Date;
    },
  ) {}

  toJSON() {
    return {
      id: this.props.id,
      name: this.props.name,
      price: this.props.price,
      owner: this.props.owner,
      isActive: this.props.isActive,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
    };
  }

  public getId() {
    return this.props.id;
  }

  public getName() {
    return this.props.name;
  }

  public getPrice() {
    return this.props.price;
  }

  public getOwner() {
    return this.props.owner;
  }

  public getCreatedAt() {
    return this.props.createdAt;
  }

  public getUpdatedAt() {
    return this.props.updatedAt;
  }

  public isActive() {
    return this.props.isActive;
  }
}
