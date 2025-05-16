import { User } from 'src/users/domain/User';

export class Product {
  constructor(
    private props: {
      id?: string;
      name?: string;
      price?: number;
      owner?: User | string;
      isActive?: boolean;
      createdAt?: Date;
      updatedAt?: Date;
    },
  ) {}

  toJSON() {
    return {
      id: this.getId(),
      name: this.getName(),
      price: this.getPrice(),
      owner: this.getOwner(),
      isActive: this.isActive(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
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
    if (typeof this.props.owner === 'string') {
      return this.props.owner;
    } else {
      return {
        id: this.props.owner?.getId(),
        name: this.props.owner?.getName(),
        email: this.props.owner?.getEmail(),
      };
    }
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
