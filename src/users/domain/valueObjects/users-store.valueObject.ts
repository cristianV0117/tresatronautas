import * as bcrypt from 'bcrypt';

export class UsersStoreValueObject {
  constructor(
    private name: string,
    private email: string,
    private password: string,
  ) {
    this.encriptPassword();
  }

  private encriptPassword() {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    this.password = bcrypt.hashSync(this.password, salt);
  }

  public value() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }
}
