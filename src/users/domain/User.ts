export class User {
  constructor(
    private props: {
      id?: string;
      name?: string;
      email?: string;
      password?: string;
      createdAt?: Date;
      updatedAt?: Date;
      token?: string;
    },
  ) {}

  toJSON() {
    return {
      id: this.getId(),
      name: this.getName(),
      email: this.getEmail(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
      token: this.getToken(),
    };
  }

  public getId(): string {
    return this.props.id;
  }

  public getName(): string {
    return this.props.name;
  }

  public getEmail(): string {
    return this.props.email;
  }

  public getCreatedAt(): Date {
    return this.props.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.props.updatedAt;
  }

  public getToken(): string {
    return this.props.token;
  }
}
