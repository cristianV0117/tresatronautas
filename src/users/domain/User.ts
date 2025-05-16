export class User {
  constructor(
    private readonly id: string,
    private readonly fullName: string,
    private readonly email: string,
    private readonly password: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
  ) {}

  public getId(): string {
    return this.id;
  }

  public getFullName(): string {
    return this.fullName;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPassword(): string {
    return this.password;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
